let originalImage;
let maskedImage;
let mask;
let angle = 0;
let turning = true;
let  cx = 747
let cy = 280
let target = 0.49;

function preload() {
  // Code to run before the rest of the sketch.
  originalImage = loadImage('manhole-1.png'); //load image
  mask = loadImage('mask-1.png'); //load mask
}

function setup() {
  createCanvas(1000, 667);
  // createCanvas(windowWidth, windowHeight);
  // makeMask();

  // resetBg();
  maskedImage = originalImage.get();
  maskedImage.mask(mask);
      fill(0, 255, 0);
}

function draw() {
  // print("?")

  background(255);

  // fill(0);
  //redraw the orginal image
  image(originalImage, 0, 0);

  //rotate
  push();
  translate(cx, cy);
  rotate(angle);
  image(maskedImage, -cx, -cy);

  // fill(0, 255, 0);
  // ellipse(0, 0, 20, 20);
  pop();

  // let rotation = abs(angle % TWO_PI);
  // if(rotation > 0.53 && rotation < 0.57){
  //   textSize(40);
  //   text("✅", 40, 40);
  // }

  if(turning){
    angle+=0.07;
  }

  // print(mouseX, mouseY);


  
  if(!turning){
    angle = normalizeAngle(angle);
    if(angle > target - 0.05 && angle < target + 0.05){
      text("✅", 40, 60);
    } else {
      text("press space to reset and try again", 20, 60);
    }
  } else {
    if(frameCount < 600){
      textSize(40);
      text("press space to stop spinning", 20, 60);
    }
  }
}

function keyPressed(){
  // pri
  if(keyCode == 32){
    if(turning){
      turning = false; 
    } else {
      angle = random(0, TWO_PI);
      turning = true;
    }
    // turning = !turning
  }
}

// function keyPressed(){
//   // if(key == "g"){
//   //   saveGif('thumb', 10.46);
//   // } else if(key == "p"){
//   //   saveCanvas('thumb', "jpg");
//   // }
//   print(key);
//   if(key == "ArrowLeft"){
//     angle+=0.01;
//   } else if(key == "ArrowRight"){

//     angle-=0.01;
//   }
// }

function makeMask(){
  pg = createGraphics(width, height);

  // pg.background(255);
  pg.fill(0, 255);
  pg.ellipse(pg.width/2, pg.height/2, pg.width/2, pg.height/2)

  mask = pg.get();
}

function resetBg(){
  let bg = createGraphics(width, height);

  bg.background(255);
  // bg.background("red");

  bg.fill(0);
  // bg.ellipse(width/4, height/4, width/3, height/3);
  let offset = width/8;
  let rectWidth = width/2;
  bg.rect(offset, 0, rectWidth - offset, height);

  originalImage = bg.get();
}

function normalizeAngle(a) {
  return (a % TWO_PI + TWO_PI) % TWO_PI;
}

