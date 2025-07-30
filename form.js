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

    // ✅ 필수 항목 검사
    if (!title || !brand || !category || !datetime || !imageFile || !content || !link) {
      alert("모든 항목을 입력해주세요.");
      throw new Error("필수 입력 누락");
    }

    // ✅ 이미지 업로드 준비
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "livee_unsigned");

    // ✅ Cloudinary 업로드 요청
    const res = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error("Cloudinary 업로드 실패: " + errText);
    }

    const data = await res.json();
    const imageUrl = data.secure_url;

    if (!imageUrl) throw new Error("Cloudinary에서 이미지 URL을 받지 못했습니다.");

    // ✅ 공고 데이터 구성
    const newPost = { title, brand, category, datetime, imageUrl, content, link };

    const saved = JSON.parse(localStorage.getItem("recruitPosts") || "[]");
    saved.unshift(newPost);
    localStorage.setItem("recruitPosts", JSON.stringify(saved));

    // ✅ 완료 처리
    alert("🎉 공고가 성공적으로 등록되었습니다!");
    window.location.href = "/recruitlist.html";

  } catch (err) {
    console.error("🚨 등록 중 에러:", err);
    alert("❗ 등록에 실패했습니다. 다시 시도해주세요.\n" + err.message);
    submitBtn.disabled = false;
    submitBtn.textContent = "등록하기";
  }
});