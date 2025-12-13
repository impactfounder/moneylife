'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import { calculateCompoundInterest } from '@/lib/compound-calculator'
import { formatNumber } from '@/lib/calculations'
import type { CompoundInterestResult } from '@/types'
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
import { Pie, Bar, Line } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement)

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('')
  const [monthlyDeposit, setMonthlyDeposit] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [years, setYears] = useState('')
  const [result, setResult] = useState<CompoundInterestResult | null>(null)
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

    const principalAmount = parseInt(principal.replace(/,/g, '')) * 10000 || 0
    const monthly = parseInt(monthlyDeposit.replace(/,/g, '')) * 10000 || 0
    const rate = parseFloat(annualRate)
    const period = parseInt(years)

    if (!rate || !period) {
      alert('이자율과 투자 기간을 입력해주세요')
      return
    }

    const calcResult = calculateCompoundInterest({
      principal: principalAmount,
      monthlyDeposit: monthly,
      annualRate: rate,
      years: period,
      compoundFrequency: 'monthly'
    })

    setResult(calcResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setPrincipal('')
    setMonthlyDeposit('')
    setAnnualRate('')
    setYears('')
    setResult(null)
  }

  // 파이 차트 데이터 (원금 vs 수익)
  const pieChartData = result ? {
    labels: ['총 원금', '수익금 (이자)'],
    datasets: [{
      data: [
        Math.round(result.totalDeposit / 10000),
        Math.round(result.totalInterest / 10000)
      ],
      backgroundColor: ['#3b82f6', '#10b981'],
      borderWidth: 0,
    }],
  } : null

  // 라인 차트 데이터 (연도별 자산 성장)
  const getLineChartData = () => {
    if (!result) return null

    return {
      labels: result.yearlyData.map(d => `${d.year}년`),
      datasets: [
        {
          label: '총 자산',
          data: result.yearlyData.map(d => Math.round(d.balance / 10000)),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: '원금',
          data: result.yearlyData.map((d, i) => {
            // 누적 원금 계산: 초기 원금 + 월 적립금 * 12 * 연차
            const cumulativeDeposit = result.yearlyData.slice(0, i + 1).reduce((sum, item) => sum + item.deposit, 0)
            return Math.round(cumulativeDeposit / 10000)
          }),
          borderColor: '#3b82f6',
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
        }
      ],
    }
  }

  const lineChartData = getLineChartData()

  // 바 차트 데이터 (연도별 수익)
  const getBarChartData = () => {
    if (!result) return null

    return {
      labels: result.yearlyData.map(d => `${d.year}년`),
      datasets: [{
        label: '연간 이자 수익',
        data: result.yearlyData.map(d => Math.round(d.interest / 10000)),
        backgroundColor: '#10b981',
        borderRadius: 8,
      }],
    }
  }

  const barChartData = getBarChartData()

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
        position: 'bottom' as const,
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
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-emerald-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-lime-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  복리의 마법을 경험하세요
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  복리 이자 계산기
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  초기 투자금과 월 적립금으로 미래 자산을 계산합니다
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">
                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 초기 투자금 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          초기 투자금
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={principal}
                            onChange={(e) => handleFormatInput(e.target.value, setPrincipal)}
                            placeholder="예: 1,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 월 적립금 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          월 적립금
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={monthlyDeposit}
                            onChange={(e) => handleFormatInput(e.target.value, setMonthlyDeposit)}
                            placeholder="예: 50"
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
                          연 이자율 (수익률)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={annualRate}
                            onChange={(e) => setAnnualRate(e.target.value)}
                            placeholder="예: 7"
                            step="0.1"
                            min="0"
                            max="100"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            %
                          </div>
                        </div>
                      </div>

                      {/* 투자 기간 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          투자 기간
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            placeholder="예: 20"
                            min="1"
                            max="50"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            년
                          </div>
                        </div>
                      </div>

                      {/* 계산 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        미래 자산 계산하기
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* 결과 헤더 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">미래 예상 자산</p>
                        <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                          {formatNumber(Math.round(result!.finalAmount / 10000))}
                          <span className="text-2xl font-bold text-slate-500 ml-1">만원</span>
                        </div>
                        <p className="text-sm text-green-600 font-semibold">
                          +{formatNumber(Math.round(result!.totalInterest / 10000))}만원 수익
                        </p>
                      </div>

                      {/* 상세 결과 */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">총 원금</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(Math.round(result!.totalDeposit / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                          <span className="text-slate-600 font-medium">수익금 (이자)</span>
                          <span className="text-lg font-bold text-green-600">
                            +{formatNumber(Math.round(result!.totalInterest / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                          <span className="text-slate-600 font-medium">최종 자산</span>
                          <span className="text-xl font-bold text-blue-600">
                            {formatNumber(Math.round(result!.finalAmount / 10000))}만원
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
                          href="/pension-calculator"
                          className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-center shadow-lg shadow-slate-200"
                        >
                          연금 계산기
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 세금 및 수수료는 포함되지 않은 단순 계산입니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 차트 섹션 */}
        {showResult && result && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">투자 분석</h2>

              {/* 요약 카드 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">투자 기간</p>
                  <p className="text-xl font-bold text-slate-900">{years}년</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">연평균 수익률</p>
                  <p className="text-xl font-bold text-blue-600">{annualRate}%</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">총 수익</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatNumber(Math.round(result.totalInterest / 10000))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">총 수익률</p>
                  <p className="text-xl font-bold text-purple-600">
                    {result.totalDeposit > 0 ? ((result.totalInterest / result.totalDeposit) * 100).toFixed(1) : 0}%
                  </p>
                </div>
              </div>

              {/* 차트 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {pieChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">원금 vs 수익</h3>
                    <div className="h-64">
                      <Pie data={pieChartData} options={chartOptions} />
                    </div>
                  </div>
                )}

                {barChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">연간 이자 수익</h3>
                    <div className="h-64">
                      <Bar data={barChartData} options={barChartOptions} />
                    </div>
                  </div>
                )}
              </div>

              {lineChartData && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">자산 성장 추이</h3>
                  <div className="h-64">
                    <Line data={lineChartData} options={lineChartOptions} />
                  </div>
                </div>
              )}

              {/* 연도별 상세 */}
              <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <h3 className="text-lg font-bold text-slate-900 p-4 border-b">연도별 자산 현황</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold text-slate-700">연차</th>
                        <th className="px-4 py-3 text-right font-bold text-slate-700">누적 원금</th>
                        <th className="px-4 py-3 text-right font-bold text-slate-700">누적 이자</th>
                        <th className="px-4 py-3 text-right font-bold text-slate-700">총 자산</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {result.yearlyData.map((item, index) => {
                        const cumulativeDeposit = result.yearlyData.slice(0, index + 1).reduce((sum, d) => sum + d.deposit, 0)
                        const cumulativeInterest = item.balance - cumulativeDeposit
                        return (
                          <tr key={item.year} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-slate-900">{item.year}년차</td>
                            <td className="px-4 py-3 text-right text-slate-700">
                              {formatNumber(Math.round(cumulativeDeposit / 10000))}만원
                            </td>
                            <td className="px-4 py-3 text-right text-green-600">
                              +{formatNumber(Math.round(cumulativeInterest / 10000))}만원
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-slate-900">
                              {formatNumber(Math.round(item.balance / 10000))}만원
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 복리 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">복리 투자 가이드</h2>

            <div className="space-y-8">
              {/* 복리의 마법 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">복리의 마법</h3>
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-center text-slate-700">
                    <span className="text-2xl font-bold text-blue-600">&quot;복리는 세계 8번째 불가사의다&quot;</span>
                    <br />
                    <span className="text-sm text-slate-500">- 앨버트 아인슈타인</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-bold text-blue-700 mb-2">단리 vs 복리</h4>
                    <p className="text-sm text-slate-600">
                      단리: 원금에만 이자 발생<br/>
                      복리: 원금 + 이자에도 이자 발생<br/>
                      시간이 지날수록 차이가 기하급수적으로 커집니다.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-bold text-green-700 mb-2">72의 법칙</h4>
                    <p className="text-sm text-slate-600">
                      72 ÷ 연 수익률(%) = 원금 2배 되는 기간(년)<br/>
                      예: 연 7% 수익률 → 약 10년 후 2배
                    </p>
                  </div>
                </div>
              </div>

              {/* 투자 전략 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">복리 극대화 전략</h3>
                <div className="space-y-4">
                  <div className="bg-amber-50 rounded-xl p-4 border-l-4 border-amber-500">
                    <h4 className="font-bold text-amber-700 mb-2">1. 일찍 시작하라</h4>
                    <p className="text-sm text-slate-600">
                      복리 효과는 시간이 지날수록 커집니다. 20대에 시작하면 30대에 시작하는 것보다
                      은퇴 시 자산이 2~3배 이상 차이날 수 있습니다.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 mb-2">2. 꾸준히 적립하라</h4>
                    <p className="text-sm text-slate-600">
                      매월 일정 금액을 적립하는 적립식 투자는 시장 변동성을 줄이고
                      평균 매입 단가를 낮출 수 있습니다.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                    <h4 className="font-bold text-green-700 mb-2">3. 재투자하라</h4>
                    <p className="text-sm text-slate-600">
                      배당금, 이자 등 투자 수익을 인출하지 말고 재투자하세요.
                      복리 효과를 극대화할 수 있습니다.
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-700 mb-2">4. 비용을 최소화하라</h4>
                    <p className="text-sm text-slate-600">
                      수수료, 세금 등 투자 비용은 장기적으로 큰 차이를 만듭니다.
                      인덱스 펀드 등 저비용 투자상품을 활용하세요.
                    </p>
                  </div>
                </div>
              </div>

              {/* 투자 상품 비교 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">투자 상품 수익률 비교</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold text-slate-700">상품</th>
                        <th className="px-4 py-3 text-center font-bold text-slate-700">예상 수익률</th>
                        <th className="px-4 py-3 text-center font-bold text-slate-700">위험도</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-4 py-3 font-medium">예금/적금</td>
                        <td className="px-4 py-3 text-center text-blue-600">2~4%</td>
                        <td className="px-4 py-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">낮음</span></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">채권</td>
                        <td className="px-4 py-3 text-center text-blue-600">3~5%</td>
                        <td className="px-4 py-3 text-center"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">중간</span></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">국내 주식 (KOSPI)</td>
                        <td className="px-4 py-3 text-center text-blue-600">7~10%</td>
                        <td className="px-4 py-3 text-center"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">높음</span></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">미국 주식 (S&P 500)</td>
                        <td className="px-4 py-3 text-center text-blue-600">8~12%</td>
                        <td className="px-4 py-3 text-center"><span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">높음</span></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium">부동산 (REITs)</td>
                        <td className="px-4 py-3 text-center text-blue-600">5~8%</td>
                        <td className="px-4 py-3 text-center"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">중간</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  * 역사적 평균 기준이며 미래 수익률을 보장하지 않습니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 계산 기준 안내 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-6 text-center">계산 기준 안내</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">월복리 기준 계산</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">매월 말 적립금 납입 가정</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">이자 재투자 (복리) 적용</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">세금/수수료 미반영</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">물가상승률 미반영</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">수익률은 연평균 기준</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                참고: S&P 500 역사적 연평균 수익률 약 10% (물가 반영 전)
              </p>
            </div>
          </div>
        </section>

        {/* 참고자료 */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">참고자료</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                금융감독원
              </a>
              <a href="https://www.kofia.or.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                금융투자협회
              </a>
              <a href="https://finlife.fss.or.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                금융생활 정보포털
              </a>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/compound-interest-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
