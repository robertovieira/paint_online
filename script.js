// Initial Data
let currentColor = 'black';
let canDraw = false;

let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');

// pegando contexto do canva
let ctx = screen.getContext('2d');

let colorEraser = window.getComputedStyle(screen).backgroundColor
let modeEraser = false;

// Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', setCurrentColor);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

document.querySelector('.eraser').addEventListener('click', toogleModeEraser);

// Functions
function setCurrentColor(e) {
    if (modeEraser === false) {
        // pegando o elemento clicado
        let color = e.target.getAttribute('data-color');
    
        currentColor = color;
    
        // selecionando o elemento com a classe e removendo
        document.querySelector('.color.active').classList.remove('active');
    
        // adicionando a classe ao elemento clicado
        e.target.classList.add('active');
    } else {
        alert("A Borracha está ativa!");
    }
}

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    // desenhando
    ctx.beginPath();
    ctx.lineWidth = (modeEraser) ? 20 : 5;
    ctx.lineJoin = 'round';
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();    
    ctx.strokeStyle = (modeEraser) ? colorEraser : currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function toogleModeEraser(e) {
    let elementColorActive;

    if (modeEraser) {
        elementColorActive = document.querySelector('.color.active--eraser');
        
        modeEraser = false;
        e.target.innerHTML = 'Ativar Borracha';
        screen.style.cursor = 'crosshair';

        elementColorActive.classList.remove('active--eraser');
        elementColorActive.classList.add('active');
    } else {
        elementColorActive = document.querySelector('.color.active');

        modeEraser = true;
        e.target.innerHTML = 'Inativar Borracha';
        screen.style.cursor = 'grab';

        elementColorActive.classList.remove('active');
        elementColorActive.classList.add('active--eraser');
    }
}