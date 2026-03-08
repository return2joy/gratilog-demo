// Section A: 감사일기 (Simple Card Editor)
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
      if (e.target.closest('.btn-card-edit')) return startEdit(card);
      if (e.target.closest('.btn-card-delete')) return deleteCard(card);
      if (e.target.closest('.btn-edit-save')) return saveEdit(card);
      if (e.target.closest('.btn-edit-cancel')) return cancelEdit(card);
      if (card.classList.contains('editing')) return;
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
    card.innerHTML =
      '<div class="card-content">' +
        '<div class="card-header-row">' +
          '<span class="card-number">' + count + '.</span>' +
          '<span class="card-time">' + timeStr + '</span>' +
        '</div>' +
        '<div class="card-text">' + escapeHtml(text) + '</div>' +
        '<div class="card-edit-area">' +
          '<textarea class="card-edit-textarea"></textarea>' +
          '<div class="card-edit-btns">' +
            '<button class="btn-edit-cancel">취소</button>' +
            '<button class="btn-edit-save">저장</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="card-actions-side">' +
        '<button class="btn-card-edit" title="수정"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
        '<button class="btn-card-delete" title="삭제"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>' +
      '</div>';
    cardArea.appendChild(card);
    cardArea.scrollTop = cardArea.scrollHeight;
  }

  function renumberCards() {
    var cards = cardArea.querySelectorAll('.gratitude-card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].querySelector('.card-number').textContent = (i + 1) + '.';
    }
    count = cards.length;
  }

  function toggleActions(card) {
    const wasOpen = card.classList.contains('show-actions');
    cardArea.querySelectorAll('.gratitude-card.show-actions').forEach(c => c.classList.remove('show-actions'));
    if (!wasOpen) card.classList.add('show-actions');
  }

  function startEdit(card) {
    const textEl = card.querySelector('.card-text');
    const textarea = card.querySelector('.card-edit-textarea');
    textarea.value = textEl.textContent;
    card.classList.remove('show-actions');
    card.classList.add('editing');
    textarea.style.height = 'auto';
    textarea.style.height = Math.max(textarea.scrollHeight, 60) + 'px';
    textarea.focus();
  }

  function saveEdit(card) {
    const textEl = card.querySelector('.card-text');
    const textarea = card.querySelector('.card-edit-textarea');
    const newText = textarea.value.trim();
    if (newText) {
      textEl.textContent = newText;
    }
    card.classList.remove('editing');
  }

  function cancelEdit(card) {
    card.classList.remove('editing');
  }

  function deleteCard(card) {
    card.remove();
    renumberCards();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { init };
})();
