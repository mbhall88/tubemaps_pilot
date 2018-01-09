import itertools
import difflib
import argparse
import json
import os
from Bio import SeqIO

class Node(object):
    """Class object to hold nodes, which in this context is the sequence."""
    def __init__(self, sequence=None, in_edges=None, out_edges=None, name=None):
        """Initialisation of the graph object.
        Args:
            sequence (str): A DNA sequence of the node.
            in_edges (list[str]): A list of the node ids coming into this node.
            out_edges (list[str]): As above for the nodes going out of node.
            
        """
        self.sequence = sequence
        self.in_edges = in_edges if in_edges else []
        self.out_edges = out_edges if out_edges else []
        self.name = name

    def __repr__(self):
        """Function that dictates the material printed for this class."""
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
    """An object holding the edges between nodes."""
    def __init__(self, to_node=None, from_node=None):
        """Initialisation function for the edge class.
        Args:
            to_node (str): The node id this edge connects to.
            from_node (str): The node id this edge comes from.
        
        """
        self.to_node = to_node
        self.from_node = from_node

    def __repr__(self):
        """Function that dictates the material printed for this class."""
        return "To: {}\nFrom: {}".format(self.to_node, self.from_node)

    def create_from_line(self, line_str):
        """Create edge from line in GFA file."""
        line = line_str.split('\t')
        self.from_node = line[1]
        self.to_node = line[3]
        # add code to self associate with node
        # need to have a look up table at the graph level


class Graph(object):
    """Class that contains all the information for the PRG."""
    def __init__(self, nodes=None, edges=None, from_gfa=None):
        """Initialisation function for the Graph class.
        Args:
            nodes (dict[Node]): A dictionary of all the nodes in the graph.
            edges (list[Edge]): A list of edges within the graph.
            from_gfa (str): Path to GFA file to load graph from.
            
        """
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
        """Generate all components of graph from a given GFA file.
        
        Args:
            filename (str): Path to the GFA file to load from.
            
        """
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
        """Add node into graph."""
        self.nodes[node.name] = node

    def add_edges(self, edges):
        """Add edges into graph. This is best done once all of the nodes are 
        in the graph, otherwise there is no nodes to connect.
        
        Args:
            edges (list[Edge] | Edge): A list of edges or a single instance."""
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
        """Given a path, this function will return the DNA sequence of it.
        Args:
            path (list[str]): A list of node ids which is a path.
            
        Returns:
            sequence (str): The DNA sequence corresponding to the path.
            
        """
        sequence = ""
        for node_id in path:
            sequence += self.nodes[node_id].sequence
        return sequence

    def generate_all_paths(self):
        """Generate all possible paths through the graph.

        Returns:
            list[list[str]]: List of all paths through graph. Each path is a 
            list of node ids.

        """
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
        """Find all paths between two points in the graph.
        
        Args:
            start (str): The node id to start the path from.
            end (str): The node id for the end of the path.
            
        Returns:
            list[list[str]]: List of all paths between the specified points in 
            the graph. Each path is a list of node ids.
            
        """
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
        """Find all the possible start points within the graph.
        
        Returns:
            list[str]: List of node ids.
            
        """
        return [node.name
                for node in self.nodes.values()
                if not node.in_edges]

    def find_all_end_nodes(self):
        """Find all possible ending points within the graph.
        
        Returns:
            list[str]: List of node ids.
            
        """
        return [node.name
                for node in self.nodes.values()
                if not node.out_edges]

    def find_seq_path(self, seq):
        """Find the path for a sequence through a given graph.
        At the moment this will only find an exact match. Therefore the 
        sequence must have been involved in the construction of the PRG.

        Args:
            seq (str): The sequence you want to find a path for.
        
        Returns:
            list[str]: A list of node ids in the order that the sequence 
            follows through the graph.
            
        """
        seq = seq.replace('-', '')
        path = []
        #  returns list of node ids and create list of those nodes
        head_node_ids = self.find_all_start_nodes()
        head_nodes = [self.nodes[node_id] for node_id in head_node_ids]
        # determine which node is the correct match for our sequence
        matches = find_match(seq, head_nodes)
        for match in matches:
            try:
                # remove the sequence of the match from the start of our sequence
                new_seq = seq[len(match.sequence):] if not match.sequence == '*' else seq
                # start recursive search for path through graph
                final_path = self._helper(new_seq, match.name, path + [match.name])
                return final_path
            except (AttributeError, TypeError) as err:
                if str(err) in ("'NoneType' object has no attribute 'name'",
                                "'NoneType' object is not iterable"):
                    continue
                else:
                    raise err

    def _helper(self, seq, start_from, paths_acc):
        """Helper function for path finder that recursively finds the correct 
        path through the graph and will end once we hit the end of the 
        sequence/graph.
        
        Args:
            seq (str): Sequence to search for path.
            start_from (str): Node id to start search from.
            paths_acc (list[str]): A list of node ids followed through the 
            graph up to the current point in the search. This list accumulates 
            throughout the recursion.
            
        Returns:
            list[str]: A list of node ids.
            
        """
        if not start_from or not seq:
            return paths_acc
        nodes_to_try = [self.nodes[key] for key in self.nodes[start_from].out_edges]
        matches = find_match(seq, nodes_to_try)
        for match in matches:
            try:
                new_seq = seq[len(
                    match.sequence):] if not match.sequence == '*' else seq
                return self._helper(new_seq, match.name, paths_acc + [match.name])
            except (AttributeError, TypeError) as err:
                if str(err) in ("'NoneType' object has no attribute 'name'",
                                "'NoneType' object is not iterable"):
                    continue
                else:
                    raise err
        # raise this error as there are no matches, meaning we hit a dead end in the graph
        # and need to back-track. This error will cause the recursive helper function to back-track
        raise (TypeError("'NoneType' object is not iterable"))


