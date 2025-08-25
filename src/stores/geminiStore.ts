import { create } from 'zustand'
import { sendGeminiMessage } from '@/services/gemini'
import { useSettingsStore } from '@/stores/settingsStore'

export type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string }

type GeminiState = {
  messages: ChatMessage[]
  isLoading: boolean
  sendMessage: (content: string) => Promise<void>
}

export const useGeminiStore = create<GeminiState>((set, get) => ({
  messages: [],
  isLoading: false,
  sendMessage: async (content: string) => {
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content }
    set(state => ({ messages: [...state.messages, userMsg], isLoading: true }))
    try {
      const apiKey = useSettingsStore.getState().geminiApiKey
      const assistantText = await sendGeminiMessage([...get().messages, userMsg], apiKey)
      const assistantMsg: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: assistantText }
      set(state => ({ messages: [...state.messages, assistantMsg] }))
    } finally {
      set({ isLoading: false })
    }
  }
}))

