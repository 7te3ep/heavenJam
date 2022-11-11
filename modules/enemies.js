import {c, ctx} from "./canvas.js";

class Enemies {

    constructor(x,y){
        this.x = x
        this.y = y

        this.speed = 2

        this.life = 5

        this.width = 50
        this.height = 50

        this.frameX = ""
        this.frameY = ""

        this.spriteSheet = new Image()
        //this.spriteSheet.src = "../assets/images/spriteSheet/spriteSheet.png"

        this.finish = false
    }

    update(){
        this.y += this.speed
    }

    draw(){
        c.getContext('2d').drawImage(
            this.spriteSheet,
            this.frameX,
            this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    test(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y-20, this.life*10, 10);
    }
}

export {Enemies};
