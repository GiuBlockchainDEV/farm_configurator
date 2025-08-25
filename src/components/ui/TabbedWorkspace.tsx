import { useState } from 'react'
import { ProjectManager } from '@/components/irrigation/ProjectManager'
import { ComponentSelector } from '@/components/irrigation/ComponentSelector'
import { HydraulicCalculator } from '@/components/irrigation/HydraulicCalculator'
import { SystemDesigner } from '@/components/irrigation/SystemDesigner'
import { GeminiAssistant } from '@/components/irrigation/GeminiAssistant'
import { ReportGenerator } from '@/components/irrigation/ReportGenerator'
import { CostAnalyzer } from '@/components/irrigation/CostAnalyzer'

type TabKey = 'projects' | 'components' | 'hydraulics' | 'designer' | 'assistant' | 'reports' | 'costs'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'projects', label: 'Projects' },
  { key: 'components', label: 'Components' },
  { key: 'hydraulics', label: 'Hydraulics' },
  { key: 'designer', label: 'System Designer' },
  { key: 'assistant', label: 'Gemini AI' },
  { key: 'reports', label: 'Reports' },
  { key: 'costs', label: 'Economics' },
]

export function TabbedWorkspace() {
  const [active, setActive] = useState<TabKey>('projects')

  return (
    <div className="flex flex-col gap-4">
      <nav className="flex flex-wrap gap-2">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`rounded-md px-3 py-1.5 text-sm border transition-colors ${
              active === t.key
                ? 'bg-primary text-white border-primary'
                : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <section className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
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

