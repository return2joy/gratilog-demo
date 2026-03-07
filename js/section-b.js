// Section B: Simple Editor - card based with numbering + time + edit
const SectionB = (() => {
  let count = 0;
  let cardArea, input, sendBtn;

  function init() {
    cardArea = document.getElementById('card-area-b');
    input = document.getElementById('input-b');
    sendBtn = document.getElementById('send-b');

    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeydown);
    sendBtn.addEventListener('click', send);
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
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const card = document.createElement('div');
    card.className = 'gratitude-card';
    card.dataset.id = count;
    card.innerHTML = `
      <div class="card-header-row">
        <span class="card-tag" style="background:#4ECDC41A;color:#4ECDC4">감사 #${count}</span>
        <span class="card-time">${timeStr}</span>
        <button class="btn-edit" onclick="SectionB.editCard(${count})">수정</button>
      </div>
      <div class="card-text">${escapeHtml(text)}</div>
    `;
    cardArea.insertBefore(card, cardArea.firstChild);
  }

  function editCard(id) {
    const card = cardArea.querySelector(`[data-id="${id}"]`);
    if (!card) return;
    const textEl = card.querySelector('.card-text');
    const current = textEl.textContent;
    const newText = prompt('수정:', current);
    if (newText !== null && newText.trim()) {
      textEl.textContent = newText.trim();
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { init, editCard };
})();
