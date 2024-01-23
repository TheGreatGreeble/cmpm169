// sketch.js - Experiment 2 code for making Moire Patterns 
// Author: Evan Lake
// Date: 1/22/2024

let SizeX = 1200;
let SizeY = 600;
let SizeH = 0;
function setup() {
  
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    console.log("Resizing...");
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });
  
  SizeX = canvasContainer.width();
  SizeY = canvasContainer.height();
  SizeH = sqrt((SizeX * SizeX) + (SizeY *  SizeY));
  //createCanvas(SizeX, SizeY);
  angleMode(DEGREES);
  //frameRate(30);
  noFill()
}

function draw() {
  background(50,150,220);
  getInput();
  drawBackGrid();
  drawForeGrid();
  print (forePeriod + " : " + foreHyp);
}

let forePeriod = 30;
let foreCurveLen = 120;
let foreShiftX = 0;
let foreShiftY = 0;
let foreMoveX = 0;
let foreMoveY = 0;
let foreCurveX = 0;
let foreCurveY = 0;
let foreAngle = 0;
let foreGridType = 0;
let foreWeight = 3;
function drawForeGrid() {
  
  strokeWeight(foreWeight);
  if (foreGridType == 0) {
    push();
    translate(foreShiftX,foreShiftY);
    translate(SizeX/2,SizeY/2)
    rotate(foreAngle);
    makeSquareGrid(SizeH, forePeriod, SizeX/2, SizeY/2);
    translate(-SizeX/2,-SizeY/2);
    pop();
    
  } else if (foreGridType == 1) {
    push();
    translate(foreMoveX,foreMoveY);
    makeCircularGrid(SizeH, forePeriod, SizeX/2, SizeY/2);
    pop();
  } else if (foreGridType == 2) {
    push();
    translate(SizeX/2,SizeY/2)
    rotate(foreAngle);
    translate(foreCurveX,foreCurveY);
    makeWaveyGrid(SizeH, forePeriod,foreCurveLen, SizeX/2, SizeY/2)
    translate(-SizeX/2,-SizeY/2);
    pop();
  }
  
}

let backGridType = 0;
let backPeriod = 30;
let backCurveLen = 60;
function drawBackGrid() {
  push();
  if (backGridType == 0) {
    makeSquareGrid(SizeH, backPeriod, SizeX/2, SizeY/2);
  } else if (backGridType == 1) {
    makeCircularGrid(SizeH, backPeriod, SizeX/2, SizeY/2);
  } else if (backGridType == 2) {
    makeWaveyGrid(SizeH, backPeriod,backCurveLen, SizeX/2, SizeY/2)
  }
  
  pop();
}

function makeSquareGrid(gSize, period, x, y) {
  for(i = -(gSize); i < (gSize + gSize/2); i+=period) {
    //draw horizontal line
    line(-x-gSize, i, x+gSize, i)
    //draw vertical line
    line(i, -y-gSize, i, y+gSize)  
  }
}

function makeCircularGrid(gSize, period, x, y) {
  for(i = period; i < gSize*3; i+=period) {
    circle(x,y, i)  
  }
}

function makeWaveyGrid(gSize, period, curveLen, x, y) {
  
  for(i = -(gSize); i < (gSize + gSize/2); i+=(curveLen*2)) {
    for (j = -gSize; j < (gSize + gSize/2); j+=period) {
      bezier(
        i,j,
        i+(curveLen/2),j,
        i+(curveLen/2),j+period,
        i+curveLen,j+period
      );
      bezier(
        i+curveLen,j+period,
        i+curveLen+(curveLen/2),j+period,
        i+curveLen+(curveLen/2),j,
        i+(curveLen*2),j
      );
    }
  }
}

// This code sourced from :https://www.fwait.com/how-to-disable-scrolling-with-arrow-keys-in-javascript/
//[
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
      e.preventDefault();
      break;
  }
});
//]

let angRad = foreAngle * Math.PI/180;
let foreHyp = Math.sqrt(forePeriod*forePeriod * 2);
function getInput() {
  //foregrid shifting
  
  
  if (keyIsDown(RIGHT_ARROW)) {
    if (foreGridType == 0) {
      foreShiftX = (foreShiftX + 1) % (6*(lerp(forePeriod,foreHyp,(Math.abs(foreAngle)/45))));
    } 
    else if (foreGridType == 1) foreMoveX = (foreMoveX + 2) % SizeX;
    else if (foreGridType == 2) {
      foreCurveX = (foreCurveX + 2) % (foreCurveLen*2);
    }
  } 
  if (keyIsDown(LEFT_ARROW)) {
    if (foreGridType == 0)  {
      foreShiftX = (foreShiftX - 1) % (6*(lerp(forePeriod,foreHyp,(Math.abs(foreAngle)/45))));
    }
    if (foreGridType == 1) foreMoveX = (foreMoveX - 2) % SizeX;
    if (foreGridType == 2) foreCurveX = (foreCurveX - 2) % (foreCurveLen*2);
  }
  if (keyIsDown(UP_ARROW)) {
    if (foreGridType == 0) {
      foreShiftY = (foreShiftY - 1) % (6*(lerp(forePeriod,foreHyp,(Math.abs(foreAngle)/45))));
    }
    if (foreGridType == 1) foreMoveY = (foreMoveY - 2) % SizeY;
    if (foreGridType == 2) foreCurveY = (foreCurveY - 2) % (forePeriod);
  } 
  if (keyIsDown(DOWN_ARROW)) {
    if (foreGridType == 0) {
      foreShiftY = (foreShiftY + 1) % (6*(lerp(forePeriod,foreHyp,(Math.abs(foreAngle)/45))));
    }
    if (foreGridType == 1) foreMoveY = (foreMoveY + 2) % SizeY;
    if (foreGridType == 2) foreCurveY = (foreCurveY + 2) % (forePeriod);
  }
  
  // foregrid period scaling
  if (keyIsDown(81)) { // key 'q'
    if (forePeriod < SizeX) forePeriod += 1;
    if (foreCurveLen < SizeX) foreCurveLen += 1;
    foreHyp = Math.sqrt(forePeriod*forePeriod * 2);
  }
  if (keyIsDown(65)) { // key 'a'
    if (forePeriod > 5) forePeriod -= 1;
    if (foreCurveLen > 10) foreCurveLen -= 1;
    foreHyp = Math.sqrt(forePeriod*forePeriod * 2);
  }
  
  

  // foregrid rotation
  if (keyIsDown(82)) { // key 'r'
    foreAngle = (foreAngle + 1) % 360;
    angRad = foreAngle * Math.PI/180;
  }
  if (keyIsDown(70)) { // key 'f'
    foreAngle = (foreAngle - 1) % 360;
    angRad = foreAngle * Math.PI/180;
  }
  
  
  
  
}

function keyPressed() {
    // foreGrid type 
    
    if (key === 'w' || key === 'W') { // key 'w'
      foreGridType = (foreGridType + 1) % 3;
    }
    if (keyCode ==  83) { // key 's'
      backGridType = (backGridType + 1) % 3;
    }

    // foregrid thickness
    if (keyIsDown(69)) { // key 'e'
      if (foreWeight <= 6) foreWeight = foreWeight + 1;
      else foreWeight = 3
    }
    if (keyIsDown(68)) { // key 'd'
      if (foreWeight >= 3) foreWeight = (foreWeight - 1);
      else foreWeight = 6;
    }
  
  }
