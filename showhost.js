document.addEventListener('DOMContentLoaded', async () => {
  const portfolioList = document.getElementById('portfolioContent');
  portfolioList.innerHTML = '<p>불러오는 중입니다...</p>';

  try {
    const res = await fetch('https://livee-server-dev.onrender.com/portfolio');

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || '포트폴리오 불러오기 실패');
    }

    const data = await res.json();

    if (!data || data.length === 0) {
      portfolioList.innerHTML = '<p>등록된 쇼호스트가 없습니다.</p>';
      return;
    }

    portfolioList.innerHTML = ''; // 초기 메시지 제거

    data.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'portfolio-card';
      div.innerHTML = `
        <img src="${item.photo || '/default-profile.png'}" alt="프로필 이미지" />
        <div class="portfolio-card-content">
          <h3>${item.title || '제목 없음'}</h3>
          <p><strong>이름:</strong> ${item.public_name ? item.name : '비공개'}</p>
          <p><strong>경력:</strong> ${item.public_career ? item.career : '비공개'}</p>
          <p><strong>활동:</strong> ${item.activity || '-'}</p>
          <p><strong>카테고리:</strong> ${item.category || '-'}</p>
        </div>
      `;
      portfolioList.appendChild(div);
    });
  } catch (err) {
    console.error('❌ 쇼호스트 불러오기 오류:', err);
    portfolioList.innerHTML = '<p>쇼호스트를 불러오는 중 오류가 발생했어요. 😢</p>';
  }
});
