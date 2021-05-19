"use strict"

//Variable Declarations
let canvas = null;
let score = 0;

const groundHeight = 200;
let groundGroup;
let groundArray;
let lastGround;

let player;
let playerImage;
let ground;
let groundImage;
let cloudImage;
let spikeImage;


//Canvas Methods
function preload() {
  cloudImage = loadImage("sprites/cloud.png");
  groundImage = loadImage("sprites/ground.png");
  playerImage = loadImage("sprites/player.png");
  spikeImage = loadImage("sprites/spike.png");
}


function setup() {
  noStroke();
  canvas = createCanvas(800, 400);
  canvas.parent("screen");
  
  groundGroup = new Group();
  ground = createSprite(0, 300, width, groundHeight);
  groundGroup.add(ground);
  
  player = createSprite(100, 100, 30, 30);
  player.velocity.x = 2;
  player.velocity.y = 5;
}


function draw() {
  background("lightblue");
  drawSprites();
  generateTerrain();
  
  camera.position.x += player.velocity.x;
  
  player.overlap(groundGroup, () => player.velocity.y = 0);
  
  player.velocity.x += 0.05;
  
  //Update and display score
  textSize(30);
  score++;
  text(`Score: ${score}`, camera.position.x, camera.position.y - 170);
}


function generateTerrain() {
  groundArray = groundGroup.toArray();
  lastGround = groundArray[groundArray.length - 1];
  
  ground = createSprite(lastGround.position.x + width, 300, width, groundHeight);
  groundGroup.add(ground);
}