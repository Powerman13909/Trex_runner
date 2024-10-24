var trex,trex_running,trex_collided;
var ground,ground_image,invisible_ground;
var edges;
var cloudImg,cloud,cloudGroup;
var obstacle,ob1,ob2,ob3,ob4,ob5,ob6,obstacleGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOver_img;
var restart,restart_img;
var jumpsound;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  
  trex_collided = loadAnimation("trex_collided.png")
  restart_img = loadImage("restart.png");
  gameOver_img = loadImage("gameOver.png");
  jumpsound = loadSound("jump.mp3");
}

function setup() {
  createCanvas(600, 200);
  edges = createEdgeSprites();
  trex = createSprite(50,160,20,50);
  trex.addAnimation("trex",trex_running);
  trex.addAnimation("change",trex_collided);
  trex.scale = 0.5;
  ground = createSprite(200,180,400,20);
  ground.addAnimation("ground",ground_image);
  invisible_ground = createSprite(200,185,400,5);
  cloudGroup = createGroup();
  obstacleGroup = createGroup();
  trex.setCollider("rectangle",150,0,300,trex.height);
 restart = createSprite(300,140)
 restart.addImage("restart", restart_img);
  gameOver = createSprite(300,100);
  gameOver.addImage("gameOver", gameOver_img);
  restart.scale =0.5;
  gameOver.scale = 0.5;
 
   }
function draw() {
  background("white");
  textSize(15)
  text("Score: "+score,500,50);
  console.log(gameState);
  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
     ground.velocityX =  -(6+score/100);
     score = score + Math.round(frameCount/60);
    if(ground.x<0){
    ground.x = ground.width/2;
  }
    if(keyDown("space")  &&  trex.y>=150 ){
    trex.velocityY = -10;
      jumpsound.play();
  }
    if(score>0 && score ==100){
      
    }
  trex.velocityY+=0.5  
  spawnClouds();
  spawnObstacles();
    
    if(obstacleGroup.isTouching(trex)){
      trex.velocityY = -10;
      jumpsound.play();
    
      //gameOver.visible = true;
    //restart.visible = true;
      //gameState = END;
    }
  }
  else if(gameState === END){
     ground.velocityX =  0;
    trex.velocityY = 0; 
    trex.changeAnimation("change", trex_collided)
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();      
    }
  }
  invisible_ground.visible = false;
  
  
  text(mouseX+","+mouseY,mouseX,mouseY);
 
  //trex.collide(edges[3]);
  trex.collide(invisible_ground);
  drawSprites();
}

function spawnClouds(){
  if(frameCount % 60 == 0){
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(20,120));
    cloud.velocityX = -(6+score/100);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.depth = trex.depth;
    trex.depth +=1;
    cloud.lifetime = 300;
    cloudGroup.add(cloud);
    }
}
function spawnObstacles(){
  if(frameCount % 120 == 0){
  obstacle = createSprite(600,165,10,40)
    obstacle.velocityX = -(6+score/100);
    
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(ob1);
        break;
      case 2:obstacle.addImage(ob2);
        break;
      case 3:obstacle.addImage(ob3);
        break;
      case 4:obstacle.addImage(ob4);
        break;
      case 5:obstacle.addImage(ob5);
        break;
      case 6:obstacle.addImage(ob6);
        break;
      default:break;
    }
    
    obstacle.scale = 0.5
    obstacle.lifetime = 400;
    obstacleGroup.add(obstacle)
  }
}

function reset(){
  
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("trex", trex_running);
  score = 0;
}


