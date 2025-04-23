window.addEventListener('load', function() {
  const WIDTH = 340;
  const HEIGHT = 400;
  createCanvas(WIDTH, HEIGHT, document.body);
  const rect = this.canvas.getBoundingClientRect();
  const mouse = {
    radius:2000,
    x: undefined,
    y: undefined
  };
  
  canvas.addEventListener('touchmove', event => {
    const touch = event.touches[0];
    mouse.x = touch.clientX-rect.left;
    mouse.y = touch.clientY-rect.top;
  });

  class Particle {
    constructor(effect, x, y, color) {
      this.effect = effect;
      this.x = Math.random() * this.effect.width;
      this.y = Math.random() * this.effect.height;
      this.originX = Math.floor(x);
      this.originY = Math.floor(y);
      this.size = this.effect.gap;
      this.color = color;
      this.vx = 0;
      this.vy = 0;
      this.ease = 0.03;
      this.dx = 0;
      this.dy = 0;
      this.distance = 0;
      this.angle = 0;
      this.force = 0;
      this.friction = 0.9;
    }

    draw(context) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.size, this.size);
    }

    update() {
      this.dx = this.x -mouse.x;
      this.dy = this.y -mouse.y;
      this.distance = this.dx * this.dx + this.dy * this.dy;
      this.force = -mouse.radius / this.distance;
      if (this.distance < mouse.radius) {
        this.angle = Math.atan2(this.dy, this.dx);
        this.vx += this.force * Math.cos(this.angle);
        this.vy += this.force * Math.sin(this.angle);
      }

      this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
      this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
    }
  }

  class Effect {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.particles = [];
      this.image = document.getElementById('coder');
      this.centerX = this.width * 0.5;
      this.centerY = this.height * 0.5;
      this.x = this.centerX - this.image.width * 0.5;
      this.y = this.centerY - this.image.height * 0.5;
      this.gap = 3;
      /*this.mouse = {
        radius: 1000,
        x: undefined,
        y: undefined
      };
      window.addEventListener('touchmove', event => {
        const touch = event.touches[0];
        this.mouse.x = touch.pageX;
        this.mouse.y = touch.pageY;
      });*/
    }

    init(context) {
      context.drawImage(this.image, this.x, this.y);
      const pixels = context.getImageData(0, 0, this.width, this.height).data;

      for (let y = 0; y < this.height; y += this.gap) {
        for (let x = 0; x < this.width; x += this.gap) {
          const index = (y * this.width + x) * 4;
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const alpha = pixels[index + 3];
          const color = `rgb(${red},${green},${blue})`;
          if (alpha > 0) {
            this.particles.push(new Particle(this, x, y, color));
          }
        }
      }
    }

    draw(context) {

      for (let p of this.particles) {
        p.draw(context);
      }
    }

    update() {
      for (let p of this.particles) {
        p.update();
      }
    }
    
    /*#getMouse(evn){
       const rect = this.canvas.getBoundingClientRect();
       
    }*/
  }

  const effect = new Effect(WIDTH, HEIGHT);
  effect.init(ctx);

  function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    effect.draw(ctx);
    effect.update();
    requestAnimationFrame(animate);
  }

  animate();
});