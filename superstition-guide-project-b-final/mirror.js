let myMirror;
let brokenMirrorImg;
let brokenMirror = false;
let mirrorSound;
let buryButton;
let buttonClicked = "";
let bury;
let water;
let burn;
let yPos = 0.0; // 2nd dimension of perlin noise
let fireEmojis = [];
let textY = 400;

function preload() {
  brokenMirrorImg = loadImage("assets/mirror.png");
  mirrorSound = loadSound("assets/mirror-breaking.mp3");
  bury = loadSound("assets/bury.mp3");
  water = loadSound("assets/water.mp3");
  burn = loadSound("assets/burn.mp3");
}

function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("canvasContainer");
  myMirror = new Mirror(500, 400, 300);

  buryButton = createButton("Dispose Mirror");
  buryButton.position(
    width / 2 - buryButton.width / 2,
    height / 2 - buryButton.height / 2 + 1110
  );
  buryButton.mousePressed(buryMirror);
  buryButton.hide();

  // fire emojis at random positions
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(-500, -50);
    let fallSpeed = random(0.5, 2);
    fireEmojis.push({
      x,
      y,
      fallSpeed
  });
  
  }
}

function draw() {
  background(25, 25, 112);
  //mirror breaks
  if (!brokenMirror) {
    myMirror.display();
  } else {
    image(
      brokenMirrorImg,
      myMirror.x,
      myMirror.y - 250,
      myMirror.size,
      myMirror.size
    );
    buryButton.show();
  }

  textSize(24);
  text("Look at reflection", mouseX, mouseY - 20);

  if (buttonClicked === "dispose") {
    displayDisposeText();
  }
}

function mouseClicked() {
  // if mouse click is on mirror
  if (
    !brokenMirror &&
    mouseX > myMirror.x &&
    mouseX < myMirror.x + myMirror.size &&
    mouseY + 250 > myMirror.y &&
    mouseY + 250 < myMirror.y + myMirror.size
  ) {
    brokenMirror = true;
    mirrorSound.play(); // play mirror breaking sound
  }

  // emojis clicked
  if (buttonClicked === "dispose") {
    if (mouseX > 260 && mouseX < 350 && mouseY > 260 && mouseY < 380) {
      bury.play();
    } else if (mouseX > 440 && mouseX < 560 && mouseY > 280 && mouseY < 370) {
      water.play();
    } else if (mouseX > 660 && mouseX < 760 && mouseY > 260 && mouseY < 350) {
      burn.play();
    }
  }
}

function buryMirror() {
  buttonClicked = "dispose";
  buryButton.hide();
}

function displayDisposeText() {
  background(25, 25, 112);
  image(
    brokenMirrorImg,
    mouseX - 170,
    mouseY - 100,
    myMirror.size,
    myMirror.size
  );
  push();
  textAlign(CENTER);
  fill(255);
  text("pick a location to dispose the broken pieces", 500, 100);
  pop();
  textSize(100);
  text("🌳", 260, 350);
  text("🌊", 460, 350);
  text("🔥", 660, 350);
  textSize(20);
  fill(255);
  if (mouseX > 260 && mouseX < 350 && mouseY > 260 && mouseY < 380) {
    background(25, 25, 112);
    fill(92, 64, 51);
    rect(0, 500, 1000, 100);
    textSize(200);
    text("🌳", 140, 490);
    textSize(150);
    text("🌕", 700, 190);
    textSize(24);
    text(
      "You buried the broken pieces deep under a tree where spirits can't find them",
      390,
      350,
      500
    );
  }
  if (mouseX > 440 && mouseX < 560 && mouseY > 280 && mouseY < 370) {
    background(25, 25, 112);

    fill(118, 170, 206);
    beginShape();

    let xPos = 0; //2D Noise

    for (let x = 0; x <= width; x += 10) {
      let y = map(noise(xPos, yPos), 0, 1, 200, 300);

      // Set the vertex
      vertex(x, y);
      // Increment x dimension for noise
      xPos += 0.04;
    }
    // increment y dimension for noise
    yPos += 0.02;
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);

    fill(255);
    textSize(24);
    text(
      "You washed the broken pieces away with water. Instead of 7 years of bad luck, the water will wash away the bad luck in 7 hours",
      100,
      400,
      700
    );
  }
  if (mouseX > 660 && mouseX < 760 && mouseY > 260 && mouseY < 350) {
    for (let i = 0; i < fireEmojis.length; i++) {
      text("🔥", fireEmojis[i].x, fireEmojis[i].y);
      fireEmojis[i].y += fireEmojis[i].fallSpeed;
      // reset emoji position if off canvas
      if (fireEmojis[i].y > height + 50) {
        fireEmojis[i].y = random(-500, -50);
        fireEmojis[i].x = random(width);
      }
    }

    fill(255);
    textSize(24);
    text(
      "You burned the broken pieces with fire to blacken them. Make sure to bury these pieces exactly one year from today",
      90,
      textY,
      500
    );
  }
}

class Mirror {
  constructor(x, y, size) {
    this.x = x - size / 2;
    this.y = y;
    this.size = size;
  }

  display() {
    textSize(this.size);
    text("🪞", this.x, this.y);
  }
}


