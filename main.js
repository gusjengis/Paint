const canvas = document.getElementById("c1");
const draw = canvas.getContext("2d");
var darkMode = true;
document.getElementById("c1").classList.add("darkMode");
window.addEventListener('resize', resize);
window.onload=function() {canvas.width = document.documentElement.clientWidth; canvas.height = document.documentElement.clientHeight; clear();}

var strokeArr = [];
var redoArr = [];

function clear(){
    setFillStyle();
    draw.fillRect(0,0,canvas.width,canvas.height);
}

function resize()
{
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    drawStrokes();
}

var click = false;

window.onmousedown = function(e){
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    click = true;
    draw.beginPath();
    draw.moveTo(mouseX, mouseY);
    strokeArr.push(new Stroke(mouseX, mouseY));
    redoArr = [];
}

window.onmouseup = function(){
    
    click = false;
    draw.closePath();

}

window.onkeypress =function(e){
    if((e.keyCode == 122 || e.keyCode == 90) && !click)
    {
        undo();
    }

    if((e.keyCode == 121 || e.keyCode == 89) && !click)
    {
        redo();
    }
}

window.onmousemove = function(e){
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if(click){
        draw.lineWidth = 1;
        setStrokeStyle();
        draw.lineTo(mouseX,mouseY);
        draw.stroke();
        draw.closePath();
        draw.beginPath();
        draw.moveTo(mouseX,mouseY);
        strokeArr[strokeArr.length-1].addPoint(mouseX, mouseY);
    }
}

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Stroke {
    
    constructor(initX, initY){
        this.pointArr = [];
        this.pointArr.push(new Point(initX, initY));
    }

    addPoint(x, y){
        this.pointArr.push(new Point(x, y));
    }

    draw(){
        draw.lineWidth = 1;
        setStrokeStyle();
        draw.beginPath();
        draw.moveTo(this.pointArr[0].x, this.pointArr[0].y);
        var j = 1;
        while(j<this.pointArr.length){
            draw.lineTo(this.pointArr[j].x, this.pointArr[j].y);
            j++;
        }
        draw.stroke();
        draw.closePath();
    }
}

function undo(){ 
    if(strokeArr.length > 0){
        redoArr.push(strokeArr.pop());
        drawStrokes();
    }
}

function redo(){
    if(redoArr.length != 0){
        strokeArr.push(redoArr.pop());
        drawStrokes();
    }
}

function drawStrokes(){
    clear();
    for(i = 0; i<strokeArr.length; i++){
        strokeArr[i].draw();
    }
}

function setStrokeStyle(){
    if(darkMode){
        draw.strokeStyle = "rgb(255,255,255)";
    } else {
        draw.strokeStyle = "rgb(0,0,0)";
    }
}

function setFillStyle(){
    if(darkMode){
        draw.fillStyle = "rgb(24, 26, 27)";
    } else {
        draw.fillStyle = "rgb(255,255,255)";
    }
}