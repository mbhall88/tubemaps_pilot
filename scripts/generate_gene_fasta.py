"""
The purpose of this script is to take a GFF file and a reference genome and
generate a fasta file for each gene in the GFF file - based on the coordinates
in the GFF file. The GFF file should obviously be for the given reference genome.
First argument is the reference genome.
Second argument is the GFF file containing genes you want fastas for.
Third argument is the directory to write the fastas to.
"""
import os
import sys

def fasta_parser(filename):
    """Parse a fasta file and withdraw the sequences and their sequence/read id

    Args:
    ¦   filename (str): Path for the fasta file.
    ¦
    Returns:
    ¦   fasta (dict[str]): A dictionary where the keys are the sequence/read
    ¦   id and the value is the sequence for that sequence/read.
    ¦
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
    """file_obj must be an open file object"""
    file_obj.write(header + '\n')
    for i in range(0, len(seq), wrap):
        file_obj.write(seq[i: i + wrap] + '\n')

def get_gene_name(field):
    return field.split('Name=')[-1].split(';')[0]

ref = fasta_parser(sys.argv[1])
ref_genome = list(ref.values())[0]
gff_filename = sys.argv[2]
output_dir = os.path.realpath(sys.argv[3])
offset = 100

with open(gff_filename, 'r') as gff:
    for row in gff:
        if row.startswith('#'):
            continue
        elements = row.split('\t')
        gene = get_gene_name(elements[-1])
        # minus one for start index due to 0-based vs 1-based indexing
        start = int(elements[3]) - 1
        end = int(elements[4])
        with open(os.path.join(output_dir, gene + '.fa'), 'w') as fout:
            seq = ref_genome[start-offset: end+offset]
            header = '>{0}|gene_start={2}|offset={3}|gene={1}'\
            .format(list(ref.keys())[0], gene, start, offset)
            # write fasta file
            fasta_writer(fout, header, seq)
