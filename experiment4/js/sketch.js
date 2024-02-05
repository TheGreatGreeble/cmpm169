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
    imgPixels = imgSrcPixels.slice();
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
 
 var sortArea = 10;
 function hueSort() {
    // select random point in image
    var posX = random(imgSrc.width-sortArea);
    var posY = random(imgSrc.height-sortArea);

    //get array array of effected area
    var iRow;
    var unsorted = [];

    for (var i = 0; i < sortArea; i++) {
        var inUnsorted = [];
        iRow = (posY + i) * imgSrc.width;
        for (var j = 0; j < sortArea; j++) {
            inUnsorted[j] = imgPixels[iRow+posX+j];
        }
        unsorted[i] = inUnsorted;
    }

    // sort that area by hue
    var sorted = [];
    /*
    for(var i = 0; i < sortArea; i++) {
        for(var j = 0; j < sortArea; j++) {
            sorted[i][j] = unsorted[i][j];
        }
    }
    */

    // set sorted area
    for (var i = 0; i < sortArea; i++) {
        //row
        for (var j = 0; j < sortArea; j++) {
            //imgPixels[posX] = sorted[];
        }
        unsorted[i] = inUnsorted;
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
 function sortColumn() 
 {
     // current column
     var x = column;
 
     // where to start sorting
     var y = 0;
 
     // where to stop sorting
     var yend = 0;
 
     while (yend < height - 1) {
         switch (mode) {
             case 0:
                 y = getFirstNotBlackY(x, y);
                 yend = getNextBlackY(x, y);
                 break;
             case 1:
                 y = getFirstBrightY(x, y);
                 yend = getNextDarkY(x, y);
                 break;
             case 2:
                 y = getFirstNotWhiteY(x, y);
                 yend = getNextWhiteY(x, y);
                 break;
             default:
                 break;
         }
 
         if (y < 0) break;
 
         var sortLength = yend - y;
 
         var unsorted = [];
         var sorted = [];
 
         for (var i = 0; i < sortLength; i++) {
             unsorted[i] = imgPixels[x + (y + i) * imgSrc.width];
         }
 
         sorted = sort(unsorted);
 
         for (var i = 0; i < sortLength; i++) {
             imgPixels[x + (y + i) * imgSrc.width] = sorted[i];
         }
 
         y = yend + 1;
     }
 }
 // black x
 function getFirstNotBlackX( x, y )
 {
     var iRow = y * imgSrc.width;
     while (imgPixels[x + iRow] < blackValue) {
         x++;
         if (x >= width)
             return -1;
     }
     return x;
 }
 // black y
 function getFirstNotBlackY( x, y )
 {
     if (y < height) {
         while (imgPixels[x + y * imgSrc.width] < blackValue) {
             y++;
             if (y >= height)
                 return -1;
         }
     }
     return y;
 }
 function getNextBlackX( x, y )
 {
     x++;
     var iRow = y * imgSrc.width;
     while (imgPixels[x + iRow] > blackValue) {
         x++;
         if (x >= width)
             return width - 1;
     }
     return x - 1;
 }
 function getNextBlackY( x, y )
 {
     y++;
     if (y < height) {
         while (imgPixels[x + y * imgSrc.width] > blackValue) {
             y++;
             if (y >= height)
                 return height - 1;
         }
     }
     return y - 1;
 }
 // brightness x
 function getFirstBrightX( x, y )
 {
     var iRow = y * imgSrc.width;
     while (brightness2(imgPixels[x + iRow]) < brightnessValue) {
         x++;
         if (x >= width)
             return -1;
     }
     return x;
 }
 function getNextDarkX( _x, _y )
 {
     var x = _x + 1;
     var y = _y;
 
     var iRow = y * imgSrc.width;
     while (brightness2(imgPixels[x + iRow]) > brightnessValue) {
         x++;
         if (x >= width) return width - 1;
     }
     return x - 1;
 }
 // white x
 function getFirstNotWhiteX( x, y )
 {
     var iRow = y * imgSrc.width;
     while (imgPixels[x + iRow] > whiteValue) {
         x++;
         if (x >= width)
             return -1;
     }
     return x;
 }
 function getNextWhiteX( x, y )
 {
     x++;
     var iRow = y * imgSrc.width;
     while (imgPixels[x + iRow] < whiteValue) {
         x++;
         if (x >= width)
             return width - 1;
     }
     return x - 1;
 }
 // brightness y
 function getFirstBrightY( x, y )
 {
     if (y < height) {
         while (brightness2(imgPixels[x + y * imgSrc.width]) < brightnessValue) {
             y++;
             if (y >= height)
                 return -1;
         }
     }
     return y;
 }
 function getNextDarkY( x, y )
 {
     y++;
     if (y < height) {
         while (brightness2(imgPixels[x + y * imgSrc.width]) > brightnessValue) {
             y++;
             if (y >= height)
                 return height - 1;
         }
     }
     return y - 1;
 }