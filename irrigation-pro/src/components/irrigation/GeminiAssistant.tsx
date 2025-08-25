import { useState } from 'react'
import { useGeminiStore } from '@/stores/geminiStore'

export function GeminiAssistant() {
  const { sendMessage, messages, isLoading } = useGeminiStore()
  const [input, setInput] = useState('')

  const onSend = async () => {
    if (!input.trim()) return
    await sendMessage(input)
    setInput('')
  }

  return (
    <div className="grid grid-rows-[1fr,auto] h-[520px] gap-3">
      <div className="overflow-auto space-y-3 border rounded p-3">
        {messages.map(m => (
          <div key={m.id} className={`text-sm ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block rounded px-2 py-1 ${m.role === 'user' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{m.content}</span>
          </div>
        ))}
        {isLoading && <div className="text-xs text-slate-500">Gemini is typing…</div>}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask the design assistant" className="flex-1 rounded border px-3 py-2" />
        <button disabled={isLoading} onClick={onSend} className="rounded bg-primary text-white px-3 py-2">Send</button>
      </div>
    </div>
  )
}

