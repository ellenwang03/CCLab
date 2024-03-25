let kickSound;
let chopSound;
let x = 10;
let xSpeed = 2;

let x2 = 10;
let xSpeed2 = 2.5;

function preload(){
  kickSound =loadSound("sounds/kick.mp3")
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {
  //
  background(220);
  circle(x,20,10);
  circle(x2,20,10);


  x += xSpeed;
  x2 += xSpeed2;

  if(x>width || x< 0){
    xSpeed =-xSpeed;
    kickSound.play();
  }

  if(x2>width || x< 0){
    xSpeed = -xSpeed;
    chopSound.play();
  }
}

// function mousePressed(){
//   kickSound.play();
// }