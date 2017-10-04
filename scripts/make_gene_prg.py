#!/usr/bin/env python
import os
from Bio import AlignIO
from Bio.AlignIO import MultipleSeqAlignment
import re
import logging
import argparse
from sklearn.cluster import KMeans
import numpy as np


class AlignedSeq(object):
    """
    Object based on a set of aligned sequences.
    """
    def __init__(self, msa_file, file_format='fasta', max_nesting=2,
                 nesting_level=1, min_match_length=3, site=5, alignment=None,
                 interval=None, prg_file=None):
        """
        Args:
            msa_file (str): File path for MSA. Such as my.fasta
            file_format (str): The format of the MSA file.
            max_nesting (int): The maximum level that nodes within nodes can
            occur.
            nesting_level:
            min_match_length (int): Minimum number of bases in a row that must
            match in order collapse a section of the MSA.
            site:
            alignment: A multiple sequence alignment structure. Similar to that
            produced by biopython's AlignIO.read()
            interval:
            prg_file (str): If there already exists a PRG - it's filepath.

        """
        self.msa_file = msa_file
        self.format = file_format
        self.max_nesting = max_nesting
        self.nesting_level = nesting_level
        self.min_match_length = min_match_length
        self.site = site
        self.alignment = alignment
        if not self.alignment:
            logging.info("Read from MSA file {}".format(self.msa_file))
            # read in fasta (or other) alignment file. treats the file as a
            # single alignment, even if there are multiple headers
            self.alignment = AlignIO.read(self.msa_file, self.format)
        self.interval = interval
        self.num_seqs = len(self.alignment)
        # construct consensus sequence for MSA
        self.consensus = self.get_consensus()
        self.length = len(self.consensus)
        self.match_intervals, self.non_match_intervals = \
            self.get_match_intervals()
        self.all_intervals = self.match_intervals + self.non_match_intervals
        logging.info("Non match intervals: %s", self.non_match_intervals)
        self.all_intervals.sort()
        if self.nesting_level == 1:
            self.length_match_intervals = 0
            for interval in self.match_intervals:
                self.length_match_intervals += interval[1] - interval[0] + 1
            self.prop_in_match_intervals = \
                self.length_match_intervals / float(self.length)

        # properties for stats
        self.subAlignedSeqs = {}

        # make prg
        self.delim_char = " "
        self.prg = ''
        if prg_file:
            logging.info("Reading from a PRG file which already exists. "
                         "To regenerate, delete it.")
            with open(prg_file) as f:
                self.prg = f.read()
        else:
            self.prg = self.get_prg()

    def get_consensus(self):
        """Given a set of alignment records from AlignIO, creates
        a consensus string. - and * in non consensus at that position.

        Returns:
            consensus_string (str): The consensus string for the alignment
            with * indicating regions without complete agreement.
        """
        # first sample in MSA's sequence
        first_string = str(self.alignment[0].seq)
        consensus_string = ''
        for i, letter in enumerate(first_string):
            consensus = True
            for record in self.alignment:
                if record.seq[i] != letter:
                    consensus = False
                    break
            if consensus:
                consensus_string += letter
            else:
                consensus_string += '*'
        return consensus_string

    def get_match_intervals(self):
        """Return a list of intervals in which we have
        consensus sequence longer than min_match_length, and
        a list of the non-match intervals left."""
        match_intervals = []
        non_match_intervals = []
        match_count = 0
        match_start = 0
        non_match_start = 0

        if len(self.consensus.replace('-', '')) < self.min_match_length:
            # It makes no sense to classify a fully consensus sequence as
            # a non-match just because it is too short.
            if '*' in self.consensus:
                non_match_intervals.append([0, self.length - 1])
            else:  # the whole alignment is in consensus
                match_intervals.append([0, self.length - 1])
        else:
            for i, letter in enumerate(self.consensus):
                if letter != '*':  # In a match region.
                    # increase the match counter and note the start index
                    if match_count == 0:
                        match_start = i
                    match_count += 1
                else:  # in a non-match region
                    # Check prev match str long enough to add to match_regions
                    match_end = match_start + match_count
                    match_string = self.consensus[match_start: match_end]\
                        .replace('-', '')
                    match_len = len(match_string)

                    if match_len >= self.min_match_length:
                        # if the non_match sequences in the interval are really
                        # the same, add a match interval
                        interval_alignment = \
                            self.alignment[:, non_match_start: match_start + 1]
                        interval_seqs = list(
                            remove_duplicates(
                                [str(record.seq).replace('-', '')
                                 for record in interval_alignment]
                            )
                        )
                        if (non_match_start < match_start and
                                len(interval_seqs) > 1):
                            non_match_intervals.append([non_match_start,
                                                        match_start - 1])
                        elif non_match_start < match_start:
                            match_intervals.append([non_match_start,
                                                    match_start - 1])

                        match_intervals.append([match_start,
                                                match_start + match_count - 1])
                        non_match_start = i

                    match_count = 0

            # At end add last intervals
            match_string = \
                self.consensus[match_start: match_start + match_count]\
                    .replace('-', '')
            match_len = len(match_string)
            if match_len >= self.min_match_length:
                # if the non_match sequences in the interval are really
                # the same, add a match interval
                interval_alignment = \
                    self.alignment[:, non_match_start: match_start + 1]
                interval_seqs = list(
                    remove_duplicates(
                        [str(record.seq).replace('-', '')
                         for record in interval_alignment]
                    )
                )
                if non_match_start < match_start and len(interval_seqs) > 1:
                    non_match_intervals.append([non_match_start,
                                                match_start - 1])
                elif non_match_start < match_start:
                    match_intervals.append([non_match_start, match_start - 1])

                match_intervals.append([match_start,
                                        match_start + match_count - 1])
            else:
                non_match_intervals.append([non_match_start, self.length - 1])

        # check all stretches of consensus are in an interval,
        # and intervals don't overlap
        for i in range(self.length):
            count_match = 0
            for interval in match_intervals:
                if interval[0] <= i <= interval[1]:
                    count_match += 1
            count_non_match = 0
            for interval in non_match_intervals:
                if interval[0] <= i <= interval[1]:
                    count_non_match += 1

            assert (count_match | count_non_match), \
                "Failed to correctly identify match intervals: position %d " \
                "appeared in both match and non-match intervals" % i
            assert (count_match + count_non_match == 1), \
                "Failed to correctly identify match intervals: " \
                "position %d appeared in %d intervals" % (i, count)

        return match_intervals, non_match_intervals

    def kmeans_cluster_seqs_in_interval(self, interval):
        """Divide sequences in interval into subgroups of similar
           sequences. Return a list of lists of ids.

        Args:
            interval list[int, int]: A start and end index for the section of
            the alignment to run kmeans on.

        Returns:
            list[list[str]]: a nested list of sample ids in the groups they
            are clustered into.
        """
        if interval[1] - interval[0] <= self.min_match_length:
            logging.info("Small variation site in interval %s \n", interval)
            logging.debug("interval[1] - interval[0] <= self.min_match_length: "
                          "{} <= {}".format(interval[1] - interval[0],
                                            self.min_match_length))
            interval_alignment = self.alignment[:, interval[0]:interval[1] + 1]
            interval_seqs = list(
                remove_duplicates(
                    [str(record.seq).replace('-', '')
                     for record in interval_alignment])
            )
            len_alt_allele_seqs = len(list(remove_duplicates(interval_seqs)))
            assert len(interval_seqs) == len_alt_allele_seqs, \
                "should not have duplicate alternative allele sequences"

            return_id_lists = []
            for seq in interval_seqs:
                for record in self.alignment:
                    record_interval_seq = \
                        str(record.seq[interval[0]: interval[1] + 1])
                    if record_interval_seq.replace('-', '') == seq:
                        return_id_lists.append(record.id)

        else:
            logging.debug("Get kmeans partition of "
                          "interval {}".format(interval))
            interval_alignment = self.alignment[:, interval[0]:interval[1] + 1]
            interval_seq_dict = {}
            small_interval_seq_dict = {}
            seq_dict_keys = []

            for record in interval_alignment:
                seq = str(record.seq).replace('-', '')
                if seq in interval_seq_dict.keys():
                    interval_seq_dict[seq].append(record.id)
                elif seq in small_interval_seq_dict.keys():
                    small_interval_seq_dict[seq].append(record.id)
                elif len(seq) >= self.min_match_length:
                    interval_seq_dict[seq] = [record.id]
                    seq_dict_keys.append(seq)
                else:
                    small_interval_seq_dict[seq] = [record.id]
                    seq_dict_keys.append(seq)

            assert len(seq_dict_keys) == \
                   len(list(remove_duplicates(seq_dict_keys))), \
                "error, have duplicate dictionary keys"

            assert set(interval_seq_dict.keys())\
                .isdisjoint(small_interval_seq_dict.keys()), \
                "error, should have no overlap of keys"

            logging.debug("Add classes corresponding to {} small sequences"
                          .format(len(small_interval_seq_dict.keys())))

            small_return_id_lists = small_interval_seq_dict.values()  # ????

            logging.debug("Now add classes corresponding to {} longer sequences"
                          .format(len(interval_seq_dict.keys())))

            interval_seqs = interval_seq_dict.keys()
            if len(interval_seqs) > 1:
                logging.debug("Transform sequences into kmer "
                              "occurrence vectors")

                # make dict based on number of kmers in all sequences
                self.kmer_dict = {}
                n = 0
                for j, seq in enumerate(interval_seqs):
                    for i in range(len(seq) - self.min_match_length + 1):
                        if seq not in self.kmer_dict.keys():
                            self.kmer_dict[seq[i:i+self.min_match_length]] = n
                            n += 1
                logging.debug("These vectors have length %d" % n)

                # transform to vectors using dict
                seq_kmer_counts = np.zeros(shape=(len(interval_seqs), n))
                for j, seq in enumerate(interval_seqs):
                    counts = np.zeros(n)
                    for i in range(len(seq) - self.min_match_length + 1):
                        idx = self.kmer_dict[seq[i: i + self.min_match_length]]
                        counts[idx] += 1
                    seq_kmer_counts[j] = counts  # update seq row with counts

                # cluster sequences using kmeans
                logging.debug("Now cluster:")

                n_clusters = 1
                kmeans = KMeans(n_clusters=n_clusters,
                                random_state=2).fit(seq_kmer_counts)

                # sum of distances of samples from their closest centroid
                pre_cluster_inertia = kmeans.inertia_
                if pre_cluster_inertia == 0:
                    logging.debug("pre_cluster_inertia is 0!")
                    for key in interval_seq_dict.keys():
                        logging.debug("seq: {}, num_seqs with this seq: {}"
                                      .format(key, len(interval_seq_dict[key])))

                cluster_inertia = pre_cluster_inertia
                logging.debug("number of clusters: {}, inertia: {}"
                              .format(n_clusters, cluster_inertia))

                def _cluster_consensus_not_found(_cluster_inertia, _n_clusters):
                    """State controlling the increase in cluster number and
                    iteration of kmeans on those cluster sizes.

                    Args:
                        _cluster_inertia (int): Sum of distances of samples from
                        their closest centroid.
                        _n_clusters (int): Number of clusters
                    Returns:
                        Bool: Whether all of the three conditions are met
                    """
                    inertia_greater_than_zero = _cluster_inertia > 0
                    inertia_more_than_half_initial = \
                        _cluster_inertia > pre_cluster_inertia / 2
                    too_many_clusters = _n_clusters <= len(interval_seqs)

                    return (inertia_greater_than_zero and
                            inertia_more_than_half_initial and
                            too_many_clusters)

                # increase number of clusters until one of the following happens
                while _cluster_consensus_not_found(cluster_inertia, n_clusters):
                    n_clusters += 1
                    kmeans = KMeans(n_clusters=n_clusters,
                                    random_state=2).fit(seq_kmer_counts)
                    cluster_inertia = kmeans.inertia_
                    logging.debug("number of clusters: {}, inertia: {}"
                                  .format(n_clusters, cluster_inertia))

                logging.debug("Extract equivalence classes from this partition")

                # todo: could improve this implementation
                # labels for which cluster each sample belongs to
                equiv_class_ids = list(kmeans.predict(seq_kmer_counts))
                big_return_id_lists = []
                for i in range(max(equiv_class_ids)+1):
                    big_return_id_lists.append([])

                for i, val in enumerate(equiv_class_ids):
                    big_return_id_lists[val]\
                        .extend(interval_seq_dict[interval_seqs[i]])

            elif len(interval_seqs) == 1:
                big_return_id_lists = [interval_seq_dict[interval_seqs[0]]]

            # now merge big and small return_id_lists so as to
            # maintain the order of seqs before
            logging.debug("Merge return id lists for the partitions")

            # todo: re-implement
            return_id_lists = []
            added_ids = []
            big_keys = interval_seq_dict.keys()
            small_keys = small_interval_seq_dict.keys()
            for seq in seq_dict_keys:
                if seq in small_keys:
                    logging.debug("add (small) return ids: {}"
                                  .format(small_interval_seq_dict[seq]))

                    return_id_lists.append(small_interval_seq_dict[seq])
                elif seq in big_keys:
                    not_added = [seq_id
                                 for seq_id in interval_seq_dict[seq]
                                 if seq_id not in added_ids]
                    if len(not_added) == len(interval_seq_dict[seq]):
                        logging.debug("want to add (big) return ids: {}"
                                      .format(interval_seq_dict[seq]))

                        for i in range(len(big_return_id_lists)):
                            if interval_seq_dict[seq][0] in \
                                    big_return_id_lists[i]:
                                logging.debug("add (big) return ids {}: {}"
                                              .format(i,
                                                      big_return_id_lists[i]))

                                return_id_lists\
                                    .append(big_return_id_lists.pop(i))
                                added_ids.extend(return_id_lists[-1])
                                break
                    else:
                        assert len(not_added) == 0, "Equivalent sequences " \
                                                    "should be in same part " \
                                                    "of partition and are not"
                else:
                    logging.warning("Key {} doesn't seem to be in "
                                    "either big keys or small keys".format(seq))

        assert len(interval_alignment) == sum(len(i) for i in return_id_lists),\
            "I seem to have lost (or gained?) some sequences " \
            "in the process of clustering"

        assert len(return_id_lists) > 1, "should have some alternate alleles," \
                                         " not only one sequence, this is a " \
                                         "non-match interval"

        logging.debug(return_id_lists)
        return return_id_lists

    def get_sub_alignment_by_list_id(self, list_of_id, interval=None):
        """Returns a MSA of the ids provided, over a specified interval.

        Args:
            list_of_id (list[str]): List of sample ids to create MSA from.
            interval (list[int, int]): Interval over which to produce a
            sub-alignment. OPTIONAL

        Returns:
            Bio.AlignIO.MultipleSeqAlignment: A sub-alignment of the required
            samples over the requested interval.
        """
        list_records = [record
                        for record in self.alignment
                        if record.id in list_of_id]
        sub_alignment = MultipleSeqAlignment(list_records)
        if interval:
            sub_alignment = sub_alignment[:, interval[0]:interval[1]+1]
        return sub_alignment

    def get_prg(self):
        prg = ""
        # last_char = None
        # skip_char = False

        for interval in self.all_intervals:
            if interval in self.match_intervals:
                # WLOG can take first sequence as all same in this interval
                seq = str(self.alignment[0].seq)[interval[0]: interval[1] + 1]\
                    .replace('-', '')
                prg += seq

            else:
                # Define variant site number and increment for next available
                site_num = self.site
                self.site += 2
                variant_seqs = []

                # Define the variant seqs to add
                if (self.nesting_level == self.max_nesting or
                    interval[1] - interval[0] <= self.min_match_length):
                    # Have reached max nesting lvl, add all variants in interval
                    logging.debug("Have reached max nesting level or have a "
                                  "small variant site, so add all variant "
                                  "sequences in interval.")
                    sub_alignment = self.alignment[:, interval[0]:interval[1]+1]
                    variant_seqs = list(remove_duplicates(
                        [str(record.seq)
                         for record in sub_alignment])
                    )
                    logging.debug("Variant seqs found: %s" % variant_seqs)
                    variant_seqs = [record.replace('-', '')
                                    for record in variant_seqs]
                    logging.debug("Which is equivalent to: %s" % variant_seqs)

                else:
                    # divide seqs into subgroups and define prg for each
                    logging.debug("Divide sequences into subgroups and define "
                                  "prg for each subgroup.")
                    recur = True

                    list_list_id = \
                        self.kmeans_cluster_seqs_in_interval(interval)

                    list_sub_alignments = \
                        [self.get_sub_alignment_by_list_id(list_id, interval)
                         for list_id in list_list_id]

                    num_classes_in_partition = len(list_list_id)

                    if len(list_sub_alignments) == self.num_seqs:
                        logging.debug("Partition does not group any sequences "
                                      "together, all seqs get unique class in "
                                      "partition")
                        recur = False
                    elif interval[0] not in self.subAlignedSeqs.keys():
                        self.subAlignedSeqs[interval[0]] = []
                        logging.debug("subAlignedSeqs now has keys: {}"
                                      .format(self.subAlignedSeqs.keys()))
                    else:
                        logging.debug("subAlignedSeqs already had key {} in "
                                      "keys: {}. This shouldn't happen."
                                      .format(interval[0],
                                              self.subAlignedSeqs.keys()))

                    while len(list_sub_alignments) > 0:
                        sub_alignment = list_sub_alignments.pop(0)
                        sub_aligned_seq = \
                            AlignedSeq(msa_file=self.msa_file,
                                       file_format=self.format,
                                       max_nesting=self.max_nesting,
                                       nesting_level=self.nesting_level+1,
                                       min_match_length=self.min_match_length,
                                       site=self.site,
                                       alignment=sub_alignment,
                                       interval=interval)

                        # add the prg for the partition and update the current
                        # site number to ensure there are no overlaps between
                        # recursive iterations.
                        variant_seqs.append(sub_aligned_seq.prg)
                        self.site = sub_aligned_seq.site

                        if recur:
                            self.subAlignedSeqs[interval[0]]\
                                .append(sub_aligned_seq)

                    assert num_classes_in_partition == len(variant_seqs), \
                        "I don't seem to have a sub-prg sequence for all " \
                        "parts of the partition - there are {} classes in " \
                        "partition, and {} variant seqs"\
                            .format(num_classes_in_partition, len(variant_seqs))

                assert len(variant_seqs) > 1, "Only have one variant seq"

                length_variant_seqs = len(list(remove_duplicates(variant_seqs)))
                if len(variant_seqs) != length_variant_seqs:
                    print("variant_seqs: ")
                    for s in variant_seqs:
                        print(s)
                        print(", ")

                assert len(variant_seqs) == length_variant_seqs, \
                    "have repeat variant seqs"

                # Add the variant seqs to the prg
                # considered making it so start of prg was not delim_char,
                # but that would defeat the point if it
                prg += "{0}{1}{0}".format(self.delim_char, site_num)

                while len(variant_seqs) > 1:
                    prg += variant_seqs.pop(0)
                    prg += "{0}{1}{0}".format(self.delim_char, site_num + 1)
                prg += variant_seqs.pop()
                prg += "{0}{1}{0}".format(self.delim_char, site_num)

        return prg

    def split_on_site(self, prg_string, site_num):
        """Splits a PRG string on a given site number.

        Args:
            prg_string (str): PRG
            site_num: The site number to split PRG on

        Returns:
            list[str, str, str]: A list which should have three elements. The
            first element is the pre-site sequence, the second element is the
            site to excise, and the last element is the post-site sequence.

        Examples:
            >>> prg = ' 3 GAGAGAGAG 3  5 GAGAGAGAG 5 15 GAGAG 15 '
            >>> split_on_site(prg, 5)
            [' 3 GAGAGAGAG 3 ', 'GAGAGAGAG', '15 GAGAG 15 ']

        """
        site_matches = re.finditer(
            '{0}{1}{0}'.format(self.delim_char, site_num), prg_string)
        # todo: change below to a.span() instead of start and end
        site_coords = [(a.start(), a.end()) for a in list(site_matches)]
        last_pos = None
        split_strings = []
        for start, end in site_coords:
            split_strings.append(prg_string[last_pos:start])
            last_pos = end
        split_strings.append(prg_string[last_pos:])
        delim = "%s%d%s" %(self.delim_char, site_num, self.delim_char)
        check_string = delim.join(split_strings)
        assert check_string == prg_string, \
            "Something has gone wrong with the string split " \
            "for site %d\nsplit_strings: %s" % (site_num, split_strings)
        return split_strings

    def get_gfa_string(self, prg_string, pre_var_id=None):
        """Produces a GFA string based on a given PRG string.

        Args:
            prg_string (str): PRG
            pre_var_id (int): This variable is never directly used...

        Returns:
            The GFA id for the portion of the gfa string that the call to this
            function generated.
        """
        end_ids = []
        # iterate through sites present, updating gfa_string with each in turn
        # todo: this while condition needs to be changed to regex match as
        # currently if your site is 5, it will find 15, 25 etc.
        while str(self.gfa_site) in prg_string:
            logging.debug("gfa_site: {}".format(self.gfa_site))
            prgs = self.split_on_site(prg_string, self.gfa_site)
            logging.debug("prgs: %s", prgs)
            assert len(prgs) == 3, "Invalid prg sequence {0} for site " \
                                   "{1} and id {2}".format(prg_string,
                                                           self.gfa_site,
                                                           self.gfa_id)

            # add pre-var site string and links from previous seq fragments
            if prgs[0] != '':
                self.gfa_string += "S\t{}\t{}\tRC:i:0\n".format(self.gfa_id,
                                                                prgs[0])
            else:
                # adds an empty node for empty pre var site seqs
                self.gfa_string += "S\t{}\t{}\tRC:i:0\n".format(self.gfa_id,
                                                                "*")
            pre_var_id = self.gfa_id
            self.gfa_id += 1
            for _id in end_ids:
                    self.gfa_string += "L\t{}\t+\t{}\t+\t0M\n"\
                        .format(_id, pre_var_id)
                    end_ids = []

            # recursively add segments for each of the variant haplotypes at
            # this site, saving the end id for each haplotype
            variants = self.split_on_site(prgs[1], self.gfa_site+1)
            assert len(variants) > 1, "Invalid prg sequence {0} for site " \
                                      "{1} and id {2}".format(prg_string,
                                                              self.gfa_site+1,
                                                              self.gfa_id)
            logging.debug("vars: %s", variants)

            self.gfa_site += 2
            logging.debug("gfa_site: %d", self.gfa_site)
            for var_string in variants:
                if pre_var_id:
                    self.gfa_string += "L\t%d\t+\t%d\t+\t0M\n" % (pre_var_id,
                                                                  self.gfa_id)
                var_end_ids = self.get_gfa_string(prg_string=var_string,
                                                  pre_var_id=pre_var_id)
                end_ids.extend(var_end_ids)

            prg_string = prgs[2]
            # pre_var_id = None

        # finally add the final bit of sequence after variant site
        if prg_string != '':
            self.gfa_string += "S\t%d\t%s\tRC:i:0\n" % (self.gfa_id, prg_string)
        else:
            self.gfa_string += "S\t%d\t%s\tRC:i:0\n" % (self.gfa_id, "*")
        for _id in end_ids:
            self.gfa_string += "L\t%d\t+\t%d\t+\t0M\n" % (_id, self.gfa_id)
        # end_ids = []
        return_id = [self.gfa_id]
        self.gfa_id += 1
        return return_id

    def write_gfa(self, outfile):
        """Creates a gfa file from the prg and writes it to file.

        Args:
            outfile (str): Filepath to save file as.

        """
        with open(outfile, 'w') as gfa_out_file:
            # initialize gfa_string, id and site, then update string with prg
            self.gfa_string = "H\tVN:Z:1.0\tbn:Z:--linear --singlearr\n"
            self.gfa_id = 0
            self.gfa_site = 5
            self.get_gfa_string(prg_string=self.prg)
            gfa_out_file.write(self.gfa_string)

    def write_prg(self, outfile):
        """Writes the prg to outfile."""
        with open(outfile, 'w') as prg_out_file:
            prg_out_file.write(self.prg)

    @property
    def max_nesting_level_reached(self):
        """Finds the maximum level of nesting that was reached by the alignment.

        Returns:
            int: Maximum nesting level as an integer.
        """
        max_nesting = []
        if self.subAlignedSeqs == {}:
            logging.debug("self.subAlignedSeqs == {} at nesting level "
                          "%d for interval %s",
                          self.nesting_level, self.interval)

            max_nesting.append(self.nesting_level)
        else:
            logging.debug(
                "self.subAlignedSeqs.keys(): %s", self.subAlignedSeqs.keys())

            logging.debug(
                "self.subAlignedSeqs[self.subAlignedSeqs.keys()[0]]: %s",
                self.subAlignedSeqs[self.subAlignedSeqs.keys()[0]])

            for interval_start in self.subAlignedSeqs.keys():
                logging.debug("interval start: %d", interval_start)
                for subaseq in self.subAlignedSeqs[interval_start]:
                    logging.debug(
                        "type of subAlignedSeqs object in list: %s",
                        type(subaseq))

                    recur = subaseq.max_nesting_level_reached
                    logging.debug(
                        "recur max level nesting returned: %d, "
                        "which has type %s", recur, type(recur))

                    max_nesting.append(recur)
        m = max(max_nesting)
        logging.debug("found the max of %s is %d", max_nesting, m)
        return m


