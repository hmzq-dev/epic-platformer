"use strict";

//Variable Declarations
let speed = 3;
let acceleration = 0.02;
const gravity = 5;
let currentGravity = gravity;
let playerIsJumping = false;
let jumpDuration = 20; //Frames
let currentjumpPosition = -1;

let spikesCanSpawn = false;
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

let spikeGroup;
let spike;
let spikeImage;
const spikeWidth = 30;
const spikeHeight = 30;

//Canvas Methods
function preload() {
  cloudImage = loadImage("sprites/cloud.png");
  groundImage = loadImage("sprites/ground.png");
  playerImage = loadImage("sprites/player.png");
  spikeImage = loadImage("sprites/spike.png");
}


function setup() {
  noStroke();
  canvas = createCanvas(900, 500);
  canvas.parent("screen");
  
  groundGroup = new Group();
  ground = createSprite(0, 400, width, groundHeight);
  ground.setDefaultCollider();
  groundGroup.add(ground);
  
  spikeGroup = new Group();
  
  player = createSprite(0, 250, 30, 30);
}


function draw() {
  background("lightblue");
  drawSprites();
  textSize(30);
  text("Press Space to Jump", 500, 200);
  text("Avoid The Spikes", 1000, 200);
  text("Good Luck! ( ͡° ͜ʖ ͡°)", 1500, 200)
  
  
  if (player.position.x >= 1600) {
    acceleration = 0.03;
    spikesCanSpawn = true;
  }
  
  speed += acceleration;
  
  player.position.x = player.position.x + speed;
  player.position.y = player.position.y + currentGravity;
  camera.position.x = player.position.x + width/4;
  
  
  //Generate terrain if player is after the center of the second last ground
  if (ground.position.x - width/2 < player.position.x) {
    generateTerrain();
  }
  
  if (player.overlap(groundGroup)) {
    currentGravity = 0;
    if (keyIsDown(32)) jump();
    
  } else if (!playerIsJumping) {
    currentGravity = gravity;
  }
  
  //Handle player jump initiation and end
  if (playerIsJumping) {
    currentjumpPosition += 1;
    if (currentjumpPosition === jumpDuration) {
      currentjumpPosition = -1;
      playerIsJumping = false;
    }
  }
  
  //Update and display score
  score += Math.floor(speed);
  text(`Score: ${score}`, camera.position.x - speed - 440, camera.position.y - 200);
  text(Math.round(frameRate()), camera.position.x - speed - 200, camera.position.y - 200);
  text(spikeGroup.toArray().length, camera.position.x - speed - 100, camera.position.y - 200);
}


function generateTerrain() {
  groundArray = groundGroup.toArray();
  lastGround = groundArray[groundArray.length - 1];
  
  ground = createSprite(lastGround.position.x + width, 400, width, groundHeight);
  ground.setDefaultCollider();
  groundGroup.add(ground);
  
  
  if (spikesCanSpawn) {
    const r = randomInt(1, 3);
    if (r === 1) {
      const spikeX = randomInt(0, width+1);
      spike = createSprite(ground.position.x + spikeX, 287, spikeWidth, spikeHeight);
      
      spike.setDefaultCollider();
      spikeGroup.add(spike);
      
      spike.debug = true;
    }
  }
  
  //Remove first ground if out of scene
  if (groundArray[0].position.x + width <= camera.position.x - width / 2) {
    groundArray[0].remove();
  }
}


function jump() {
  currentGravity = 0 - gravity;
  playerIsJumping = true;
  currentjumpPosition = 0;
}




//UTILS
function randomInt(min, max) {
  const randomFloat = Math.random() * (max - min) + min;
  return Math.floor(randomFloat);
}