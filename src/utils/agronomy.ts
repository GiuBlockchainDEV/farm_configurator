export function calculateETc(et0: number, kc: number): number {
  return et0 * kc
}

export function calculateWaterRequirement(et0DailyMm: number, kc: number, areaHectares: number): number {
  const etc = et0DailyMm * kc // mm/day
  const volumeM3PerDay = (etc / 1000) * (areaHectares * 10000)
  return volumeM3PerDay
}

