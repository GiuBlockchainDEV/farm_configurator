import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UnitSystem = 'metric' | 'imperial'

type SettingsState = {
  geminiApiKey?: string
  unitSystem: UnitSystem
  setGeminiApiKey: (key?: string) => void
  setUnitSystem: (u: UnitSystem) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      geminiApiKey: undefined,
      unitSystem: 'metric',
      setGeminiApiKey: (key?: string) => set({ geminiApiKey: key }),
      setUnitSystem: (u) => set({ unitSystem: u }),
    }),
    { name: 'irrigation-settings' }
  )
)

