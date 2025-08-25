import { calculateIrr } from '@/utils/economics'

export function CostAnalyzer() {
  const irr = calculateIrr([-10000, 2000, 3000, 4000, 5000])
  return (
    <div className="text-sm">Example IRR: {Number.isFinite(irr) ? (irr * 100).toFixed(2) + '%' : 'n/a'}</div>
  )
}

