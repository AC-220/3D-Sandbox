let gridOn = false;
let bag = [];
let selected = -1; //index of the selected object, -1 means none
let slider;
let noFSwidth = 700
let noFSheight = 500
let darkOff = true
let checkbox;
let colourPicker;
let slider2;
let angle = 0; // controls lights direction

function setup() {
  createCanvas(700, 500, WEBGL);
  background(220);
  noStroke();
  print("Keys: g grid, s stop, r restart, n select next object");
  
  slider = createSlider(1, 10, 3, 0); // min, max, default, step (0 means smooth)
  slider.input(sliderMoved);
  restart();
  
  darkCheckbox = createCheckbox("Dark Mode", false);
  darkCheckbox.position(0,520);
  darkCheckbox.mousePressed(buttonPressed);
  
  colourPicker = createColorPicker(220);
  colourPicker.position(100, 518)

  slider2 = createSlider(1, 10, 3, 0); // min, max, default, step (0 means smooth)
  //slider.input(sliderMoved2);
  restart();
  
}

function restart() {
  bag = []; // very important!
  bag.push(new Torus(-100, -30, -100, 20));
  bag.push(new Ellipsoid(100, 30, 100, 30));
  bag.push(new Cube(0, 100, 0, 50));
}

function draw() {
  if (darkOff == true) {
    background(50)
  } else {
  let colour = colourPicker.value()
  background(colour)
  }
  orbitControl();
  // Set up lighting
  angle = slider2.value();
  ambientLight(100, 100, 100);
  directionalLight(255, 100, 55, 2, 1, -2);
  
  let lightX = 200 * cos(angle); // X position of light
  let lightZ = 200 * sin(angle); // Z position of light
  pointLight(255, 255, 255, lightX, 0, lightZ); // White light at (x, y, z)
  
  //pointLight(20, 55, 205, 100, 100, 100);
  for (let i = 0; i < bag.length; i++) {
    if (i == selected) {
      stroke(60);
    } else {
      noStroke();
    }
    bag[i].step();
  }

}

function sliderMoved() {
  /*
  When the slider is moved, the currently selected (if any) object
  should change according to your implementation.
  */
  if (selected >= 0) {
    bag[selected].setValue(slider.value());
  }
}


function buttonPressed() {
  if (darkCheckbox.checked()) {
    background(50)
    darkOff = false
  } else {
    background(220)
    darkOff = true
  }
}

class Thing {
  // parent class of animated objects
  constructor(xpos, ypos, zpos, size) {
    this.x = xpos;
    this.y = ypos;
    this.z = zpos;
    this.size = size;
  }

  setValue(par) {
    print(par); // default implementation, not doing much
  }
}

class Cube extends Thing {
  constructor(xpos, ypos, zpos, size) {
    super(xpos, ypos, zpos, size); // call constructor of parent
    this.xSpeed = random(-0.02, 0.02);
    this.ySpeed = random(-0.02, 0.02);
    this.zSpeed = random(-0.02, 0.02);
  }
  step() {
    push();
    translate(this.x, this.y, this.z);
    rotateX(frameCount * this.xSpeed);
    rotateY(frameCount * this.ySpeed);
    rotateZ(frameCount * this.zSpeed);
    ambientMaterial(100);
    box(this.size);
    pop();
  }
  
  setValue(par) {
    this.size = par * 10; // implementation for cubes
  }

}

class Torus extends Thing {
  constructor(xpos, ypos, zpos, size) {
    super(xpos, ypos, zpos, size); // call constructor of parent
    this.xSpeed = random(-0.02, 0.02);
    this.ySpeed = random(-0.02, 0.02);
    this.zSpeed = random(-0.02, 0.02);
    this.slimness = 2;
  }

  setValue(par) {
    this.slimness = par; // implementation for cubes
  }

  step() {
    push();
    translate(this.x, this.y, this.z);
    rotateX(frameCount * this.xSpeed);
    rotateY(frameCount * this.ySpeed);
    rotateZ(frameCount * this.zSpeed);
    specularMaterial(100);
    shininess(10);
    torus(this.slimness * this.size, this.size); // ring diameter, tube diameter
    pop();
  }
}

class Ellipsoid extends Thing {
  constructor(xpos, ypos, zpos, size) {
    super(xpos, ypos, zpos, size); // call constructor of parent
    this.xSpeed = random(-0.02, 0.02);
    this.ySpeed = random(-0.02, 0.02);
    this.zSpeed = random(-0.02, 0.02);
    this.slimness = 2;
  }
    setValue(par) {
    this.slimness = par; // implementation for ellipsoid
    }
    step() {
    push();
    translate(this.x, this.y, this.z);
    rotateX(frameCount * this.xSpeed);
    rotateY(frameCount * this.ySpeed);
    rotateZ(frameCount * this.zSpeed);
    ambientMaterial(100);
    box(this.size);
    ellipsoid(this.slimness * this.size, this.size);
    pop();
  }
  
}

function keyPressed() {
  if (key === "g" || key === "G") {
    // g for grid
    gridOn = !gridOn;
    if (gridOn) {
      debugMode();
    } else {
      noDebugMode();
    }
  }
  if (key === "s" || key === "S") {
    // s for start/stop
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }
  if (key === "r" || key === "R") {
    // r for restart
    restart();
  }
  if (key === "n" || key === "N") {
    selected++;
    if (selected >= bag.length) {
      selected = -1; // no object selected
    }
  }
  if (key === "f" || key === "F") {
    let fs = fullscreen()
    fullscreen(!fs)
    width = displayWidth;
    height = displayHeight-30;
    createCanvas(displayWidth,displayHeight - 30)
  }
  else {
    width = noFSwidth;
    height = noFSheight;
    createCanvas(width,height)
  }


}
