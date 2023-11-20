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

        let sunnyTree = new Image();
        sunnyTree.src = 'assets/tree_sunny.png';
        let ground = new Image();
        ground.src = 'assets/ground_sunny.png';
        let sun = new Image();
        sun.src = 'assets/sun.png';

        window.onload = function () {
            sunny()
        };
