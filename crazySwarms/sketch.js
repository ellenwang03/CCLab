let swarm1;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");
  background(220);
  swarm1 = new Swarm(width/2, height/2);
}

function draw() {
  //
  background(220,50,20);
  swarm1.update();
  swarm1.display();

  noFill();
  stroke(255);
  circle(width/2,height/2,width);
}

class Swarm{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.dia = 300;
    this.speedX = 0;
    this.speedY = 0;

    this.noiseXoffset = random(1000);
    this.noiseYoffset = random(1000);

    this.birds =[];
    for(let i =0; i< 5; i++){
      //get random location inside circle
      let ranAngle = random(2*PI);
      let birdX = cos(ranAngle)* random(0, this.dia/2)//random(this.dia);
      let birdY = sin(ranAngle)* random(0, this.dia/2)//random(this.dia);

      this.birds.push(new Bird(birdX, birdY));
    }

  }

  update(){
    // use noise to determine next step
    let noiseValX = noise((frameCount+this.noiseXoffset)* 0.01);
    this.speedX = map(noiseValX,0,1,-2,2);

    let noiseValY = noise((frameCount+this.noiseYoffset)* 0.01);
    this.speedY = map(noiseValX,0,1,-2,2);
    
    //where would the next step take us 
    let wouldBeX = this.x + this.speedX;
    let wouldBeY = this.y + this.speedY;

    let distanceFromCenter = dist(width/2,height/2,wouldBeX,wouldBeY)
    //check if next step would take us far away from the center 
    if(distanceFromCenter < width/2){
      //only allow step if it doesnt take the swarm far away from center 
      //this line makes it move:
      this.x += this.speedX;
      this.y += this.speedY;
    }

  }
  
  display(){
    push();
    translate(this.x,this.y);

    noFill();
    stroke(0);
    circle(0,0,this.dia);


    // show swarm
    for(let i = 0; i < this.birds.length; i++){
      this.birds[i].update();
      this.birds[i].display();
    }
    pop();
  }
}

class Bird{
  constructor(startX,startY,movementAllowance){
    this.x = startX;
    this.y = startY;

    this.speedX = 0;
    this.speedY = 0;

    this.noiseXoffset = random(1000);
    this.noiseYoffset = random(1000);

    this.boundary = movementAllowance;

  }

  update(){
    // use noise to determine next step
    let noiseValX = noise((frameCount+this.noiseXoffset)* 0.01);
    this.speedX = map(noiseValX,0,1,-20,20);

    let noiseValY = noise((frameCount+this.noiseYoffset)* 0.01);
    this.speedY = map(noiseValX,0,1,-20,20);
    
    //where would the next step take us 
    let wouldBeX = this.x + this.speedX;
    let wouldBeY = this.y + this.speedY;

    let distanceFromCenter = dist(0,0,wouldBeX,wouldBeY)
    //check if next step would take us far away from the center 
    if(distanceFromCenter < this.boundary){
      //only allow step if it doesnt take the swarm far away from center 
      //this line makes it move:
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }

  display(){
    push();
    translate(this.x, this.y);


    noStroke();
    fill(0);
    circle(0,0,10)
    pop();
  }
}