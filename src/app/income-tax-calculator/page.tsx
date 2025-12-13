'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import {
  calculateIncomeTax,
  getTaxBurdenEvaluation,
  type IncomeTaxInput,
  type IncomeTaxResult
} from '@/lib/income-tax-calculator'
import { formatNumber } from '@/lib/calculations'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function IncomeTaxCalculatorPage() {
  const [totalIncome, setTotalIncome] = useState('')
  const [personalDeduction, setPersonalDeduction] = useState('150')
  const [insurancePremium, setInsurancePremium] = useState('')
  const [cardExpense, setCardExpense] = useState('')
  const [result, setResult] = useState<IncomeTaxResult | null>(null)
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

    const income = parseInt(totalIncome.replace(/,/g, '')) * 10000
    const personal = parseInt(personalDeduction.replace(/,/g, '')) * 10000 || 1500000
    const insurance = parseInt(insurancePremium.replace(/,/g, '')) * 10000 || 0
    const card = parseInt(cardExpense.replace(/,/g, '')) * 10000 || 0

    if (!income) {
      alert('총 소득을 입력해주세요')
      return
    }

    const input: IncomeTaxInput = {
      totalIncome: income,
      deductions: {
        personalDeduction: personal,
        insurancePremium: insurance,
        medicalExpense: 0,
        educationExpense: 0,
        donationExpense: 0,
        cardExpense: card
      }
    }

    const calcResult = calculateIncomeTax(input)
    setResult(calcResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setTotalIncome('')
    setPersonalDeduction('150')
    setInsurancePremium('')
    setCardExpense('')
    setResult(null)
  }

  // 파이 차트 데이터 (세금 vs 순소득)
  const pieChartData = result ? {
    labels: ['종합소득세', '순소득 (세후)'],
    datasets: [{
      data: [
        Math.round(result.finalTax / 10000),
        Math.round((result.totalIncome - result.finalTax) / 10000)
      ],
      backgroundColor: ['#ef4444', '#10b981'],
      borderWidth: 0,
    }],
  } : null

  // 바 차트 데이터 (세율 구간별 세금)
  const barChartData = result && result.breakdown.length > 0 ? {
    labels: result.breakdown.map(item => item.bracket),
    datasets: [{
      label: '구간별 세금',
      data: result.breakdown.map(item => Math.round(item.tax / 10000)),
      backgroundColor: [
        '#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444', '#dc2626', '#b91c1c', '#991b1b'
      ],
      borderRadius: 8,
    }],
  } : null

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  const barChartOptions = {
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
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-pink-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-violet-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  2025년 종합소득세율 적용
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  종합소득세 계산기
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  총 소득과 공제 항목으로 종합소득세를 계산합니다
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">
                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 총 소득 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          연간 총 소득
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={totalIncome}
                            onChange={(e) => handleFormatInput(e.target.value, setTotalIncome)}
                            placeholder="예: 5,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 인적공제 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          인적공제 (본인 150만원 + 부양가족)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={personalDeduction}
                            onChange={(e) => handleFormatInput(e.target.value, setPersonalDeduction)}
                            placeholder="예: 150"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">
                          1인당 150만원 (본인+배우자+부양가족)
                        </p>
                      </div>

                      {/* 보험료 공제 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          보험료 공제 (선택)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={insurancePremium}
                            onChange={(e) => handleFormatInput(e.target.value, setInsurancePremium)}
                            placeholder="예: 100"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 신용카드 공제 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          신용카드 공제 (선택)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardExpense}
                            onChange={(e) => handleFormatInput(e.target.value, setCardExpense)}
                            placeholder="예: 100"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 계산 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        종합소득세 계산하기
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* 결과 헤더 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">납부할 종합소득세</p>
                        <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                          {formatNumber(Math.round(result!.finalTax / 10000))}
                          <span className="text-2xl font-bold text-slate-500 ml-1">만원</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          실효세율: {result!.effectiveTaxRate.toFixed(2)}% | {getTaxBurdenEvaluation(result!.effectiveTaxRate)}
                        </p>
                      </div>

                      {/* 상세 결과 */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">총 소득</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(Math.round(result!.totalIncome / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                          <span className="text-slate-600 font-medium">총 공제액</span>
                          <span className="text-lg font-bold text-green-600">
                            -{formatNumber(Math.round(result!.totalDeduction / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                          <span className="text-slate-600 font-medium">과세표준</span>
                          <span className="text-lg font-bold text-blue-600">
                            {formatNumber(Math.round(result!.taxableIncome / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                          <span className="text-slate-600 font-medium">결정세액</span>
                          <span className="text-xl font-bold text-purple-600">
                            {formatNumber(Math.round(result!.finalTax / 10000))}만원
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
                          href="/capital-gains-tax-calculator"
                          className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-center shadow-lg shadow-slate-200"
                        >
                          양도세 계산기
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 간이 계산이며, 실제 세금은 상황에 따라 달라질 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 차트 섹션 */}
        {showResult && result && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">세금 분석</h2>

              {/* 요약 카드 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">총 소득</p>
                  <p className="text-xl font-bold text-slate-900">
                    {formatNumber(Math.round(result.totalIncome / 10000))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">과세표준</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatNumber(Math.round(result.taxableIncome / 10000))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">결정세액</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatNumber(Math.round(result.finalTax / 10000))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">실효세율</p>
                  <p className="text-xl font-bold text-purple-600">{result.effectiveTaxRate.toFixed(2)}%</p>
                </div>
              </div>

              {/* 차트 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pieChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">세금 vs 순소득</h3>
                    <div className="h-64">
                      <Pie data={pieChartData} options={chartOptions} />
                    </div>
                  </div>
                )}

                {barChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">구간별 세금</h3>
                    <div className="h-64">
                      <Bar data={barChartData} options={barChartOptions} />
                    </div>
                  </div>
                )}
              </div>

              {/* 세율 구간 상세 */}
              {result.breakdown.length > 0 && (
                <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                  <h3 className="text-lg font-bold text-slate-900 p-4 border-b">세율 구간별 상세</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-bold text-slate-700">과세표준 구간</th>
                          <th className="px-4 py-3 text-center font-bold text-slate-700">세율</th>
                          <th className="px-4 py-3 text-right font-bold text-slate-700">세금</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.breakdown.map((item, index) => (
                          <tr key={index} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-slate-900">{item.bracket}</td>
                            <td className="px-4 py-3 text-center text-blue-600 font-semibold">{item.rate}%</td>
                            <td className="px-4 py-3 text-right font-bold text-slate-900">
                              {formatNumber(Math.round(item.tax / 10000))}만원
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 종합소득세 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">종합소득세 가이드</h2>

            <div className="space-y-8">
              {/* 종합소득세란 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">종합소득세란?</h3>
                <p className="text-slate-600 mb-4">
                  종합소득세는 1년 동안 발생한 모든 소득을 합산하여 과세하는 세금입니다.
                  근로소득, 사업소득, 이자소득, 배당소득, 연금소득, 기타소득 등이 포함됩니다.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <span className="text-sm text-slate-600">근로소득</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <span className="text-sm text-slate-600">사업소득</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <span className="text-sm text-slate-600">이자소득</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <span className="text-sm text-slate-600">배당소득</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <span className="text-sm text-slate-600">연금소득</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <span className="text-sm text-slate-600">기타소득</span>
                  </div>
                </div>
              </div>

              {/* 주요 공제 항목 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">주요 공제 항목</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 mb-2">인적공제</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 본인: 150만원</li>
                      <li>• 배우자: 150만원</li>
                      <li>• 부양가족: 1인당 150만원</li>
                      <li>• 경로우대(70세↑): 1인당 100만원 추가</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                    <h4 className="font-bold text-green-700 mb-2">특별소득공제</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 보험료공제: 연 100만원 한도</li>
                      <li>• 의료비공제: 총급여 3% 초과분</li>
                      <li>• 교육비공제: 자녀 1인당 연 900만원</li>
                      <li>• 주택자금공제: 청약저축, 주담대이자</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-700 mb-2">세액공제</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 연금저축/IRP: 연 최대 700만원 (13.2~16.5%)</li>
                      <li>• 신용카드공제: 총급여 25% 초과분</li>
                      <li>• 기부금공제: 정치자금, 종교단체 등</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 절세 팁 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">절세 전략</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 rounded-xl p-4">
                    <h4 className="font-bold text-amber-700 mb-2">연금저축/IRP 활용</h4>
                    <p className="text-sm text-slate-600">
                      연금저축과 IRP에 납입하면 세액공제를 받을 수 있습니다.
                      총 급여 5,500만원 이하: 16.5%, 초과: 13.2% 공제
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-bold text-blue-700 mb-2">부양가족 등록</h4>
                    <p className="text-sm text-slate-600">
                      소득이 없는 부모님, 자녀 등을 부양가족으로 등록하면
                      1인당 150만원의 공제를 받을 수 있습니다.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-bold text-green-700 mb-2">신용카드 전략</h4>
                    <p className="text-sm text-slate-600">
                      총급여 25% 초과분부터 공제됩니다.
                      체크카드, 현금영수증이 공제율이 더 높습니다.
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h4 className="font-bold text-purple-700 mb-2">의료비/교육비 증빙</h4>
                    <p className="text-sm text-slate-600">
                      의료비는 총급여 3% 초과분부터 공제됩니다.
                      영수증을 철저히 챙기세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 계산 기준 안내 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-6 text-center">2025년 종합소득세율표</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="py-3 text-left text-slate-300">과세표준</th>
                      <th className="py-3 text-right text-slate-300">세율</th>
                      <th className="py-3 text-right text-slate-300">누진공제</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    <tr><td className="py-2">1,400만원 이하</td><td className="text-right">6%</td><td className="text-right">-</td></tr>
                    <tr><td className="py-2">1,400만원 ~ 5,000만원</td><td className="text-right">15%</td><td className="text-right">126만원</td></tr>
                    <tr><td className="py-2">5,000만원 ~ 8,800만원</td><td className="text-right">24%</td><td className="text-right">576만원</td></tr>
                    <tr><td className="py-2">8,800만원 ~ 1.5억원</td><td className="text-right">35%</td><td className="text-right">1,544만원</td></tr>
                    <tr><td className="py-2">1.5억원 ~ 3억원</td><td className="text-right">38%</td><td className="text-right">1,994만원</td></tr>
                    <tr><td className="py-2">3억원 ~ 5억원</td><td className="text-right">40%</td><td className="text-right">2,594만원</td></tr>
                    <tr><td className="py-2">5억원 ~ 10억원</td><td className="text-right">42%</td><td className="text-right">3,594만원</td></tr>
                    <tr><td className="py-2">10억원 초과</td><td className="text-right">45%</td><td className="text-right">6,594만원</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 국세청 (2025년)
              </p>
            </div>
          </div>
        </section>

        {/* 참고자료 */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">참고자료</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                국세청
              </a>
              <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                홈택스
              </a>
              <a href="https://www.moef.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                기획재정부
              </a>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/income-tax-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
