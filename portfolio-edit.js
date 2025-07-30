document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('portfolio-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem('liveeUserEmail');
    if (!userEmail) {
      alert('로그인이 필요합니다');
      location.href = '/login.html';
      return;
    }

    // ✅ 입력값 가져오기
    const title = document.getElementById('title').value;
    const photoFile = document.getElementById('photo').files[0];
    const name = document.getElementById('name').value;
    const career = document.getElementById('career').value;
    const activity = document.getElementById('activity').value;
    const character = document.getElementById('character').value;
    const fee = parseInt(document.getElementById('fee').value) || 0;
    const condition = document.getElementById('condition').value;
    const category = document.getElementById('category').value;

    const public_title = document.getElementById('public_title').checked;
    const public_photo = document.getElementById('public_photo').checked;
    const public_name = document.getElementById('public_name').checked;
    const public_career = document.getElementById('public_career').checked;
    const public_activity = document.getElementById('public_activity').checked;
    const public_character = document.getElementById('public_character').checked;
    const public_fee = document.getElementById('public_fee').checked;
    const public_condition = document.getElementById('public_condition').checked;
    const public_category = document.getElementById('public_category').checked;

    // ✅ 이미지 업로드 (Cloudinary)
    let photoUrl = '';
    if (photoFile) {
      const formData = new FormData();
      formData.append('file', photoFile);
      formData.append('upload_preset', 'livee_unsigned');

      const cloudRes = await fetch('https://api.cloudinary.com/v1_1/dis1og9uq/image/upload', {
        method: 'POST',
        body: formData,
      });

      const cloudData = await cloudRes.json();
      photoUrl = cloudData.secure_url;
    }

    // ✅ 서버로 저장 요청
    const payload = {
      userEmail,
      title,
      photoUrl,
      name,
      career,
      activity,
      character,
      fee,
      condition,
      category,
      public_title,
      public_photo,
      public_name,
      public_career,
      public_activity,
      public_character,
      public_fee,
      public_condition,
      public_category,
    };

    try {
      const res = await fetch('https://livee-server.onrender.com/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (res.ok) {
        alert('포트폴리오가 저장되었습니다!');
        window.location.href = '/portfolio-preview.html';
      } else {
        alert('서버 오류: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  });
});