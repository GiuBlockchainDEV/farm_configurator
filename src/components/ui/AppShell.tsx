import type { ReactNode } from 'react'
import { LayoutDashboard, Settings } from 'lucide-react'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh grid grid-rows-[auto,1fr] bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b bg-slate-900 text-white dark:bg-slate-900/90">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="size-5" />
            <span>Irrigation Pro</span>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
            <Settings className="size-4" />
            Settings
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl w-full p-4">
        {children}
      </main>
    </div>
  )
}

