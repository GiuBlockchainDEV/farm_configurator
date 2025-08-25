import { useState, useEffect } from 'react'
import { useSettingsStore } from '@/stores/settingsStore'

type SettingsDialogProps = {
  open: boolean
  onClose: () => void
}

export function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const { geminiApiKey, setGeminiApiKey, unitSystem, setUnitSystem } = useSettingsStore()
  const [keyInput, setKeyInput] = useState(geminiApiKey || '')

  useEffect(() => {
    setKeyInput(geminiApiKey || '')
  }, [geminiApiKey, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-lg dark:bg-slate-900 dark:border-slate-800">
        <h3 className="text-lg font-semibold mb-4">Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Gemini API Key</label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="V1..."
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm dark:bg-slate-800"
            />
            <p className="text-xs text-slate-500 mt-1">Stored locally. Used for AI assistant.</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit system</label>
            <div className="inline-flex rounded-lg border border-border overflow-hidden">
              <button
                className={`px-3 py-1.5 text-sm ${unitSystem === 'metric' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'}`}
                onClick={() => setUnitSystem('metric')}
              >
                Metric (SI)
              </button>
              <button
                className={`px-3 py-1.5 text-sm border-l border-border ${unitSystem === 'imperial' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'}`}
                onClick={() => setUnitSystem('imperial')}
              >
                Imperial
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md border border-border px-3 py-1.5 text-sm">Close</button>
          <button
            onClick={() => {
              setGeminiApiKey(keyInput.trim() || undefined)
              onClose()
            }}
            className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

