const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width; const H = canvas.height;

let cloud = new Image();
cloud.src = 'assets/cloud.png';
let cloudX1 = 320
let cloudX2 = 160
cloud.onload = function(){
    ctx.drawImage(cloud, cloudX1, 10, 180, 100);
    ctx.drawImage(cloud, cloudX2, 40, 180, 100);
}

let rain = document.getElementById("rain").addEventListener("click", () => {
    canvas.classList.remove("sun-bg")
    canvas.classList.add("rain-bg")
    // setInterval(init, 10000);    
    // setInterval(render, 10000);
    init()
    render()
    ctx.drawImage(rainyTree, 140, 192, 200, 208);
    cloudX1 -= 100
    cloudX2 -= 100
    ctx.drawImage(cloud, cloudX1, 10, 180, 100);
    ctx.drawImage(cloud, cloudX2, 40, 180, 100);
    initCloud()
    renderCloud()
})

let rainyTree = new Image();
rainyTree.src = 'assets/tree_rain.png';
let ground = new Image();
ground.src = 'assets/ground.jpg';
let sun = new Image();
sun.src = 'assets/sun.png';

let raindrops = new Array();

class Rain {
    constructor(x, y, dY, length, speed, color) {
        this.x = x;
        this.y = y;
        this.dY = dY;
        this.length = length;
        this.speed = speed;
        this.color = color;
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.stroke();
    }

    update() {
        this.y += this.speed;
        if (this.y > 398){
            this.y = 398;
            this.speed = 0
            this.length = 2
        }
    }
}

function init() {
    for (let i = 0; i < 1; i++) {
        let color = "#00F";

        let xInit = Math.random() * W;
        let yInit = 100;
        let length = Math.random() * 20 + 10;
        let speed = Math.random() * 5 + 2

        raindrops.push(new Rain(xInit, yInit, -length, length, speed, color))
    }
}

function render() {
    ctx.clearRect(0, 0, W, H);

    ctx.drawImage(rainyTree, 140, 192, 200, 208);
    ctx.drawImage(sun, 10, 10, 120, 122);

    init()

    raindrops.forEach(function (drop) {
        drop.draw();
        drop.update();
    });
    window.requestAnimationFrame(render);

    ctx.drawImage(ground, 0, 400, 500, 100);
    ctx.drawImage(cloud, 320, 40, 180, 100);
    ctx.drawImage(cloud, 160, 10, 180, 100);
    ctx.drawImage(cloud, 0, 40, 180, 100);
}

// let clouds = []

// class Cloud {
//     constructor(x) {
//         this.x = x;
//     }

//     drawCloud() {
//         ctx.drawImage(cloud, this.x, 10, 120, 122);
//         ctx.drawImage(cloud, this.x, 10, 120, 122);
//     }

//     updateCloud() {
//         this.x += 2;
//     }
// }

// function initCloud() {
//     for (let i = 0; i < 1; i++) {
//         let xInit = Math.random() * W;

//         clouds.push(new Cloud(xInit))
//     }
// }

// function renderCloud() {
//     ctx.clearRect(0, 0, W, H);

//     clouds.forEach(function (cloud) {
//         cloud.drawCloud();
//         cloud.updateCloud();
//     });
    
// }

window.requestAnimationFrame(renderCloud)