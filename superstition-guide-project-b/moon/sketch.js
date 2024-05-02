let sound_aurora;
let sound_stars;
let sound_moonCut;
let stars = [];
let num_stars = 10; 
let rand_starX; // stars x location
let rand_starY; // stars y location
let moon_img, aurora_img, finger_img;

let gameOverState = false;

function preload(){
  // images
  moon_img = loadImage('moon.png');
  aurora_img = loadImage('aurora.png');
  finger_img = loadImage('finger.png');
  // sounds
  sound_aurora = loadSound("aurora.mp3");
  sound_stars = loadSound("stars.mp3"); 
  sound_moonCut = loadSound("moon-cut.mp3"); 
}

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("canvasContainer");
    background(19, 24, 98);

    rand_starX = random(50, 750);
    rand_starY = random(50, 450);

    for(let i = 0; i < num_stars; i++){
      stars.push(new Stars(random(width), random(height))); // Generate stars at random positions
    }
}

function draw() {
  background(19, 24, 98);

  image(moon_img, 20, 20);
  image(aurora_img, 200, 0);
  image(finger_img, mouseX-15, mouseY-20, 50, 50); // Scale down the finger image

  for(let i = 0; i < stars.length; i++){
    stars[i].display();
  }

  // if the mouse is over the moon
  if(mouseX > 20 && mouseX < 20 + moon_img.width &&
     mouseY > 20 && mouseY < 20 + moon_img.height){
    if(mouseIsPressed){
      sound_moonCut.play();
      gameOver();
    }
  }

  // if the mouse is over the aurora
  if(mouseX > 200 && mouseX < 200 + aurora_img.width &&
     mouseY > 0 && mouseY < aurora_img.height){
    if(mouseIsPressed){
      sound_aurora.play();
    }
  }

  // if the mouse is over any star
  for(let i = 0; i < stars.length; i++){
    if(dist(mouseX, mouseY, stars[i].x, stars[i].y) < 50){
      if(mouseIsPressed){
        sound_stars.play();
      }
    }
  }
}

function gameOver(){
  gameOverState = true;
  // game over text

}

class Stars{

  constructor(startX,startY){
    this.x = startX;
    this.y = startY;
  }

  display(){
    push();
    translate(this.x,this.y);
    noStroke()
    ellipse(0, 0, 10, 50);
    ellipse(0, 0, 50, 10);
    pop();
  }
}
