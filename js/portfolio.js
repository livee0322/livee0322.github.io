document.addEventListener('DOMContentLoaded', async () => {
  const portfolioContent = document.getElementById('portfolioContent');

  try {
    console.log('📡 전체 포트폴리오 불러오는 중...');

    const res = await fetch('https://livee-server-dev.onrender.com/portfolio/list');

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || '포트폴리오 목록 불러오기 실패');
    }

    const portfolios = await res.json();

    if (!portfolios || portfolios.length === 0) {
      portfolioContent.innerHTML = `<p>등록된 포트폴리오가 없습니다.</p>`;
      return;
    }

    // 카드 형태로 표시
    portfolioContent.innerHTML = portfolios.map(data => {
      const safePhoto = data.photoUrl && data.photoUrl !== '' ? data.photoUrl : '/images/default-profile.png';

      return `
        <div class="portfolio-card">
          <div class="portfolio-thumbnail">
            <img src="${safePhoto}" alt="프로필 이미지" onerror="this.onerror=null;this.src='/images/default-profile.png';" />
          </div>
          <div class="portfolio-info">
            <h3>${data.title || '(제목 없음)'}</h3>
            <p><strong>이름:</strong> ${data.name || '-'}</p>
            <p><strong>경력:</strong> ${data.career || '-'}</p>
            <p><strong>카테고리:</strong> ${data.category || '-'}</p>
          </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error('❌ 포트폴리오 로딩 실패:', err);
    portfolioContent.innerHTML = `<p>포트폴리오를 불러오는 중 오류가 발생했어요. 😢</p>`;
  }
});