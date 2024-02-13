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
    constructor(pos, vel, des, col, speed, r, img){
		this.pos = pos; // current position vector
        this.vel = vel; // current velocity
		this.des = des; // desired position
		this.speed = speed;
        this.r = r;
		this.col = col;
		this.img = img;
		this.done = false;
		this.watch = 2000;
	}
	show(){
        push();
        //normalMaterial();
		noStroke();
		//emissiveMaterial(this.col);
		specularMaterial(100);
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
        //texture(this.img);
        sphere(this.r);
		//pointLight(255,255,152,0,0,0);
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
		var chaos = p5.Vector.random3D();
		chaos = chaos.mult(this.speed);
		this.vel.add(chaos);
		this.vel.normalize();
		this.vel.mult(lerp(-10,this.pos.dist(this.des),perc));
		this.vel.limit(p5.Vector.dist(this.des,this.pos));

	}
	addVelocity() {
        this.pos.add(this.vel);
    }
	changeDes(vec) {
		this.des = vec;
	}
}

class starField {
	constructor(num, col, speed, rotSpeed, dist, rad) {
		this.num = num;
		this.col = col;
		this.speed = speed;
		this.rotSpeed = rotSpeed;
		this.rad = rad;
		this.field = [];
		this.fieldDest = createVector(0, random(50,dist));
		this.destY = random(30,80);
		this.yUP = true;
	}
	show() {
		push();
		this.fieldDest.rotate(this.rotSpeed);
		if (this.destY < -100) {
			this.yUP = false;
		} else if (this.destY > 80){
			this.yUP = true;
		}
		if (this.yUP) this.destY -= 2;
		if (!this.yUP) this.destY += 2;
		pointLight(this.col,0,0,0);
		for (var i = 0; i < this.num; i++) {
			fill(255,255,255);
			this.field[i].changeDes(createVector(this.fieldDest.x,this.destY,this.fieldDest.y));
			this.field[i].show();
		}
		pop();
	}
	setupField() {
		for (var part = 0; part < this.num; part++) {
			this.field[part] = new starParticle(
				createVector(0,0,0),
				createVector(50,-50,100),
				createVector(-200,0,0),
				this.col,
				this.speed,
				this.rad,
				macImage
			);
		}
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
    spaceImage = loadImage('./sky2.jpg');
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

	// num, col, speed, rotSpeed, dist, rad
	field1 = new starField(3,color(255,0,0),8,3,170,14);
	field1.setupField();
	field2 = new starField(8,color(0,255,0),4,-3,100,10);
	field2.setupField();
	field3 = new starField(2,color(0,0,255),2,10,60,18);
	field3.setupField();

	space =  new solarSystem(0,0,0,0,0,10,spaceImage);
	drawSpace();
	ambientLight(30,30,255,255);
	pointLight(255,255,152,0,0,0);
	drawBook();

	frameRate(60);
	
}
    

// draw() function is called repeatedly, it's the main animation loop
function draw() {
	if (!mouseIsPressed) {
		//ambientLight(30,30,255,255);
		pointLight(255,255,152,0,0,0);
	} else if (mouseIsPressed){
		drawSpace();
		//ambientLight(30,30,255,255);
		pointLight(255,255,152,0,0,0);
		drawBook();
	}
	orbitControl();
	
	/*
	for (iFrame = 0; iFrame < 12;iFrame++) {
		drawComets();
	}
	*/
	
	field1.show();
	field3.show();
	field2.show();
	
}

function drawComets() {
	//background(100);
    
    
}

function drawSpace() {
	push();
	normalMaterial();
	texture(spaceImage);
	sphere(800);
    pop();
}

function drawBook() {
	push();
	translate(0,150,0);
	rotateX(90);
	scale(10);
    normalMaterial();
    texture(bookTexture);
    model(book);
	
    pop();
}


  