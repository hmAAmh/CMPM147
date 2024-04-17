/* exported setup, draw */
let seed = 0;

const grassColor = "#8fba82";
const waterColor = "#32639d";
const lilyPadNum = 30;
let lilyPads = [];
const stoneNum = 23;
let stones = [];



function setup() {

  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

	createButton("reimagine").mousePressed(() => reset());
  
  randomSeed(seed);
	background(grassColor);
  
  fill(50, 99, 157);
  ellipse(width / 2, height, 500, 250);

  for(let i = 0; i < lilyPadNum; i++)
  {
    lilyPads[i] = new LilyPad();
  }
  
  for(let i = 0; i < stoneNum; i++)
  {
    stones[i] = new Stone();
  }
  background(grassColor);
  drawWater();
}

function draw() {
  
  
  if(millis() % 15 == 0)
  {
    background(grassColor);
    drawWater();
  }
  
  for(let i = 0; i < lilyPadNum; i++)
  {
    lilyPads[i].draw();
  }
  for(let i = 0; i < stoneNum; i++)
  {
    stones[i].draw();
  }
}

class LilyPad {
  constructor() {
    this.reconstruct();
  }
  
  reconstruct() {
    this.x = random((width / 6), 5 * (width / 6));
    this.y = random(height / 2) + 4 * height / 7;
    this.diameter = random(10, 30);
    this.yOffset = random(1, 3);
    this.timeOffset = random(300, 600);
  }
  
  draw() {
    stroke(179, 194, 137);
    fill(179, 194, 137);
    ellipse(this.x, this.y + sin(millis() / this.timeOffset) * this.yOffset, this.diameter, this.diameter);
  }
}

class Stone {
  constructor() {
    this.reconstruct();
  }
  
  reconstruct() {
    this.x = random(width);
    this.y = random(height / 3);
    this.diameter = random(30, 50);
  }
  
  draw() {
    stroke(216, 182, 154);
    fill(216, 182, 154);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

function drawWater() 
{
  stroke(waterColor);
  fill(waterColor);
  beginShape();
  vertex(0, height);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      ((height / 2 - (random() * random() * random() * height) / 4 - height / 50) * (sin(width / i)) / 8) + height / 2;
    //let y = sin(width / i) * height;
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);
}
function reset()
{
  seed++;
  
  background(grassColor);
  drawWater();
  
  for(let i = 0; i < lilyPadNum; i++)
  {
    lilyPads[i].reconstruct();
  }
  
  for(let i = 0; i < stoneNum; i++)
  {
    stones[i].reconstruct();
  }
}


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}



/**

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
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}



// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);    
  // call a method on the instance
  myInstance.myMethod();

  // Set up rotation for the rectangle
  push(); // Save the current drawing context
  translate(centerHorz, centerVert); // Move the origin to the rectangle's center
  rotate(frameCount / 100.0); // Rotate by frameCount to animate the rotation
  fill(234, 31, 81);
  noStroke();
  rect(-125, -125, 250, 250); // Draw the rectangle centered on the new origin
  pop(); // Restore the original drawing context

  // The text is not affected by the translate and rotate
  fill(255);
  textStyle(BOLD);
  textSize(140);
  text("p5*", centerHorz - 105, centerVert + 40);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}

**/