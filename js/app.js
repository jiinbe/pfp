var canvas = new fabric.Canvas('c');
	
canvas.setWidth(640);
canvas.setHeight(640);
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

fabric.Image.fromURL('img/mask.png', function(img) {
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

// share
document.getElementById("shared").addEventListener("click", () => {
alert("Bagikan Twibbon ini ke media sosial Anda?");

const dataUrl = c.toDataURL(); 
fetch(dataUrl)
.then(res => res.blob())
.then(blob => {
//console.log(blob)
const filesArray = [new File([blob], 'image.png', { type: blob.type, lastModified: new Date().getTime() })];
console.log(filesArray);
const shareData = {
title: "FREE AND SIMPLE PFP GENERATOR",
text: "FREE AND SIMPLE PFP GENERATOR",
url: "https://badut.pages.dev/",
files: filesArray
};
console.log(shareData);
if (navigator.share) {
navigator.share(
shareData
)
.then(() => alert("Terima kasih telah berbagi.")) 
.catch(error => alert("Bagikan dibatalkan!", error)); 
} else {
alert('navigator.share not available'); 
}
})
});

// hidden button
$(document).ready(function(){
$("#save").click(function(){
$("#finput").hide();
});
});
