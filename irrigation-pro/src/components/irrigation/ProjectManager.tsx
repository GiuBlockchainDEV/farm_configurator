import { useProjectStore } from '@/stores/projectStore'
import { useEffect } from 'react'

export function ProjectManager() {
  const { projects, currentProjectId, createProject, setCurrentProject, loadFromIndexedDb } = useProjectStore()

  useEffect(() => {
    loadFromIndexedDb()
  }, [loadFromIndexedDb])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <button className="px-3 py-1.5 rounded-md bg-primary text-white" onClick={() => createProject()}>New Project</button>
      </div>
      <ul className="divide-y divide-slate-200 dark:divide-slate-800">
        {projects.map(p => (
          <li key={p.id} className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-slate-500">{p.updatedAt.toLocaleString()}</div>
            </div>
            <button
              className={`px-2 py-1 rounded border text-sm ${currentProjectId === p.id ? 'bg-primary text-white border-primary' : ''}`}
              onClick={() => setCurrentProject(p.id)}
            >
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

