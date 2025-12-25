'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { formatNumber } from '@/lib/calculations'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

// 연령대별 평균 데이터 (통계청 기준 가상 데이터)
const AVERAGE_STATS: Record<string, { income: number; assets: number; spending: number }> = {
  '20s': { income: 250, assets: 3000, spending: 150 },
  '30s': { income: 380, assets: 15000, spending: 220 },
  '40s': { income: 550, assets: 35000, spending: 350 },
  '50s': { income: 600, assets: 55000, spending: 400 },
  '60s': { income: 400, assets: 70000, spending: 300 },
}

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
  goals: {
    shortTerm: string
    midTerm: string
    longTerm: string
  }
  stats: {
    savingsRate: number
    debtToIncomeRatio: number
    netWorth: number
    monthsOfExpenses: number
  }
}

function getAgeGroup(age: number): string {
  if (age < 30) return '20s'
  if (age < 40) return '30s'
  if (age < 50) return '40s'
  if (age < 60) return '50s'
  return '60s'
}

function getAgeGroupLabel(ageGroup: string): string {
  const labels: Record<string, string> = {
    '20s': '20대',
    '30s': '30대',
    '40s': '40대',
    '50s': '50대',
    '60s': '60대',
  }
  return labels[ageGroup] || '전체'
}

