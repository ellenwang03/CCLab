let confettis = [];
let numConfetti = 60;
let clovers = []; 
let showText = true;
let showCongratulations = false;
let showBook = false;
let fourLeafX, fourLeafY; 
let bookX = 520;
let bookY = 350;
let inputBar;
let inputVisible = false;
let input;
let inputText = '';
let wishTextVisible = false;

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("canvasContainer");

  // generate random positions for clovers
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(2, 5); // Random size for each clover
    clovers.push(new ThreeLeaf(x, y, size));
  }

  // generate random position for four leaf clover
  fourLeafX = random(width);
  fourLeafY = random(height);

  // input bar
  inputBar = createInput();
  inputBar.position(width / 2, height / 2);
  inputBar.hide(); // initially hide the input bar

  // create input for book
  input = createInput('');
  input.position(1000,800);
  input.hide();  
}

function draw() {
  background(147, 197, 114);

  // draw each clover
  for (let i = 0; i < clovers.length; i++) {
    clovers[i].display();
  }

  if (!showCongratulations) {
    fourLeaf(fourLeafX, fourLeafY); //four-leaf clover if congrats not shown
  }

  if (showCongratulations) {
    push();
    textAlign(CENTER);
    textSize(20);
    fill(0);
    text("Congratulations you found the four leaf clover!", width / 2, height / 2);
    pop();

    setTimeout(() => {
      showCongratulations = false;
      showBook = true; // show book after congrats message disappears
    }, 3000);
  }

  if (showBook) {
    book(bookX, bookY); //book if showBook true
    fourLeaf(mouseX, mouseY);

    input.show(); 
  } else {
    input.hide(); 
  }

  let inputMsg = input.value();
  if (inputMsg !=  "" && keyCode==13) {
    wishTextVisible = true;
  }

  if (wishTextVisible) {
    push();
    textAlign(CENTER);
    textSize(20);
    fill(0);
    text("Your wish has been received! May your wish come true!", width / 2, height / 2 + 150); //wish message
    pop();

    // hide the wish text after 3 seconds
    setTimeout(() => {
      wishTextVisible = false;
    }, 3000);
  }

  // confetti
  for (let i = confettis.length - 1; i >= 0; i--) {
    confettis[i].update();
    confettis[i].display();
    if (!confettis[i].isOnCanvas) {
      confettis.splice(i, 1); // remove confetti off canvas
    }
  }
}

function mousePressed() {
  // hide intro text when canvas is clicked
  if (showText && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    showText = false; 
  }

  // congrats message and confetti when four leaf clover clicked
  if (!showCongratulations && dist(mouseX, mouseY, fourLeafX, fourLeafY) < 30) {
    showCongratulations = true;
    for (let i = 0; i < numConfetti; i++) {
      confettis.push(new Confetti(fourLeafX, fourLeafY));
    }
  }

  // show input bar when mouse hovered over book
  if (mouseX > bookX && mouseX < bookX + 30 && mouseY > bookY && mouseY < bookY + 30) {
    inputBar.show();
    inputVisible = true;
  } else {
    inputBar.hide();
    inputVisible = false;
  }
}

class ThreeLeaf {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.size);
    text("☘️", 0, 0);
    pop();
  }
}

function fourLeaf(x, y) {
  push();
  translate(x, y);
  scale(4);
  text("🍀", 0, 0);
  pop();
}

class Confetti {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(3, 10);
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);
    this.c = color(124, 252, 0);
    this.isOnCanvas = true;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // gravity 
    this.speedY += 0.1;
    this.speedX *= 0.99;

    if (this.y > height) {
      this.isOnCanvas = false;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.c);
    noStroke();
    circle(0, 0, this.size);
    pop();
  }
}

function book(bookX, bookY) {
  push();
  translate(bookX, bookY);
  scale(15);
  textAlign(CENTER);
  text("📖", 0, 0);
  pop();
}
