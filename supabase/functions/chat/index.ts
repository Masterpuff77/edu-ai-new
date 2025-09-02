import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import OpenAI from 'npm:openai@4.28.0';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface UserProfile {
  subjects?: string[];
  level?: number;
  examType?: string;
  grade?: number;
}

interface LessonContext {
  title?: string;
  subject?: string;
}

interface ChatRequest {
  question: string;
  context?: ChatMessage[];
  userProfile?: UserProfile;
  lessonContext?: LessonContext;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Check if OpenAI API key is configured
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ 
          error: 'Serviciul de chat AI nu este configurat. Te rugăm să contactezi administratorul.' 
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const { question, context = [], userProfile, lessonContext } = await req.json() as ChatRequest;

    if (!question || question.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Întrebarea nu poate fi goală.' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        },
      );
    }

    // Build system prompt with user context and lesson context
    let systemPrompt = `You are an expert AI tutor for Romanian students. 
    Your responses should be:
    - Clear and concise
    - Appropriate for a student's level
    - In Romanian language
    - Include examples when helpful
    - Encourage critical thinking
    - Be supportive and encouraging
    - Maintain context from the ongoing conversation`;

    // Add lesson-specific context
    if (lessonContext) {
      if (lessonContext.title) {
        systemPrompt += `\n\nThe student is currently studying the lesson: "${lessonContext.title}".`;
      }
      if (lessonContext.subject) {
        const subjectNames: { [key: string]: string } = {
          matematica: 'Matematică',
          romana: 'Limba Română',
          fizica: 'Fizică',
          chimie: 'Chimie',
          biologie: 'Biologie',
          istorie: 'Istorie',
          geografie: 'Geografie',
          informatica: 'Informatică'
        };
        const subjectName = subjectNames[lessonContext.subject] || lessonContext.subject;
        systemPrompt += `\nThe current subject is: ${subjectName}.`;
      }
    }

    // Add user-specific context to system prompt
    if (userProfile) {
      if (userProfile.subjects && userProfile.subjects.length > 0) {
        const subjectNames = userProfile.subjects.map(subject => {
          const names: { [key: string]: string } = {
            matematica: 'Matematică',
            romana: 'Limba Română',
            fizica: 'Fizică',
            chimie: 'Chimie',
            biologie: 'Biologie',
            istorie: 'Istorie',
            geografie: 'Geografie',
            informatica: 'Informatică'
          };
          return names[subject] || subject;
        });
        systemPrompt += `\n\nThe student is studying: ${subjectNames.join(', ')}.`;
      }

      if (userProfile.examType) {
        const examName = userProfile.examType === 'evaluareNationala' 
          ? 'Evaluarea Națională' 
          : 'Bacalaureat';
        systemPrompt += `\nThe student is preparing for: ${examName}.`;
      }

      if (userProfile.grade) {
        systemPrompt += `\nThe student is in grade ${userProfile.grade}.`;
      }

      if (userProfile.level) {
        systemPrompt += `\nThe student's current learning level is ${userProfile.level}.`;
      }
    }

    systemPrompt += `\n\nMaintain context from previous messages in the conversation and provide helpful, educational responses that build upon the ongoing discussion. Reference previous parts of the conversation when relevant.`;

    // Prepare messages for OpenAI
    const messages: any[] = [
      { role: "system", content: systemPrompt }
    ];

    // Add conversation context (limit to last 15 messages to avoid token limits)
    const recentContext = context.slice(-15);
    messages.push(...recentContext);

    const completion = await openai.chat.completions.create({
      model: "gpt-5",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "text" }
    });

    const response = completion.choices[0].message.content;

    if (!response) {
      throw new Error('Nu am primit un răspuns valid de la serviciul AI');
    }

    return new Response(
      JSON.stringify({ response }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Chat function error:', error);
    
    let errorMessage = 'Ne pare rău, a apărut o eroare. Te rugăm să încerci din nou.';
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'Serviciul de chat AI nu este configurat corect.';
      } else if (error.message.includes('quota')) {
        errorMessage = 'Serviciul de chat AI a atins limita de utilizare.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Problemă de conectivitate. Te rugăm să încerci din nou.';
      }
    }
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});