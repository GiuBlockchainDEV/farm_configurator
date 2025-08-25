export type IRComponentCategory = 'pipe' | 'emitter' | 'pump' | 'filter' | 'valve' | 'fertilizer'

export type IRComponent = {
  id: string
  category: IRComponentCategory
  name: string
  specs: Record<string, number | string>
  priceUsd?: number
}

