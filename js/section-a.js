// Section A: Chat-based Editor (UX5001 Section 3)
const SectionA = (() => {
  let count = 0;
  let chatArea, input, sendBtn, guideOverlay;

  function init() {
    chatArea = document.getElementById('chat-area-a');
    input = document.getElementById('input-a');
    sendBtn = document.getElementById('send-a');
    guideOverlay = document.getElementById('guide-overlay-a');

    updatePlaceholder();

    // Input events
    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeydown);
    sendBtn.addEventListener('click', send);
  }

  function onInput() {
    // Auto-resize textarea
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';

    const hasText = input.value.trim().length > 0;
    sendBtn.disabled = !hasText;

    // Guide overlay visibility (UX5001 3.3)
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
    addBubble('user', text);

    // Clear input, keep focus (UX5001 5.5)
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    guideOverlay.classList.remove('visible');
    updatePlaceholder();
    input.focus();

  }

  function addBubble(type, text) {
    const bubble = document.createElement('div');
    bubble.className = `bubble bubble-${type}`;
    bubble.textContent = text;
    chatArea.appendChild(bubble);
    scrollToBottom();
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      chatArea.scrollTop = chatArea.scrollHeight;
    });
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

  return { init };
})();
