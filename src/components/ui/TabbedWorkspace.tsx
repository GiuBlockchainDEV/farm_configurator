import { useState } from 'react'
import { FolderKanban, Box, Gauge, Ruler, Bot, FileText, BadgeDollarSign } from 'lucide-react'
import { ProjectManager } from '@/components/irrigation/ProjectManager'
import { ComponentSelector } from '@/components/irrigation/ComponentSelector'
import { HydraulicCalculator } from '@/components/irrigation/HydraulicCalculator'
import { SystemDesigner } from '@/components/irrigation/SystemDesigner'
import { GeminiAssistant } from '@/components/irrigation/GeminiAssistant'
import { ReportGenerator } from '@/components/irrigation/ReportGenerator'
import { CostAnalyzer } from '@/components/irrigation/CostAnalyzer'

type TabKey = 'projects' | 'components' | 'hydraulics' | 'designer' | 'assistant' | 'reports' | 'costs'

const TABS: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'projects', label: 'Projects', icon: FolderKanban },
  { key: 'components', label: 'Components', icon: Box },
  { key: 'hydraulics', label: 'Hydraulics', icon: Gauge },
  { key: 'designer', label: 'Designer', icon: Ruler },
  { key: 'assistant', label: 'Assistant', icon: Bot },
  { key: 'reports', label: 'Reports', icon: FileText },
  { key: 'costs', label: 'Economics', icon: BadgeDollarSign },
]

export function TabbedWorkspace() {
  const [active, setActive] = useState<TabKey>('projects')

  return (
    <div className="flex flex-col gap-4">
      <nav className="inline-flex items-center rounded-xl border border-border bg-white/70 dark:bg-slate-900/40 backdrop-blur p-1 shadow-sm">
        {TABS.map(t => {
          const Icon = t.icon
          const isActive = active === t.key
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`group inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className={`size-4 ${isActive ? 'text-primary-foreground' : 'text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} />
              {t.label}
            </button>
          )
        })}
      </nav>
      <section className="rounded-2xl border border-border bg-surface shadow-sm p-4 sm:p-6 dark:bg-slate-900/60 dark:border-slate-800">
        {active === 'projects' && <ProjectManager />}
        {active === 'components' && <ComponentSelector />}
        {active === 'hydraulics' && <HydraulicCalculator />}
        {active === 'designer' && <SystemDesigner />}
        {active === 'assistant' && <GeminiAssistant />}
        {active === 'reports' && <ReportGenerator />}
        {active === 'costs' && <CostAnalyzer />}
      </section>
    </div>
  )
}

