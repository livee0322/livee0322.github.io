// ✅ 메인 슬라이드 자동 넘김
const bannerTrack = document.querySelector('.banner-track');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let totalSlides = dots.length;

function updateSlide() {
  if (!bannerTrack) return;

  bannerTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlide();
}

setInterval(nextSlide, 3500); // 3.5초 간격 자동 슬라이드
updateSlide();

// ✅ 슬라이드 dot 클릭으로 이동
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    currentIndex = idx;
    updateSlide();
  });
});

// ✅ 로그인 상태에 따라 "마이" 탭 링크 변경
const isLoggedIn = !!localStorage.getItem("loggedInUser");
const myTab = document.getElementById("myTab");

if (isLoggedIn && myTab) {
  myTab.setAttribute("href", "/mypage.html");
}