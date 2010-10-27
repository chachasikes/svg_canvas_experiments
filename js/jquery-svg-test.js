$(document).ready(function(){
  var svg =  $('#svg-image').svg({
    loadURL: 'images/diagram.svg',
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
  makeFancy(svg);
}

var makeFancy = function(svg) {
/*   console.log(svg); */
  $('#top1', svg.root()).attr('fill', '#ffcc00');
}


