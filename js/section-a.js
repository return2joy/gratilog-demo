// Section A: Conversational Editor - card based with numbering + time + edit
const SectionA = (() => {
  let count = 0;
  let cardArea, input, sendBtn, guideOverlay;

  function init() {
    cardArea = document.getElementById('card-area-a');
    input = document.getElementById('input-a');
    sendBtn = document.getElementById('send-a');
    guideOverlay = document.getElementById('guide-overlay-a');

    updatePlaceholder();

    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeydown);
    sendBtn.addEventListener('click', send);
  }

  function onInput() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';

    const hasText = input.value.trim().length > 0;
    sendBtn.disabled = !hasText;

    if (hasText && !input.value.includes('감사') && !input.value.includes('덕분에')) {
      guideOverlay.classList.add('visible');
    } else {
      guideOverlay.classList.remove('visible');
    }
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
    guideOverlay.classList.remove('visible');
    updatePlaceholder();
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
        <span class="card-tag" style="background:#6C63FF1A;color:#6C63FF">감사 #${count}</span>
        <span class="card-time">${timeStr}</span>
        <button class="btn-edit" onclick="SectionA.editCard(${count})">수정</button>
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

  function updatePlaceholder() {
    const sc = SCENARIOS.sectionA;
    if (count > 0 && count < sc.countPlaceholders.length) {
      input.placeholder = sc.countPlaceholders[count];
    } else if (count >= sc.countPlaceholders.length) {
      input.placeholder = sc.countPlaceholders[sc.countPlaceholders.length - 1];
    } else {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) input.placeholder = sc.nudgePlaceholders.morning;
      else if (hour >= 12 && hour < 18) input.placeholder = sc.nudgePlaceholders.afternoon;
      else if (hour >= 18 && hour < 24) input.placeholder = sc.nudgePlaceholders.evening;
      else input.placeholder = sc.nudgePlaceholders.lateNight;
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { init, editCard };
})();
