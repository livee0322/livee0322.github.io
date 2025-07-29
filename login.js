async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://livee-server-dev.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("로그인 성공!");

      // 토큰 저장 (localStorage)
      localStorage.setItem("liveeToken", result.token);

      // 메인 페이지로 이동
      window.location.href = "/index.html";
    } else {
      alert(result.message || "로그인 실패");
    }
  } catch (error) {
    alert("서버 연결 실패: " + error.message);
  }
}