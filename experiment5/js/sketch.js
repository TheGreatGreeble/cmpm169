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
    constructor(pos, vel, des, speed, r, img){
		this.pos = pos; // current position vector
        this.vel = vel; // current velocity
		this.des = des; // desired position
		this.speed = speed;
        this.r = r;
		this.img=img
		this.done = false;
		this.watch = 2000;
	}
	show(){
        push();
        normalMaterial();
		if (this.done == false) {
			if (this.watch > 100) {
				this.updateVelocity(0.2);
				this.watch = 0;
			}
			this.watch += deltaTime;
			this.addVelocity();
		}
		translate(this.pos.x,this.pos.y,this.pos.z);
		this.checkPos();
        texture(this.img);
        sphere(this.r);
        pop();
	}
	checkPos() {
		if ((p5.Vector.sub(this.pos,this.des)).mag() < 0.1) {
			this.done = true;
		} else {
			this.done = false;
		}
	}
	updateVelocity(perc) {
		var temp = p5.Vector.sub(this.des, this.pos);
		this.vel.lerp(temp, perc);
		this.vel.add((p5.Vector.random3D()).mult(this.speed));
		this.vel.normalize();
		this.vel.mult(lerp(-10,this.pos.dist(this.des),perc));
		this.vel.limit(p5.Vector.dist(this.des,this.pos))

	}
	addVelocity() {
        this.pos.add(this.vel);
    }
	changeDes(vec) {
		this.des = vec;
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

var starDest;
var comets = [];
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

	angleMode(DEGREES);
    background(100);
	starDest = createVector(0, 150);
	for (i = 0; i < 7; i++) {
		comets[i] = new starParticle(
			createVector(0,0,0),
			createVector(50,-50,100),
			createVector(-200,0,0),
			5,15,macImage
		);
	}
	sun= new solarSystem(0,0,0,0,0,1,sunImage);
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
var destY = 100;
var yUP = true;
// draw() function is called repeatedly, it's the main animation loop
function draw() {
	orbitControl(); 
	//background(100);
    push();
	translate(0,150,80);
	rotateX(90);
	scale(10);
    normalMaterial();
    texture(bookTexture);
    model(book);
    pop();
	space.show();
    
	//starDest.add(random(-50,50),random(-50,50),random(-50,50))
	//starDest.limit(100);
	starDest.rotate(3);
	if (destY < -100) {
		yUP = false;
	} else if (destY > 100){
		yUP = true;
	}
	if (yUP) destY -= 2;
	if (!yUP) destY += 2;
	for (i = 0; i < 7; i++) {
		comets[i].changeDes(createVector(starDest.x,destY,starDest.y));
		comets[i].show();
	}
	sun.x = starDest.x;
	sun.y = destY;
	sun.z = starDest.y;
	sun.show();
    
	/*
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
	*/
}

  