// ✅ bottom-tab.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("liveeToken");
  const bottomTabEl = document.getElementById("bottom-tab-container");
  if (!bottomTabEl) return;

  bottomTabEl.innerHTML = `
    <nav class="bottom-tab">
      <a href="/index.html"><i class="ri-home-line"></i><div>홈</div></a>
      <a href="/recruitlist.html"><i class="ri-live-line"></i><div>라이브</div></a>
      <a href="/portfolio.html"><i class="ri-briefcase-line"></i><div>쇼호스트</div></a>
      <a href="/liveschedule.html"><i class="ri-calendar-line"></i><div>일정</div></a>
      <a href="${token ? '/mypage.html' : '/login.html'}">
        <i class="ri-user-3-line"></i><div>마이</div>
      </a>
    </nav>
  `;

  // ✅ 현재 페이지 기준 active 처리
  const currentPath = window.location.pathname;
  document.querySelectorAll(".bottom-tab a").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});