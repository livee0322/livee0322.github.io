
const clipList = document.getElementById('clipList');
const popup = document.getElementById('popup');
const input = document.getElementById('youtubeLink');

const savedClips = JSON.parse(localStorage.getItem('clips') || '[]');

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

function openPopup() {
  popup.style.display = 'block';
}

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
```