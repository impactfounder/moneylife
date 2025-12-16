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
    <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-white/90 text-sm mb-1">{description}</p>
          <h3 className="text-white font-bold text-lg">{calculatorName}</h3>
        </div>
        <Link
          href={calculatorPath}
          className="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-50 transition-all shadow-md whitespace-nowrap"
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
