document.getElementById("recruitForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const imageInput = document.getElementById("image");
  if (!imageInput.files.length) {
    alert("썸네일 이미지를 선택해주세요.");
    return;
  }

  const formData = new FormData();
  formData.append("file", imageInput.files[0]);
  formData.append("upload_preset", "livee_unsigned");

  let imageUrl = "";

  try {
    const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/dis1og9uq/image/upload", {
      method: "POST",
      body: formData,
    });
    const cloudinaryData = await cloudinaryRes.json();

    console.log("✅ Cloudinary 응답:", cloudinaryData); // 디버깅용

    imageUrl = cloudinaryData.secure_url;
    if (!imageUrl) throw new Error("Cloudinary 업로드 실패");
  } catch (err) {
    console.error("❌ 이미지 업로드 오류:", err);
    alert("이미지 업로드 실패: " + err.message);
    return;
  }

  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();

  const token = localStorage.getItem("liveeToken");
  if (!token) {
    alert("로그인이 필요합니다.");
    location.href = "/login.html";
    return;
  }

  try {
    const res = await fetch("https://livee-server-dev.onrender.com/api/recruit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, category, description, imageUrl }),
    });

    const result = await res.json();

    if (res.ok) {
      alert("공고가 등록되었습니다!");
      location.href = "/recruitlist.html";
    } else {
      console.error("❌ 서버 응답 오류:", result);
      alert(result.message || "등록 실패");
    }
  } catch (err) {
    console.error("❌ 서버 통신 오류:", err);
    alert("서버 오류: " + err.message);
  }
});