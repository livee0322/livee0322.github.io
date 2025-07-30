document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('portfolioForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    // ✅ Cloudinary 업로드 (사진 있을 때만)
    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];

    let imageUrl = '';
    if (file) {
      const cloudData = new FormData();
      cloudData.append('file', file);
      cloudData.append('upload_preset', 'livee_unsigned'); // ✅ Cloudinary 설정값
      cloudData.append('folder', 'livee');

      try {
        const cloudRes = await fetch('https://api.cloudinary.com/v1_1/dis1og9uq/image/upload', {
          method: 'POST',
          body: cloudData,
        });
        const cloudJson = await cloudRes.json();
        imageUrl = cloudJson.secure_url;
      } catch (err) {
        console.error('❌ Cloudinary 업로드 실패:', err);
        alert('이미지 업로드 중 오류가 발생했어요.');
        return;
      }
    }

    // ✅ 전송할 데이터 구성
    const data = {
      title: form.title.value,
      name: form.name.value,
      career: form.career.value,
      activity: form.activity.value,
      character: form.character.value,
      fee: form.fee.value,
      condition: form.condition.value,
      category: form.category.value,
      photo: imageUrl, // Cloudinary URL
      public: {
        title: form.public_title.checked,
        photo: form.public_photo.checked,
        name: form.public_name.checked,
        career: form.public_career.checked,
        activity: form.public_activity.checked,
        character: form.public_character.checked,
        fee: form.public_fee.checked,
        condition: form.public_condition.checked,
        category: form.public_category.checked,
      },
    };

    // ✅ 백엔드로 저장 요청
    try {
      const response = await fetch('https://livee-server.onrender.com/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('서버 오류 발생');

      alert('포트폴리오가 성공적으로 저장되었습니다!');
      window.location.href = '/portfolio.html'; // 저장 후 이동
    } catch (err) {
      console.error('❌ 서버 요청 실패:', err);
      alert('서버 오류: ' + err.message);
    }
  });
});