// ✅ 메인 슬라이드 자동 넘김
const bannerSlide = document.querySelector('.banner-slide');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let totalSlides = dots.length;

function updateSlide() {
  if (!bannerSlide) return;
  bannerSlide.style.transform = `translateX(-${currentIndex * 100}%)`;

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

// 현재 경로에 따라 active 클래스 자동 지정
const currentPath = window.location.pathname;
document.querySelectorAll(".top-tabs a, .bottom-tab a").forEach(link => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});

// 로그인 시 마이탭 경로 변경
const isLoggedIn = !!localStorage.getItem("loggedInUser");
const myTab = document.getElementById("myTab");
if (isLoggedIn && myTab) {
  myTab.setAttribute("href", "/mypage.html");
}