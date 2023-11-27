let cloud = new Image();
cloud.src = 'assets/cloud.png';

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext("2d");
const W = canvas.width; const H = canvas.height;

export default class Cloud {
    constructor(startX, stopX, y, xDirection) {
        this.x = startX;
        this.startX = startX; 
        this.stopX = stopX; 
        this.y = y;
        this.xDirection = xDirection
    }

    drawCloud() {
        ctx.drawImage(cloud, this.x, this.y, 240, 150);
    }

    updateCloud() {
        if ((this.x > this.stopX) && this.xDirection == 1) {
            this.x -= 6;
        }else if ((this.x < this.stopX) && this.xDirection == -1){
            this.x += 5;
        }else if(this.x == this.stopX){
            this.x += 0
        }
    }
}