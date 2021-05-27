"use strict";

//Variable Declarations
let accelerate = true;
let speed = 1;
let currentSpeed = speed;
let acceleration = 0.007;
const gravity = 5;
let currentGravity = gravity;
let playerIsJumping = false;
const jumpDuration = 20; //Frames
let currentjumpPosition = -1;

let spikesCanSpawn = false;
let gameOver = false;
let canvas = null;
let score = 0;
let highScore = 0;
let tutorialEnded = false;

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
const spikeHeight = 50;

//Canvas Methods
function preload() {
  groundImage = loadImage("sprites/ground.png");
  playerImage = loadImage("sprites/player.png");
  spikeImage = loadImage("sprites/spike.png");
}


function setup() {
  canvas = createCanvas(900, 500);
  canvas.parent("screen");
  initGame();
}


function draw() {
  textSize(30);
  if (gameOver) {
    gameOverScene();
    return;
  }
  
  background("lightblue");
  drawSprites();

  if (!tutorialEnded) {
    text("Press Space to Jump", 500, 200);
    text("Avoid The Spikes", 1000, 200);
    text("Good Luck! ( ͡° ͜ʖ ͡°)", 1500, 200);
  }
  
  if (player.position.x >= 2000) {
    spikesCanSpawn = true;
    tutorialEnded = true;
  }
  
  //Weird accelerate boolean switching so that accelerates after every other frame
  if (accelerate) {
    currentSpeed += acceleration;
    accelerate = false;
  } else {
    accelerate = true;
  }
  currentSpeed += acceleration;
  
  player.position.x = player.position.x + currentSpeed;
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
  
  if (player.overlap(spikeGroup)) {
    gameOver = true;
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
  score += Math.floor(currentSpeed);
  text(`Score: ${score}`, camera.position.x - currentSpeed - 440, camera.position.y - 220);
  text(`High Score: ${highScore}`, camera.position.x - currentSpeed - 440, camera.position.y - 180);

  if (score >= highScore) highScore = score;
}


function generateTerrain() {
  groundArray = groundGroup.toArray();
  lastGround = groundArray[groundArray.length - 1];
  
  ground = createSprite(lastGround.position.x + width, 400, width, groundHeight);
  ground.addImage(groundImage);
  ground.setDefaultCollider();
  groundGroup.add(ground);
  
  
  if (spikesCanSpawn) {
    const r = randomInt(1, 6);
    if (r > 2) {
      const spikeX = randomInt(0, Math.round(width / 3));
      spike = createSprite(ground.position.x + spikeX, 277, spikeWidth, spikeHeight);
      spike.addImage(spikeImage);
      spike.setDefaultCollider();
      spikeGroup.add(spike);
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


function gameOverScene() {
  background("white");
  textStyle(BOLD);
  textAlign(CENTER);
  stroke("black");
  
  fill("red");
  strokeWeight(3);
  text("YOU DIED", camera.position.x, 100);
  fill("black");
  strokeWeight(1);
  
  fill("black");
  text(`Score: ${score}`, camera.position.x, 200);
  text(`High Score: ${highScore}`, camera.position.x, 250);
  
  fill("yellow");
  strokeWeight(3);
  text("Click Anywhere To Play Again", camera.position.x, 350);
  
  //Reset styles
  textAlign(LEFT);
  noStroke();
}


function initGame() {
  groundGroup = new Group();
  ground = createSprite(0, 400, width, groundHeight);
  ground.addImage(groundImage);
  ground.setDefaultCollider();
  groundGroup.add(ground);
  
  spikeGroup = new Group();
  
  player = createSprite(0, 150, 30, 30);
  player.addImage(playerImage);
}


function mousePressed() {
  if (!gameOver) return;
  
  player.visible = false;
  gameOver = false;
  groundGroup.removeSprites();
  spikeGroup.removeSprites();
  
  currentSpeed = speed + 4;
  currentjumpPosition = -1;
  playerIsJumping = false;
  score = 0;
  
  ground = createSprite(0, 400, width, groundHeight);
  ground.addImage(groundImage);
  ground.setDefaultCollider();
  groundGroup.add(ground);
  player = createSprite(0, 150, 30, 30);
  player.addImage(playerImage);
}



//UTILS
function randomInt(min, max) {
  const randomFloat = Math.random() * (max - min) + min;
  return Math.floor(randomFloat);
}