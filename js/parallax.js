// Parallax Effect
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-bg');
  const rate = scrolled * -0.5;
  if (parallax) parallax.style.transform = `translateY(${rate}px)`;
  
  // Section headers 3D tilt
  document.querySelectorAll('section h2').forEach((h2, index) => {
    const rect = h2.getBoundingClientRect();
    const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
    h2.style.transform = `rotateX(${scrollProgress * 10}deg) scale(${1 + scrollProgress * 0.1})`;
  });
});

