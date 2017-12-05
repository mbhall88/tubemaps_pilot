"""
This script is for the purpose of creating a stripped down version of the TB
NC_000962.3 reference genome's gff3 file with just the genes relating to the
mykrobe probes that relate to AMR genes. This stripped down gff3 will then be 
used for created an MSA of all variants relating to AMR and to build a PRG.
First argument is the full GFF file to strip down.
Second argument is the name of the output file.
"""
import sys

gff_filename = sys.argv[1]
gff_out = sys.argv[2]

def get_gene_name(field):
    return field.split('Name=')[-1].split(';')[0]


# function to parse the headers in the mykrobe probe fasta to get gene name
def parse_probe_header(header):
    return header.split('gene=')[-1].split('&')[0]

gene_names = set()

# read fasta headers being piped into stdin from grep
for header in sys.stdin:
    gene_names.add(parse_probe_header(header))

# go through full GFF and create subset based on gene_names
with open(gff_out, 'w') as fout:
    with open(gff_filename, 'r') as gff:
        for row in gff:
            if row.startswith('#'):  # write header to new file
                fout.write(row)
                continue
            elements = row.split('\t')
            if elements[2] == 'gene':
                gene = get_gene_name(elements[-1])
                if gene in gene_names:
                    fout.write(row)




