let snowLevel = 0;
export default class Flake {
    constructor(x, y, radius, speed, color) {   
        this.radius = radius;
        this.x = x; 
        this.y = y; 
        this.speed = speed;           
        this.color = color;             
    }

    
    update() {
        this.y += this.speed;

        if (this.y > 398) {
            this.y = 398;
            this.speed = 0;
            snowLevel += 0.1;
        }
        else
            this.y += this.speed; 
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    snowLevel(){
        return snowLevel;
    }
}
