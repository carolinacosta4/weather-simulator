const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width; const H = canvas.height;

let rain = document.getElementById("rain").addEventListener("click", () => {
    canvas.classList.remove("sun-bg");
    canvas.classList.add("rain-bg");
    init();
    setTimeout(render, 2000);
    ctx.drawImage(rainyTree, 140, 192, 200, 208);
    initCloud();
    renderCloud();
})

let rainyTree = new Image();
rainyTree.src = 'assets/tree_rain.png';
let ground = new Image();
ground.src = 'assets/ground.jpg';
let sun = new Image();
sun.src = 'assets/sun.png';

let raindrops = [];

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
            this.speed = 0;
            this.length = 2;
            waterLevel += 0.1;
        }
    }
}

let waterLevel = 0;

function init() {
    for (let i = 0; i < 1; i++) {
        let color = "blue";

        let xInit = Math.random() * W;
        let yInit = 100;
        let length = Math.random() * 20 + 10;
        let speed = Math.random() * 5 + 2;

        raindrops.push(new Rain(xInit, yInit, -length, length, speed, color));
    }
}

function render() {
    ctx.clearRect(0, 0, W, H);

    ctx.drawImage(rainyTree, 140, 192, 200, 208);
    ctx.drawImage(sun, 10, 10, 120, 122);

    init();

    raindrops.forEach(function (drop) {
        drop.draw();
        drop.update();
    });

    ctx.fillStyle = "blue";
    ctx.fillRect(0, H - waterLevel, W, waterLevel);

    window.requestAnimationFrame(render);

    ctx.drawImage(ground, 0, 400, 500, 100);
    ctx.drawImage(cloud, 320, 40, 180, 100);
    ctx.drawImage(cloud, 160, 10, 180, 100);
    ctx.drawImage(cloud, 0, 40, 180, 100);
}

let clouds = [];

class Cloud {
    constructor(startX, stopX, y) {
        this.x = startX;
        this.startX = startX; 
        this.stopX = stopX; 
        this.y = y;
    }

    drawCloud() {
        ctx.drawImage(cloud, this.x, this.y, 180, 100);
    }

    updateCloud() {
        if (this.x > this.stopX) {
            this.x -= 2;
        }
    }
}

function initCloud() {
    let startX1 = 160; 
    let startX2 = 320; 
    let startX3 = 480;
    let stopX1 = 0; 
    let stopX2 = 160;
    let stopX3 = 320;

    let y1 = 40;
    let y2 = 10;

    clouds.push(new Cloud(startX1, stopX1, y1));
    clouds.push(new Cloud(startX2, stopX2, y2));
    clouds.push(new Cloud(startX3, stopX3, y1));
}

function renderCloud() {
    ctx.clearRect(0, 0, W, H);

    ctx.drawImage(rainyTree, 140, 192, 200, 208);
    ctx.drawImage(sun, 10, 10, 120, 122);
    ctx.drawImage(ground, 0, 400, 500, 100);

    clouds.forEach(function (cloud) {
        cloud.drawCloud();
        cloud.updateCloud();
    });

    window.requestAnimationFrame(renderCloud);
}