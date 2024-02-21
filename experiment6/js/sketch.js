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
var isGoTime = false;
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

	LoveButton = select("#Love");
    LoveButton.mousePressed(spawnLove);
	HateButton = select("#Hate");
    HateButton.mousePressed(spawnHate);
	HungyButton = select("#Hungy");
    HungyButton.mousePressed(spawnHungy);
	goTimeButton = select("#GoTime");
    goTimeButton.mousePressed(goTime);
	resetButton = select("#Reset");
    resetButton.mousePressed(reset);
	
    pixelDensity(0.5);
	fill(0,0,0);
	noStroke();
	rect(0,0,width,height);
	img = createGraphics(width,height);
	xSeed = round(0.6*width);
    wSeed = width-xSeed;
	img.pixelDensity(0.5);
	img.fill(255);
	img.textFont("myFont",145);
	for(var y = 220; y<height; y+=230){
		//img.text("P O R T F O L I O", 130, y);
	}
	image(img,0,0);
	filter(THRESHOLD);
	
    setFrameRate(30);
	loadPixels();
}
function spawnLove() {
	img.fill(20,20,255);
	textToScreen("Love");
}
function spawnHate() {
	img.fill(255,20,20);
	textToScreen("Anger");
}
function spawnHungy() {
	img.fill(20,255,20);
	textToScreen("Hunger");
}
function goTime() {
	
	isGoTime = !isGoTime;
	print("GOTIME" + isGoTime);
	image(img,0,0);
}
function reset() {
	push();
	fill(0);
	noStroke();
	rect(0,0,width,height);
	image(img,0,0);
	pop();
}

function textToScreen(str) {
	loadPixels();
	img.pixels = pixels;
	
	img.textSize(64);
	img.text(str, random(width), random(height));
	image(img,0,0);
}

var rSpread = 0.35;
var gSpread = 0.35;
var bSpread = 0.35;
// draw() function is called repeatedly, it's the main animation loop
function draw() {
	loadPixels();
	if (isGoTime) {
		for (var i = 0; i < 4*(width*height); i+=4) {
			var r = pixels[i];
			var g = pixels[i+1];
			var b = pixels[i+2];
			if (r + g + b == 295) continue;
			if (r > 100 && r >= b) {
				updatePix(r,g,b, i, 2, 1, rSpread);
			}
			if (g > 100 && g >= r) {
				updatePix(r,g,b, i+1, -1, 1, gSpread);
			} 
			if (b > 100 && b >= g) {
				updatePix(r,g,b, i+2, -1, -2, bSpread);
			}

		}
	}
	updatePixels();
	image(img,0,0);
}

var dampener = 10;
function updatePix(r,g,b, i, lD, rD, spread) {
	var upPix = i - (width*4);
	var rightPix = i + 4;
	var downPix = i + (width*4);
	var leftPix = i - 4;
	var add = pixels[i] * spread * (random(1,3));
	var dir = random([0,1,2,3]);
	switch (dir) {
		case 0:
			if (upPix < 0) upPix = width*height*4 - upPix;
			pixels[upPix] += add;
			pixels[upPix+lD] -= add/dampener;
			pixels[upPix+rD] -= add/dampener;
			break;
		case 1:
			if (rightPix > (4*width*height)) rightPix = rightPix - (4*width*height);
			pixels[rightPix] +=add;
			pixels[rightPix+lD] -= add/dampener;
			pixels[rightPix+rD] -= add/dampener;
			break;
		case 2:
			if (downPix > (4*width*height)) downPix = downPix - (4*width*height);
			pixels[downPix] += add;
			pixels[downPix+lD] -= add/dampener;
			pixels[downPix+rD] -= add/dampener;
			break;
		case 3:
			if (leftPix < 0) leftPix = width*height*4 - leftPix;
			pixels[leftPix] += add;
			pixels[leftPix+lD] -= add/dampener;
			pixels[leftPix+rD] -= add/dampener;
			break;
		
	}
	pixels[i] -= pixels[i] * spread;
}