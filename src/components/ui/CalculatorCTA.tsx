import Link from 'next/link'

interface CalculatorCTAProps {
  calculatorPath: string
  calculatorName: string
  description?: string
}

export function CalculatorCTA({
  calculatorPath,
  calculatorName,
  description = '직접 계산해보세요'
}: CalculatorCTAProps) {
  return (
    <div className="bg-slate-900 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-slate-400 text-xs mb-0.5">{description}</p>
          <h3 className="text-white font-bold text-base">{calculatorName}</h3>
        </div>
        <Link
          href={calculatorPath}
          className="inline-flex items-center gap-1.5 bg-white text-slate-900 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all shadow-md whitespace-nowrap"
        >
          계산하기
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
