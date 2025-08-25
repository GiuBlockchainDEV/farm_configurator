import './App.css'
import { AppShell } from '@/components/ui/AppShell'
import { TabbedWorkspace } from '@/components/ui/TabbedWorkspace'
import { Toaster } from 'sonner'

function App() {
  return (
    <AppShell>
      <TabbedWorkspace />
      <Toaster richColors closeButton />
    </AppShell>
  )
}

export default App
