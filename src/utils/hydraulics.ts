const GRAVITY = 9.80665

export function calculateDarcyWeisbachHeadLoss(lengthMeters: number, diameterMeters: number, velocityMs: number, roughnessMeters: number): number {
  // Swamee-Jain explicit equation for friction factor f
  const reynolds = (velocityMs * diameterMeters) / (1e-6) // assume nu ~1e-6 m^2/s for water at ~20C
  const relativeRoughness = roughnessMeters / diameterMeters
  const frictionFactor = 0.25 / Math.pow(Math.log10((relativeRoughness / 3.7) + (5.74 / Math.pow(reynolds, 0.9))), 2)
  const headLoss = frictionFactor * (lengthMeters / diameterMeters) * (Math.pow(velocityMs, 2) / (2 * GRAVITY))
  return headLoss
}

export function calculateHazenWilliamsHeadLoss(lengthMeters: number, diameterMeters: number, flowLps: number, c: number): number {
  // Hazen-Williams in SI: h_f = 10.67 * L * Q^1.852 / (C^1.852 * D^4.871)
  const Q = flowLps / 1000 // m3/s
  const D = diameterMeters // m
  const hf = 10.67 * lengthMeters * Math.pow(Q, 1.852) / (Math.pow(c, 1.852) * Math.pow(D, 4.871))
  return hf
}

export function calculateSystemCurve(points: { flowLps: number; baseHeadM: number }[], kLoss: number) {
  // returns head for flows including minor losses
  return points.map(p => ({ flowLps: p.flowLps, headM: p.baseHeadM + kLoss * Math.pow(p.flowLps, 2) }))
}

