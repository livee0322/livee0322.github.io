document.addEventListener('DOMContentLoaded', async () => {
  const portfolioContent = document.getElementById('portfolioContent');
  const token = localStorage.getItem('liveeToken');

  if (!token) {
    portfolioContent.innerHTML = `
      <p>로그인이 필요합니다.</p>
      <button onclick="location.href='/login.html'">로그인하러 가기</button>
    `;
    return;
  }

  try {
    console.log('🔄 포트폴리오 요청 시작...');

    const res = await fetch('https://livee-server-dev.onrender.com/portfolio/mine', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('📦 응답 상태코드:', res.status);

    if (!res.ok) {
      const errText = await res.text();
      console.error('❌ 서버 에러 응답 내용:', errText);
      throw new Error(errText || '불러오기 실패');
    }

    const data = await res.json();
    console.log('✅ 포트폴리오 데이터:', data);

    if (!data || !data._id) {
      portfolioContent.innerHTML = `
        <p>작성된 포트폴리오가 없습니다.</p>
        <button onclick="location.href='/portfolio-edit.html'">+ 포트폴리오 등록</button>
      `;
      return;
    }

    const safePhoto = data.photoUrl && data.photoUrl !== '' ? data.photoUrl : '/images/default-profile.png';

    portfolioContent.innerHTML = `
  <div class="portfolio-wrapper">
    <div class="portfolio-card">
      <div class="profile-image-box">
        <img src="${safePhoto}" alt="프로필 이미지" onerror="this.onerror=null;this.src='/images/default-profile.png';" />
      </div>
      <div class="profile-content">
        <div class="title">${data.name || '이름 없음'}</div>
        <div class="desc">
          ${data.title || '-'}<br/>
          경력: ${data.career || '-'}<br/>
          활동: ${data.activity || '-'}
        </div>
        <button onclick="location.href='/portfolio-edit.html?id=${data._id}'">수정하기</button>
      </div>
    </div>
  </div>
`;
  } catch (err) {
    console.error('❌ 포트폴리오 불러오기 오류:', err);
    portfolioContent.innerHTML = `<p>포트폴리오 불러오는 중 오류가 발생했어요. 😢</p>`;
  }
});
