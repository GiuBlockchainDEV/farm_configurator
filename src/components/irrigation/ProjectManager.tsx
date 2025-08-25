import { useProjectStore } from '@/stores/projectStore'
import { useEffect, useState } from 'react'

export function ProjectManager() {
  const { projects, currentProjectId, createProject, setCurrentProject, loadFromIndexedDb } = useProjectStore()
  const [renameId, setRenameId] = useState<string | undefined>(undefined)
  const [nameInput, setNameInput] = useState('')

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
          <li key={p.id} className="grid grid-cols-[1fr,auto] gap-3 items-center py-2">
            <div>
              {renameId === p.id ? (
                <div className="flex gap-2 items-center">
                  <input
                    defaultValue={p.name}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="rounded-md border px-2 py-1 text-sm"
                    autoFocus
                  />
                  <button
                    className="rounded border px-2 py-1 text-xs"
                    onClick={async () => {
                      const newName = (nameInput.trim() || p.name)
                      // lightweight rename by saving data with updatedAt and name via Dexie directly
                      // using store save is for data; here we assign name by simple async op
                      const now = new Date()
                      // optimistic UI update
                      useProjectStore.setState(state => ({
                        projects: state.projects.map(x => x.id === p.id ? { ...x, name: newName, updatedAt: now } : x)
                      }))
                      // persist
                      const { default: Dexie } = await import('dexie')
                      const db: any = new (class extends (Dexie as any) { projects: any; constructor(){ super('irrigationPro'); (this as any).version(1).stores({ projects: '&id, name, updatedAt' }); } })()
                      await db.projects.update(p.id, { name: newName, updatedAt: now })
                      setRenameId(undefined)
                    }}
                  >Save</button>
                  <button className="rounded border px-2 py-1 text-xs" onClick={() => setRenameId(undefined)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.updatedAt.toLocaleString()}</div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className={`px-2 py-1 rounded border text-xs ${currentProjectId === p.id ? 'bg-primary text-white border-primary' : ''}`} onClick={() => setCurrentProject(p.id)}>Open</button>
              <button className="px-2 py-1 rounded border text-xs" onClick={() => { setRenameId(p.id); setNameInput(p.name) }}>Rename</button>
              <button className="px-2 py-1 rounded border text-xs text-red-600 border-red-300" onClick={async () => {
                if (!confirm('Delete this project?')) return
                const { default: Dexie } = await import('dexie')
                const db: any = new (class extends (Dexie as any) { projects: any; constructor(){ super('irrigationPro'); (this as any).version(1).stores({ projects: '&id, name, updatedAt' }); } })()
                await db.projects.delete(p.id)
                useProjectStore.setState(state => ({ projects: state.projects.filter(x => x.id !== p.id), currentProjectId: state.currentProjectId === p.id ? undefined : state.currentProjectId }))
              }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

