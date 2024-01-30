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

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}


let angle = 25;
let gen = 1;
let axiom = "TSH";
let sentence = axiom;
let mybutton;
let len = 500;
let netLen;
let cvs;
let output;
let startX;
let startY;
let startAng;
let endX;
let endY;
let endAng;
let segs = 3;
let girth = 10;

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
    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;

    background(0);

    angleMode(DEGREES);
    stroke(0, 255, 0, 100);
    //noCanvas();
    mybutton = select("#button");
    mybutton.mousePressed(generate);
    output = select('#output');
    output.html(axiom);
    //translate(width/2,height);
    netLen = width - (girth*4);
    len = netLen;
    startX = girth*2;
    startY = height/2;
    startAng = 90;
    color1 = color(6, 80, 80);
    color2 = color(0, 0, 0);
    //noLoop(); // Redraw only once
    for (let x = 0; x < width; x+=2) {
      for (let y = 0; y < height; y+=3) {
        // Use the noise() function to generate a Perlin noise value for each pixel
        let noiseValue = noise(x * 0.01, y * 0.01) * 2 - 1; // Normalize noise to a range of -1 to 1
        
        // Interpolate between color1 and color2 based on the noise value
        let blendedColor = lerpColor(color1, color2, (noiseValue + 1) / 2);
        
        // Set the pixel color
        set(x, y, blendedColor);
      }
    }
    
    // Update the canvas to reflect the changes
    updatePixels();

    turtle();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    //background(220);    
    // call a method on the instance
    //myInstance.myMethod();

    // Put drawings here
}

