let SizeX = 1200;
let SizeY = 600;
let SizeH = 0;
function setup() {
  /*
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    console.log("Resizing...");
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });
  */
  //SizeX = displayWidth;
  //SizeY = displayHeight;
  SizeH = sqrt((SizeX * SizeX) + (SizeY *  SizeY));
  createCanvas(SizeX, SizeY);
  angleMode(DEGREES);
  //frameRate(30);
  noFill()
  strokeWeight(1.5);
}

function draw() {
  background(50,150,220);
  getInput();
  drawBackGrid();
  drawForeGrid();
}

let forePeriod = 20;
let foreCurveLen = 40;
let foreShiftX = 0;
let foreShiftY = 0;
let foreMoveX = 0;
let foreMoveY = 0;
let foreCurveX = 0;
let foreCurveY = 0;
let foreAngle = 0;
let foreGridType = 0;
function drawForeGrid() {
  push();
  if (foreGridType == 0) {
    
  
    translate(SizeX/2,SizeY/2)
    rotate(foreAngle);
    
    translate(foreShiftX,foreShiftY);
    makeSquareGrid(SizeH, forePeriod, SizeX/2, SizeY/2);
    translate(-SizeX/2,-SizeY/2)
  } else if (foreGridType == 1) {
    translate(foreMoveX,foreMoveY)
    makeCircularGrid(SizeH, forePeriod, SizeX/2, SizeY/2);
  } else if (foreGridType == 2) {
    translate(SizeX/2,SizeY/2)
    rotate(foreAngle);
    translate(foreCurveX,foreCurveY);
    makeWaveyGrid(SizeH, forePeriod,foreCurveLen, SizeX/2, SizeY/2)
    translate(-SizeX/2,-SizeY/2)
  }
  pop();
}

let backGridType = 0;
let backPeriod = 20;
let backCurveLen = 40;
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

function getInput() {
  
  //foregrid shifting
  if (keyIsDown(RIGHT_ARROW)) {
    if (foreGridType == 0) foreShiftX = (foreShiftX + 1) % forePeriod;
    if (foreGridType == 1) foreMoveX = (foreMoveX + 1) % SizeX;
    if (foreGridType == 2) foreCurveX = (foreCurveX + 1) % (foreCurveLen*2);
  } 
  if (keyIsDown(LEFT_ARROW)) {
    if (foreGridType == 0) foreShiftX = (foreShiftX - 1) % forePeriod;
    if (foreGridType == 1) foreMoveX = (foreMoveX - 1) % SizeX;
    if (foreGridType == 2) foreCurveX = (foreCurveX - 1) % (foreCurveLen*2);
  }
  if (keyIsDown(UP_ARROW)) {
    if (foreGridType == 0) foreShiftY = (foreShiftY - 1) % forePeriod;
    if (foreGridType == 1) foreMoveY = (foreMoveY - 1) % SizeY;
    if (foreGridType == 2) foreCurveY = (foreCurveY - 1) % (forePeriod);
  } 
  if (keyIsDown(DOWN_ARROW)) {
    if (foreGridType == 0) foreShiftY = (foreShiftY + 1) % forePeriod;
    if (foreGridType == 1) foreMoveY = (foreMoveY + 1) % SizeY;
    if (foreGridType == 2) foreCurveY = (foreCurveY + 1) % (forePeriod);
  }
  
  // foregrid period scaling
  if (keyIsDown(81)) { // key 'q'
    if (forePeriod < SizeX) forePeriod += 1;
    if (foreCurveLen < SizeX) foreCurveLen += 1;
  }
  if (keyIsDown(65)) { // key 'a'
    if (forePeriod > 5) forePeriod -= 1;
    if (foreCurveLen > 10) foreCurveLen -= 1;
  }
  
  // foregrid rotation
  if (keyIsDown(82)) { // key 'r'
    foreAngle = (foreAngle + 1) % 360;
  }
  if (keyIsDown(70)) { // key 'f'
    foreAngle = (foreAngle - 1) % 360;
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
  
  // foreColor
  /*
  if (key == 'e') { // key 'c'
    if( foreColor == red) {
      foreColor = green;
    } else if (foreColor == green) {
      foreColor = blue;
    } else if (foreColor == blue) {
      foreColor = red;
    }
  }
  if (key == 'd') { // key 'c'
    if( backColor == red) {
      backColor = green;
    } else if (foreColor == green) {
      backColor = blue;
    } else if (foreColor == blue) {
      backColor = red;
    } 
  }*/
  
  }
