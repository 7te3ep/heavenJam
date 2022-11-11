import {c, ctx} from "../modules/canvas.js";

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
