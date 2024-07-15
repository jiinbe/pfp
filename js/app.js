var canvas;
var ctx;
var cutout = document.getElementById("frame");
var img = document.getElementById("avatar");
var x = img.width/2;
var y = img.height/2;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight-30;
var WIDTH = cutout.width;
var HEIGHT = cutout.height;
var startimgWidth = img.width;
var startimgHeight = img.height;
var imgWidth = startimgWidth;
var imgHeight = startimgHeight;
var dragging = false;
var capture = false;
var rotate = 0;

function is_touch_device() {
return 'ontouchstart' in window // works on most browsers
|| navigator.maxTouchPoints; // works on IE10/11 and Surface
};

function clear() {
ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
function imageRect(x, y, w, h) {
ctx.beginPath();
ctx.strokeRect(x, y, w, h);
ctx.strokeStyle="red";
ctx.closePath();
}
function rect(x, y, w, h) {
ctx.beginPath();
ctx.rect(x, y, w, h);
ctx.closePath();
ctx.fill();
}
function scaleImg(e){
imgWidth = startimgWidth*this.value;
imgHeight = startimgHeight*this.value;
draw();
}

function loadImage(e){
if (this.files && this.files[0]) {
var reader = new FileReader();

reader.onload = function (e) {
var tempImg = document.getElementById('avatar');
tempImg.src =  e.target.result;
startimgWidth = tempImg.width;
startimgHeight = tempImg.height;
imgWidth = startimgWidth;
imgHeight = startimgHeight;
x = 0;
y = 0;
}

reader.readAsDataURL(this.files[0]);
}
}
function dlCanvas() {
capture = true;
draw();
var dt = canvas.toDataURL('image/png');
fileName = "canvasImage.png";
var link = document.createElement('a');
link.download = fileName;
link.href = dt.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
link.click();
capture = false;
};

function draw() {
clear();
ctx.fillStyle = "#91DDCF";
rect(0, 0, WIDTH, HEIGHT);
ctx.save();
ctx.translate(canvas.width/2,canvas.height/2);
ctx.rotate(rotate*Math.PI/180);
ctx.drawImage(img,x - (imgWidth/2), y - (imgHeight/2), imgWidth, imgHeight);
ctx.restore();
ctx.drawImage(cutout,0, 0, cutout.width, cutout.height);
ctx.save();
ctx.translate(canvas.width/2,canvas.height/2);
ctx.rotate(rotate*Math.PI/180);
if(!capture)
imageRect(x - (imgWidth/2), y - (imgHeight/2), imgWidth, imgHeight);
ctx.restore();
}

function getCoords(e) {
var coords = {};
if (e.pageX && e.pageY) {
coords.x = e.pageX;
coords.y = e.pageY;
} else if (e.touches[0].pageX && e.touches[0].pageY) {
coords.x = e.touches[0].pageX;
coords.y = e.touches[0].pageY;
}
return coords;
}

function myMove(e) {
if (dragging) {
var coords = getCoords(e);
x = coords.x - canvas.offsetLeft;
y = coords.y - canvas.offsetTop;
}
}

function myDown(e) {
var coords = getCoords(e);
if (coords.x < x + (imgWidth/2) + canvas.offsetLeft && coords.x > x - (imgWidth/2) +
canvas.offsetLeft && coords.y < y + (imgHeight/2) + canvas.offsetTop &&
coords.y > y - (imgHeight/2) + canvas.offsetTop) {
x = coords.x - canvas.offsetLeft;
y = coords.y - canvas.offsetTop;
dragging = true;
if (is_touch_device()) {
canvas.addEventListener("touchmove", myMove, false);
} else {
canvas.onmousemove = myMove;
}
}
}

function myUp() {
dragging = false;
if (is_touch_device()) {
canvas.removeEventListener("touchmove", myMove);
} else {
canvas.onmousemove = null;
}
}

function init() {
canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
ctx = canvas.getContext("2d");
if (is_touch_device()) {
canvas.addEventListener("touchstart", myDown, false);
canvas.addEventListener("touchend", myUp, false);
} else {
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
}
document.getElementById('scale').oninput = scaleImg;
document.getElementById('imageupload').onchange = loadImage;
document.getElementById('dl').onclick = dlCanvas;
return setInterval(draw, 5);
}

init();

// input
function selectFile() {
document.getElementById("imageupload").click();
}

let fileInput = document.getElementById("imageupload");
fileInput.addEventListener("change", function () {
         
// check if the file is selected or not
if (fileInput.files.length == 0) {
clickButton.disabled = true;
clickButton.opacity = 0.3;
} else {
clickButton.disabled = false;
clickButton.style.opacity = 1;
}
});
