document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('portfolioForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // 🔒 새로고침 방지

    const formData = new FormData(form);
    const portfolioData = {};

    // ✅ 체크박스와 인풋 데이터 수집
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('public_')) {
        portfolioData[key] = true;
      } else {
        portfolioData[key] = value;
      }
    }

    // ✅ 이미지 업로드 처리 (Cloudinary)
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

        portfolioData.photo = cloudResult.secure_url;
      } catch (err) {
        alert('이미지 업로드 실패 😢\n' + err.message);
        return;
      }
    }

    // ✅ 로그인 토큰 확인
    const token = localStorage.getItem('liveeToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      location.href = '/login.html';
      return;
    }

    // ✅ 서버 전송
    try {
      const res = await fetch('https://livee-backend-url.onrender.com/portfolio', {
        method: 'POST',
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

      alert('포트폴리오가 등록되었습니다!');
      location.href = '/portfolio.html';
    } catch (err) {
      alert('서버 오류: ' + err.message);
    }
  });
});