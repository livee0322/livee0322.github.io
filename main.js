// 슬라이딩 배너 자동 전환
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  const wrapper = document.querySelector('.slide-wrapper');
  const slideWidth = wrapper.clientWidth;
  wrapper.scrollLeft = slideWidth * index;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

setInterval(nextSlide, 4000);

// 검색 버튼 기능
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("searchButton");
  const input = document.getElementById("searchInput");

  button.addEventListener("click", () => {
    const keyword = input.value.trim();
    if (!keyword) {
      alert("검색어를 입력해주세요.");
    } else {
      alert(`'${keyword}'에 대한 검색 결과가 없습니다.`);
    }
  });
});
