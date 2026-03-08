// Section B: 4+ 이야기 작성 (Guided Conversational Editor)
const SectionB = (() => {
  let currentStep = 0; // 0~5 (6 steps)
  let chatArea, input, sendBtn;
  var data = null;
  var stepCards = []; // track which card belongs to which step

  function init() {
    data = PROMPTS.story;
    chatArea = document.getElementById('chat-area-b');
    input = document.getElementById('input-b');
    sendBtn = document.getElementById('send-b');

    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeydown);
    sendBtn.addEventListener('click', send);

    chatArea.addEventListener('click', (e) => {
      var card = e.target.closest('.chat-user-card');
      if (!card) return;
      if (e.target.closest('.btn-card-edit')) return startEdit(card);
      if (e.target.closest('.btn-card-delete')) return deleteCard(card);
      if (e.target.closest('.btn-edit-save')) return saveEdit(card);
      if (e.target.closest('.btn-edit-cancel')) return cancelEdit(card);
      if (card.classList.contains('editing')) return;
      toggleActions(card);
    });

    // Start: show intro message + first guide question
    showGuideMessage('4+ 이야기를 시작합니다.');
    setTimeout(function() {
      showGuideQuestion(0);
    }, 600);
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
    var text = input.value.trim();
    if (!text) return;
    if (currentStep >= 6) return; // all steps done

    addUserCard(text, currentStep);
    currentStep++;

    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;

    if (currentStep < 6) {
      // Update placeholder for next step
      input.placeholder = data.steps[currentStep].placeholder;
      // Show next guide question after short delay
      setTimeout(function() {
        showGuideQuestion(currentStep);
      }, 600);
    } else {
      // All steps done
      input.placeholder = '모든 단계를 완료했습니다!';
      input.disabled = true;
      sendBtn.disabled = true;
      setTimeout(function() {
        showGuideMessage('수고하셨어요! 오늘의 4+ 이야기가 완성되었습니다.');
      }, 600);
    }
    input.focus();
  }

  function showGuideMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'chat-guide-msg';
    msg.innerHTML =
      '<div class="guide-avatar">' + PROMPTS.guideName.charAt(0) + '</div>' +
      '<div class="guide-bubble">' +
        '<div class="guide-name">' + PROMPTS.guideName + '</div>' +
        '<div class="guide-text">' + text + '</div>' +
      '</div>';
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function showGuideQuestion(step) {
    var msgs = data.messages[step];
    var randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
    var stepLabel = data.steps[step].label;

    var msg = document.createElement('div');
    msg.className = 'chat-guide-msg';
    msg.innerHTML =
      '<div class="guide-avatar">' + PROMPTS.guideName.charAt(0) + '</div>' +
      '<div class="guide-bubble">' +
        '<div class="guide-name">' + PROMPTS.guideName + ' <span class="guide-step">' + (step + 1) + '/6 ' + stepLabel + '</span></div>' +
        '<div class="guide-text">' + randomMsg + '</div>' +
      '</div>';
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;

    // Update placeholder
    input.placeholder = data.steps[step].placeholder;
  }

  function addUserCard(text, step) {
    var now = new Date();
    var timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    var stepLabel = data.steps[step].label;

    var card = document.createElement('div');
    card.className = 'chat-user-card';
    card.dataset.step = step;
    card.innerHTML =
      '<div class="user-card-content">' +
        '<div class="user-card-header">' +
          '<span class="user-card-step">' + (step + 1) + '. ' + stepLabel + '</span>' +
          '<span class="user-card-time">' + timeStr + '</span>' +
        '</div>' +
        '<div class="user-card-text">' + escapeHtml(text) + '</div>' +
        '<div class="user-card-edit-area">' +
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
    chatArea.appendChild(card);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function toggleActions(card) {
    var wasOpen = card.classList.contains('show-actions');
    chatArea.querySelectorAll('.chat-user-card.show-actions').forEach(function(c) { c.classList.remove('show-actions'); });
    if (!wasOpen) card.classList.add('show-actions');
  }

  function startEdit(card) {
    var textEl = card.querySelector('.user-card-text');
    var textarea = card.querySelector('.card-edit-textarea');
    textarea.value = textEl.textContent;
    card.classList.remove('show-actions');
    card.classList.add('editing');
    textarea.style.height = 'auto';
    textarea.style.height = Math.max(textarea.scrollHeight, 60) + 'px';
    textarea.focus();
  }

  function saveEdit(card) {
    var textEl = card.querySelector('.user-card-text');
    var textarea = card.querySelector('.card-edit-textarea');
    var newText = textarea.value.trim();
    if (newText) {
      textEl.textContent = newText;
    }
    card.classList.remove('editing');
  }

  function cancelEdit(card) {
    card.classList.remove('editing');
  }

  function deleteCard(card) {
    var step = parseInt(card.dataset.step);
    // Remove this card and everything after it (guide messages too)
    var allChildren = Array.from(chatArea.children);
    var cardIndex = allChildren.indexOf(card);
    // Remove from cardIndex onward
    for (var i = allChildren.length - 1; i >= cardIndex; i--) {
      allChildren[i].remove();
    }
    // Reset to that step
    currentStep = step;
    input.disabled = false;
    input.placeholder = data.steps[step].placeholder;
    sendBtn.disabled = !input.value.trim();

    // Show the guide question again for this step
    setTimeout(function() {
      showGuideQuestion(step);
    }, 300);
    input.focus();
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { init };
})();
