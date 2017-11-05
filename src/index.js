import * as tubeMap from '../src/tubemap.js';

// const nodes = [
//     { name: 'A', seq: 'AAAA' },
//     { name: 'B', seq: 'TTG' },
//     { name: 'C', seq: 'CC' },
// ];
//
// const paths = [
//     { id: 0, name: 'Track 1', sequence: ['A', 'B', 'C'] },
//     { id: 1, name: 'Track 2', sequence: ['A', '-B', 'C'] },
//     { id: 2, name: 'Track 3', sequence: ['A', 'C'] },
// ];
// let data = require('../data/testing/test.json');
let data = require('../data/HIV1_ALL_2016_pol_DNA_5_samples.json');
// add paths for each sample to paths object
// for (const [sampleId, path] of Object.entries(data)) {
//     paths.push({
//         id: pathIdCounter,
//         name: sampleId,
//         sequence: path
//     });
//     pathIdCounter++
// }

// d3.json('../data/testing/test.json', function(data) {
//     console.log(data);
const nodes = data.nodes,
   paths = data.paths;


tubeMap.create({
    svgID: '#svg',
    nodes,
    tracks: paths
});
tubeMap.useColorScheme(0);
// });
//

