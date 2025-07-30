document.addEventListener("DOMContentLoaded", async () => {
  const portfolioContent = document.getElementById("portfolioContent");

  try {
    const res = await fetch("https://livee-server-dev.onrender.com/portfolio/mine", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("liveeToken")}`,
      },
    });

    const data = await res.json();

    if (res.ok && data && data.portfolio) {
      // 포트폴리오 존재 시 UI 렌더링
      portfolioContent.innerHTML = `
        <div class="card">
          <h3>${data.portfolio.title}</h3>
          <p><strong>이름:</strong> ${data.portfolio.name}</p>
          <p><strong>경력:</strong> ${data.portfolio.experience}</p>
          <p><strong>출연료:</strong> ${data.portfolio.rate}원/시</p>
          <button onclick="location.href='/portfolio-edit.html'">수정하기</button>
        </div>
      `;
    }
  } catch (err) {
    console.error("❌ 내 포트폴리오 불러오기 실패:", err);
  }
});