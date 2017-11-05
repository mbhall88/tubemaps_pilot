/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony export (immutable) */ __webpack_exports__["changeTrackVisibility"] = changeTrackVisibility;
/* harmony export (immutable) */ __webpack_exports__["changeExonVisibility"] = changeExonVisibility;
/* harmony export (immutable) */ __webpack_exports__["setMergeNodesFlag"] = setMergeNodesFlag;
/* harmony export (immutable) */ __webpack_exports__["setSoftClipsFlag"] = setSoftClipsFlag;
/* harmony export (immutable) */ __webpack_exports__["setShowReadsFlag"] = setShowReadsFlag;
/* harmony export (immutable) */ __webpack_exports__["setColorSet"] = setColorSet;
/* harmony export (immutable) */ __webpack_exports__["setNodeWidthOption"] = setNodeWidthOption;
/* harmony export (immutable) */ __webpack_exports__["useColorScheme"] = useColorScheme;
/* harmony export (immutable) */ __webpack_exports__["vgExtractNodes"] = vgExtractNodes;
/* harmony export (immutable) */ __webpack_exports__["vgExtractTracks"] = vgExtractTracks;
/* harmony export (immutable) */ __webpack_exports__["vgExtractReads"] = vgExtractReads;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* eslint no-param-reassign: "off" */
/* eslint no-lonely-if: "off" */
/* eslint no-prototype-builtins: "off" */
/* eslint no-console: "off" */

/* eslint max-len: "off" */
/* eslint no-loop-func: "off" */
/* eslint no-unused-vars: "off" */
// import * as d3 from "d3";


const DEBUG = false;

const greys = ['#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'];
// const greys = ['#212121', '#424242', '#616161', '#757575', '#9e9e9e', '#bdbdbd', '#CFD8DC'];
const blues = ['#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'];
// const reds = ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'];
const reds = ['#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'];
const plainColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']; // d3 category10
const lightColors = ['#ABCCE3', '#FFCFA5', '#B0DBB0', '#F0AEAE', '#D7C6E6', '#C6ABA5', '#F4CCE8', '#CFCFCF', '#E6E6AC', '#A8E7ED']; // d3 category10

// const plainColors = ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395']; // d3 google 10c
// const plainColors = ['#1b5e20', '#0850B8', '#ff9800', '#039be5', '#f44336', '#9c27b0', '#8bc34a', '#5d4037', '#ffeb3b'];
// const lightColors = ['#AAC3AB', '#A2BDE4', '#FFD89F', '#A1DAF5', '#FAA19B', '#DAAEE1', '#D4E9BB', '#AEA09B', '#FFF7B5'];

let haplotypeColors = [];
let forwardReadColors = [];
let reverseReadColors = [];
let exonColors = [];

let svgID; // the (html-tag) ID of the svg
let svg; // the svg
let inputNodes = [];
let inputTracks = [];
let inputReads = [];
let nodes;
let tracks;
let reads;
let numberOfNodes;
let numberOfTracks;
let nodeMap; // maps node names to node indices
let nodesPerOrder;
let assignments = []; // contains info about lane assignments sorted by order
let extraLeft = []; // info whether nodes have to be moved further apart because of multiple 180° directional changes at the same horizontal order
let extraRight = []; // info whether nodes have to be moved further apart because of multiple 180° directional changes at the same horizontal order
let maxOrder; // horizontal order of the rightmost node

const config = {
  mergeNodesFlag: true,
  clickableNodesFlag: false,
  showExonsFlag: false,
  colorScheme: 0,
  // Options for the width of sequence nodes:
  // 0...scale node width linear with number of bases within node
  // 1...scale node width with log2 of number of bases within node
  // 2...scale node width with log10 of number of bases within node
  nodeWidthOption: 0,
  showReads: true,
  showSoftClips: true,
  haplotypeColors: 'plainColors',
  forwardReadColors: 'reds',
  reverseReadColors: 'blues',
  exonColors: 'lightColors',
  hideLegendFlag: false,
};

// variables for storing info which can be directly translated into drawing instructions
let trackRectangles = [];
let trackCurves = [];
let trackCorners = [];
let trackVerticalRectangles = []; // stored separately from horizontal rectangles. This allows drawing them in a separate step -> avoids issues with wrong overlapping
let trackRectanglesStep3 = [];

let maxYCoordinate = 0;
let minYCoordinate = 0;
let maxXCoordinate = 0;
let trackForRuler;

let bed;

// main function to call from outside
// which starts the process of creating a tube map visualization
function create(params) {
  // mandatory parameters: svgID, nodes, tracks
  // optional parameters: bed, clickableNodes, reads, showLegend
  svgID = params.svgID;
  svg = d3.select(params.svgID);
  inputNodes = (JSON.parse(JSON.stringify(params.nodes))); // deep copy
  inputTracks = (JSON.parse(JSON.stringify(params.tracks))); // deep copy
  inputReads = params.reads || null;
  bed = params.bed || null;
  config.clickableNodesFlag = params.clickableNodes || false;
  config.hideLegendFlag = params.hideLegend || false;
  const tr = createTubeMap();
  if (!config.hideLegendFlag) drawLegend(tr);
}

// moves a specific track to the top
function moveTrackToFirstPosition(index) {
  inputTracks.unshift(inputTracks[index]); // add element to beginning
  inputTracks.splice(index + 1, 1); // remove 1 element from the middle
  straightenTrack(0);
}

// straighten track given by index by inverting inverted nodes
// only keep them inverted if this single track runs thrugh them in both directions
function straightenTrack(index) {
  let i;
  let j;
  const nodesToInvert = [];
  let currentSequence;
  let nodeName;

  // find out which nodes should be inverted
  currentSequence = inputTracks[index].sequence;
  for (i = 0; i < currentSequence.length; i += 1) {
    if (currentSequence[i].charAt(0) === '-') {
      nodeName = currentSequence[i].substr(1);
      if ((currentSequence.indexOf(nodeName) === -1) || (currentSequence.indexOf(nodeName) > i)) {
        // only if this inverted node is no repeat
        nodesToInvert.push(currentSequence[i].substr(1));
      }
    }
  }

  // invert nodes in the tracks' sequence
  for (i = 0; i < inputTracks.length; i += 1) {
    currentSequence = inputTracks[i].sequence;
    for (j = 0; j < currentSequence.length; j += 1) {
      if (currentSequence[j].charAt(0) !== '-') {
        if (nodesToInvert.indexOf(currentSequence[j]) !== -1) {
          currentSequence[j] = `-${currentSequence[j]}`;
        }
      } else if (nodesToInvert.indexOf(currentSequence[j].substr(1)) !== -1) {
        currentSequence[j] = currentSequence[j].substr(1);
      }
    }
  }

  // invert the sequence within the nodes
  inputNodes.forEach((node) => {
    if (nodesToInvert.indexOf(node.name) !== -1) {
      node.seq = node.seq.split('').reverse().join('');
    }
  });
}

function changeTrackVisibility(trackID) {
  let i = 0;
  while ((i < inputTracks.length) && (inputTracks[i].id !== trackID)) i += 1;
  if (i < inputTracks.length) {
    if (inputTracks[i].hasOwnProperty('hidden')) {
      inputTracks[i].hidden = !inputTracks[i].hidden;
    } else {
      inputTracks[i].hidden = true;
    }
  }
  createTubeMap();
}

function changeExonVisibility() {
  config.showExonsFlag = !config.showExonsFlag;
  createTubeMap();
}

// sets the flag for whether redundant nodes should be automatically removed or not
function setMergeNodesFlag(value) {
  if (config.mergeNodesFlag !== value) {
    config.mergeNodesFlag = value;
    svg = d3.select(svgID);
    createTubeMap();
  }
}

// sets the flag for whether read soft clips should be displayed or not
function setSoftClipsFlag(value) {
  if (config.showSoftClips !== value) {
    config.showSoftClips = value;
    svg = d3.select(svgID);
    createTubeMap();
  }
}

// sets the flag for whether reads should be displayed or not
function setShowReadsFlag(value) {
  if (config.showReads !== value) {
    config.showReads = value;
    svg = d3.select(svgID);
    createTubeMap();
  }
}

function setColorSet(trackType, colorSet) {
  config[trackType] = colorSet;
  const tr = createTubeMap();
  if (!config.hideLegendFlag) drawLegend(tr);
}

// sets which option should be used for calculating the node width from its sequence length
function setNodeWidthOption(value) {
  if ((value === 0) || (value === 1) || (value === 2)) {
    if (config.nodeWidthOption !== value) {
      config.nodeWidthOption = value;
      if (svg !== undefined) {
        svg = d3.select(svgID);
        createTubeMap();
      }
    }
  }
}

// main
function createTubeMap() {
  trackRectangles = [];
  trackCurves = [];
  trackCorners = [];
  trackVerticalRectangles = [];
  trackRectanglesStep3 = [];
  assignments = [];
  extraLeft = [];
  extraRight = [];
  maxYCoordinate = 0;
  minYCoordinate = 0;
  maxXCoordinate = 0;
  trackForRuler = undefined;
  svg = d3.select(svgID);
  svg.selectAll('*').remove(); // clear svg for (re-)drawing

  nodes = (JSON.parse(JSON.stringify(inputNodes))); // deep copy (can add stuff to copy and leave original unchanged)
  tracks = (JSON.parse(JSON.stringify(inputTracks)));
  reads = (JSON.parse(JSON.stringify(inputReads)));

  // if (reads && config.showReads) reads = reads.filter(read => (Math.abs(Number(read.sequence[0])) < 29));
  // if (reads && config.showReads) reads = reads.filter(read => (Math.abs(Number(read.sequence[0])) > 20));

  assignColorSets();

  for (let i = tracks.length - 1; i >= 0; i -= 1) {
    if (!tracks[i].hasOwnProperty('type')) { // TODO: maybe remove "haplo"-property?
      tracks[i].type = 'haplo';
    }
    if (tracks[i].hasOwnProperty('hidden')) {
      if (tracks[i].hidden === true) {
        tracks.splice(i, 1);
      }
    }
    if (tracks[i].hasOwnProperty('indexOfFirstBase')) {
      trackForRuler = tracks[i].name;
    }
  }

  nodeMap = generateNodeMap(nodes);
  generateTrackIndexSequences(tracks);
  if (reads && config.showReads) generateTrackIndexSequences(reads);
  generateNodeWidth();

  // if (reads && config.showReads) reads = reads.filter(read => ((read.sequence[0] === '1') || (read.sequence[0] === '2')));
  // if (reads && config.showReads) reads = reads.filter(read => (Math.abs(Number(read.sequence[0])) < 4));
  if (reads && config.mergeNodesFlag) {
    generateNodeSuccessors(); // requires indexSequence
    // if (reads && config.showReads) reads = reads.filter(read => ((read.sequence[0] === '1') || (read.sequence[0] === '2')));
    generateNodeOrder(); // requires successors
    if (reads && config.showReads) reverseReversedReads();
    mergeNodes();
    nodeMap = generateNodeMap(nodes);
    generateNodeWidth();
    generateTrackIndexSequences(tracks);
    if (reads && config.showReads) generateTrackIndexSequences(reads);
  }

  numberOfNodes = nodes.length;
  numberOfTracks = tracks.length;
  generateNodeSuccessors();
  generateNodeDegree();
  if (DEBUG) console.log(`${numberOfNodes} nodes.`);
  generateNodeOrder();
  maxOrder = getMaxOrder();

  // can cause problems when there is a reversed single track node
  // OTOH, can solve problems with complex inversion patterns
  // switchNodeOrientation();
  // generateNodeOrder(nodes, tracks);
  // maxOrder = getMaxOrder();

  calculateTrackWidth(tracks);
  generateLaneAssignment();

  if ((config.showExonsFlag === true) && (bed !== null)) addTrackFeatures();
  generateNodeXCoords();

  if (reads && config.showReads) {
    // removeNonPathNodesFromReads();
    generateReadOnlyNodeAttributes();
    // reads = reads.slice(2, 3);
    reverseReversedReads();
    // reads = reads.filter(read => ((read.sequence[0] === '9') || (read.sequence[0] === '10')));
    // reads = reads.slice(0, 10);
    // reads = reads.filter(read => ((read.sequence[0] === '1')));
    // reads = reads.filter(read => ((read.sequence[0] === '1') || (read.sequence[0] === '2')));
    // reads = reads.filter(read => ((Number(read.sequence[0]) < 800)));
    generateTrackIndexSequences(reads);
    placeReads();
    // generateReadOnlyNodeAttributes();
    tracks = tracks.concat(reads);
  }

  generateSVGShapesFromPath(nodes, tracks);
  // removeUnusedNodes(nodes);
  // nodeMap = generateNodeMap(nodes);
  console.log('Tracks:');
  console.log(tracks);
  console.log('Nodes:');
  console.log(nodes);
  console.log('Lane assignment:');
  console.log(assignments);
  getImageDimensions();
  alignSVG(nodes, tracks);
  defineSVGPatterns();

  // console.log(trackRectangles);
  // console.log(trackRectanglesStep3);
  // console.log(trackCurves);
  drawTrackRectangles(trackRectangles);
  drawTrackCurves();
  drawReversalsByColor(trackCorners, trackVerticalRectangles);
  drawTrackRectangles(trackRectanglesStep3);
  drawTrackRectangles(trackRectangles, 'read');
  drawTrackCurves('read');

  // draw only those nodes which have coords assigned to them
  const dNodes = removeUnusedNodes(nodes);
  drawNodes(dNodes);

  drawReversalsByColor(trackCorners, trackVerticalRectangles, 'read');
  // generateTrackIndexSequences(tracks);

  if (config.nodeWidthOption === 0) drawLabels(dNodes);
  if (trackForRuler !== undefined) drawRuler();
  if (config.nodeWidthOption === 0) drawMismatches(); // TODO: call this before drawLabels and fix d3 data/append/enter stuff

  if (DEBUG) {
    console.log(`number of tracks: ${numberOfTracks}`);
    console.log(`number of nodes: ${numberOfNodes}`);
  }
  return tracks;
}

// generates attributes (node.y, node.contentHeight) for nodes without tracks, only reads
function generateReadOnlyNodeAttributes() {
  nodesPerOrder = [];
  for (let i = 0; i <= maxOrder; i += 1) {
    nodesPerOrder[i] = [];
  }

  const orderY = new Map();
  nodes.forEach((node) => {
    if (node.hasOwnProperty('order') && node.hasOwnProperty('y')) {
      if (orderY.has(node.order)) {
        orderY.set(node.order, Math.max(node.y + node.contentHeight, orderY.get(node.order)));
      } else {
        orderY.set(node.order, node.y + node.contentHeight);
      }
    }
  });

  nodes.forEach((node, i) => {
    if (node.hasOwnProperty('order') && !node.hasOwnProperty('y')) {
      console.log(`adding to ${node.name}`);
      node.y = orderY.get(node.order) + 25;
      node.contentHeight = 0;
      nodesPerOrder[node.order].push(i);
    }
  });
}

// add info about reads to nodes (incoming, outgoing and internal reads)
function assignReadsToNodes() {
  nodes.forEach((node) => {
    node.incomingReads = [];
    node.outgoingReads = [];
    node.internalReads = [];
  });
  reads.forEach((read, idx) => {
    read.width = 7;
    if (read.path.length === 1) {
      nodes[read.path[0].node].internalReads.push(idx);
    } else {
      read.path.forEach((element, pathIdx) => {
        if (pathIdx === 0) {
          nodes[read.path[0].node].outgoingReads.push([idx, pathIdx]);
        } else if (read.path[pathIdx].node !== null) {
          nodes[read.path[pathIdx].node].incomingReads.push([idx, pathIdx]);
        }
      });
    }
  });
}

//
function removeNonPathNodesFromReads() {
  reads.forEach((read) => {
    for (let i = read.sequence.length - 1; i >= 0; i -= 1) {
      let nodeName = read.sequence[i];
      if (nodeName.charAt(0) === '-') {
        nodeName = nodeName.substr(1);
      }
      if (!nodeMap.has(nodeName) || nodes[nodeMap.get(nodeName)].degree === 0) {
        read.sequence.splice(i, 1);
      }
    }
  });
}

// calculate paths (incl. correct y coordinate) for all reads
function placeReads() {
  generateBasicPathsForReads();
  assignReadsToNodes();

  // sort nodes by order, then by y-coordinate
  const sortedNodes = nodes.slice();
  sortedNodes.sort(compareNodesByOrder);

  // iterate over all nodes
  sortedNodes.forEach((node) => {
    // sort incoming reads
    node.incomingReads.sort(compareReadIncomingSegmentsByComingFrom);

    // place incoming reads
    let currentY = node.y + node.contentHeight;
    const occupiedUntil = new Map();
    node.incomingReads.forEach((readElement) => {
      reads[readElement[0]].path[readElement[1]].y = currentY;
      setOccupiedUntil(occupiedUntil, reads[readElement[0]], readElement[1], currentY, node);
      currentY += 7;
    });
    let maxY = currentY;

    // sort outgoing reads
    node.outgoingReads.sort(compareReadOutgoingSegmentsByGoingTo);

    // place outgoing reads
    const occupiedFrom = new Map();
    currentY = node.y + node.contentHeight;
    node.outgoingReads.forEach((readElement) => {
      // place in next lane
      reads[readElement[0]].path[readElement[1]].y = currentY;
      occupiedFrom.set(currentY, reads[readElement[0]].firstNodeOffset);
      // if no conflicts
      if ((!occupiedUntil.has(currentY)) || (occupiedUntil.get(currentY) + 1 < reads[readElement[0]].firstNodeOffset)) {
        currentY += 7;
        maxY = Math.max(maxY, currentY);
      } else { // otherwise push down incoming reads to make place for outgoing Read
        occupiedUntil.set(currentY, 0);
        node.incomingReads.forEach((incReadElementIndices) => {
          const incRead = reads[incReadElementIndices[0]];
          const incReadPathElement = incRead.path[incReadElementIndices[1]];
          if (incReadPathElement.y >= currentY) {
            incReadPathElement.y += 7;
            setOccupiedUntil(occupiedUntil, incRead, incReadElementIndices[1], incReadPathElement.y, node);
          }
        });
        currentY += 7;
        maxY += 7;
      }
    });

    // sort internal reads
    node.internalReads.sort(compareInternalReads);

    // place internal reads
    node.internalReads.forEach((readIdx) => {
      const currentRead = reads[readIdx];
      currentY = node.y + node.contentHeight;
      while ((currentRead.firstNodeOffset < occupiedUntil.get(currentY) + 2) || (currentRead.finalNodeCoverLength > occupiedFrom.get(currentY) - 3)) currentY += 7;
      currentRead.path[0].y = currentY;
      occupiedUntil.set(currentY, currentRead.finalNodeCoverLength);
      maxY = Math.max(maxY, currentY);
    });

    // adjust node height and move other nodes vertically down
    const heightIncrease = maxY - node.y - node.contentHeight;
    node.contentHeight += heightIncrease;
    adjustVertically3(node, heightIncrease);
  });

  // place read segments which are without node
  const bottomY = calculateBottomY();
  const elementsWithoutNode = [];
  reads.forEach((read, idx) => {
    read.path.forEach((element, pathIdx) => {
      if (!element.hasOwnProperty('y')) {
        elementsWithoutNode.push({ readIndex: idx, pathIndex: pathIdx, previousY: reads[idx].path[pathIdx - 1].y });
      }
    });
  });
  elementsWithoutNode.sort(compareNoNodeReadsByPreviousY);
  elementsWithoutNode.forEach((element) => {
    const segment = reads[element.readIndex].path[element.pathIndex];
    segment.y = bottomY[segment.order];
    bottomY[segment.order] += reads[element.readIndex].width;
  });

  console.log('Reads:');
  console.log(reads);
}

// keeps track of where reads end within nodes
function setOccupiedUntil(map, read, pathIndex, y, node) {
  if (pathIndex === read.path.length - 1) { // last node of current read
    map.set(y, read.finalNodeCoverLength);
  } else { // read covers the whole node
    map.set(y, node.sequenceLength);
  }
}

// compare read segments which are outside of nodes
// by the y-coord of where they are coming from
function compareNoNodeReadsByPreviousY(a, b) {
  const segmentA = reads[a.readIndex].path[a.pathIndex];
  const segmentB = reads[b.readIndex].path[b.pathIndex];
  if (segmentA.order === segmentB.order) {
    return a.previousY - b.previousY;
  }
  return segmentA.order - segmentB.order;
}

// compare read segments by where they are going to
function compareReadOutgoingSegmentsByGoingTo(a, b) {
  let pathIndexA = a[1];
  let pathIndexB = b[1];
  // let readA = reads[a[0]]
  // let nodeIndexA = readA.path[pathIndexA].node;
  let nodeA = nodes[reads[a[0]].path[pathIndexA].node];
  let nodeB = nodes[reads[b[0]].path[pathIndexB].node];
  while ((nodeA !== null) && (nodeB !== null) && (nodeA === nodeB)) {
    if (pathIndexA < reads[a[0]].path.length - 1) {
      pathIndexA += 1;
      while (reads[a[0]].path[pathIndexA].node === null) pathIndexA += 1; // skip null nodes in path
      nodeA = nodes[reads[a[0]].path[pathIndexA].node];
    } else {
      nodeA = null;
    }
    if (pathIndexB < reads[b[0]].path.length - 1) {
      pathIndexB += 1;
      while (reads[b[0]].path[pathIndexB].node === null) pathIndexB += 1; // skip null nodes in path
      nodeB = nodes[reads[b[0]].path[pathIndexB].node];
    } else {
      nodeB = null;
    }
  }
  if (nodeA !== null) {
    if (nodeB !== null) return compareNodesByOrder(nodeA, nodeB);
    return 1; // nodeB is null, nodeA not null
  }
  if (nodeB !== null) return -1; // nodeB not null, nodeA null
  // both nodes are null -> both end in the same node
  const beginDiff = reads[a[0]].firstNodeOffset - reads[b[0]].firstNodeOffset;
  if (beginDiff !== 0) return beginDiff;
  // break tie: both reads cover the same nodes and begin at the same position -> compare by endPosition
  return reads[a[0]].finalNodeCoverLength - reads[b[0]].finalNodeCoverLength;
}

