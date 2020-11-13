function calcVh() {
  const doc = document.documentElement;
  doc.style.setProperty('--100vh', window.innerHeight + 'px');
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', calcVh);
  calcVh();
}
