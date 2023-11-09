const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width; const H = canvas.height;


let snowyTree = new Image();
snowyTree.src = 'assets/tree_snow.png';

let ground = new Image();
ground.src = 'assets/ground_snow.jpg';

let cloud = new Image();
cloud.src = 'assets/cloud.png';


let snowButton = document.getElementById("snow");
snowButton.addEventListener("click", () => {
    drawBG();
    snowFlakes(); // init
    letItSnow(); // render
})


function drawBG() {
    ctx.fillStyle = '#e8e9eb';
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(ground, 0, 400, 500, 100);
    ctx.drawImage(snowyTree, 140, 192, 200, 208);
    // ctx.drawImage(cloud, 320, 40, 180, 100);
    // ctx.drawImage(cloud, 160, 10, 180, 100);
    // ctx.drawImage(cloud, 0, 40, 180, 100);
}


let allSnowFlakes = new Array();

class Flake {
    constructor(x, y, radius, speed, color) {   
        this.radius = radius;
        this.x = x; 
        this.y = y; 
        this.speed = speed;           
        this.color = color;             
    }

    
    update() {
        this.y += this.speed;

        if (this.y > 398) {
            this.y = 398;
            this.speed = 0;
        }
        else
            this.y += this.speed; 
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// INIT
function snowFlakes(){
    for (let i = 0; i < 1; i++) {
        let color = '#ffffff';
        //random size
        let radius = 2 + Math.floor(Math.random() * (6 - 2 + 1) + 2);

        // random position (above the Canvas)
        let xInit = radius + Math.random() * (W - 2 * radius);
        let yInit = 100;

        //random velocity
        let velocity = 1 + Math.floor(Math.random() * (0.01 - 0.005 + 1) + 0.005);

        // x, y, r, v, c
        allSnowFlakes.push(new Flake(xInit, yInit, radius, velocity, color))
    }
}

// RENDER
function letItSnow() {
    //erase the Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBG();

    snowFlakes();

    //draw & update all balls
    allSnowFlakes.forEach(function (flake) {
        flake.draw();
        flake.update();
    });

     ctx.drawImage(cloud, 320, 40, 180, 100);
    ctx.drawImage(cloud, 160, 10, 180, 100);
    ctx.drawImage(cloud, 0, 40, 180, 100);
    //new frame
    window.requestAnimationFrame(letItSnow);
}

