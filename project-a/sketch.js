// for blobby
let sinInput = 0;
let scaleFactor = 100;
let mouseXPos, mouseYPos;
let x = [];
let y = [];
let blobbyPosX = 120;
let blobbyPosY = 360;
let blobbySpeed = 5;
let blobbyColor;
let clickCount = 0; // how times blobby is clicked
let randPosX; //random position of blobby when enter is clicked
let randPosY;
let expression;

//for background
let color1; //color of balloon
let color2;
let color3;
let translateX;
let translateY;
let translateCloudX;
let translateCloudY;
let translateCloudX2;
let translateCloudY2;
let translateCloudX3;
let translateCloudY3;
let crossX = 100;
let crossY = 100;
let birdX = 0;
let bird = 0;
let balloonX;
let balloonY;
let balloonYrandom1;
let balloonYrandom2;
let balloonXrandom;

let angle = 0;
let ranValue; //random value for egg
let ranWeatherVal; // for fog and snow
let randomXrain;
let randomYrain;

function setup() {
  createCanvas(800, 500);
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container")

  //bubbles
  for (let i = 0; i < 1; i++) {
    let ranValueX = random(0, width);
    x.push(ranValueX);
    let ranValueY = random(0, height);
    y.push(ranValueY);
  }

  //for background
  translateX = random(600);
  translateY = random(400);
  color1 = random(255);
  color2 = random(255);
  color3 = random(255);
  translateCloudX = random(20, 400);
  translateCloudY = random(20, 150);
  translateCloudX2 = random(300, 650);
  translateCloudY2 = random(50, 220);
  translateCloudX3 = random(600, 800);
  translateCloudY3 = random(30, 240);
  birdX = random(0, 800);
  birdY = random(-10, 270);
  balloonX = random(50, 200);
  balloonY = random(30, 270);
  balloonYrandom1 = random(20, 200);
  balloonYrandom2 = random(40, 320);
  balloonXrandom = random(300, 500);
  ranValue = random(0, 100);
  ranWeatherVal = random(0, 100);

  blobbyColor = color(240, 128, 128); // blobby default color
  expression = floor(random(3));
}

