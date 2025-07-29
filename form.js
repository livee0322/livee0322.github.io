<script>
document.querySelector('.form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const title = this.querySelector('input[type="text"]').value;
  const brand = this.querySelectorAll('input[type="text"]')[1].value;
  const category = this.querySelector('select').value;
  const date = this.querySelector('input[type="datetime-local"]').value;
  const imageFile = this.querySelector('input[type="file"]').files[0];
  const detail = this.querySelector('textarea').value;
  const link = this.querySelector('input[type="url"]').value;

  // ✅ Cloudinary 업로드
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', 'livee_unsigned'); // 대표님 설정한 preset
  const res = await fetch('https://api.cloudinary.com/v1_1/dis1og9uq/image/upload', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  const imageUrl = data.secure_url;

  // ✅ 공고 객체 만들기
  const newPost = {
    title,
    brand,
    category,
    date,
    imageUrl,
    detail,
    link
  };

  // ✅ 기존 공고 리스트 불러오기 & 추가
  const postList = JSON.parse(localStorage.getItem("recruitPosts") || "[]");
  postList.unshift(newPost); // 최신 글이 위로
  localStorage.setItem("recruitPosts", JSON.stringify(postList));

  alert("공고가 등록되었습니다!");
  location.href = "/recruitlist.html";
});
</script>