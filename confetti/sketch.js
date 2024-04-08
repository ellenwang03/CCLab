
let confettis = [];
let numConfetti = 100;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");

  colorMode(HSB);
  
  // for(let i = 0; i < numConfetti; i++){
  //   confettis.push(new Confetti(width/2, height/2))
  // }

  backgroundHue =random(255)
  
}

function draw() {
  background(backgroundHue,10,190);

  if(mouseIsPressed == true){
    confettis.push(new Confetti(width/2, height/2))
  }


  // confettis.push(new Confetti(width/2, height/2))
  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
  }

  // while(confettis.length > 30){
  //   let index = 0;
  //   let numElementsToCut = 1;
  //   confettis.splice(index,numElementsToCut)

  // }
  // if(confettis.length>30){
  //   confettis.splice(0,1)
  // }


  //deleting
  // for(let i = confettis.length-1; i=0; i--){

  // }

  
}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(3, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);  
    this.c = color(random(255),255,255) 

    this.isOnCanvas = true;

  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;

    //gravity effect on y speed
    this.speedY += 0.1; 
    this.speedX *= 0.99

    if(this.y > height){
      this.isOnCanvas = false;
    }
  }

  display(){    
    push();
    translate(this.x, this.y);

      fill(this.c);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }
}

function mousePressed(){
  for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(mouseX, mouseY))
  }

  console.log(confettis.length)
}