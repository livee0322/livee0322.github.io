const bannerSlide = document.getElementById('bannerSlide');
const dots = document.querySelectorAll('.dot');
let current = 0;
const total = dots.length;

function moveTo(index) {
  current = index;
  bannerSlide.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

dots.forEach(dot => {
  dot.addEventListener('click', () => moveTo(dot.dataset.index));
});

// 터치 스와이프
let startX = 0;
bannerSlide.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
bannerSlide.addEventListener('touchend', (e) => {
  let diff = e.changedTouches[0].clientX - startX;
  if (diff > 50 && current > 0) moveTo(current - 1);
  else if (diff < -50 && current < total - 1) moveTo(current + 1);
});