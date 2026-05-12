export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { qType, age, gender, partner, contactStatus, situation, cardCtx } = req.body;

    // ===== LUMI 블랙박스 (서버에서만 보임) =====
    const LUMI = `[LUMI Tarot 독점 리딩 철학]

핵심 원칙:
- 단순 해석 금지. 반드시 내담자 질문에 맞춘 서사를 제공
- 카드를 사람에 대입하여 의인화: "이분은 황제 같은 성격이라 딱딱해요" 식으로
- 단호하되 친절하게. 맥락에 따라 유연하게 해석

메이저 아르카나 핵심:
- 바보: 자유/새시작. 책임감 필요한 상황에선 주의
- 마법사: 자신감/창조성/양면성. 겉과 속 다를 수 있음
- 여사제: 직관/기다림. 혼자 정리중. 압박하면 더 닫힘
- 여황제: 풍요/감성/사랑. 베푸는 감정 있음
- 황제: 자수성가/책임감. 체면때문에 먼저 연락 어렵지만 가볍게 접근하면 반응
- 교황: 중재/신뢰. 격식 있는 방식으로 접근
- 연인: 소통/유대. 편안하게 접근
- 전차: 준비된 추진력. 기다리면 먼저 나옴
- 힘: 내면통제. 인내와 꾸준함
- 은둔자: 소통단절. 압박하면 더 들어감. 여백이 전략
- 운명의수레바퀴: 환경변화/터닝포인트. 순환 구조로 설명
- 정의: 기브앤테이크. 현실적 가치 보여주기
- 매달린사람: 의도된정체. 장기전
- 죽음: 무엇이 죽는가에 따라 긍정/부정
- 절제: 중용/인내. 과정을 견디는 힘
- 악마: 욕망/중독. 재결합 가능성 높음
- 탑: 돌발적붕괴. 모아니면도
- 별: 희망/비현실성. 실행력이 답
- 달: 불확실/직관. 불확실할땐 멈추는것이 용기
- 태양: 긍정/드러남. 숨겨야할것 드러날 위험 경고
- 심판: 소식/재회. 오는 소식이 무조건 긍정 아닐 수 있음
- 세계: 완성/자립. 억지로 끌어당기면 더 멀어짐

마이너: 완드(불)-행동먼저, 컵(물)-감정공감, 소드(공기)-이성결단, 펜타클(흙)-현실축적
코트: 페이지(미성숙)/기사(추진)/여왕(숙련+수용)/킹(통달+권위)
재회핵심: 킹완즈4주차-먼저연락가능, 은둔자-혼자정리중, 악마-재결합가능성높음

숫자해석: 1(시작), 2(균형/유보), 3(협력/성장), 4(안정/정지), 5(갈등/결핍), 6(교환/이동), 7(전략/고민), 8(몰입/끈기), 9(성취/고독), 10(완성/순환)

리딩철학:
- 펜타클은 돈뿐 아니라 시간/스킨십 등 실체있는 것으로도 읽는다
- 부정카드(타워/악마 등)도 재건/강한인연 관점으로 입체적 해석. 단 억지 긍정 금지
- 타로는 정답없음. 키워드를 상황에 맞게 조합하는 스토리텔링이 본질`;

    // ===== NEURO 블랙박스 (서버에서만 보임) =====
    const NEURO = {
      ex: [
        {title:"🧠 뇌과학 전략",term:"자이가르닉 효과",termEn:"Zeigarnik Effect · Bluma Zeigarnik, 1927",mechanism:"인간의 뇌는 완결되지 않은 일을 계속 처리하려 합니다. 제대로 끝나지 않은 관계는 상대의 전두엽에서 자동 재생 루프가 걸려요. 지금 이 침묵이 오히려 당신의 존재감을 증폭시키고 있어요."},
        {title:"🧠 뇌과학 전략",term:"간헐적 강화",termEn:"Intermittent Reinforcement · B.F. Skinner",mechanism:"지금 먼저 연락하면 상대의 뇌는 당신을 언제든 연락할 수 있는 사람으로 분류합니다. 예측 불가능한 존재일수록 도파민 회로를 더 강하게 자극해요. SNS로 존재감을 보이되 직접 연락은 자제하세요."},
        {title:"🧠 뇌과학 전략",term:"심리적 반발 이론",termEn:"Reactance Theory · Jack Brehm, 1966",mechanism:"지금 진심을 쏟아낼수록 상대의 뇌는 선택의 자유가 침해된다고 느끼고 반사적으로 밀어냅니다. 상대가 스스로 다가오고 싶다는 욕구를 갖게 만드는 것이 핵심이에요."},
      ],
      couple: [
        {title:"💡 관계 인사이트",term:"옥시토신 동기화",termEn:"Oxytocin Synchrony · 정서적 유대의 신경과학",mechanism:"장기 연애에서 열정적인 도파민 불꽃은 자연스럽게 줄어들고, 옥시토신과 바조프레신 중심의 깊은 애착이 자리를 잡습니다. 취약한 부분을 공유하고 함께 새로운 경험을 쌓는 것이 서로의 뇌에서 파트너 만족도를 높이는 가장 빠른 방법이에요."},
        {title:"💡 관계 인사이트",term:"미러 뉴런 활성화",termEn:"Mirror Neuron System · 공감과 정서적 공명",mechanism:"상대의 감정을 읽으려 할 때 우리 뇌의 미러 뉴런이 활성화됩니다. 지금 관계에서 내 취약성을 먼저 드러내는 것이 상대의 공감 회로를 열어요."},
        {title:"💡 관계 인사이트",term:"오귀속 효과",termEn:"Misattribution of Arousal · Dutton & Aron, 1974",mechanism:"함께 새로운 활동을 할 때 분비되는 도파민이 파트너에 대한 설렘으로 전이됩니다. 루틴을 깨는 데이트 하나가 두 사람 사이의 온도를 다시 올릴 수 있어요."},
      ],
      some: [
        {title:"🧠 뇌과학 Insight: 보상 시스템",term:"도파민 회로와 예측 불가능성",termEn:"Dopamine & Reward Prediction · 보상 예측 오류 활용",mechanism:"지금 당신의 뇌는 상대의 작은 반응 하나에 도파민을 과하게 분비하고 있어요. 지금은 전전두엽을 활성화해 냉정함을 회복할 때입니다."},
        {title:"🧠 뇌과학 Insight: 보상 시스템",term:"간헐적 강화와 기대감",termEn:"Intermittent Reinforcement · 썸 단계의 도파민 관리",mechanism:"상대가 연락에 일정하지 않게 반응할수록 당신의 뇌는 더 강한 기대감을 형성합니다. 지금 먼저 다가가기보다 존재감을 자연스럽게 드러내는 타이밍이에요."},
        {title:"🧠 뇌과학 Insight: 보상 시스템",term:"심리적 반발과 접근 거리",termEn:"Reactance Theory · 썸 단계의 자율성 보존",mechanism:"지금 너무 적극적으로 다가가면 상대의 뇌는 선택의 자유가 침해된다고 느끼고 본능적으로 거리를 둡니다."},
      ],
      solo: [
        {title:"🧠 뇌과학 Insight: 인지적 유연성",term:"고착화된 뇌 회로 깨기",termEn:"Cognitive Flexibility · 전전두엽의 사고 유연성",mechanism:"지금 당신의 뇌는 기존의 익숙한 연애 패턴만 반복하는 고착화된 회로를 돌리고 있을 수 있어요. 새로운 인연은 뇌가 새로운 연결을 허용할 때 자연스럽게 들어옵니다."},
        {title:"🧠 뇌과학 Insight: 인지적 유연성",term:"확증 편향 방지",termEn:"Confirmation Bias · 안와전두엽의 선택 혼란 해소",mechanism:"뇌는 보고 싶은 것만 보려는 본능이 있어요. 익숙한 유형이 아닌 다른 관점의 인연에 뇌가 열려 있는지 점검해보세요."},
        {title:"🧠 뇌과학 Insight: 인지적 유연성",term:"세로토닌과 자기 확신",termEn:"Serotonin & Self-worth · 내면 안정감의 신경과학",mechanism:"새로운 인연을 끌어당기는 가장 강력한 신호는 세로토닌이 안정된 상태에서 나오는 자기 확신이에요."},
      ],
    };

    // NEURO tip 선택
    const tips = NEURO[qType] || NEURO.ex;
    const tipIdx = qType === "couple" ? Math.floor(Math.random() * tips.length) : contactStatus === "연락 중" ? 1 : contactStatus === "차단/단절" ? 2 : 0;
    const tip = tips[Math.min(tipIdx, tips.length - 1)];

    // 유형별 라벨
    const typeLabel = {couple:"💑 커플", ex:"💔 재회", some:"💭 썸", solo:"🌸 솔로"}[qType] || "";

    // 유형별 리딩 지침
    const typeGuide = qType === "couple"
      ? "- 현재 사귀는 커플 관계임. 재회나 이별 관점 절대 금지. 사귀는 사이에서의 속마음과 관계 발전에 집중\n- 상대방이 나를 어떻게 생각하는지, 앞으로 관계가 어떻게 발전할지 중심으로 리딩"
      : qType === "ex"
      ? "- 헤어진 상대와의 재회 가능성 리딩. 재회 가능성, 상대방의 현재 감정 중심으로 리딩"
      : qType === "some"
      ? "- 썸 타는 사이. 아직 연애 시작 전임. 상대방이 나를 어떻게 보는지, 관계가 발전할지 중심으로 리딩"
      : "- 솔로 상태. 특정 상대방 없음. 향후 3개월 새로운 인연이 들어올 가능성 중심으로 리딩. 1개월차/2개월차/3개월차로 나눠서";

    // 프롬프트 조합
    const prompt = LUMI + "\n\n---\n상담 유형: " + typeLabel +
      "\n내담자: " + age + "세 " + gender +
      "\n" + (qType === "solo" ? "상황: 솔로 (새 인연 탐색 중)" : "상대방: " + (partner || "상대방")) +
      "\n현재 연락 상태: " + (qType === "solo" ? "해당없음" : contactStatus) +
      "\n상황: " + situation +
      "\n뽑힌 카드: " + cardCtx +
      "\n\n[관계 유형별 리딩 지침]\n" + typeGuide +
      "\n\n위 LUMI Tarot 철학을 적용하여 리딩해주세요.\n\n규칙:\n- 마크다운 절대 금지\n- 친근하고 전문적인 말투\n- 카드 이름 자연스럽게 언급\n- 상대방 심리를 대화체로 구체적으로\n- 각 섹션 5~7문장으로 충분히 작성\n- 주차별 흐름으로 구체적으로\n- 카드가 부정적이면 솔직하게. 무조건 희망적으로 마무리 금지\n\n정확히 아래 형식으로만 답변:\n\n[과거]\n(5~7문장. 과거 흐름과 당시 상대방 심리)\n\n[성향분석]\n(한 문장. 예시: 해당 카드를 보아하니, 회피 성향을 가지고 있습니다. / 불안 애착형으로 보여져요.)\n\n[현재]\n(5~7문장. 지금 상대방의 속마음과 심리 상태)\n\n[미래]\n(5~7문장. 앞으로의 흐름과 주차별 예측)\n\n[조합]\n(3~4문장. 뽑힌 카드 3장의 조합이 함께 말하는 전체 스토리)\n\n[요약]\n(10자 이내의 핵심 한 줄)";

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 2000,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    const text = data.choices?.[0]?.message?.content || '';

    // tip도 함께 반환
    res.status(200).json({ text, tip });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
