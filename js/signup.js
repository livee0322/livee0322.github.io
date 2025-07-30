async function handleSignup(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (password !== confirm) {
    alert("❌ 비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const response = await fetch("https://livee-server-dev.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("🎉 회원가입 성공! 홈으로 이동합니다.");
      window.location.href = "/index.html";
    } else {
      alert("⚠️ " + (result.message || "회원가입 실패"));
    }
  } catch (error) {
    alert("🚨 서버 오류: " + error.message);
  }
}