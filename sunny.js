const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width; const H = canvas.height;

let sunnyTree = new Image();
sunnyTree.src = 'assets/tree_sunny.png';
let ground = new Image();
ground.src = 'assets/ground_sunny.png';
let sun = new Image();
sun.src = 'assets/sun.png';

function sunny(){
    ctx.drawImage(sunnyTree, 250, 402, 350, 358);
    ctx.drawImage(ground, 0, 700, 500, 100);
}