function draw() {
  //background
  if (translateY <= 200) {
    background(195, 231, 253);
  } else if (translateY <= 300) {
    background(247, 193, 106);
  } else {
    background(45, 89, 135);
  }
  noStroke();
  // ground area
  if (translateY <= 300) {
    fill(42, 175, 44); // Ground color
    rect(0, 460, width, height); // Ground rectangle
  } else {
    fill(17, 75, 56); // Ground color
    rect(0, 460, width, height); // Ground rectangle
  }

  //sun
  push();
  translate(translateX, translateY);
  noStroke();
  if (translateY <= 200) {
    fill(253, 184, 19, 30);
    for (let i = 0; i < 5; i++) {
      let x = 0;
      let y = 0;
      let dia = 100 + i * 40;
      circle(x, y, dia);
    }
  } else if (translateY <= 300) {
    fill(251, 144, 98, 70); //orange
    for (let i = 0; i < 5; i++) {
      let x = 0;
      let y = 0;
      let dia = 100 + i * 40;
      circle(x, y, dia);
    }
  }
  pop();

  //stars
  fill(255);
  if (translateY >= 300) {
    stroke(255);
    for (let i = 0; i < 2; i++) {
      let crossX = random(width);
      let crossY = random(height - 150);
      ellipse(crossX, crossY, 50, 5);
      ellipse(crossX, crossY, 5, 50);
    }
  }

  //white clouds
  clouds(translateCloudX, translateCloudY);
  clouds(translateCloudX2, translateCloudY2);
  clouds(translateCloudX3, translateCloudY3);

  translateCloudX += 0.4;
  translateCloudX2 += 0.7;
  translateCloudX3 += 0.9;

  if (translateCloudX > width + 50) {
    translateCloudX = -60;
  } else if (translateCloudX2 > width + 50) {
    translateCloudX2 = -60;
  } else if (translateCloudX3 > width + 50) {
    translateCloudX3 = -60;
  }

  //bird
  let freqc = frameCount * 0.02;
  let ampl = 80;
  let noiseValue = noise(freqc) * ampl; // noise
  let birdX = frameCount % width;
  let birdY = (height * 2) / 3 + noiseValue - 270;
  // noise graph
  stroke(0);
  strokeWeight(3);
  noFill();
  arc(birdX, birdY, 30, 20, PI, 0);
  arc(birdX + 30, birdY, 30, 20, PI, 0);

  //ferris wheel
  push();
  translate(0, 25);
  drawFerrisWheel();
  pop();

  //balloons
  push();
  angle += 0.03; // Adjust this value to control the speed of movement
  translate(0, 0);
  fill(color1, color2, color3);

  stroke(0);
  strokeWeight(3);

  balloonY = balloonYrandom1 + sin(angle) * 10; // 100 is the amplitude of motion
  ellipse(balloonX, balloonY, 50, 60);
  line(balloonX, balloonY + 30, balloonX, balloonY + 90);

  balloonY = balloonYrandom2 + cos(angle) * 10; // 100 is the amplitude of motion
  ellipse(balloonX + balloonXrandom, balloonY, 50, 60);
  line(
    balloonX + balloonXrandom,
    balloonY + 30,
    balloonX + balloonXrandom,
    balloonY + 90
  );
  pop();

  // blobby superpower, fast
  if (keyIsPressed && keyCode === ENTER) {
    randPosX = random(150, 600);
    randPosY = random(100, 600);
    drawBlobby(randPosX, randPosY - 180, blobbyColor,100);
  } else { // Blobby default position
    drawBlobby(blobbyPosX, blobbyPosY, blobbyColor,100);
    
  }
  
  // Blobby movement
  if (keyIsDown(LEFT_ARROW)) {
    blobbyPosX -= blobbySpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    blobbyPosX += blobbySpeed;
  } else if (keyIsDown(UP_ARROW)) {
    //not done
    blobbyPosY -= blobbySpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    blobbyPosY += blobbySpeed;
  }

  // reappear
  if (blobbyPosX > width + 110) {
    blobbyPosX = -100;
  } else if (blobbyPosX < -100) {
    blobbyPosX = width + 100;
  }

  if (blobbyPosY > height + 110) {
    blobbyPosY = -100;
  } else if (blobbyPosY < -100) {
    blobbyPosY = height + 100;
  }

  // popping bubble, scaling Blobby
  for (let i = 0; i < x.length; i++) {
    let d = dist(blobbyPosX, blobbyPosY, x[i], y[i]);
    if (d < 100) {
      // pop bubble if near blobby
      x.splice(i, 1);
      y.splice(i, 1);
      scaleFactor += 5; // increase blobby size
      // console.log(scaleFactor);
      if (scaleFactor >= 200) {
        scaleFactor = 100;
      }
    }
  }
  //redrawing
  drawBlobby(blobbyPosX, blobbyPosY, blobbyColor, scaleFactor);

  //bubbles
  for (let i = 0; i < x.length; i++) {
    x[i] += random(-1, 1);
    y[i] += random(-1, 1);

    let bubbleColor = color(random(255), random(255), random(255), 150);
    let strokeColor = color(random(255), random(255), random(255), 150);

    push(); // bubbles
    translate(x[i], y[i]);
    stroke(strokeColor);
    strokeWeight(3);
    fill(bubbleColor);
    circle(0, 0, 30);
    fill(225);
    noStroke();
    circle(4, -6, 8);
    circle(7, 3, 5);
    pop();
  }
  
  // asking user to click Blobby
  if (x.length > 5 && frameCount <= 1000) {
    textFont("Courier New");
    textSize(20);
    textAlign(CENTER);
    fill(0);
    noStroke();
    text("click on Blobby and see what happens", 520, 60, 250, 100);
  }

  //fog
  if (ranWeatherVal < 30 && ranWeatherVal > 10) {
    fill(255, 60);
    noStroke();
    rect(0, 0, width, height);

    noStroke();
    fill(200, 200);

    ellipse(250, 300, 200, 70);
    ellipse(320, 345, 200, 70);
    ellipse(180, 330, 200, 70);

    ellipse(470, 100, 200, 70);
    ellipse(440, 145, 200, 70);
    ellipse(550, 130, 200, 70);
  }
  if (ranWeatherVal < 35) {
    // 30% chance of snow
    stroke(255);
    for (let i = 0; i < 30; i++) {
      randomXsnow = random(0, 800);
      randomYsnow = random(0, 800);
      fill(255);
      ellipse(randomXsnow, randomYsnow, 5, 5);
    }
  }

  if (frameCount <= 400) {
    push();
    translate(400, 250);
    fill(0, 100);
    rectMode(CENTER);
    stroke(random(0, 255), random(0, 255), random(0, 255));
    rect(0, 0, 700, 250);
    textAlign(CENTER);
    noStroke();
    textFont("Courier New");
    fill(255);
    textSize(20);
    text(
      " ₊ ⊹ Blobby has been waiting for you! Try to discover Blobby's unique features and superpowers by using arrow keys, enter key and mouse clicks! ₊ ⊹\n\n\nBonus: Keep generating until you are satisfied with Blobby's enviroment!",
      0,
      30,
      620,
      250
    );
    pop();
  }
}

