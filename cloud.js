export default class Cloud {
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