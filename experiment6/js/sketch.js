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

	LoveButton = select("#Love");
    LoveButton.mousePressed(spawnLove);
	HateButton = select("#Hate");
    HateButton.mousePressed(spawnHate);
	HungyButton = select("#Hungy");
    HungyButton.mousePressed(spawnHungy);
	
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

function textToScreen(str) {
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
	//updatePixels();
}

var rSpread = 0.05;
var gSpread = 0.15;
var bSpread = 0.05;
// draw() function is called repeatedly, it's the main animation loop
function draw() {
	loadPixels();
	//print(pixels[0] + "/" + pixels[1] + "/" + pixels[2]);
	for (var i = 0; i < 4*(width*height); i+=4) {
		var r = pixels[i];
		var g = pixels[i+1];
		var b = pixels[i+2];
		var a = pixels[i+3];
		//print (r + "/" + g + "/" + b);
		if (r > 0) {
			//print("found Red");
		}
        if (r > 20) {
			updatePix(r,g,b, i, a, rSpread);
		}
		if (g > 20) {
			updatePix(r,g,b, i+1, a, gSpread);
		}
		if (b > 20) {
			updatePix(r,g,b, i+2, a, bSpread);
		}

    }
	updatePixels();
	/*
    xOff=1;
  	yOff=height-1;
	var w4 = (width*4);
  	while(xOff<(width)){
		r = round(cos(theta)*random(0,xOff));
		var strt = yOff*w4;
		var end = strt+(r<<2);
		for(var i = end-12; i>strt; i-=12){
			//pixels[i+12]=pixels[i+5]=pixels[i+6]=pixels[i];
		}//copy(0,yOff,r,1,  1,yOff,r,1); 
		left = Math.max(0,xSeed-r);
		remain = Math.max(0,(width-left));
		strt = (yOff-1)*w4+(left*12)+w4;
		end = strt+(remain*4);
		for(var i = strt; i<end; i+=12){
			//pixels[i-w4]=pixels[i+1-w4]=pixels[i+2-w4]=pixels[i];
		}
    	//copy(left,yOff, remain,1,    left,yOff-1, remain,1);
  		strt = (yOff*w4)+((width-r)*12);
		end = strt+(r*5);
		for(var i = strt+12; i<end; i+=12){
			//pixels[i-12]=pixels[i-3]=pixels[i-2]=pixels[i];
			//pixels[i-12+w4]=pixels[i-3+w4]=pixels[i-2+w4]=pixels[i+w4];
		}//copy(width-r,yOff,r,2,   width-r-1,yOff,r,2);
		xOff++;
		yOff--;
  	}
	//updatePixels();
	theta++;
	*/
}

function updatePix(r,g,b, i, a, spread) {
	//print("updatePix");
	switch (random([0,1,2,3])) {
		case 0:
			//print("up");
			var upPix = i - (width*4);
			if (upPix < 0) break;
			pixels[upPix] += round(pixels[i] * spread*2);
			//pixels[a - width] = 255;
			break;
		case 1:
			var rightPix = i + 4;
			if (rightPix > (4*width*height)) break;
			pixels[rightPix] += round(pixels[i] * spread*2);
			//pixels[a + 4] = 255;
			break;
		case 2:
			var downPix = i + (width*4);
			if (downPix > (4*width*height)) break;
			pixels[downPix] += round(pixels[i] * spread*2);
			//pixels[a + width] = 255;
			break;
		case 3:
			var leftPix = i - 4;
			if (leftPix < 0) break;
			pixels[leftPix] += round(pixels[i] * spread*2);
			//pixels[a - 4] = 255;
			break;
		
	}
	pixels[i] *= (1 - spread);
}