// compare read segments by (y-coord of) where they are coming from
function compareReadIncomingSegmentsByComingFrom(a, b) {
  // TODO: incoming from reversal (u-turn)
  const pathA = reads[a[0]].path[a[1] - 1];
  const pathB = reads[b[0]].path[b[1] - 1];
  if (pathA.hasOwnProperty('y')) {
    if (pathB.hasOwnProperty('y')) {
      return pathA.y - pathB.y; // a and b have y-property
    }
    return -1; // only a has y-property
  }
  if (pathB.hasOwnProperty('y')) {
    return 1; // only b has y-property
  }
  return compareReadIncomingSegmentsByComingFrom([a[0], a[1] - 1], [b[0], b[1] - 1]); // neither has y-property
}

// compare 2 reads which are completely within a single node
function compareInternalReads(idxA, idxB) {
  const a = reads[idxA];
  const b = reads[idxB];
  // compare by first base within first node
  if (a.firstNodeOffset < b.firstNodeOffset) return -1;
  else if (a.firstNodeOffset > b.firstNodeOffset) return 1;

  // compare by last base within last node
  if (a.finalNodeCoverLength < b.finalNodeCoverLength) return -1;
  else if (a.finalNodeCoverLength > b.finalNodeCoverLength) return 1;

  return 0;
}

// determine biggest y-coordinate for each order-value
function calculateBottomY() {
  const bottomY = [];
  for (let i = 0; i <= maxOrder; i += 1) {
    bottomY.push(0);
  }

  nodes.forEach((node) => {
    bottomY[node.order] = Math.max(bottomY[node.order], node.y + node.contentHeight + 20);
  });

  tracks.forEach((track) => {
    track.path.forEach((element) => {
      bottomY[element.order] = Math.max(bottomY[element.order], element.y + track.width);
    });
  });
  return bottomY;
}

// generate path-info for each read
// containing order, node and orientation, but no concrete coordinates
function generateBasicPathsForReads() {
  let currentNodeIndex;
  let currentNodeIsForward;
  let currentNode;
  let previousNode;
  let previousNodeIsForward;

  reads.forEach((read) => {
    // add info for start of track
    currentNodeIndex = Math.abs(read.indexSequence[0]);
    currentNodeIsForward = read.indexSequence[0] >= 0;
    currentNode = nodes[currentNodeIndex];

    read.path = [];
    read.path.push({ order: currentNode.order, isForward: currentNodeIsForward, node: currentNodeIndex });

    for (let i = 1; i < read.sequence.length; i += 1) {
      previousNode = currentNode;
      previousNodeIsForward = currentNodeIsForward;

      currentNodeIndex = Math.abs(read.indexSequence[i]);
      currentNodeIsForward = read.indexSequence[i] >= 0;
      currentNode = nodes[currentNodeIndex];

      if (currentNode.order > previousNode.order) {
        if (!previousNodeIsForward) { // backward to forward at previous node
          read.path.push({ order: previousNode.order, isForward: true, node: null });
        }
        for (let j = previousNode.order + 1; j < currentNode.order; j += 1) { // forward without nodes
          read.path.push({ order: j, isForward: true, node: null });
        }
        if (!currentNodeIsForward) { // forward to backward at current node
          read.path.push({ order: currentNode.order, isForward: true, node: null });
          read.path.push({ order: currentNode.order, isForward: false, node: currentNodeIndex });
        } else { // current Node forward
          read.path.push({ order: currentNode.order, isForward: true, node: currentNodeIndex });
        }
      } else if (currentNode.order < previousNode.order) {
        if (previousNodeIsForward) { // turnaround from fw to bw at previous node
          read.path.push({ order: previousNode.order, isForward: false, node: null });
        }
        for (let j = previousNode.order - 1; j > currentNode.order; j -= 1) { // bachward without nodes
          read.path.push({ order: j, isForward: false, node: null });
        }
        if (currentNodeIsForward) { // backward to forward at current node
          read.path.push({ order: currentNode.order, isForward: false, node: null });
          read.path.push({ order: currentNode.order, isForward: true, node: currentNodeIndex });
        } else { // backward at current node
          read.path.push({ order: currentNode.order, isForward: false, node: currentNodeIndex });
        }
      } else { // currentNode.order === previousNode.order
        if (currentNodeIsForward !== previousNodeIsForward) {
          read.path.push({ order: currentNode.order, isForward: currentNodeIsForward, node: currentNodeIndex });
        } else {
          read.path.push({ order: currentNode.order, isForward: !currentNodeIsForward, node: null });
          read.path.push({ order: currentNode.order, isForward: currentNodeIsForward, node: currentNodeIndex });
        }
      }
    }
  });
}

// reverse reads which are reversed
function reverseReversedReads() {
  reads.forEach((read) => {
    let pos = 0;
    while ((pos < read.sequence.length) && (read.sequence[pos].charAt(0) === '-')) pos += 1;
    if (pos === read.sequence.length) { // completely reversed read
      read.is_reverse = true;
      read.sequence = read.sequence.reverse(); // invert sequence
      for (let i = 0; i < read.sequence.length; i += 1) {
        read.sequence[i] = read.sequence[i].substr(1); // remove '-'
      }

      read.sequenceNew = read.sequenceNew.reverse(); // invert sequence
      for (let i = 0; i < read.sequenceNew.length; i += 1) {
        read.sequenceNew[i].nodeName = read.sequenceNew[i].nodeName.substr(1); // remove '-'
        const nodeWidth = nodes[nodeMap.get(read.sequenceNew[i].nodeName)].width;
        read.sequenceNew[i].mismatches.forEach((mm) => {
          if (mm.type === 'insertion') {
            mm.pos = nodeWidth - mm.pos;
            mm.seq = getReverseComplement(mm.seq);
          } else if (mm.type === 'deletion') {
            mm.pos = nodeWidth - mm.pos - mm.length;
          } else if (mm.type === 'substitution') {
            mm.pos = nodeWidth - mm.pos - mm.seq.length;
            mm.seq = getReverseComplement(mm.seq);
          }
          if (mm.hasOwnProperty('seq')) {
            mm.seq = mm.seq.split('').reverse().join('');
          }
        });
      }

      // adjust firstNodeOffset and finalNodeCoverLength
      const temp = read.firstNodeOffset;
      let seqLength = nodes[nodeMap.get(read.sequence[0])].sequenceLength;
      read.firstNodeOffset = seqLength - read.finalNodeCoverLength;
      seqLength = nodes[nodeMap.get(read.sequence[read.sequence.length - 1])].sequenceLength;
      read.finalNodeCoverLength = seqLength - temp;
    }
  });
}

function getReverseComplement(s) {
  let result = '';
  for (let i = s.length - 1; i >= 0; i -= 1) {
    switch (s.charAt(i)) {
      case 'A':
        result += 'T';
        break;
      case 'T':
        result += 'A';
        break;
      case 'C':
        result += 'G';
        break;
      case 'G':
        result += 'C';
        break;
      default:
        result += 'N';
    }
  }
  return result;
}

// for each track: generate sequence of node indices from seq. of node names
function generateTrackIndexSequencesNEW(tracksOrReads) {
  tracksOrReads.forEach((track) => {
    track.indexSequence = [];
    track.sequence.forEach((edit) => {
      if (edit.nodeName.charAt(0) === '-') {
        track.indexSequence.push(-nodeMap.get(edit.nodeName.substr(1)));
      } else {
        track.indexSequence.push(nodeMap.get(edit.nodeName));
      }
    });
  });
}

// for each track: generate sequence of node indices from seq. of node names
function generateTrackIndexSequences(tracksOrReads) {
  tracksOrReads.forEach((track) => {
    track.indexSequence = [];
    track.sequence.forEach((nodeName) => {
      if (nodeName.charAt(0) === '-') {
        track.indexSequence.push(-nodeMap.get(nodeName.substr(1)));
      } else {
        track.indexSequence.push(nodeMap.get(nodeName));
      }
    });
  });
}

// remove nodes with no tracks moving through them to avoid d3.js errors
function removeUnusedNodes(allNodes) {
  const dNodes = allNodes.slice(0);
  let i;
  for (i = dNodes.length - 1; i >= 0; i -= 1) {
    // if (nodes[i].degree === 0) {
    if (!dNodes[i].hasOwnProperty('x')) {
      dNodes.splice(i, 1);
    }
  }
  // numberOfNodes = nodes.length;
  return dNodes;
}

// get the minimum and maximum coordinates used in the image to calculate image dimensions
function getImageDimensions() {
  maxXCoordinate = -99;
  minYCoordinate = 99;
  maxYCoordinate = -99;

  nodes.forEach((node) => {
    if (node.hasOwnProperty('x')) {
      maxXCoordinate = Math.max(maxXCoordinate, node.x + 20 + node.pixelWidth);
    }
    if (node.hasOwnProperty('y')) {
      minYCoordinate = Math.min(minYCoordinate, node.y - 10);
      maxYCoordinate = Math.max(maxYCoordinate, node.y + node.contentHeight + 10);
    }
  });

  tracks.forEach((track) => {
    track.path.forEach((segment) => {
      maxYCoordinate = Math.max(maxYCoordinate, segment.y + track.width);
      minYCoordinate = Math.min(minYCoordinate, segment.y);
    });
  });
}

// align visualization to the top and left within svg and resize svg to correct size
function alignSVG() {
  // enable Pan + Zoom
  const zoom = d3.behavior.zoom().scaleExtent([0.1, 5]).on('zoom', () => {
    svg.attr('transform', `translate(${d3.event.translate}) scale(${d3.event.scale})`);
  });
  svg = svg.call(zoom).on('dblclick.zoom', null).append('g');

  // translate so that top of drawing is visible
  zoom.translate([0, -minYCoordinate + 25]);
  zoom.event(svg);

  // resize svg depending on drawing size
  // this feels dirty, but changing the attributes of the 'svg'-Variable does not have the desired effect
  const svg2 = d3.select(svgID);
  svg2.attr('height', maxYCoordinate - minYCoordinate + 50);
  // svg2.attr('height', 800);
  svg2.attr('width', Math.max(maxXCoordinate, __WEBPACK_IMPORTED_MODULE_0_jquery___default()(svgID).parent().width()));
}

// map node names to node indices
function generateNodeMap() {
  nodeMap = new Map();
  nodes.forEach((node, index) => {
    nodeMap.set(node.name, index);
  });
  return nodeMap;
}

// adds a successor-array to each node containing the indices of the nodes coming directly after the current node
function generateNodeSuccessors() {
  let current;
  let follower;

  nodes.forEach((node) => {
    node.successors = [];
    node.predecessors = [];
  });

  tracks.forEach((track) => {
    for (let i = 0; i < track.indexSequence.length - 1; i += 1) {
      current = Math.abs(track.indexSequence[i]);
      follower = Math.abs(track.indexSequence[i + 1]);
      if (nodes[current].successors.indexOf(follower) === -1) {
        nodes[current].successors.push(follower);
      }
      if (nodes[follower].predecessors.indexOf(current) === -1) {
        nodes[follower].predecessors.push(current);
      }
    }
  });

  if (reads && config.showReads) {
    reads.forEach((track) => {
      for (let i = 0; i < track.indexSequence.length - 1; i += 1) {
        current = Math.abs(track.indexSequence[i]);
        follower = Math.abs(track.indexSequence[i + 1]);
        if (nodes[current].successors.indexOf(follower) === -1) {
          nodes[current].successors.push(follower);
        }
        if (nodes[follower].predecessors.indexOf(current) === -1) {
          nodes[follower].predecessors.push(current);
        }
      }
    });
  }
}

function generateNodeOrderOfSingleTrack(sequence) {
  let forwardOrder = 0;
  let backwardOrder = 0;
  let currentNode;
  let minOrder = 0;

  sequence.forEach((nodeIndex) => {
    if (nodeIndex < 0) {
      currentNode = nodes[Math.abs(nodeIndex)];
      if (!currentNode.hasOwnProperty('order')) {
        currentNode.order = backwardOrder;
      }
      if (currentNode.order < minOrder) minOrder = currentNode.order;
      forwardOrder = currentNode.order;
      backwardOrder = currentNode.order - 1;
    } else {
      currentNode = nodes[nodeIndex];
      if (!currentNode.hasOwnProperty('order')) {
        currentNode.order = forwardOrder;
      }
      forwardOrder = currentNode.order + 1;
      backwardOrder = currentNode.order;
    }
  });
  if (minOrder < 0) {
    increaseOrderForAllNodes(-minOrder);
  }
}

// calculate the order-value of nodes contained in sequence which are to the left of the first node which already has an order-value
function generateNodeOrderTrackBeginning(sequence) {
  let anchorIndex = 0;
  let currentOrder;
  let currentNode;
  let minOrder = 0;
  let increment;

  while (!nodes[Math.abs(sequence[anchorIndex])].hasOwnProperty('order')) anchorIndex += 1; // anchor = first node in common with existing graph

  if (sequence[anchorIndex] >= 0) { // regular node
    currentOrder = nodes[sequence[anchorIndex]].order - 1;
    increment = -1;
  } else { // reverse node
    currentOrder = nodes[-sequence[anchorIndex]].order + 1;
    increment = 1;
  }

  for (let j = anchorIndex - 1; j >= 0; j -= 1) { // assign order to nodes which are left of anchor node
    currentNode = nodes[Math.abs(sequence[j])];
    if (!currentNode.hasOwnProperty('order')) {
      currentNode.order = currentOrder;
      minOrder = Math.min(minOrder, currentOrder);
      currentOrder += increment;
    }
  }

  if (minOrder < 0) {
    increaseOrderForAllNodes(-minOrder);
  }
  return anchorIndex;
}

// generate global sequence of nodes from left to right, starting with first track and adding other tracks sequentially
function generateNodeOrder() {
  let modifiedSequence;
  let currentOrder;
  let currentNode;
  let rightIndex;
  let leftIndex;
  let minOrder = 0;
  let tracksAndReads;
  if (reads && config.showReads) tracksAndReads = tracks.concat(reads);
  else tracksAndReads = tracks;

  nodes.forEach((node) => {
    delete node.order;
  });

  generateNodeOrderOfSingleTrack(tracks[0].indexSequence); // calculate order values for all nodes of the first track

  for (let i = 1; i < tracksAndReads.length; i += 1) {
    if (DEBUG) console.log(`generating order for track ${i + 1}`);
    rightIndex = generateNodeOrderTrackBeginning(tracksAndReads[i].indexSequence); // calculate order values for all nodes until the first anchor
    modifiedSequence = uninvert(tracksAndReads[i].indexSequence);

    while (rightIndex < modifiedSequence.length) { // move right until the end of the sequence
      // find next anchor node
      leftIndex = rightIndex;
      rightIndex += 1;
      while ((rightIndex < modifiedSequence.length) && (!nodes[modifiedSequence[rightIndex]].hasOwnProperty('order'))) rightIndex += 1;

      if (rightIndex < modifiedSequence.length) { // middle segment between two anchors
        currentOrder = nodes[modifiedSequence[leftIndex]].order + 1; // start with order value of leftAnchor + 1
        for (let j = leftIndex + 1; j < rightIndex; j += 1) {
          nodes[modifiedSequence[j]].order = currentOrder; // assign order values
          currentOrder += 1;
        }

        if (nodes[modifiedSequence[rightIndex]].order > nodes[modifiedSequence[leftIndex]].order) { // if order-value of left anchor < order-value of right anchor
          if (nodes[modifiedSequence[rightIndex]].order < currentOrder) { // and the right anchor now has a lower order-value than our newly added nodes
            increaseOrderForSuccessors(modifiedSequence[rightIndex], modifiedSequence[rightIndex - 1], currentOrder);
          }
        } else { // potential node reversal: check for ordering conflict, if no conflict found move node at rightIndex further to the right in order to not create a track reversal
          // if (!isSuccessor(nodeMap.get(modifiedSequence[rightIndex]), nodeMap.get(modifiedSequence[leftIndex]))) { // no real reversal
          if ((tracksAndReads[i].indexSequence[rightIndex] >= 0) && (!isSuccessor(modifiedSequence[rightIndex], modifiedSequence[leftIndex]))) { // no real reversal
            increaseOrderForSuccessors(modifiedSequence[rightIndex], modifiedSequence[rightIndex - 1], currentOrder);
          } else { // real reversal
            if ((tracksAndReads[i].sequence[leftIndex] < 0) || ((nodes[modifiedSequence[leftIndex + 1]].degree < 2) && (nodes[modifiedSequence[rightIndex]].order < nodes[modifiedSequence[leftIndex]].order))) {
              currentOrder = nodes[modifiedSequence[leftIndex]].order - 1; // start with order value of leftAnchor - 1
              for (let j = leftIndex + 1; j < rightIndex; j += 1) {
                nodes[modifiedSequence[j]].order = currentOrder; // assign order values
                currentOrder -= 1;
              }
            }
          }
        }
      } else { // right segment to the right of last anchor
        if (tracksAndReads[i].sequence[leftIndex] >= 0) { // elongate towards the right
          currentOrder = nodes[modifiedSequence[leftIndex]].order + 1;
          for (let j = leftIndex + 1; j < modifiedSequence.length; j += 1) {
            currentNode = nodes[modifiedSequence[j]];
            if (!currentNode.hasOwnProperty('order')) {
              currentNode.order = currentOrder;
              currentOrder += 1;
            }
          }
        } else { // elongate towards the left
          currentOrder = nodes[modifiedSequence[leftIndex]].order - 1;
          for (let j = leftIndex + 1; j < modifiedSequence.length; j += 1) {
            currentNode = nodes[modifiedSequence[j]];
            if (!currentNode.hasOwnProperty('order')) {
              currentNode.order = currentOrder;
              minOrder = Math.min(minOrder, currentOrder);
              currentOrder -= 1;
            }
          }
        }
      }
    }
  }

  // adjust all nodes if necessary, so that no order<0
  if (minOrder < 0) increaseOrderForAllNodes(-minOrder);
}

function isSuccessor(first, second) {
  const visited = new Array(numberOfNodes).fill(false);
  const stack = [];
  stack.push(first);
  visited[first] = true;
  while (stack.length > 0) {
    const current = stack.pop();
    if (current === second) return true;
    for (let i = 0; i < nodes[current].successors.length; i += 1) {
      const childIndex = nodes[current].successors[i];
      if (!visited[childIndex]) {
        visited[childIndex] = true;
        stack.push(childIndex);
      }
    }
  }
  return false;
}

// get order number of the rightmost node
function getMaxOrder() {
  let max = -1;
  nodes.forEach((node) => {
    if ((node.hasOwnProperty('order')) && (node.order > max)) max = node.order;
  });
  return max;
}

// generates sequence keeping the order but switching all reversed (negative) nodes to forward nodes
function uninvert(sequence) {
  const result = [];
  for (let i = 0; i < sequence.length; i += 1) {
    if (sequence[i] >= 0) {
      result.push(sequence[i]);
    } else {
      result.push(-sequence[i]);
    }
  }
  return result;
}

// increases the order-value of all nodes by amount
function increaseOrderForAllNodes(amount) {
  nodes.forEach((node) => {
    if (node.hasOwnProperty('order')) node.order += amount;
  });
}

// increases the order-value for currentNode and (if necessary) successor nodes recursively
function increaseOrderForSuccessors(startingNode, tabuNode, newOrder) {
  const increasedOrders = new Map();
  const queue = [];
  queue.push([startingNode, newOrder]);

  while (queue.length > 0) {
    const current = queue.shift();
    const currentNode = current[0];
    const currentOrder = current[1];

    if ((nodes[currentNode].hasOwnProperty('order')) && (nodes[currentNode].order < currentOrder)) {
      if ((!increasedOrders.has(currentNode)) || (increasedOrders.get(currentNode) < currentOrder)) {
        increasedOrders.set(currentNode, currentOrder);
        nodes[currentNode].successors.forEach((successor) => {
          if ((nodes[successor].order > nodes[currentNode].order) && (successor !== tabuNode)) { // only increase order of successors if they lie to the right of the currentNode (not for repeats/translocations)
            queue.push([successor, currentOrder + 1]);
          }
        });
        if (currentNode !== startingNode) {
          nodes[currentNode].predecessors.forEach((predecessor) => {
            if ((nodes[predecessor].order > currentNode.order) && (predecessor !== tabuNode)) { // only increase order of predecessors if they lie to the right of the currentNode (not for repeats/translocations)
              queue.push([predecessor, currentOrder + 1]);
            }
          });
        }
      }
    }
  }

  increasedOrders.forEach((value, key) => {
    nodes[key].order = value;
  });
}

// calculates the node degree: the number of tracks passing through the node / the node height
function generateNodeDegree() {
  nodes.forEach((node) => { node.tracks = []; });

  tracks.forEach((track) => {
    track.indexSequence.forEach((nodeIndex) => {
      nodes[Math.abs(nodeIndex)].tracks.push(track.id);
    });
  });

  nodes.forEach((node) => {
    if (node.hasOwnProperty('tracks')) node.degree = node.tracks.length;
  });
}

// if more tracks pass through a specific node in reverse direction than in
// regular direction, switch its orientation
// (does not apply to the first track's nodes, these are always oriented as
// dictated by the first track)
function switchNodeOrientation() {
  const toSwitch = new Map();
  let nodeName;
  let prevNode;
  let nextNode;
  let currentNode;

  for (let i = 1; i < tracks.length; i += 1) {
    for (let j = 0; j < tracks[i].sequence.length; j += 1) {
      nodeName = tracks[i].sequence[j];
      if (nodeName.charAt(0) === '-') nodeName = nodeName.substr(1);
      currentNode = nodes[nodeMap.get(nodeName)];
      if (tracks[0].sequence.indexOf(nodeName) === -1) { // do not change orientation for nodes which are part of the pivot track
        if (j > 0) {
          if (tracks[i].sequence[j - 1].charAt(0) !== '-') prevNode = nodes[nodeMap.get(tracks[i].sequence[j - 1])];
          else prevNode = nodes[nodeMap.get(tracks[i].sequence[j - 1].substr(1))];
        }
        if (j < tracks[i].sequence.length - 1) {
          if (tracks[i].sequence[j + 1].charAt(0) !== '-') nextNode = nodes[nodeMap.get(tracks[i].sequence[j + 1])];
          else nextNode = nodes[nodeMap.get(tracks[i].sequence[j + 1].substr(1))];
        }
        if (((j === 0) || (prevNode.order < currentNode.order)) && ((j === tracks[i].sequence.length - 1) || (currentNode.order < nextNode.order))) {
          if (!toSwitch.has(nodeName)) toSwitch.set(nodeName, 0);
          if (tracks[i].sequence[j].charAt(0) === '-') toSwitch.set(nodeName, toSwitch.get(nodeName) + 1);
          else toSwitch.set(nodeName, toSwitch.get(nodeName) - 1);
        }
        if (((j === 0) || (prevNode.order > currentNode.order)) && ((j === tracks[i].sequence.length - 1) || (currentNode.order > nextNode.order))) {
          if (!toSwitch.has(nodeName)) toSwitch.set(nodeName, 0);
          if (tracks[i].sequence[j].charAt(0) === '-') toSwitch.set(nodeName, toSwitch.get(nodeName) - 1);
          else toSwitch.set(nodeName, toSwitch.get(nodeName) + 1);
        }
      }
    }
  }

  tracks.forEach((track, trackIndex) => {
    track.sequence.forEach((node, nodeIndex) => {
      nodeName = node;
      if (nodeName.charAt(0) === '-') nodeName = nodeName.substr(1);
      if ((toSwitch.has(nodeName)) && (toSwitch.get(nodeName) > 0)) {
        if (node.charAt(0) === '-') tracks[trackIndex].sequence[nodeIndex] = node.substr(1);
        else tracks[trackIndex].sequence[nodeIndex] = `-${node}`;
      }
    });
  });

  // invert the sequence within the nodes
  toSwitch.forEach((value, key) => {
    if (value > 0) {
      currentNode = nodeMap.get(key);
      nodes[currentNode].seq = nodes[currentNode].seq.split('').reverse().join('');
    }
  });
}

