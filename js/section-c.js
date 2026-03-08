// Section C: 임마누엘일기 (Conversational Editor)
const SectionC = (() => {
  let count = 0;
  let chatArea, input, sendBtn;

  function init() {
    chatArea = document.getElementById('chat-area-c');
    input = document.getElementById('input-c');
    sendBtn = document.getElementById('send-c');

    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeydown);
    sendBtn.addEventListener('click', send);

    chatArea.addEventListener('click', (e) => {
      const bubble = e.target.closest('.chat-bubble');
      if (!bubble) return;
      if (e.target.closest('.btn-card-edit')) return startEdit(bubble);
      if (e.target.closest('.btn-card-delete')) return deleteBubble(bubble);
      if (e.target.closest('.btn-edit-save')) return saveEdit(bubble);
      if (e.target.closest('.btn-edit-cancel')) return cancelEdit(bubble);
      if (bubble.classList.contains('editing')) return;
      toggleActions(bubble);
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
    addBubble(text);

    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    input.focus();
  }

  function addBubble(text) {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML =
      '<div class="chat-bubble-content">' +
        '<div class="chat-bubble-header">' +
          '<span class="chat-number">' + count + '.</span>' +
          '<span class="chat-time">' + timeStr + '</span>' +
        '</div>' +
        '<div class="chat-text">' + escapeHtml(text) + '</div>' +
        '<div class="chat-edit-area">' +
          '<textarea class="chat-edit-textarea"></textarea>' +
          '<div class="chat-edit-btns">' +
            '<button class="btn-edit-cancel">취소</button>' +
            '<button class="btn-edit-save">저장</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="chat-actions-side">' +
        '<button class="btn-card-edit" title="수정"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
        '<button class="btn-card-delete" title="삭제"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>' +
      '</div>';
    chatArea.appendChild(bubble);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function renumberBubbles() {
    var bubbles = chatArea.querySelectorAll('.chat-bubble');
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].querySelector('.chat-number').textContent = (i + 1) + '.';
    }
    count = bubbles.length;
  }

  function toggleActions(bubble) {
    const wasOpen = bubble.classList.contains('show-actions');
    chatArea.querySelectorAll('.chat-bubble.show-actions').forEach(b => b.classList.remove('show-actions'));
    if (!wasOpen) bubble.classList.add('show-actions');
  }

  function startEdit(bubble) {
    const textEl = bubble.querySelector('.chat-text');
    const textarea = bubble.querySelector('.chat-edit-textarea');
    textarea.value = textEl.textContent;
    bubble.classList.remove('show-actions');
    bubble.classList.add('editing');
    textarea.style.height = 'auto';
    textarea.style.height = Math.max(textarea.scrollHeight, 60) + 'px';
    textarea.focus();
  }

  function saveEdit(bubble) {
    const textEl = bubble.querySelector('.chat-text');
    const textarea = bubble.querySelector('.chat-edit-textarea');
    const newText = textarea.value.trim();
    if (newText) {
      textEl.textContent = newText;
    }
    bubble.classList.remove('editing');
  }

  function cancelEdit(bubble) {
    bubble.classList.remove('editing');
  }

  function deleteBubble(bubble) {
    bubble.remove();
    renumberBubbles();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { init };
})();
