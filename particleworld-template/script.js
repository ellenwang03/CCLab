// CCLab Mini Project - 9.R Particle World Template

let particlesNum = 20; 
let cloudsNum = 3; 
let showText = true; 
let textTimer = 120;
let particles = [];
let clouds = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < particlesNum; i++) {
    particles[i] = new Particle(random(width), random(height));
  }

  // clouds
  for (let i = 0; i < cloudsNum; i++) {
    clouds[i] = new Cloud(random(width), random(50, 200));
  }
}

function draw() {
  background(226,249,254);

  // update and display particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // clouds
  for (let i = 0; i < clouds.length; i++) {
    let c = clouds[i];
    c.update();
    c.display();
  }

  // sun
  noStroke();
  fill(255,255,0, 20)
  for(let i = 0; i < 5; i++){
    let dia = 100 + i * 50;
    circle(30,20,dia);
  }

  // text
  if (showText) {
    noStroke();
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("use the mouse as wind", 400, 300); 
    textTimer--;

    // hide the text when time is 0
    if (textTimer <= 0) {
      showText = false;
      textTimer = 120; // reset the timer
    }
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(20, 50); // particle size
    this.speed = random(1, 3); // falling speed
    this.angle = random(TWO_PI); // initial angle for rotation
    this.arcRotations = [];
    this.arcXPositions = []; // array to store random X positions for arcs


    for (let i = 0; i < 3; i++) {
      this.arcRotations.push(random(-PI/4, PI/4)); // random rotation 
      this.arcXPositions.push(random(width)); // random X position
    }
  }
  
  update() {
    // wind effect
    let wind = map(mouseX, 0, width, -1.7, 1.7); // mapping mouseX to wind force
  
    // repelling effect
    this.x += this.speed * sin(this.angle) - wind; // invert wind effect
    this.y += this.speed; // gravity effect
  
    if (this.y > height + 100) {
      this.y = random(-50, 0);
      this.x = random(width);
      this.angle = random(TWO_PI); // reset angle
    }
  }
  
  display() {
    //petals
    fill(255, 192, 203); 
    noStroke();
    let petalRotation = map(this.angle, 0, TWO_PI, -PI / 4, PI / 4); // Map angle to rotation range
    push();
    translate(this.x, this.y);
    rotate(petalRotation);
    beginShape();
    curveVertex(0, 0);
    curveVertex(0, 0);
    curveVertex(this.dia * 0.2, -this.dia * 0.5);
    curveVertex(0, -this.dia);
    curveVertex(-this.dia * 0.2, -this.dia * 0.5);
    curveVertex(0, 0);
    curveVertex(0, 0);
    endShape(CLOSE);
    pop();

    // lily pads
    fill(99, 122, 10);
    for (let i = 0; i < 2; i++) { 
      push();
      translate(this.arcXPositions[i], 520 + i * 20);
      rotate(this.arcRotations[i]);
      arc(0, 0, 80, 80, 0, PI + HALF_PI + 45);
      pop();
    }
    fill(133,182,206,50);
    rect(0,460,800,150);
  }

}

class Cloud {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speed = random(0.5, 1.5); // drifting speed for clouds
  }

  update() {
    this.x += this.speed;

    if (this.x > width + 80) {
      this.x = -80; // wrap around if cloud goes off screen
    }
  }

  display() {
    fill(255);
    ellipse(this.x, this.y-20, 100, 70); 
    ellipse(this.x + 35, this.y-5 , 80, 60); 
    ellipse(this.x - 35, this.y , 80, 60); 
  }
}
