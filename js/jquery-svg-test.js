$(document).ready(function(){
  var svg =  $('#svg-image').svg({
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

  svg.configure({offsetWidth: 300, offsetHeight: 300}, true);
//  makeFancy(svg);
makeData(svg);
}

var makeFancy = function(svg) {
/*   console.log(svg); */
  $('#top1', svg.root()).attr('fill', '#ffcc00');
}


var makeData = function(svg) {
  // text, color, parent
  var data = {
    'node0': {'id': 'node0', 'text': 'hello 0', 'fill': '#00ff00', 'stroke': '#ddd', 'parent': null},
    'node1': {'id': 'node1', 'text': 'hello 1', 'fill': '#00ff33', 'stroke': '#bbb', 'parent': 'node0'},
    'node2': {'id': 'node2', 'text': 'hello 2', 'fill': '#00ff66', 'stroke': '#999', 'parent': 'node1'},
    'node3': {'id': 'node3', 'text': 'hello 3', 'fill': '#00ff99', 'stroke': '#777', 'parent': 'node2'}
  };

/*
  svg.rect(0, 0, 10, 10, {id: 'node0', 
      fill: '#00ff00', stroke: 'black', strokeWidth: 2}); 
*/

  buildNodeMap(svg, data);
}

var buildNodeMap = function(svg, data) {
  var square = {
    'width': 30,
    'height': 40,
    'xOffset' : 10,
    'yOffset' : 80,
    'fill' : '#666666',
    'stroke' : '#444444',
    'strokeWidth' : 2
  }
  var nodeCounter = 0;



  // Build Boxes
  for (node in data) {
    // data[node].text
    svg.rect(square.xOffset  * nodeCounter, square.yOffset * nodeCounter, square.width, square.height, {
      id: data[node].id,
      fill: square.fill,
      stroke: square.stroke,
      strokeWidth: square.strokeWidth
    });
    nodeCounter++;
  }

  // Build Lines
  nodeCounter = 0;
  for (node in data) {
    var line;
    if(data[node].parent !== null) {
      var parent = $('#' + data[node].parent, svg.root());
      var currentBox = $('#' + data[node].id, svg.root());
      line = Array (
        parent.attr('width'),
        parent.attr('height'),
        Number(currentBox.attr('x')),
        Number(currentBox.attr('y'))
      );
      console.log(line);
    }
    else {
      line = (0, 0, 0, 0);
    }

    svg.line(data[node].nid, 
/*
      (square.width * (nodeCounter + 1)) , 
      (square.height * (nodeCounter + 1)) , 
      (square.xOffset * (nodeCounter + 2)) + (square.width * (nodeCounter + 2)), 
      (square.yOffset * (nodeCounter + 2)) + (square.height * (nodeCounter + 2)), 
*/
      line[0], line[1], line[2], line[3], {
        id: data[node].nid,
        fill: square.fill,
        stroke: square.stroke,
        strokeWidth: square.strokeWidth
      });
    nodeCounter++;
  }

}