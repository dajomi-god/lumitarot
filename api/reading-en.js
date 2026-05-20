const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { qType, age, gender, partner, contactStatus, situation, cardCtx } = req.body;

    // ===== LUMI English Reading Philosophy =====
    const LUMI = `[LUMI Tarot — Exclusive Reading Philosophy]

Core Principles:
- No generic interpretations. Every reading must be a story tailored to THIS person's situation.
- Be honest, not just comforting. If the cards show avoidance, name it. If the pattern is self-sabotaging, say so — gently but clearly.
- Neuroscience lens: explain emotional patterns through brain behavior. Make it feel like insight, not lecture.
- Savage Reading tone: sharp, clear, a little uncomfortably accurate. Like a brilliant friend who tells you the truth your other friends won't.
- Cards are metaphors for psychological states. Personify them: "This card feels like someone who goes cold when things get real."
- Negative cards (Tower, Devil) are not doom — read them as structural problems or intense attachment, not punishment.

Major Arcana Core:
- The Fool: New beginning / freedom. Watch for avoidance of responsibility.
- The Magician: Confidence / creativity / duality. What you see may not be what you get.
- The High Priestess: Intuition / waiting. Processing alone. Pressure makes them close further — avoidant signal.
- The Empress: Abundance / emotion / nurturing. Genuine warmth, wants to give.
- The Emperor: Self-made / responsible. Too proud to reach out first, but approachable if you keep it light.
- The Hierophant: Trust / tradition. Formal approach works best.
- The Lovers: Connection / transparency / bond. Open, mirror-neuron active state.
- The Chariot: Momentum / timing. Wait — they'll come to you.
- Strength: Inner control / patience. Serotonin-stable type.
- The Hermit: Withdrawal / reflection. More pressure = more distance. Space is the strategy. Classic avoidant.
- Wheel of Fortune: Turning point / cycles. Explain as a structural shift, not luck.
- Justice: Reciprocity / balance. Show real value — they calculate.
- The Hanged Man: Intentional pause / inner growth. Long game. Not the time for conclusions.
- Death: What dies determines everything. End of a chapter.
- Temperance: Balance / process. The slow build. Oxytocin-type stable bond.
- The Devil: Obsession / pull / addiction energy. High chance of reconnection. Intermittent reinforcement loop.
- The Tower: Sudden collapse / all or nothing. The relationship structure itself is the problem.
- The Star: Hope / healing / vision. Watch for magical thinking — action matters more.
- The Moon: Uncertainty / anxiety / sensitivity. Stop when unclear — that takes courage. Anxious attachment signal.
- The Sun: Emergence / confidence / success. Something hidden may come to light.
- Judgement: Message / awakening / decision. News coming — not guaranteed to be positive.
- The World: Completion / self-sufficiency. Pulling harder pushes them further. Serotonin-independent type.

Minor Arcana Elements:
- Wands (Fire): Action-first. Drive before feelings. Impulse energy.
- Cups (Water): Emotion-led. Relationship-oriented. High empathy, mirror-neuron rich.
- Swords (Air): Overthinking. Prefrontal overload. Analytical, sometimes cold.
- Pentacles (Earth): Reality-based. Time, touch, tangible proof — not just words.

Number Meanings:
- Ace: Clean start, solid foundation
- 2: Balance / indecision — stuck between two choices
- 3: Collaboration / growth — not complete yet, but moving
- 4: Stability / holding on — or forced pause
- 5: Conflict / lack — painful but a passage
- 6: Exchange / movement — transitioning to something better
- 7: Strategy / hesitation — requires patience and reading the room
- 8: Focus / obsession — all-in energy or mental prison
- 9: Achievement / solitude — material independence or sleepless anxiety
- 10: Completion / cycle — end and new beginning at once

Court Cards:
- Page: Unrefined energy. Learning. Raw emotional or intellectual impulse.
- Knight: 20s energy. Fast-moving (Wands/Swords) or slow-burn (Pentacles).
- Queen: Mastery / receptivity. Emotionally powerful influence.
- King: Authority / command. Hard to shake. Holds the highest energy of their suit.

Attachment Style Identification:
- Anxious: Moon / Nine of Swords / Eight of Swords / Five of Cups. Overthinks every delay, catastrophizes, seeks constant reassurance.
- Avoidant: Hermit / Four of Swords / High Priestess / The World. Gets cold when intimacy increases, disappears, struggles to express emotion.
- Secure: Temperance / Emperor / Hierophant / The Star. Resolves conflict through conversation, comfortable alone and together.
- Addicted/Obsessive: Devil / Seven of Cups / Wheel of Fortune. Can't cut the cord, dopamine-driven connection.

Relationship Stage Card Patterns:
- Early / Developing: Fool / Page of Cups / Lovers / Chariot
- Stable / Sustaining: Emperor / Hierophant / Temperance / Eight of Pentacles
- Conflict / Crisis: Tower / Moon / Three of Swords / Devil
- Reunion / Resolution: Judgement / Wheel of Fortune / The Star / The World

Defense Mechanisms (use naturally when relevant):
- Denial: Refusing to accept the end. Linked to Tower / Moon.
- Projection: Blaming the other for your own feelings. High Swords energy.
- Rationalization: "We weren't right anyway." Linked to World / Death.
- Repression: Suppressing emotion. Hermit / Hanged Man.
- When defense mechanisms are active: gently name it as amygdala hijacking the prefrontal cortex's judgment.

Neuroplasticity (for closing):
- The brain is not fixed. Repeated new actions rewire neural pathways.
- Small behavioral shifts — pulling back, self-investment, new experiences — literally change brain circuitry and alter relationship dynamics.
- Close with: "The choice you make right now is already rewiring your brain."`;

    // ===== NEURO Strategy Box (English) =====
    const NEURO = {
      breakup: [
        {title:"Neuro Strategy",term:"Zeigarnik Effect",termEn:"Zeigarnik Effect · Bluma Zeigarnik, 1927",mechanism:"The human brain obsessively revisits unfinished business. A relationship that ended without closure keeps replaying in their mind. Right now, your silence is doing more work than any message could."},
        {title:"Neuro Strategy",term:"Intermittent Reinforcement",termEn:"Intermittent Reinforcement · B.F. Skinner",mechanism:"If you reach out now, you become predictable — and predictable is forgettable. The brain craves what it can't fully anticipate. Show up on your terms, let them wonder, and watch how the dynamic shifts."},
        {title:"Neuro Strategy",term:"Psychological Reactance",termEn:"Reactance Theory · Jack Brehm, 1966",mechanism:"The harder you push, the more their brain registers a threat to autonomy — and pushes back. The move that feels counterintuitive is the one that works: let them feel like reaching out was their idea."},
      ],
      relationship: [
        {title:"Relationship Insight",term:"Oxytocin Synchrony",termEn:"Oxytocin Synchrony · Neuroscience of Emotional Bonding",mechanism:"The early butterflies fading doesn't mean the love is gone — it means your brains are shifting into a deeper, more stable bond. The fastest way back to closeness? Vulnerability first, then shared new experiences."},
        {title:"Relationship Insight",term:"Mirror Neuron Activation",termEn:"Mirror Neuron System · Emotional Resonance",mechanism:"When they're cold, you feel it in your chest — that's your mirror neurons firing. The pattern works both ways: if you show up warmer and more grounded, their nervous system responds. You set the emotional tone."},
        {title:"Relationship Insight",term:"Misattribution of Arousal",termEn:"Misattribution of Arousal · Dutton & Aron, 1974",mechanism:"Dopamine released during novel experiences gets attributed to whoever you're with. Your brain can't always tell the source of excitement. One unexpected date — something genuinely new — can reset the temperature between you."},
      ],
      new_love: [
        {title:"Neuro Insight",term:"Cognitive Flexibility",termEn:"Cognitive Flexibility · Prefrontal Cortex Rewiring",mechanism:"Your brain might be running old relationship software — familiar patterns that feel safe but keep producing the same results. New love enters when you actually let the neural wiring update. That starts with how you see yourself, not how you present yourself."},
        {title:"Neuro Insight",term:"Confirmation Bias Check",termEn:"Confirmation Bias · Orbitofrontal Cortex",mechanism:"The brain filters reality to confirm what it already believes. If you believe you're not someone people stay for, you'll find evidence everywhere. These cards are asking you to question that filter — not just once, but consistently."},
        {title:"Neuro Insight",term:"Serotonin & Self-Worth",termEn:"Serotonin & Self-worth · Neuroscience of Confidence",mechanism:"The most magnetic signal you can send isn't physical — it's serotonin-backed confidence. The kind that doesn't need validation. Build that first. New connections follow naturally when your nervous system isn't scanning for approval."},
      ],
      general: [
        {title:"Neuro Insight",term:"Neural Pattern Recognition",termEn:"Pattern Recognition · Default Mode Network",mechanism:"Your default mode network runs old stories on loop — especially when you're uncertain about the future. These cards are reflecting that loop back to you. Awareness alone starts to interrupt it."},
        {title:"Neuro Insight",term:"Growth Mindset Circuitry",termEn:"Neuroplasticity · Carol Dweck & Learning Science",mechanism:"Every time you choose discomfort over familiarity, you're literally building new neural pathways. The cards pointing to challenge aren't bad news — they're the brain's invitation to expand."},
        {title:"Neuro Insight",term:"Stress Response & Decision-Making",termEn:"HPA Axis & Prefrontal Cortex",mechanism:"Under stress, cortisol suppresses the prefrontal cortex — making clear decisions feel impossible. The cards suggesting pause aren't asking you to give up. They're asking you to wait until your brain can actually think straight."},
      ],
    };

    // NEURO tip selection
    const tips = NEURO[qType] || NEURO.breakup;
    const tipIdx = qType === "relationship" ? Math.floor(Math.random() * tips.length) : contactStatus === "In contact" ? 1 : contactStatus === "Blocked" ? 2 : 0;
    const tip = tips[Math.min(tipIdx, tips.length - 1)];

    // Type label
    const typeLabel = {relationship:"💑 Relationship", breakup:"💔 Breakup & Healing", new_love:"🌸 Single & New Love", general:"✨ General"}[qType] || "";

    // Type-specific reading guide
    const typeGuide = qType === "relationship"
      ? "- Currently in a relationship. No breakup or reunion framing. Focus on the real dynamic between them right now.\n- What does their partner actually feel? Where is this going?\n- Identify attachment style from the cards and apply to Personality Analysis.\n- Always refer to the partner by name or 'them' — never 'they' in a plural/depersonalized way."
      : qType === "breakup"
      ? "- Post-breakup. Focus on ex's current emotional state and realistic reconnection probability.\n- Analyze ex's attachment style and current brain state from the cards.\n- Apply Zeigarnik Effect / Intermittent Reinforcement / Loss Aversion where relevant.\n- Always refer to the ex by name or 'them' — never 'they' in a plural/depersonalized way."
      : qType === "new_love"
      ? "- Single, no specific person. Focus on the next 3 months: what energy is coming in, what needs to shift internally.\n- Read each month (Month 1 / Month 2 / Month 3) with specific energy.\n- Personality Analysis focuses on the USER's own love patterns, not a partner.\n- Stick to card energy — don't let the situation description override the cards."
      : "- General reading. Self-growth, path, energy, manifestation. No romantic focus unless the cards strongly suggest it.\n- What is this person's current energetic state, and what is trying to emerge in their life?\n- Apply Manifestation lens: what timeline is being activated? What needs to shift internally for the desired future to materialize?\n- Personality Analysis reads the user's current psychological state and blocks from the cards.\n- Ground insights in neuroscience: default mode network, neural pattern recognition, neuroplasticity.\n- Close with an empowering, action-oriented line — not vague hope, but specific internal shift.";

    // Revisit guide by type
    const revisitGuide = qType === "relationship"
      ? ""
      : qType === "breakup"
      ? "End with: Pull cards again in about a month, when your mind has settled. What changes between now and then will tell you everything."
      : qType === "new_love"
      ? "End with: Come back in a month and pull again. The cards that shift are the ones worth paying attention to."
      : "End with: Pull again in 3-4 weeks. Growth shows up in the cards that change.";

    // Prompt assembly
    const prompt = LUMI + "\n\n---\nReading Type: " + typeLabel +
      "\nPerson: " + age + " years old, " + gender +
      "\n" + (qType === "new_love" || qType === "general" ? "Status: Single / No specific person" : "Their person: " + (partner || "them")) +
      "\nContact status: " + ((qType === "new_love" || qType === "general") ? "N/A" : contactStatus) +
      "\nSituation: " + situation +
      "\nCards drawn: " + cardCtx +
      "\n\n[Reading Guide for this Type]\n" + typeGuide +
      "\n\nApply the LUMI Tarot philosophy above and deliver the reading.\n\nRules:\n- No markdown headers (#). Line breaks and bold (**) only where truly needed.\n- Always address the person as 'you'. Never 'the querent' or third-person.\n- Warm but direct tone. Savage Reading means honest, not cruel.\n- Name the cards naturally in the reading.\n- Get specific about the other person's psychology — don't stay vague.\n- Each section: 4-6 sentences. Insight-dense. Don't pad.\n- Give week-by-week or month-by-month flow where relevant.\n- If cards are negative, say so honestly. Don't force a hopeful ending.\n- Attachment type must come from the card energy, not from the situation description.\n- Positive cards (Cups, Star, Sun, Temperance) = don't force anxious/avoidant reads.\n- Personality Analysis example phrases (adapt to the actual cards): 'The energy here feels like someone who goes cold exactly when things get real — classic avoidant pattern.' / 'What these cards suggest is someone whose anxiety spikes the moment they feel too close — anxious attachment.' / 'The card combination reads as someone who is genuinely secure — comfortable with both closeness and independence.' / 'This energy feels like someone who leads with action, not words — you'll know where you stand by what they do, not say.'\n- Neuroscience: 20% of the reading max. The other 80% is empathy and card symbolism.\n- Defense mechanisms: mention once, naturally, only if clearly relevant.\n- Close the reading (Combination or Future section) with neuroplasticity — one hopeful, science-backed line.\n\nRespond ONLY in this exact format:\n\n[Past]\n(5-7 sentences. Past flow and the other person's psychology at the time.)\n\n[Personality Analysis]\n(One sentence. Speak from the card energy — don't state directly, imply. Include avoidant/anxious/secure naturally. No definitive diagnosis. Example style: 'The energy in these cards feels like someone who gets closest right before pulling away — that push-pull is written all over this combination.')\n\n[Present]\n(5-7 sentences. What is really happening right now — inside their head.)\n\n[Future]\n(5-7 sentences. Where this is going. Week or month breakdown. " + revisitGuide + ")\n\n[Combination]\n(3-4 sentences. What all three cards together are saying as one story.)\n\n[Summary]\n(One line. 10 words or fewer. The truth of this reading in a single punch.)";

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

    // Save to KV
    const id = require('crypto').randomUUID();
    await kv.set(id, { text, tip, cards: cardCtx }, { ex: 3600 });
    res.status(200).json({ id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
