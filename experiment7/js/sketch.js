// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js
// Globals
let myInstance;
let canvasContainer;

$.ajax({ 
    url: "https://api.nasa.gov/planetary/apod", // API endpoint
    data: { api_key: "DEMO_KEY"},      // Any data to send
    //url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos", // API endpoint
    //data: { earth_date:2015-6-3, api_key: "DEMO_KEY"},      // Any data to send
    type: "GET",           // POST or GET request
    dataType : "json", // expected data type
    success: function(result){
        //$("body").html("<h1>"+result.title); 
        $("#canvas-container").html("<img src="+result.url+">");
        //$("body").append("<p>"+result.explanation);
    },
    error: function(xhr,status,error) {
        console.log("Error:",xhr,status,error); }
})

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
}
