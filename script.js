//Variable Declarations
let canvas = null;
const windowMargin = 100;

let score;
let cloudImage;
let groundImage;
let playerImage;
let spikeImage;


//Canvas Methods
function preload() {
  cloudImage = loadImage("sprites/cloud.png");
  groundImage = loadImage("sprites/ground.png");
  playerImage = loadImage("sprites/player.png");
  spikeImage = loadImage("sprites/spike.png");
}


function setup() {
  canvas = createCanvas(windowWidth -windowMargin, windowHeight -windowMargin);
  canvas.parent("screen");
}


function draw() {
  background("lightblue");
}


function windowResized() {
  resizeCanvas(windowWidth -windowMargin, windowHeight -windowMargin);
}