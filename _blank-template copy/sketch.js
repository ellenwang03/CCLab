let mic;
function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);
  let level =mic.getLevel();
  // fill(255);
  // textSize(20);
  // text(level, width/2, height/2);
  let s = map(level, 0, 1, 0, width);
  circle(width/2, height/2, s);
}