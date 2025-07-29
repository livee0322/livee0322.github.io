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

if (bannerSlide && dots.length > 0) {
  setInterval(nextSlide, 3500);
  updateSlide();

  // ✅ 슬라이드 dot 클릭 이벤트
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentIndex = idx;
      updateSlide();
    });
  });
}

// ✅ 로그인 상태에 따라 "마이" 탭 링크 변경
const isLoggedIn = !!localStorage.getItem("loggedInUser");
const myTab = document.getElementById("myTab");

if (isLoggedIn && myTab) {
  myTab.setAttribute("href", "/mypage.html");
}

// ✅ 상단/하단 탭 active 처리
const currentPath = window.location.pathname;
document.querySelectorAll(".top-tabs a, .bottom-tab a").forEach(link => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});

// ✅ 로그인 환영 메시지 & 로그아웃 버튼 처리
const loggedInUser = localStorage.getItem("loggedInUser");
const welcomeMsg = document.getElementById("welcomeMsg");
const logoutBtn = document.getElementById("logoutBtn");

if (loggedInUser && welcomeMsg && logoutBtn) {
  welcomeMsg.textContent = `${loggedInUser} 님`;
  logoutBtn.style.display = "inline";
}

logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  alert("로그아웃 되었습니다.");
  window.location.href = "/login.html";
});