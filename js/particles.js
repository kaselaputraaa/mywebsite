// Floating Particles for Hero
class Particles {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.init();
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        color: `hsla(${Math.random()*60 + 100}, 70%, 60%, 0.6)`,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      
      // Mouse attraction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        p.vx += dx / dist * 0.2;
        p.vy += dy / dist * 0.2;
      }
      
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize
const canvas = document.getElementById('particles');
if (canvas) {
  const particles = new Particles(canvas);
  window.addEventListener('resize', () => particles.resize());
  canvas.addEventListener('mousemove', e => {
    particles.mouse.x = e.clientX;
    particles.mouse.y = e.clientY;
  });
}

