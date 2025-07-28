const calendarEl = document.getElementById('calendar');
const selectedDatesEl = document.getElementById('selectedDates').querySelector('span');
let selected = [];

function generateCalendar(year, month) {
  calendarEl.innerHTML = '';
  const date = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= last; i++) {
    const cell = document.createElement('div');
    cell.textContent = i;
    const dateStr = `${year}-${(month+1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    
    cell.addEventListener('click', () => {
      if (selected.includes(dateStr)) {
        selected = selected.filter(d => d !== dateStr);
        cell.classList.remove('selected');
      } else {
        selected.push(dateStr);
        cell.classList.add('selected');
      }
      selectedDatesEl.textContent = selected.length ? selected.join(', ') : '(없음)';
    });

    calendarEl.appendChild(cell);
  }
}

// 오늘 날짜 기준으로 그리기
const today = new Date();
generateCalendar(today.getFullYear(), today.getMonth());