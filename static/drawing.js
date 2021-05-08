var context;
var canvas;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

function prepareCanvas() {
    canvas = document.getElementById('my_canvas');
    context = canvas.getContext('2d');

    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    context.strokeStyle = '#000000';
    context.lineWidth = 15;
    context.lineJoin = 'round';

    var isPainting = false;

    document.addEventListener('mousedown', function (event) {
        isPainting = true;
        currentX = event.pageX - canvas.offsetLeft;
        currentY = event.pageY- canvas.offsetTop;
    });

    document.addEventListener('mouseup', function () {
        isPainting = false;
    });

    document.addEventListener('mousemove', function (event) {
        if (isPainting) {
            previousX = currentX;
            currentX = event.pageX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.pageY- canvas.offsetTop;

            draw();
        }
    });

    canvas.addEventListener('mouseleave', function (){
        isPainting = false;
    });

    // Touch events
    document.addEventListener('touchstart', function (event) {
        isPainting = true;
        currentX = event.touches[0].pageX - canvas.offsetLeft;
        currentY = event.touches[0].pageY- canvas.offsetTop;
    });

    canvas.addEventListener('touchend', function (){
        isPainting = false;
    });

    canvas.addEventListener('touchmove', function (event) {
        if (isPainting) {
            previousX = currentX;
            currentX = event.touches[0].pageX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.touches[0].pageY- canvas.offsetTop;

            draw();
        }
    });
}

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas() {
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;

    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}