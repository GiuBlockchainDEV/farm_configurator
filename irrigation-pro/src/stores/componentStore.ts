import { create } from 'zustand'
import type { IRComponent } from '@/types/components'
import { COMPONENTS } from '@/constants/components'

type ComponentStore = {
  components: IRComponent[]
}

export const useComponentStore = create<ComponentStore>(() => ({
  components: COMPONENTS,
}))

