var bg,bg_img;
var ghost,ghost_anim;
var door,door_img;
var climber,climber_img;
var invblock;
//Groups
var doorsGroup,climbersGroup,invblocksGroup;
//GameStates
var PLAY=1;
var END=0;
var gameState=PLAY;
var restart,restart_img;

//To load sound
var spooky;

function preload()
{
  bg_img=loadImage("tower.png");
  ghost_anim=loadAnimation("ghost-standing.png","ghost-jumping.png");
  door_img=loadImage("door.png");
  climber_img=loadImage("climber.png");
  restart_img=loadImage("restart.png");
  spooky=loadSound("spooky.wav");
}

function setup()
{
  //To create a canvas
  createCanvas(600,600);
  
  bg=createSprite(300,300,10,10);
  
   
  
  bg.velocityY=1.5;
  
  //To create ghost
  ghost=createSprite(300,400,10,10);
  ghost.addAnimation("jump",ghost_anim);
  ghost.scale=0.4;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invblocksGroup=new Group();
  
  restart=createSprite(300,350,10,10);
  restart.addImage(restart_img);
  restart.scale=0.4;
  
}

function draw()
{
  if(gameState===PLAY)
  {
    
    spooky.loop();
    
    restart.visible=false;
    //bg.visible=true;
     bg.addImage(bg_img);
    
      if(keyDown("space"))
  {
    ghost.velocityY=-5;  
  }
  
  if(keyDown(LEFT_ARROW))
  {
    ghost.velocityX=-3;  
  }
  
  if(keyDown(RIGHT_ARROW))
  {
      ghost.velocityX=3;
  }
    
  if(ghost.y>600||ghost.x>600||ghost.x<0||ghost.isTouching(invblocksGroup))
    {
      gameState=END;
    }
    
  //To add gravity to ghost movement
  ghost.velocityY=ghost.velocityY+0.8;
  
  
  if(ghost.isTouching(climbersGroup))
    {
      ghost.velocityY=0;
    }
    
  
  //Calling other function in draw function
  doors();
    
    
  }
  else if(gameState===END)
  {
    restart.visible=true;
    
    bg.visible=false; 
    background("black");
    climbersGroup.destroyEach();
    invblocksGroup.destroyEach();
    doorsGroup.destroyEach();
    
    ghost.destroy();
    textSize(50);
    fill("yellow");
    stroke("orange");
    strokeWeight(4);
    text("GAME OVER",150,300);
    
    if(mousePressedOver(restart))
      {
        reset();
      }
    
  }

  //To provide infinitely scrolling effect to tower  
  if(bg.y>400)
  {
   bg.y=height/2;   
  }
  
  //to draw the sprites
  drawSprites();
  
}

function doors()
{
  if(frameCount%180===0)
  {
   door=createSprite(Math.round(random(100,500)),0,10,10);
   door.addImage(door_img);
   door.velocityY=2;
   door.lifetime=300;
   doorsGroup.add(door);
   ghost.depth=door.depth
   ghost.depth=ghost.depth+1; 
    
   climber=createSprite(door.x,70,10,10);
   climber.addImage(climber_img);
   climber.velocityY=2;
   climber.lifetime=300;
   climbersGroup.add(climber);
    
   invblock=createSprite(door.x,90,10,10);
   invblock.debug=true;
   invblock.velocityY=2;
   invblock.visible=true;
   invblock.setCollider("rectangle",0,0,100,8);
   invblock.lifetime=300;
   invblocksGroup.add(invblock);
  
 }
}

function reset()
{
  gameState=PLAY;
}