// Vars
// colors
let catBaseColor = [255, 150, 100, 255];
let catSubColor = [150, 100, 50, 255];

let dogBaseColor = [170, 100, 50, 255];

// raining!
let animal_position_x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

let init_animal_position_y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

let animal_position_y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

let animal_scale = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

let animal_rotation = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

let animal_type = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// Functions
function setup() {
  // drawing the canvas
  createCanvas(400, 400);
  
  // generating the values
  for (let i = 0; i < animal_position_x.length; i++) {
    animal_position_x[i] = random(-20, width);
    init_animal_position_y[i] = random(-height, -10);
    animal_position_y[i] = init_animal_position_y[i];
    
    animal_scale[i] = random(0.5, 1.5);
    animal_rotation[i] = random(0, 359);
    
    let options = [0, 1];
    animal_type[i] = random(options);
  }
}


function draw() {
  // coloring the background
  background(200, 200, 255);
  
  // drawing the animals
  for (let i = 0; i < animal_position_x.length; i++) {
    let x = animal_position_x[i];
    let y = animal_position_y[i];
    
    let s = animal_scale[i];
    let r = animal_rotation[i];
    let t = animal_type[i];
    
    drawRainAnimal(x, y, s, r, t);
    
    animal_position_y[i] += 4;
    
    if (animal_position_y[i] > height + 40) {
      animal_position_y[i] = init_animal_position_y[i];
    }
  }
  
  // the cloud
  push();
  noStroke();
  fill(220);
  circle(10, -30, 200);
  circle(150, 0, 200);
  circle(230, -60, 200);
  circle(380, -20, 200);
  
  pop();
  
  
}
  


function drawRainAnimal(x, y, s, r, t) {
  // creating the draw group
  push();
  
  // translating the object
  translate(x, y);
  scale(s);
  
  angleMode(DEGREES);
  rotate(r)
  
  // drawing the shapes
  noStroke();
  
  switch (t) {
    case 0: // CAT
      fill(catBaseColor[0], catBaseColor[1], catBaseColor[2], catBaseColor[3]);
      // body
      rect(4, 4, 20, 10);
      
      // tail
      rect(2, -1, 2, 7);
      rect(4, -2, 2, 2);
      
      // legs
      rect(4, 14, 2, 4);
      rect(7, 14, 2, 4);
      
      rect(19, 14, 2, 4);
      rect(22, 14, 2, 4);
      
      // head
      rect(20, 0, 12, 10);
      
      triangle(24, 0, 20, -4, 20, 0);
      triangle(32, 0, 32, -4, 28, 0);
      
      // face
      fill(0);
      rect(22, 4, 2, 2);
      rect(28, 4, 2, 2);
      
      fill(255, 0, 0, 255);
      triangle(25, 5, 26, 6, 27, 5)
      
      // details
      fill(catSubColor[0], catSubColor[1], catSubColor[2], catSubColor[3]);
      
      rect(8, 4, 2, 4);
      rect(14, 4, 2, 4);
      
      break;
    
    case 1: // DOG
      fill(dogBaseColor[0], dogBaseColor[1], dogBaseColor[2], dogBaseColor[3]);
      // body
      rect(4, 4, 20, 10);
      
      // tail
      rect(2, 1, 2, 6);
      rect(4, 0, 2, 2);
      
      // legs
      rect(4, 14, 2, 4);
      rect(7, 14, 2, 4);
      
      rect(19, 14, 2, 4);
      rect(22, 14, 2, 4);
      
      // head
      rect(20, 0, 8, 10);
      rect(28, 2, 4, 8);
      
      // face
      fill(0);
      rect(24, 2, 2, 2);
      
      fill(255, 0, 100, 255);
      rect(30, 8, 2, 4);
      
      break;
  }
  
  // ending the draw group
  pop();
  
  if (t == 0) {
    return "MEOW";
  }
    return "WOOF";
}