function drawFerrisWheel() {
  //ferris wheel
  push();
    translate(400, 250);
    stroke(0);
    strokeWeight(5);
    noFill();
    circle(0, 0, 300); //outer circle
    noFill();
    triangle(0, 18, -80, 200, 80, 200);
    //lines
    push();
      rotate(radians(frameCount * 0.5));
      line(0, -150, 0, -15); //up
      line(0, 150, 0, 15); //down
      line(-150, 0, -15, 0); //left
      line(150, 0, 15, 0); //right
      line(-105, -105, -12, -12); //left up
      line(105, 105, 12, 12); // right down
      line(-105, 105, -12, 12); //left down
      line(105, -105, 12, -12); // right up
      stroke(0);
      strokeWeight(5);
      noFill();
      circle(0, 0, 30); //inner circle

      //carts
      fill(39, 146, 196);
      push(); //up
        translate(0, -150);
        rotate(radians(-frameCount * 0.5));
        arc(0, -20, 70, 80, 0, PI, CHORD);
        // fill(255);
        // circle(0,0,2);
      pop();

      push(); // down
        translate(0, 150);
        rotate(radians(-frameCount * 0.5));
        arc(0, -20, 70, 80, 0, PI, CHORD);
        // fill(255);
        // circle(0,0,2);
      pop();

      fill(237, 125, 170);
      push(); //left
        translate(-150, 0);
        rotate(radians(-frameCount * 0.5));
        arc(0, -20, 70, 80, 0, PI, CHORD);
        // fill(255);
        // circle(0,0,2);
      pop();

      push(); //right
        translate(150, 0);
        rotate(radians(-frameCount * 0.5));
        arc(0, -20, 70, 80, 0, PI, CHORD);
        // fill(255);
        // circle(0,0,2);
      pop();

      fill(80, 65, 102);
      push(); //left up
        translate(-106, -106);
        rotate(radians(-frameCount * 0.5));
        arc(0, -20, 70, 80, 0, PI, CHORD);
        // fill(255);
        // circle(0,0,2);
      pop();

      push(); // right down
        translate(106, 106);
        rotate(radians(-frameCount * 0.5));
        arc(0, -20, 70, 80, 0, PI, CHORD);
        // fill(255);
        // circle(0,0,2);
      pop();

      fill(3, 119, 21);
      push(); //left down
        translate(-106, 106);
        rotate(radians(-frameCount * 0.5));
        arc(0, -20, 70, 80, 0, PI, CHORD);
        // fill(255);
        // circle(0,0,2);
      pop();

      push(); // right up
        translate(106, -106);
        rotate(radians(-frameCount * 0.5));
        arc(0, -20, 70, 80, 0, PI, CHORD);
        //   fill(255);
        //   circle(0,0,2);
      pop();
    pop();
  pop();
}

