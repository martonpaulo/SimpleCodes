// Chaotic Balls in p5.js

// gravity works only on the y-axis
const gravity = [0, 0.1];
const density = 0.1;
const minRadius = 10;
const maxRadius = 30;


balls = [];


class Ball{

  constructor(x, y, vX, vY){
    this.position = [x, y];
    this.velocity = [vX, vY];
    this.radius = random(minRadius, maxRadius);
    this.mass = Math.pow(this.radius * density, 3);
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
  

  /*
  getExternalCoordinates(){
    
    let coordinates = [];

    for(let angle=0; angle<360; angle++){

      let coordinateX = this.radius * Math.sin(Math.PI * 2 * angle / 360);
      var coordinateY = this.radius * Math.cos(Math.PI * 2 * angle / 360);

      coordinates.push([Math.round(coordinateX*100)/100, Math.round(coordinateY*100)/100]);

    }

    return coordinates;

  }
  */



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

        // '+1' is a 'gambiarra'¹ to fix a bug
        // ¹ https://www.urbandictionary.com/define.php?term=Gambiarra

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
