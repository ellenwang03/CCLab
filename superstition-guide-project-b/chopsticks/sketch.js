let chopstickX = 250; // Initial x-coordinate of the chopsticks
let chopstickY = 400; // Initial y-coordinate of the chopsticks
let shakeAmplitude = 100; // Amplitude of the chopstick shake
let shakeSpeed = 10; // Speed of the chopstick shake
let chopstickWidthTop = 20; // Width of the chopsticks at the top
let chopstickWidthBottom = 10; // Width of the chopsticks at the bottom
let chopstickHeight = 250; // Height of the chopsticks


function setup() {
  let canvas = createCanvas(500, 800);
  canvas.parent("canvasContainer");

}

function draw() {
  background(245);

  fill(140,93,59);
  rect(0,550,500,400);

  // Calculate the chopstick shake offset based on sine wave
  let shakeOffset = sin(frameCount * shakeSpeed) * shakeAmplitude;
 
  // Draw the left chopstick with shake effect
  noStroke();
  fill(234,213,185);
  strokeWeight(5);
  quad(chopstickX - chopstickWidthTop / 2 + shakeOffset, chopstickY,
       chopstickX - chopstickWidthBottom / 2 + shakeOffset, chopstickY + chopstickHeight,
       chopstickX + chopstickWidthBottom / 2 + shakeOffset, chopstickY + chopstickHeight,
       chopstickX + chopstickWidthTop / 2 + shakeOffset, chopstickY);

  // Draw the right chopstick with shake effect
  quad(chopstickX + 50 - chopstickWidthTop / 2 + shakeOffset, chopstickY,
       chopstickX + 50 - chopstickWidthBottom / 2 + shakeOffset, chopstickY + chopstickHeight,
       chopstickX + 50 + chopstickWidthBottom / 2 + shakeOffset, chopstickY + chopstickHeight,
       chopstickX + 50 + chopstickWidthTop / 2 + shakeOffset, chopstickY);

  // Example: Move the chopsticks when the mouse is dragged
  if (mouseIsPressed) {
    chopstickX = mouseX - 25;
    chopstickY = mouseY-100;
  }

  // Check if the chopsticks are near the rice bowl and trigger shake effect
  let distanceToRice = dist(chopstickX, chopstickY+370, 250, 600);
  if (distanceToRice < 100) {
    shakeAmplitude = 5;
  } else {
    shakeAmplitude = 0;
  }

  rice(250, 400);
}

function rice(riceX, riceY) {
  push();
  translate(riceX, riceY);
  fill(137, 207, 240,200);
  noStroke();
  strokeWeight(2);
  arc(0, 0, 380, 380, 0, PI, CHORD);
  pop();
}
