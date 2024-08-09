var canvas = new fabric.Canvas('c');
	
canvas.setWidth(1024);
canvas.setHeight(1024);
canvas.selection = false;
canvas.backgroundColor = 'gray';
	
document.getElementById("uploader").onchange = function(e) {
var reader = new FileReader();
reader.onload = function(e) {
var image = new Image();
image.src = e.target.result;
image.onload = function() {
var img = new fabric.Image(image);
img.set({
borderColor: 'gray',
cornerColor: 'black',
transparentCorners: true,
left: 100,
top: 60
});
img.scaleToWidth(400);
canvas.add(img).setActiveObject(img).renderAll();
}
}
reader.readAsDataURL(e.target.files[0]);
}

fabric.Image.fromURL('twibbon.png', function(img) {
canvas.setOverlayImage(img, canvas.renderAll.bind(canvas));
});
	
canvas.on({
'object:moving': function(e) {
e.target.opacity = 0.6;
},
'object:modified': function(e) {
e.target.opacity = 1;
}
});
	
function selectFile() {
document.getElementById("uploader").click();
}
	
$("#save").click(function(){
$("#c").get(0).toBlob(function(blob){
saveAs(blob, "image.png");
});
});
