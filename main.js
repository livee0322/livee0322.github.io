// main.js v1.01

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', () => {
    const keyword = searchInput.value.trim();
    if (!keyword) {
      alert('검색어를 입력해주세요.');
    } else {
      alert(`"${keyword}"에 대한 검색 결과가 없습니다.`);
    }
  });

  // 슬라이드 기능
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const wrapper = document.querySelector('.slide-wrapper');
  let currentIndex = 0;

  function goToSlide(index) {
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, 5000);
});
