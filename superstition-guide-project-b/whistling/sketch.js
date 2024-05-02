let microphone; 
let micMAX = 0;
let night = false;
let rand_time;


function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("canvasContainer");
    background(220);
    rand_time = random(0,10);

    microphone = new p5.AudioIn();  
    microphone.start(); 

  }
  
function draw() {
  // different backgrounds for different time of day


  let micLevel = microphone.getLevel();  
  text(micLevel, 30, 80);

  if(micLevel > 0.05 && night){
    // ghosts appear 
  }
  
}