def find_match(seq, nodes):
    """Find which node matches start of sequence and return which node matches

    Args:
        seq (str): The sequence to query nodes against.
        nodes (list[Node]): A list of nodes to test against the sequence.

    Returns:
        matches (list[Node]): A list of nodes that match with the sequence.
    """
    matches = []
    for node in nodes:
        seq_length = len(node.sequence)
        # need to also include * as there could also be matches on that path.
        if node.sequence in ('*', seq[:seq_length]):
            matches.append(node)
    return matches


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


def json_formatter(graph, fasta):
    """Generates the json object required for generating tubemaps.

    Args:
        graph (Graph): Graph to find paths through
        fasta (dict): fasta dictionary containing samples you want paths for.
        This dictionary must come from the fasta_parser method.

    Returns:
        dict: Dictionary with two items - nodes, with a list of all node objects
         and paths with the paths for each sample.
    """
    paths = []
    for idx, (key, seq) in enumerate(fasta.items()):
        path_obj = {
            'id': idx,
            'name': key,
            'sequence': graph.find_seq_path(seq)
        }
        paths.append(path_obj)

    nodes = []
    for key, node in graph.nodes.items():
        node_obj = {'name': key, 'seq': node.sequence}
        nodes.append(node_obj)
    obj_to_write = {'nodes': nodes, 'paths': paths}
    return obj_to_write


def main():
    parser = argparse.ArgumentParser(
        description="Find the path for each sample in a fasta file through a "
                    "given GFA file.")

    parser.add_argument(
        "-o", "--output_path",
        help="Directory to save the output to. Default: Current Directory",
        type=str, default='.')

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

    graph = Graph(from_gfa=args.gfa_file)
    fasta = fasta_parser(args.fasta)
    # generate the dictionary/object for json output. this contains paths
    # through the graph for each sample in fasta, as well as all the details
    # of each node in the graph.
    paths_and_nodes_obj = json_formatter(graph, fasta)

    basename = os.path.basename(args.fasta)
    json_fname = os.path.splitext(basename)[0] + '.json'
    json_path = os.path.join(args.output_path, json_fname)

    # write dictionary out to json file.
    with open(json_path, 'w') as json_fout:
        json.dump(paths_and_nodes_obj, json_fout)

if __name__ == '__main__':
    main()
