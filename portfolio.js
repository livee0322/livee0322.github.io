document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("portfolioForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      if (key.startsWith("public_")) {
        data[key] = true;
      } else {
        data[key] = value;
      }
    });

    try {
      const res = await fetch("https://livee-server-dev.onrender.com/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert("포트폴리오가 등록되었습니다!");
        window.location.href = "/myportfolio.html";
      } else {
        alert(result.message || "등록 실패");
      }
    } catch (err) {
      alert("서버 오류: " + err.message);
    }
  });
});