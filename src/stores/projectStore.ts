import { create } from 'zustand'
import Dexie, { type Table } from 'dexie'

export type Project = {
  id: string
  name: string
  version: number
  data: unknown
  createdAt: Date
  updatedAt: Date
}

class ProjectDB extends Dexie {
  projects!: Table<Project, string>
  constructor() {
    super('irrigationPro')
    this.version(1).stores({ projects: '&id, name, updatedAt' })
  }
}

const db = new ProjectDB()

type ProjectStore = {
  projects: Project[]
  currentProjectId?: string
  createProject: () => void
  setCurrentProject: (id: string) => void
  saveProject: (id: string, data: unknown) => Promise<void>
  loadFromIndexedDb: () => Promise<void>
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  currentProjectId: undefined,
  createProject: () => {
    const id = crypto.randomUUID()
    const now = new Date()
    const project: Project = { id, name: `Project ${now.toLocaleString()}`, version: 1, data: {}, createdAt: now, updatedAt: now }
    set(state => ({ projects: [project, ...state.projects], currentProjectId: id }))
    db.projects.put(project)
  },
  setCurrentProject: (id: string) => set({ currentProjectId: id }),
  saveProject: async (id: string, data: unknown) => {
    const now = new Date()
    await db.projects.update(id, { data, updatedAt: now })
    set(state => ({ projects: state.projects.map(p => p.id === id ? { ...p, data, updatedAt: now } : p) }))
  },
  loadFromIndexedDb: async () => {
    const list = await db.projects.orderBy('updatedAt').reverse().toArray()
    set({ projects: list })
  }
}))

