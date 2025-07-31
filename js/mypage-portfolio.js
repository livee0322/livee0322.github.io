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
    const res = await fetch('https://livee-server-dev.onrender.com/portfolio/mine', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || '불러오기 실패');
    }

    const data = await res.json();

    if (!data || !data._id) {
      portfolioContent.innerHTML = `
        <p>작성된 포트폴리오가 없습니다.</p>
        <button onclick="location.href='/portfolio-edit.html'">+ 포트폴리오 등록</button>
      `;
      return;
    }

    // ✅ 카드 구조 수정됨: 이미지 + 텍스트 분리
    portfolioContent.innerHTML = `
      <div class="portfolio-card">
        <img src="${data.photo || '/default-profile.png'}" alt="프로필 이미지" />
        <div class="portfolio-card-content">
          <h3>${data.title || '제목 없음'}</h3>
          <p><strong>이름:</strong> ${data.name || '-'}</p>
          <p><strong>경력:</strong> ${data.career || '-'}</p>
          <p><strong>활동:</strong> ${data.activity || '-'}</p>
          <p><strong>성격:</strong> ${data.character || '-'}</p>
          <p><strong>희망 출연료:</strong> ${data.fee || '-'}</p>
          <p><strong>출연 조건:</strong> ${data.condition || '-'}</p>
          <p><strong>카테고리:</strong> ${data.category || '-'}</p>
          <button onclick="location.href='/portfolio-edit.html?id=${data._id}'">수정하기</button>
        </div>
      </div>
    `;
  } catch (err) {
    console.error('❌ 포트폴리오 불러오기 오류:', err);
    portfolioContent.innerHTML = `<p>포트폴리오를 불러오는 중 오류가 발생했어요. 😢</p>`;
  }
});