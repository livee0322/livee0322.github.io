document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('portfolioForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];

    let imageUrl = '';
    if (file) {
      const cloudData = new FormData();
      cloudData.append('file', file);
      cloudData.append('upload_preset', 'livee_unsigned');
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

    const data = {
      title: form.title.value,
      name: form.name.value,
      career: form.career.value,
      activity: form.activity.value,
      character: form.character.value,
      fee: form.fee.value,
      condition: form.condition.value,
      category: form.category.value,
      photoUrl: imageUrl, // ✅ 필드명 수정
      public_title: form.public_title.checked,
      public_photo: form.public_photo.checked,
      public_name: form.public_name.checked,
      public_career: form.public_career.checked,
      public_activity: form.public_activity.checked,
      public_character: form.public_character.checked,
      public_fee: form.public_fee.checked,
      public_condition: form.public_condition.checked,
      public_category: form.public_category.checked,
    };

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
      window.location.href = '/portfolio.html';
    } catch (err) {
      console.error('❌ 서버 요청 실패:', err);
      alert('서버 오류: ' + err.message);
    }
  });
});