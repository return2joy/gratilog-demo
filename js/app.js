// App initialization
document.addEventListener('DOMContentLoaded', () => {
  updateDates();

  SectionA.init();
  SectionB.init();
  SectionC.init();

  // Submit buttons (small, in header)
  document.querySelectorAll('.btn-submit-sm').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('submitted')) return;
      btn.classList.add('submitted');
      btn.textContent = '완료';
    });
  });
});

function updateDates() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[now.getDay()];
  const dateStr = month + '월 ' + day + '일 (' + weekday + ')';

  document.querySelectorAll('[data-date]').forEach(el => {
    el.textContent = dateStr;
  });
}
