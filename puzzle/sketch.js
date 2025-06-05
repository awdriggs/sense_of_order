let numImages = 60;
let images = [];
let clickedCell;
let dragging = false;

function setup() {
  // createCanvas(1000, 667);
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i < images.length; i++){
    images[i].x = random(20, width - 120);
    images[i].y = random(20, height - 120);
  }
}

function preload() {
  //debugger;
  for(let i = 1; i <= numImages; i++){
    let img = loadImage(`./images/piece_${i}.png`);

    images.push(new Block(0, 0, img));
  }
}

function draw() {
  background(255);

  for(let i of images){
    i.draw();
  }

 if(frameCount < 600){
   fill(0, 255, 0);
    textSize(40);
    text("click and drag to arrange the blocks", 20, height - 60);
 }

}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function mouseDragged(){
  print("dragging");

  if(clickedCell){
    clickedCell.x = mouseX - clickedCell.image.width/2;
    clickedCell.y = mouseY - clickedCell.image.height/2;
  }
}

function mouseReleased(){
  dragging = false;
  clickedCell = null;
  print("done dragging")
}

function mousePressed(){
  for(let i = images.length - 1; i > 0; i--){
    if(images[i].clicked() == true){
      clickedCell = images[i];
      print(i);
      dragging = true;
      print("start dragging");

      //handle the placement in the array
      let [cellToMove] = images.splice(i, 1);
      images.push(cellToMove);

      break; //found one, leave
    }
  }
}

class Block {
  constructor(x, y, img){
    this.x = x;
    this.y = y;
    this.image = img;
  }

  draw(){
    image(this.image, this.x, this.y);
  }

  clicked(){
    if(mouseX > this.x && mouseX < this.x + this.image.width && mouseY > this.y && mouseY < this.y + this.image.height){
      print("in");
      return true;
    }
    return false;
  }


}
