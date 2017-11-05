import itertools
import difflib
import argparse
import json
from Bio import SeqIO

class Node(object):
    def __init__(self, sequence=None, in_edges=None, out_edges=None, name=None):
        self.sequence = sequence
        self.in_edges = in_edges if in_edges else []
        self.out_edges = out_edges if out_edges else []
        self.name = name

    def __repr__(self):
        return "Node ID: {}\nNode Sequence: {}\nNodes coming in: {}\nNodes " \
               "going out: {}\n".format(self.name, self.sequence, self.in_edges,
                                        self.out_edges)

    def __eq__(self, other):
        return self.name == other.name

    def create_from_line(self, line_str):
        """Populate the node with the information in a line from a GFA file."""
        name, seq = line_str.split('\t')[1:3]
        self.name = name
        self.sequence = seq


class Edge(object):
    def __init__(self, to_node=None, from_node=None):
        self.to_node = to_node
        self.from_node = from_node

    def __repr__(self):
        return "To: {}\nFrom: {}".format(self.to_node, self.from_node)

    def create_from_line(self, line_str):
        """Create edge from line in GFA file."""
        line = line_str.split('\t')
        self.from_node = line[1]
        self.to_node = line[3]
        # add code to self associate with node
        # need to have a look up table at the graph level


class Graph(object):
    def __init__(self, nodes=None, edges=None, from_gfa=None):
        self.nodes = nodes if nodes else {}  # create getter/setter functions
        self.add_edges(edges)
        # only allow for loading from GFA if no edges/nodes given
        if from_gfa and not nodes and not edges:
            self.load_from_gfa(from_gfa)
        else:
            raise Exception(
                "Cannot load from GFA and specify nodes/edges at the same time.")
            # self.all_paths = [self.find_all_paths()]

    def load_from_gfa(self, filename):
        with open(filename, 'r') as gfa:
            # add nodes as they're created. add their edges at the end
            edges = []
            for line in gfa:
                if line.startswith('S'):
                    node = Node()
                    node.create_from_line(line)
                    self.add_node(node)
                elif line.startswith('L'):
                    edge = Edge()
                    edge.create_from_line(line)
                    edges.append(edge)

        self.add_edges(edges)

    def add_node(self, node):
        self.nodes[node.name] = node

    def add_edges(self, edges):
        if isinstance(edges, list):
            for edge in edges:
                self.add_edges(edge)
        elif edges:
            if edges.from_node:
                self.nodes[edges.from_node].out_edges.append(edges.to_node)
            if edges.to_node:
                self.nodes[edges.to_node].in_edges.append(edges.from_node)

    def generate_all_possible_sequences(self):
        """Generate all the possible sequences from all possible
        paths through the graph.

        Returns:
            dict[str: list[str]]: a dictionary with the key being
            the sequence and the value being the path taken to
            generate the sequence.
        """
        all_paths = self.generate_all_paths()
        all_seqs = {self.sequence_of_path(path): path for path in all_paths}
        # TODO: remove all * symbols and then filter any empty remaining
        return all_seqs

    def sequence_of_path(self, path):
        sequence = ""
        for node_id in path:
            sequence += self.nodes[node_id].sequence
        return sequence

    def generate_all_paths(self):
        start_nodes = self.find_all_start_nodes()
        end_nodes = self.find_all_end_nodes()
        # get all permutations of the two lists
        all_pairs = [(start, end) for start in start_nodes for end in end_nodes]
        all_paths = []
        for start, end in all_pairs:
            all_paths.append(self.find_all_paths(start, end))
        # flatten and return the list of all paths
        return list(itertools.chain(*all_paths))

    def find_all_paths(self, start, end, path=[]):
        path = path + [start]
        if start == end:
            return [path]
        if not start in self.nodes:
            return []
        paths = []
        for node in self.nodes[start].out_edges:
            if node not in path:
                newpaths = self.find_all_paths(node, end, path)
                for newpath in newpaths:
                    paths.append(newpath)
        return paths

    def find_all_start_nodes(self):
        return [node.name
                for node in self.nodes.values()
                if not node.in_edges]

    def find_all_end_nodes(self):
        return [node.name
                for node in self.nodes.values()
                if not node.out_edges]




def main():
    parser = argparse.ArgumentParser(
        description="Find the path for each sample in a fasta file through a "
                    "given GFA file.")

    parser.add_argument(
        "-o", "--output_path",
        help="Path to save the output to. Default: output.json",
        type=str, default='output.json')

    parser.add_argument(
        "-g", "--gfa_file",
        help="Path to the GFA containing graph information.",
        type=str,
        required=True)

    parser.add_argument(
        "-f", "--fasta",
        help="Path to the fasta file you want paths for",
        required=True,
        type=str)

    args = parser.parse_args()

    g = Graph(from_gfa=args.gfa_file)
    all_paths = g.generate_all_possible_sequences()
    seqs = all_paths.keys()
    fasta = list(SeqIO.parse(args.fasta, 'fasta'))

    nodes = [{'name': node.name, 'seq': node.sequence} for node in g.nodes.values()]
    paths = []
    for record in fasta:
        closest = difflib.get_close_matches(record.seq, seqs, n=1)[0]
        d = {'id': record.id, 'name': record.id, 'sequence': all_paths[closest]}
        paths.append(d)
        # print("Original sequence: {}".format(record.seq))
        # print("Found sequence:    {}".format(closest.replace('*', '')))
        # print("Path to take for {} is: {}".format(record.id, all_paths[closest]))

    with open(args.output_path, 'w') as f_out:
        json.dump({'nodes': nodes, 'paths': paths}, f_out, indent=4)


if __name__ == '__main__':
    main()
