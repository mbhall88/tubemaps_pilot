"""
Script to take the variants within the probe fasta and generate a MSA of these
based on the reference fasta for that gene.
"""
import re

def extract_var_name(header):
    """Function to extract the variant information from a fasta header.
    Args:
        header (str): fasta header.

    Returns:
        (str): The variant information. i.e C45T

    Example header is >alt-C-57T?var_name=C2726136T&enum=4&gene=ahpC&mut=C-57T
    In this case the function would return C2726136T
    """
    return re.search(r'var_name=(.*?)&', header).group(1)

def extract_gene_name(header):
    """Function to extract the gene name from a fasta header.
    Args:
        header (str): fasta header.

    Returns:
        (str): The gene name

    Example header is >alt-C-57T?var_name=C2726136T&enum=4&gene=ahpC&mut=C-57T
    In this case the function would return ahpC
    """
    return re.search(r'gene=(.*?)&', header).group(1)
