const DPI = window.devicePixelRatio;

const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');
const ctx = canvas.getContext('2d');

function createCanvas(width, height, container) {
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  //canvas.style.boxShadow = '0px 0px 6px 6px black';
  canvas.width = Math.floor(width * DPI);
  canvas.height = Math.floor(height * DPI);
  ctx.scale(DPI, DPI);
  container.appendChild(canvas);
}

function background(color = 'black') {
  canvas.style.background = color;
}