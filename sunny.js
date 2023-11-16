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


        let sunnyBtn = document.getElementById("sun").addEventListener("click", () => {
            canvas.classList.remove()
            canvas.classList.add("sun-bg")
        })

        let sunnyTree = new Image();
        sunnyTree.src = 'assets/tree_sunny.png';
        let ground = new Image();
        ground.src = 'assets/ground_sunny.png';
        let sun = new Image();
        sun.src = 'assets/sun.png';

    function sunny(){
            ctx.drawImage(sunnyTree, 140, 192, 200, 208);
            ctx.drawImage(ground, 0, 400, 500, 100);
            ctx.drawImage(sun, 10, 10, 120, 122);
        }

        window.onload = function () {
            sunny()
        };
