var svg = svg || {};

$(document).ready(function(){
    svg =  $('#svg-image').svg({
/*     loadURL: 'images/diagram.svg', */
    loadURL: 'images/pink-gradient.svg',
    onLoad: loadSVG
    });

});

var loadSVG = function(svg) {
/*
  svg.rect(10, 20, 150, 100, {id: 'rect1', 
      fill: 'red', stroke: 'black', strokeWidth: 3}); 
  svg.circle(100, 150, 75, {id: 'circle1', 
      fill: 'yellow', stroke: 'black', strokeWidth: 3}); 
  var g = svg.group({transform: 'translate(200,20)'}); 
  svg.circle(g, 100, 100, 75, {id: 'circle2', class_: 'grouped', 
      fill: 'yellow', stroke: 'black', strokeWidth: 3}); 
  svg.rect(g, 10, 150, 150, 100, {id: 'rect2', class_: 'grouped', 
      fill: 'red', stroke: 'black', strokeWidth: 3});
*/

  svg.configure({offsetWidth: 0, offsetHeight: 0, width: 700, height: 400, viewBox: '0 0 700 400'}, true);
  makeData(svg);
}
/**
 * Find and change an element in an existing svg.
 */
var makeChange = function(svg) {
  $('#top1', svg.root()).attr('fill', '#ffcc00');
}

var makeData = function(svg) {
  var data = {
    'row0' : {
      'node0': {'id': 'node0', 'text': 'hello 0', 'fill': '#ED83A2', 'fillStroke': '#ddd', 'stroke': '#ddd', 'parent': null, 'scalar': 1}
    },
    'row1' : {
      'node1': {'id': 'node1', 'text': 'hello 1', 'fill': '#D32959', 'fillStroke': '#ddd', 'stroke': '#bbb', 'parent': 'node0', 'scalar': 1},
      'node4': {'id': 'node4', 'text': 'hello 1', 'fill': '#E54CCF', 'fillStroke': '#ddd', 'stroke': '#bbb', 'parent': 'node0', 'scalar': 1},
      'node5': {'id': 'node5', 'text': 'hello 1', 'fill': '#B5159E', 'fillStroke': '#ddd', 'stroke': '#bbb', 'parent': 'node0', 'scalar': 1}
    },
    'row2' : {
      'node2': {'id': 'node2', 'text': 'hello 2', 'fill': '#930930', 'fillStroke': '#ddd', 'stroke': '#999', 'parent': 'node1', 'scalar': 1},
    },
    'row3' : {
      'node3': {'id': 'node3', 'text': 'hello 3', 'fill': '#FC064C', 'fillStroke': '#ddd', 'stroke': '#777', 'parent': 'node2', 'scalar': 1}
    },
    'row4' : {
      'node6': {'id': 'node6', 'text': 'hello 2', 'fill': '#930930', 'fillStroke': '#ddd', 'stroke': '#999', 'parent': 'node4', 'scalar': 1},
      'node7': {'id': 'node7', 'text': 'hello 2', 'fill': '#930930', 'fillStroke': '#ddd', 'stroke': '#999', 'parent': 'node4', 'scalar': 1},
      'node8': {'id': 'node8', 'text': 'hello 2', 'fill': '#930930', 'fillStroke': '#ddd', 'stroke': '#999', 'parent': 'node4', 'scalar': 1},
    },
   
  };
  buildNodeMap(svg, data);
}

var buildNodeMap = function(svg, data) {
  var boxStyle = {
    'width': 30,
    'height': 30,
    'xOffset' : 60,
    'yOffset' : 80,
    'fill' : '#666666',
    'stroke' : '#444444',
    'strokeWidth' : 1,
    'labelWidth' : 100,
  }

  buildNodeBoxes(svg, data, boxStyle);
  buildNodeLines(svg,data, boxStyle);
/*   buildLabels(svg, data, boxStyle); */
}
/**
 * Create and position boxes.
 */
var buildNodeBoxes = function(svg, data, boxStyle) {
  var rowCounter = 0;  
  for (row in data) {
    // Provide a positive number for positioning boxes horizontally.
    var colCounter = 1;  
    for (node in data[row]) { 
      var position;
      if(data[row][node].parent !== null) {
        // Get the position of the parent.
        var parent = $('#' + data[row][node].parent, svg.root());
        // Create an array of positions.
        position = Array (
          boxStyle.xOffset  * rowCounter + colCounter * (boxStyle.width + boxStyle.xOffset),
          boxStyle.yOffset * rowCounter,
          boxStyle.width * data[row][node].scalar,
          boxStyle.height * data[row][node].scalar
        );
      }
      else {
        // Provide a default position, usually for the first box.
        position = Array (
          boxStyle.xOffset  * rowCounter, 
          boxStyle.yOffset * rowCounter, 
          boxStyle.width * data[row][node].scalar, 
          boxStyle.height * data[row][node].scalar);
      }
      // Build the box svg element.
      svg.rect(position[0], position[1], position[2], position[3], {
        onclick: "boxClick(evt)",
        id: data[row][node].id,
        fill: data[row][node].fill,
        stroke: boxStyle.stroke,
        strokeWidth: boxStyle.strokeWidth
      });
      // Iterate through each box in a row.
      colCounter++;
    }
    rowCounter++;
  }
}

