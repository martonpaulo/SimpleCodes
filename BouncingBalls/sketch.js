// Chaotic Balls in p5.js

// gravity works only on the y-axis
const gravity = [0, 0.2];
const density = 0.1;
const minRadius = 10;
const maxRadius = 30;
const reloadTime = 25;

var isMouseClicked = false;
var time = 0;
balls = [];


class Ball{

  constructor(x, y, vX, vY){
    this.position = [x, y];
    this.velocity = [vX, vY];
    this.radius = random(minRadius, maxRadius);
    this.mass = Math.pow(this.radius * density, 2);
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }
  
  show(){
    fill(this.color);
    strokeWeight(0);
    circle(this.position[0], this.position[1], this.radius*2);
  }
  
  
  checkCollision(){
    
    if(this.radius + this.position[1] >= height){
      return 'down';
      
    }else if(this.position[1] - this.radius <=0){
      return 'up';
      
    }else if(this.radius + this.position[0] >= width){
      return 'right';
             
    }else if(this.position[0] - this.radius <=0){
      return 'left';  

    }else{
      return 'none';
    }

  }
  



  update(){
    
    this.position = vectorSum(this.position, this.velocity);
    
    this.velocity = vectorSum(this.velocity, [gravity[0], gravity[1]*this.mass]);
    
    switch(this.checkCollision()){
        
      case 'down':
        this.velocity[1] = -this.velocity[1];
        this.position[1] = height - this.radius;
        break;
        
      case 'up':
        this.velocity[1] = -this.velocity[1];
        this.position[1] = this.radius+1;
        break;
        
      case 'right':
        this.velocity[0] = -this.velocity[0];
        this.position[0] = width - this.radius;
        break;
        
      case 'left':
        this.velocity[0] = -this.velocity[0];
        this.position[0] = this.radius+1;
        break;
        
    }

  }
  
 
  
}


function setup(){
  createCanvas(windowWidth*displayDensity(), windowHeight*displayDensity());
}


function mouseClicked(){
  balls.push(new Ball(mouseX, mouseY, mouseX-pmouseX, mouseY-pmouseY));
  isMouseClicked = true;
}


function displayBalls(){
  for(let ball of balls){
    ball.show();
  }
}


function updateBalls(){
  for(let ball of balls){
    ball.update();
  }
}



function draw(){

  background(120, 143, 160);
  
  updateBalls();
  displayBalls();

  if(!isMouseClicked && ((Math.floor(time/reloadTime))%2 === 0)){
    textAlign(CENTER, CENTER);
    text('Click anywhere!', width * 0.5, height * 0.4);
    textSize((width)/10);
    textFont('Trebuchet MS');
    fill(0);
  }


  time++;
}
