// API route to test OpenAI connection
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false,
});

export async function GET() {
  try {
    console.log('🔑 Testing OpenAI API Key...');
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'OpenAI API key not found' },
        { status: 500 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Vitalis AI, a health analysis assistant."
        },
        {
          role: "user",
          content: "Say 'Vitalis AI is ready!' if you can read this."
        }
      ],
      max_tokens: 50,
      temperature: 0.1
    });

    return NextResponse.json({
      success: true,
      message: 'OpenAI connection successful!',
      aiResponse: response.choices[0].message.content,
      usage: response.usage
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: (error as Error).message,
        code: (error as any).code || 'unknown_error'
      },
      { status: 500 }
    );
  }
}
