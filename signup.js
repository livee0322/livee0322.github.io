// 비밀번호 보기 토글
document.querySelectorAll('.password-toggle i').forEach(icon => {
  icon.addEventListener('click', () => {
    const input = icon.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('ri-eye-line');
      icon.classList.add('ri-eye-off-line');
    } else {
      input.type = 'password';
      icon.classList.remove('ri-eye-off-line');
      icon.classList.add('ri-eye-line');
    }
  });
});

// 인증 요청 버튼 클릭 시
const requestBtn = document.getElementById('requestAuth');
const phoneInput = document.getElementById('phone');
const authWrap = document.getElementById('authWrap');
const authTimer = document.getElementById('authTimer');
let countdown;

requestBtn.addEventListener('click', () => {
  const phone = phoneInput.value.trim();
  if (!phone) {
    alert('휴대폰 번호를 입력해주세요.');
    return;
  }

  // 인증 영역 노출
  authWrap.style.display = 'block';

  // 3분 타이머 시작
  let time = 180;
  clearInterval(countdown);
  countdown = setInterval(() => {
    time--;
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    authTimer.innerText = `남은시간 ${minutes}:${seconds}`;

    if (time <= 0) {
      clearInterval(countdown);
      authTimer.innerText = '시간 초과';
    }
  }, 1000);

  // 실제 인증 문자 전송 로직은 서버 연동 필요
  alert('인증 문자가 전송되었습니다.');
});