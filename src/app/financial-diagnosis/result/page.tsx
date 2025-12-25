'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { formatNumber } from '@/lib/calculations'

interface DiagnosisData {
  age: number
  occupation: string
  monthlySalary: number
  savingsDeposit: number
  stockInvestment: number
  realEstate: number
  monthlySpending: number
  housingCost: number
  totalDebt: number
  debtInterestRate: number
}

interface DiagnosisResult {
  score: number
  grade: string
  gradeColor: string
  persona: string
  personaEmoji: string
  roast: string
  advice: string[]
  stats: {
    savingsRate: number
    debtToIncomeRatio: number
    netWorth: number
    monthsOfExpenses: number
  }
}

export default function FinancialDiagnosisResultPage() {
  const router = useRouter()
  const [data, setData] = useState<DiagnosisData | null>(null)
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('financialDiagnosisData')
    if (!stored) {
      router.push('/financial-diagnosis')
      return
    }

    const parsedData = JSON.parse(stored) as DiagnosisData
    setData(parsedData)

    // API 호출로 Gemini 분석
    const fetchDiagnosis = async () => {
      try {
        const response = await fetch('/api/diagnosis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsedData)
        })

        const data = await response.json()

        if (data.success) {
          setResult({
            ...data.result,
            stats: data.stats
          })
        } else {
          setError(data.error || '분석 중 오류가 발생했습니다.')
        }
      } catch (err) {
        console.error('Diagnosis fetch error:', err)
        setError('서버 연결에 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDiagnosis()
  }, [router])

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-6">😢</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              분석 중 오류가 발생했습니다
            </h2>
            <p className="text-slate-500 mb-6">{error}</p>
            <Link
              href="/financial-diagnosis"
              className="inline-block bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors"
            >
              다시 시도하기
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (isLoading || !result || !data) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-violet-200 border-t-violet-600 mb-6"></div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              AI가 분석 중입니다...
            </h2>
            <p className="text-slate-500">
              당신의 재무 상태를 냉정하게 평가하는 중
            </p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* 결과 히어로 */}
        <section className="relative pt-24 pb-12 lg:pt-32 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              {/* 페르소나 */}
              <div className="text-6xl mb-4">{result.personaEmoji}</div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                당신은 <span className="text-violet-600">{result.persona}</span>
              </h1>

              {/* 점수 */}
              <div className="my-8">
                <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-6 shadow-xl border border-slate-100">
                  <div className="text-center">
                    <p className="text-sm text-slate-500 mb-1">재무 건강 점수</p>
                    <p className="text-5xl font-black text-slate-900">{result.score}</p>
                  </div>
                  <div className="w-px h-16 bg-slate-200"></div>
                  <div className="text-center">
                    <p className="text-sm text-slate-500 mb-1">등급</p>
                    <p className={`text-5xl font-black ${result.gradeColor}`}>{result.grade}</p>
                  </div>
                </div>
              </div>

              {/* 팩트 폭행 */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 text-left">
                <p className="text-lg leading-relaxed">
                  {result.roast}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 광고 */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-2xl">
            <AdUnit className="rounded-xl overflow-hidden" />
          </div>
        </section>

        {/* 상세 분석 */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">재무 현황 분석</h2>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">저축률</p>
                <p className={`text-3xl font-bold ${result.stats.savingsRate >= 20 ? 'text-green-600' : result.stats.savingsRate >= 0 ? 'text-orange-500' : 'text-red-600'}`}>
                  {result.stats.savingsRate}%
                </p>
                <p className="text-xs text-slate-400 mt-1">권장: 20% 이상</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">비상금</p>
                <p className={`text-3xl font-bold ${result.stats.monthsOfExpenses >= 6 ? 'text-green-600' : result.stats.monthsOfExpenses >= 3 ? 'text-orange-500' : 'text-red-600'}`}>
                  {result.stats.monthsOfExpenses}개월
                </p>
                <p className="text-xs text-slate-400 mt-1">권장: 6개월 이상</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">부채/소득 비율</p>
                <p className={`text-3xl font-bold ${result.stats.debtToIncomeRatio === 0 ? 'text-green-600' : result.stats.debtToIncomeRatio < 200 ? 'text-orange-500' : 'text-red-600'}`}>
                  {result.stats.debtToIncomeRatio}%
                </p>
                <p className="text-xs text-slate-400 mt-1">권장: 200% 미만</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">순자산</p>
                <p className={`text-3xl font-bold ${result.stats.netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.stats.netWorth >= 0 ? '' : '-'}{formatNumber(Math.abs(result.stats.netWorth))}
                </p>
                <p className="text-xs text-slate-400 mt-1">만원</p>
              </div>
            </div>

            {/* AI 조언 */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">AI의 조언</h3>
              <div className="space-y-3">
                {result.advice.map((advice, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 text-slate-700">
                    {advice}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 광고 */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-2xl">
            <AdUnit className="rounded-xl overflow-hidden" />
          </div>
        </section>

        {/* 관련 계산기 */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">관련 계산기</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/salary-calculator"
                className="block p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <h3 className="font-bold text-slate-900 mb-1">급여 실수령액 계산기</h3>
                <p className="text-sm text-slate-600">4대보험, 세금 공제 후 실수령액</p>
              </Link>

              <Link
                href="/compound-interest-calculator"
                className="block p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <h3 className="font-bold text-slate-900 mb-1">복리 계산기</h3>
                <p className="text-sm text-slate-600">투자 수익 시뮬레이션</p>
              </Link>

              <Link
                href="/loan-calculator"
                className="block p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <h3 className="font-bold text-slate-900 mb-1">대출 계산기</h3>
                <p className="text-sm text-slate-600">대출 상환 계획 수립</p>
              </Link>

              <Link
                href="/content/tax-saving"
                className="block p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <h3 className="font-bold text-slate-900 mb-1">절세 전략 가이드</h3>
                <p className="text-sm text-slate-600">합법적 세금 절약 방법</p>
              </Link>
            </div>
          </div>
        </section>

        {/* 다시 진단 */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <Link
              href="/financial-diagnosis"
              className="inline-block bg-violet-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-violet-700 transition-colors"
            >
              다시 진단받기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
