#!/bin/sh

PRG_SCRIPT=~/Dropbox/PhD/prg_tubemaps/scripts/make_gene_prg.py 
PATH_FINDER=~/Dropbox/PhD/prg_tubemaps/scripts/path_finder.py

f () {
    gene="$1"
    gene_dir="$2"
    out_dir="$3"
    (>&2 echo "Creating PRG for $gene")
    python3 "$PRG_SCRIPT" "${gene_dir}_msa.fa" \
        --max_nesting 10 --min_match_length 5 -p "$gene_dir" -v
    (>&2 echo "PRG complete for $gene")
    (>&2 echo "Finding paths for $gene")
    python3 "$PATH_FINDER" \
        -g "${gene_dir}"*.gfa -f "${gene_dir}"*.fa -o "${out_dir}/"
    (>&2 echo "Path finding complete for $gene")
}

while read -r path
do
    gene="$(basename $path)"
    gene_dir="${path}/${gene}"
    { time f "$gene" "$gene_dir" "$path" 2> "${gene_dir}.stderr"; } 2> \
        "${gene_dir}.time"
done < "${1:-/dev/stdin}"
