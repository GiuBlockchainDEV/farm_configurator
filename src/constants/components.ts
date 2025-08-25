import type { IRComponent } from '@/types/components'

export const COMPONENTS: IRComponent[] = [
  { id: 'pipe-pe-63-10', category: 'pipe', name: 'PE Pipe 63mm PN10', specs: { diameter_mm: 63, pn: 10, roughness_m: 0.00015 }, priceUsd: 2.5 },
  { id: 'pipe-pvc-90-16', category: 'pipe', name: 'PVC Pipe 90mm PN16', specs: { diameter_mm: 90, pn: 16, roughness_m: 0.0001 }, priceUsd: 4.2 },
  { id: 'drip-emit-2l', category: 'emitter', name: 'Dripper 2 L/h', specs: { flow_lph: 2, pressure_bar: 1 }, priceUsd: 0.15 },
  { id: 'sprayer-60l', category: 'emitter', name: 'Micro-sprayer 60 L/h', specs: { flow_lph: 60, pressure_bar: 2 }, priceUsd: 0.7 },
  { id: 'pump-5hp', category: 'pump', name: 'Centrifugal Pump 5 HP', specs: { power_hp: 5, best_eff_point_m3h: 20, head_m: 35 }, priceUsd: 650 },
  { id: 'filter-disc-2in', category: 'filter', name: 'Disc Filter 2"', specs: { loss_bar: 0.2, flow_m3h: 25 }, priceUsd: 180 },
  { id: 'valve-sol-2in', category: 'valve', name: 'Solenoid Valve 2"', specs: { pressure_bar: 10 }, priceUsd: 95 },
  { id: 'fert-injector-venturi', category: 'fertilizer', name: 'Venturi Injector 1"', specs: { flow_m3h: 1.2 }, priceUsd: 40 },
]

