import Rain from "./rain.js"
import Cloud from "./cloud.js"
import Flake from "./snow.js"

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width; const H = canvas.height;

// MODAL INICIAL
let modal = document.getElementById('myModal');
modal.style.display = 'none';

function openModal() {
    modal.style.display = 'flex';
}

document.getElementById('btnPlay').addEventListener('click', () => {
    modal.style.display = 'none';
})

document.addEventListener("DOMContentLoaded", openModal())

let weather = "sun" 
let raindrops = [];
let allSnowFlakes = new Array();
let clouds = [];
let lastWeather = "sun";
let lastLastWeather = "sun"
let flashInterval = ""
let sunRotationAngle = 0;

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
let cloud = new Image();
cloud.src = 'assets/cloud.png';

document.getElementById("rain").addEventListener("click", () => {
    resetAnimation()
    weather = "rain"
    ctx.clearRect(0, 0, W, H);
    canvas.classList.remove(`${lastWeather}-bg`);
    canvas.classList.remove(`${lastLastWeather}-${lastWeather}-bg`);
    canvas.classList.add(`${lastWeather}-${weather}-bg`);
    canvas.classList.add(`${weather}-bg`);
    if(lastWeather != "snow"){
        setTimeout(initRain, 3000);
    }else{
        initRain()
    }
    ctx.drawImage(rainyTree, 250, 402, 350, 358);
    initCloud();
    flashInterval = setInterval(flashEffect, 3000)
    lastLastWeather = lastWeather
    lastWeather = "rain"
})

let snowButton = document.getElementById("snow");
snowButton.addEventListener("click", () => {
    resetAnimation()
    weather = "snow"
    ctx.clearRect(0, 0, W, H);
    canvas.classList.remove(`${lastWeather}-bg`);
    canvas.classList.remove(`${lastLastWeather}-${lastWeather}-bg`);
    canvas.classList.add(`${lastWeather}-${weather}-bg`);
    canvas.classList.add(`${weather}-bg`);
    if(lastWeather != "rain"){
        setTimeout(snowFlakes, 3000); // init
    }else{
        snowFlakes() // init
    }
    ctx.drawImage(snowyTree, 250, 402, 350, 358);
    initCloud()
    lastLastWeather = lastWeather
    lastWeather = "snow"
})

let sunnyBtn = document.getElementById("sun")
sunnyBtn.addEventListener("click", () => {
    resetAnimation()
    weather="sun"
    ctx.clearRect(0, 0, W, H);
    canvas.classList.remove(`${lastWeather}-bg`);
    canvas.classList.remove(`${lastLastWeather}-${lastWeather}-bg`);
    canvas.classList.add(`${lastWeather}-${weather}-bg`);
    canvas.classList.add(`${weather}-bg`);
    ctx.drawImage(sunnyTree, 250, 402, 350, 358);
    ctx.drawImage(ground, 0, 760, 580, 150);
    ctx.drawImage(ground, 540, 760, 580, 150);
    if(lastWeather != "sun"){
        initCloud()
    }
    lastLastWeather = lastWeather
    lastWeather = "sun"
})

function rotateSunWithAnimation() {
    ctx.save()
    ctx.clearRect(0, 0, W, H); // Limpa o canvas
    ctx.translate(126, 96)
    ctx.rotate((Math.PI / 180) * sunRotationAngle); // Rotaciona o contexto
    ctx.drawImage(sun,-86,-86, 172, 172); // Desenha o sol  
    sunRotationAngle += 0.5
    ctx.restore();
}

function render() {
    let waterLevel = 0;
    let snowLevel = 0;

    if(weather == "rain"){
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(sun, 40, 10, 172, 172);

        setTimeout(initRain, 3000)
        raindrops.forEach(function (drop) {
            drop.draw();
            drop.update();
            waterLevel += drop.getWaterLevel()
        });

        ctx.fillStyle = "blue";
        ctx.fillRect(0, 820 - waterLevel, W, waterLevel);

        ctx.drawImage(rainyTree, 250, 402, 350, 358);
        ctx.drawImage(rainGround, 0, 760, 580, 150);   
        ctx.drawImage(rainGround, 540, 760, 580, 150);
    }else if(weather == "snow"){
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(snowyGround, 0, 760, 580, 150);
        ctx.drawImage(snowyGround, 540, 760, 580, 150);
        setTimeout(snowFlakes, 3000);

        allSnowFlakes.forEach(function (flake) {
            flake.draw();
            flake.update();
            snowLevel += flake.getSnowLevel();
        });

        ctx.fillStyle = "white";
        ctx.fillRect(0, 820 - snowLevel, W, snowLevel);

        ctx.drawImage(snowyGround, 0, 760, 580, 150);
        ctx.drawImage(snowyGround, 540, 760, 580, 150);
    }else if (weather == "sun") {
        rotateSunWithAnimation()
        ctx.drawImage(sunnyTree, 250, 402, 350, 358);
        ctx.drawImage(ground, 0, 760, 580, 150);
        ctx.drawImage(ground, 540, 760, 580, 150);
    }
    window.requestAnimationFrame(render);
}

