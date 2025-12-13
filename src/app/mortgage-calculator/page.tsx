'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import {
  calculateMortgage,
  getLTVWarning,
  type MortgageInput,
  type MortgageResult
} from '@/lib/mortgage-calculator'
import { formatNumber } from '@/lib/calculations'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js'
import { Pie, Line } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement)

export default function MortgageCalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [years, setYears] = useState('')
  const [paymentType, setPaymentType] = useState<'equalPayment' | 'equalPrincipal'>('equalPayment')
  const [result, setResult] = useState<MortgageResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleFormatInput = (value: string, setter: (v: string) => void) => {
    const numbers = value.replace(/[^0-9]/g, '')
    if (numbers) {
      setter(formatNumber(parseInt(numbers)))
    } else {
      setter('')
    }
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const property = parseInt(propertyPrice.replace(/,/g, '')) * 10000
    const loan = parseInt(loanAmount.replace(/,/g, '')) * 10000
    const rate = parseFloat(interestRate)
    const period = parseInt(years)

    if (!property || !loan || !rate || !period) {
      alert('모든 값을 입력해주세요')
      return
    }

    const input: MortgageInput = {
      propertyPrice: property,
      loanAmount: loan,
      interestRate: rate,
      loanPeriod: period,
      paymentType,
      additionalMonthlyPayment: 0
    }

    const calcResult = calculateMortgage(input)
    setResult(calcResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setPropertyPrice('')
    setLoanAmount('')
    setInterestRate('')
    setYears('')
    setResult(null)
  }

  // 파이 차트 데이터 (원금 vs 이자)
  const pieChartData = result ? {
    labels: ['대출 원금', '총 이자'],
    datasets: [{
      data: [
        Math.round(result.schedule.reduce((sum, item) => sum + item.principalPayment, 0) / 10000),
        Math.round(result.totalInterest / 10000)
      ],
      backgroundColor: ['#3b82f6', '#ef4444'],
      borderWidth: 0,
    }],
  } : null

  // 연도별 잔액 추이 데이터
  const getYearlyData = () => {
    if (!result) return null
    const yearlyPoints: { year: number; balance: number }[] = []

    // 초기 잔액
    yearlyPoints.push({ year: 0, balance: Math.round(result.schedule[0]?.remainingBalance || 0) })

    // 매년 12월 데이터
    result.schedule.forEach((item, index) => {
      if ((index + 1) % 12 === 0) {
        yearlyPoints.push({
          year: Math.floor((index + 1) / 12),
          balance: Math.round(item.remainingBalance)
        })
      }
    })

    return {
      labels: yearlyPoints.map(p => `${p.year}년`),
      datasets: [{
        label: '대출 잔액',
        data: yearlyPoints.map(p => Math.round(p.balance / 10000)),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }],
    }
  }

  const lineChartData = getYearlyData()

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number | string) {
            return formatNumber(Number(value)) + '만'
          }
        }
      }
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* 히어로 섹션 */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50">
          {/* 배경 그라데이션 */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  2025년 LTV/DTI 규정 적용
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  주택담보대출 계산기
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  주택 구입 시 대출 가능 금액과 월 상환액을 계산합니다
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">
                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 주택 가격 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          주택 가격
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={propertyPrice}
                            onChange={(e) => handleFormatInput(e.target.value, setPropertyPrice)}
                            placeholder="예: 50,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">
                          예: 5억원 = 50,000만원
                        </p>
                      </div>

                      {/* 대출 금액 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          대출 금액
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={loanAmount}
                            onChange={(e) => handleFormatInput(e.target.value, setLoanAmount)}
                            placeholder="예: 30,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 연 이자율 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          연 이자율
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            placeholder="예: 4.5"
                            step="0.1"
                            min="0"
                            max="20"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            %
                          </div>
                        </div>
                      </div>

                      {/* 대출 기간 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          대출 기간
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            placeholder="예: 30"
                            min="1"
                            max="50"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            년
                          </div>
                        </div>
                      </div>

                      {/* 상환 방식 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          상환 방식
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentType('equalPayment')}
                            className={`px-4 py-3 rounded-xl font-semibold transition-all text-sm ${paymentType === 'equalPayment'
                              ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                          >
                            <div>원리금균등상환</div>
                            <div className="text-xs opacity-70 mt-1">매월 같은 금액</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentType('equalPrincipal')}
                            className={`px-4 py-3 rounded-xl font-semibold transition-all text-sm ${paymentType === 'equalPrincipal'
                              ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                          >
                            <div>원금균등상환</div>
                            <div className="text-xs opacity-70 mt-1">초반 부담 큼</div>
                          </button>
                        </div>
                      </div>

                      {/* 계산 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        상환액 계산하기
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* LTV 결과 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">LTV (담보인정비율)</p>
                        <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                          {result!.loanToValue.toFixed(1)}
                          <span className="text-2xl font-bold text-slate-500 ml-1">%</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          {getLTVWarning(result!.loanToValue)}
                        </p>
                      </div>

                      {/* 상세 결과 */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                          <span className="text-slate-600 font-medium">월 상환액</span>
                          <span className="text-xl font-bold text-blue-600">
                            {formatNumber(Math.round(result!.monthlyPayment / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">총 상환액</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(Math.round(result!.totalPayment / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                          <span className="text-slate-600 font-medium">총 이자</span>
                          <span className="text-lg font-bold text-red-600">
                            +{formatNumber(Math.round(result!.totalInterest / 10000))}만원
                          </span>
                        </div>
                      </div>

                      {/* 버튼 */}
                      <div className="flex gap-3">
                        <button
                          onClick={handleReset}
                          className="flex-1 py-3.5 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          다시 계산
                        </button>
                        <Link
                          href="/loan-calculator"
                          className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-center shadow-lg shadow-slate-200"
                        >
                          일반 대출 계산기
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 실제 대출 가능 금액은 금융기관별로 다를 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 차트 섹션 */}
        {showResult && result && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">상환 분석</h2>

              {/* 요약 카드 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">대출 원금</p>
                  <p className="text-xl font-bold text-slate-900">
                    {formatNumber(Math.round(parseInt(loanAmount.replace(/,/g, ''))))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">연 이자율</p>
                  <p className="text-xl font-bold text-blue-600">{interestRate}%</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">총 이자</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatNumber(Math.round(result.totalInterest / 10000))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">이자 비율</p>
                  <p className="text-xl font-bold text-purple-600">
                    {((result.totalInterest / (result.totalPayment - result.totalInterest)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* 차트 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pieChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">원금 vs 이자 비율</h3>
                    <div className="h-64">
                      <Pie data={pieChartData} options={chartOptions} />
                    </div>
                  </div>
                )}

                {lineChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">연도별 잔액 추이</h3>
                    <div className="h-64">
                      <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 상환 스케줄 */}
        {showResult && result && (
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                월별 상환 스케줄
              </h2>
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold text-slate-700">회차</th>
                        <th className="px-4 py-3 text-right font-bold text-slate-700">원금</th>
                        <th className="px-4 py-3 text-right font-bold text-slate-700">이자</th>
                        <th className="px-4 py-3 text-right font-bold text-slate-700">상환액</th>
                        <th className="px-4 py-3 text-right font-bold text-slate-700">잔액</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {result.schedule.slice(0, 12).map((item) => (
                        <tr key={item.month} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-slate-900">{item.month}개월</td>
                          <td className="px-4 py-3 text-right text-slate-700">{formatNumber(Math.round(item.principalPayment / 10000))}만</td>
                          <td className="px-4 py-3 text-right text-red-500">{formatNumber(Math.round(item.interestPayment / 10000))}만</td>
                          <td className="px-4 py-3 text-right font-bold text-slate-900">{formatNumber(Math.round(item.totalPayment / 10000))}만</td>
                          <td className="px-4 py-3 text-right text-slate-500">{formatNumber(Math.round(item.remainingBalance / 10000))}만</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.schedule.length > 12 && (
                  <div className="p-4 bg-slate-50 text-center text-sm text-slate-500">
                    ... 외 {result.schedule.length - 12}개월
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 주택담보대출 가이드 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">주택담보대출 가이드</h2>

            <div className="space-y-8">
              {/* LTV/DTI/DSR 설명 */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">대출 규제 용어 이해하기</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-bold">LTV</span>
                      <span className="font-bold text-slate-900">담보인정비율</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      주택 가격 대비 대출 가능 금액의 비율입니다. 규제지역은 40~50%, 비규제지역은 최대 70%까지 가능합니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-bold">DTI</span>
                      <span className="font-bold text-slate-900">총부채상환비율</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      연소득 대비 연간 대출 원리금 상환액의 비율입니다. 규제지역 기준 40% 이내로 제한됩니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-bold">DSR</span>
                      <span className="font-bold text-slate-900">총부채원리금상환비율</span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      모든 대출의 연간 원리금 상환액을 연소득으로 나눈 비율입니다. 현재 40% 규제가 적용됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 상환 방식 비교 */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">상환 방식 비교</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">원리금균등상환</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 매월 동일한 금액 상환</li>
                      <li>• 자금 계획 수립 용이</li>
                      <li>• 초기 이자 비중 높음</li>
                      <li>• 총 이자 부담 상대적으로 큼</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">원금균등상환</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 매월 원금이 균등하게 감소</li>
                      <li>• 초기 상환 부담 큼</li>
                      <li>• 점점 상환액 감소</li>
                      <li>• 총 이자 부담 상대적으로 적음</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 대출 금리 유형 */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">금리 유형 선택</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">고정금리</h4>
                    <p className="text-sm text-slate-600">
                      대출 기간 동안 금리가 변동되지 않습니다. 금리 상승기에 유리하며, 안정적인 상환 계획이 가능합니다.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">변동금리</h4>
                    <p className="text-sm text-slate-600">
                      기준금리에 따라 금리가 변동됩니다. 초기 금리가 낮고, 금리 하락기에 유리합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 계산 기준 안내 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-6 text-center">계산 기준 안내</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">2025년 LTV 규정 기준</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">규제지역 LTV: 최대 40~50%</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">비규제지역 LTV: 최대 70%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">원리금균등/원금균등 상환 지원</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">실제 금리는 은행별로 상이</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">DSR 40% 규제 적용 중</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 금융위원회, 한국은행 기준금리 (2025년)
              </p>
            </div>
          </div>
        </section>

        {/* 참고자료 */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">참고자료</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors">
                금융위원회
              </a>
              <a href="https://www.bok.or.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors">
                한국은행
              </a>
              <a href="https://www.hf.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors">
                주택금융공사
              </a>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/mortgage-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
