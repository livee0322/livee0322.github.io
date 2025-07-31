// ✅ 수정 모드일 경우 기존 데이터를 불러와 입력 필드에 채워넣기
async function loadPortfolioIfEdit() {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get('id');
  if (!id) return;

  const token = localStorage.getItem('liveeToken');
  if (!token) return;

  try {
    const res = await fetch(`https://livee-server-dev.onrender.com/portfolio?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('포트폴리오 데이터를 불러올 수 없습니다.');
    const data = await res.json();

    // 🔁 입력 필드 채우기
    for (const key in data) {
      const el = document.querySelector(`[name="${key}"]`);
      if (!el) continue;
      if (el.type === 'checkbox') {
        el.checked = !!data[key];
      } else {
        el.value = data[key];
      }
    }
  } catch (err) {
    console.error('❌ 수정 데이터 로드 실패:', err);
  }
}

// ✅ 폼 제출 핸들러
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('portfolioForm');
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get('id');

  loadPortfolioIfEdit(); // 수정모드면 기존 데이터 불러오기

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const portfolioData = {};

    for (const [key, value] of formData.entries()) {
      if (key.startsWith('public_')) {
        portfolioData[key] = true;
      } else {
        portfolioData[key] = value;
      }
    }

    // ✅ 이미지 업로드 (선택 시만)
    const photoFile = formData.get('photo');
    if (photoFile && photoFile.size > 0) {
      const cloudinaryData = new FormData();
      cloudinaryData.append('file', photoFile);
      cloudinaryData.append('upload_preset', 'livee_unsigned');
      cloudinaryData.append('folder', 'livee');

      try {
        const cloudRes = await fetch('https://api.cloudinary.com/v1_1/dis1og9uq/image/upload', {
          method: 'POST',
          body: cloudinaryData,
        });
        const cloudResult = await cloudRes.json();

        if (!cloudResult.secure_url) {
          throw new Error('Cloudinary 업로드 실패');
        }

        portfolioData.photoUrl = cloudResult.secure_url; // ✅ 필드명 주의
      } catch (err) {
        alert('이미지 업로드 실패 😢\n' + err.message);
        return;
      }
    }

    const token = localStorage.getItem('liveeToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      location.href = '/login.html';
      return;
    }

    // ✅ 요청 방식과 주소 결정
    const method = id ? 'PUT' : 'POST';
    const endpoint = id
      ? `https://livee-server-dev.onrender.com/portfolio?id=${id}`
      : 'https://livee-server-dev.onrender.com/portfolio';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(portfolioData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || '서버 오류');
      }

      alert('포트폴리오가 저장되었습니다!');
      location.href = '/portfolio.html';
    } catch (err) {
      alert('서버 오류: ' + err.message);
    }
  });
});