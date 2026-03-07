// Section B: Quick Action Editor (UX5001 Section 4)
const SectionB = (() => {
  let count = 0;
  let currentTag = null;
  let currentEmotion = null;
  let questionIndex = 0;
  let cardArea, input, sendBtn;
  let tagSheet, emotionChips, micOverlay;

  function init() {
    cardArea = document.getElementById('card-area-b');
    input = document.getElementById('input-b');
    sendBtn = document.getElementById('send-b');
    tagSheet = document.getElementById('tag-sheet-b');
    emotionChips = document.getElementById('emotion-chips-b');
    micOverlay = document.getElementById('mic-overlay-b');

    // Input events
    input.addEventListener('input', onInput);
    input.addEventListener('keydown', onKeydown);
    sendBtn.addEventListener('click', send);

    // Quick action buttons
    document.getElementById('qa-tag-b').addEventListener('click', toggleTagSheet);
    document.getElementById('qa-emotion-b').addEventListener('click', toggleEmotionChips);
    document.getElementById('qa-mic-b').addEventListener('click', openMic);
    document.getElementById('qa-bulb-b').addEventListener('click', askAiQuestion);

    // Tag chip clicks
    tagSheet.querySelectorAll('.tag-chip').forEach(chip => {
      chip.addEventListener('click', () => selectTag(chip.dataset.tag));
    });

    // Emotion chip clicks
    emotionChips.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => selectEmotion(chip.dataset.emotion));
    });

    // Mic buttons
    document.getElementById('mic-cancel-b').addEventListener('click', closeMic);
    document.getElementById('mic-done-b').addEventListener('click', micDone);

    // Close sheets on outside click
    document.getElementById('section-b').addEventListener('click', (e) => {
      if (!e.target.closest('.tag-sheet') && !e.target.closest('#qa-tag-b')) {
        tagSheet.classList.remove('open');
      }
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
    addCard(text, currentTag, currentEmotion);

    // Reset
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    currentTag = null;
    currentEmotion = null;
    input.focus();
  }

  function toggleTagSheet() {
    emotionChips.classList.remove('open');
    tagSheet.classList.toggle('open');
  }

  function toggleEmotionChips() {
    tagSheet.classList.remove('open');
    emotionChips.classList.toggle('open');
  }

  function selectTag(tag) {
    currentTag = tag;
    tagSheet.classList.remove('open');

    // Insert tag at beginning of input
    const tagText = `@${tag} `;
    if (!input.value.startsWith('@')) {
      input.value = tagText + input.value;
    } else {
      input.value = input.value.replace(/@[^\s]+\s*/, tagText);
    }
    sendBtn.disabled = !input.value.trim();
    input.focus();
  }

  function selectEmotion(emotion) {
    currentEmotion = emotion;
    emotionChips.classList.remove('open');

    // Insert emotion at cursor or end
    const pos = input.selectionStart || input.value.length;
    const before = input.value.slice(0, pos);
    const after = input.value.slice(pos);
    input.value = before + emotion + ' ' + after;
    sendBtn.disabled = !input.value.trim();
    input.focus();
  }

  function openMic() {
    micOverlay.classList.add('open');
  }

  function closeMic() {
    micOverlay.classList.remove('open');
  }

  function micDone() {
    micOverlay.classList.remove('open');
    input.value = SCENARIOS.sectionB.micDemoText;
    sendBtn.disabled = false;
    input.focus();
  }

  function askAiQuestion() {
    const questions = SCENARIOS.sectionB.aiQuestions;
    const question = questions[questionIndex % questions.length];
    questionIndex++;

    const bubble = document.createElement('div');
    bubble.className = 'ai-question';
    bubble.textContent = '💡 ' + question;
    cardArea.appendChild(bubble);
    cardArea.scrollTop = cardArea.scrollHeight;
  }

  function addCard(text, tag, emotion) {
    const card = document.createElement('div');
    card.className = 'gratitude-card';

    let tagsHtml = '';
    if (tag) {
      const tagData = SCENARIOS.sectionB.relationTags.find(t => t.label === tag);
      const color = tagData ? tagData.color : '#666';
      tagsHtml += `<span class="card-tag" style="background:${color}1A;color:${color}">@${tag}</span>`;
    }
    if (emotion) {
      const emotionData = SCENARIOS.sectionB.emotionTags.find(e => e.label === emotion);
      const color = emotionData ? emotionData.color : '#666';
      tagsHtml += `<span class="card-tag" style="background:${color}1A;color:${color}">${emotion}</span>`;
    }

    // Clean @ prefix from display text
    let displayText = text.replace(/@[^\s]+\s*/, '').trim();

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    card.innerHTML = `
      ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
      <div class="card-text">${escapeHtml(displayText)}</div>
      <div class="card-time">${timeStr}</div>
    `;

    // Insert at top (newest first)
    cardArea.insertBefore(card, cardArea.firstChild);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  return { init };
})();
