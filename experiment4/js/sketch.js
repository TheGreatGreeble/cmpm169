// sketch.js - This file takes in an image and sorts the image's pixels by hue and lightness
// Author: Evan Lake
// Date: 2/5/2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Globals
let myInstance;
let canvasContainer;

var mode = 0;

var imgSrcFileName = "MacEssence.jpg";
var imgSrc;            // source image  
var imgSrcPixels = []; // packed ARGB of source image
var imgPixels = [];    // packed ARGB of sorted image
 
var row = 0;
var column = 0;
 
var paramsDiv;

var startSort = false;

var osc;



function preload() 
{
    imgSrc = loadImage( imgSrcFileName );
}

// original pixel sorting by: https://openprocessing.org/sketch/422167

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(imgSrc.width, imgSrc.height);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(imgSrc.width, imgSrc.height);
    });

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;
    //createCanvas(  );
    pixelDensity( 1 );
    cursor( HAND );
    
    imgSrc.loadPixels();
    for (var i = 0; i < 4*(imgSrc.width*imgSrc.height); i+=4) {
        imgSrcPixels[int(i/4)] = (255 << 24) | (imgSrc.pixels[i] << 16) | (imgSrc.pixels[i+1] << 8) | (imgSrc.pixels[i+2]);
    }
    imgSrc.updatePixels();
    
    

    loadPixels();
    imgPixels = imgSrcPixels.slice();
    var imageBytes = 4*(imgSrc.width*imgSrc.height);
    var i = 0;
    while (i < imageBytes) {
        var col = imgPixels[int(i/4)];
        pixels[i++] = col >> 16 & 255;
        pixels[i++] = col >> 8 & 255;
        pixels[i++] = col & 255;
        pixels[i++] = 255;
    }
    updatePixels();
    
}
 
 

function draw() {
    if (!startSort) return;
    hueSort();

    var imageBytes = 4*(imgSrc.width*imgSrc.height);
    var i = 0;
    while (i < imageBytes) {
        var col = imgPixels[int(i/4)];
        pixels[i++] = col >> 16 & 255;
        pixels[i++] = col >> 8 & 255;
        pixels[i++] = col & 255;
        pixels[i++] = 255;
    }
 
     updatePixels();
}
 
 
function mouseClicked() {
    startSort = true;
    osc = new p5.Oscillator();
    osc.setType("sine");
    osc.start();
}
 
var sortArea = 100;
function hueSort() {
    // select random point in image
    var posX = round(random(imgSrc.width-sortArea));
    var posY = round(random(imgSrc.height-sortArea));
    //print("sorting area at: (" + posX + ", " + posY + ")\n");

    //get array array of effected area
    var iRow;
    var pixelArr = [];

    for (var i = 0; i < sortArea * sortArea; i += sortArea) {
        var inUnsorted = [];
        iRow = (posY + (i/sortArea)) * imgSrc.width;
        for (var j = 0; j < sortArea; j++) {
            var pixRGB = imgPixels[iRow+posX+j];
            pixelArr[i+j] = rgbToHsl((pixRGB >> 16 & 255), (pixRGB >> 8 & 255), (pixRGB & 255));
        }
    }

    var numsort = 0;
    var avgHueDif = 0;
    var avgLightDif = 0;
    // sort that area by hue
    function hueComp(h1, h2) {
        numsort += 1;
        avgHueDif += Math.abs(h1[0] - h2[0]);
        avgLightDif += Math.abs(h1[2] - h2[2]);
        
        if (h1[0] === h2[0]) {
            if (h1[2] === h2[2]) {
                return 0;
            }
            else {
                return (h1[2] < h2[2]) ? -1 : 1;
            }
        }
        else {
            return (h1[0] < h2[0]) ? -1 : 1;
        }
    }

    pixelArr.sort(hueComp);

    avgHueDif = avgHueDif/numsort;
    avgLightDif = avgLightDif/numsort;
    print(avgHueDif + "<--Hue . Light-->" + avgLightDif);
    osc.amp(map(avgLightDif,0,0.05,0,0.8), 0.1);
    osc.freq(map(avgHueDif, 0,0.05,50,1500), 0.1);
    

    // set sorted area
    for (var i = 0; i < sortArea * sortArea; i += sortArea) {
        iRow = (posY + (i/sortArea)) * imgSrc.width;
        //row
        for (var j = 0; j < sortArea; j++) {
            //print("setting a pixel\n")
            var pixRGBarr = hslToRgb(pixelArr[i+j][0], pixelArr[i+j][1], pixelArr[i+j][2]);
            var pixRGB = (255 << 24) | (pixRGBarr[0] << 16) | ((pixRGBarr[1]) << 8) | pixRGBarr[2];
            imgPixels[iRow+posX+j] = pixRGB;
        }
    }
}

// RGB to HSL conversion taken from https://gist.github.com/mjackson/5311256
/**
* Converts an RGB color value to HSL. Conversion formula
* adapted from http://en.wikipedia.org/wiki/HSL_color_space.
* Assumes r, g, and b are contained in the set [0, 255] and
* returns h, s, and l in the set [0, 1].
*
* @param   Number  r       The red color value
* @param   Number  g       The green color value
* @param   Number  b       The blue color value
* @return  Array           The HSL representation
*/
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
  
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
    
        h /= 6;
    }
  
    return [ h, s, l ];
}
  
/**
* Converts an HSL color value to RGB. Conversion formula
* adapted from http://en.wikipedia.org/wiki/HSL_color_space.
* Assumes h, s, and l are contained in the set [0, 1] and
* returns r, g, and b in the set [0, 255].
*
* @param   Number  h       The hue
* @param   Number  s       The saturation
* @param   Number  l       The lightness
* @return  Array           The RGB representation
*/
function hslToRgb(h, s, l) {
    var r, g, b;
  
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
  
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
  
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
  
    return [ r * 255, g * 255, b * 255 ];
}