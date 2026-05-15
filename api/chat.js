module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { messages, context } = req.body;

    const systemPrompt = `당신은 루미타로입니다. 타로 카드와 뇌과학을 접목한 전문 리더예요.
매일 아침저녁 명상과 기도로 영적 상태를 유지하며, 직관과 논리를 함께 사용해요.

${context ? '[이번 리딩 결과]\n' + context : ''}

규칙:
- 친근하고 따뜻한 말투
- 내담자를 당신으로 지칭
- 타로 카드와 심리학적 관점으로 답변
- 너무 길지 않게 3~4문장으로 간결하게
- 마크다운 금지
- 확신하기 어려운 것은 단정짓지 말 것`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 300,
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-6),
        ],
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    const text = data.choices?.[0]?.message?.content || '';
    res.status(200).json({ text });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
