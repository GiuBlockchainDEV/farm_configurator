import { useComponentStore } from '@/stores/componentStore'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useProjectStore } from '@/stores/projectStore'

export function ComponentSelector() {
  const { components } = useComponentStore()
  const [query, setQuery] = useState('')
  const { currentProjectId, saveProject } = useProjectStore()

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return components.filter(c => `${c.category} ${c.name}`.toLowerCase().includes(q))
  }, [components, query])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search components" className="w-full rounded-md border px-3 py-2" />
        <button className="rounded-md border px-3">AI Search</button>
      </div>
      <div className="h-[420px] overflow-auto border rounded-md divide-y">
        {filtered.map(c => (
          <div key={c.id} className="p-3 text-sm flex items-center justify-between">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-slate-500">{c.category}</div>
            </div>
            <button
              className="px-2 py-1 rounded border text-xs"
              onClick={async () => {
                if (!currentProjectId) {
                  toast.error('Open or create a project first')
                  return
                }
                // Append component to project data array
                await saveProject(currentProjectId, { add: { componentId: c.id, at: Date.now() } })
                toast.success('Added to project')
              }}
            >Add</button>
          </div>
        ))}
      </div>
    </div>
  )
}

