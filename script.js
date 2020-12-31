const incBtn = document.querySelector('#increase');
const decBtn = document.querySelector('#decrease');
const radValue = document.querySelector('#rad-value');
const colorChanger = document.querySelector('#color');
const canvas = document.querySelector('#canvas');
const ctxt = canvas.getContext('2d');

var radius = 10;
var dragging = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function updateLineWidth () {
	ctxt.lineWidth = radius * 2;
}
updateLineWidth();

const putPoint = (e) => {
	if (dragging) {
		ctxt.lineTo(e.clientX, e.clientY);
		ctxt.stroke();
		ctxt.beginPath();
		ctxt.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
		ctxt.fill();
		ctxt.beginPath();
		ctxt.moveTo(e.clientX, e.clientY);
	}
}

canvas.addEventListener('mousemove', putPoint);

const dragTrue = (e) => {
	dragging = true;
	putPoint(e);
}
canvas.addEventListener('mousedown', dragTrue);

const dragFalse = (e) => {
	dragging = false;
	ctxt.beginPath();
}
canvas.addEventListener('mouseup', dragFalse);


incBtn.onclick = () => {
	if(radius < 10) {
		radius += 1;
		updateLineWidth();
		radValue.innerText = parseFloat(radius);
	}
}
decBtn.onclick = () => {
	if(radius > 1) {
		radius -= 1;
		updateLineWidth();
		radValue.innerText = parseFloat(radius);
	}
}

colorChanger.onchange = (e) => {
	ctxt.fillStyle = e.target.value;
	ctxt.strokeStyle = e.target.value;
}

// Mobile TOUCH _______________
var x, y;
var start = function(e) {
	ctxt.beginPath();
	x = e.changedTouches[0].pageX;
	y = e.changedTouches[0].pageY;
	ctxt.moveTo(x,y);
};
var move = function(e) {
	e.preventDefault();
	x = e.changedTouches[0].pageX;
	y = e.changedTouches[0].pageY;
	ctxt.lineTo(x,y);
	ctxt.stroke();
};
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", move, false);
// _______________________________________________

/*__Saving and Clearing Image__*/
const saveBtn = document.querySelector('#save');
saveBtn.onclick = () => {
	const data = canvas.toDataURL();
	const newData = data.replace("image/png", "image/octet-stream");
	// console.log(newData);
	const a = document.createElement('a');
	a.href = newData;
	a.download = 'canvas.png';
	a.click();
	a.remove();
}

const clearBtn = document.querySelector('#clear');
clearBtn.onclick = () => {
	ctxt.clearRect(0, 0, canvas.width, canvas.height );
}
