// Section C: Progress Editor (UX5001 Section 5)
const SectionC = (() => {
  let count = 0;
  let cardArea, input, sendBtn, progressRow, counterEl, toastContainer;

  function init() {
    cardArea = document.getElementById('card-area-c');
    input = document.getElementById('input-c');
    sendBtn = document.getElementById('send-c');
    progressRow = document.getElementById('progress-row-c');
    counterEl = document.getElementById('progress-counter-c');
    toastContainer = document.getElementById('toast-c');

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

    // 1. Light up progress icon (UX5001 5.2)
    lightUpIcon(count);

    // 2. Update counter
    updateCounter();

    // 3. Add gratitude card
    addCard(text);

    // 4. Check milestones (UX5001 5.3)
    checkMilestone();

    // 5. Clear input, keep focus (UX5001 5.5)
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    updatePlaceholder();
    input.focus();
  }

  function lightUpIcon(n) {
    if (n > 5) return;
    const icon = progressRow.querySelector(`[data-stage="${n}"]`);
    if (!icon) return;

    icon.classList.remove('dim');
    icon.classList.add('lit');
    icon.querySelector('.icon-inner').textContent = SCENARIOS.sectionC.progressIcons[n - 1];

    // 5-complete: add gold border to all
    if (n === 5) {
      setTimeout(() => {
        progressRow.querySelectorAll('.progress-icon.lit').forEach(ic => {
          ic.classList.add('gold-border');
        });
        progressRow.classList.add('shimmer');
        setTimeout(() => progressRow.classList.remove('shimmer'), 1500);
      }, 400);
    }
  }

  function updateCounter() {
    const display = Math.min(count, 5);
    counterEl.textContent = `${display}/5 완료`;

    if (count >= 5) {
      counterEl.classList.remove('success');
      counterEl.classList.add('gold');
    } else if (count >= 3) {
      counterEl.classList.add('success');
    }
  }

  function updatePlaceholder() {
    const placeholders = SCENARIOS.sectionC.countPlaceholders;
    const idx = Math.min(count, placeholders.length - 1);
    input.placeholder = placeholders[idx];
  }

  function addCard(text) {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const card = document.createElement('div');
    card.className = 'gratitude-card';
    card.innerHTML = `
      <div class="card-tags"><span class="card-tag" style="background:#6C63FF1A;color:#6C63FF">감사 #${count}</span></div>
      <div class="card-text">${escapeHtml(text)}</div>
      <div class="card-time">${timeStr}</div>
    `;

    // Insert at top (newest first)
    cardArea.insertBefore(card, cardArea.firstChild);
  }

  function showFeedback() {
    setTimeout(() => {
      // Show typing indicator
      const typing = document.createElement('div');
      typing.className = 'typing-indicator';
      typing.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
      cardArea.insertBefore(typing, cardArea.firstChild);

      setTimeout(() => {
        typing.remove();
        const scenario = SCENARIOS.sectionC.responses.find(r => r.trigger === count);
        const reply = scenario ? scenario.reply : SCENARIOS.sectionC.defaultReply;

        const feedback = document.createElement('div');
        feedback.className = 'ai-feedback';
        feedback.textContent = reply;
        cardArea.insertBefore(feedback, cardArea.firstChild);
        cardArea.scrollTop = 0;
      }, 800);
    }, 200);
  }

  function checkMilestone() {
    const milestone = SCENARIOS.sectionC.milestones[count];
    if (!milestone) return;

    setTimeout(() => {
      const toast = document.createElement('div');
      toast.className = `toast-message ${milestone.cssClass}`;
      toast.textContent = milestone.message;
      toastContainer.appendChild(toast);

      setTimeout(() => toast.remove(), 2800);
    }, 500);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { init };
})();
