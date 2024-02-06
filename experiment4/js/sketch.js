// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;

/*

 ASDF Pixel Sort
 Kim Asendorf | 2010 | kimasendorf.com
 [recoded in p5.js by Antonio Belluscio]

 sorting modes

 0 = black
 1 = brightness
 2 = white

 */


 var mode = 0;

 var imgSrcFileName = "MacEssence.jpg";
 var imgSrc;            // source image  
 var imgSrcPixels = []; // packed ARGB of source image
 var imgPixels = [];    // packed ARGB of sorted image
 
 // threshold values to determine sorting start and end pixels
 var blackValue;
 var brightnessValue;
 var whiteValue;
 
 var row = 0;
 var column = 0;
 
 var paramsDiv;

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
  paramsDiv = createDiv('...');
  paramsDiv.style("position", "absolute");
  paramsDiv.style("width", "100%");
  paramsDiv.style("bottom", 0);
  paramsDiv.style("font-family", "Verdana");
  paramsDiv.style("font-size", 12);
  paramsDiv.style("color", "#fff");
  paramsDiv.style("text-shadow", "1px 1px 0 #000");
  paramsDiv.style("text-align", "center");
  
  imgSrc.loadPixels();
  for (var i = 0; i < 4*(imgSrc.width*imgSrc.height); i+=4) {
    imgSrcPixels[int(i/4)] = (255 << 24) | (imgSrc.pixels[i] << 16) | (imgSrc.pixels[i+1] << 8) | (imgSrc.pixels[i+2]);
    //print("source" + imgSrcPixels[int(i/4)]);
  }
  imgSrc.updatePixels();

  loadPixels();
  
  updateParams();
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
 
 
 function draw() 
 {
    /*
    
    imgPixels = imgSrcPixels.slice();
    row = 0;
    column = 0;
 
     // loop through rows
    while (row < height - 1) {
        sortRow();
        row++;
    }
 
     // loop through columns
    while (column < width - 1) {
        sortColumn();
        column++;
    }
 
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
     */
 }
 
 
 function mouseClicked() 
 {
    //imgPixels = imgSrcPixels.slice();
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
 
 function mouseMoved() 
 {
     updateParams();
 }
 
 function updateParams() 
 {
    // -16777216 == 0b 11111111 00000000 00000000 00000000
    //         0 == 0b 00000000 00000000 00000000 00000000 
    //       255 == 0b 00000000 00000000 00000000 11111111
     if (mode === 0) {
         blackValue = int(map(mouseX, 0, width - 1, -16777216, 0));
     } else if (mode == 1) {
         brightnessValue = int(map(mouseX, 0, width - 1, 0, 255));
     } else if (mode == 2) {
         whiteValue = int(map(mouseX, 0, width - 1, -16777216, 0));
     }
   
   var params = "";
     if (mode === 0) {
         params = "mode: 0 - blackValue: " + blackValue;
     } else if (mode == 1) {
         params = "mode: 1 - brightnessValue: " + brightnessValue;
     } else if (mode == 2) {
         params = "mode: 2 - whiteValue: " + whiteValue;
     }
 
   if (paramsDiv) {
        paramsDiv.html( params );
   }
 }
 
 var sortArea = 60;
 function hueSort() {
    // select random point in image
    var posX = round(random(imgSrc.width-sortArea));
    var posY = round(random(imgSrc.height-sortArea));
    print("sorting area at: (" + posX + ", " + posY + ")\n");

    //get array array of effected area
    var iRow;
    var unsorted = [];

    for (var i = 0; i < sortArea * sortArea; i += sortArea) {
        var inUnsorted = [];
        iRow = (posY + (i/sortArea)) * imgSrc.width;
        for (var j = 0; j < sortArea; j++) {
            unsorted[i+j] = imgPixels[iRow+posX+j];
            //print("RGBA: " + (imgPixels[iRow+posX+j] >> 16 & 255) + ", " + (imgPixels[iRow+posX+j] >> 8 & 255) + ", " + (imgPixels[iRow+posX+j] & 255) + ", ");
        }
    }
    for (var i = 0; i < sortArea; i++) {
        for (var j = 0; j < sortArea; j++) {
            //print("(" + i + ", " + j + "):" + unsorted[i][j]);
        }
    }

    // sort that area by hue
    var sorted = [];
    
    for(var i = 0; i < sortArea * sortArea; i += sortArea) {
         
        for(var j = 0; j < sortArea; j++) {
            //print("setting area to " + unsorted[0][0] + "\n");
            sorted[i+j] = unsorted[0];
        }
    }
    

    // set sorted area
    for (var i = 0; i < sortArea * sortArea; i += sortArea) {
        iRow = (posY + (i/sortArea)) * imgSrc.width;
        //row
        for (var j = 0; j < sortArea; j++) {
            //print("setting a pixel\n")
            imgPixels[iRow+posX+j] = sorted[i+j];
        }
    }

    for (var i = 0; i < 4*(imgSrc.width*imgSrc.height); i+=4) {
        //imgPixels[int(i/4)] = (255 << 24) | (0 << 16) | (0 << 8) | (0);
    }
 }
 
 function sortRow() 
 {
     // current row
     var iRow = y * imgSrc.width;
     var y = row;
 
     // where to start sorting
     var x = 0;
 
     // where to stop sorting
     var xend = 0;
 
     while (xend < width - 1) {
         switch (mode) {
             case 0:
                 x = getFirstNotBlackX(x, y);
                 xend = getNextBlackX(x, y);
                 break;
             case 1:
                 x = getFirstBrightX(x, y);
                 xend = getNextDarkX(x, y);
                 break;
             case 2:
                 x = getFirstNotWhiteX(x, y);
                 xend = getNextWhiteX(x, y);
                 break;
             default:
                 break;
         }
 
         if (x < 0) break;
 
         var sortLength = xend - x;
 
         var unsorted = [];
         var sorted = [];
 
         for (var i = 0; i < sortLength; i++) {
             unsorted[i] = imgPixels[x + i + iRow];
         }
 
         sorted = sort(unsorted);
 
         for (var i = 0; i < sortLength; i++) {
             imgPixels[x + i + iRow] = sorted[i];
         }
 
         x = xend + 1;
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