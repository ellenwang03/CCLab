console.log("hihi")

let sinInput = 0;
let scaleFactor = 100;
let mouseXPos, mouseYPos;

let x = [];
let y = [];
// iNum = 5;

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container")
  for (let i = 0; i < 1; i++) {
    let ranValueX = random(0, width);
    x.push(ranValueX);
    let ranValueY = random(0, height);
    y.push(ranValueY);
  }
}

function draw() {
  background(220);

  mouseXPos = mouseX;
  mouseYPos = mouseY;

  for (let i = 0; i < x.length; i++) {
    x[i] += random(-1, 1);
    y[i] += random(-1, 1);

    let bubbleColor = color(random(255), random(255), random(255), 150); // Random color
    let strokeColor = color(random(255), random(255), random(255), 150); // Random color

    push();
    translate(x[i], y[i]);
    stroke(strokeColor);
    strokeWeight(3);
    fill(bubbleColor);
    circle(0, 0, 30);
    fill(225);
    noStroke();
    circle(4, -6, 8);
    circle(7, 3, 5);
    pop();
  }
  drawBlobby(300, 300, "rgb(240,128,128)");
}

function drawBlobby(x, y, bodyColor) {
  push();
  translate(x, y);

  fill(bodyColor);
  noStroke();
  arc(0, 80, 200, 350, PI, TWO_PI);

  // Eyes
  fill(0);
  ellipse(-30, 0, 30, 35);
  ellipse(30, 0, 30, 35);
  fill(255);
  ellipse(-32, -7, 10, 10);
  ellipse(32, -7, 10, 10);

  // Left arm
  push();
  fill(bodyColor);
  translate(-80, 10);
  let leftArmAngle = map(mouseXPos, 0, width, -PI / 4, PI / 4); // map mouse x position to rotation angle
  rotate(leftArmAngle);
  
  //reference
  ellipse(-20, 0, 45, 35);
  fill("red");
  pop();

  // Right arm
  push();
  fill(bodyColor);
  translate(80, 10);
  let rightArmAngle = map(mouseYPos, 0, height, -PI / 4, PI / 4); // map mouse y position to rotation angle
  rotate(rightArmAngle);
  
  //reference
  ellipse(20, 0, 45, 35);
  fill("red");
  pop();

  // Left leg
  push();
  fill(bodyColor);
  translate(-40, 75);
  
  //reference 
  ellipse(0, 15, 35, 45);
  fill("red");
  pop();

  // Right leg
  push();
  fill(bodyColor);
  translate(40, 75);
  
  //reference 
  ellipse(0, 15, 35, 45);
  fill("red");
  pop();

  // Surprised, default
  noFill();
  stroke(1);
  strokeWeight(3);
  ellipse(0, 40, 32, 28);
  
  //smile
  // noFill();
  // stroke(1);
  // strokeWeight(3);
  // arc(0, 35, 30, 30, 0, PI );
  
  //frown
  // noFill();
  // stroke(1);
  // strokeWeight(3);
  // arc(0, 40, 30, 30, 0+PI, TWO_PI );

  pop();
}

function mousePressed() {
  // change color if blobby pressed, doesnt work right now
  if (dist(mouseX, mouseY, 300, 300) < 80) {
    let newColor = color(random(255), random(255), random(255));
    drawBlobby(300, 300, newColor);
    
    //draw bubble
  } else {
    x.push(mouseX);
    y.push(mouseY);
  }
  
  //pop bubble when click on bubble
  
  
}
