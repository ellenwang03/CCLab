let mic;
let ghosts = []; // ghosts
let lightning = null; 
let ghostCounter = 0;
let lightningSound;
let candle = null; // 
let clouds;


function preload() {
  lightningSound = loadSound('assets/lightning.mp3');
}

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("canvasContainer");
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(25, 25, 112);
  textAlign(CENTER);
  let level = mic.getLevel();

  // create ghosts 
  if (level >= 0.08) {
    let size = random(30, 70); // random size for ghost
    let newGhost = new Ghost(random(width), random(height), size);
    ghosts.push(newGhost);
    ghostCounter++; 
  }

  // ghosts
  for (let i = ghosts.length - 1; i >= 0; i--) {
    ghosts[i].update();
    ghosts[i].display();
    if (ghosts[i].isOffscreen()) {
      ghosts.splice(i, 1); // remove ghosts offscreen
    }
  }

  // lightning
  if (ghostCounter >= 6) {
    lightning = new Lightning(); 
    ghostCounter = 0; // reset ghost counter
    lightningSound.play(); 
    background(255); 
  }

  //lightning
  if (lightning) {
    lightning.update();
    lightning.display();
  }

  // if there more than 10 ghosts, then candle
  if (ghosts.length > 10) {
    candle = new Candle(mouseX, mouseY);
    // repel ghosts from the candle
    for (let ghost of ghosts) {
      if (dist(ghost.x, ghost.y, candle.x, candle.y) < candle.radius) {
        ghost.repel(candle.x, candle.y); 
      }
    }
    candle.display(); 
  } else {
    candle = null; 
  }
}

function mousePressed() {
  //if mouse over a ghost
  for (let i = ghosts.length - 1; i >= 0; i--) {
    if (ghosts[i].isMouseOver()) {
      ghosts[i].increaseSize(); 
      break; // exit the loop after increasing the size of one ghost
    }
  }
}

class Ghost {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.size = size;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  display() {
    textSize(this.size);
    text("👻", this.x, this.y); 
  }

  isOffscreen() {
    return (
      this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50
    );
  }

  isMouseOver() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    return d < this.size / 2; // if the mouse is within the ghost's size
  }

  increaseSize() {
    this.size += 30; // increase size of ghost
  }

  repel(cx, cy) {
    let angle = atan2(this.y - cy, this.x - cx); // calculate angle towards candle
    this.x += cos(angle) * 5; // move away from candle horizontally
    this.y += sin(angle) * 5; // move away from the candle vertically
  }
}

class Lightning {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  display() {
    textSize(50);
    text("⚡️", this.x, this.y); 
  }
}

class Candle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 200; // radius of candle influence
  }

  display() {
    textSize(50);
    text("🕯️", this.x, this.y); 
  }
}
