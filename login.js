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
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("로그인 성공!");
      localStorage.setItem("loggedInUser", email);
      window.location.href = "/index.html";
    } else {
      alert(result.message || "로그인 실패");
    }
  } catch (error) {
    alert("서버 연결 실패: " + error.message);
  }
}