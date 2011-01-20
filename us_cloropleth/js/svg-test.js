$(document).ready(function() {

//http://efreedom.com/Question/1-138309/Possible-Manipulate-SVG-Document-Embedded-HTML-Doc-JavaScript
/* $("img").observe("load", function() {$("img").contentDocument.method()}); */

// Each of the following examples create a canvas that is 320px wide by 200px high
// Canvas is created at the viewport’s 10,50 coordinate
var paper = Raphael(10, 50, 320, 200);
// Canvas is created at the top left corner of the #notepad element
// (or its top right corner in dir="rtl" elements)
/* var paper = Raphael(document.getElementById("notepad"), 320, 200); */

/* var paper = Raphael(document.getElementById("diagram"), 320, 200); */

/*
var set = Raphael(["diagram", 320, 200, {
    type: "rect",
    x: 10,
    y: 10,
    width: 25,
    height: 25,
    stroke: "#f00"
}, {
    type: "text",
    x: 30,
    y: 40,
    text: "HEY"
}]);
*/
/*

var c = paper.circle(50, 50, 40);
c.attr({fill: "blue"});
*/

/*
// Same as above
var paper = Raphael("notepad", 320, 200);
// Image dump
var set = Raphael(["notepad", 320, 200, {
    type: "rect",
    x: 10,
    y: 10,
    width: 25,
    height: 25,
    stroke: "#f00"
}, {
    type: "text",
    x: 30,
    y: 40,
    text: "HEY"
}]);
*/

//http://softwareas.com/ajaxjavascript-8-ways-to-create-graphics-on-the-fly


/* Z index in SVG is defined by the order the elements appear in the document. You will have to change the element order if you want to bring a specific shape to the top. */

//http://efreedom.com/Question/1-2753732/Access-SVG-Elements-Javascript
     var a = document.getElementById("alphasvg");

        //it's important to add an load event listener to the object, as it will load the svg doc asynchronously
        a.addEventListener("load",function(){
            var svgDoc = a.contentDocument; //get the inner DOM of alpha.svg
            var delta = svgDoc.getElementById("delta"); //get the inner element by id
            delta.addEventListener("mousedown",function(){alert('hello world!')},false);    //add behaviour
        },false);

        console.log(a);
});




   