function getComparisonText(myValue: number, avgValue: number, unit: string): string {
  const diff = myValue - avgValue
  const percent = avgValue > 0 ? Math.round((myValue / avgValue) * 100) : 100

  if (percent >= 150) return `상위 10% 수준이에요!`
  if (percent >= 120) return `평균보다 ${formatNumber(Math.abs(diff))}${unit} 더 많아요`
  if (percent >= 80) return `평균과 비슷해요`
  if (percent >= 50) return `평균보다 ${formatNumber(Math.abs(diff))}${unit} 부족해요`
  return `아직 갈 길이 멀어요`
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

    const fetchDiagnosis = async () => {
      try {
        const response = await fetch('/api/diagnosis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsedData)
        })

        const responseData = await response.json()

        if (responseData.success) {
          setResult({
            ...responseData.result,
            stats: responseData.stats
          })
        } else {
          setError(responseData.error || '분석 중 오류가 발생했습니다.')
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
          <div className="text-center px-4">
            <div className="text-6xl mb-6">😢</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">분석 중 오류가 발생했습니다</h2>
            <p className="text-slate-500 mb-6">{error}</p>
            <Link href="/financial-diagnosis" className="inline-block bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors">
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
            <h2 className="text-xl font-bold text-slate-900 mb-2">AI가 분석 중입니다...</h2>
            <p className="text-slate-500">당신의 재무 상태를 냉정하게 평가하는 중</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const ageGroup = getAgeGroup(data.age)
  const avgStats = AVERAGE_STATS[ageGroup]
  const totalAssets = data.savingsDeposit + data.stockInvestment + data.realEstate

  // 도넛 차트 데이터
  const portfolioData = {
    labels: ['예적금', '주식/투자', '부동산'],
    datasets: [{
      data: [data.savingsDeposit, data.stockInvestment, data.realEstate],
      backgroundColor: ['#6366f1', '#22c55e', '#f59e0b'],
      borderColor: ['#4f46e5', '#16a34a', '#d97706'],
      borderWidth: 2,
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    cutout: '65%'
  }

  const incomePercent = Math.min(100, Math.round((data.monthlySalary / avgStats.income) * 50))
  const avgIncomePercent = 50
  const assetsPercent = Math.min(100, Math.round((totalAssets / avgStats.assets) * 50))
  const avgAssetsPercent = 50

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* 결과 히어로 - 컴팩트 */}
        <section className="relative pt-20 pb-6 lg:pt-24 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-5xl mb-3">{result.personaEmoji}</div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">
                당신은 <span className="text-violet-600">{result.persona}</span>
              </h1>

              {/* 점수 + 등급 인라인 */}
              <div className="flex items-center justify-center gap-6 my-6">
                <div className="bg-white rounded-2xl px-6 py-4 shadow-lg border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">재무 건강 점수</p>
                  <p className="text-4xl font-black text-slate-900">{result.score}</p>
                </div>
                <div className="bg-white rounded-2xl px-6 py-4 shadow-lg border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">등급</p>
                  <p className={`text-4xl font-black ${result.gradeColor}`}>{result.grade}</p>
                </div>
              </div>

              {/* 팩트 폭행 */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 text-left max-w-xl mx-auto">
                <p className="text-base leading-relaxed">{result.roast}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 대시보드: 재무 현황 + 포트폴리오 */}
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-lg font-bold text-slate-900 mb-4">재무 현황</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">저축률</p>
                <p className={`text-2xl font-bold ${result.stats.savingsRate >= 20 ? 'text-green-600' : result.stats.savingsRate >= 0 ? 'text-orange-500' : 'text-red-600'}`}>
                  {result.stats.savingsRate}%
                </p>
                <p className="text-[10px] text-slate-400">권장 20%+</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">비상금</p>
                <p className={`text-2xl font-bold ${result.stats.monthsOfExpenses >= 6 ? 'text-green-600' : result.stats.monthsOfExpenses >= 3 ? 'text-orange-500' : 'text-red-600'}`}>
                  {result.stats.monthsOfExpenses}개월
                </p>
                <p className="text-[10px] text-slate-400">권장 6개월+</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">부채/소득</p>
                <p className={`text-2xl font-bold ${result.stats.debtToIncomeRatio === 0 ? 'text-green-600' : result.stats.debtToIncomeRatio < 200 ? 'text-orange-500' : 'text-red-600'}`}>
                  {result.stats.debtToIncomeRatio}%
                </p>
                <p className="text-[10px] text-slate-400">권장 200% 미만</p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">순자산</p>
                <p className={`text-2xl font-bold ${result.stats.netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.stats.netWorth >= 0 ? '' : '-'}{formatNumber(Math.abs(result.stats.netWorth))}
                </p>
                <p className="text-[10px] text-slate-400">만원</p>
              </div>
            </div>

            {/* 자산 포트폴리오 */}
            {totalAssets > 0 && (
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-4">자산 포트폴리오</h3>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 relative">
                    <Doughnut data={portfolioData} options={chartOptions} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-slate-500 font-medium">{formatNumber(totalAssets)}만원</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                        <span className="text-sm text-slate-600">예적금</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {formatNumber(data.savingsDeposit)}만원 ({totalAssets > 0 ? Math.round(data.savingsDeposit / totalAssets * 100) : 0}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm text-slate-600">주식/투자</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {formatNumber(data.stockInvestment)}만원 ({totalAssets > 0 ? Math.round(data.stockInvestment / totalAssets * 100) : 0}%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm text-slate-600">부동산</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {formatNumber(data.realEstate)}만원 ({totalAssets > 0 ? Math.round(data.realEstate / totalAssets * 100) : 0}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 또래와 비교하기 */}
        <section className="py-6 bg-gradient-to-br from-violet-50 to-indigo-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {getAgeGroupLabel(ageGroup)} 또래와 비교
            </h2>
            <p className="text-xs text-slate-500 mb-4">통계청 가계금융복지조사 기준</p>

            <div className="space-y-4">
              {/* 소득 비교 */}
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">월 소득</span>
                  <span className="text-xs text-violet-600 font-medium">
                    {getComparisonText(data.monthlySalary, avgStats.income, '만원')}
                  </span>
                </div>
                <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden">
                  {/* 내 소득 바 */}
                  <div
                    className="absolute top-0 left-0 h-full bg-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${incomePercent}%` }}
                  >
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white font-bold">
                      나 {formatNumber(data.monthlySalary)}만
                    </span>
                  </div>
                  {/* 평균 마커 */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-slate-400"
                    style={{ left: `${avgIncomePercent}%` }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 whitespace-nowrap">
                      평균 {formatNumber(avgStats.income)}만
                    </span>
                  </div>
                </div>
              </div>

              {/* 자산 비교 */}
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">총 자산</span>
                  <span className="text-xs text-violet-600 font-medium">
                    {getComparisonText(totalAssets, avgStats.assets, '만원')}
                  </span>
                </div>
                <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${assetsPercent}%` }}
                  >
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white font-bold">
                      나 {formatNumber(totalAssets)}만
                    </span>
                  </div>
                  <div
                    className="absolute top-0 h-full w-0.5 bg-slate-400"
                    style={{ left: `${avgAssetsPercent}%` }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 whitespace-nowrap">
                      평균 {formatNumber(avgStats.assets)}만
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 광고 */}
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-3xl">
            <AdUnit className="rounded-xl overflow-hidden" />
          </div>
        </section>

        {/* AI 조언 */}
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-lg font-bold text-slate-900 mb-4">AI의 처방전</h2>
            <div className="space-y-3">
              {result.advice.map((advice, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-slate-200 text-slate-700">
                  {advice}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 목표 타임라인 */}
        {result.goals && (
          <section className="py-6 bg-slate-900 text-white">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-lg font-bold mb-4">당신을 위한 재무 목표</h2>
              <div className="relative">
                {/* 타임라인 선 */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-violet-500/30"></div>

                <div className="space-y-6">
                  {/* 1년 */}
                  <div className="relative pl-10">
                    <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                      <span className="text-[10px] font-bold">1</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <span className="text-xs text-violet-300 font-medium">1년 목표</span>
                      <p className="text-sm mt-1">{result.goals.shortTerm}</p>
                    </div>
                  </div>

                  {/* 3년 */}
                  <div className="relative pl-10">
                    <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                      <span className="text-[10px] font-bold">3</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <span className="text-xs text-violet-300 font-medium">3년 목표</span>
                      <p className="text-sm mt-1">{result.goals.midTerm}</p>
                    </div>
                  </div>

                  {/* 5년 */}
                  <div className="relative pl-10">
                    <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center">
                      <span className="text-[10px] font-bold">5</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <span className="text-xs text-violet-300 font-medium">5년 목표</span>
                      <p className="text-sm mt-1">{result.goals.longTerm}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 광고 */}
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-3xl">
            <AdUnit className="rounded-xl overflow-hidden" />
          </div>
        </section>

        {/* 관련 계산기 */}
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-lg font-bold text-slate-900 mb-4">추천 계산기</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/salary-calculator" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm mb-1">급여 실수령액</h3>
                <p className="text-xs text-slate-600">4대보험, 세금 공제</p>
              </Link>
              <Link href="/compound-interest-calculator" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm mb-1">복리 계산기</h3>
                <p className="text-xs text-slate-600">투자 수익 시뮬레이션</p>
              </Link>
              <Link href="/loan-calculator" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm mb-1">대출 계산기</h3>
                <p className="text-xs text-slate-600">대출 상환 계획</p>
              </Link>
              <Link href="/content/isa-guide" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm mb-1">ISA 가이드</h3>
                <p className="text-xs text-slate-600">절세 투자 전략</p>
              </Link>
            </div>
          </div>
        </section>

        {/* 다시 진단 */}
        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Link href="/financial-diagnosis" className="inline-block bg-violet-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-violet-700 transition-colors">
              다시 진단받기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
