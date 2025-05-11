import { getAIKey } from '@/utils/file'
import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import { GoogleGenAI } from "@google/genai";

type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const getApiParams = (prompt: string): Message[] => {
  return [
    {
      role: 'user',
      content: 'You are a professional HR consultant who specializes in performance review analysis. If reviewee is not manager, please skip manager\'s question. When evaluating performance, if no outstanding achievements or major issues are noted, please give a neutral score of 3 out of 5 to represent meeting basic expectations. Please be objective and fair in your assessment. Please respond in English.'
    },
    {
      role: 'user',
      content: prompt
    }
  ]
}

export const getClaudeReview = async (prompt: string): Promise<string>  => {
  const apiKey = await getAIKey('claudeAi')
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set')
  }

  const messages = getApiParams(prompt)
  const anthropic = new Anthropic({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  })
  
  const msg = await anthropic.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 1024,
    // @ts-expect-error Anthropic SDK types are not fully compatible
    messages: messages,
  })

  // @ts-expect-error Anthropic SDK types are not fully compatible
  const text = msg?.content?.[0]?.text
  if (!text) {
    throw new Error('Invalid response format')
  }
  return text
}

export const getOpenAIReview = async(prompt: string): Promise<string> => {
  const apiKey = await getAIKey('openAi')
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set')
  }

  const messages = getApiParams(prompt)
  const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages,
    max_tokens: 1024,
    temperature: 0.7
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error('Invalid response format')
  }
  return content
}

export const getGeminiAIReview = async(prompt: string): Promise<string> => {
  const apiKey = await getAIKey('geminiAi')
  if (!apiKey) {
    throw new Error('GEMINI_AI_API_KEY is not set')
  }
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a professional HR consultant who specializes in performance review analysis. If reviewee is not manager, please skip manager\'s question. When evaluating performance, if no outstanding achievements or major issues are noted, please give a neutral score of 3 out of 5 to represent meeting basic expectations. Please be objective and fair in your assessment. Please respond in English.',
      },
    });
    console.log(response.text);
    const content = response.text
    if (!content) {
      throw new Error('Invalid response format')
    }
    return content
}
