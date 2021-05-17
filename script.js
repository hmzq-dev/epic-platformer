//Variable Declarations
let groundImage;
let platformImage;
let playerImage;
let skyImage;
let spikeImage;


//Canvas Methods
function preload() {
  groundImage = loadImage("sprites/ground.png");
  platformImage = loadImage("sprites/platform.png");
  playerImage = loadImage("sprites/player.png");
  skyImage = loadImage("sprites/sky.png");
  spikeImage = loadImage("sprites/spike.png");
}


function setup() {
  createCanvas(800, 400);
}


function draw() {
  background("black")
}