def remove_duplicates(seqs):
    """Removes duplicates from a list and returns them as a generator in the
    same order.

    Args:
        seqs (list[str]): A list of DNA sequences.

    Returns:
         A generator of the unique values in the order they are in the alignment
    """
    seen = set()
    for x in seqs:
        if x in seen:
            continue
        seen.add(x)
        yield x


def main():

    parser = argparse.ArgumentParser()
    parser.add_argument("MSA", action="store", type=str,
                        help='Input file: a multiple sequence alignment in \
                        supported format. If not in aligned fasta format, \
                        use -f to input the format type')
    parser.add_argument("-f", "--format", dest='format', action='store',
                        default="fasta",
                        help='Format of MSA, must be a biopython AlignIO input \
                        format. See http://biopython.org/wiki/AlignIO. \
                        Default: fasta')
    parser.add_argument("--max_nesting", dest='max_nesting', action='store',
                        type=int, default=10,
                        help='Maximum number of levels to use for nesting. \
                        Default: 10')
    parser.add_argument("--min_match_length", dest='min_match_length',
                        action='store',type=int, default=7,
                        help='Minimum number of consecutive characters which \
                        must be identical for a match. Default: 7')
    parser.add_argument("-p", "--prefix", dest='prefix',
                        action='store', help='Output prefix')
    parser.add_argument("-v", "--verbosity", dest='verbosity',
                        action='store_true',
                        help='If flagged, puts logger in DEBUG mode')
    args = parser.parse_args()

    # Setting the prefix name for output files
    if not args.prefix:
        prefix = args.MSA
    else:
        prefix = args.prefix
    prefix += ".max_nest{}.min_match{}".format(args.max_nesting,
                                               args.min_match_length)

    if args.verbosity:
        logging.basicConfig(filename='{}.log'.format(prefix),
                            level=logging.DEBUG,
                            format='%(asctime)s %(message)s',
                            datefmt='%d/%m/%Y %I:%M:%S')
        logging.debug("Using debug logging")
    else:
        logging.basicConfig(filename='{}.log'.format(prefix),
                            level=logging.INFO,
                            format='%(asctime)s %(message)s',
                            datefmt='%d/%m/%Y %I:%M:%S')
        logging.info("Using info logging")
    logging.info("Input parameters max_nesting: %d, min_match_length: %d",
                 args.max_nesting, args.min_match_length)

    if os.path.isfile('{}.prg'.format(prefix)):
        prg_file = '{}.prg'.format(prefix)
        aseq = AlignedSeq(args.MSA, file_format=args.format,
                          max_nesting=args.max_nesting,
                          min_match_length=args.min_match_length,
                          prg_file=prg_file)
    else:
        aseq = AlignedSeq(args.MSA, file_format=args.format,
                          max_nesting=args.max_nesting,
                          min_match_length=args.min_match_length)
        logging.info("Write PRG file to {}.prg".format(prefix))
        aseq.write_prg('{}.prg'.format(prefix))
        m = aseq.max_nesting_level_reached
        logging.info("Max_nesting_reached\t%d", m)
    logging.info("Write GFA file to %s.gfa", prefix)
    aseq.write_gfa('%s.gfa' % prefix)

    with open("summary.tsv", 'a') as s:
        s.write("%s\t%d\t%d\t%f\n" % (args.MSA, aseq.site - 2,
                                      aseq.max_nesting_level_reached,
                                      aseq.prop_in_match_intervals))


if __name__ == "__main__":
    main()
    #cProfile.run('main()', sort='time')
