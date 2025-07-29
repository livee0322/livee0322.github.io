// main.js v1.02

const bannerSlide = document.getElementById('bannerSlide');
const dots = document.querySelectorAll('.dot');
let current = 0;
const total = dots.length;

// 배너 이동 함수
function moveTo(index) {
  current = index;
  bannerSlide.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Dot 클릭 이벤트
dots.forEach(dot => {
  dot.addEventListener('click', () => moveTo(Number(dot.dataset.index)));
});

// 터치 스와이프 이벤트
let startX = 0;
bannerSlide.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

bannerSlide.addEventListener('touchend', (e) => {
  let diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) {
    moveTo((current - 1 + total) % total);  // 이전 배너
  } else if (diff < -50) {
    moveTo((current + 1) % total);  // 다음 배너
  }
});

// 자동 슬라이드 (3초 간격)
setInterval(() => {
  moveTo((current + 1) % total);
}, 3000);