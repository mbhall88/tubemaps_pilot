"""
Script to take the variants within the probe fasta and generate a MSA of these
based on the reference fasta for that gene.
"""
import re
import argparse
import os
import sys


def extract_from_header(header, left, right):
    """Function to extract the in a fasta header between two boundaries.
    Args:
        header (str): fasta header.
        left (str): The left boundary to match.
        right (str): The right boundary to match.
    Returns:
        (str): The string in between the boundaries

    Example:
        >>> header = '>alt-C-57T?var_name=C2726136T&enum=4&gene=ahpC&mut=C-57T'
        >>> extract_from_header(header, 'gene=', '\&')
        'ahpC'
    """
    return re.search(r'{}(.*?){}'.format(left, right), header).group(1)


def extract_header_info_from_probes(filename):
    """Extracts all of the header information from the given probe fasta.

    Args:
        filename (str): Path to probe fasta file.

    Returns:
        dict[str: set[str]]: A dictonary where the keys are gene names and
        the value is a set of all of the variants for that gene.

    """
    header_info = {}
    with open(filename) as probe_fasta:
        for line in probe_fasta:
            if line.startswith('>'):  # if line is fasta header
                gene_name = extract_from_header(line, 'gene=', '\&')
                var_name = extract_from_header(line, 'var_name=', '\&')
                # check if gene is already in header dictionary
                if gene_name in header_info:
                    header_info[gene_name].add(var_name)
                else:
                    header_info[gene_name] = {var_name}
    return header_info


def fasta_parser(filename):
    """Parse a fasta file and withdraw the sequences and their sequence/read id

    Args:
        filename (str): Path for the fasta file.

    Returns:
        fasta (dict[str]): A dictionary where the keys are the sequence/read
        id and the value is the sequence for that sequence/read.

    """
    fasta = {}
    with open(filename) as f:
        contents = f.read()[1:].split('\n>')
        for section in contents:
            sample = section.split('\n')
            sample_id = sample[0]
            seq = ''.join(sample[1:]).strip()
            fasta[sample_id] = seq
    return fasta


def fasta_writer(file_obj, header, seq, wrap=60):
    """Write a fasta header and sequence to an open file.
    Args:
        file_obj (File): A fasta file open for writing.
        header (str): The string to write as the header (include the > symbol
        if you want it in the header - RECOMMENDED).
        seq (str): The sequence associated with the header.
        wrap (int): Wrap the sequence on this number of characters.

    """
    file_obj.write(header + '\n')
    for i in range(0, len(seq), wrap):
        file_obj.write(seq[i: i + wrap] + '\n')


def extract_variant_info(variant):
    """Extracts the reference, alternate, and positional information from a
    variant string.

    Args:
        variant (str): A variant of form A45G

    Returns:
        tuple(str, int, str): (Reference, position, alternate) in that order.

    Example:
        >>> var = 'A45G'
        >>> extract_variant_info(var)
        ('A', 45, 'G')

    """
    var_regex = re.compile(
        r'(?P<ref>[A-Za-z]+)(?P<position>[-0-9]+)(?P<alt>[A-Za-z]+)$')
    match = var_regex.search(variant)
    reference = match.group('ref')
    position = int(match.group('position'))
    alternate = match.group('alt')
    return reference, position, alternate


def generate_variant_sequence(seq, variant, start=0, offset=0):
    """Generates a copy of a given sequence altered by a variant.

    Args:
        seq (str): Reference sequence to alter.
        variant (str): The variant to change by.
        start (int): If the position in the variant is relative to the whole
        genome and the seq given is just the gene, where does the gene start
        relative to the whole genome.
        offset (int): Padding added to the start/end of gene seq.

    Returns:
        (str): A copy of seq, altered by the variant.

    Examples:
        >>> generate_variant_sequence('ATGATG', 'A500T', 499, 3)
        'ATGTTG'
    """
    ref, position, alt = extract_variant_info(variant)

    # make sure ref and alt have the same number of characters
    assert len(ref) == len(alt), "Variants have different length."

    # calculate position relative to gene ref sequence instead of genome
    relative_start = position - start + offset - 1
    relative_end = relative_start + len(ref)

    # change the reference sequence to the alternate seq
    return seq[:relative_start] + alt + seq[relative_end:]


