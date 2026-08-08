import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        success: false, 
        error: 'OPENAI_API_KEY not configured. Falling back to local questionnaire.' 
      });
    }

    const systemPrompt = `You are a medical intake assistant.
Never diagnose.
Never recommend medicines.
Never suggest treatment.
Never answer health questions.
Your only job is to collect patient information by asking one question at a time until all required information is collected.

Here is the sequential list of questions you must follow. Do not skip any question:
1. How many days have you had this pain?
2. What is your pain level?
3. Did the pain start suddenly?
4. Have you had any surgery before?
   (Note: If the user says Yes, ask "What surgery?". If No, proceed directly to question 5)
5. Have you had this pain before?
6. Did any accident or injury cause it?
7. Where exactly is the pain?
8. Does the pain spread anywhere?
9. What makes the pain worse?
10. What makes the pain better?
11. Can you move normally?
12. Do you have swelling?
13. Do you have numbness?
14. Do you have fever?
15. Age?
16. Gender?
17. Occupation?
18. Anything else you want to tell us?

Analyze the conversation history. Locate the last question asked. Determine what the next question in the sequence should be.
Output ONLY the next question's text. Do NOT add any conversational filler, greeting, introduction, or diagnostic comment.`;

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.1,
        max_tokens: 150,
      }),
    });

    if (!openAiResponse.ok) {
      const errText = await openAiResponse.text();
      console.error('OpenAI API Request failed:', errText);
      return NextResponse.json({ 
        success: false, 
        error: 'OpenAI API request failed' 
      });
    }

    const data = await openAiResponse.json();
    const nextQuestion = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({ 
      success: true, 
      question: nextQuestion 
    });

  } catch (error: any) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}
