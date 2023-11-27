import Rain from "./rain.js"
import Cloud from "./cloud.js"
import Flake from "./snow.js"

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width; const H = canvas.height;


let weather = "sun" 
let raindrops = [];
let allSnowFlakes = new Array();
let clouds = [];
let lastWeather = "sun";
let snowLevel = 0;
let lastLastWeather = "sun"
let rainVelocity = 0;
let snowVelocity = 0;
let flashInterval = ""

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
    ctx.drawImage(rainyTree, 140, 192, 200, 208);
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
    ctx.drawImage(snowyTree, 140, 192, 200, 208);
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
    ctx.drawImage(sunnyTree, 140, 192, 200, 208);
    ctx.drawImage(ground, 0, 400, 500, 100);
    ctx.drawImage(sun, 10, 10, 120, 122);
    ctx.drawImage(cloud, 320, 10, 180, 100);
    ctx.drawImage(cloud, 160, 40, 180, 100);
    //rotateSunWithAnimation()
    if(lastWeather != "sun"){
        initCloud()
    }
    lastLastWeather = lastWeather
    lastWeather = "sun"
    
})

/*function rotateSunWithAnimation() {
    let sunRotationAngle = 0;

    function rotateSun() {
        ctx.save()
        ctx.clearRect(0, 0, W, H); // Limpa o canvas
        ctx.translate(70, 70)
        ctx.rotate((Math.PI / 180) * sunRotationAngle); // Rotaciona o contexto
        ctx.drawImage(sun,-60,-60, 120, 122); // Desenha o sol  
         sunRotationAngle += 0.5
        ctx.restore();
        ctx.drawImage(sunnyTree, 140, 192, 200, 208);
        ctx.drawImage(ground, 0, 400, 500, 100);
        ctx.drawImage(cloud, 320, 10, 180, 100);
        ctx.drawImage(cloud, 160, 40, 180, 100);
        requestAnimationFrame(rotateSun)
    }
    rotateSun()
    
}*/

function render() {
    let waterLevel = 0;
    let snowLevel = 0;

    ctx.clearRect(0, 0, W, H);
    if(weather == "rain"){
        ctx.drawImage(sun, 10, 10, 120, 122);

        setTimeout(initRain, 3000)
        raindrops.forEach(function (drop) {
            drop.draw();
            drop.update();
            waterLevel += drop.getWaterLevel()
        });

        ctx.fillStyle = "blue";
        ctx.fillRect(0, 450 - waterLevel, W, waterLevel);

        ctx.drawImage(rainGround, 0, 400, 500, 100);
        ctx.drawImage(rainyTree, 140, 192, 200, 208);
    }else if(weather == "snow"){
        ctx.drawImage(snowyGround, 0, 400, 500, 100);
        setTimeout(snowFlakes, 3000);

        allSnowFlakes.forEach(function (flake) {
            flake.draw();
            flake.update();
            snowLevel += flake.getSnowLevel();
        });

        ctx.fillStyle = "white";
        ctx.fillRect(0, 450 - snowLevel, W, snowLevel);

        ctx.drawImage(snowyGround, 0, 400, 500, 100);
    }else if (weather == "sun") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(sun, 10, 10, 120, 122);
        ctx.drawImage(ground, 0, 400, 500, 100);
        ctx.drawImage(sunnyTree, 140, 192, 200, 208);
    }
    window.requestAnimationFrame(render);
}

render(); 
renderCloud()

function initRain() {
    let color = "blue";

    let xInit = Math.random() * W;
    let yInit = 100;
    let length = Math.random() * 20 + 10;
    rainVelocity = Math.random() * 5 + 2

    raindrops.push(new Rain(xInit, yInit, -length, length, rainVelocity, color, 0));
}

// INIT SNOWFLAKES
function snowFlakes(){
    for (let i = 0; i < 1; i++) {
        let color = '#ffffff';
        let radius = 2 + Math.floor(Math.random() * (6 - 2 + 1) + 2);

        let xInit = radius + Math.random() * (W - 2 * radius);
        let yInit = 100;

        snowVelocity = Math.random() * 1 + 0.5
        allSnowFlakes.push(new Flake(xInit, yInit, radius, snowVelocity, color, 0))
    }
}

function initCloud() {
    if(weather != "sun"){
        if((lastWeather == "snow" && weather == "rain") || (lastWeather == "rain" && weather == "snow")){
            let startX1 = 0; 
            let startX2 = 160; 
            let startX3 = 320;
            let stopX1 = 0; 
            let stopX2 = 160;
            let stopX3 = 320;

            let y1 = 40;
            let y2 = 10;

            clouds.push(new Cloud(startX1, stopX1, y1, 1));
            clouds.push(new Cloud(startX2, stopX2, y2, 1));
            clouds.push(new Cloud(startX3, stopX3, y1, 1));
        }else{
            let startX1 = 500; 
            let startX2 = 660; 
            let startX3 = 820;
            let stopX1 = 0; 
            let stopX2 = 160;
            let stopX3 = 320;

            let y1 = 40;
            let y2 = 10;

            clouds.push(new Cloud(startX1, stopX1, y1, 1));
            clouds.push(new Cloud(startX2, stopX2, y2, 1));
            clouds.push(new Cloud(startX3, stopX3, y1, 1));
        }
    }else{
        let startX1 = 0; 
        let startX2 = 160; 
        let startX3 = 320;
        let stopX1 = 500; 
        let stopX2 = 500;
        let stopX3 = 500;

        let y1 = 40;
        let y2 = 10;

        clouds.push(new Cloud(startX1, stopX1, y1, -1));
        clouds.push(new Cloud(startX2, stopX2, y2, -1));
        clouds.push(new Cloud(startX3, stopX3, y1, -1));
    }
        
}

function renderCloud() {
    if (weather == "rain") {
        ctx.drawImage(rainyTree, 140, 192, 200, 208);
        ctx.drawImage(sun, 10, 10, 120, 122);
        ctx.drawImage(rainGround, 0, 400, 500, 100);
    } else if (weather == "snow") {
        ctx.drawImage(snowyTree, 140, 192, 200, 208);
        ctx.drawImage(snowyGround, 0, 400, 500, 100);
    } else if (weather == "sun") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(sun, 10, 10, 120, 122);
        ctx.drawImage(ground, 0, 400, 500, 100);
        ctx.drawImage(sunnyTree, 140, 192, 200, 208);
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
    snowLevel = 0;
    rainVelocity = 0;
    snowVelocity = 0;
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