render(); 
renderCloud()

function initRain() {
    let color = "blue";

    let xInit = Math.random() * W;
    let yInit = 140;
    let length = Math.random() * 20 + 10;
    let rainVelocity = Math.random() * 5 + 2

    raindrops.push(new Rain(xInit, yInit, -length, length, rainVelocity, color, 0));
}

// INIT SNOWFLAKES
function snowFlakes(){
    for (let i = 0; i < 1; i++) {
        let color = '#ffffff';
        let radius = 2 + Math.floor(Math.random() * (6 - 2 + 1) + 2);

        let xInit = radius + Math.random() * (W - 2 * radius);
        let yInit = 140;

        let snowVelocity = Math.random() * 1 + 0.5
        allSnowFlakes.push(new Flake(xInit, yInit, radius, snowVelocity, color, 0))
    }
}

function initCloud() {
    if(weather != "sun"){
        if((lastWeather == "snow" && weather == "rain") || (lastWeather == "rain" && weather == "snow")){
            let startX1 = 0; 
            let startX2 = 220; 
            let startX3 = 440;
            let startX4 = 660;
            let stopX1 = 0; 
            let stopX2 = 220;
            let stopX3 = 440;
            let stopX4 = 660;

            let y1 = 60;
            let y2 = 20;

            clouds.push(new Cloud(startX1, stopX1, y1, 1));
            clouds.push(new Cloud(startX2, stopX2, y2, 1));
            clouds.push(new Cloud(startX3, stopX3, y1, 1));
            clouds.push(new Cloud(startX4, stopX4, y2, 1));
        }else{
            let startX1 = 920; 
            let startX2 = 1140; 
            let startX3 = 1360;
            let startX4 = 1580;
            let stopX1 = 0; 
            let stopX2 = 220;
            let stopX3 = 440;
            let stopX4 = 660;

            let y1 = 60;
            let y2 = 20;

            clouds.push(new Cloud(startX1, stopX1, y1, 1));
            clouds.push(new Cloud(startX2, stopX2, y2, 1));
            clouds.push(new Cloud(startX3, stopX3, y1, 1));
            clouds.push(new Cloud(startX4, stopX4, y2, 1));
        }
    }else{
        let startX1 = 0; 
        let startX2 = 220; 
        let startX3 = 440;
        let startX4 = 660;
        let stopX1 = 920; 
        let stopX2 = 920;
        let stopX3 = 920;
        let stopX4 = 920;

        let y1 = 60;
        let y2 = 20;

        clouds.push(new Cloud(startX1, stopX1, y1, -1));
        clouds.push(new Cloud(startX2, stopX2, y2, -1));
        clouds.push(new Cloud(startX3, stopX3, y1, -1));
        clouds.push(new Cloud(startX4, stopX4, y2, -1));
    }
        
}

function renderCloud() {
    if (weather == "rain") {
        ctx.drawImage(rainyTree, 250, 402, 350, 358);
        ctx.drawImage(rainGround, 0, 760, 580, 150); 
        ctx.drawImage(rainGround, 540, 760, 580, 150); 
        ctx.drawImage(sun, 40, 10, 172, 172); 
    } else if (weather == "snow") {
        ctx.drawImage(snowyTree, 250, 402, 350, 358); 
        ctx.drawImage(snowyGround, 0, 760, 580, 150);
        ctx.drawImage(snowyGround, 540, 760, 580, 150);
    } else if (weather == "sun") {
        ctx.drawImage(sunnyTree, 250, 402, 350, 358); 
        ctx.drawImage(ground, 0, 760, 580, 150);
        ctx.drawImage(ground, 540, 760, 580, 150);
    }

    clouds.forEach(function (cloud) {
        cloud.drawCloud();
        cloud.updateCloud();
    });

    window.requestAnimationFrame(renderCloud);
}

function resetAnimation() {
    clearInterval(flashInterval);
    raindrops = [];
    allSnowFlakes = [];
    clouds = [];
    ctx.clearRect(0, 0, W, H);
}

function flashEffect() {
    if (weather == "rain") {
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
    } else {
        canvas.style.backgroundColor = "";
    }
}

function reduceRainWaterLevel() {
    if (weather == "rain") {
        // Reduza gradualmente o nível da água da chuva
        let reduceInterval = setInterval(() => {
            raindrops.forEach((drop) => {
                drop.reduceWater();
            });

            if (raindrops[0].getWaterLevel() <= 0) {
                clearInterval(reduceInterval);
            }
        }, 500); // Ajuste o intervalo conforme necessário
    }
}
