let chopstick1; // left chopstick
let chopstick2; // right chopstickt
let shakeAmplitude = 100; // chopstick shake
let shakeSpeed = 10; 
// let rotationSlider; // chopstick rotation
let rotationSlider = document.getElementById("rotationSlider")

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("canvasContainer");

  // chopstick rotation
  // rotationSlider = createSlider(0, TWO_PI, PI / 2, 0.01);
  // rotationSlider.position(10, 10);

  // rotationSlider.style('background-color', '#0074D9'); 
  // rotationSlider.style('color', '#FFFFFF'); 

  chopstick1 = new Chopstick(750, 200, 20, 10, 250);
  chopstick2 = new Chopstick(850, 200, 20, 10, 250);
}

function draw() {
  background(111, 143, 175);
  noStroke();
  fill(140, 93, 59);

  //table
  rect(0, 500, 1000, 500);
  
  // chopstick shake
  let shakeOffset = sin(frameCount * shakeSpeed) * shakeAmplitude;

  chopstick1.display(shakeOffset);
  chopstick2.display(shakeOffset);

  // rotation
  chopstick1.rotation = rotationSlider.value;
  chopstick2.rotation = rotationSlider.value;

  // move chopsticks when mouse is dragged and not near slider
  if (mouseIsPressed && mouseX>140 && mouseY > 20) {
    chopstick1.x = mouseX - 50 - chopstick1.topWidth / 2;
    chopstick1.y = mouseY - 100 - chopstick1.height / 2;
    chopstick2.x = mouseX + 50 - chopstick2.topWidth / 2;
    chopstick2.y = mouseY - 100 - chopstick2.height / 2;
  }

  if (mouseY > 150 && mouseX > 300 && mouseX < 700) {
    shakeAmplitude = 5;
  } else {
    shakeAmplitude = 0;
  }

  bowl(330, 500,300);
}

function bowl(bowlX, bowlY, scale) {
  textSize(scale); 
  text("🍚", bowlX, bowlY);
}

class Chopstick {
  constructor(x, y, topWidth, bottomWidth, height) {
    this.x = x;
    this.y = y;
    this.topWidth = topWidth;
    this.bottomWidth = bottomWidth;
    this.height = height;
    this.rotation = 0;
  }

  display(shakeOffset) {
    push();
    translate(this.x + shakeOffset + this.topWidth / 2, this.y + this.height / 2);
    rotate(this.rotation);
    noStroke();
    fill(234, 213, 185);
    strokeWeight(5);
    quad(-this.topWidth / 2, -this.height / 2,
         -this.bottomWidth / 2, this.height / 2,
         this.bottomWidth / 2, this.height / 2,
         this.topWidth / 2, -this.height / 2);
    pop();
  }
}
