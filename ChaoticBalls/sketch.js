// Chaotic Balls in p5.js

// gravity works only on the y-axis
const gravity = [0, 0.3];

balls = [];


class Ball{
  constructor(x, y, vX, vY){
    this.position = [x, y];
    this.velocity = [vX, vY];
    this.radius = random(10, 30);
    this.mass = Math.pow(this.radius/100, 3);
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
    
    this.velocity = vectorSum(this.velocity, gravity);
    
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
  createCanvas(windowWidth, windowHeight);
}


function mouseClicked(){
  balls.push(new Ball(mouseX, mouseY, mouseX-pmouseX, mouseY-pmouseY));
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
}
