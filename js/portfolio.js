document.addEventListener('DOMContentLoaded', () => {
  const portfolioList = document.getElementById('portfolio-list');
  const registerBtn = document.getElementById('register-btn');

  const userEmail = localStorage.getItem('liveeToken');
  const API_URL = 'https://livee-server.onrender.com';

  // ✅ 로그인 확인
  if (!userEmail) {
    alert('로그인이 필요합니다.');
    window.location.href = '/login.html';
    return;
  }

  // ✅ 포트폴리오 불러오기
  fetch(`${API_URL}/api/portfolios?email=${userEmail}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        portfolioList.innerHTML = '<p>작성된 포트폴리오가 없습니다.</p>';
        return;
      }

      portfolioList.innerHTML = ''; // 기존 내용 제거

      data.forEach((portfolio) => {
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.innerHTML = `
          <img src="${portfolio.public_photo ? portfolio.photoUrl : '/default-profile.png'}" alt="프로필" class="portfolio-photo">
          <h3>${portfolio.public_name ? portfolio.name : '이름 비공개'}</h3>
          <p>${portfolio.public_title ? portfolio.title : ''}</p>
          <p>${portfolio.public_career ? portfolio.career : ''}</p>
        `;
        portfolioList.appendChild(item);
      });
    })
    .catch(err => {
      console.error('포트폴리오 불러오기 오류:', err);
      portfolioList.innerHTML = '<p>포트폴리오를 불러오는 중 오류가 발생했습니다.</p>';
    });

  // ✅ 등록 버튼 클릭 시 이동
  registerBtn.addEventListener('click', () => {
    window.location.href = '/portfolio-edit.html';
  });
});