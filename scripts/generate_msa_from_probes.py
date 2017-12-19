"""
Script to take the variants within the probe fasta and generate a MSA of these
based on the reference fasta for that gene.
"""
import re
import argparse
import os


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


# def extract_var_name(header):
#     """Function to extract the variant information from a fasta header.
#     Args:
#         header (str): fasta header.
#
#     Returns:
#         (str): The variant information. i.e C45T
#
#     Example header is >alt-C-57T?var_name=C2726136T&enum=4&gene=ahpC&mut=C-57T
#     In this case the function would return C2726136T
#     """
#     return re.search(r'var_name=(.*?)&', header).group(1)
#
#
# def extract_gene_name(header):
#     """Function to extract the gene name from a fasta header.
#     Args:
#         header (str): fasta header.
#
#     Returns:
#         (str): The gene name
#
#     Example header is >alt-C-57T?var_name=C2726136T&enum=4&gene=ahpC&mut=C-57T
#     In this case the function would return ahpC
#     """
#     return re.search(r'gene=(.*?)&', header).group(1)


def extract_header_info_from_probes(filename):
    """Extracts all of the header information from the given probe fasta.

    Args:
        filename (str): Path to probe fasta file.

    Returns:
        dict[str: set[str]]: A dictonary where the keys are gene names and
        the value is a set of all of the variants for that gene.

    """
    header_info = {}
    with open(filename, 'r') as probe_fasta:
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
    with open(filename, 'r') as f:
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


def _generic_extract(line, split_on):
    """Generic function to split on a given pattern."""
    return line.split('{}='.format(split_on))[-1].split('|')[0]


def extract_start(header):
    """Extracts the start parameter from a fasta header."""
    offset = 0
    if 'offset' in header:
        offset = int(header.split())
    return int(header.split('start=')[-1].split('|')[0])


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
        gene_ref = os.path.join(os.path.abspath(args.gene_refs), gene + '.fa')
        gene_ref_fasta = fasta_parser(gene_ref)
        # make sure there is only one sequence in gene reference fasta
        assert len(gene_ref_fasta.keys()) == 1, \
        "Too many sequences in reference"

        # extract the reference sequence for gene from the dictionary.
        gene_ref_seq = list(gene_ref_fasta.values())[0]

        # get the reference genome start coordinate for the gene.
        gene_ref_start = extract_start(list(gene_ref_fasta.keys())[0])

        # check there is a folder for gene, else create it
        gene_out_dir = os.path.join(args.output_path, gene)
        if not os.path.exists(gene_out_dir):
            os.mkdir(gene_out_dir)

        for variant in header_info[gene]:
            ref, position, alt = extract_variant_info(variant)
            # print("{}\t{}\t{}\t{}".format(gene, ref, position, alt))

            #position is the position within the whole genome. need to get the
            #start coordinate for each gene.
            upstream_start = position - gene_ref_start
            downstream_end = position - (len(gene_ref_seq) + gene_ref_start)
            print(upstream_start)

            #TODO: update all header extractions to the generic method


        # gene_msa_fname = os.path.join(gene_out_dir, '{}_msa.fa'.format(gene))
        # with open(gene_msa_fname, 'w') as msa_file:





if __name__ == '__main__':
    main()
