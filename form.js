document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = document.querySelector("button[type=submit]");
  submitBtn.disabled = true;
  submitBtn.textContent = "등록 중...";

  const title = document.querySelector('input[placeholder*="제목"]').value;
  const brand = document.querySelector('input[placeholder*="브랜드"]').value;
  const category = document.querySelector("select").value;
  const datetime = document.querySelector('input[type="datetime-local"]').value;
  const imageFile = document.querySelector('input[type="file"]').files[0];
  const content = document.querySelector("textarea").value;
  const link = document.querySelector('input[type="url"]').value;

  try {
    // ✅ Cloudinary 업로드
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "livee_unsigned");

    const res = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data || !data.secure_url) throw new Error("Cloudinary 업로드 실패");

    const imageUrl = data.secure_url;

    // ✅ 공고 객체 구성
    const newPost = { title, brand, category, datetime, imageUrl, content, link };

    const saved = JSON.parse(localStorage.getItem("recruitPosts") || "[]");
    saved.unshift(newPost);
    localStorage.setItem("recruitPosts", JSON.stringify(saved));

    alert("🎉 공고가 성공적으로 등록되었습니다!");
    window.location.href = "/recruitlist.html";

  } catch (err) {
    console.error("등록 중 오류:", err);
    alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    submitBtn.disabled = false;
    submitBtn.textContent = "등록하기";
  }
});