let originalImage;
let maskedImage;
let mask;
let angle = 0;

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
}

function draw() {
  background(255);

  fill(0);
  //redraw the orginal image
  image(originalImage, 0, 0);



  if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
    if(key == "ArrowLeft"){
      angle+=0.005;
    } else if(key == "ArrowRight"){

      angle-=0.005;
    }
    print(angle);
    // Move diagonally.
  }


  //rotate
  push();
  translate(width/2, height/2);
  rotate(angle);
  image(maskedImage, -width/2, -height/2);

  // fill(0, 255, 0);
  // ellipse(0, 0, 20, 20);
  pop();

  let rotation = normalizeAngle(angle);

  if(rotation > 0.54 && rotation < 0.58){
    textSize(40);
    text("✅", 40, 60);
    // text("user arrow keys to rotate", 40, 60)
  } else if(frameCount < 600){
    textSize(40);
    fill(0, 255, 0);
    text("user arrow keys to rotate", 40, 60)
  }
}

function keyPressed(){
  // if(key == "g"){
  //   saveGif('thumb', 10.46);
  // } else if(key == "p"){
  //   saveCanvas('thumb', "jpg");
  // }
  print(key);
  if(key == "ArrowRight"){
    angle+=0.01;
  } else if(key == "ArrowLeft"){

    angle-=0.01;
  }
}

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

