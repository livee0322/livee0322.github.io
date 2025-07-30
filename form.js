document.getElementById("recruitForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const imageInput = document.getElementById("image");
  const formData = new FormData();
  formData.append("file", imageInput.files[0]);
  formData.append("upload_preset", "livee_unsigned"); // ✅ Cloudinary preset name

  let imageUrl = "";

  try {
    const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
      method: "POST",
      body: formData,
    });

    const cloudinaryData = await cloudinaryRes.json();
    imageUrl = cloudinaryData.secure_url;
    if (!imageUrl) throw new Error("Cloudinary 업로드 실패");

  } catch (err) {
    alert("이미지 업로드 실패: " + err.message);
    return;
  }

  // 입력 데이터 수집
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;

  try {
    const token = localStorage.getItem("liveeToken");

    const res = await fetch("https://livee-server-dev.onrender.com/api/recruit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        category,
        description,
        imageUrl, // ✅ Cloudinary URL 포함
      }),
    });

    const result = await res.json();
    if (res.ok) {
      alert("공고가 등록되었습니다!");
      location.href = "/recruitlist.html";
    } else {
      alert(result.message || "등록 실패");
    }
  } catch (err) {
    alert("서버 오류: " + err.message);
  }
});