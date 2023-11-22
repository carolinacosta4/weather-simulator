import Rain from "./rain.js"
import Cloud from "./cloud.js"
import Flake from "./snow.js"

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width; const H = canvas.height;


let weather = "sun" // TT
let raindrops = [];
let allSnowFlakes = new Array();
let clouds = [];
let lastWeather = "sun";
let snowLevel = 0;
let lastLastWeather = "sun"
let rainVelocity = 0;
let snowVelocity = 0;
let flashInterval = ""
let isAnimating = false
let raining = true;
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
    // if (!isAnimating) { 
    //     isAnimating = true;
        resetAnimation()
        weather = "rain"
        ctx.clearRect(0, 0, W, H);
        raindrops = [];
        canvas.classList.remove(`${lastWeather}-bg`);
        canvas.classList.remove(`${lastLastWeather}-${lastWeather}-bg`);
        canvas.classList.add(`${lastWeather}-${weather}-bg`);
        canvas.classList.add(`${weather}-bg`);
        initRain();
        // // TT
        // setTimeout(() => {
        //     render()
        //     isAnimating = false;
        // }, 2000)
        ctx.drawImage(rainyTree, 140, 192, 200, 208);
        // initCloud()
        // renderCloud()
        flashInterval = setInterval(flashEffect, 3000)
        lastLastWeather = lastWeather
        lastWeather = "rain"
    // }
})

let snowButton = document.getElementById("snow");
snowButton.addEventListener("click", () => {
    resetAnimation()
    weather = "snow"
    canvas.classList.remove(`${lastWeather}-bg`);
    canvas.classList.remove(`${lastLastWeather}-${lastWeather}-bg`);
    canvas.classList.add(`${lastWeather}-${weather}-bg`);
    canvas.classList.add(`${weather}-bg`);
    snowFlakes(); // init
    setTimeout(render, 2000);
    ctx.drawImage(snowyTree, 140, 192, 200, 208);
    initCloud();
    renderCloud();
    lastLastWeather = lastWeather
    lastWeather = "snow"
})

let sunRotationAngle = 0;

function rotateSun() {
    sunRotationAngle += 5; // Ajuste o valor para a velocidade desejada de rotação
    ctx.clearRect(0, 0, W, H); // Limpa o canvas
    ctx.save(); // Salva o estado do contexto
    ctx.translate(70, 70); // Move o ponto de rotação para o centro do sol
    ctx.rotate((Math.PI / 180) * sunRotationAngle); // Rotaciona o contexto
    ctx.drawImage(sun, -60, -60, 120, 122); // Desenha o sol
    ctx.restore(); // Restaura o estado do contexto
}

let sunnyBtn = document.getElementById("sun")
sunnyBtn.addEventListener("click", () => {
    resetAnimation()
    weather="sun"
    canvas.classList.remove(`${lastWeather}-bg`);
    canvas.classList.remove(`${lastLastWeather}-${lastWeather}-bg`);
    canvas.classList.add(`${lastWeather}-${weather}-bg`);
    canvas.classList.add(`${weather}-bg`);
    sunny();
    rotateSun();
    lastLastWeather = lastWeather
    lastWeather = "sun"
    
})

function sunny(){
    ctx.clearRect(0, 0, W, H);
    rotateSun();
    ctx.drawImage(sunnyTree, 140, 192, 200, 208);
    ctx.drawImage(ground, 0, 400, 500, 100);
    ctx.drawImage(sun, 10, 10, 120, 122);
    ctx.drawImage(cloud, 320, 10, 180, 100);
    ctx.drawImage(cloud, 160, 40, 180, 100);
}

function render() {
    let waterLevel = 0;
    // console.log("RENDER ", weather)
    ctx.clearRect(0, 0, W, H);
    if(weather == "rain"){
        ctx.drawImage(rainyTree, 140, 192, 200, 208);
        ctx.drawImage(sun, 10, 10, 120, 122);

        initRain();
        // console.log("Rain", raindrops.length)
        raindrops.forEach(function (drop) {
            drop.draw();
            drop.update();
            waterLevel += drop.getWaterLevel()
        });

        ctx.fillStyle = "blue";
        ctx.fillRect(0, 450 - waterLevel, W, waterLevel);

        ctx.drawImage(rainGround, 0, 400, 500, 100);
        ctx.drawImage(cloud, 320, 40, 180, 100);
        ctx.drawImage(cloud, 160, 10, 180, 100);
        ctx.drawImage(cloud, 0, 40, 180, 100);
    }else if(weather == "snow"){
        ctx.drawImage(snowyGround, 0, 400, 500, 100);
        ctx.drawImage(snowyTree, 140, 192, 200, 208);

        snowFlakes();

        //draw & update all balls
        allSnowFlakes.forEach(function (flake) {
            flake.draw();
            flake.update();
            snowLevel = flake.snowLevel()
        });

        ctx.fillStyle = "white";
        ctx.fillRect(0, 450 - snowLevel, W, snowLevel);

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
render(); // // TT

function initRain() {
    rainVelocity = Math.random() * 5 + 2
    for (let i = 0; i < 1; i++) {
        let color = "blue";

        let xInit = Math.random() * W;
        let yInit = 100;
        let length = Math.random() * 20 + 10;
        rainVelocity = Math.random() * 5 + 2

        raindrops.push(new Rain(xInit, yInit, -length, length, rainVelocity, color, 0));
    }
    // console.log('initRain() ', rainVelocity);
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
        snowVelocity = 1 + Math.floor(Math.random() * (0.01 - 0.005 + 1) + 0.005)

        // x, y, r, v, c
        allSnowFlakes.push(new Flake(xInit, yInit, radius, snowVelocity, color))
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
    }else if (weather=="sun") {
        ctx.drawImage(sun, 10, 10, 120, 122);
        ctx.drawImage(ground, 0, 400, 500, 100);
        ctx.drawImage(sunnyTree, 140, 192, 200, 208);
        ctx.drawImage(cloud, 320, 10, 180, 100);
        ctx.drawImage(cloud, 160, 40, 180, 100);
    }

    clouds.forEach(function (cloud) {
        cloud.drawCloud();
        cloud.updateCloud();
    });

    window.requestAnimationFrame(renderCloud);
}

function resetAnimation() {
    // console.log('reseting....');
    clearInterval(flashInterval);
    raindrops = [];
    allSnowFlakes = [];
    clouds = [];
    snowLevel = 0;
    rainVelocity = 0;
    snowVelocity = 0;
    ctx.clearRect(0, 0, W, H);
}

function flashEffect(){
    if(weather == "rain"){
        canvas.style.backgroundColor = "white";
        setTimeout(() => {
            canvas.style.backgroundColor = "";
            canvas.classList.add("rain-bg");
            ctx.clearRect(50, 50, 400, 300);
        }, 100)

        setTimeout(() => {
            canvas.style.backgroundColor = "white";
            canvas.classList.add("rain-bg");
        }, 150)

        setTimeout(() => {
            canvas.style.backgroundColor = "";
            canvas.classList.add("rain-bg");
            ctx.clearRect(50, 50, 400, 300);
        }, 250)
    }else{
        canvas.style.backgroundColor = "";
    }
}