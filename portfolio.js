document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("portfolioForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      title: document.getElementById("title").value.trim(),
      name: document.getElementById("name").value.trim(),
      photo: document.getElementById("photo").value.trim(), // 추후 Cloudinary로 대체 가능
      experience: document.getElementById("experience").value.trim(),
      activities: document.getElementById("activities").value.trim(),
      personality: document.getElementById("personality").value.trim(),
      rate: document.getElementById("rate").value.trim(),
      condition: document.getElementById("condition").value.trim(),
      category: Array.from(document.querySelectorAll("input[name='category']:checked")).map(input => input.value),
      isPublic: document.getElementById("isPublic").checked
    };

    console.log("📦 제출된 데이터:", formData);

    try {
      const res = await fetch("https://livee-server-dev.onrender.com/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("포트폴리오가 등록되었습니다!");
        window.location.href = "/portfolio.html";
      } else {
        alert(result.message || "등록 실패");
      }
    } catch (err) {
      alert("서버 오류: " + err.message);
    }
  });
});