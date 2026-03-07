// Demo scenario data (SA0301 Section 6)
const SCENARIOS = {
  sectionA: {
    initialGreeting: "안녕하세요! 오늘 하루 감사했던 순간을 함께 나눠볼까요?",
    nudgePlaceholders: {
      morning: "오늘 아침, 감사한 마음으로 하루를 시작해볼까요?",
      afternoon: "오늘 점심은 누구와 함께 하셨나요?",
      evening: "하루를 돌아보며, 감사했던 순간을 떠올려 보세요",
      lateNight: "늦은 밤, 오늘 하루를 감사로 마무리해볼까요?"
    },
    countPlaceholders: [
      null,
      "또 다른 감사를 발견하셨나요?",
      "한 개만 더 쓰면 오늘의 최소 목표!",
      "벌써 3개! 두 개만 더 채워볼까요?",
      "거의 다 왔어요! 마지막 한 개!",
      "더 나누고 싶은 감사가 있나요?"
    ],
    guideTemplate: "[대상] 덕분에, [감정]을 함께 누릴 수 있어 감사합니다.",
    responses: [
      { trigger: 1, reply: "첫 번째 감사를 기록하셨네요! 좋은 시작이에요." },
      { trigger: 2, reply: "감사를 발견하는 눈이 열리고 있어요!" },
      { trigger: 3, reply: "벌써 3개! 감사의 마음이 풍성해지고 있네요." },
      { trigger: 4, reply: "한 개만 더 채우면 오늘의 목표 달성이에요!" },
      { trigger: 5, reply: "5개 완성! 오늘도 감사로 충만한 하루였네요." }
    ],
    defaultReply: "감사가 끝없이 피어나고 있네요!"
  },

  sectionB: {
    relationTags: [
      { label: "하나님", color: "#6C63FF", icon: "cross" },
      { label: "이웃/공동체", color: "#FF6B6B", icon: "people" },
      { label: "나 자신", color: "#4ECDC4", icon: "person" }
    ],
    emotionTags: [
      { label: "기쁨", color: "#FFD700" },
      { label: "즐거움", color: "#FFA07A" },
      { label: "행복", color: "#FF69B4" },
      { label: "소망", color: "#87CEEB" },
      { label: "소속감", color: "#98D8C8" }
    ],
    aiQuestions: [
      "오늘 점심은 누구와 드셨나요?",
      "오늘 스스로가 대견했던 순간이 있었나요?",
      "오늘 누군가에게 받은 작은 친절이 있나요?",
      "오늘 하늘을 올려다본 적 있나요?",
      "최근 감사하게 먹은 음식이 있나요?",
      "오늘 웃었던 순간이 있나요?",
      "가까운 사람에게 고마웠던 적이 있나요?",
      "오늘 건강하게 하루를 보낸 것에 감사한가요?"
    ],
    micDemoText: "동료 덕분에 위로를 누릴 수 있어 감사합니다"
  },

  sectionC: {
    progressIcons: ["🌰", "🌱", "🍃", "🌷", "🌸"],
    responses: [
      { trigger: 1, reply: "첫 번째 감사를 기록하셨네요! 좋은 시작이에요." },
      { trigger: 2, reply: "감사를 발견하는 눈이 열리고 있어요!" },
      { trigger: 3, reply: "벌써 3개! 오늘의 최소 목표를 달성했어요! 🎉" },
      { trigger: 4, reply: "감사가 풍성해지고 있네요. 한 개만 더!" },
      { trigger: 5, reply: "5개 완성! 오늘도 감사로 충만한 하루였네요. 🌸" }
    ],
    defaultReply: "감사가 끝없이 피어나고 있네요!",
    milestones: {
      3: { message: "🎉 최소 목표 달성!", cssClass: "toast-success" },
      5: { message: "🌸 오늘의 감사가 완성되었습니다!", cssClass: "toast-gold" }
    },
    countPlaceholders: [
      "첫 번째 감사를 적어보세요...",
      "두 번째 감사를 적어보세요...",
      "세 번째 감사를 적어보세요...",
      "네 번째 감사를 적어보세요...",
      "다섯 번째 감사를 적어보세요...",
      "더 나누고 싶은 감사가 있나요?"
    ]
  }
};