function drawBlobby(x, y, bodyColor, size) {
  push();
  translate(x, y);
  scale(size / 100); // scaling blobby based on its size

  fill(bodyColor);
  noStroke();
  arc(0, 80, 200, 350, PI, TWO_PI);

  // Eyes
  fill(0);
  ellipse(-30, 0, 30, 35);
  ellipse(30, 0, 30, 35);

  let eyeX = map(mouseX, 0, width, -3, 3); // mapping mouse X position 
  let eyeY = map(mouseY, 0, height, -3, 3); // mapping mouse Y position 

  fill(255);
  ellipse(-32 + eyeX, -7 + eyeY, 10, 10); // adjusted pupil positions
  ellipse(32 + eyeX, -7 + eyeY, 10, 10); 

  // Left arm
  push();
  fill(bodyColor);
  translate(-80, 10);
  let leftArmAngle = map(mouseX, 0, width, -PI / 4, PI / 4); // map mouse x position to rotation angle
  rotate(leftArmAngle);
  ellipse(-20, 0, 45, 35);
  pop();

  // Right arm
  push();
  fill(bodyColor);
  translate(80, 10);
  let rightArmAngle = map(mouseY, 0, height, -PI / 4, PI / 4); // map mouse y position to rotation angle
  rotate(rightArmAngle);
  ellipse(20, 0, 45, 35);
  pop();

  // Left leg
  push();
  fill(bodyColor);
  translate(-40, 65);
  ellipse(0, 20, 35, 45);
  pop();

  // Right leg
  push();
  fill(bodyColor);
  translate(40, 65);
  ellipse(0, 20, 35, 45);
  pop();

  // Adjust facial expression based on blobby's color
if (
    red(bodyColor) == 255 &&
    green(bodyColor) == 68 &&
    blue(bodyColor) == 51
  ) {
    // blobby red, sad expression
    noFill();
    stroke(1);
    strokeWeight(3);
    arc(0, 45, 32, 28, PI, TWO_PI); // Frown
  } else if (
    red(bodyColor) == 255 &&
    green(bodyColor) == 127 &&
    blue(bodyColor) == 80
  ) {
    // smiling
    noFill();
    stroke(1);
    strokeWeight(3);
    arc(0, 35, 30, 30, 0, PI);
  } else { // default expressions
    if(expression == 0){
      noFill(); // surprised
      stroke(1);
      strokeWeight(3);
      ellipse(0, 40, 32, 28);
      
    } else if(expression == 1){
        noFill();
        stroke(1);
        strokeWeight(3);
        ellipse(0, 40, 25, 32);
    } else if(expression == 2){
      stroke(1);
      strokeWeight(3);
      noFill();
      arc(0, 32, 38, 40, 0, PI, CHORD)
      noStroke();
      fill(215,107,120)
      ellipse(-60,30,20,10);
      ellipse(60,30,20,10);
    }
  }

  pop();
}

function mousePressed() {
  // change color if blobby pressed, doesnt work right now

  let d = dist(mouseX, mouseY, blobbyPosX, 360);
  if (d < 100) {
    clickCount++;

    if (clickCount >= 10) {
      blobbyColor = color(255, 68, 51); // blobby red after 10 clicks
    } else if (clickCount >= 5) {
      blobbyColor = color(255, 127, 80); // blobby orange after 5 clicks
    }
  }
  //draw bubble
  else {
    x.push(mouseX);
    y.push(mouseY);
    blobbyColor = color(240, 128, 128);
    clickCount = 0;
  }
  //pop bubble when click on bubble
}

function clouds(translateCloudX, translateCloudY) {
  push();
  translate(0, 0);

  fill(255);
  ellipse(translateCloudX, translateCloudY, 70, 40);
  ellipse(translateCloudX + 20, translateCloudY + 15, 70, 40);
  ellipse(translateCloudX - 20, translateCloudY + 10, 70, 40);
  pop();
}