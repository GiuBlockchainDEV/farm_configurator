import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { calculateDarcyWeisbachHeadLoss, calculateHazenWilliamsHeadLoss } from '@/utils/hydraulics'

const schema = z.object({
  pipeLengthM: z.number().positive(),
  diameterMm: z.number().positive(),
  flowLps: z.number().positive(),
  roughness: z.number().positive(),
  cHW: z.number().positive()
})

type FormValues = z.infer<typeof schema>

export function HydraulicCalculator() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { pipeLengthM: 100, diameterMm: 63, flowLps: 1, roughness: 0.00015, cHW: 140 },
    mode: 'onChange'
  })

  const onSubmit = (data: FormValues) => {
    const { pipeLengthM, diameterMm, flowLps, roughness, cHW } = data
    const vLps = flowLps
    const dM = diameterMm / 1000
    const vMs = (vLps / 1000) / (Math.PI * (dM/2) ** 2)
    const headDw = calculateDarcyWeisbachHeadLoss(pipeLengthM, dM, vMs, roughness)
    const headHw = calculateHazenWilliamsHeadLoss(pipeLengthM, dM, vLps, cHW)
    alert(`Velocity: ${vMs.toFixed(3)} m/s\nDarcy-Weisbach: ${headDw.toFixed(2)} m\nHazen-Williams: ${headHw.toFixed(2)} m`)
  }

  const vLps = watch('flowLps') ?? 0
  const dMm = watch('diameterMm') ?? 1
  const dM = dMm / 1000
  const vMs = (vLps / 1000) / (Math.PI * (dM/2) ** 2)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 max-w-2xl">
      <div>
        <label className="block text-sm">Pipe length (m)</label>
        <input type="number" step="any" className="w-full rounded border px-3 py-2" {...register('pipeLengthM', { valueAsNumber: true })} />
        {errors.pipeLengthM && <p className="text-red-600 text-xs">{errors.pipeLengthM.message as string}</p>}
      </div>
      <div>
        <label className="block text-sm">Diameter (mm)</label>
        <input type="number" step="any" className="w-full rounded border px-3 py-2" {...register('diameterMm', { valueAsNumber: true })} />
      </div>
      <div>
        <label className="block text-sm">Flow (L/s)</label>
        <input type="number" step="any" className="w-full rounded border px-3 py-2" {...register('flowLps', { valueAsNumber: true })} />
      </div>
      <div>
        <label className="block text-sm">Roughness (m)</label>
        <input type="number" step="any" className="w-full rounded border px-3 py-2" {...register('roughness', { valueAsNumber: true })} />
      </div>
      <div>
        <label className="block text-sm">Hazen-Williams C</label>
        <input type="number" step="any" className="w-full rounded border px-3 py-2" {...register('cHW', { valueAsNumber: true })} />
      </div>

      <div className="col-span-2 flex items-center justify-between">
        <div className="text-sm text-slate-600">Velocity: <span className={vMs < 0.5 || vMs > 2 ? 'text-red-600' : 'text-green-600'}>{vMs.toFixed(3)} m/s</span> (target 0.5–2 m/s)</div>
        <button type="submit" className="rounded bg-primary text-white px-3 py-1.5">Compute</button>
      </div>
    </form>
  )
}