def generate_header(gene, variant):
    """Generate fasta header from gene name and variant information.
    Note: Does not include newline character.

    Args:
        gene (str): Name of the gene
        variant (str): Variant information. i.e GA45TT

    Returns:
         (str): The header to be inserted into a fasta file.

    Examples:
        >>> generate_header('brca1', 'C77G')
        '>brca1_C77G'

    """
    return '>{}_{}'.format(gene, variant)


def generate_msa_for_gene(gene, variant_set, gene_path, msa_path):
    """Generate a multiple sequence alignment of a gene with all it's variants.
    2. store all information in a dictionary where the key is the gene and the
    value is a set of the variants for that gene.
    3. for each key in the dictionary:
        - open gene reference
        - loop through variants
        - for each variant, create altered version of gene reference
        - add to growing MSA for that gene.
    4. Write MSA to file
    Args:
        gene (str): The name of the gene to write MSA for.
        variant_set (set[str]): A set of all the gene's variants that require
        and entry in the MSA.
        gene_path (str): Path to gene reference fasta.
        msa_path (str): Path to write MSA to.
    """
    gene_ref_fasta = fasta_parser(gene_path)
    # make sure there is only one sequence in gene reference fasta
    assert len(gene_ref_fasta.keys()) == 1, \
        "Too many sequences in reference"

    # extract the reference sequence for gene from the dictionary.
    gene_ref_seq = list(gene_ref_fasta.values())[0]

    # get the reference genome start coordinate for the gene.
    gene_header = list(gene_ref_fasta.keys())[0]
    gene_ref_start = int(extract_from_header(gene_header, 'gene_start=', '\|'))
    gene_ref_offset = int(extract_from_header(gene_header, 'offset=', '\|'))

    # open fasta file for writing MSA for gene
    with open(msa_path, 'w') as gene_msa:
        # write the reference version of the gene first
        ref_header = generate_header(gene, 'reference')
        fasta_writer(gene_msa, ref_header, gene_ref_seq)

        # add an entry in msa for each variant
        for variant in variant_set:
            header_string = generate_header(gene, variant)
            new_seq = generate_variant_sequence(gene_ref_seq, variant,
                                                gene_ref_start,
                                                gene_ref_offset)
            fasta_writer(gene_msa, header_string, new_seq)
    sys.stderr.write('MSA for {} written\n'.format(gene))


def setup_args():
    """Sets up the args for running script from command line."""
    parser = argparse.ArgumentParser(
        description="Take probe set and generate MSA for all variants for "
                    "each gene")

    parser.add_argument(
        "-o", "--output_path",
        help="Directory to save the output to. Default: Current Directory",
        type=str, default='.')

    parser.add_argument(
        "-p", "--probe",
        help="Path to the probe fasta.",
        type=str,
        required=True)

    parser.add_argument(
        "-g", "--gene_refs",
        help="Directory where gene references are located.",
        required=True,
        type=str)

    args = parser.parse_args()
    return args


def main():
    """
    1. read in probe fasta
    2. store all information in a dictionary where the key is the gene and the
    value is a set of the variants for that gene.
    3. for each key in the dictionary:
        - open gene reference
        - loop through variants
        - for each variant, create altered version of gene reference
        - add to growing MSA for that gene.
    4. Write MSA to file
    """
    args = setup_args()
    header_info = extract_header_info_from_probes(args.probe)

    for gene in header_info.keys():
        # check there is a folder for gene, else create it
        gene_out_dir = os.path.join(args.output_path, gene)
        if not os.path.exists(gene_out_dir):
            os.mkdir(gene_out_dir)

        gene_msa_fname = os.path.join(gene_out_dir, '{}_msa.fa'.format(gene))
        gene_ref = os.path.join(os.path.abspath(args.gene_refs), gene + '.fa')
        generate_msa_for_gene(gene, header_info[gene], gene_ref, gene_msa_fname)


if __name__ == '__main__':
    main()
