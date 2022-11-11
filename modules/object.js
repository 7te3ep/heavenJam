import {c, ctx} from "./canvas.js";

class Object {

    constructor(x,y,mouse){
        this.x = x
        this.y = y

        this.speed = 20

        this.width = ""
        this.height = ""

        this.frameX = ""
        this.frameY = ""

        this.spriteSheet = new Image()
        //this.spriteSheet.src = "../assets/images/spriteSheet/spriteSheet.png"

        this.finish = false
        this.mouse = mouse
    }

    update(mouse){
        this.mouse = mouse
        var diff = {x:this.x-this.mouse.x,y:this.y-this.mouse.y}
        var dist = Math.sqrt((diff.x ** 2) + (diff.y ** 2))
        if (dist == 0){
            this.finish = true
            return
        }

        var dir = {x:Math.ceil((diff.x/dist)*this.speed), y:Math.ceil((diff.y/dist)*this.speed)}

        let advance_dist = Math.sqrt(diff.x **2 + diff.y **2);
        // check if we are about to overshoot
        if (this.x >= this.mouse.x - 10 && this.x <= this.mouse.x + 10 && this.y >= this.mouse.y - 10 && this.y <= this.mouse.y + 10)
        {
          // we are too close to target
            this.x = this.mouse.x
            this.y = this.mouse.y
            this.finish = true
        }
        else
        {   
            this.x -= dir.x 
            this.y -= dir.y
        }
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
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill();
        //ctx.fillRect(this.x, this.y, 10, 10)
    }
}

window.addEventListener("keydown", function(event) {
    switch(event.key){
        case "ArrowLeft":
            break
        case "ArrowRight":
            break
    }
});

window.addEventListener("keyup", function(event) {
    switch(event.key){
        case "ArrowLeft":
            break
        case "ArrowRight":
            break
    }
});

export {Object};
