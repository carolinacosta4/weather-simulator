export default class Rain {
    constructor(x, y, dY, length, speed, color, waterLevel) {
        this.x = x;
        this.y = y;
        this.dY = dY;
        this.length = length;
        this.speed = speed;
        this.color = color;
        this.waterLevel = waterLevel
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.stroke();
    }

    update() {
        this.y += this.speed;
        if (this.y > 398){
            this.y = 398;
            this.speed = 0;
            this.length = 2;
            this.waterLevel += 0.1;
        }
    }

    getWaterLevel(){
        return this.waterLevel;
    }

    reduceWater() {
        if (this.waterLevel > 0) {
            this.waterLevel -= 0.1;    
        }
    }
}