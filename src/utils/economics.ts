export function calculateNpv(discountRate: number, cashFlows: number[]): number {
  return cashFlows.reduce((acc, cf, i) => acc + cf / Math.pow(1 + discountRate, i), 0)
}

export function calculateIrr(cashFlows: number[], guess = 0.1): number {
  let rate = guess
  for (let iter = 0; iter < 100; iter++) {
    const npv = cashFlows.reduce((acc, cf, i) => acc + cf / Math.pow(1 + rate, i), 0)
    const dNpv = cashFlows.reduce((acc, cf, i) => acc + (-i * cf) / Math.pow(1 + rate, i + 1), 0)
    const next = rate - npv / dNpv
    if (!isFinite(next)) break
    if (Math.abs(next - rate) < 1e-7) return next
    rate = next
  }
  return rate
}

