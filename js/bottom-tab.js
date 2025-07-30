const isLoggedIn = localStorage.getItem("loginUser");

document.write(`
  <nav class="bottom-tab">
    <a href="/index.html"><i class="ri-home-line"></i><div>홈</div></a>
    <a href="/recruitlist.html"><i class="ri-live-line"></i><div>라이브</div></a>
    <a href="/portfolio.html"><i class="ri-briefcase-line"></i><div>쇼호스트</div></a>
    <a href="/liveschedule.html"><i class="ri-calendar-line"></i><div>일정</div></a>
    <a href="${isLoggedIn ? '/mypage.html' : '/login.html'}">
      <i class="ri-user-3-line"></i><div>마이</div>
    </a>
  </nav>
`);