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
let axiom = "F";
let sentence = axiom;
let mybutton;
let len = 100
let cvs;
let output;

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
      len *= 0.5;
      gen++
      //len *=0.618;
      let nextsentence = "";
      for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i); // get char in sentence
        // simple rule with an if then else
        if (current === 'F') { // if 'F' make substitution
          nextsentence += "FF+[+F-F-F]-[-F+F+F]";
        } else { // else just append the terminal character +-[]
          nextsentence += current;
        }
      }
      sentence = nextsentence // 
      output.html(sentence);
      turtle();
  
    } else { // reset the tree and sentence, get random angle, call turtle 
      gen = 0;
      sentence = "F";
      output.html(sentence);
      len = 100;
      angle = random(-60, 60);
      turtle();
    }
  }
  
  function turtle() {
    background(0);
    resetMatrix(); // need to reset the matrix each time through
    translate(width / 2, height);
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i); // get char in sentence
  
      switch (current) {
        case "F":
          let alp = map(gen, 0, 5, 255, 50); // mapping the alpha
  
          stroke(0, 255, 0, alp);
          line(0, 0, 0, -len); // line from origin up
          translate(0, -len); // move to the end of the line
          break;
        case "+":
          rotate(angle); //PI/6
          break;
        case "-":
          rotate(-angle); //PI/6
          break;
        case "[":
          push();
          break;
        case "]":
          pop();
          break;
      }
    }
  }