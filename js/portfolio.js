document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('portfolioForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('liveeToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      location.href = '/login.html';
      return;
    }

    // 1. form 값 수집
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    // 2. 이미지 업로드 (Cloudinary)
    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];

    let uploadedUrl = '';
    if (file) {
      const cloudData = new FormData();
      cloudData.append('file', file);
      cloudData.append('upload_preset', 'livee_unsigned'); // ✅ 대표님 Cloudinary preset
      cloudData.append('folder', 'livee'); // ✅ 폴더명

      try {
        const cloudRes = await fetch('https://api.cloudinary.com/v1_1/dis1og9uq/image/upload', {
          method: 'POST',
          body: cloudData,
        });

        const cloudResult = await cloudRes.json();
        uploadedUrl = cloudResult.secure_url;
        data.photoUrl = uploadedUrl;
      } catch (err) {
        alert('이미지 업로드 실패: ' + err.message);
        return;
      }
    }

    // 3. 서버로 포트폴리오 등록 요청
    try {
      const res = await fetch('https://livee-server-dev.onrender.com/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert('포트폴리오가 성공적으로 등록되었습니다!');
        location.href = '/myportfolio.html';
      } else {
        alert(result.message || '등록 실패');
      }
    } catch (error) {
      alert('서버 오류: ' + error.message);
    }
  });
});