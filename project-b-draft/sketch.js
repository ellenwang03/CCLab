let moonButton;

function setup() {
  createCanvas(800, 500);
  
  moonButton = createButton('Moon');
  moonButton.position(20, 20);
  moonButton.mousePressed(goToMoonCanvas);
}

function draw() {
  background(220);
  // Other drawing code here
}

function goToMoonCanvas() {
  window.location.href = 'moon_canvas.html'; // Replace 'moon_canvas.html' with the URL of your moon canvas page
}
