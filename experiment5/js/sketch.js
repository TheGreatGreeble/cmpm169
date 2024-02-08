// sketch.js - purpose and description here
// Author: Your Name
// Date:
class solarSystem{
	constructor(x,y,z,ry,ry2,r,img){
		this.x=x
		this.y=y
		this.z=z
		this.ry=ry
		this.ry2=ry2
		this.r=r
		this.img=img
	}
	show(){
        push();
        normalMaterial();
        rotateY(this.ry);
        translate(this.x,this.y,this.z);
        texture(this.img);
        rotateY(this.ry2);
        sphere(this.r);
        pop();
	}
	rotateLeft(){
		this.ry2+=2;
	}
	orbitMercury(){
		this.ry-=15;
	}
	orbitVenus(){
		this.ry-=13;
	}
	orbitEarth(){
		this.ry-=10;
	}
	orbitMars(){
		this.ry-=8;
	}
	orbitJupiter(){
		this.ry-=5;
	}
	orbitSaturn(){
		this.ry-=3;
	}
	orbitUranus(){
		this.ry-=2;
	}
	orbitNeptune(){
		this.ry-=1;
	}
}

class starParticle{
    constructor(x,y,z, speed, r, img){
		this.x=x
		this.y=y
		this.z=z
        this.speed = speed;
        this.r = r;
		this.img=img
	}
	show(){
        push();
        normalMaterial();
        translate(this.x,this.y,this.z);
        texture(this.img);
        sphere(this.r);
        pop();
	}
	moveUp() {
        this.y -= this.speed;
    }
    moveDown() {
        this.y += this.speed;
    }
}
// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js
// Globals
let myInstance;
let canvasContainer;
let sunImage;
function preload() {
    book = loadModel('./BookModel.obj');
    bookTexture = loadImage('./BookTextures/book_open_low_1001_BaseColor.png');
    macImage = loadImage('./macEssence.jpg');
    sunImage = macImage;
    mercuryImage = macImage;
    venusImage = macImage;
    earthImage = macImage;
    marsImage = macImage;
    jupiterImage = macImage;
    suturnImage = macImage;
    uranusImage = macImage;
    neptuneImage = macImage;
    spaceImage = macImage;
    angleMode(DEGREES);
	
}

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    background(100);
    macComet = new starParticle(0,0,0,2,30,macImage);
	sun= new solarSystem(0,0,0,0,0,100,sunImage);
	mercury = new solarSystem(140,0,0,0,0,20,mercuryImage);
	venus = new solarSystem(300,0,0,0,0,60,venusImage);
	earth = new solarSystem(450,0,0,0,0,70,earthImage);
	mars = new solarSystem(650,0,0,0,0,50,marsImage);
	jupiter = new solarSystem(850,0,0,0,0,90,jupiterImage);
	saturn = new solarSystem(1050,0,0,0,0,80,suturnImage);
	uranus = new solarSystem(1350,0,0,0,0,60,uranusImage);
	neptune = new solarSystem(1650,0,0,0,0,60,neptuneImage);
	space =  new solarSystem(0,0,0,0,0,2000,spaceImage);
}
    
var testGo = false;
// draw() function is called repeatedly, it's the main animation loop
function draw() {
	orbitControl(); 
	background(100);
    push();
    normalMaterial();
    texture(bookTexture);
    model(book);
    pop();
    if (macComet.y >= 200) testGo = true;
    else if (macComet.y < -200) testGo = false;;
    if (testGo) {
        macComet.moveUp()
    } else  {
        macComet.moveDown()
    }
    
    macComet.show();
	sun.show();
	mercury.show();
	mercury.rotateLeft();
	mercury.orbitMercury();
	venus.show();
	venus.rotateLeft();
	venus.orbitVenus();
	earth.show();
	earth.rotateLeft();
	earth.orbitEarth();
	mars.show();
	mars.rotateLeft();
	mars.orbitMars();
	jupiter.show();
	jupiter.rotateLeft();
	jupiter.orbitJupiter();
	saturn.show();
	saturn.rotateLeft();
	saturn.orbitSaturn();
	uranus.show();
	uranus.rotateLeft();
	uranus.orbitUranus();
	neptune.show();
	neptune.rotateLeft();
	neptune.orbitNeptune();
	space.show();
}

  