document.addEventListener('DOMContentLoaded', () => {
  const portfolioContent = document.getElementById('portfolioContent');
  const token = localStorage.getItem('liveeToken');

  if (!token) {
    alert('로그인이 필요합니다.');
    location.href = '/login.html';
    return;
  }

  fetch('https://livee-server-dev.onrender.com/portfolio/my', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error('포트폴리오 조회 실패');
      return res.json();
    })
    .then(data => {
      if (!data || Object.keys(data).length === 0) {
        portfolioContent.innerHTML = `
          <p>등록된 포트폴리오가 없습니다.</p>
          <button onclick="location.href='/portfolio-edit.html'">+ 포트폴리오 등록</button>
        `;
        return;
      }

      // ✅ 포트폴리오 카드 출력
      portfolioContent.innerHTML = `
        <div class="portfolio-card">
          <div class="portfolio-image">
            <img src="${data.photoUrl || '/default-profile.png'}" alt="프로필">
          </div>
          <div class="portfolio-info">
            <h3>${data.name || '이름 없음'}</h3>
            <p class="title">${data.title || ''}</p>
            <p class="career">${data.career || ''}</p>
            <button onclick="location.href='/portfolio-edit.html?id=${data._id}'">수정하기</button>
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error('❌ 포트폴리오 조회 실패:', err);
      portfolioContent.innerHTML = '<p>포트폴리오를 불러오는 중 오류가 발생했습니다.</p>';
    });
});