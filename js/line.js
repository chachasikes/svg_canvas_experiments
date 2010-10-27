$(document).ready(function() {

console.log(  $.data('svg') );

});

function drawLine() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.fillRect(50, 25, 150, 100);
}

function clicked(){
alert('hi');
}