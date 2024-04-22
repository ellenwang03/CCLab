let faces = [];
let numFaces = 4;
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  for (let i = 0; i < numFaces; i++) {
    faces.push(new Face(random(width),
      random(height)));
  }
}
function draw() {
  background(180);
  for (let i = 0; i < faces.length; i++) {
    faces[i].update();
    faces[i].display();
  }

  for(let i = faces.length -1; i>=0;i--){
    if(faces[i].alive == false){
      faces.splice(i,1);
    }
  }

  // if(millis() > 3000){ //3 seconds
  //   for (let i = 0; i < faces.length; i++) {
  //     faces[i].turnAngry();
  //   }
  // }
}

class Face {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.offsetX = 0;

    this.normalColor = color(220, 250, 90); //yellow
    this.angryColor = color(255,90,29); //red
    this.c = this.normalColor;

    this.oscillationOffset = random(2*PI)
    this.speedFactor = random(0.01, 0.05);

    this.frameAtBirth = frameCount;
    this.age = 0;
    this.ageToTurnAngry = int(random(300,600)); 

    this.dia = 50;
    this.alive = true;


 } update() {
    this.offsetX = map(sin((frameCount+this.oscillationOffset) * this.speedFactor), -1, 1, -20, 20);
    this.age = frameCount - this.frameAtBirth

    // if(this.age > this.ageToTurnAngry){ // angry at certain age
    //   this.turnAngry();
    // }

 }
  
  display() {
    push();
    translate(this.x + this.offsetX, this.y);
    noStroke();

    fill(this.c);
    circle(0, 0, 50);
    fill(0);
    circle(-10, -10, 5)
    circle(10, -10, 5)
    ellipse(0, 10, 8, 9)

    // text(this.frameAtBirth,10,10)
    // text(this.age,10,20)
    pop();

  }
  turnAngry(){
    this.c = this.angryColor;
  }
  checkIfMouseIsOverMe(){
    let actualX = this.x + this.offsetX;
    let distance =  dist(actualX, this.y, mouseX, mouseY);
    if(distance < this.dia/2){
      // this.turnAngry();
      this.alive = false;
    }
  }

}

function mousePressed(){
    // for (let i = 0; i < faces.length; i++) {
    //   faces[i].turnAngry();
    // }
    // faces.push(new Face(mouseX,mouseY));

    for (let i = 0; i < faces.length; i++) {
      faces[i].checkIfMouseIsOverMe();
  }

function keyPressed(){
  faces.push(new Face(mouseX,mouseY));
}
}











