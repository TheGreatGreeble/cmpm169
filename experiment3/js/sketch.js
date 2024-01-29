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
let gen = 0;
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
let girth = 50;

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
    if (gen < 5) { // only 5 generations
      
      gen++
      //len *=0.618;+
      let nextsentence = "";
      for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i); // get char in sentence
        // simple rule with an if then else
        if (current === 'S') { // if 'F' make substitution
          //nextsentence += "FF-[-F+F+F]+[+F-F-F]";
          nextsentence += "+SS--SS+";
          segs += 3;
        } else if(current === 'T') {
            nextsentence += "TS";
            segs++;
        } else if(current === '+') {
          nextsentence += "+S--S";
          segs+=2;
        } else if(current === '-') {
          nextsentence += "-S++S";
          segs+=2;
      } else { // else just append the terminal character +-[]
          nextsentence += current;
        }
      }
      sentence = nextsentence // 
      output.html(sentence);
      
      turtle();
  
    } else { // reset the tree and sentence, get random angle, call turtle 
      gen = 0;
      sentence = axiom;
      segs = 3;
      output.html(sentence);
      angle = random(-60, 60);
      turtle();
    }
    
    
  }
  
  function turtle() {
    updatePixels();
    let west = 90
    let curSeg = 0;
    let curLen = len/segs;
    let curAng = 330/segs;
    let angRot = 0;
    print("segments: " + segs);
    print("of Length: " + curLen);
    resetMatrix(); // need to reset the matrix each time through
    translate(startX, startY);
    rotate(startAng);
    west -= startAng;
    push();
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i); // get char in sentence
  
      switch (current) {
        case "T":
          let alp2 = map(gen, 0, 5, 255, 50); // mapping the alpha
  
          stroke(100, 100, 0, alp2);
          line(0, 0, 0, -curLen); // line from origin up
          translate(0, -curLen); // move to the end of the line
          //rotate(curAng);
          break;
        case "H":
          let alp3 = map(gen, 0, 5, 255, 50); // mapping the alpha
  
          stroke(200, 255, 200, alp3);
          line(0, 0, 0, -curLen); // line from origin up
          translate(0, -curLen); // move to the end of the line
          //rotate(curAng);
          break;
        case "S":
          let alp1 = map(gen, 0, 5, 255, 50); // mapping the alpha
  
          stroke(0, 255, 0, alp1);
          line(0, 0, 0, -curLen); // line from origin up
          translate(0, -curLen); // move to the end of the line
          //rotate(curAng);
          break;
        case "C":
          let alp4 = map(gen, 0, 5, 255, 50); // mapping the alpha
  
          stroke(255, 100, 10, alp4);
          line(0, 0, 0, -curLen); // line from origin up
          translate(0, -curLen); // move to the end of the line
          //rotate(curAng);
          break;
        case "+":
          //angRot = round(random(-90,90));
          rotate(45);
          west -= 45;
          break;
        case "-":
          //angRot = round(random(-90,90));
          rotate(-45);
          west -= -45;
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