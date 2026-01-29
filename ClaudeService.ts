import { FormData, AiSummary } from "./types";

export const generateSummary = async (formData: FormData): Promise<AiSummary> => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  // Debug logging
  console.log('[ClaudeService] Checking API key...');
  console.log('[ClaudeService] API key present:', !!apiKey);
  console.log('[ClaudeService] API key length:', apiKey?.length || 0);
  console.log('[ClaudeService] API key preview:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
  
  if (!apiKey) {
    console.error('[ClaudeService] No API key found! Make sure VITE_ANTHROPIC_API_KEY is set in .env and restart the dev server.');
    return {
      situationAnalysis: "We've received your information and are processing it.",
      mistake: "Our AI analysis tool is temporarily unavailable — but don't worry, your submission was captured.",
      nextStep: "Our team will review your details manually and reach out shortly. Thank you for your patience."
    };
  }

  try {
    console.log('[ClaudeService] Making API request to Claude...');
    // Detect if user provided substantive free-text input
    const hasDetailedContext = formData.anythingElse.trim().length > 50;
    
    // Add priority instructions when detailed context exists
    const contextPriorityInstructions = hasDetailedContext ? `
CRITICAL PRIORITY — USER'S OWN WORDS:
The user has provided detailed context in their own words below. This is the MOST IMPORTANT input and should heavily influence your response.
- Directly reference their specific interests, technologies, or solutions they mentioned (e.g., AI, chatbots, automation, specific tools)
- Validate their thinking — affirm that their ideas are valuable and forward-thinking
- Position Choquer as experienced and capable of delivering exactly what they've described
- Your response should feel like you truly heard what they wrote, not a generic template

User's Detailed Context:
"${formData.anythingElse}"

` : '';

    const prompt = `You are generating a strategic perspective for a prospective client reaching out to Choquer Agency, a senior-level web, SEO, CRO, and AI-forward marketing partner.

Context:
- The user has intentionally selected the services they believe will help them grow.
- Assume they are already thinking in the right direction.
- Your role is to reflect their situation clearly, validate their instincts, and elevate their thinking — not to correct or contradict them.
${contextPriorityInstructions}
Prospective Client Data:
Name: ${formData.fullName}
Company: ${formData.companyName} (${formData.companyUrl})
Services Selected: ${formData.lookingFor.join(", ")}
Current Website Status: ${formData.currentWebsite}
Team Situation: ${formData.teamSituation}
Traffic Reality: ${formData.trafficReality}
Desired Outcomes: ${formData.hopingFor.join(", ")}
${!hasDetailedContext && formData.anythingElse ? `Additional Context: ${formData.anythingElse}` : ''}

Instructions:
Generate a concise, high-confidence strategic summary in JSON format with exactly three fields.
${hasDetailedContext ? `
IMPORTANT: Since the user provided detailed context about their specific interests (like AI, chatbots, automation, etc.), your response MUST:
- Acknowledge their specific ideas in the situationAnalysis
- Validate their direction as forward-thinking in the mistake field
- Reference their stated goals when describing the next step
Do NOT give a generic response that ignores what they wrote.
` : ''}
Tone & Style Guidelines:
- Insightful, calm, and experienced
- Empathetic and validating
- No blame, no shaming, no "you did this wrong"
- Speak as a partner who has seen this pattern many times
- Treat website, SEO, CRO, and systems as interconnected — never isolated
${hasDetailedContext ? `- When the user mentions specific technologies (AI, chatbots, automation), affirm these are valuable and that Choquer specializes in building these solutions` : ''}

Required Fields:

1. situationAnalysis  
${hasDetailedContext ? `Acknowledge what the user specifically mentioned wanting (e.g., AI chatbots, automation) and connect it to their broader business situation. Start with something like:
"You're thinking about [their specific interest] — that instinct is right. Companies at your stage are often..."` : `Complete this sentence:
"Most companies in your position are dealing with [X], which usually points to [Y]."`}

Guidance:
- ${hasDetailedContext ? 'Reference their specific stated interests (AI, chatbots, tools, etc.)' : '[X] should reflect their current growth stage or constraint'}
- ${hasDetailedContext ? 'Validate their thinking as forward-looking and strategic' : '[Y] should connect to systems, clarity, or alignment — not surface-level fixes'}

2. mistake  
${hasDetailedContext ? `Validate their specific direction (e.g., AI, automation) while noting the common challenge of implementing it without a cohesive strategy. Example:
"AI and automation are absolutely the future — the challenge is building them into a system that scales, not as isolated tools."` : `Complete this sentence:
"What we often see at this stage is teams getting stuck in [common tension or tradeoff], even when they know what they want to improve."`}

Guidance:
- Frame this as a natural challenge, not an error
- Do NOT imply they chose the wrong services
- ${hasDetailedContext ? 'Affirm their specific technology interests as valuable' : 'Avoid language that separates design, SEO, or conversion'}

3. nextStep  
${hasDetailedContext ? `Connect their specific interests to Choquer's capability. Example:
"If that resonates, we'd love to explore how AI and automation fit into your bigger picture — that's exactly what we help build."` : `Complete this sentence:
"If that resonates, the next step isn't [tactical action] — it's clarity around [Choquer principle], so everything works together."`}

Guidance:
- The principle should align with Choquer's beliefs:
  - integrated systems
  - strategy before execution
  - senior-level thinking
  - clarity before scale
  ${hasDetailedContext ? '- AI, automation, and chatbots as part of modern infrastructure' : ''}
- This should naturally imply a conversation, not a pitch

Output Format:
Return valid JSON only, with no extra commentary.

IMPORTANT: Each field should be detailed and strategic - aim for 250-350 characters per field. Provide substantive insights that demonstrate deep understanding of their situation.

Respond ONLY with valid JSON in this exact format: {"situationAnalysis": "...", "mistake": "...", "nextStep": "..."}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    console.log('[ClaudeService] Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[ClaudeService] API error:', response.status, errorData);
      throw new Error(`API request failed: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('[ClaudeService] Response received successfully');
    const text = data.content?.[0]?.text;
    
    if (!text) {
      console.error('[ClaudeService] No text in response:', data);
      throw new Error("No response from AI");
    }
    
    console.log('[ClaudeService] AI response text:', text);
    
    // Extract JSON from the response (in case there's extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not parse JSON from response");
    
    const parsed = JSON.parse(jsonMatch[0]) as AiSummary;
    
    // Truncate if needed to prevent excessive length
    const truncate = (str: string, maxLen: number) => str.length > maxLen ? str.substring(0, maxLen - 3) + '...' : str;
    
    return {
      situationAnalysis: truncate(parsed.situationAnalysis, 350),
      mistake: truncate(parsed.mistake, 350),
      nextStep: truncate(parsed.nextStep, 350),
    };
  } catch (error) {
    console.error("[ClaudeService] Error:", error);
    // User-friendly error message when AI fails
    return {
      situationAnalysis: "We've received your information and are processing it.",
      mistake: "Our AI analysis tool is temporarily unavailable — but don't worry, your submission was captured.",
      nextStep: "Our team will review your details manually and reach out shortly. Thank you for your patience."
    };
  }
};
