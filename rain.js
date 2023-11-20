let waterLevel = 0;

export default class Rain {
    constructor(x, y, dY, length, speed, color) {
        this.x = x;
        this.y = y;
        this.dY = dY;
        this.length = length;
        this.speed = speed;
        this.color = color;
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
            waterLevel += 0.1;
        }
    }

    waterLevel(){
        return waterLevel;
    }

    reduceWater() {
        if (waterLevel > 0) {
            waterLevel -= 0.1;    
        }
    }
}