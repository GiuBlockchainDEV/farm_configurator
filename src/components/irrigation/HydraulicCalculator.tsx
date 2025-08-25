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
    // trigger recompute intentionally; values shown in cards below
    void calculateDarcyWeisbachHeadLoss(pipeLengthM, dM, vMs, roughness)
    void calculateHazenWilliamsHeadLoss(pipeLengthM, dM, vLps, cHW)
    // no alert; results are visible in cards below
  }

  const vLps = watch('flowLps') ?? 0
  const dMm = watch('diameterMm') ?? 1
  const dM = dMm / 1000
  const vMs = (vLps / 1000) / (Math.PI * (dM/2) ** 2)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm mb-1">Pipe length (m)</label>
        <input type="number" step="any" className="w-full rounded border px-3 py-2" {...register('pipeLengthM', { valueAsNumber: true })} />
        {errors.pipeLengthM && <p className="text-red-600 text-xs">{errors.pipeLengthM.message as string}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Diameter (mm)</label>
        <input type="number" step="any" className="w-full rounded border px-3 py-2" {...register('diameterMm', { valueAsNumber: true })} />
      </div>
      <div>
        <label className="block text-sm mb-1">Flow (L/s)</label>
        <input type="number" step="any" className="w-full rounded border px-3 py-2" {...register('flowLps', { valueAsNumber: true })} />
      </div>
      <div>
        <label className="block text-sm mb-1">Roughness (m)</label>
        <input type="number" step="any" className="w-full rounded border px-3 py-2" {...register('roughness', { valueAsNumber: true })} />
      </div>
      <div>
        <label className="block text-sm mb-1">Hazen-Williams C</label>
        <input type="number" step="any" className="w-full rounded border px-3 py-2" {...register('cHW', { valueAsNumber: true })} />
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-slate-900/60 dark:border-slate-800">
          <div className="text-xs text-slate-500">Velocity</div>
          <div className={`text-xl font-semibold ${vMs < 0.5 || vMs > 2 ? 'text-red-600' : 'text-emerald-600'}`}>{vMs.toFixed(3)} m/s</div>
          <div className="text-xs text-slate-500">Target 0.5–2 m/s</div>
        </div>
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-slate-900/60 dark:border-slate-800">
          <div className="text-xs text-slate-500">Darcy-Weisbach</div>
          <div className="text-xl font-semibold">{calculateDarcyWeisbachHeadLoss(watch('pipeLengthM')||0, dM, vMs, watch('roughness')||0).toFixed(2)} m</div>
        </div>
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-slate-900/60 dark:border-slate-800">
          <div className="text-xs text-slate-500">Hazen-Williams</div>
          <div className="text-xl font-semibold">{calculateHazenWilliamsHeadLoss(watch('pipeLengthM')||0, dM, vLps, watch('cHW')||1).toFixed(2)} m</div>
        </div>
      </div>

      <div className="lg:col-span-2 flex items-center justify-end">
        <button type="submit" className="rounded bg-primary text-white px-3 py-2">Compute</button>
      </div>
    </form>
  )
}

