const clipList = document.getElementById('clipList');
const popup = document.getElementById('popup');
const input = document.getElementById('youtubeLink');

// 저장된 클립 불러오기
const savedClips = JSON.parse(localStorage.getItem('clips') || '[]');

// 클립 렌더링
function renderClips() {
  clipList.innerHTML = '';
  savedClips.forEach(link => {
    const id = link.split("/").pop().split("?")[0];
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?rel=0`;
    iframe.allowFullscreen = true;

    const card = document.createElement('div');
    card.className = 'clip-card';
    card.appendChild(iframe);

    clipList.appendChild(card);
  });
}

// 팝업 열기
function openPopup() {
  popup.style.display = 'block';
}

// 클립 추가
function addClip() {
  const link = input.value.trim();
  if (link) {
    savedClips.push(link);
    localStorage.setItem('clips', JSON.stringify(savedClips));
    renderClips();
    input.value = '';
    popup.style.display = 'none';
  }
}

renderClips();