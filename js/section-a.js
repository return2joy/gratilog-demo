// Section A: Simple Editor
const SectionA = (() => {
  let count = 0;
  let cardArea, input, sendBtn;

  function init() {
    cardArea = document.getElementById('card-area-a');
    input = document.getElementById('input-a');
    sendBtn = document.getElementById('send-a');

    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeydown);
    sendBtn.addEventListener('click', send);

    cardArea.addEventListener('click', (e) => {
      const card = e.target.closest('.gratitude-card');
      if (!card) return;
      if (e.target.closest('.btn-card-edit')) return editCard(card);
      if (e.target.closest('.btn-card-delete')) return deleteCard(card);
      toggleActions(card);
    });
  }

  function onInput() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';
    sendBtn.disabled = !input.value.trim();
  }

  function onKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.value.trim()) send();
    }
  }

  function send() {
    const text = input.value.trim();
    if (!text) return;

    count++;
    addCard(text);

    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    input.focus();
  }

  function addCard(text) {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const card = document.createElement('div');
    card.className = 'gratitude-card';
    card.dataset.id = count;
    card.innerHTML =
      '<div class="card-header-row">' +
        '<span class="card-number">' + count + '.</span>' +
        '<span class="card-time">' + timeStr + '</span>' +
      '</div>' +
      '<div class="card-text">' + escapeHtml(text) + '</div>' +
      '<div class="card-actions">' +
        '<button class="btn-card-edit">수정</button>' +
        '<button class="btn-card-delete">삭제</button>' +
      '</div>';
    cardArea.insertBefore(card, cardArea.firstChild);
  }

  function toggleActions(card) {
    const wasOpen = card.classList.contains('show-actions');
    cardArea.querySelectorAll('.gratitude-card.show-actions').forEach(c => c.classList.remove('show-actions'));
    if (!wasOpen) card.classList.add('show-actions');
  }

  function editCard(card) {
    const textEl = card.querySelector('.card-text');
    const newText = prompt('수정:', textEl.textContent);
    if (newText !== null && newText.trim()) {
      textEl.textContent = newText.trim();
    }
    card.classList.remove('show-actions');
  }

  function deleteCard(card) {
    if (confirm('삭제하시겠습니까?')) {
      card.remove();
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { init };
})();