function generate() {
    console.log(gen);
    if (gen < 5) { // only 4 generations
      
      gen++
      //len *=0.618;+
      let nextsentence = "";
      for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i); // get char in sentence
        // simple rule with an if then else
        if (current === 'S') { // if 'S' make substitution
          if (random(-1,1) > 0) {
            nextsentence += "L+S-K";
          } else {
            nextsentence += "K-S+L";
          }
          segs += 2;
        } else if(current === 'K') {
          if (random(-1,1) > 0) {
            nextsentence += "S--S++S++S--S";
          } else {
            nextsentence += "S++S--S--S++S";
          }
          segs += 3;
        } else if(current === 'L') {
          if (random(-1,1) > 0) {
            nextsentence += "S-SS--S--S--SS-S";
          } else {
            nextsentence += "S+SS++S++S++SS+S";
          }
          
          segs+=3;
        } else if(current === '+') {
          nextsentence += "+";
          segs+=0;
        } else if(current === '-') {
          nextsentence += "-";
          segs+=0;
      } else { // else just append the terminal character +-[]
          nextsentence += current;
        }
      }
      sentence = nextsentence // 
      output.html(sentence + "\n " + segs + " Segments of length " + len/segs + "=" + segs * (len/segs));
      
      turtle();
  
    } else { // reset the tree and sentence, get random angle, call turtle 
      gen = 1;
      sentence = axiom;
      segs = 3;
      output.html(sentence + "\n " + segs + " Segments of length " + len/segs + "=" + segs * (len/segs));
      angle = random(-60, 60);
      turtle();
    }
    
    
  }
  
  function turtle() {
    updatePixels();
    //let curPoint = createVector(0,0,0); // x, y, angle
    let is45 = false;
    let segLen = len/segs; // segment length
    let seg45Len = segLen * Math.sqrt(2);
    let curXSeg = 0;
    let netXLen = 0;
    let netYPos = startY;
    let bounceYLine = height/(gen+1)
    print("segments: " + segs);
    print("of Length: " + segLen);
    resetMatrix(); // need to reset the matrix each time through
    translate(startX, startY);
    rotate(startAng);
    let curDir = 0;
    //curPoint.Add(startX,startY,startAng);
    strokeCap(SQUARE);

    push();
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i); // get char in sentence
  
      switch (current) {
        case "T":
  
          //stroke(100, 100, 0);
          stroke(200,200,255)
          strokeWeight(girth/gen + girth/gen/2);
          line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
          stroke(6, 90, 90)
          strokeWeight(girth/gen);
          line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
          translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line

          
          //stroke(10,10,255);
          //compensate for y direction
          if (-4 < curDir && curDir < 0) {
            // if going down
            netYPos -= segLen;
            while (netYPos > height-bounceYLine) {
              // if we are above bounceback line and going down
              // extend down 1 seg
              stroke(200,200,255)
              strokeWeight(girth/gen + girth/gen/2);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              stroke(6, 90, 90)
              strokeWeight(girth/gen);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line
              if (curDir == -1) {
                netXLen++;
              } else if (curDir == -3) {
                netXLen--;
              }
              netYPos -= segLen;
            }
          } else if (4 > curDir && curDir > 0) {
            // if going up
            netYPos += segLen;
            while (netYPos < bounceYLine) {
              // if we are below bounceback line and going up
              // extend up 1 seg
              stroke(200,200,255)
              strokeWeight(girth/gen + girth/gen/2);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              stroke(6, 90, 90)
              strokeWeight(girth/gen);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line
              if (curDir == 1) {
                netXLen++;
              } else if (curDir == 3) {
                netXLen--;
              }
              netYPos += segLen;
            }
          }

          // compensate for x direction
          if (Math.abs(curDir) < 2) {
            curXSeg++;
            netXLen++;
            // if going right
            if (netXLen < curXSeg) {
              //stroke(255,10,10);
              stroke(200,200,255)
              strokeWeight(girth/gen + girth/gen/2);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              stroke(6, 90, 90)
              strokeWeight(girth/gen);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line
              netXLen++;
            }

          } else if (Math.abs(curDir) > 2) {
            // if going left
            curXSeg++;
            //netXLen--;

          }
          break;
        case "H":
          
          //stroke(200, 255, 200);
          stroke(200,200,255)
          strokeWeight(girth/gen + girth/gen/2);
          line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
          stroke(6, 90, 90)
          strokeWeight(girth/gen);
          line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
          translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line

          //stroke(10,10,255);
          //compensate for y direction
          if (-4 < curDir && curDir < 0) {
            // if going down
            netYPos -= segLen;
            while (netYPos > height-bounceYLine) {
              // if we are above bounceback line and going down
              // extend down 1 seg
              stroke(200,200,255)
              strokeWeight(girth/gen + girth/gen/2);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              stroke(6, 90, 90)
              strokeWeight(girth/gen);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line
              if (curDir == -1) {
                netXLen++;
              } else if (curDir == -3) {
                netXLen--;
              }
              netYPos -= segLen;
            }
          } else if (4 > curDir && curDir > 0) {
            // if going up
            netYPos += segLen;
            while (netYPos < bounceYLine) {
              // if we are below bounceback line and going up
              // extend up 1 seg
              stroke(200,200,255)
              strokeWeight(girth/gen + girth/gen/2);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              stroke(6, 90, 90)
              strokeWeight(girth/gen);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line
              if (curDir == 1) {
                netXLen++;
              } else if (curDir == 3) {
                netXLen--;
              }
              netYPos += segLen;
            }
          }

          // compensate for x direction
          if (Math.abs(curDir) < 2) {
            curXSeg++;
            netXLen++;
            // if going right
            if (netXLen < curXSeg) {
              //stroke(255,10,10);
              stroke(200,200,255)
              strokeWeight(girth/gen + girth/gen/2);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              stroke(6, 90, 90)
              strokeWeight(girth/gen);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line
              netXLen++;
            }

          } else if (Math.abs(curDir) > 2) {
            // if going left
            curXSeg++;
            //netXLen--;

          } else {
            // if going up or down
          }
          break;
        case "S":
        case "K":
        case "L":
  
          //stroke(0, 255, 0);
          stroke(200,200,255)
          strokeWeight(girth/gen + girth/gen/2);
          line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
          stroke(6, 90, 90)
          strokeWeight(girth/gen);
          line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
          translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line

          //stroke(10,10,255);
          //compensate for y direction
          if (-4 < curDir && curDir < 0) {
            // if going down
            netYPos -= segLen;
            while (netYPos > height-bounceYLine) {
              // if we are above bounceback line and going down
              // extend down 1 seg
              stroke(200,200,255)
              strokeWeight(girth/gen + girth/gen/2);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              stroke(6, 90, 90)
              strokeWeight(girth/gen);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line
              if (curDir == -1) {
                netXLen++;
              } else if (curDir == -3) {
                netXLen--;
              }
              netYPos -= segLen;
            }
          } else if (4 > curDir && curDir > 0) {
            // if going up
            netYPos += segLen;
            while (netYPos < bounceYLine) {
              // if we are below bounceback line and going up
              // extend up 1 seg
              stroke(200,200,255)
              strokeWeight(girth/gen + girth/gen/2);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              stroke(6, 90, 90)
              strokeWeight(girth/gen);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line
              if (curDir == 1) {
                netXLen++;
              } else if (curDir == 3) {
                netXLen--;
              }
              netYPos += segLen;
            }
          }

          // compensate for x direction
          if (Math.abs(curDir) < 2) {
            curXSeg++;
            netXLen++;
            // if going right
            if (netXLen < curXSeg) {
              //stroke(255,10,10);
              stroke(200,200,255)
              strokeWeight(girth/gen + girth/gen/2);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              stroke(6, 90, 90)
              strokeWeight(girth/gen);
              line(0, 0, 0, ((is45) ? -seg45Len : -segLen)); // line from origin up
              translate(0, ((is45) ? -seg45Len : -segLen)); // move to the end of the line
              netXLen++;
            }

          } else if (Math.abs(curDir) > 2) {
            // if going left
            curXSeg++;
            //netXLen--;

          } else {
            // if going up or down
          }
          break;
        case "+":
          //angRot = round(random(-90,90));
          rotate(45);
          curDir++;
          if (curDir > 4) curDir = -3;
          is45 = !is45;
          break;
        case "-":
          //angRot = round(random(-90,90));
          rotate(-45);
          curDir--;
          if (curDir < -4) curDir = 3;
          is45 = !is45;
          break;
        case "[":
          push();
          break;
        case "]":
          pop();
          break;
      }
    }
    pop();
  }