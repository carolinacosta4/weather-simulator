import Rain from "./rain.js"
import Cloud from "./cloud.js"
import Flake from "./snow.js"

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width; const H = canvas.height;

let weather = ""
let raindrops = [];
let allSnowFlakes = new Array();
let clouds = [];
let waterLevel = 0;

let rainyTree = new Image();
rainyTree.src = 'assets/tree_rain.png';
let rainGround = new Image();
rainGround.src = 'assets/ground_brown.png';
let sun = new Image();
sun.src = 'assets/sun.png';
let snowyTree = new Image();
snowyTree.src = 'assets/tree_snow.png';
let snowyGround = new Image();
snowyGround.src = 'assets/ground_snow.jpg';
let sunnyTree = new Image();
sunnyTree.src = 'assets/tree_sunny.png';
let ground = new Image();
ground.src = 'assets/ground_sunny.png';

document.getElementById("rain").addEventListener("click", () => {
    resetAnimation()
    weather = "rain"
    ctx.clearRect(0, 0, W, H);
    raindrops = [];
    canvas.classList.remove("snow-bg");
    canvas.classList.remove("sun-bg");
    canvas.classList.add("rain-bg");
    initRain();
    setTimeout(render, 2000);
    ctx.drawImage(rainyTree, 140, 192, 200, 208);
    initCloud()
    renderCloud()
})

let snowButton = document.getElementById("snow");
snowButton.addEventListener("click", () => {
    resetAnimation()
    weather = "snow"
    canvas.classList.remove("sun-bg");
    canvas.classList.remove("rain-bg");
    canvas.classList.add("snow-bg");
    snowFlakes(); // init
    setTimeout(render, 2000);
    ctx.drawImage(snowyTree, 140, 192, 200, 208);
    initCloud();
    renderCloud();
})

let sunnyBtn = document.getElementById("sun").addEventListener("click", () => {
    resetAnimation()
    weather="sun"
    canvas.classList.remove("rain-bg")
    canvas.classList.remove("snow-bg")
    canvas.classList.add("sun-bg")
})

function render() {
    if(weather == "rain"){
        ctx.clearRect(0, 0, W, H);

        ctx.drawImage(rainyTree, 140, 192, 200, 208);
        ctx.drawImage(sun, 10, 10, 120, 122);

        initRain();

        raindrops.forEach(function (drop) {
            waterLevel = drop.waterLevel()
            drop.draw();
            drop.update();
        });

        ctx.fillStyle = "blue";
        ctx.fillRect(0, 450 - waterLevel, W, waterLevel);

        ctx.drawImage(rainGround, 0, 400, 500, 100);
        ctx.drawImage(cloud, 320, 40, 180, 100);
        ctx.drawImage(cloud, 160, 10, 180, 100);
        ctx.drawImage(cloud, 0, 40, 180, 100);
    }else if(weather == "snow"){
        //erase the Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(snowyGround, 0, 400, 500, 100);
        ctx.drawImage(snowyTree, 140, 192, 200, 208);

        snowFlakes();

        //draw & update all balls
        allSnowFlakes.forEach(function (flake) {
            flake.draw();
            flake.update();
        });

        ctx.drawImage(snowyGround, 0, 400, 500, 100);
        ctx.drawImage(cloud, 320, 40, 180, 100);
        ctx.drawImage(cloud, 160, 10, 180, 100);
        ctx.drawImage(cloud, 0, 40, 180, 100);
    }else if (weather == "sun") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(sun, 10, 10, 120, 122);
        ctx.drawImage(ground, 0, 400, 500, 100);
        ctx.drawImage(sunnyTree, 140, 192, 200, 208);
        ctx.drawImage(cloud, 320, 10, 180, 100);
        ctx.drawImage(cloud, 160, 40, 180, 100);
    }
    window.requestAnimationFrame(render);
}

function initRain() {
    for (let i = 0; i < 1; i++) {
        let color = "blue";

        let xInit = Math.random() * W;
        let yInit = 100;
        let length = Math.random() * 20 + 10;
        let speed = Math.random() * 5 + 2;

        raindrops.push(new Rain(xInit, yInit, -length, length, speed, color));
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

    if(weather == "rain"){
        ctx.drawImage(rainyTree, 140, 192, 200, 208);
        ctx.drawImage(sun, 10, 10, 120, 122);
        ctx.drawImage(rainGround, 0, 400, 500, 100);
    }else if(weather == "snow"){
        ctx.drawImage(snowyTree, 140, 192, 200, 208);
        ctx.drawImage(snowyGround, 0, 400, 500, 100);
    }

    clouds.forEach(function (cloud) {
        cloud.drawCloud();
        cloud.updateCloud();
    });

    window.requestAnimationFrame(renderCloud);
}

function resetAnimation() {
    raindrops = [];
    allSnowFlakes = [];
    clouds = [];
    waterLevel = 0;
    ctx.clearRect(0, 0, W, H);
}