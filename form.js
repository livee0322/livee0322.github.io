document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = document.querySelector("button[type=submit]");
  submitBtn.disabled = true;
  submitBtn.textContent = "등록 중...";

  try {
    // ✅ 입력값 수집
    const title = document.querySelector('input[placeholder*="제목"]').value.trim();
    const brand = document.querySelector('input[placeholder*="브랜드"]').value.trim();
    const category = document.querySelector("select").value;
    const datetime = document.querySelector('input[type="datetime-local"]').value;
    const imageFile = document.querySelector('input[type="file"]').files[0];
    const content = document.querySelector("textarea").value.trim();
    const link = document.querySelector('input[type="url"]').value.trim();

    if (!title || !brand || !category || !datetime || !imageFile || !content || !link) {
      alert("모든 항목을 입력해주세요.");
      throw new Error("필수 입력 누락");
    }

    // ✅ Cloudinary 업로드
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "livee_unsigned");

    const res = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
      method: "POST",
      body: formData,
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (!isJson || !data.secure_url) {
      console.error("Cloudinary 응답 오류", data);
      throw new Error("Cloudinary 업로드 실패");
    }

    const imageUrl = data.secure_url;

    // ✅ 공고 객체 구성
    const newPost = { title, brand, category, datetime, imageUrl, content, link };

    const saved = JSON.parse(localStorage.getItem("recruitPosts") || "[]");
    saved.unshift(newPost);
    localStorage.setItem("recruitPosts", JSON.stringify(saved));

    // ✅ 완료 후 이동
    alert("🎉 공고가 성공적으로 등록되었습니다!");
    window.location.href = "/recruitlist.html";

  } catch (err) {
    console.error("🚨 등록 중 에러:", err);
    alert("❗ 등록에 실패했습니다. 다시 시도해주세요.");
    submitBtn.disabled = false;
    submitBtn.textContent = "등록하기";
  }
});