// KB Lab 10 Assignment
// Libaries
//  - p5.js SceneManager

const DEBUG_MODE = false;


// Classes
class InteractionBox {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    checkMouse() {
        if (mouseX > this.x - (this.w / 2) && mouseX < this.x + (this.w / 2)) {
            if (mouseY > this.y - (this.h / 2) && mouseY < this.y + (this.h / 2)) {
                return true;
            }
        }
        return false;
    }

    debug() {
        if (DEBUG_MODE) {
            push();

            rectMode(CENTER);
            stroke(0, 0, 0, 100);
            fill(255, 0, 0, 100);
            rect(this.x, this.y, this.w, this.h);

            pop();
        }
    }
}


// Vars
let manager;

let currentKey;

// Sprites
let northWallSprite;


let eastWallSprite;
let eastWallSprite2;
let eastWallSprite3;


let southWallSprite;
let southWallSprite2;


let westWallSprite;


let knifeInventorySprite;
let keyInventorySprite;


// Game Flags
let hasKnife = false;
let peeledWall = false;
let hasKey = false;


// Global Functions
function preload() {
    northWallSprite = loadImage("./assets/NorthWall.png");

    eastWallSprite = loadImage("./assets/EastWall.png");
    eastWallSprite2 = loadImage("./assets/EastWall2.png");
    eastWallSprite3 = loadImage("./assets/EastWall3.png");

    southWallSprite = loadImage("./assets/SouthWall.png");
    southWallSprite2 = loadImage("./assets/SouthWall2.png");

    westWallSprite = loadImage("./assets/WestWall.png");

    knifeInventorySprite = loadImage("./assets/Knife.png");
    keyInventorySprite = loadImage("./assets/Key.png");
    
}


function setup() {
    // creating the canvas
    createCanvas(512, 512);

    // Assigning the scene manager
    manager = new SceneManager();

    // Preloading scenes
    manager.addScene(TitleScreen);
    manager.addScene(WinScreen);
    manager.addScene(WallNorth);
    manager.addScene(WallEast);
    manager.addScene(WallSouth);
    manager.addScene(WallWest);

    // displaying the scene
    manager.showScene(TitleScreen);
}


function draw() {
    // sending
    manager.draw();

    // debug
    if (DEBUG_MODE) {
        push();

        text(mouseX, mouseX, mouseY);
        text(mouseY, mouseX, mouseY + 20);

        pop();
    }

    // Inventory
    if (hasKnife) {
        image(knifeInventorySprite, 16, 16, 32, 32);
    }
    if (hasKey) {
        image(keyInventorySprite, 48, 16, 32, 32);
    }
}


function keyPressed() {
    currentKey = key

    // sending
    manager.handleEvent("keyPressed");
}


function mouseClicked() {
    // sending
    manager.handleEvent("mouseClicked");
}


// ========= SCENES =========

function TitleScreen() {
    this.enter = function() {
        
    }


    this.draw = function() {
        // Drawing the background
        background(0, 0, 0, 255);

        // Title
        // drawing group
        push();

        fill(255, 255, 255, 255);
        textAlign(CENTER);
        textSize(20);
        text("=== CLICK ESCAPE ===", 256, 200);

        pop()


        // Tutorial
        // drawing group
        push();

        fill(255, 255, 255, 255);
        textAlign(CENTER);
        text("Use \'A\' and \'D\' or the left and right arrows to turn around", 256, 256);
        text("click the screen to continue", 256, 400);

        pop()

    }

    
    this.mouseClicked = function() {
        // Transition off of title screen
        manager.showScene(WallNorth);
    }
}


function WinScreen() {
    this.enter = function() {
        
    }


    this.draw = function() {
        // Drawing the background
        background(0, 0, 0, 255);

        // Title
        // drawing group
        push();

        fill(255, 255, 255, 255);
        textAlign(CENTER);
        textSize(20);
        text("=== YOU ESCAPED ===", 256, 200);

        pop()
    }
}


function WallNorth() { // North Wall
    // Vars
    this.doorBox = new InteractionBox(300, 288, 20, 20);
    

    // Functions
    this.enter = function() {

    }

    
    this.draw = function() {
        // Drawing the background 
        background(0, 255, 0, 255);

        image(northWallSprite, 0, 0, 512, 512);

        // debug
        this.doorBox.debug();

        if (this.doorBox.checkMouse() && mouseIsPressed) {
            if (hasKey) {
                manager.showScene(WinScreen);
            }
            
        }
    }


    this.keyPressed = function() {
        if (key == 'a' || key == 'ArrowLeft') { // Turn Left
            manager.showScene(WallWest)
        }
        else if (key == 'd' || key == 'ArrowRight') { // Turn Right
            manager.showScene(WallEast)
        }
    }
}


function WallEast() { // East Wall
    // Vars
    this.peelBox = new InteractionBox(117, 210, 140, 80);
    this.keyBox = new InteractionBox(117, 210, 40, 40);


    // Functions
    this.enter = function() {

    }


    this.draw = function() {
        // Drawing the background 
        background(255, 0, 0, 255);

        if (!peeledWall) {
            image(eastWallSprite, 0, 0, 512, 512);
        }
        else if (peeledWall && !hasKey) {
            image(eastWallSprite2, 0, 0, 512, 512);
        }
        else {
            image(eastWallSprite3, 0, 0, 512, 512);
        }

        // debug
        this.peelBox.debug();
        this.keyBox.debug();


        if (this.peelBox.checkMouse() && mouseIsPressed) {
            if (!peeledWall && hasKnife) {
                peeledWall = true;
            }
        }

        if (this.keyBox.checkMouse() && mouseIsPressed) {
            if (peeledWall && !hasKey) {
                hasKey = true;
            }
        }
    }


    this.keyPressed = function() {
        if (key == 'a' || key == 'ArrowLeft') { // Turn Left
            manager.showScene(WallNorth)
        }
        else if (key == 'd' || key == 'ArrowRight') { // Turn Right
            manager.showScene(WallSouth)
        }
    }
}


function WallSouth() { // South Wall
    // Vars
    this.knifeBox = new InteractionBox(255, 320, 40, 40);

    // Functions
    this.enter = function() {

    }


    this.draw = function() {
        // Drawing the background 
        background(0, 0, 255, 255);

        if (!hasKnife) {
            image(southWallSprite, 0, 0, 512, 512);
        }
        else if (hasKnife) {
            image(southWallSprite2, 0, 0, 512, 512);
        }

        // debug
        this.knifeBox.debug();


        if (this.knifeBox.checkMouse() && mouseIsPressed) {
            if (!hasKnife) {
                hasKnife = true;
            }
        }

    }


    this.keyPressed = function() {
        if (key == 'a' || key == 'ArrowLeft') { // Turn Left
            manager.showScene(WallEast)
        }
        else if (key == 'd' || key == 'ArrowRight') { // Turn Right
            manager.showScene(WallWest)
        }
    }
}


function WallWest() { // West Wall
    this.enter = function() {

    }


    this.draw = function() {
        // Drawing the background 
        background(255, 255, 0, 255);

        image(westWallSprite, 0, 0, 512, 512);


    }


    this.keyPressed = function() {
        if (key == 'a' || key == 'ArrowLeft') { // Turn Left
            manager.showScene(WallSouth)
        }
        else if (key == 'd' || key == 'ArrowRight') { // Turn Right
            manager.showScene(WallNorth)
        }
    }
}