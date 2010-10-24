/*
function draw_b() {
  var b_canvas = document.getElementById("b");
  var b_context = b_canvas.getContext("2d");
  b_context.fillRect(50, 25, 150, 100);
}
*/

 $(document).ready(function() {

  // Draw a line when clicked.
  $('a.drawline').click(drawLine);

  function drawLine() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    //context.fillRect(50, 25, 150, 100);

    var x = 10;
    var y = 10;

  context.moveTo(0, y);
  context.lineTo(500, y);
  context.strokeStyle = "#aaa";
  context.stroke();

  /*
  for (var y = 0.5; y < 375; y += 10) {
    context.moveTo(0, y);
    context.lineTo(500, y);
    context.strokeStyle = "#eee";
    context.stroke();
  }
  */


  }

 });
