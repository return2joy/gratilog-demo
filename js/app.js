// App initialization (SA0301 Section 9, UX5001 Section 8)
document.addEventListener('DOMContentLoaded', () => {
  // Initialize clock displays
  updateClocks();
  setInterval(updateClocks, 60000);

  // Initialize all sections
  SectionA.init();
  SectionB.init();
  SectionC.init();

  // Submit buttons
  document.querySelectorAll('.btn-submit').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('submitted')) return;
      btn.classList.add('submitted');
      btn.textContent = '제출 완료';
    });
  });
});

function updateClocks() {
  const now = new Date();
  const period = now.getHours() < 12 ? '오전' : '오후';
  let hours = now.getHours() % 12;
  if (hours === 0) hours = 12;
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeStr = `${period} ${hours}:${minutes}`;

  document.querySelectorAll('[data-clock]').forEach(el => {
    el.textContent = timeStr;
  });
}
