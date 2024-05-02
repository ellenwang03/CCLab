// find 4 leaf clover, make a wish and close in a book
let threeLeaf;
let fourLeaf;
let threeLeafs = []
let threeLeaf_num = 20

function preload(){
  threeLeaf_img = loadImage('threeLeaf.webp');
  fourLeaf_img = loadImage('fourLeaf.webp');
  


}
function setup() {
    let canvas = createCanvas(1000, 500);
    canvas.parent("canvasContainer");
    background(220);

    // generate three leaf clovers
    for (let i = 0; i < threeLeaf_num; i++) {
      threeLeafs[i] = new ThreeLeaf(random(width), random(height));
    }
  }
  
function draw() {
  // scanvenger

  // for loop to create random position for three leaf
  image(threeLeaf_img, 20, 20);
  threeLeaf_img.resize(width/8, height/4);

  image(fourLeaf_img, 200, 20);
  fourLeaf_img.resize(width/8, height/4);
  
}

class ThreeLeaf{
  //class for three leaf clover, will place clovers all over canvas at different positions and sizes

  constructor(startX,startY){
    this.x = startX;
    this.y = startY;
    this.scaleFactor = s;
  }

  update(){


  }

  display(){
    rectMode(CENTER);
    push();
      translate(200,200);
      angleMode(DEGREES)
      rotate(45);
      rect(0,0,30);
    pop();
  
    circle(190,190,30);
    circle(210,190,30);
  

  }
}

