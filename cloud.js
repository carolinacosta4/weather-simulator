export default class Cloud {
    constructor(startX, stopX, y, xDirection) {
        this.x = startX;
        this.startX = startX; 
        this.stopX = stopX; 
        this.y = y;
        this.xDirection = xDirection
    }

    drawCloud() {
        ctx.drawImage(cloud, this.x, this.y, 180, 100);
    }

    updateCloud() {
        if ((this.x > this.stopX) && this.xDirection == 1) {
            this.x -= 3;
        }else if ((this.x < this.stopX) && this.xDirection == -1){
            this.x += 4;
        }else if(this.x == this.stopX){
            this.x += 0
        }
    }
}