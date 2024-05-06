let sound_aurora;
let sound_stars;
let sound_moonCut;
let stars = [];
let num_stars = 10; 
let rand_starX; // stars x location
let rand_starY; // stars y location
let moon_img, aurora_img;

let gameOverState = false;

function preload(){
  // images
  moon_img = loadImage('assets/moon.png');
  aurora_img = loadImage('assets/aurora.png');
  // sounds
  sound_aurora = loadSound("assets/aurora.mp3");
  sound_stars = loadSound("assets/stars.mp3"); 
  sound_moonCut = loadSound("assets/moon-cut.mp3"); 
}

function setup() {
  let canvas = createCanvas(1000, 600);
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

  image(moon_img, 40, 30);
  image(aurora_img, 400, 0);

  for(let i = 0; i < stars.length; i++){
    stars[i].move(); // Move the stars
    stars[i].display();
  }

  // if the mouse is over the moon
  if(mouseX > 50 && mouseX < 20 + moon_img.width &&
     mouseY > 20 && mouseY < 20 + moon_img.height){
      console.log("mousehovered");
    if(mouseIsPressed){
      sound_moonCut.play();
    }
  }

  // if the mouse is over the aurora
  if(mouseX > 600 && mouseX < 200 + aurora_img.width &&
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

class Stars{
  constructor(startX,startY){
    this.x = startX;
    this.y = startY;
    this.glowSize = 0; // initial glow size
    this.maxGlowSize = 30; // max glow size
    this.glowSpeed = 1; // glow speed
    this.speedX = random(-1, 1); // horizontal speed
    this.speedY = random(-1, 1); // vertical speed
  }

  move(){
    // update the position of the star
    this.x += this.speedX;
    this.y += this.speedY;

    // wrap around the screen if the star goes off-screen
    if(this.x > width+50){
      this.x = -50;
    }
    if(this.x < -50){
      this.x = width+50;
    }
    if(this.y > height+50){
      this.y = -50;
    }
    if(this.y < -50){
      this.y = height+50;
    }
  }

  display(){
    push();
    translate(this.x,this.y);
    noStroke();

    // if mouse is over the star
    if(dist(mouseX, mouseY, this.x, this.y) < 50){
      // increase glow size
      this.glowSize = min(this.glowSize + this.glowSpeed, this.maxGlowSize);
    } else {
      // decrease glow size if mouse is not over the star
      this.glowSize = max(this.glowSize - this.glowSpeed, 0);
    }

    // glow effect
    fill(255,255,224, this.glowSize * 20); 
    ellipse(0, 0, this.glowSize, 50 + this.glowSize);
    ellipse(0, 0, 50 + this.glowSize, this.glowSize);

    // star 
    fill(255);
    ellipse(0, 0, 10, 50);
    ellipse(0, 0, 50, 10);
    pop();
  }
}
