const topTabHtml = `
  <nav class="top-tabs">
    <a href="/index.html">홈</a>
    <a href="/clip.html">숏클립</a>
    <a href="/event.html">이벤트</a>
    <a href="/live.html">라이브</a>
    <a href="/influencer.html">인플루언서</a>
    <a href="/agency.html">대행서비스</a>
    <a href="/news.html">뉴스</a>
  </nav>
`;

document.write(topTabHtml);

// 현재 페이지 path 기준으로 active 탭 추가
const topLinks = document.querySelectorAll(".top-tabs a");
topLinks.forEach(link => {
  if (location.pathname.includes(link.getAttribute("href"))) {
    link.classList.add("active");
  }
});