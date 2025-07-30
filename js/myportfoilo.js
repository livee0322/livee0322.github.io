document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('liveeToken');
  const contentDiv = document.getElementById('portfolioContent');

  if (!token) {
    alert('로그인이 필요합니다.');
    window.location.href = '/login.html';
    return;
  }

  // JWT 디코딩 (이메일 추출용)
  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  const decoded = parseJwt(token);
  const userEmail = decoded?.email;

  if (!userEmail) {
    alert('토큰이 유효하지 않습니다.');
    return;
  }

  try {
    const response = await fetch(`https://livee-server.onrender.com/portfolio?email=${userEmail}`);
    const data = await response.json();

    if (!data || !data._id) {
      contentDiv.innerHTML = `
        <p>작성된 포트폴리오가 없습니다.</p>
        <button onclick="location.href='/portfolio-edit.html'">+ 포트폴리오 등록</button>
      `;
      return;
    }

    // 등록된 포트폴리오가 있을 경우
    contentDiv.innerHTML = `
      <div class="portfolio-card">
        <img src="${data.photo}" alt="포트폴리오 사진" class="portfolio-photo"/>
        <h3>${data.title}</h3>
        <p><strong>이름:</strong> ${data.name}</p>
        <p><strong>경력:</strong> ${data.career}</p>
        <button onclick="location.href='/portfolio-edit.html'">수정하기</button>
      </div>
    `;
  } catch (err) {
    console.error('❌ 포트폴리오 불러오기 오류:', err);
    contentDiv.innerHTML = `
      <p>포트폴리오 데이터를 불러오는 중 오류가 발생했어요.</p>
      <button onclick="location.href='/portfolio-edit.html'">등록하기</button>
    `;
  }
});