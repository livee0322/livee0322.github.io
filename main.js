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

setInterval(nextSlide, 3500); // 3.5초마다 자동 슬라이드
updateSlide();

// ✅ 슬라이드 dot 클릭으로 이동
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    currentIndex = idx;
    updateSlide();
  });
});

// ✅ 로그인 상태에 따라 마이탭 변경
const isLoggedIn = !!localStorage.getItem("loggedInUser");
const myTab = document.getElementById("myTab");
if (myTab) {
  myTab.setAttribute("href", isLoggedIn ? "/mypage.html" : "/login.html");
}

// ✅ 탭 active 자동 지정
const currentPath = window.location.pathname;
document.querySelectorAll(".top-tabs a, .bottom-tab a").forEach(link => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});

// ✅ 로그아웃 처리
const logoutIcon = document.getElementById("logoutIcon");
if (isLoggedIn && logoutIcon) {
  logoutIcon.style.display = "inline";
  logoutIcon.style.cursor = "pointer";
  logoutIcon.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    alert("로그아웃 되었습니다.");
    location.href = "/login.html";
  });
}