// calculates the concrete values for the nodes' x-coordinates
function generateNodeXCoords() {
  let currentX = 0;
  let nextX = 20;
  let currentOrder = -1;
  const sortedNodes = nodes.slice();
  sortedNodes.sort(compareNodesByOrder);
  const extra = calculateExtraSpace();

  sortedNodes.forEach((node) => {
    if (node.hasOwnProperty('order')) {
      if (node.order > currentOrder) {
        currentOrder = node.order;
        currentX = nextX + (10 * extra[node.order]);
      }
      node.x = currentX;
      nextX = Math.max(nextX, currentX + 40 + node.pixelWidth);
    }
  });
}

// calculates additional horizontal space needed between two nodes
// two neighboring nodes have to be moved further apart if there is a lot going on in between them
// -> edges turning to vertical orientation should not overlap
function calculateExtraSpace() {
  const leftSideEdges = [];
  const rightSideEdges = [];
  const extra = [];

  for (let i = 0; i <= maxOrder; i += 1) {
    leftSideEdges.push(0);
    rightSideEdges.push(0);
  }

  tracks.forEach((track) => {
    for (let i = 1; i < track.path.length; i += 1) {
      if (track.path[i].order === track.path[i - 1].order) { // repeat or translocation
        if (track.path[i].isForward === true) leftSideEdges[track.path[i].order] += 1;
        else rightSideEdges[track.path[i].order] += 1;
      }
    }
  });

  extra.push(Math.max(0, leftSideEdges[0] - 1));
  for (let i = 1; i <= maxOrder; i += 1) {
    extra.push(Math.max(0, leftSideEdges[i] - 1) + Math.max(0, rightSideEdges[i - 1] - 1));
  }
  return extra;
}

