// Vars
// images
let img_0;
let size_img_0 = [64, 64];
let pos_img_0 = [200, 300];

let img_1;
let size_img_1 = [64, 64];
let pos_img_1 = [200, 100];

// game info
let shot_visble = false


// Functions
function preload() {
    img_0 = loadImage("./assets/ship.png");
    img_1 = loadImage("./assets/bullet.png");
}


function setup() {
    // creating the canvas
    createCanvas(400, 400);

    // setting draw mode
    imageMode(CENTER);

}


function draw() {
    // drawing the background
    background(0);

    // mouse movement
    pos_img_0[0] = mouseX;
    if (pos_img_0[0] > width) {
        pos_img_0[0] = width;
    }
    else if (pos_img_0[0] < 0) {
        pos_img_0[0] = 0;
    }


    // Image
    // drawing the image
    image(img_0, pos_img_0[0], pos_img_0[1], size_img_0[0], size_img_0[1]);
    
    if (shot_visble) {
        image(img_1, pos_img_1[0], pos_img_1[1], size_img_1[0], size_img_1[1]);
    
        pos_img_1[1] -= 20;
        if (pos_img_1[1] < -32) {
            shot_visble = false
        }
    }


    // Text
    // text style
    textSize(12);
    textAlign(CENTER);
    fill(255, 0, 0, 255);
    stroke(255, 255, 255, 255);

    // font
    textFont('Helvetica');

    text("CLICK TO SHOOT", mouseX, 380);
}


function mousePressed() {
    // place bullet
    if (shot_visble == false) {
        pos_img_1[0] = pos_img_0[0];
        pos_img_1[1] = 300;
        shot_visble = true;
    }
}