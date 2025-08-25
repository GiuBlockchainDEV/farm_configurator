import axios from 'axios'
import type { ChatMessage } from '@/stores/geminiStore'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-flash'

export async function sendGeminiMessage(history: ChatMessage[], apiKeyOverride?: string): Promise<string> {
  const apiKey = apiKeyOverride || GEMINI_API_KEY
  if (!apiKey) return 'Gemini API key not configured. Add it in Settings.'

  // Minimal placeholder using Google Generative Language API-compatible endpoint via proxy or direct
  try {
    const userText = history.filter(h => h.role === 'user').slice(-1)[0]?.content || ''
    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: userText }]
          }
        ]
      },
      { timeout: 15000 }
    )
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text
    return text ?? 'No response from Gemini.'
  } catch (err: any) {
    return `Gemini error: ${err?.response?.data?.error?.message || err.message}`
  }
}

