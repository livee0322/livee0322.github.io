async function handleSignup(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (password !== confirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const res = await fetch("https://livee-server-dev.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (res.ok) {
      alert("회원가입이 완료되었습니다!");
      location.href = "/login.html";
    } else {
      alert(result.message || "회원가입 실패");
    }
  } catch (err) {
    alert("서버 오류: " + err.message);
  }
}