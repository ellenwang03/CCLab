/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new EllenDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class EllenDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    //keep record of original starting points
    this.originalX = startX;
    this.originalY = startY;
    // add properties for your dancer here:
    this.bounceSpeed = 0.05; 
    this.bounceRange = 30; 
    this.mouthY = 5; 
    this.mouthDirection = .3; //direction 
  
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour

    this.eyeMovement = sin(frameCount * 0.1) * 4 + 4;
    this.legAngle = sin(frameCount * 0.1) * PI / 4 ;
    this.armAngle = sin(frameCount * 0.1) * PI / 4;
    this.legMovement = sin(frameCount * 0.1) * 20;
    this.y = this.originalY + sin(frameCount * this.bounceSpeed) * this.bounceRange;

    this.mouthY += this.mouthDirection * 1; 
    if (this.mouthY >= 13 || this.mouthY <= 5) { //bigger than 13 or smaller than 5
      this.mouthDirection *= -1; // reverse direction
    }
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    //legs
    push();
      translate(-12, 60);
      fill(255, 245, 238);
      ellipse(3, this.legMovement, 15, 35); // position of legs 
    pop();

    push();
      translate(12, 60);
      fill(255, 245, 238);
      ellipse(-3, -this.legMovement, 15, 35); // position of legs
    pop();

    //head
    fill(255,182,193);
    ellipse(0,0,65,58);

    //eyes
    fill(0);
    circle(-18 + this.eyeMovement,-5,3); //eye moving from side to side
    circle(8+ this.eyeMovement,-5,3); 
    strokeWeight(2);
    line(-18,-7,-7,-7); 
    line(7,-7,18,-7); 

    //mouth
    push();
    fill(0);
    noStroke();
    ellipse(0,10,10,this.mouthY);
    pop();

    //body
    noStroke();
    fill(255,182,193);
    ellipse(0,45,40,50);

    //arms
    push();
      translate(-15, 35);
      rotate(this.armAngle); // movement of arms
      fill(255, 245, 238);
      ellipse(-15, 0, 32, 15);
      //reference
      // fill("red");
      // circle(0, 0, 5);
    pop();

    push();
      translate(15, 35);
      rotate(-this.armAngle); 
      fill(255, 245, 238);
      ellipse(-15, 0, 32, 15);
      //reference
      // fill("red");
      // circle(0, 0, 5);
    pop();

    //hat 
    push();
      fill(175, 225, 175);
      triangle(0,-50,-13,-20,13,-20);
      fill(236, 255, 220);
      circle(0,-50,7);

      fill(236, 255, 220);
      circle(0,-24,5);
      circle(8,-24,5);
      circle(-8,-24,5);
      circle(4,-32,5);
      circle(-4,-32,5);
      circle(0,-40,5);
    pop();
    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}

/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/