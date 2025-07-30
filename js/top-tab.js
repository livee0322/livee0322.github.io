document.addEventListener("DOMContentLoaded", () => {
  const topTabEl = document.getElementById("top-tab-container");
  if (!topTabEl) return;

  topTabEl.innerHTML = `
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
});