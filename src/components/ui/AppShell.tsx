import type { ReactNode } from 'react'
import { useState } from 'react'
import { LayoutDashboard, Settings } from 'lucide-react'
import { SettingsDialog } from '@/components/ui/SettingsDialog'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  return (
    <div className="min-h-dvh grid grid-rows-[auto,1fr] bg-surface text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur supports-backdrop-blur:bg-white/60 bg-white/70 dark:bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold tracking-[-0.01em]">
            <LayoutDashboard className="size-5 text-primary" />
            <span className="text-slate-900 dark:text-slate-100">Irrigation Pro</span>
          </div>
          <button onClick={() => setSettingsOpen(true)} className="inline-flex items-center gap-2 rounded-md border border-border bg-white/70 dark:bg-slate-800/60 px-3 py-1.5 text-sm hover:bg-white/90 transition-colors">
            <Settings className="size-4" />
            Settings
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl w-full p-4 sm:p-6">
        {children}
      </main>
      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}

