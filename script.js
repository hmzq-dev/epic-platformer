"use strict"

//Variable Declarations
let speed = 10;
const gravity = 5;
let currentGravity = gravity;
let playerIsJumping = false;
let jumpDuration = 30; //Frames
let currentjumpPosition = -1;

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
  ground.setDefaultCollider();
  groundGroup.add(ground);
  
  player = createSprite(100, 100, 30, 30);
}


function draw() {
  background("lightblue");
  drawSprites();
  generateTerrain();
  
  speed += 0.08;
  player.position.x = player.position.x + speed;
  player.position.y = player.position.y + currentGravity;
  camera.position.x = player.position.x + width/4;
  
  if (player.overlap(groundGroup)) {
    //currentGravity = 0;
    jump();
  } else if (!playerIsJumping) {
    currentGravity = gravity;
  }
  
  if (playerIsJumping) {
    currentjumpPosition += 1;
    if (currentjumpPosition === jumpDuration) {
      currentjumpPosition = -1;
      playerIsJumping = false;
    }
  }
  
  //Update and display score
  textSize(30);
  score += Math.floor(speed);
  text(`Score: ${score}`, camera.position.x - speed - 400, camera.position.y - 170);
}


function generateTerrain() {
  groundArray = groundGroup.toArray();
  lastGround = groundArray[groundArray.length - 1];
  
  ground = createSprite(lastGround.position.x + width, 300, width, groundHeight);
  ground.setDefaultCollider();
  groundGroup.add(ground);
}


function jump() {
  currentGravity = 0 - gravity;
  playerIsJumping = true;
  currentjumpPosition = 0;
}