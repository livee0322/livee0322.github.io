const login = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://livee-server-dev.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      alert('✅ 로그인 성공!');
      // 이후 페이지 이동 등 처리
    } else {
      alert('❌ 로그인 실패: ' + data.message);
    }
  } catch (error) {
    alert('⚠️ 서버 오류: ' + error.message);
  }
};