// create and fill assignment-variable, which contains info about tracks and lanes for each order-value
function generateLaneAssignment() {
  let segmentNumber;
  let currentNodeIndex;
  let currentNodeIsForward;
  let currentNode;
  let previousNode;
  let previousNodeIsForward;
  const prevSegmentPerOrderPerTrack = [];

  // create empty variables
  for (let i = 0; i <= maxOrder; i += 1) {
    assignments[i] = [];
    prevSegmentPerOrderPerTrack[i] = [];
    for (let j = 0; j < numberOfTracks; j += 1) {
      prevSegmentPerOrderPerTrack[i][j] = null;
    }
  }

  tracks.forEach((track, trackNo) => {
    // add info for start of track
    currentNodeIndex = Math.abs(track.indexSequence[0]);
    currentNodeIsForward = track.indexSequence[0] >= 0;
    currentNode = nodes[currentNodeIndex];

    track.path = [];
    track.path.push({ order: currentNode.order, lane: null, isForward: currentNodeIsForward, node: currentNodeIndex });
    addToAssignment(currentNode.order, currentNodeIndex, trackNo, 0, prevSegmentPerOrderPerTrack);

    segmentNumber = 1;
    for (let i = 1; i < track.sequence.length; i += 1) {
      previousNode = currentNode;
      previousNodeIsForward = currentNodeIsForward;

      currentNodeIndex = Math.abs(track.indexSequence[i]);
      currentNodeIsForward = track.indexSequence[i] >= 0;
      currentNode = nodes[currentNodeIndex];

      if (currentNode.order > previousNode.order) {
        if (!previousNodeIsForward) { // backward to forward at previous node
          track.path.push({ order: previousNode.order, lane: null, isForward: true, node: null });
          addToAssignment(previousNode.order, null, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
        }
        for (let j = previousNode.order + 1; j < currentNode.order; j += 1) { // forward without nodes
          track.path.push({ order: j, lane: null, isForward: true, node: null });
          addToAssignment(j, null, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
        }
        if (!currentNodeIsForward) { // forward to backward at current node
          track.path.push({ order: currentNode.order, lane: null, isForward: true, node: null });
          addToAssignment(currentNode.order, null, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
          track.path.push({ order: currentNode.order, lane: null, isForward: false, node: currentNodeIndex });
          addToAssignment(currentNode.order, currentNodeIndex, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
        } else { // current Node forward
          track.path.push({ order: currentNode.order, lane: null, isForward: true, node: currentNodeIndex });
          addToAssignment(currentNode.order, currentNodeIndex, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
        }
      } else if (currentNode.order < previousNode.order) {
        if (previousNodeIsForward) { // turnaround from fw to bw at previous node
          track.path.push({ order: previousNode.order, lane: null, isForward: false, node: null });
          addToAssignment(previousNode.order, null, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
        }
        for (let j = previousNode.order - 1; j > currentNode.order; j -= 1) { // bachward without nodes
          track.path.push({ order: j, lane: null, isForward: false, node: null });
          addToAssignment(j, null, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
        }
        if (currentNodeIsForward) { // backward to forward at current node
          track.path.push({ order: currentNode.order, lane: null, isForward: false, node: null });
          addToAssignment(currentNode.order, null, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
          track.path.push({ order: currentNode.order, lane: null, isForward: true, node: currentNodeIndex });
          addToAssignment(currentNode.order, currentNodeIndex, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
        } else { // backward at current node
          track.path.push({ order: currentNode.order, lane: null, isForward: false, node: currentNodeIndex });
          addToAssignment(currentNode.order, currentNodeIndex, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
        }
      } else { // currentNode.order === previousNode.order
        if (currentNodeIsForward !== previousNodeIsForward) {
          track.path.push({ order: currentNode.order, lane: null, isForward: currentNodeIsForward, node: currentNodeIndex });
          addToAssignment(currentNode.order, currentNodeIndex, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
        } else {
          track.path.push({ order: currentNode.order, lane: null, isForward: !currentNodeIsForward, node: null });
          addToAssignment(currentNode.order, null, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
          track.path.push({ order: currentNode.order, lane: null, isForward: currentNodeIsForward, node: currentNodeIndex });
          addToAssignment(currentNode.order, currentNodeIndex, trackNo, segmentNumber, prevSegmentPerOrderPerTrack);
          segmentNumber += 1;
        }
      }
    }
  });

  for (let i = 0; i <= maxOrder; i += 1) {
    generateSingleLaneAssignment(assignments[i], i); // this is where the lanes get assigned
  }
}

function addToAssignment(order, nodeIndex, trackNo, segmentID, prevSegmentPerOrderPerTrack) {
  const compareToFromSame = prevSegmentPerOrderPerTrack[order][trackNo];

  if (nodeIndex === null) {
    assignments[order].push({ type: 'single', node: null, tracks: [{ trackID: trackNo, segmentID, compareToFromSame }] });
    prevSegmentPerOrderPerTrack[order][trackNo] = assignments[order][assignments[order].length - 1].tracks[0];
  } else {
    for (let i = 0; i < assignments[order].length; i += 1) {
      if (assignments[order][i].node === nodeIndex) { // add to existing node in assignment
        assignments[order][i].type = 'multiple';
        assignments[order][i].tracks.push({ trackID: trackNo, segmentID, compareToFromSame });
        prevSegmentPerOrderPerTrack[order][trackNo] = assignments[order][i].tracks[assignments[order][i].tracks.length - 1];
        return;
      }
    }
    // create new node in assignment
    assignments[order].push({ type: 'single', node: nodeIndex, tracks: [{ trackID: trackNo, segmentID, compareToFromSame }] });
    prevSegmentPerOrderPerTrack[order][trackNo] = assignments[order][assignments[order].length - 1].tracks[0];
  }
}

// looks at assignment and sets idealY and idealLane by looking at where the tracks come from
function getIdealLanesAndCoords(assignment, order) {
  let index;

  assignment.forEach((node) => {
    node.idealLane = 0;
    node.tracks.forEach((track) => {
      if (track.segmentID === 0) {
        track.idealLane = track.trackID;
        track.idealY = null;
      } else {
        if (tracks[track.trackID].path[track.segmentID - 1].order === order - 1) {
          track.idealLane = tracks[track.trackID].path[track.segmentID - 1].lane;
          track.idealY = tracks[track.trackID].path[track.segmentID - 1].y;
        } else if ((track.segmentID < tracks[track.trackID].path.length - 1) && (tracks[track.trackID].path[track.segmentID + 1].order === order - 1)) {
          track.idealLane = tracks[track.trackID].path[track.segmentID + 1].lane;
          track.idealY = tracks[track.trackID].path[track.segmentID + 1].y;
        } else {
          index = track.segmentID - 1;
          while ((index >= 0) && (tracks[track.trackID].path[index].order !== order - 1)) index -= 1;
          if (index < 0) {
            track.idealLane = track.trackID;
            track.idealY = null;
          } else {
            track.idealLane = tracks[track.trackID].path[index].lane;
            track.idealY = tracks[track.trackID].path[index].y;
          }
        }
      }
      node.idealLane += track.idealLane;
    });
    node.idealLane /= node.tracks.length;
  });
}

// assigns the optimal lanes for a single horizontal position (=order)
// first an ideal lane is calculated for each track (which is ~ the lane of its predecessor)
// then the nodes are sorted by their average ideal lane
// and the whole construct is then moved up or down if necessary
function generateSingleLaneAssignment(assignment, order) {
  let currentLane = 0;
  const potentialAdjustmentValues = new Set();
  let currentY = 20;
  let prevNameIsNull = false;
  let prevTrack = -1;

  // console.log('order : ' + order);
  // console.log(assignment);

  getIdealLanesAndCoords(assignment, order);
  assignment.sort(compareByIdealLane);

  assignment.forEach((node) => {
    if (node.node !== null) {
      nodes[node.node].topLane = currentLane;
      if (prevNameIsNull) currentY -= 10;
      nodes[node.node].y = currentY;
      nodes[node.node].contentHeight = 0;
      prevNameIsNull = false;
    } else {
      if (prevNameIsNull) currentY -= 25;
      else if (currentY > 20) currentY -= 10;
      prevNameIsNull = true;
    }

    node.tracks.sort(compareByIdealLane);
    node.tracks.forEach((track) => {
      track.lane = currentLane;
      if ((track.trackID === prevTrack) && (node.node === null) && (prevNameIsNull)) currentY += 10;
      tracks[track.trackID].path[track.segmentID].lane = currentLane;
      tracks[track.trackID].path[track.segmentID].y = currentY;
      if (track.idealY !== null) potentialAdjustmentValues.add(track.idealY - currentY);
      currentLane += 1;
      currentY += tracks[track.trackID].width;
      if (node.node !== null) {
        nodes[node.node].contentHeight += tracks[track.trackID].width;
      }
      prevTrack = track.trackID;
    });
    currentY += 25;
  });

  adjustVertically(assignment, potentialAdjustmentValues);
}

// moves all tracks at a single horizontal location (=order) up/down to minimize lane changes
function adjustVertically(assignment, potentialAdjustmentValues) {
  let verticalAdjustment = 0;
  let minAdjustmentCost = Number.MAX_SAFE_INTEGER;

  potentialAdjustmentValues.forEach((moveBy) => {
    if (getVerticalAdjustmentCost(assignment, moveBy) < minAdjustmentCost) {
      minAdjustmentCost = getVerticalAdjustmentCost(assignment, moveBy);
      verticalAdjustment = moveBy;
    }
  });

  assignment.forEach((node) => {
    if (node.node !== null) {
      nodes[node.node].y += verticalAdjustment;
    }
    node.tracks.forEach((track) => {
      tracks[track.trackID].path[track.segmentID].y += verticalAdjustment;
    });
  });
}

/* function adjustVertically2(assignment, adjustStart, adjustBy) {
  assignment.forEach((node) => {
    if (node.node !== null) {
      if (nodes[node.node].y >= adjustStart) {
        nodes[node.node].y += adjustBy;
      }
    }
    node.tracks.forEach((track) => {
      if (tracks[track.trackID].path[track.segmentID].y >= adjustStart) {
        tracks[track.trackID].path[track.segmentID].y += adjustBy;
      }
    });
  });
} */

function adjustVertically3(node, adjustBy) {
  if (node.hasOwnProperty('order')) {
    assignments[node.order].forEach((assignmentNode) => {
      if (assignmentNode.node !== null) {
        const aNode = nodes[assignmentNode.node];
        if ((aNode !== node) && (aNode.y > node.y)) {
          aNode.y += adjustBy;
          assignmentNode.tracks.forEach((track) => {
            tracks[track.trackID].path[track.segmentID].y += adjustBy;
          });
        }
      } else { // track-segment not within a node
        assignmentNode.tracks.forEach((track) => {
          if (tracks[track.trackID].path[track.segmentID].y >= node.y) {
            tracks[track.trackID].path[track.segmentID].y += adjustBy;
          }
        });
      }
    });
    if (nodesPerOrder[node.order].length > 0) {
      nodesPerOrder[node.order].forEach((nodeIndex) => {
        if ((nodes[nodeIndex] !== node) && (nodes[nodeIndex].y > node.y)) {
          nodes[nodeIndex].y += adjustBy;
        }
      });
    }
  }
}

// calculates cost of vertical adjustment as vertical distance * width of track
function getVerticalAdjustmentCost(assignment, moveBy) {
  let result = 0;
  assignment.forEach((node) => {
    node.tracks.forEach((track) => {
      // if (track.idealY !== null) {
      if ((track.idealY !== null) && (tracks[track.trackID].type !== 'read')) {
        result += Math.abs(track.idealY - moveBy - tracks[track.trackID].path[track.segmentID].y) * tracks[track.trackID].width;
      }
    });
  });
  return result;
}

function compareByIdealLane(a, b) {
  if (a.hasOwnProperty('idealLane')) {
    if (b.hasOwnProperty('idealLane')) {
      if (a.idealLane < b.idealLane) return -1;
      else if (a.idealLane > b.idealLane) return 1;
      return 0;
    }
    return -1;
  }
  if (b.hasOwnProperty('idealLane')) {
    return 1;
  }
  return 0;
}

function compareNodesByOrder(a, b) {
  if (a === null) {
    if (b === null) return 0;
    return -1;
  }
  if (b === null) return 1;

  if (a.hasOwnProperty('order')) {
    if (b.hasOwnProperty('order')) {
      if (a.order < b.order) return -1;
      else if (a.order > b.order) return 1;
      if (a.hasOwnProperty('y') && b.hasOwnProperty('y')) {
        if (a.y < b.y) return -1;
        else if (a.y > b.y) return 1;
      }
      return 0;
    }
    return -1;
  }
  if (b.hasOwnProperty('order')) return 1;
  return 0;
}

function addTrackFeatures() {
  // console.log('adding track features');
  let nodeStart;
  let nodeEnd;
  let feature = {};

  // console.log('processing BED-info');
  bed.forEach((line) => {
    let i = 0;
    while ((i < numberOfTracks) && (tracks[i].name !== line.track)) i += 1;
    if (i < numberOfTracks) {
      // console.log('Track ' + line.track + ' found');
      nodeStart = 0;
      tracks[i].path.forEach((node) => {
        if (node.node !== null) {
          feature = {};
          // console.log(nodes[nodeMap.get(node.node)]);
          if (nodes[node.node].hasOwnProperty('sequenceLength')) {
            nodeEnd = nodeStart + nodes[node.node].sequenceLength - 1;
          } else {
            nodeEnd = nodeStart + nodes[node.node].width - 1;
          }

          // console.log(nodeStart + ', ' + nodeEnd);
          // console.log(line.start + ' ' + line.end);
          if ((nodeStart >= line.start) && (nodeStart <= line.end)) feature.start = 0;
          if ((nodeStart < line.start) && (nodeEnd >= line.start)) feature.start = line.start - nodeStart;
          if ((nodeEnd <= line.end) && (nodeEnd >= line.start)) {
            // console.log('drin');
            feature.end = nodeEnd - nodeStart;
            if (nodeEnd < line.end) feature.continue = true;
          }
          if ((nodeEnd > line.end) && (nodeStart <= line.end)) feature.end = line.end - nodeStart;
          if (feature.hasOwnProperty('start')) {
            feature.type = line.type;
            feature.name = line.name;
            if (!node.hasOwnProperty('features')) node.features = [];
            // console.log(feature);
            node.features.push(feature);
            // console.log('adding feature');
          }
          nodeStart = nodeEnd + 1;
        }
      });
    } else {
      // console.log('Track ' + line.track + ' not found');
    }
  });
}

function calculateTrackWidth() {
  tracks.forEach((track) => {
    if (track.hasOwnProperty('freq')) { // custom track width
      // track.width = track.freq;
      track.width = Math.round((Math.log(track.freq) + 1) * 4);
      // track.width = Math.round((Math.log(track.freq) + 1));
    } else { // default track width
      track.width = 15;
      if (track.hasOwnProperty('type') && track.type === 'read') {
        track.width = 4;
      }
    }
  });
}

function useColorScheme(x) {
  config.colorScheme = x;
  svg = d3.select(svgID);
  // createTubeMap();
  const tr = createTubeMap();
  if (!config.hideLegendFlag) drawLegend(tr);
}

function assignColorSets() {
  haplotypeColors = getColorSet(config.haplotypeColors);
  forwardReadColors = getColorSet(config.forwardReadColors);
  reverseReadColors = getColorSet(config.reverseReadColors);
  exonColors = getColorSet(config.exonColors);
}

function getColorSet(colorSetName) {
  switch (colorSetName) {
    case 'plainColors':
      return plainColors;
    case 'reds':
      return reds;
    case 'blues':
      return blues;
    case 'greys':
      return greys;
    case 'lightColors':
      return lightColors;
    default:
      return greys;
  }
}

function generateTrackColor(track, highlight) {
  if (typeof highlight === 'undefined') highlight = 'plain';
  let trackColor;
  if (track.hasOwnProperty('type') && track.type === 'read') {
    if (track.hasOwnProperty('is_reverse') && track.is_reverse === true) {
      trackColor = reverseReadColors[track.id % reverseReadColors.length];
    } else {
      trackColor = forwardReadColors[track.id % forwardReadColors.length];
    }
  } else {
    if ((config.showExonsFlag === false) || (highlight !== 'plain')) {
      trackColor = haplotypeColors[track.id % haplotypeColors.length];
    } else {
      trackColor = exonColors[track.id % exonColors.length];
    }
  }
  return trackColor;
}

function generateTrackColorOLD(track, highlight) {
  if (typeof highlight === 'undefined') highlight = 'plain';
  let trackColor;
  // Color reads in red and reverse reads in blue
  if (track.hasOwnProperty('type') && track.type === 'read') {
    // if (track.sequence[0].charAt(0) === '-') trackColor = blues[track.id % blues.length];
    if (track.hasOwnProperty('is_reverse') && track.is_reverse === true) {
      trackColor = blues[track.id % blues.length];
    } else {
      trackColor = reds[track.id % reds.length];
    }
  } else {
    if (config.colorScheme === 0) { // colorful color scheme
      if ((config.showExonsFlag === false) || (highlight !== 'plain')) {
        trackColor = plainColors[track.id % plainColors.length];
      } else {
        trackColor = lightColors[track.id % lightColors.length];
      }
    } else if (config.colorScheme === 1) { // blue-ish color scheme
      if ((config.showExonsFlag === false) || (highlight === 'plain')) {
        // trackColor = blues[track.id % blues.length];
        trackColor = greys[track.id % greys.length];
      } else {
        trackColor = reds[track.id % reds.length];
      }
    }
  }
  return trackColor;
}

function getReadXStart(read) {
  const node = nodes[read.path[0].node];
  if (read.path[0].isForward) { // read starts in forward direction
    return getXCoordinateOfBaseWithinNode(node, read.firstNodeOffset);
  }
  // read starts in backward direction
  return getXCoordinateOfBaseWithinNode(node, node.sequenceLength - read.firstNodeOffset);
}

function getReadXEnd(read) {
  const node = nodes[read.path[read.path.length - 1].node];
  if (read.path[read.path.length - 1].isForward) { // read ends in forward direction
    return getXCoordinateOfBaseWithinNode(node, read.finalNodeCoverLength);
  }
  // read ends in backward direction
  return getXCoordinateOfBaseWithinNode(node, node.sequenceLength - read.finalNodeCoverLength);
}

// returns the x coordinate (in pixels) of (the left side) of the given base
// position within the given node
function getXCoordinateOfBaseWithinNode(node, base) {
  // if (base > node.width) return null;
  if (base > node.sequenceLength) return null;  // equality is allowed
  const nodeLeftX = node.x - 4;
  const nodeRightX = node.x + node.pixelWidth + 4;
  return nodeLeftX + ((base / node.sequenceLength) * (nodeRightX - nodeLeftX));
}

// transforms the info in the tracks' path attribute into actual coordinates
// and saves them in trackRectangles and trackCurves
function generateSVGShapesFromPath() {
  let xStart;
  let xEnd;
  let yStart;
  let yEnd;
  let trackColor;
  let highlight;
  let dummy;
  let reversalFlag;

  for (let i = 0; i <= maxOrder; i += 1) {
    extraLeft.push(0);
    extraRight.push(0);
  }

  // generate x coords where each order starts and ends
  const orderStartX = [];
  const orderEndX = [];
  nodes.forEach((node) => {
    if (node.hasOwnProperty('order')) {
      orderStartX[node.order] = node.x;
      if (orderEndX[node.order] === undefined) orderEndX[node.order] = node.x + node.pixelWidth;
      else orderEndX[node.order] = Math.max(orderEndX[node.order], node.x + node.pixelWidth);
    }
  });

  tracks.forEach((track) => {
    highlight = 'plain';
    trackColor = generateTrackColor(track, highlight);

    // start of path
    yStart = track.path[0].y;
    if (track.type !== 'read') {
      if (track.sequence[0].charAt(0) === '-') { // The track starts with an inversed node
        xStart = orderEndX[track.path[0].order] + 20;
      } else { // The track starts with a forward node
        xStart = orderStartX[track.path[0].order] - 20;
      }
    } else {
      xStart = getReadXStart(track);
    }

    // middle of path
    for (let i = 0; i < track.path.length; i += 1) {
      // if  (track.path[i].y === track.path[i - 1].y) continue;
      if (track.path[i].y === yStart) {
        if (track.path[i].hasOwnProperty('features')) {
          if ((i > 0) && (track.path[i - 1].order === track.path[i].order)) reversalFlag = true;
          else reversalFlag = false;
          dummy = createFeatureRectangle(track.path[i], orderStartX[track.path[i].order], orderEndX[track.path[i].order], highlight, track, xStart, yStart, trackColor, reversalFlag);
          highlight = dummy.highlight;
          xStart = dummy.xStart;
        }
      } else {
        if (track.path[i - 1].isForward) {
          xEnd = orderEndX[track.path[i - 1].order];
        } else {
          xEnd = orderStartX[track.path[i - 1].order];
        }
        if (xEnd !== xStart) {
          trackColor = generateTrackColor(track, highlight);
          trackRectangles.push({ xStart: Math.min(xStart, xEnd), yStart, xEnd: Math.max(xStart, xEnd), yEnd: yStart + track.width - 1, color: trackColor, id: track.id, type: track.type });
        }

        if (track.path[i].order - 1 === track.path[i - 1].order) { // regular forward connection
          xStart = xEnd;
          xEnd = orderStartX[track.path[i].order];
          yEnd = track.path[i].y;
          trackColor = generateTrackColor(track, highlight);
          trackCurves.push({ xStart, yStart, xEnd: xEnd + 1, yEnd, width: track.width, color: trackColor, laneChange: Math.abs(track.path[i].lane - track.path[i - 1].lane), id: track.id, type: track.type });
          xStart = xEnd;
          yStart = yEnd;
        } else if (track.path[i].order + 1 === track.path[i - 1].order) { // regular backward connection
          xStart = xEnd;
          xEnd = orderEndX[track.path[i].order];
          yEnd = track.path[i].y;
          trackColor = generateTrackColor(track, highlight);
          trackCurves.push({ xStart: xStart + 1, yStart, xEnd, yEnd, width: track.width, color: trackColor, laneChange: Math.abs(track.path[i].lane - track.path[i - 1].lane), id: track.id, type: track.type });
          xStart = xEnd;
          yStart = yEnd;
        } else { // change of direction
          if (track.path[i - 1].isForward) {
            yEnd = track.path[i].y;
            generateForwardToReverse(xEnd, yStart, yEnd, track.width, trackColor, track.id, track.path[i].order, track.type);
            xStart = orderEndX[track.path[i].order];
            yStart = track.path[i].y;
          } else {
            yEnd = track.path[i].y;
            generateReverseToForward(xEnd, yStart, yEnd, track.width, trackColor, track.id, track.path[i].order, track.type);
            xStart = orderStartX[track.path[i].order];
            yStart = track.path[i].y;
          }
        }

        if (track.path[i].hasOwnProperty('features')) {
          if (track.path[i - 1].order === track.path[i].order) reversalFlag = true;
          else reversalFlag = false;
          dummy = createFeatureRectangle(track.path[i], orderStartX[track.path[i].order], orderEndX[track.path[i].order], highlight, track, xStart, yStart, trackColor, reversalFlag);
          highlight = dummy.highlight;
          xStart = dummy.xStart;
        }
      }
    }

    // ending edges
    if (track.type !== 'read') {
      if (!track.path[track.path.length - 1].isForward) { // The track ends with an inversed node
        xEnd = orderStartX[track.path[track.path.length - 1].order] - 20;
      } else { // The track ends with a forward node
        xEnd = orderEndX[track.path[track.path.length - 1].order] + 20;
      }
    } else {
      xEnd = getReadXEnd(track);
    }
    // trackRectangles.push({xStart: xStart, yStart: yStart, xEnd: xEnd, yEnd: yStart + track.width - 1, color: trackColor, id: track.id, type: track.type});
    trackRectangles.push({ xStart: Math.min(xStart, xEnd), yStart, xEnd: Math.max(xStart, xEnd), yEnd: yStart + track.width - 1, color: trackColor, id: track.id, type: track.type });
  });
}

function createFeatureRectangle(node, nodeXStart, nodeXEnd, highlight, track, rectXStart, yStart, trackColor, reversalFlag) {
  let nodeWidth;
  let currentHighlight = highlight;
  let c;
  let co;
  let featureXStart;
  let featureXEnd;

  nodeXStart -= 8;
  nodeXEnd += 8;
  // console.log('creating highlight');
  if (nodes[node.node].hasOwnProperty('sequenceLength')) {
    nodeWidth = nodes[node.node].sequenceLength;
  } else {
    nodeWidth = nodes[node.node].width;
  }

  // console.log(nodeWidth);
  // console.log(nodeXStart);
  // console.log(nodeXEnd);
  node.features.sort((a, b) => a.start - b.start);
  node.features.forEach((feature) => {
    // console.log(feature);
    if (currentHighlight !== feature.type) { // finish incoming rectangle
      c = generateTrackColor(track, currentHighlight);
      if (node.isForward === true) {
        featureXStart = nodeXStart + Math.round(feature.start * (nodeXEnd - nodeXStart + 1) / nodeWidth);

        // overwrite narrow post-inversion rectangle if highlight starts near beginning of node
        if ((reversalFlag) && (featureXStart < nodeXStart + 8)) {
          featureXEnd = nodeXStart + Math.round((feature.end + 1) * (nodeXEnd - nodeXStart + 1) / nodeWidth) - 1;
          co = generateTrackColor(track, feature.type);
          trackRectanglesStep3.push({ xStart: featureXStart, yStart, xEnd: featureXEnd, yEnd: yStart + track.width - 1, color: co, id: track.id, type: track.type });
        }

        if (featureXStart > rectXStart + 1) {
          // console.log('drawing rect 1: ' + rectXStart + ' bis '  + (featureXStart - 1));
          trackRectanglesStep3.push({ xStart: rectXStart, yStart, xEnd: featureXStart - 1, yEnd: yStart + track.width - 1, color: c, id: track.id, type: track.type });
        }
      } else {
        // console.log('reversal 1 here:');
        featureXStart = nodeXEnd - Math.round(feature.start * (nodeXEnd - nodeXStart + 1) / nodeWidth);

        // overwrite narrow post-inversion rectangle if highlight starts near beginning of node
        if ((reversalFlag) && (featureXStart > nodeXEnd - 8)) {
          featureXEnd = nodeXEnd - Math.round((feature.end + 1) * (nodeXEnd - nodeXStart + 1) / nodeWidth) - 1;
          co = generateTrackColor(track, feature.type);
          trackRectanglesStep3.push({ xStart: featureXEnd, yStart, xEnd: featureXStart, yEnd: yStart + track.width - 1, color: co, id: track.id, type: track.type });
        }

        if (rectXStart > featureXStart + 1) {
          // console.log('drawing rect 1 reverse: ' + rectXStart + ' bis '  + (featureXStart + 1));
          trackRectanglesStep3.push({ xStart: featureXStart + 1, yStart, xEnd: rectXStart, yEnd: yStart + track.width - 1, color: c, id: track.id, type: track.type });
        }
      }
      rectXStart = featureXStart;
      currentHighlight = feature.type;
    }
    if ((feature.end < nodeWidth - 1) || (!feature.hasOwnProperty('continue'))) { // finish internal rectangle
      c = generateTrackColor(track, currentHighlight);
      if (node.isForward === true) {
        featureXEnd = nodeXStart + Math.round((feature.end + 1) * (nodeXEnd - nodeXStart + 1) / nodeWidth) - 1;
        // console.log('drawing rect 2: ' + rectXStart + ' bis ' + (featureXEnd));
        trackRectanglesStep3.push({ xStart: rectXStart, yStart, xEnd: featureXEnd, yEnd: yStart + track.width - 1, color: c, id: track.id, type: track.type });
      } else {
        // console.log('reversal 2 here:');
        featureXEnd = nodeXEnd - Math.round((feature.end + 1) * (nodeXEnd - nodeXStart + 1) / nodeWidth) - 1;
        // console.log('drawing rect 2 reverse: ' + rectXStart + ' bis ' + featureXEnd);
        trackRectanglesStep3.push({ xStart: featureXEnd, yStart, xEnd: rectXStart, yEnd: yStart + track.width - 1, color: c, id: track.id, type: track.type });
      }
      rectXStart = featureXEnd + 1;
      currentHighlight = 'plain';
    }
  });
  return { xStart: rectXStart, highlight: currentHighlight };
}

function generateForwardToReverse(x, yStart, yEnd, trackWidth, trackColor, trackID, order, type) {
  x += 10 * extraRight[order];
  const yTop = Math.min(yStart, yEnd);
  const yBottom = Math.max(yStart, yEnd);
  const radius = 7;

  trackVerticalRectangles.push({ // elongate incoming rectangle a bit to the right
    xStart: x - (10 * extraRight[order]),
    yStart,
    xEnd: x + 5,
    yEnd: yStart + trackWidth - 1,
    color: trackColor,
    id: trackID,
    type,
  });
  trackVerticalRectangles.push({ // vertical rectangle
    xStart: x + 5 + radius,
    yStart: yTop + trackWidth + radius - 1,
    xEnd: x + 5 + radius + Math.min(7, trackWidth) - 1,
    yEnd: yBottom - radius + 1,
    color: trackColor,
    id: trackID,
    type,
  });
  trackVerticalRectangles.push({
    xStart: x - (10 * extraRight[order]),
    yStart: yEnd,
    xEnd: x + 5,
    yEnd: yEnd + trackWidth - 1,
    color: trackColor,
    id: trackID,
    type,
  }); // elongate outgoing rectangle a bit to the right

  let d = `M ${x + 5} ${yBottom}`;
  d += ` Q ${x + 5 + radius} ${yBottom} ${x + 5 + radius} ${yBottom - radius}`;
  d += ` H ${x + 5 + radius + Math.min(7, trackWidth)}`;
  d += ` Q ${x + 5 + radius + Math.min(7, trackWidth)} ${yBottom + trackWidth} ${x + 5} ${yBottom + trackWidth}`;
  d += ' Z ';
  trackCorners.push({ path: d, color: trackColor, id: trackID, type });

  d = `M ${x + 5} ${yTop}`;
  d += ` Q ${x + 5 + radius + Math.min(7, trackWidth)} ${yTop} ${x + 5 + radius + Math.min(7, trackWidth)} ${yTop + trackWidth + radius}`;
  d += ` H ${x + 5 + radius}`;
  d += ` Q ${x + 5 + radius} ${yTop + trackWidth} ${x + 5} ${yTop + trackWidth}`;
  d += ' Z ';
  trackCorners.push({ path: d, color: trackColor, id: trackID, type });
  extraRight[order] += 1;
}

function generateReverseToForward(x, yStart, yEnd, trackWidth, trackColor, trackID, order, type) {
  const yTop = Math.min(yStart, yEnd);
  const yBottom = Math.max(yStart, yEnd);
  const radius = 7;
  x -= 10 * extraLeft[order];

  trackVerticalRectangles.push({
    xStart: x - 6,
    yStart,
    xEnd: x + (10 * extraLeft[order]),
    yEnd: yStart + trackWidth - 1,
    color: trackColor,
    id: trackID,
    type,
  }); // elongate incoming rectangle a bit to the left
  trackVerticalRectangles.push({
    xStart: x - 5 - radius - Math.min(7, trackWidth),
    yStart: yTop + trackWidth + radius - 1,
    xEnd: x - 5 - radius - 1,
    yEnd: yBottom - radius + 1,
    color: trackColor,
    id: trackID,
    type,
  }); // vertical rectangle
  trackVerticalRectangles.push({
    xStart: x - 6,
    yStart: yEnd,
    xEnd: x + (10 * extraLeft[order]),
    yEnd: yEnd + trackWidth - 1,
    color: trackColor,
    id: trackID,
    type,
  }); // elongate outgoing rectangle a bit to the left

  // Path for bottom 90 degree bend
  let d = `M ${x - 5} ${yBottom}`;
  d += ` Q ${x - 5 - radius} ${yBottom} ${x - 5 - radius} ${yBottom - radius}`;
  d += ` H ${x - 5 - radius - Math.min(7, trackWidth)}`;
  d += ` Q ${x - 5 - radius - Math.min(7, trackWidth)} ${yBottom + trackWidth} ${x - 5} ${yBottom + trackWidth}`;
  d += ' Z ';
  trackCorners.push({ path: d, color: trackColor, id: trackID, type });

  // Path for top 90 degree bend
  d = `M ${x - 5} ${yTop}`;
  d += ` Q ${x - 5 - radius - Math.min(7, trackWidth)} ${yTop} ${x - 5 - radius - Math.min(7, trackWidth)} ${yTop + trackWidth + radius}`;
  d += ` H ${x - 5 - radius}`;
  d += ` Q ${x - 5 - radius} ${yTop + trackWidth} ${x - 5} ${yTop + trackWidth}`;
  d += ' Z ';
  trackCorners.push({ path: d, color: trackColor, id: trackID, type });
  extraLeft[order] += 1;
}

// to avoid problems with wrong overlapping of tracks, draw them in order of their color
function drawReversalsByColor(corners, rectangles, type) {
  if (typeof type === 'undefined') type = 'haplo';
  // trackCurves = trackCurves.filter(filterObjectByAttribute('type', type));

  const co = new Set();
  rectangles.forEach((rect) => {
    // console.log('rect: ' + rect[4]);
    // co.add(rect[4]);
    co.add(rect.color);
  });
  // console.log(co);
  co.forEach((c) => {
    drawTrackRectangles(rectangles.filter(filterObjectByAttribute('color', c)), type);
    drawTrackCorners(corners.filter(filterObjectByAttribute('color', c)), type);
  });
}

// draws nodes by building svg-path for border and filling it with transparent white
function drawNodes(dNodes) {
  let x;
  let y;

  dNodes.forEach((node) => {
    // top left arc
    node.d = `M ${node.x - 9} ${node.y} Q ${node.x - 9} ${node.y - 9} ${node.x} ${node.y - 9}`;
    x = node.x;
    y = node.y - 9;

    // top straight
    if (node.width > 1) {
      x += node.pixelWidth;
      node.d += ` L ${x} ${y}`;
    }

    // top right arc
    node.d += ` Q ${x + 9} ${y} ${x + 9} ${y + 9}`;
    x += 9;
    y += 9;

    // right straight
    if (node.contentHeight > 0) {
      // y += (node.degree - 1) * 22;
      y += node.contentHeight - 0;
      node.d += ` L ${x} ${y}`;
    }

    // bottom right arc
    node.d += ` Q ${x} ${y + 9} ${x - 9} ${y + 9}`;
    x -= 9;
    y += 9;

    // bottom straight
    if (node.width > 1) {
      x -= node.pixelWidth;
      node.d += ` L ${x} ${y}`;
    }

    // bottom left arc
    node.d += ` Q ${x - 9} ${y} ${x - 9} ${y - 9}`;
    x -= 9;
    y -= 9;

    // left straight
    // if (node.degree > 1) {
    if (node.contentHeight > 0) {
      // y -= (node.degree - 1) * 22;
      y -= node.contentHeight - 0;
      node.d += ` L ${x} ${y}`;
    }
  });

  svg.selectAll('.node')
    .data(dNodes)
    .enter()
    .append('path')
    .attr('id', d => d.name)
    .attr('d', d => d.d)
    // .attr('title', function(d) { return d.name; })
    .on('mouseover', nodeMouseOver)
    .on('mouseout', nodeMouseOut)
    .on('dblclick', nodeDoubleClick)
    .style('fill', '#fff')
    // .style('fill-opacity', '0.4')
    .style('fill-opacity', config.showExonsFlag ? '0.4' : '0.6')
    .style('stroke', 'black')
    .style('stroke-width', '2px')
    .append('svg:title')
        .text(d => d.name);
}

// draw seqence labels for nodes
function drawLabels(dNodes) {
  if (config.nodeWidthOption === 0) {
    svg.selectAll('text')
    // svg.append('text')
      .data(dNodes)
      .enter()
      .append('text')
      .attr('x', d => d.x - 4)
      .attr('y', d => d.y + 4)
      .text(d => d.seq)
      .attr('font-family', 'Courier, "Lucida Console", monospace')
      .attr('font-size', '14px')
      .attr('fill', 'black')
      .style('pointer-events', 'none');
  }
}

function drawRuler() {
  let rulerTrackIndex = 0;
  while (tracks[rulerTrackIndex].name !== trackForRuler) rulerTrackIndex += 1;
  const rulerTrack = tracks[rulerTrackIndex];

  // draw horizontal line
  svg.append('line')
    .attr('x1', 0)
    .attr('y1', minYCoordinate - 10)
    .attr('x2', maxXCoordinate)
    .attr('y2', minYCoordinate - 10)
    .attr('stroke-width', 1)
    .attr('stroke', 'black');

  let markingInterval = 100;
  if (config.nodeWidthOption === 0) markingInterval = 20;

  let indexOfFirstBaseInNode = rulerTrack.indexOfFirstBase;
  let atLeastOneMarkingDrawn = false;
  rulerTrack.indexSequence.forEach((nodeIndex) => {
    const currentNode = nodes[nodeIndex];

    let nextMarking = Math.ceil(indexOfFirstBaseInNode / markingInterval) * markingInterval;
    while (nextMarking < indexOfFirstBaseInNode + currentNode.sequenceLength) {
      const xCoordOfMarking = getXCoordinateOfBaseWithinNode(currentNode, nextMarking - indexOfFirstBaseInNode);
      drawRulerMarking(nextMarking, xCoordOfMarking);
      atLeastOneMarkingDrawn = true;
      nextMarking += markingInterval;
    }
    indexOfFirstBaseInNode += nodes[nodeIndex].sequenceLength;
  });

  // if no markings drawn, draw one at the very beginning
  if (!atLeastOneMarkingDrawn) {
    drawRulerMarking(rulerTrack.indexOfFirstBase, nodes[rulerTrack.indexSequence[0]].x - 4);
  }
}

function drawRulerMarking(sequencePosition, xCoordinate) {
  svg.append('text')
    .attr('x', xCoordinate)
    .attr('y', minYCoordinate - 13)
    .text(`|${sequencePosition}`)
    .attr('font-family', 'Courier, "Lucida Console", monospace')
    .attr('font-size', '12px')
    .attr('fill', 'black')
    .style('pointer-events', 'none');
}

function filterObjectByAttribute(attribute, value) {
  return item => item[attribute] === value;
}

function drawTrackRectangles(rectangles, type) {
  if (typeof type === 'undefined') type = 'haplo';
  rectangles = rectangles.filter(filterObjectByAttribute('type', type));

  svg.selectAll('trackRectangles')
    .data(rectangles)
    .enter().append('rect')
    .attr('x', d => d.xStart)
    .attr('y', d => d.yStart)
    .attr('width', d => d.xEnd - d.xStart + 1)
    .attr('height', d => d.yEnd - d.yStart + 1)
    // .style('fill', function(d) { return color(d[4]); })
    .style('fill', d => d.color)
    // .style('fill', 'none')
    .attr('trackID', d => d.id)
    .attr('class', d => `track${d.id}`)
    .attr('color', d => d.color)
    .on('mouseover', trackMouseOver)
    .on('mouseout', trackMouseOut)
    .on('dblclick', trackDoubleClick);

  // drawEmptyRects(trackRectangles);
}

function compareCurvesByLineChanges(a, b) {
  if (a[6] < b[6]) return -1;
  else if (a[6] > b[6]) return 1;
  return 0;
}

function defineSVGPatterns() {
  let pattern = svg.append('defs')
    .append('pattern')
    .attr({ id: 'patternA', width: '7', height: '7', patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '7', height: '7', fill: '#FFFFFF' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '3', height: '3', fill: '#505050' });
  pattern.append('rect')
    .attr({ x: '0', y: '4', width: '3', height: '3', fill: '#505050' });
  pattern.append('rect')
    .attr({ x: '4', y: '0', width: '3', height: '3', fill: '#505050' });
  pattern.append('rect')
    .attr({ x: '4', y: '4', width: '3', height: '3', fill: '#505050' });

  pattern = svg.append('defs')
    .append('pattern')
    .attr({ id: 'patternB', width: '8', height: '8', patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '8', height: '8', fill: '#FFFFFF' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '3', height: '3', fill: '#1f77b4' });
  pattern.append('rect')
    .attr({ x: '0', y: '5', width: '3', height: '3', fill: '#1f77b4' });
  pattern.append('rect')
    .attr({ x: '5', y: '0', width: '3', height: '3', fill: '#1f77b4' });
  pattern.append('rect')
    .attr({ x: '5', y: '5', width: '3', height: '3', fill: '#1f77b4' });

  pattern = svg.append('defs')
    .append('pattern')
    .attr({ id: 'plaid0', width: '6', height: '6', patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '6', height: '6', fill: '#FFFFFF' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '2', height: '2', fill: '#1f77b4' });
  pattern.append('rect')
    .attr({ x: '0', y: '4', width: '2', height: '2', fill: '#1f77b4' });
  pattern.append('rect')
    .attr({ x: '4', y: '0', width: '2', height: '2', fill: '#1f77b4' });
  pattern.append('rect')
    .attr({ x: '4', y: '4', width: '2', height: '2', fill: '#1f77b4' });

  pattern = svg.append('defs')
    .append('pattern')
    .attr({ id: 'plaid1', width: '6', height: '6', patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '6', height: '6', fill: '#FFFFFF' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '2', height: '2', fill: '#ff7f0e' });
  pattern.append('rect')
    .attr({ x: '0', y: '4', width: '2', height: '2', fill: '#ff7f0e' });
  pattern.append('rect')
    .attr({ x: '4', y: '0', width: '2', height: '2', fill: '#ff7f0e' });
  pattern.append('rect')
    .attr({ x: '4', y: '4', width: '2', height: '2', fill: '#ff7f0e' });

  pattern = svg.append('defs')
    .append('pattern')
    .attr({ id: 'plaid2', width: '6', height: '6', patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '6', height: '6', fill: '#FFFFFF' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '2', height: '2', fill: '#2ca02c' });
  pattern.append('rect')
    .attr({ x: '0', y: '4', width: '2', height: '2', fill: '#2ca02c' });
  pattern.append('rect')
    .attr({ x: '4', y: '0', width: '2', height: '2', fill: '#2ca02c' });
  pattern.append('rect')
    .attr({ x: '4', y: '4', width: '2', height: '2', fill: '#2ca02c' });

  pattern = svg.append('defs')
    .append('pattern')
    .attr({ id: 'plaid3', width: '6', height: '6', patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '6', height: '6', fill: '#FFFFFF' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '2', height: '2', fill: '#d62728' });
  pattern.append('rect')
    .attr({ x: '0', y: '4', width: '2', height: '2', fill: '#d62728' });
  pattern.append('rect')
    .attr({ x: '4', y: '0', width: '2', height: '2', fill: '#d62728' });
  pattern.append('rect')
    .attr({ x: '4', y: '4', width: '2', height: '2', fill: '#d62728' });

  pattern = svg.append('defs')
    .append('pattern')
    .attr({ id: 'plaid4', width: '6', height: '6', patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '6', height: '6', fill: '#FFFFFF' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '2', height: '2', fill: '#9467bd' });
  pattern.append('rect')
    .attr({ x: '0', y: '4', width: '2', height: '2', fill: '#9467bd' });
  pattern.append('rect')
    .attr({ x: '4', y: '0', width: '2', height: '2', fill: '#9467bd' });
  pattern.append('rect')
    .attr({ x: '4', y: '4', width: '2', height: '2', fill: '#9467bd' });

  pattern = svg.append('defs')
    .append('pattern')
    .attr({ id: 'plaid5', width: '6', height: '6', patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '6', height: '6', fill: '#FFFFFF' });
  pattern.append('rect')
    .attr({ x: '0', y: '0', width: '2', height: '2', fill: '#8c564b' });
  pattern.append('rect')
    .attr({ x: '0', y: '4', width: '2', height: '2', fill: '#8c564b' });
  pattern.append('rect')
    .attr({ x: '4', y: '0', width: '2', height: '2', fill: '#8c564b' });
  pattern.append('rect')
    .attr({ x: '4', y: '4', width: '2', height: '2', fill: '#8c564b' });
}

function drawTrackCurves(type) {
  if (typeof type === 'undefined') type = 'haplo';
  const myTrackCurves = trackCurves.filter(filterObjectByAttribute('type', type));

  myTrackCurves.sort(compareCurvesByLineChanges);

  myTrackCurves.forEach((curve) => {
    const xMiddle = (curve.xStart + curve.xEnd) / 2;
    let d = `M ${curve.xStart} ${curve.yStart}`;
    d += ` C ${xMiddle} ${curve.yStart} ${xMiddle} ${curve.yEnd} ${curve.xEnd} ${curve.yEnd}`;
    d += ` V ${curve.yEnd + curve.width}`;
    d += ` C ${xMiddle} ${curve.yEnd + curve.width} ${xMiddle} ${curve.yStart + curve.width} ${curve.xStart} ${curve.yStart + curve.width}`;
    d += ' Z';
    // curve.push(d);
    curve.path = d;
  });

  svg.selectAll('trackCurves')
    .data(trackCurves)
    .enter().append('path')
    .attr('d', d => d.path)
    // .style('fill', d => color(d[5]); })
    .style('fill', d => d.color)
    .attr('trackID', d => d.id)
    .attr('class', d => `track${d.id}`)
    .attr('color', d => d.color)
    .on('mouseover', trackMouseOver)
    .on('mouseout', trackMouseOut)
    .on('dblclick', trackDoubleClick);
}

function drawTrackCorners(corners, type) {
  if (typeof type === 'undefined') type = 'haplo';
  corners = corners.filter(filterObjectByAttribute('type', type));

  svg.selectAll('trackCorners')
    .data(corners)
    .enter().append('path')
    .attr('d', d => d.path)
    // .style('fill', d => color(d[1]); })
    .style('fill', d => d.color)
    .attr('trackID', d => d.id)
    .attr('class', d => `track${d.id}`)
    .attr('color', d => d.color)
    .on('mouseover', trackMouseOver)
    .on('mouseout', trackMouseOut)
    .on('dblclick', trackDoubleClick);
}

function drawLegend() {
  let content = '<table class="table-sm table-condensed table-nonfluid"><thead><tr><th>Color</th><th>Trackname</th><th>Show Track</th></tr></thead>';
  const listeners = [];
  for (let i = 0; i < tracks.length; i += 1) {
    if (tracks[i].type === 'haplo') {
      // content += '<tr><td><span style="color: ' + generateTrackColor(tracks[i], 'exon') + '"><i class="fa fa-square" aria-hidden="true"></i></span></td>';
      // content += `<tr><td><span style="color: ${generateTrackColor(tracks[i], 'exon')}"><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></td>`;
      // content += `<tr><td><p style="color: ${generateTrackColor(tracks[i], 'exon')}">O &#x25FE;</p></td>`;
      content += `<tr><td style="text-align:right"><div class="color-box" style="background-color: ${generateTrackColor(tracks[i], 'exon')};"></div></td>`;
      if (tracks[i].hasOwnProperty('name')) {
        content += `<td>${tracks[i].name}</td>`;
      } else {
        content += `<td>${tracks[i].id}</td>`;
      }
      content += `<td><input type="checkbox" checked=true id="showTrack${i}"></td>`;
      listeners.push(i);
    }
  }
  content += '</table';
  __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#legendDiv').html(content);
  listeners.forEach((i) => {
    document.getElementById(`showTrack${i}`).addEventListener('click', () => changeTrackVisibility(i), false);
  });
}

// Highlight track on mouseover
function trackMouseOver() {
  /* jshint validthis: true */
  const trackID = d3.select(this).attr('trackID');
  d3.selectAll(`.track${trackID}`).style('fill', 'url(#patternA)');
}

// Highlight node on mouseover
function nodeMouseOver() {
  /* jshint validthis: true */
  d3.select(this).style('stroke-width', '4px');
}

// Restore original track appearance on mouseout
function trackMouseOut() {
  /* jshint validthis: true */
  const trackID = d3.select(this).attr('trackID');
  d3.selectAll(`.track${trackID}`)
    .each(function clearTrackHighlight() {
      const c = d3.select(this).attr('color');
      d3.select(this).style('fill', c);
    });
}

// Restore original node appearance on mouseout
function nodeMouseOut() {
  /* jshint validthis: true */
  d3.select(this).style('stroke-width', '2px');
}

// Move clicked track to first position
function trackDoubleClick() {
  /* jshint validthis: true */
  const trackID = d3.select(this).attr('trackID');
  let index = 0;
  // while (inputTracks[index].id !== trackID) index += 1;
  while ((index < inputTracks.length) && (inputTracks[index].id !== Number(trackID))) {
    index += 1;
  }
  if (index >= inputTracks.length) return;
  console.log(`moving index: ${index}`);
  moveTrackToFirstPosition(index);
  createTubeMap();
}

// Redraw with current node moved to beginning
function nodeDoubleClick() {
  /* jshint validthis: true */
  const nodeID = d3.select(this).attr('id');
  if (config.clickableNodesFlag) {
    if (reads && config.showReads) {
      document.getElementById('hgvmNodeID').value = nodeID;
      document.getElementById('hgvmPostButton').click();
    } else {
      document.getElementById('nodeID').value = nodeID;
      document.getElementById('postButton').click();
    }
  }
}

// extract info about nodes from vg-json
function vgExtractNodes(vg) {
  const result = [];
  vg.node.forEach((node) => {
    result.push({ name: `${node.id}`, sequenceLength: node.sequence.length, seq: node.sequence });
    // console.log('name: ' + node.id + ', length: ' + node.sequence.length);
  });
  return result;
}

// calculate node widths depending on sequence lengths and chosen calculation method
function generateNodeWidth() {
  nodes.forEach((node) => {
    if (!node.hasOwnProperty('sequenceLength')) {
      node.sequenceLength = node.seq.length;
    }
  });

  switch (config.nodeWidthOption) {
    case 1:
      nodes.forEach((node) => {
        node.width = (1 + (Math.log(node.sequenceLength) / Math.log(2)));
        node.pixelWidth = Math.round((node.width - 1) * 8.401);
      });
      break;
    case 2:
      nodes.forEach((node) => {
        // if (node.hasOwnProperty('sequenceLength')) node.width = (1 + Math.log(node.sequenceLength) / Math.log(10));
        // node.pixelWidth = Math.round((node.width - 1) * 8.401);
        node.width = (node.sequenceLength / 100);
        node.pixelWidth = Math.round((node.width - 1) * 8.401);
      });
      break;
    default:
      nodes.forEach((node) => {
        node.width = node.sequenceLength;

        // get width of node's text label by writing label, measuring it and removing label
        svg.append('text')
          .attr('x', 0)
          .attr('y', 100)
          .attr('id', 'dummytext')
          .text(node.seq.substr(1))
          .attr('font-family', 'Courier, "Lucida Console", monospace')
          .attr('font-size', '14px')
          .attr('fill', 'black')
          .style('pointer-events', 'none');
        node.pixelWidth = Math.round(document.getElementById('dummytext').getComputedTextLength());
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#dummytext').remove();
      });
  }
}

// extract track info from vg-json
function vgExtractTracks(vg) {
  const result = [];
  vg.path.forEach((path, index) => {
    const sequence = [];
    let isCompletelyReverse = true;
    path.mapping.forEach((pos) => {
      if ((pos.position.hasOwnProperty('is_reverse')) && (pos.position.is_reverse === true)) {
        sequence.push(`-${pos.position.node_id}`);
      } else {
        sequence.push(`${pos.position.node_id}`);
        isCompletelyReverse = false;
      }
    });
    if (isCompletelyReverse) {
      sequence.reverse();
      sequence.forEach((node, index2) => {
        sequence[index2] = node.substr(1);
      });
    }
    const track = {};
    track.id = index;
    track.sequence = sequence;
    if (path.hasOwnProperty('freq')) track.freq = path.freq;
    if (path.hasOwnProperty('name')) track.name = path.name;
    if (path.hasOwnProperty('indexOfFirstBase')) track.indexOfFirstBase = Number(path.indexOfFirstBase);
    result.push(track);
  });
  return result;
}

function compareReadsByLeftEnd(a, b) {
  /* if (a.hasOwnProperty('order')) {
    if (b.hasOwnProperty('order')) {
      if (a.order < b.order) return -1;
      else if (a.order > b.order) return 1;
      else return 0;
    } else return -1;
  } else {
    if (b.hasOwnProperty('order')) return 1;
    else return 0;
  } */
  let leftNodeA;
  let leftNodeB;
  // let leftNodeAForward = true;
  // let leftNodeBForward = true;
  let leftIndexA;
  let leftIndexB;

  if (a.sequence[0].charAt(0) === '-') {
    if (a.sequence[a.sequence.length - 1].charAt(0) === '-') {
      leftNodeA = a.sequence[a.sequence.length - 1].substr(1);
      // leftNodeAForward = false;
      leftIndexA = nodes[nodeMap.get(leftNodeA)].sequenceLength - a.finalNodeCoverLength;
    } else {
      leftNodeA = a.sequence[a.sequence.length - 1];
      leftIndexA = 0;
    }
  } else {
    leftNodeA = a.sequence[0];
    leftIndexA = a.firstNodeOffset;
  }

  if (b.sequence[0].charAt(0) === '-') {
    if (b.sequence[b.sequence.length - 1].charAt(0) === '-') {
      leftNodeB = b.sequence[b.sequence.length - 1].substr(1);
      // leftNodeBForward = false;
      leftIndexB = nodes[nodeMap.get(leftNodeB)].sequenceLength - b.finalNodeCoverLength;
    } else {
      leftNodeB = b.sequence[b.sequence.length - 1];
      leftIndexB = 0;
    }
  } else {
    leftNodeB = b.sequence[0];
    leftIndexB = b.firstNodeOffset;
  }

  if (leftNodeA < leftNodeB) return -1;
  else if (leftNodeA > leftNodeB) return 1;
  if (leftIndexA < leftIndexB) return -1;
  else if (leftIndexA > leftIndexB) return 1;
  return 0;
}

function compareReadsByLeftEnd2(a, b) {
  // compare by order of first node
  if (nodes[a.indexSequence[0]].order < nodes[b.indexSequence[0]].order) return -1;
  else if (nodes[a.indexSequence[0]].order > nodes[b.indexSequence[0]].order) return 1;

  // compare by first base within first node
  if (a.firstNodeOffset < b.firstNodeOffset) return -1;
  else if (a.firstNodeOffset > b.firstNodeOffset) return 1;

  // compare by order of last node
  if (nodes[a.indexSequence[a.indexSequence.length - 1]].order < nodes[b.indexSequence[b.indexSequence.length - 1]].order) return -1;
  else if (nodes[a.indexSequence[a.indexSequence.length - 1]].order > nodes[b.indexSequence[b.indexSequence.length - 1]].order) return 1;

  // compare by last base withing last node
  if (a.finalNodeCoverLength < b.finalNodeCoverLength) return -1;
  else if (a.finalNodeCoverLength > b.finalNodeCoverLength) return 1;

  return 0;
}

function vgExtractReads(myNodes, myTracks, myReads) {
  console.log(myReads);
  const extracted = [];

  const nodeNames = [];
  myNodes.forEach((node) => {
    nodeNames.push(parseInt(node.name, 10));
  });

  for (let i = 0; i < myReads.length; i += 1) {
    const read = myReads[i];
    const sequence = [];
    const sequenceNew = [];
    let firstIndex = -1; // index within mapping of the first node id contained in nodeNames
    let lastIndex = -1; // index within mapping of the last node id contained in nodeNames
    read.path.mapping.forEach((pos, j) => {
      if (nodeNames.indexOf(pos.position.node_id) > -1) {
        const edit = {};
        let offset = 0;
        if ((pos.position.hasOwnProperty('is_reverse')) && (pos.position.is_reverse === true)) {
          sequence.push(`-${pos.position.node_id}`);
          // console.log(`read ${i} is reverse`);
          edit.nodeName = `-${pos.position.node_id}`;
        } else {
          sequence.push(`${pos.position.node_id}`);
          edit.nodeName = pos.position.node_id.toString();
        }
        if (firstIndex < 0) {
          firstIndex = j;
          if (pos.position.hasOwnProperty('offset')) {
            offset = pos.position.offset;
          }
        }
        lastIndex = j;

        const mismatches = [];
        let posWithinNode = offset;
        pos.edit.forEach((element) => {
          if (element.hasOwnProperty('to_length') && !element.hasOwnProperty('from_length')) { // insertion
            // console.log(`found insertion at read ${i}, node ${j} = ${pos.position.node_id}`);
            mismatches.push({ type: 'insertion', pos: posWithinNode, seq: element.sequence });
          } else if (!element.hasOwnProperty('to_length') && element.hasOwnProperty('from_length')) { // deletion
            // console.log(`found deletion at read ${i}, node ${j} = ${pos.position.node_id}`);
            mismatches.push({ type: 'deletion', pos: posWithinNode, length: element.from_length });
          } else if (element.hasOwnProperty('sequence')) { // substitution
            // console.log(`found substitution at read ${i}, node ${j} = ${pos.position.node_id}`);
            if (element.sequence.length > 1) {
              console.log(`found substitution at read ${i}, node ${j} = ${pos.position.node_id}, seq = ${element.sequence}`);
            }
            mismatches.push({ type: 'substitution', pos: posWithinNode, seq: element.sequence });
          }
          if (element.hasOwnProperty('from_length')) {
            posWithinNode += element.from_length;
          }
        });
        edit.mismatches = mismatches;
        sequenceNew.push(edit);
      }
    });
    if (sequence.length === 0) {
      console.log(`read ${i} is empty`);
    } else {
      const track = {};
      track.id = myTracks.length + extracted.length;
      track.sequence = sequence;
      track.sequenceNew = sequenceNew;
      track.type = 'read';
      if (read.path.hasOwnProperty('freq')) track.freq = read.path.freq;
      if (read.path.hasOwnProperty('name')) track.name = read.path.name;

      // where within node does read start
      track.firstNodeOffset = 0;
      if (read.path.mapping[firstIndex].position.hasOwnProperty('offset')) {
        track.firstNodeOffset = read.path.mapping[firstIndex].position.offset;
      }

      // where within node does read end
      const finalNodeEdit = read.path.mapping[lastIndex].edit;
      track.finalNodeCoverLength = 0;
      if (read.path.mapping[lastIndex].position.hasOwnProperty('offset')) {
        track.finalNodeCoverLength += read.path.mapping[lastIndex].position.offset;
      }
      finalNodeEdit.forEach((edit) => {
        if (edit.hasOwnProperty('from_length')) {
          track.finalNodeCoverLength += edit.from_length;
        }
      });

      extracted.push(track);
    }
  }
  return extracted;
}

// remove redundant nodes
// two nodes A and B can be merged if all tracks leaving A go directly into B
// and all tracks entering B come directly from A
// (plus no inversions involved)
function mergeNodes() {
  let nodeName;
  let nodeName2;
  const pred = []; // array of set of predecessors of each node
  const succ = []; // array of set of successors of each node
  for (let i = 0; i < nodes.length; i += 1) {
    pred.push(new Set());
    succ.push(new Set());
  }

  let tracksAndReads;
  if (reads && config.showReads) tracksAndReads = tracks.concat(reads);
  else tracksAndReads = tracks;

  tracksAndReads.forEach((track) => {
    for (let i = 0; i < track.sequence.length; i += 1) {
      if (track.sequence[i].charAt(0) !== '-') {  // forward Node
        if (i > 0) {
          nodeName = track.sequence[i - 1];
          pred[nodeMap.get(track.sequence[i])].add(nodeName);
          if (nodeName.charAt(0) === '-') { // add 2 predecessors, to make sure there is no node merging in this case
            pred[nodeMap.get(track.sequence[i])].add(nodeName.substr(1));
          }
        } else if (track.type === 'haplo') {
          pred[nodeMap.get(track.sequence[i])].add('None');
        }
        if (i < track.sequence.length - 1) {
          nodeName = track.sequence[i + 1];
          succ[nodeMap.get(track.sequence[i])].add(nodeName);
          if (nodeName.charAt(0) === '-') { // add 2 successors, to make sure there is no node merging in this case
            succ[nodeMap.get(track.sequence[i])].add(nodeName.substr(1));
          }
        } else if (track.type === 'haplo') {
          succ[nodeMap.get(track.sequence[i])].add('None');
        }
      } else { // reverse Node
        nodeName = track.sequence[i].substr(1);
        if (i > 0) {
          nodeName2 = track.sequence[i - 1];
          if (nodeName2.charAt(0) === '-') {
            succ[nodeMap.get(nodeName)].add(nodeName2.substr(1));
          } else { // add 2 successors, to make sure there is no node merging in this case
            succ[nodeMap.get(nodeName)].add(nodeName2);
            succ[nodeMap.get(nodeName)].add(`-${nodeName2}`);
          }
        // } else {
        } else if (track.type === 'haplo') {
          succ[nodeMap.get(nodeName)].add('None');
        }
        if (i < track.sequence.length - 1) {
          nodeName2 = track.sequence[i + 1];
          if (nodeName2.charAt(0) === '-') {
            pred[nodeMap.get(nodeName)].add(nodeName2.substr(1));
          } else {
            pred[nodeMap.get(nodeName)].add(nodeName2);
            pred[nodeMap.get(nodeName)].add(`-${nodeName2}`);
          }
        // } else {
        } else if (track.type === 'haplo') {
          pred[nodeMap.get(nodeName)].add('None');
        }
      }
    }
  });

  // convert sets to arrays
  for (let i = 0; i < nodes.length; i += 1) {
    succ[i] = Array.from(succ[i]);
    pred[i] = Array.from(pred[i]);
  }

  // update reads which pass through merging nodes
  if (reads && config.showReads) {
    // sort nodes by order, then by y-coordinate
    const sortedNodes = nodes.slice();
    sortedNodes.sort(compareNodesByOrder);

    // iterate over all nodes and calculate their position within the new merged node
    const mergeOffset = new Map();
    const mergeOrigin = new Map(); // maps to leftmost node of a node's "merging cascade"
    sortedNodes.forEach((node) => {
      const predecessor = mergeableWithPred(nodeMap.get(node.name), pred, succ);
      if (predecessor) {
        mergeOffset.set(node.name, mergeOffset.get(predecessor) + nodes[nodeMap.get(predecessor)].sequenceLength);
        mergeOrigin.set(node.name, mergeOrigin.get(predecessor));
      } else {
        mergeOffset.set(node.name, 0);
        mergeOrigin.set(node.name, node.name);
      }
    });

    reads.forEach((read) => {
      read.firstNodeOffset += mergeOffset.get(read.sequence[0]);
      read.finalNodeCoverLength += mergeOffset.get(read.sequence[read.sequence.length - 1]);
      for (let i = read.sequence.length - 1; i >= 0; i -= 1) {
        if (mergeableWithPred(nodeMap.get(read.sequence[i]), pred, succ)) {
          const predecessor = mergeableWithPred(nodeMap.get(read.sequence[i]), pred, succ);
          if (mergeableWithSucc(nodeMap.get(predecessor), pred, succ)) {
            if (i > 0) {
              read.sequence.splice(i, 1);
              // adjust position of mismatches
              read.sequenceNew[i].mismatches.forEach((mismatch) => {
                mismatch.pos += nodes[nodeMap.get(predecessor)].sequenceLength;
              });
              // append mismatches to previous entry's mismatches
              read.sequenceNew[i - 1].mismatches = read.sequenceNew[i - 1].mismatches.concat(read.sequenceNew[i].mismatches);
              read.sequenceNew.splice(i, 1);
            } else {
              read.sequence[0] = mergeOrigin.get(read.sequence[0]);
              read.sequenceNew[i].mismatches.forEach((mismatch) => {
                mismatch.pos += mergeOffset.get(read.sequenceNew[0].nodeName);
              });
              read.sequenceNew[0].nodeName = mergeOrigin.get(read.sequenceNew[0].nodeName);
            }
          }
        }
      }
    });
  }

  // update node sequences + sequence lengths
  for (let i = 0; i < nodes.length; i += 1) {
    if (mergeableWithSucc(i, pred, succ) && !mergeableWithPred(i, pred, succ)) {
      let donor = i;
      while (mergeableWithSucc(donor, pred, succ)) {
        donor = succ[donor][0];
        if (donor.charAt(0) === '-') donor = donor.substr(1);
        donor = nodeMap.get(donor);
        if (nodes[i].hasOwnProperty('sequenceLength')) {
          nodes[i].sequenceLength += nodes[donor].sequenceLength;
        } else {
          nodes[i].width += nodes[donor].width;
        }
        nodes[i].seq += nodes[donor].seq;
      }
    }
  }

  // actually merge the nodes by removing the corresponding nodes from track data
  tracks.forEach((track) => {
    for (let i = track.sequence.length - 1; i >= 0; i -= 1) {
      nodeName = track.sequence[i];
      if (nodeName.charAt(0) === '-') nodeName = nodeName.substr(1);
      const nodeIndex = nodeMap.get(nodeName);
      if (mergeableWithPred(nodeIndex, pred, succ)) {
        track.sequence.splice(i, 1);
      }
    }
  });

  // remove the nodes from node-array
  for (let i = nodes.length - 1; i >= 0; i -= 1) {
    if (mergeableWithPred(i, pred, succ)) {
      // console.log('removing node ' + i);
      nodes.splice(i, 1);
    }
  }
}

function mergeableWithPred(index, pred, succ) {
  if (pred[index].length !== 1) return false;
  if (pred[index][0] === 'None') return false;
  let predecessor = pred[index][0];
  if (predecessor.charAt(0) === '-') predecessor = predecessor.substr(1);
  const predecessorIndex = nodeMap.get(predecessor);
  if (succ[predecessorIndex].length !== 1) return false;
  if (succ[predecessorIndex][0] === 'None') return false;
  return predecessor;
}

function mergeableWithSucc(index, pred, succ) {
  if (succ[index].length !== 1) return false;
  if (succ[index][0] === 'None') return false;
  let successor = succ[index][0];
  if (successor.charAt(0) === '-') successor = successor.substr(1);
  const successorIndex = nodeMap.get(successor);
  if (pred[successorIndex].length !== 1) return false;
  if (pred[successorIndex][0] === 'None') return false;
  return true;
}

function drawMismatches() {
  tracks.forEach((read, trackIdx) => {
    if (read.type === 'read') {
      read.sequenceNew.forEach((element, i) => {
        element.mismatches.forEach((mm) => {
          const nodeIndex = nodeMap.get(element.nodeName);
          const node = nodes[nodeIndex];
          const x = getXCoordinateOfBaseWithinNode(node, mm.pos);
          let pathIndex = i;
          while (read.path[pathIndex].node !== nodeIndex) pathIndex += 1;
          const y = read.path[pathIndex].y;
          if (mm.type === 'insertion') {
            if (config.showSoftClips
                || ((mm.pos !== read.firstNodeOffset || i !== 0)
                && (mm.pos !== read.finalNodeCoverLength
                || i !== read.sequenceNew.length - 1))) {
              drawInsertion(x - 3, y + 7, mm.seq, node.y);
            }
          } else if (mm.type === 'deletion') {
            const x2 = getXCoordinateOfBaseWithinNode(node, mm.pos + mm.length);
            drawDeletion(x, x2, y + 4, node.y);
          } else if (mm.type === 'substitution') {
            const x2 = getXCoordinateOfBaseWithinNode(node, mm.pos + mm.seq.length);
            drawSubstitution(x + 1, x2, y + 7, node.y, mm.seq);
          }
        });
      });
    }
  });
}

function drawInsertion(x, y, seq, nodeY) {
  svg.append('text')
    .attr('x', x)
    .attr('y', y)
    .text('*')
    .attr('font-family', 'Courier, "Lucida Console", monospace')
    .attr('font-size', '12px')
    .attr('fill', 'black')
    .attr('nodeY', nodeY)
    .on('mouseover', insertionMouseOver)
    .on('mouseout', insertionMouseOut)
    // .style('pointer-events', 'none')
    .append('svg:title')
        .text(seq);
}

function drawSubstitution(x1, x2, y, nodeY, seq) {
  svg.append('text')
    .attr('x', x1)
    .attr('y', y)
    .text(seq)
    .attr('font-family', 'Courier, "Lucida Console", monospace')
    .attr('font-size', '12px')
    .attr('fill', 'black')
    .attr('nodeY', nodeY)
    .attr('rightX', x2)
    .on('mouseover', substitutionMouseOver)
    .on('mouseout', substitutionMouseOut);
    // .style('pointer-events', 'none');
}

function drawDeletion(x1, x2, y, nodeY) {
  // draw horizontal block
  svg.append('line')
    .attr('x1', x1)
    .attr('y1', y - 1)
    .attr('x2', x2)
    .attr('y2', y - 1)
    .attr('stroke-width', 7)
    .attr('stroke', 'grey')
    .attr('nodeY', nodeY)
    .on('mouseover', deletionMouseOver)
    .on('mouseout', deletionMouseOut);
}

function insertionMouseOver() {
  /* jshint validthis: true */
  d3.select(this).attr('fill', 'red');
  const x = Number(d3.select(this).attr('x'));
  const y = Number(d3.select(this).attr('y'));
  const yTop = Number(d3.select(this).attr('nodeY'));
  svg.append('line')
    .attr('class', 'insertionHighlight')
    .attr('x1', x + 4)
    .attr('y1', y - 10)
    .attr('x2', x + 4)
    .attr('y2', yTop + 5)
    .attr('stroke-width', 1)
    .attr('stroke', 'black');
}

function deletionMouseOver() {
  /* jshint validthis: true */
  d3.select(this).attr('stroke', 'red');
  const x1 = Number(d3.select(this).attr('x1'));
  const x2 = Number(d3.select(this).attr('x2'));
  const y = Number(d3.select(this).attr('y1'));
  const yTop = Number(d3.select(this).attr('nodeY'));
  svg.append('line')
    .attr('class', 'deletionHighlight')
    .attr('x1', x1)
    .attr('y1', y - 3)
    .attr('x2', x1)
    .attr('y2', yTop + 5)
    .attr('stroke-width', 1)
    .attr('stroke', 'black');
  svg.append('line')
    .attr('class', 'deletionHighlight')
    .attr('x1', x2)
    .attr('y1', y - 3)
    .attr('x2', x2)
    .attr('y2', yTop + 5)
    .attr('stroke-width', 1)
    .attr('stroke', 'black');
}

function substitutionMouseOver() {
  /* jshint validthis: true */
  d3.select(this).attr('fill', 'red');
  const x1 = Number(d3.select(this).attr('x'));
  const x2 = Number(d3.select(this).attr('rightX'));
  const y = Number(d3.select(this).attr('y'));
  const yTop = Number(d3.select(this).attr('nodeY'));
  svg.append('line')
    .attr('class', 'substitutionHighlight')
    .attr('x1', x1 - 1)
    .attr('y1', y - 7)
    .attr('x2', x1 - 1)
    .attr('y2', yTop + 5)
    .attr('stroke-width', 1)
    .attr('stroke', 'black');
  svg.append('line')
    .attr('class', 'substitutionHighlight')
    .attr('x1', x2 + 1)
    .attr('y1', y - 7)
    .attr('x2', x2 + 1)
    .attr('y2', yTop + 5)
    .attr('stroke-width', 1)
    .attr('stroke', 'black');
}

function insertionMouseOut() {
  /* jshint validthis: true */
  d3.select(this).attr('fill', 'black');
  d3.selectAll('.insertionHighlight').remove();
}

function deletionMouseOut() {
  /* jshint validthis: true */
  d3.select(this).attr('stroke', 'grey');
  d3.selectAll('.deletionHighlight').remove();
}

function substitutionMouseOut() {
  /* jshint validthis: true */
  d3.select(this).attr('fill', 'grey');
  d3.selectAll('.substitutionHighlight').remove();
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(0);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_tubemap_js__ = __webpack_require__(0);


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
let data = __webpack_require__(4);
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


__WEBPACK_IMPORTED_MODULE_0__src_tubemap_js__["create"]({
    svgID: '#svg',
    nodes,
    tracks: paths
});
__WEBPACK_IMPORTED_MODULE_0__src_tubemap_js__["useColorScheme"](0);
// });
//



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"nodes":[{"name":"0","seq":"TTTTTTAGGGA"},{"name":"1","seq":"AGATC"},{"name":"2","seq":"AAATT"},{"name":"3","seq":"GAATT"},{"name":"4","seq":"GAATC"},{"name":"5","seq":"TGGCCTTCC"},{"name":"6","seq":"TA"},{"name":"7","seq":"AA"},{"name":"8","seq":"AG"},{"name":"9","seq":"CAAGGG"},{"name":"10","seq":"A"},{"name":"11","seq":"G"},{"name":"12","seq":"AGGCC"},{"name":"13","seq":"AGGG"},{"name":"14","seq":"AGGA"},{"name":"15","seq":"GGGA"},{"name":"16","seq":"AATTT"},{"name":"17","seq":"TCTTCAGAG"},{"name":"18","seq":"TCCCCAGAG"},{"name":"19","seq":"*"},{"name":"20","seq":"C"},{"name":"21","seq":"T"},{"name":"22","seq":"CCTCAGA"},{"name":"23","seq":"G"},{"name":"24","seq":"A"},{"name":"25","seq":"*"},{"name":"26","seq":"CAGAC"},{"name":"27","seq":"CA"},{"name":"28","seq":"TA"},{"name":"29","seq":"TG"},{"name":"30","seq":"GAGCCAACAGCCCCACCAG"},{"name":"31","seq":"AAGAGAGCTTCAGGTCTGGGGTAGAGACAACAACTCCCCCTCA"},{"name":"32","seq":"*"},{"name":"33","seq":"CAGAGAG"},{"name":"34","seq":"CTTG"},{"name":"35","seq":"TGTT"},{"name":"36","seq":"*"},{"name":"37","seq":"CGGAGCTCTTT"},{"name":"38","seq":"GGGATGGGGGAA"},{"name":"39","seq":"G"},{"name":"40","seq":"R"},{"name":"41","seq":"AGATAACC"},{"name":"42","seq":"*"},{"name":"43","seq":"CCCTCTCA"},{"name":"44","seq":"TCCCCTCC"},{"name":"45","seq":"*"},{"name":"46","seq":"CCTTCTCC"},{"name":"47","seq":"*"},{"name":"48","seq":"CAGAGAGCTTTGGGGTGAGGGAAGAAACAACCTCCTCGAT"},{"name":"49","seq":"GAAGCA"},{"name":"50","seq":"GGAGC"},{"name":"51","seq":"CGATAGACAAGGAACTGTA"},{"name":"52","seq":"AGAAAGAGCCTCC"},{"name":"53","seq":"TCCTTTAA"},{"name":"54","seq":"C"},{"name":"55","seq":"T"},{"name":"56","seq":"*"},{"name":"57","seq":"*"},{"name":"58","seq":"A"},{"name":"59","seq":"G"},{"name":"60","seq":"GAGCAGAGGGACAGGGAAC"},{"name":"61","seq":"CATCTACTCCCTCAGT"},{"name":"62","seq":"AGCCCCCTCCTTTAGT"},{"name":"63","seq":"*"},{"name":"64","seq":"GGAGCAGAAGGACAAGGAACAGGTYCCACCCTTAGT"},{"name":"65","seq":"TTCCCTCA"},{"name":"66","seq":"GG"},{"name":"67","seq":"AA"},{"name":"68","seq":"TCACTCTTTGGCAACGACC"},{"name":"69","seq":"CCTC"},{"name":"70","seq":"TCTT"},{"name":"71","seq":"CATC"},{"name":"72","seq":"CCTT"},{"name":"73","seq":"CGTT"},{"name":"74","seq":"GTCACA"},{"name":"75","seq":"ATAAAGATAGGGGGGCAACTAAAG"},{"name":"76","seq":"GTAAGA"},{"name":"77","seq":"GTAGG"},{"name":"78","seq":"ATAGA"},{"name":"79","seq":"GGGACAGCTAAGA"},{"name":"80","seq":"GTAAA"},{"name":"81","seq":"A"},{"name":"82","seq":"G"},{"name":"83","seq":"ATAGG"},{"name":"84","seq":"G"},{"name":"85","seq":"A"},{"name":"86","seq":"GGACAGCTAAAA"},{"name":"87","seq":"GAAGCTCT"},{"name":"88","seq":"AT"},{"name":"89","seq":"AC"},{"name":"90","seq":"GT"},{"name":"91","seq":"TAGATACAGGAGCAGA"},{"name":"92","seq":"T"},{"name":"93","seq":"C"},{"name":"94","seq":"GATACAGTATTAGAAGA"},{"name":"95","seq":"*"},{"name":"96","seq":"AATGAG"},{"name":"97","seq":"*"},{"name":"98","seq":"C"},{"name":"99","seq":"A"},{"name":"100","seq":"ATAAA"},{"name":"101","seq":"TTTGC"},{"name":"102","seq":"CATAGATTTG"},{"name":"103","seq":"Y"},{"name":"104","seq":"C"},{"name":"105","seq":"*"},{"name":"106","seq":"CAGGAA"},{"name":"107","seq":"G"},{"name":"108","seq":"A"},{"name":"109","seq":"ATGGAAACCAA"},{"name":"110","seq":"A"},{"name":"111","seq":"G"},{"name":"112","seq":"AATGATAGGGGGAATTGGAGG"},{"name":"113","seq":"TTTT"},{"name":"114","seq":"CTTC"},{"name":"115","seq":"ATCAA"},{"name":"116","seq":"AGTAA"},{"name":"117","seq":"G"},{"name":"118","seq":"A"},{"name":"119","seq":"*"},{"name":"120","seq":"GGTAAA"},{"name":"121","seq":"AGTGAG"},{"name":"122","seq":"ACAGTATGATCAGATA"},{"name":"123","seq":"CTC"},{"name":"124","seq":"CTT"},{"name":"125","seq":"TCT"},{"name":"126","seq":"CAA"},{"name":"127","seq":"ATAGAAAT"},{"name":"128","seq":"C"},{"name":"129","seq":"T"},{"name":"130","seq":"TGTGGA"},{"name":"131","seq":"CATAAA"},{"name":"132","seq":"AAAAAG"},{"name":"133","seq":"AAAAGA"},{"name":"134","seq":"GCTATAGGTACAGT"},{"name":"135","seq":"ATTA"},{"name":"136","seq":"GTTG"},{"name":"137","seq":"CTTG"},{"name":"138","seq":"GTAGGACCTACACCTGT"},{"name":"139","seq":"C"},{"name":"140","seq":"T"},{"name":"141","seq":"AACATAATTGGAAG"},{"name":"142","seq":"AAATC"},{"name":"143","seq":"AAATA"},{"name":"144","seq":"AAACA"},{"name":"145","seq":"GAATA"},{"name":"146","seq":"TGTTGAC"},{"name":"147","seq":"T"},{"name":"148","seq":"C"},{"name":"149","seq":"A"},{"name":"150","seq":"CAGATTGG"},{"name":"151","seq":"TTGC"},{"name":"152","seq":"TTGT"},{"name":"153","seq":"CTGT"},{"name":"154","seq":"ACTTTAAATTT"},{"name":"155","seq":"TCCC"},{"name":"156","seq":"CCCA"},{"name":"157","seq":"TCCA"},{"name":"158","seq":"ATTAG"},{"name":"159","seq":"CCCT"},{"name":"160","seq":"TCCT"},{"name":"161","seq":"TCCC"},{"name":"162","seq":"ATTGA"},{"name":"163","seq":"G"},{"name":"164","seq":"A"},{"name":"165","seq":"ACTGTACCAGTAA"},{"name":"166","seq":"AATTA"},{"name":"167","seq":"AATTG"},{"name":"168","seq":"TGTTA"},{"name":"169","seq":"CATTG"},{"name":"170","seq":"AAGCCAGGAATGGATGG"},{"name":"171","seq":"C"},{"name":"172","seq":"T"},{"name":"173","seq":"G"},{"name":"174","seq":"CCAAA"},{"name":"175","seq":"A"},{"name":"176","seq":"G"},{"name":"177","seq":"GTTAAACAATGGCCA"},{"name":"178","seq":"T"},{"name":"179","seq":"C"},{"name":"180","seq":"TGACAG"},{"name":"181","seq":"A"},{"name":"182","seq":"C"},{"name":"183","seq":"AGAAAAAATAAAAGCATTA"},{"name":"184","seq":"GT"},{"name":"185","seq":"AC"},{"name":"186","seq":"AGAAATTTG"},{"name":"187","seq":"TACAGA"},{"name":"188","seq":"G"},{"name":"189","seq":"C"},{"name":"190","seq":"*"},{"name":"191","seq":"*"},{"name":"192","seq":"C"},{"name":"193","seq":"T"},{"name":"194","seq":"AGAGAG"},{"name":"195","seq":"TAATGAG"},{"name":"196","seq":"ATGGAAAAGGAAGG"},{"name":"197","seq":"G"},{"name":"198","seq":"A"},{"name":"199","seq":"AAAATTTCAA"},{"name":"200","seq":"AA"},{"name":"201","seq":"GG"},{"name":"202","seq":"ATTGGGCCTGA"},{"name":"203","seq":"A"},{"name":"204","seq":"G"},{"name":"205","seq":"AATCCATACAATACTCCA"},{"name":"206","seq":"G"},{"name":"207","seq":"A"},{"name":"208","seq":"TATTTGC"},{"name":"209","seq":"C"},{"name":"210","seq":"T"},{"name":"211","seq":"ATAAAGAAAAA"},{"name":"212","seq":"*"},{"name":"213","seq":"A"},{"name":"214","seq":"G"},{"name":"215","seq":"GACAG"},{"name":"216","seq":"T"},{"name":"217","seq":"C"},{"name":"218","seq":"*"},{"name":"219","seq":"AGATAGC"},{"name":"220","seq":"ACTAAATGGAG"},{"name":"221","seq":"AAAA"},{"name":"222","seq":"GAAA"},{"name":"223","seq":"AAAG"},{"name":"224","seq":"TTAGTAGATTT"},{"name":"225","seq":"*"},{"name":"226","seq":"C"},{"name":"227","seq":"T"},{"name":"228","seq":"AGAGAACT"},{"name":"229","seq":"T"},{"name":"230","seq":"C"},{"name":"231","seq":"*"},{"name":"232","seq":"*"},{"name":"233","seq":"CAGG"},{"name":"234","seq":"CAGA"},{"name":"235","seq":"TAGA"},{"name":"236","seq":"GAGCTC"},{"name":"237","seq":"AATAA"},{"name":"238","seq":"*"},{"name":"239","seq":"G"},{"name":"240","seq":"A"},{"name":"241","seq":"AGAACTCA"},{"name":"242","seq":"A"},{"name":"243","seq":"G"},{"name":"244","seq":"*"},{"name":"245","seq":"AAGAATTCAG"},{"name":"246","seq":"GACTT"},{"name":"247","seq":"C"},{"name":"248","seq":"T"},{"name":"249","seq":"TGGGAAGT"},{"name":"250","seq":"TCAA"},{"name":"251","seq":"CCAA"},{"name":"252","seq":"GCAA"},{"name":"253","seq":"TCAG"},{"name":"254","seq":"TTAGG"},{"name":"255","seq":"A"},{"name":"256","seq":"G"},{"name":"257","seq":"ATACC"},{"name":"258","seq":"A"},{"name":"259","seq":"G"},{"name":"260","seq":"R"},{"name":"261","seq":"CATCC"},{"name":"262","seq":"*"},{"name":"263","seq":"C"},{"name":"264","seq":"A"},{"name":"265","seq":"GCAGG"},{"name":"266","seq":"GT"},{"name":"267","seq":"TT"},{"name":"268","seq":"*"},{"name":"269","seq":"AGCGGG"},{"name":"270","seq":"CC"},{"name":"271","seq":"TT"},{"name":"272","seq":"*"},{"name":"273","seq":"TAAAAAAGAAAAAATCAGTAACAGTACT"},{"name":"274","seq":"GGAT"},{"name":"275","seq":"AGAT"},{"name":"276","seq":"GGAC"},{"name":"277","seq":"GTGGG"},{"name":"278","seq":"TGAT"},{"name":"279","seq":"GGAT"},{"name":"280","seq":"GGAC"},{"name":"281","seq":"GCATA"},{"name":"282","seq":"T"},{"name":"283","seq":"C"},{"name":"284","seq":"TTTTCAGT"},{"name":"285","seq":"TCCCTT"},{"name":"286","seq":"A"},{"name":"287","seq":"G"},{"name":"288","seq":"GATGAA"},{"name":"289","seq":"GACTTCAGG"},{"name":"290","seq":"AATTTTAGA"},{"name":"291","seq":"*"},{"name":"292","seq":"*"},{"name":"293","seq":"G"},{"name":"294","seq":"T"},{"name":"295","seq":"CCTTTA"},{"name":"296","seq":"G"},{"name":"297","seq":"T"},{"name":"298","seq":"ATGAA"},{"name":"299","seq":"AA"},{"name":"300","seq":"GG"},{"name":"301","seq":"CTTTAGA"},{"name":"302","seq":"TCCTTTACATGAGAGCTTCAGA"},{"name":"303","seq":"AAGTA"},{"name":"304","seq":"T"},{"name":"305","seq":"C"},{"name":"306","seq":"ACTGC"},{"name":"307","seq":"ATTT"},{"name":"308","seq":"ATTC"},{"name":"309","seq":"GTTC"},{"name":"310","seq":"ACCATACCTAGTA"},{"name":"311","seq":"T"},{"name":"312","seq":"C"},{"name":"313","seq":"AAACAATGA"},{"name":"314","seq":"G"},{"name":"315","seq":"A"},{"name":"316","seq":"ACACCAGG"},{"name":"317","seq":"GATTAGA"},{"name":"318","seq":"AATCAGG"},{"name":"319","seq":"TATCAGTACAATGTGCT"},{"name":"320","seq":"T"},{"name":"321","seq":"C"},{"name":"322","seq":"CCACA"},{"name":"323","seq":"G"},{"name":"324","seq":"A"},{"name":"325","seq":"GGATGGAAAGGATCACC"},{"name":"326","seq":"AG"},{"name":"327","seq":"AT"},{"name":"328","seq":"GG"},{"name":"329","seq":"CAATATT"},{"name":"330","seq":"*"},{"name":"331","seq":"CCAAAGT"},{"name":"332","seq":"TCAGGCT"},{"name":"333","seq":"*"},{"name":"334","seq":"CCAGAG"},{"name":"335","seq":"T"},{"name":"336","seq":"C"},{"name":"337","seq":"*"},{"name":"338","seq":"AGCATGACAAAA"},{"name":"339","seq":"ATCT"},{"name":"340","seq":"CTCT"},{"name":"341","seq":"ATCC"},{"name":"342","seq":"ATTT"},{"name":"343","seq":"TAGAGCC"},{"name":"344","seq":"TTTTAGAAAACAA"},{"name":"345","seq":"CTTTAGA"},{"name":"346","seq":"TCACAA"},{"name":"347","seq":"GCACAG"},{"name":"348","seq":"ACACAG"},{"name":"349","seq":"*"},{"name":"350","seq":"CTATAGAGCAAAA"},{"name":"351","seq":"AATCCAGA"},{"name":"352","seq":"*"},{"name":"353","seq":"C"},{"name":"354","seq":"A"},{"name":"355","seq":"ATAGTTAT"},{"name":"356","seq":"C"},{"name":"357","seq":"T"},{"name":"358","seq":"*"},{"name":"359","seq":"CATAATTATC"},{"name":"360","seq":"TATCAATA"},{"name":"361","seq":"CA"},{"name":"362","seq":"TA"},{"name":"363","seq":"CG"},{"name":"364","seq":"TGGATGA"},{"name":"365","seq":"T"},{"name":"366","seq":"C"},{"name":"367","seq":"TTGTATGTAGG"},{"name":"368","seq":"A"},{"name":"369","seq":"C"},{"name":"370","seq":"G"},{"name":"371","seq":"TCTGA"},{"name":"372","seq":"*"},{"name":"373","seq":"C"},{"name":"374","seq":"T"},{"name":"375","seq":"TTAGAAATAGGGCA"},{"name":"376","seq":"G"},{"name":"377","seq":"A"},{"name":"378","seq":"*"},{"name":"379","seq":"CCTAGAGATAGGACAG"},{"name":"380","seq":"*"},{"name":"381","seq":"TTTA"},{"name":"382","seq":"TTGG"},{"name":"383","seq":"GAAATAGAGCAG"},{"name":"384","seq":"CATAGA"},{"name":"385","seq":"A"},{"name":"386","seq":"G"},{"name":"387","seq":"CAAAAATAGA"},{"name":"388","seq":"GGAGCTGAGACAA"},{"name":"389","seq":"*"},{"name":"390","seq":"GG"},{"name":"391","seq":"GA"},{"name":"392","seq":"AGTTGAGAGCT"},{"name":"393","seq":"*"},{"name":"394","seq":"A"},{"name":"395","seq":"G"},{"name":"396","seq":"GAGTTAAGAGCT"},{"name":"397","seq":"CATCT"},{"name":"398","seq":"*"},{"name":"399","seq":"G"},{"name":"400","seq":"A"},{"name":"401","seq":"TTGAG"},{"name":"402","seq":"G"},{"name":"403","seq":"C"},{"name":"404","seq":"T"},{"name":"405","seq":"*"},{"name":"406","seq":"ATTAAGA"},{"name":"407","seq":"TGGGG"},{"name":"408","seq":"ACTTACCACA"},{"name":"409","seq":"*"},{"name":"410","seq":"G"},{"name":"411","seq":"A"},{"name":"412","seq":"TTTACTAC"},{"name":"413","seq":"A"},{"name":"414","seq":"C"},{"name":"415","seq":"*"},{"name":"416","seq":"CCAGACAAAAA"},{"name":"417","seq":"A"},{"name":"418","seq":"G"},{"name":"419","seq":"CATCAGAAAGAACC"},{"name":"420","seq":"T"},{"name":"421","seq":"G"},{"name":"422","seq":"CCATT"},{"name":"423","seq":"C"},{"name":"424","seq":"T"},{"name":"425","seq":"CTTTGGATGGG"},{"name":"426","seq":"T"},{"name":"427","seq":"A"},{"name":"428","seq":"TATGAACTCCATCCTGA"},{"name":"429","seq":"TAAA"},{"name":"430","seq":"CAAA"},{"name":"431","seq":"CAAG"},{"name":"432","seq":"TGGACAGT"},{"name":"433","seq":"A"},{"name":"434","seq":"C"},{"name":"435","seq":"CAGCCTATA"},{"name":"436","seq":"*"},{"name":"437","seq":"GTGCTG"},{"name":"438","seq":"CAGCTA"},{"name":"439","seq":"CAGCTG"},{"name":"440","seq":"CCAGAAAA"},{"name":"441","seq":"A"},{"name":"442","seq":"G"},{"name":"443","seq":"GACAG"},{"name":"444","seq":"C"},{"name":"445","seq":"T"},{"name":"446","seq":"*"},{"name":"447","seq":"GTGCTGCCAAATAAGGAGAGC"},{"name":"448","seq":"AATCTGCCAGAGAAGGAAAGC"},{"name":"449","seq":"TGGACTGTCAATGA"},{"name":"450","seq":"C"},{"name":"451","seq":"T"},{"name":"452","seq":"ATACAGAA"},{"name":"453","seq":"G"},{"name":"454","seq":"A"},{"name":"455","seq":"TTAGTGGG"},{"name":"456","seq":"GAAATTG"},{"name":"457","seq":"AAAACTA"},{"name":"458","seq":"AATTGGGCAAGTCA"},{"name":"459","seq":"G"},{"name":"460","seq":"A"},{"name":"461","seq":"ATTTA"},{"name":"462","seq":"CC"},{"name":"463","seq":"TG"},{"name":"464","seq":"TC"},{"name":"465","seq":"CAGGGATTAAA"},{"name":"466","seq":"GTAAGGCAATTATGTAAACTCCTTAGAGGAA"},{"name":"467","seq":"GTAAAGCAACTATGCAGACTCCTCAGGGGAA"},{"name":"468","seq":"*"},{"name":"469","seq":"RTAAAA"},{"name":"470","seq":"GTAAAG"},{"name":"471","seq":"GTAAGG"},{"name":"472","seq":"CAACTGTGTAAACT"},{"name":"473","seq":"C"},{"name":"474","seq":"A"},{"name":"475","seq":"CTCAGGGGAG"},{"name":"476","seq":"CCAAAGCA"},{"name":"477","seq":"C"},{"name":"478","seq":"T"},{"name":"479","seq":"TAACAGA"},{"name":"480","seq":"AGTAATACCACTAACAGAA"},{"name":"481","seq":"*"},{"name":"482","seq":"TG"},{"name":"483","seq":"TA"},{"name":"484","seq":"TAGTA"},{"name":"485","seq":"A"},{"name":"486","seq":"C"},{"name":"487","seq":"CACTGACTGAG"},{"name":"488","seq":"GAAGCAGA"},{"name":"489","seq":"GC"},{"name":"490","seq":"AT"},{"name":"491","seq":"TAGAA"},{"name":"492","seq":"CTG"},{"name":"493","seq":"TTA"},{"name":"494","seq":"TTG"},{"name":"495","seq":"GCAGA"},{"name":"496","seq":"*"},{"name":"497","seq":"A"},{"name":"498","seq":"G"},{"name":"499","seq":"AACAG"},{"name":"500","seq":"A"},{"name":"501","seq":"G"},{"name":"502","seq":"*"},{"name":"503","seq":"GAATAGG"},{"name":"504","seq":"GAGATTCTAAAA"},{"name":"505","seq":"GAACCAGT"},{"name":"506","seq":"A"},{"name":"507","seq":"G"},{"name":"508","seq":"*"},{"name":"509","seq":"*"},{"name":"510","seq":"G"},{"name":"511","seq":"A"},{"name":"512","seq":"ACCCT"},{"name":"513","seq":"ATG"},{"name":"514","seq":"GTG"},{"name":"515","seq":"*"},{"name":"516","seq":"CATGG"},{"name":"517","seq":"AGTGTAT"},{"name":"518","seq":"*"},{"name":"519","seq":"A"},{"name":"520","seq":"G"},{"name":"521","seq":"GTATA"},{"name":"522","seq":"T"},{"name":"523","seq":"C"},{"name":"524","seq":"*"},{"name":"525","seq":"AGTCTAT"},{"name":"526","seq":"TATGA"},{"name":"527","seq":"C"},{"name":"528","seq":"T"},{"name":"529","seq":"CCATCAAAAGA"},{"name":"530","seq":"CTTAA"},{"name":"531","seq":"CTTAG"},{"name":"532","seq":"ATTAA"},{"name":"533","seq":"ATTAG"},{"name":"534","seq":"TAGCAGAAATACAGAA"},{"name":"535","seq":"GCAGGGGCAAGGC"},{"name":"536","seq":"ACAAGGGC"},{"name":"537","seq":"AGGAC"},{"name":"538","seq":"AAGAC"},{"name":"539","seq":"CAGAT"},{"name":"540","seq":"*"},{"name":"541","seq":"ACAAGAACACGGC"},{"name":"542","seq":"CAATGGACATA"},{"name":"543","seq":"T"},{"name":"544","seq":"C"},{"name":"545","seq":"CAAATTTATCAAGA"},{"name":"546","seq":"G"},{"name":"547","seq":"A"},{"name":"548","seq":"CCATTTAAAAAT"},{"name":"549","seq":"CTGAAA"},{"name":"550","seq":"CTAAAG"},{"name":"551","seq":"CTAAAA"},{"name":"552","seq":"TTAAAA"},{"name":"553","seq":"ACAGGAAAATATG"},{"name":"554","seq":"CAAGAATGAGGGGTGCCCAC"},{"name":"555","seq":"*"},{"name":"556","seq":"C"},{"name":"557","seq":"G"},{"name":"558","seq":"AAGAA"},{"name":"559","seq":"*"},{"name":"560","seq":"AGAGA"},{"name":"561","seq":"GGAGG"},{"name":"562","seq":"*"},{"name":"563","seq":"AGAGG"},{"name":"564","seq":"TCTGCTCA"},{"name":"565","seq":"T"},{"name":"566","seq":"C"},{"name":"567","seq":"*"},{"name":"568","seq":"CAAAAAAGGGGTCTGCTCAC"},{"name":"569","seq":"ACTAATGATGTAA"},{"name":"570","seq":"*"},{"name":"571","seq":"AA"},{"name":"572","seq":"GG"},{"name":"573","seq":"CAATTAACAG"},{"name":"574","seq":"AGGCA"},{"name":"575","seq":"CAGTG"},{"name":"576","seq":"*"},{"name":"577","seq":"GACAGTTAGTAGAAGTA"},{"name":"578","seq":"GACAATTAG"},{"name":"579","seq":"C"},{"name":"580","seq":"T"},{"name":"581","seq":"AGAAGTG"},{"name":"582","seq":"GTGCAAAA"},{"name":"583","seq":"*"},{"name":"584","seq":"AATAA"},{"name":"585","seq":"GGTGA"},{"name":"586","seq":"AGTAG"},{"name":"587","seq":"CCACAGAAA"},{"name":"588","seq":"AGTGGTCATGGAAA"},{"name":"589","seq":"AGTGGGCACAGAAG"},{"name":"590","seq":"GCATAGTAATATGGGGAAA"},{"name":"591","seq":"GACT"},{"name":"592","seq":"AACT"},{"name":"593","seq":"GACC"},{"name":"594","seq":"CCTAAATT"},{"name":"595","seq":"TAAACT"},{"name":"596","seq":"G"},{"name":"597","seq":"A"},{"name":"598","seq":"*"},{"name":"599","seq":"*"},{"name":"600","seq":"TAAATTA"},{"name":"601","seq":"CAGACTA"},{"name":"602","seq":"*"},{"name":"603","seq":"CCCATACAAA"},{"name":"604","seq":"AG"},{"name":"605","seq":"AA"},{"name":"606","seq":"GA"},{"name":"607","seq":"GAAACATGGGA"},{"name":"608","seq":"AA"},{"name":"609","seq":"CA"},{"name":"610","seq":"AG"},{"name":"611","seq":"CATGGTGG"},{"name":"612","seq":"ACAGAGT"},{"name":"613","seq":"GCGGAGT"},{"name":"614","seq":"ATGGA"},{"name":"615","seq":"CT"},{"name":"616","seq":"GC"},{"name":"617","seq":"GT"},{"name":"618","seq":"*"},{"name":"619","seq":"ATTGGCA"},{"name":"620","seq":"AGCC"},{"name":"621","seq":"GGCT"},{"name":"622","seq":"ACCTGGAT"},{"name":"623","seq":"T"},{"name":"624","seq":"C"},{"name":"625","seq":"CCTGA"},{"name":"626","seq":"G"},{"name":"627","seq":"A"},{"name":"628","seq":"C"},{"name":"629","seq":"TGGGAGTTTGT"},{"name":"630","seq":"T"},{"name":"631","seq":"C"},{"name":"632","seq":"AATACCCC"},{"name":"633","seq":"TCCCTTAGTG"},{"name":"634","seq":"*"},{"name":"635","seq":"CCCT"},{"name":"636","seq":"TCCT"},{"name":"637","seq":"TCCC"},{"name":"638","seq":"CTAGTA"},{"name":"639","seq":"AAATTATGGTACCAGTTAGA"},{"name":"640","seq":"G"},{"name":"641","seq":"A"},{"name":"642","seq":"AAAGA"},{"name":"643","seq":"A"},{"name":"644","seq":"C"},{"name":"645","seq":"CCCATA"},{"name":"646","seq":"GTA"},{"name":"647","seq":"GYA"},{"name":"648","seq":"ATG"},{"name":"649","seq":"ATA"},{"name":"650","seq":"GGAGCAGA"},{"name":"651","seq":"AACC"},{"name":"652","seq":"GACT"},{"name":"653","seq":"TTCTATGTAGATGG"},{"name":"654","seq":"G"},{"name":"655","seq":"T"},{"name":"656","seq":"GCAGC"},{"name":"657","seq":"TAACAG"},{"name":"658","seq":"GGAG"},{"name":"659","seq":"AGAG"},{"name":"660","seq":"*"},{"name":"661","seq":"*"},{"name":"662","seq":"T"},{"name":"663","seq":"C"},{"name":"664","seq":"AATAGGGA"},{"name":"665","seq":"G"},{"name":"666","seq":"A"},{"name":"667","seq":"*"},{"name":"668","seq":"ACTAA"},{"name":"669","seq":"*"},{"name":"670","seq":"AT"},{"name":"671","seq":"AC"},{"name":"672","seq":"TAGGA"},{"name":"673","seq":"GCTAGGG"},{"name":"674","seq":"AATGGGA"},{"name":"675","seq":"AAAGCAGG"},{"name":"676","seq":"ATATGTTACTAATAGA"},{"name":"677","seq":"*"},{"name":"678","seq":"GTATG"},{"name":"679","seq":"ATATA"},{"name":"680","seq":"GTATA"},{"name":"681","seq":"TCACTGACA"},{"name":"682","seq":"GA"},{"name":"683","seq":"GG"},{"name":"684","seq":"AA"},{"name":"685","seq":"*"},{"name":"686","seq":"GGAAG"},{"name":"687","seq":"A"},{"name":"688","seq":"G"},{"name":"689","seq":"CAAAA"},{"name":"690","seq":"*"},{"name":"691","seq":"A"},{"name":"692","seq":"G"},{"name":"693","seq":"GTTGT"},{"name":"694","seq":"CA"},{"name":"695","seq":"TT"},{"name":"696","seq":"*"},{"name":"697","seq":"GGTTATTT"},{"name":"698","seq":"CCCTA"},{"name":"699","seq":"ACTGAC"},{"name":"700","seq":"ACTGAG"},{"name":"701","seq":"GCTGAG"},{"name":"702","seq":"ACAACAAA"},{"name":"703","seq":"TCAGAAGACTGAGTTACAA"},{"name":"704","seq":"*"},{"name":"705","seq":"T"},{"name":"706","seq":"C"},{"name":"707","seq":"CAAAAG"},{"name":"708","seq":"ACTA"},{"name":"709","seq":"GCTG"},{"name":"710","seq":"ACTG"},{"name":"711","seq":"AATTACAT"},{"name":"712","seq":"TCAAAAGACTGAACTGCAT"},{"name":"713","seq":"GCAAT"},{"name":"714","seq":"TTAT"},{"name":"715","seq":"CAAT"},{"name":"716","seq":"CTAT"},{"name":"717","seq":"CCAG"},{"name":"718","seq":"CCAT"},{"name":"719","seq":"CTAGC"},{"name":"720","seq":"TTTG"},{"name":"721","seq":"CTTG"},{"name":"722","seq":"TTTA"},{"name":"723","seq":"CAGGA"},{"name":"724","seq":"*"},{"name":"725","seq":"TTCG"},{"name":"726","seq":"TTCA"},{"name":"727","seq":"GGATTAG"},{"name":"728","seq":"*"},{"name":"729","seq":"C"},{"name":"730","seq":"T"},{"name":"731","seq":"TCAGGATCA"},{"name":"732","seq":"A"},{"name":"733","seq":"G"},{"name":"734","seq":"*"},{"name":"735","seq":"AAGTAAA"},{"name":"736","seq":"C"},{"name":"737","seq":"T"},{"name":"738","seq":"ATAGTAACAGA"},{"name":"739","seq":"C"},{"name":"740","seq":"T"},{"name":"741","seq":"TCACA"},{"name":"742","seq":"A"},{"name":"743","seq":"G"},{"name":"744","seq":"R"},{"name":"745","seq":"TATGCATTAGGAATCATTCA"},{"name":"746","seq":"A"},{"name":"747","seq":"G"},{"name":"748","seq":"GCACAACCAGA"},{"name":"749","seq":"TCAA"},{"name":"750","seq":"CAAG"},{"name":"751","seq":"CAGA"},{"name":"752","seq":"CAGG"},{"name":"753","seq":"AGTGA"},{"name":"754","seq":"*"},{"name":"755","seq":"A"},{"name":"756","seq":"G"},{"name":"757","seq":"TCAGA"},{"name":"758","seq":"GT"},{"name":"759","seq":"GA"},{"name":"760","seq":"AC"},{"name":"761","seq":"TAGTCAATCAA"},{"name":"762","seq":"ATCAAAATTAGTTAACCAA"},{"name":"763","seq":"ATCAGAATTAGTTAATCAG"},{"name":"764","seq":"ATAATA"},{"name":"765","seq":"*"},{"name":"766","seq":"GAGCAGT"},{"name":"767","seq":"*"},{"name":"768","seq":"GAGAAAC"},{"name":"769","seq":"GAGGAGC"},{"name":"770","seq":"*"},{"name":"771","seq":"*"},{"name":"772","seq":"AAGAAGC"},{"name":"773","seq":"GAAAAAC"},{"name":"774","seq":"TAATA"},{"name":"775","seq":"AAAAAGGAAAAGGTCTATCTGG"},{"name":"776","seq":"*"},{"name":"777","seq":"AAAAA"},{"name":"778","seq":"AGAG"},{"name":"779","seq":"GGAA"},{"name":"780","seq":"*"},{"name":"781","seq":"GGAAAAGAC"},{"name":"782","seq":"AAAGTCTACCTGT"},{"name":"783","seq":"GAAAAGGAAAAGATCTACCTAT"},{"name":"784","seq":"CATGGGTACCAGCACACAA"},{"name":"785","seq":"AGGA"},{"name":"786","seq":"GGGA"},{"name":"787","seq":"GGGG"},{"name":"788","seq":"ATTGGAGGAAATGAACA"},{"name":"789","seq":"A"},{"name":"790","seq":"G"},{"name":"791","seq":"GTAGA"},{"name":"792","seq":"T"},{"name":"793","seq":"C"},{"name":"794","seq":"AAATTAGT"},{"name":"795","seq":"*"},{"name":"796","seq":"CAGTGCT"},{"name":"797","seq":"*"},{"name":"798","seq":"TAGCTCT"},{"name":"799","seq":"CAGTAAG"},{"name":"800","seq":"*"},{"name":"801","seq":"GGAATCAGGA"},{"name":"802","seq":"AAGTAC"},{"name":"803","seq":"GGGTAT"},{"name":"804","seq":"GGGTGC"},{"name":"805","seq":"*"},{"name":"806","seq":"CAGCTCTAGAATCAGGAAGGTGC"},{"name":"807","seq":"TAGTTCTGGAATTAGGAAGGTGT"},{"name":"808","seq":"TATTT"},{"name":"809","seq":"T"},{"name":"810","seq":"C"},{"name":"811","seq":"TAGATG"},{"name":"812","seq":"GA"},{"name":"813","seq":"AA"},{"name":"814","seq":"GG"},{"name":"815","seq":"ATAGATAAGGC"},{"name":"816","seq":"C"},{"name":"817","seq":"T"},{"name":"818","seq":"CAAGA"},{"name":"819","seq":"TGAACATGAGAA"},{"name":"820","seq":"AAAACATAAAAG"},{"name":"821","seq":"*"},{"name":"822","seq":"AGAT"},{"name":"823","seq":"AGAC"},{"name":"824","seq":"AGAA"},{"name":"825","seq":"CATGAAAG"},{"name":"826","seq":"ATATCACAG"},{"name":"827","seq":"*"},{"name":"828","seq":"TAAT"},{"name":"829","seq":"CAAT"},{"name":"830","seq":"CAAC"},{"name":"831","seq":"TGGAGA"},{"name":"832","seq":"G"},{"name":"833","seq":"A"},{"name":"834","seq":"*"},{"name":"835","seq":"CAATAAAAAAA"},{"name":"836","seq":"CAATGG"},{"name":"837","seq":"*"},{"name":"838","seq":"CT"},{"name":"839","seq":"TC"},{"name":"840","seq":"AGTGATTTT"},{"name":"841","seq":"AACCTG"},{"name":"842","seq":"AATCTG"},{"name":"843","seq":"CATCTG"},{"name":"844","seq":"*"},{"name":"845","seq":"TTAATAAGTTTAATTTA"},{"name":"846","seq":"CCACCT"},{"name":"847","seq":"GTAG"},{"name":"848","seq":"GTGG"},{"name":"849","seq":"ATAA"},{"name":"850","seq":"ATAG"},{"name":"851","seq":"TAGCAAA"},{"name":"852","seq":"A"},{"name":"853","seq":"G"},{"name":"854","seq":"GAAATAGT"},{"name":"855","seq":"AGCCAG"},{"name":"856","seq":"AGCCAA"},{"name":"857","seq":"AGCCTG"},{"name":"858","seq":"GGCCAG"},{"name":"859","seq":"CTGTGATAAATG"},{"name":"860","seq":"*"},{"name":"861","seq":"TCAGC"},{"name":"862","seq":"TCAAC"},{"name":"863","seq":"*"},{"name":"864","seq":"CCAAC"},{"name":"865","seq":"CCAAT"},{"name":"866","seq":"TAAAAGG"},{"name":"867","seq":"AGAA"},{"name":"868","seq":"GGAA"},{"name":"869","seq":"GGAG"},{"name":"870","seq":"GCCATGCATGGACAAGTAGACTG"},{"name":"871","seq":"T"},{"name":"872","seq":"C"},{"name":"873","seq":"AGTCCAGG"},{"name":"874","seq":"A"},{"name":"875","seq":"G"},{"name":"876","seq":"ATATGGCAA"},{"name":"877","seq":"*"},{"name":"878","seq":"C"},{"name":"879","seq":"T"},{"name":"880","seq":"TAGATTGTAC"},{"name":"881","seq":"ACATTTA"},{"name":"882","seq":"CCATCTA"},{"name":"883","seq":"*"},{"name":"884","seq":"TTAGACTGCACACACTTA"},{"name":"885","seq":"*"},{"name":"886","seq":"TTA"},{"name":"887","seq":"TTG"},{"name":"888","seq":"GATTGCACACATCT"},{"name":"889","seq":"G"},{"name":"890","seq":"A"},{"name":"891","seq":"*"},{"name":"892","seq":"GAAGGAAAAGT"},{"name":"893","seq":"*"},{"name":"894","seq":"*"},{"name":"895","seq":"TATCCTG"},{"name":"896","seq":"AATTCTG"},{"name":"897","seq":"*"},{"name":"898","seq":"AATTATA"},{"name":"899","seq":"*"},{"name":"900","seq":"AATCATA"},{"name":"901","seq":"GATCTTA"},{"name":"902","seq":"GTAGCAGT"},{"name":"903","seq":"T"},{"name":"904","seq":"C"},{"name":"905","seq":"A"},{"name":"906","seq":"CATGT"},{"name":"907","seq":"A"},{"name":"908","seq":"G"},{"name":"909","seq":"GCCAGTGG"},{"name":"910","seq":"A"},{"name":"911","seq":"C"},{"name":"912","seq":"T"},{"name":"913","seq":"TATATAGAAGCAGAAGTTAT"},{"name":"914","seq":"T"},{"name":"915","seq":"C"},{"name":"916","seq":"CCAGCAGAAACAGG"},{"name":"917","seq":"*"},{"name":"918","seq":"G"},{"name":"919","seq":"A"},{"name":"920","seq":"CAGGA"},{"name":"921","seq":"A"},{"name":"922","seq":"G"},{"name":"923","seq":"*"},{"name":"924","seq":"ACAAGAG"},{"name":"925","seq":"ACAGCATA"},{"name":"926","seq":"*"},{"name":"927","seq":"TTTTCTTT"},{"name":"928","seq":"CTTTATAC"},{"name":"929","seq":"TAAAA"},{"name":"930","seq":"CTTTCTGCTAAA"},{"name":"931","seq":"A"},{"name":"932","seq":"G"},{"name":"933","seq":"*"},{"name":"934","seq":"TTAGCAGGAAGATGGCCAGTAA"},{"name":"935","seq":"AAACAATACATACTGAC"},{"name":"936","seq":"AAGTAGT"},{"name":"937","seq":"A"},{"name":"938","seq":"G"},{"name":"939","seq":"CACACAGA"},{"name":"940","seq":"T"},{"name":"941","seq":"C"},{"name":"942","seq":"*"},{"name":"943","seq":"*"},{"name":"944","seq":"A"},{"name":"945","seq":"G"},{"name":"946","seq":"AGTAATACACACAGA"},{"name":"947","seq":"T"},{"name":"948","seq":"C"},{"name":"949","seq":"*"},{"name":"950","seq":"AATGG"},{"name":"951","seq":"C"},{"name":"952","seq":"T"},{"name":"953","seq":"AGCAA"},{"name":"954","seq":"T"},{"name":"955","seq":"C"},{"name":"956","seq":"TTCACC"},{"name":"957","seq":"GGTGCTACGGTTAGGGCC"},{"name":"958","seq":"*"},{"name":"959","seq":"AGC"},{"name":"960","seq":"AGT"},{"name":"961","seq":"GCTGCAGTTAAAGCA"},{"name":"962","seq":"GCCTGTTGGTGGGC"},{"name":"963","seq":"*"},{"name":"964","seq":"GGGAATCAAG"},{"name":"965","seq":"AAATGTCCAA"},{"name":"966","seq":"*"},{"name":"967","seq":"*"},{"name":"968","seq":"A"},{"name":"969","seq":"C"},{"name":"970","seq":"AATATCCAA"},{"name":"971","seq":"CAGGAATTTGG"},{"name":"972","seq":"A"},{"name":"973","seq":"G"},{"name":"974","seq":"ATTCC"},{"name":"975","seq":"C"},{"name":"976","seq":"T"},{"name":"977","seq":"TACAATCCCCA"},{"name":"978","seq":"A"},{"name":"979","seq":"R"},{"name":"980","seq":"AGTCAAGGAGT"},{"name":"981","seq":"AGTA"},{"name":"982","seq":"AGTG"},{"name":"983","seq":"GGTA"},{"name":"984","seq":"GAATCTATGAATAA"},{"name":"985","seq":"AGAA"},{"name":"986","seq":"GGAG"},{"name":"987","seq":"GGAA"},{"name":"988","seq":"TTAAAGAAAAT"},{"name":"989","seq":"T"},{"name":"990","seq":"C"},{"name":"991","seq":"A"},{"name":"992","seq":"ATAGG"},{"name":"993","seq":"ACAG"},{"name":"994","seq":"GCAG"},{"name":"995","seq":"ACAA"},{"name":"996","seq":"GCAA"},{"name":"997","seq":"GTAAGAGA"},{"name":"998","seq":"TCAG"},{"name":"999","seq":"GCAA"},{"name":"1000","seq":"ACAA"},{"name":"1001","seq":"GCTGAACA"},{"name":"1002","seq":"T"},{"name":"1003","seq":"C"},{"name":"1004","seq":"CTTAA"},{"name":"1005","seq":"G"},{"name":"1006","seq":"A"},{"name":"1007","seq":"ACAGCAGTACAAATGGCAGTATTCAT"},{"name":"1008","seq":"C"},{"name":"1009","seq":"T"},{"name":"1010","seq":"CACAATTTTAAAAGAAAAGGGGGGATTGG"},{"name":"1011","seq":"G"},{"name":"1012","seq":"R"},{"name":"1013","seq":"GGGTACAGTGCAGGGGAAAGAATA"},{"name":"1014","seq":"G"},{"name":"1015","seq":"A"},{"name":"1016","seq":"TAGACATAATAGCAACAGA"},{"name":"1017","seq":"C"},{"name":"1018","seq":"T"},{"name":"1019","seq":"ATACAAACTAAAGAATTACAAA"},{"name":"1020","seq":"AACAA"},{"name":"1021","seq":"AACAC"},{"name":"1022","seq":"AACAT"},{"name":"1023","seq":"GACAA"},{"name":"1024","seq":"ATTACAAAAATTCAAAATTTTCGGGT"},{"name":"1025","seq":"T"},{"name":"1026","seq":"C"},{"name":"1027","seq":"TATTACAGGGACAGCAGA"},{"name":"1028","seq":"AATCCAC"},{"name":"1029","seq":"GACCCAA"},{"name":"1030","seq":"TTTGGAAAGGACCAGCAAA"},{"name":"1031","seq":"GCTC"},{"name":"1032","seq":"ACTC"},{"name":"1033","seq":"ACTA"},{"name":"1034","seq":"CTCTGGAAAGGTGAAGGGGCAGTAGTAATACA"},{"name":"1035","seq":"*"},{"name":"1036","seq":"AGAT"},{"name":"1037","seq":"GGAC"},{"name":"1038","seq":"AATAGTGA"},{"name":"1039","seq":"C"},{"name":"1040","seq":"Y"},{"name":"1041","seq":"T"},{"name":"1042","seq":"*"},{"name":"1043","seq":"GGACAATACTGAC"},{"name":"1044","seq":"ATAAA"},{"name":"1045","seq":"A"},{"name":"1046","seq":"G"},{"name":"1047","seq":"GTAGT"},{"name":"1048","seq":"G"},{"name":"1049","seq":"A"},{"name":"1050","seq":"CCAAGAAGAAA"},{"name":"1051","seq":"AGCAAAGAT"},{"name":"1052","seq":"C"},{"name":"1053","seq":"Y"},{"name":"1054","seq":"*"},{"name":"1055","seq":"GGCTAAAATC"},{"name":"1056","seq":"ATTAG"},{"name":"1057","seq":"GGAT"},{"name":"1058","seq":"GGAC"},{"name":"1059","seq":"AGAT"},{"name":"1060","seq":"TATGGAAAACAGATGGCAGGTGATGATTGTGTGGCA"},{"name":"1061","seq":"A"},{"name":"1062","seq":"G"},{"name":"1063","seq":"GTAGACAGGATGA"},{"name":"1064","seq":"G"},{"name":"1065","seq":"A"},{"name":"1066","seq":"GATTAG"}],"paths":[{"id":0,"name":"B.FR.83.HXB2_LAI_IIIB_BRU.K03455","sequence":["0","1","5","6","9","10","12","13","16","17","26","27","30","31","49","50","51","53","54","56","65","66","68","69","74","75","87","88","91","92","94","95","96","101","106","107","109","110","112","113","115","116","117","119","122","123","127","128","130","131","134","135","138","139","141","142","146","147","150","151","154","155","158","159","162","163","165","166","170","171","174","175","177","178","180","181","183","184","186","187","188","190","196","197","199","200","202","203","205","206","208","209","211","212","213","215","216","218","220","221","224","225","226","228","229","231","237","238","239","241","242","244","246","247","249","250","254","255","257","258","261","262","263","265","266","268","273","274","277","278","281","282","284","285","286","288","289","291","303","304","306","307","310","311","313","314","316","317","319","320","322","323","325","326","329","330","331","333","338","339","343","344","351","352","353","355","356","358","360","361","364","365","367","368","371","372","373","375","376","378","384","385","387","388","397","398","399","401","402","405","407","408","416","417","419","420","422","423","425","426","428","429","432","433","435","436","437","440","441","443","444","446","449","450","452","453","455","456","458","459","461","462","465","466","476","477","479","480","488","489","491","492","495","496","497","499","500","502","504","505","506","508","516","517","526","527","529","530","534","535","542","543","545","546","548","549","553","554","569","570","571","573","574","576","582","583","584","587","590","591","594","595","596","598","603","604","607","608","611","612","619","620","622","623","625","626","629","630","632","633","639","640","642","643","645","646","650","651","653","654","656","657","658","660","668","669","670","672","675","676","686","687","689","690","691","693","694","696","698","699","702","703","713","714","719","720","723","724","725","727","735","736","738","739","741","742","745","746","748","749","753","754","755","757","758","761","764","765","766","771","774","775","784","785","788","789","791","792","794","795","796","801","802","805","808","809","811","812","815","816","818","819","826","827","828","831","832","834","836","837","838","840","841","844","846","847","851","852","854","855","859","860","861","863","866","867","870","871","873","874","876","877","878","880","881","883","892","893","894","895","897","899","902","903","906","907","909","910","913","914","916","917","918","920","921","923","925","926","927","929","934","935","950","951","953","954","956","957","962","963","964","966","971","972","974","975","977","978","980","981","984","985","988","989","992","993","997","998","1001","1002","1004","1005","1007","1008","1010","1011","1013","1014","1016","1017","1019","1020","1024","1025","1027","1028","1030","1031","1034","1035","1036","1038","1039","1042","1044","1045","1047","1048","1050","1051","1052","1054","1056","1057","1060","1061","1063","1064","1066"]},{"id":1,"name":"A.IT.00.IT070.DQ445119","sequence":["0","2","5","7","9","10","12","13","16","18","26","28","30","32","33","34","36","38","39","41","42","43","45","47","49","57","58","60","61","63","65","67","68","70","74","76","77","79","87","89","91","92","94","95","97","98","100","101","106","108","109","110","112","113","115","116","118","119","122","124","127","129","130","132","134","136","138","139","141","143","146","147","150","152","154","156","158","160","162","164","165","167","170","172","174","176","177","178","180","181","183","185","186","191","192","194","196","198","199","201","202","203","205","206","208","210","211","212","214","215","217","218","220","222","224","232","233","236","237","245","246","247","249","251","254","255","257","259","261","262","264","265","267","268","273","275","277","279","281","282","284","285","287","288","290","291","303","305","306","308","310","311","313","314","316","318","319","320","322","323","325","327","329","334","335","337","338","340","343","345","346","349","351","352","354","355","356","358","360","362","364","365","367","369","371","379","384","385","387","389","390","392","397","406","407","409","410","412","413","415","416","418","419","420","422","424","425","427","428","430","432","434","435","447","449","451","452","454","455","457","458","459","461","463","465","467","476","477","479","481","482","484","485","487","488","490","491","493","495","496","498","499","501","502","504","509","510","512","513","515","516","518","519","521","522","524","526","527","529","531","534","536","537","540","542","543","545","546","548","550","553","555","556","558","559","560","562","564","565","567","569","577","582","583","585","587","590","591","594","595","597","598","603","605","607","608","611","613","619","621","622","624","625","627","629","631","632","634","635","638","639","641","642","644","645","647","650","652","653","654","656","661","662","664","665","667","668","669","671","672","675","677","678","681","682","685","686","687","689","690","692","693","695","696","698","700","702","704","705","707","708","711","713","715","719","721","723","728","729","731","732","734","735","736","738","739","741","743","745","747","748","750","753","762","764","772","774","776","777","778","780","782","784","786","788","790","791","793","794","806","808","809","811","813","815","817","818","820","826","835","836","845","846","848","851","852","854","856","859","864","866","868","870","871","873","875","876","884","892","900","902","904","906","907","909","911","913","915","916","917","919","920","922","923","925","930","931","933","934","936","937","939","940","942","950","952","953","955","956","958","959","961","962","967","968","970","971","972","974","975","977","979","980","981","984","986","988","990","992","994","997","999","1001","1002","1004","1005","1007","1009","1010","1011","1013","1014","1016","1018","1019","1021","1024","1026","1027","1029","1030","1032","1034","1035","1037","1038","1040","1042","1044","1046","1047","1049","1050","1051","1053","1054","1056","1058","1060","1062","1063","1064","1066"]},{"id":2,"name":"A1.AU.04.PS1044_Day177.DQ676873","sequence":["0","2","5","8","9","11","12","14","16","19","20","22","23","25","26","27","30","32","37","38","40","41","42","44","45","47","49","64","65","67","68","71","74","76","78","79","87","88","91","93","94","102","103","105","106","108","109","111","112","114","115","120","122","125","127","129","130","133","134","135","138","139","141","144","146","148","150","153","154","156","158","160","162","163","165","166","170","173","174","176","177","179","180","182","183","185","186","187","189","190","196","198","199","200","202","203","205","207","208","210","211","212","213","215","217","218","220","223","224","232","234","236","237","238","240","241","242","244","246","248","249","252","254","256","257","260","261","269","270","272","273","275","277","280","281","282","284","292","293","295","296","298","299","301","303","304","306","309","310","312","313","314","316","318","319","320","322","324","325","326","329","334","335","337","338","341","343","350","351","359","360","361","364","366","367","368","371","372","374","375","377","378","384","386","387","393","394","396","397","398","400","401","403","405","407","409","411","412","414","415","416","417","419","421","422","424","425","427","428","431","432","434","435","448","449","451","452","454","455","457","458","460","461","463","465","468","469","472","473","475","476","477","479","481","482","484","485","487","488","490","491","494","495","496","498","499","501","502","504","505","507","508","516","518","519","521","523","524","526","527","529","532","534","536","538","540","542","544","545","546","548","551","553","555","556","558","563","564","566","567","569","578","579","581","582","588","590","591","594","599","600","602","603","605","607","609","611","614","615","618","619","621","622","624","625","627","629","631","632","634","636","638","639","640","642","644","645","646","650","652","653","654","656","661","663","664","666","667","668","673","675","677","678","681","683","685","686","687","689","697","698","700","702","712","713","716","719","721","723","728","730","731","733","734","735","736","738","739","741","744","745","747","748","751","753","763","764","765","767","768","770","771","774","776","781","782","784","787","788","789","791","792","794","795","797","798","800","801","803","805","808","809","811","814","815","817","818","821","822","825","826","827","828","831","833","834","836","837","838","840","842","844","846","849","851","852","854","857","859","865","866","868","870","871","873","875","876","885","886","888","889","891","892","893","894","896","897","899","902","905","906","907","909","911","913","915","916","917","919","920","922","923","925","930","931","933","934","936","938","939","941","942","950","951","953","954","956","958","959","961","962","967","968","970","971","973","974","975","977","978","980","982","984","987","988","990","992","995","997","1000","1001","1003","1004","1006","1007","1009","1010","1012","1013","1015","1016","1017","1019","1022","1024","1025","1027","1029","1030","1033","1034","1043","1044","1046","1047","1049","1050","1051","1052","1054","1056","1057","1060","1062","1063","1064","1066"]},{"id":3,"name":"A1.CD.02.LA01AlPr.KU168256","sequence":["0","3","5","7","9","11","12","15","16","19","21","22","23","25","26","27","30","32","33","35","36","38","39","41","46","47","49","50","52","53","55","56","65","67","68","72","74","80","81","83","84","86","87","89","91","92","94","102","104","105","106","108","109","110","112","113","115","121","122","126","127","129","130","132","134","137","138","139","141","145","146","149","150","152","154","157","158","160","162","163","165","168","170","171","174","176","177","178","180","181","183","185","186","191","193","194","196","198","199","200","202","204","205","206","208","210","211","212","213","215","216","218","220","221","224","232","235","236","237","238","240","241","243","244","246","247","249","251","254","255","257","259","261","269","271","272","273","276","277","279","281","283","284","292","294","295","297","298","300","301","303","304","306","308","310","311","313","315","316","318","319","321","322","323","325","328","329","334","336","337","338","342","343","345","347","349","351","352","354","355","357","358","360","363","364","366","367","369","371","380","381","383","384","385","387","389","391","392","397","398","400","401","403","405","407","409","410","412","413","415","416","418","419","420","422","423","425","427","428","429","432","434","435","436","438","440","441","443","444","446","449","451","452","454","455","457","458","459","461","463","465","468","470","472","474","475","476","477","479","481","482","484","486","487","488","490","491","494","495","503","504","509","511","512","514","515","516","525","526","527","529","530","534","541","542","543","545","547","548","551","553","555","557","558","559","561","562","564","565","567","569","578","580","581","582","589","590","592","594","595","597","598","603","605","607","610","611","614","616","618","619","621","622","623","625","628","629","631","632","634","637","638","639","641","642","644","645","648","650","652","653","655","656","661","662","664","666","667","668","674","675","677","679","681","682","685","686","688","689","690","691","693","695","696","698","701","702","704","706","707","709","711","713","717","719","720","723","724","726","727","735","737","738","739","741","743","745","747","748","752","753","754","756","757","759","761","764","773","774","783","784","787","788","789","791","792","794","807","808","810","811","814","815","817","818","821","823","825","826","827","829","831","833","834","836","837","839","840","842","844","846","850","851","853","854","858","859","864","866","869","870","872","873","874","876","885","887","888","890","891","892","901","902","904","906","907","909","911","913","915","916","917","919","920","922","923","925","926","928","929","934","943","944","946","947","949","950","951","953","955","956","958","959","961","962","963","965","966","971","972","974","976","977","978","980","982","984","987","988","991","992","996","997","999","1001","1003","1004","1005","1007","1009","1010","1011","1013","1015","1016","1017","1019","1023","1024","1025","1027","1029","1030","1033","1034","1035","1037","1038","1041","1042","1044","1046","1047","1049","1050","1055","1056","1059","1060","1062","1063","1064","1066"]},{"id":4,"name":"A1.CH.03.HIV_CH_BID_V3538_2003.JQ403028","sequence":["0","4","5","7","9","11","12","13","16","19","21","22","24","25","26","29","30","48","49","57","59","60","62","63","65","67","68","73","74","80","82","83","85","86","87","90","91","92","94","95","97","99","100","101","106","108","109","110","112","113","115","116","117","119","122","124","127","129","130","132","134","135","138","140","141","143","146","147","150","153","154","157","158","161","162","164","165","169","170","171","174","176","177","178","180","181","183","185","186","195","196","198","199","200","202","203","205","206","208","210","211","219","220","221","224","225","227","228","230","231","237","238","240","241","243","244","246","247","249","253","254","256","257","259","261","269","271","272","273","275","277","279","281","282","284","302","303","304","306","309","310","311","313","314","316","318","319","320","322","324","325","326","329","330","332","333","338","339","343","345","348","349","351","352","354","355","356","358","360","361","364","366","367","370","371","380","382","383","384","386","387","393","395","396","397","398","399","401","404","405","407","409","411","412","413","415","416","418","419","420","422","424","425","427","428","429","432","434","435","436","439","440","442","443","445","446","449","451","452","454","455","457","458","460","461","464","465","468","471","472","473","475","476","478","479","481","483","484","485","487","488","490","491","494","495","496","498","499","501","502","504","509","510","512","514","515","516","518","520","521","522","524","526","528","529","533","534","536","539","540","542","543","545","546","548","552","553","568","569","570","572","573","575","576","582","583","586","587","590","593","594","599","601","602","603","606","607","610","611","614","617","618","619","621","622","623","625","627","629","631","632","634","636","638","639","640","642","644","645","649","650","652","653","654","656","657","659","660","668","673","675","677","680","681","684","685","686","687","689","697","698","700","702","704","705","707","710","711","713","718","719","722","723","728","730","731","733","734","735","737","738","740","741","743","745","747","748","752","753","754","755","757","760","761","764","765","767","769","770","771","774","776","777","779","780","782","784","787","788","789","791","793","794","795","797","799","800","801","804","805","808","809","811","812","815","816","818","821","824","825","826","827","830","831","832","834","836","837","838","840","843","844","846","850","851","853","854","858","859","860","862","863","866","868","870","871","873","875","876","877","879","880","882","883","892","893","898","899","902","904","906","908","909","912","913","915","916","924","925","930","932","933","934","943","945","946","948","949","950","951","953","954","956","958","960","961","962","967","969","970","971","973","974","975","977","978","980","983","984","985","988","990","992","995","997","999","1001","1002","1004","1005","1007","1009","1010","1011","1013","1015","1016","1017","1019","1020","1024","1025","1027","1029","1030","1033","1034","1035","1037","1038","1041","1042","1044","1046","1047","1049","1050","1051","1052","1054","1056","1057","1060","1062","1063","1065","1066"]}]}

/***/ })
/******/ ]);