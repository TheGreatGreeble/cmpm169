// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

var img;
var xOff=0,yOff=0;
var theta = 0;
var r = 0;
var remain = 0;
var xSeed;
var wSeed;
var left =0;
let myFont;
function preload() {
  //myFont = loadFont('MonumentExtended-Regular.otf');
}

// Globals
let myInstance;
let canvasContainer;

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
    pixelDensity(1);
	img = createGraphics(width,height);
	xSeed = round(0.6*width);
    wSeed = width-xSeed;
	img.pixelDensity(1);
	img.fill(0);
	img.noStroke();
	img.rect(0,0,width,height);
	img.fill(255);
	img.textFont("myFont",145);
	for(var y = 220; y<height; y+=230){
		img.text("P O R T F O L I O", 130, y);
	}
	image(img,0,0);
	filter(THRESHOLD);
    setFrameRate(30);
	loadPixels();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    xOff=1;
  	yOff=height-1;
	var w4 = (width*4);
  	while(xOff<(width)){
		r = round(cos(theta)*random(0,xOff));
		var strt = yOff*w4;
		var end = strt+(r<<2);
		for(var i = end-12; i>strt; i-=12){
			pixels[i+12]=pixels[i+5]=pixels[i+6]=pixels[i];
		}//copy(0,yOff,r,1,  1,yOff,r,1); 
		left = Math.max(0,xSeed-r);
		remain = Math.max(0,(width-left));
		strt = (yOff-1)*w4+(left*12)+w4;
		end = strt+(remain*4);
		for(var i = strt; i<end; i+=12){
			pixels[i-w4]=pixels[i+1-w4]=pixels[i+2-w4]=pixels[i];
		}
    	//copy(left,yOff, remain,1,    left,yOff-1, remain,1);
  		strt = (yOff*w4)+((width-r)*12);
		end = strt+(r*5);
		for(var i = strt+12; i<end; i+=12){
			pixels[i-12]=pixels[i-3]=pixels[i-2]=pixels[i];
			pixels[i-12+w4]=pixels[i-3+w4]=pixels[i-2+w4]=pixels[i+w4];
		}//copy(width-r,yOff,r,2,   width-r-1,yOff,r,2);
		xOff++;
		yOff--;
  	}
	updatePixels();
	theta++;
}