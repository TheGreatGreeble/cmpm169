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
	
    pixelDensity(0.5);
	fill(0);
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
	textToScreen("Hate");
}
function spawnHungy() {
	img.fill(20,255,20);
	textToScreen("Hungy");
}
function goTime() {
	
	isGoTime = !isGoTime;
	print("GOTIME" + isGoTime);
	image(img,0,0);
}

function textToScreen(str) {
	loadPixels();
	img.pixels = pixels;
	print("spawnText");
	//pixelDensity(1);
	//fill(0);
	//textImg.noStroke();
	
	img.textSize(64);
	img.text(str, random(width), random(height));
	//text(str, width/2, width/2);
	image(img,0,0);
	//filter(THRESHOLD);
}

var rSpread = 0.1;
var gSpread = 0.3;
var bSpread = 0.1;
// draw() function is called repeatedly, it's the main animation loop
function draw() {
	loadPixels();
	//print(pixels[0] + "/" + pixels[1] + "/" + pixels[2]);
	if (isGoTime) {
		for (var i = 0; i < 4*(width*height); i+=4) {
			var r = pixels[i];
			var g = pixels[i+1];
			var b = pixels[i+2];
			var a = pixels[i+3];
			
			if (r > 100 && r > g && r > b) {
				updatePix(r,g,b, i, a, rSpread);
			} else if (g > 100  && g > r && g > b) {
				updatePix(r,g,b, i+1, a, gSpread);
			} else if (b > 100  && b > r && b > g) {
				updatePix(r,g,b, i+2, a, bSpread);
			}

		}
	}
	updatePixels();
	image(img,0,0);
}

function updatePix(r,g,b, i, a, spread) {
	//print("updatePix");
	switch (random([0,1,2,3])) {
		case 0:
			//print("up");
			var upPix = i - (width*4);
			if (upPix < 0) upPix = width*height*4 - upPix;
			pixels[upPix] += pixels[i] * spread*2;
			//pixels[a - width] = 255;
			break;
		case 1:
			var rightPix = i + 4;
			if (rightPix > (4*width*height)) break;
			pixels[rightPix] += pixels[i] * spread;
			//pixels[a + 4] = 255;
			break;
		case 2:
			var downPix = i + (width*4);
			if (downPix > (4*width*height)) break;
			pixels[downPix] += pixels[i] * spread;
			//pixels[a + width] = 255;
			break;
		case 3:
			var leftPix = i - 4;
			if (leftPix < 0) leftPix = width*height*4 - leftPix;
			pixels[leftPix] += pixels[i] * spread;
			//pixels[a - 4] = 255;
			break;
		
	}
	pixels[i] -= pixels[i] * spread;
}