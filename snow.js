export default class Flake {
    constructor(x, y, radius, speed, color, snowLevel) {   
        this.radius = radius;
        this.x = x; 
        this.y = y; 
        this.speed = speed;           
        this.color = color;  
        this.snowLevel = snowLevel           
    }

    
    update() {
        this.y += this.speed;

        if (this.y > 398) {
            this.y = 398;
            this.speed = 0;
            this.snowLevel += 0.1;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    getSnowLevel(){
        return this.snowLevel;
    }
}
