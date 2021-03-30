var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var obsImage,cloudImage;
var obstacle1, obstacle2;

var score=0;

var gameOver, restart;



function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  obsImage=loadImage("obstacle1.png");
  cloudImage=loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  camera.x=width/2;
  camera.y= height/2;

  trex = createSprite(camera.x-240, camera.y+70,20,50);
  trex.velocityX= 3;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  var options={
    isStatic:true
  }
  obstacle1 = createSprite(camera.x+100,camera.y+80,30,50,options);
  obstacle1.addImage("image",obsImage);
  obstacle2 = createSprite(camera.x-100, camera.y+80,30,50,options);
  obstacle2.addImage("img",obsImage);
  ground = createSprite(camera.x-40,camera.y+30,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(camera.x-60, camera.y+100,500,10);
  invisibleGround.visible = false;
  

  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
   
  
   
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
   
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  if(trex.isTouching(obstacle1)){
    trex.velocityX=0;
    trex.changeAnimation("collided",trex_collided);
    gameState===END;
    gameOver.visible=true;
    score=0;
   // restart.visible=true;
  }
  if(trex.isTouching(obstacle2)){
    trex.velocityX=0;
    trex.velocityY=0;
    trex.changeAnimation("collided",trex_collided);
    gameState===END;
    gameOver.visible=true;
    score=0;
   // restart.visible=true;
  }
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}