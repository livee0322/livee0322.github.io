document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = document.querySelector('input[placeholder*="제목"]').value;
  const brand = document.querySelector('input[placeholder*="브랜드"]').value;
  const category = document.querySelector("select").value;
  const datetime = document.querySelector('input[type="datetime-local"]').value;
  const imageFile = document.querySelector('input[type="file"]').files[0];
  const content = document.querySelector("textarea").value;
  const link = document.querySelector('input[type="url"]').value;

  // ✅ Cloudinary로 이미지 업로드
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "livee_unsigned");

  const res = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  const imageUrl = data.secure_url;

  // ✅ 공고 데이터 구성
  const newPost = {
    title,
    brand,
    category,
    datetime,
    imageUrl,
    content,
    link,
  };

  // ✅ 기존 공고에 추가 저장
  const saved = JSON.parse(localStorage.getItem("recruitPosts") || "[]");
  saved.unshift(newPost);
  localStorage.setItem("recruitPosts", JSON.stringify(saved));

  alert("공고가 등록되었습니다!");
  window.location.href = "/recruitlist.html";
});