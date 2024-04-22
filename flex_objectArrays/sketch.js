// let egg1;
// let egg2;

let basket =[];
let numEggs = 10;
let readInstructions = false;

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);

  //make eggs with single variables
  // egg1 = new Egg(random(width),random(height));
  // egg2 = new Egg(random(width),random(height));

  //make eggs one by one
  // basket[0] = new Egg(random(width),random(height));
  // basket[1] = new Egg(random(width),random(height));
  // let newEgg = new Egg(random(width),random(height));
  // basket.push(newEgg);
  // basket.push(new Egg(random(width),random(height)));

  //create and add eggs to array
  for(let i = 0; i <numEggs; i++){
    basket.push(new Egg(random(width),random(height)));
  }
  console.log(basket);
}

function draw() {
  background(120, 90, 230);
  // egg1.display();
  // egg2.display();
  for(let i =0; i < basket.length; i++ ){
    basket[i].update();
    basket[i].display();
  }

  if(readInstructions == false){
    textAlign(CENTER)
    text("press to make eggs", width/2,height/2)
  }
  



}

class Egg{
  constructor(startX,startY){
    this.x = startX;
    this.y = startY;
    this.s = random(0.3,1);
    this.speedX = random(-1,1);
    this.speedY = random(-1,1);
    this.showYolk = true;
    this.randomDraw = random(100);
  }

  update(){
    this.x += this.speedX
    this.y += this.speedY

    if(this.x < 0 || this.x > width){
      this.speedX = -this.speedX
      this.showYolk = !this.showYolk
    }

    if(this.y < 0 || this.y > height){
      this.speedY = -this.speedY
      this.showYolk = !this.showYolk
    }

  }

  display(){
    push();
    translate(this.x,this.y);
    scale(this.s);

      noStroke();
      fill(255, 200);
      arc(0, 0, 80, 80, 0, PI);
      arc(0, 0, 80, 130, PI, 2*PI);

      if(this.showYolk == true){
        //yolk
        if(this.randomDraw < 5){
          fill(50,168,82);
        }
        else{
          fill(255, 164, 0);
        }
        fill(255, 164, 0);
      }
      circle(0, 0, 40);
    
    pop();
  }
}

function mousePressed(){
  readInstructions = true;
  basket.push(new Egg(mouseX,mouseY));
}