function boxClick(evt) {
  var rect = evt.target;
  var fill = rect.getAttribute("fill");
  rect.setAttribute("fill", '#ffcc00');
}

/**
 * Draw lines between boxes.
 */
var buildNodeLines = function(svg,data, boxStyle) {
  // Build Lines
  for (row in data) {
    nodeCounter = 0;
    for (node in data[row]) {
      var line;
      if(data[row][node].parent !== null) {
        var parent = $('#' + data[row][node].parent, svg.root());
        var currentBox = $('#' + data[row][node].id, svg.root());
        line = Array (
          Number(parent.attr('width')) + Number(parent.attr('x')),
          Number(parent.attr('height')) + Number(parent.attr('y')),
          Number(currentBox.attr('x')),
          Number(currentBox.attr('y'))
        );
      }
      else {
        line = (0, 0, 0, 0);
      }
      svg.line(data[row][node].nid, 
        line[0], line[1], line[2], line[3], {
          id: data[row][node].nid,
          stroke: data[row][node].stroke,
          strokeWidth: boxStyle.strokeWidth
        });
      nodeCounter++;
    }
  }
}

/**
 * Label boxes
 */
var buildLabels = function(svg, data, boxStyle) {
/*
  var defs = svg.defs(); 
  var path = svg.createPath(); 
  svg.path(defs, path.move(100, 200).curveC([[200, 
      100, 300, 0, 400, 100], [500, 200, 600, 300, 700, 
      200], [800, 100, 900, 100, 900, 100]]), {id: 
      "MyPath"}); 
  svg.describe("Example toap02 - tspan within textPath"); 
  svg.use("#MyPath", {fill: "none", stroke: "red"}); 
  var text = svg.text("", {fontFamily: "Verdana", 
      fontSize: "42.5", fill: "blue"}); 
  var texts = svg.createText(); 
  svg.textpath(text, "#MyPath", texts.string("Curvy ").span("Lines", {dy: -30, fill: "red"}).span(",", 
      {dy: 30}).string(" then we go down, then up again")); 
  
*/

/*
  var defs = svg.defs(); 
  var path = svg.createPath(); 
  svg.path(defs, path.move(10, 300).curveC([[400, 380], [500, 300, 700, 
      200], [800, 100, 900, 100, 900, 100]]), {id: 
      "MyPath"}); 
  var text = svg.text("", {fontFamily: "Verdana", 
      fontSize: "20", fill: "#000000"}); 
  var texts = svg.createText(); 
  svg.textpath(text, "#MyPath", texts.string("This is a curved path for text.").span("So cool!", {dy:3, fill: "#777777", fontSize: "30"})); 
*/
  var rowCounter = 0;  
  for (row in data) {
    // Provide a positive number for positioning boxes horizontally.
    var colCounter = 1;  
    for (node in data[row]) { 
      var position;
      if(data[row][node].parent !== null) {
        // Get the position of the parent.
        var parent = $('#' + data[row][node].parent, svg.root());
        // Create an array of positions.
        position = Array (
          boxStyle.xOffset  * rowCounter + colCounter * (boxStyle.width + boxStyle.xOffset ),
          boxStyle.yOffset * rowCounter,
          boxStyle.width * data[row][node].scalar/*  + Number(boxStyle.labelWidth) */,
          boxStyle.height * data[row][node].scalar
        );
      }
      else {
        // Provide a default position, usually for the first box.
        position = Array (
          boxStyle.xOffset  * rowCounter, 
          boxStyle.yOffset * rowCounter, 
          boxStyle.width * data[row][node].scalar, 
          boxStyle.height * data[row][node].scalar
        );
      }
console.log(position);
      // Build the box svg element.
  var defs = svg.defs(); 
  var path = svg.createPath(); 
  svg.path($('#' + data[row][node].id, svg.root()), path.move(10*rowCounter,10*rowCounter, false).horiz(100), {id: 
      "MyPath"}); 
  var text = svg.text("", {
        fontFamily: "Verdana", 
        fontSize: "10", 
        fill: "#000000"
      }); 
  var texts = svg.createText(); 
  svg.textpath(text, "#MyPath", texts.string(data[row][node].text));
path.reset();
      // Iterate through each box in a row.
      colCounter++;
    }
    rowCounter++;
  }

}