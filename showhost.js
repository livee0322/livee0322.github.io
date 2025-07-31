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
      portfolioList.innerHTML = '<p>등록된 포트폴리오가 없습니다.</p>';
      return;
    }

    portfolioList.innerHTML = ''; // 초기 메시지 제거

    data.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'portfolio-card';

      // 안전 fallback 값 설정
      const photo = item.photo || '/default-profile.png';
      const name = item.public_name ? item.name : '비공개';
      const career = item.public_career ? item.career : '비공개';
      const activity = item.activity || '-';
      const category = item.category || '-';

      div.innerHTML = `
        <img src="${photo}" alt="프로필 이미지" />
        <div class="portfolio-card-content">
          <h3>${item.title || '제목 없음'}</h3>
          <p><strong>이름:</strong> ${name}</p>
          <p><strong>경력:</strong> ${career}</p>
          <p><strong>활동:</strong> ${activity}</p>
          <p><strong>카테고리:</strong> ${category}</p>
        </div>
      `;

      portfolioList.appendChild(div);
    });
  } catch (err) {
    console.error('❌ 전체 포트폴리오 불러오기 오류:', err);
    portfolioList.innerHTML = '<p>포트폴리오를 불러오는 중 오류가 발생했어요. 😢</p>';
  }
});
