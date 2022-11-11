//===================================
// _____|IMPORT MODULE FILES| _____// 
//===================================

let canvas = document.getElementById('canvas')

import {c, ctx} from "./modules/canvas.js";
import {Object} from "./modules/object.js";
import {Enemies} from "./modules/enemies.js";
import {DisplayNumber} from "./tools/numberDisplay.js";
import { collisionCheck } from "./tools/collisionCheck.js";
import { randomInteger } from "./tools/random.js";


//=================================
// _____|DECLARE VARIABLES| _____// 
//=================================

let gameFrame = 1
let object = new Object(10,10)
let objectArray = []
let enemiesArray = []
var mousePos = ""
var keyPressed
var closestEnemie

//==============================
// _____|HANDLE OBJECTS| _____// 
//==============================

function handleObject(gameFrame){
    for (let i = 0; i <objectArray.length; i++){
        objectArray[i].test()
        objectArray[i].update(closestEnemie)
        if (objectArray[i].finish){
            objectArray.splice(i,1)
            i --
        }
    }
}

function handleEnemies(gameFrame){
    if (gameFrame % 10 == 0 || gameFrame == 0){enemiesArray.push(new Enemies(randomInteger(50,950),10))}
    if (enemiesArray.length!=0){closestEnemie = {x:enemiesArray[0].x+enemiesArray[0].width/2,y:enemiesArray[0].y+enemiesArray[0].height/2}}

    for (let i = 0; i <enemiesArray.length; i++){
        enemiesArray[i].test()
        enemiesArray[i].update()
        if (enemiesArray[i].y > closestEnemie.y){
            closestEnemie = {x:enemiesArray[i].x+enemiesArray[i].width/2,y:enemiesArray[i].y+enemiesArray[i].height/2}
        }
        var touched = false
        for (let g = 0;g<objectArray.length;g++){
            if (collisionCheck(enemiesArray[i].x,enemiesArray[i].y,enemiesArray[i].width,enemiesArray[i].height,objectArray[g].x,objectArray[g].y,objectArray[g].width,objectArray[g].height)){
                enemiesArray[i].life -= 1
                objectArray.splice(g,1)
                g --
            }
        }
        if (enemiesArray[i].y >= 900 || enemiesArray[i].life <= 0 ){
            enemiesArray.splice(i,1)
            i --
        }
    }
}

//=========================
// _____|GAME LOOP| _____// 
//=========================

let gameloop = setInterval(function(){
    //CLEAR 
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // HANDLE AND DRAW ALL
    handleObject(gameFrame)
    handleEnemies(gameFrame)
    ctx.fillStyle = "green";
    ctx.fillRect(445, 650, 50, 100);
    
    // UPDATE 
    gameFrame ++

    // END IF
    if (gameFrame == 100**100){
        clearInterval(gameloop);
        reset()
    }
},32) 

function reset(){
    gameFrame = 1
    object = new Object
    objectArray = []
    deadKeys = []
    keyPressed = undefined
}

//===========================
// _____|INTERACTION| _____// 
//===========================

window.addEventListener("keydown", function(event) {
    if (enemiesArray.length!=0){
        var charCode = event.keyCode;
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8){
            keyPressed = event.key
            objectArray.push(new Object(470, 650,closestEnemie))
        }
    }
});

canvas.addEventListener("click", function (e) {
    mousePos = getMousePos(canvas, e)
})

function  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

    return {
      x: Math.ceil((evt.clientX - rect.left) * scaleX),   // scale mouse coordinates after they have
      y: Math.ceil((evt.clientY - rect.top) * scaleY )    // been adjusted to be relative to element
    }
}
