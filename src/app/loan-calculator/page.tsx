'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { RelatedContentCTA } from '@/components/ui/RelatedContentCTA'
import { getPostsByCalculator } from '@/data/posts'
import { calculateLoan } from '@/lib/loan-calculator'
import { formatNumber } from '@/lib/calculations'
import type { LoanResult } from '@/types'
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

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [years, setYears] = useState('')
  const [method, setMethod] = useState<'equal-principal-interest' | 'equal-principal'>('equal-principal-interest')
  const [result, setResult] = useState<LoanResult | null>(null)
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

    const loanAmount = parseInt(amount.replace(/,/g, '')) * 10000 // 만원 -> 원
    const rate = parseFloat(interestRate)
    const period = parseInt(years) * 12 // 년 -> 개월

    if (!loanAmount || !rate || !period) {
      alert('모든 값을 입력해주세요')
      return
    }

    const calcResult = calculateLoan({
      amount: loanAmount,
      interestRate: rate,
      months: period,
      method
    })

    setResult(calcResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setAmount('')
    setInterestRate('')
    setYears('')
    setResult(null)
  }

  // 파이 차트 데이터 (원금 vs 이자)
  const pieChartData = result ? {
    labels: ['원금', '총 이자'],
    datasets: [
      {
        data: [
          parseInt(amount.replace(/,/g, '')) * 10000,
          result.totalInterest
        ],
        backgroundColor: ['#3b82f6', '#ef4444'],
        borderWidth: 0,
      },
    ],
  } : null

  // 라인 차트 데이터 (잔액 추이)
  const getYearlyData = () => {
    if (!result) return null
    const yearlySchedule = result.schedule.filter((_, index) => index % 12 === 11 || index === 0)
    return {
      labels: yearlySchedule.map((_, i) => `${i}년`),
      datasets: [
        {
          label: '대출 잔액',
          data: yearlySchedule.map(item => Math.round(item.balance / 10000)),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
    },
  }

  const lineOptions = {
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
          callback: (value: number | string) => formatNumber(Number(value)) + '만원'
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
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-cyan-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  2025년 최신 금리 기준
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  대출 상환액 계산기
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  대출 금액과 이자율을 입력하면 월 상환액과 총 이자를 계산합니다
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">

                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 대출 금액 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          대출 금액
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={amount}
                            onChange={(e) => handleFormatInput(e.target.value, setAmount)}
                            placeholder="예: 30,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">
                          예: 3억원 = 30,000만원
                        </p>
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
                            onClick={() => setMethod('equal-principal-interest')}
                            className={`px-4 py-3 rounded-xl font-semibold transition-all text-sm ${method === 'equal-principal-interest'
                              ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                          >
                            <div>원리금균등상환</div>
                            <div className="text-xs opacity-70 mt-1">매월 같은 금액</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setMethod('equal-principal')}
                            className={`px-4 py-3 rounded-xl font-semibold transition-all text-sm ${method === 'equal-principal'
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
                      {/* 결과 헤더 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">
                          {method === 'equal-principal-interest' ? '매월 상환액' : '첫 달 상환액'}
                        </p>
                        <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                          {formatNumber(Math.round(result!.monthlyPayment / 10000))}
                          <span className="text-2xl font-bold text-slate-500 ml-1">만원</span>
                        </div>
                        {method === 'equal-principal' && (
                          <p className="text-xs text-slate-400">
                            마지막 달: {formatNumber(Math.round(result!.schedule[result!.schedule.length - 1].payment / 10000))}만원
                          </p>
                        )}
                      </div>

                      {/* 상세 결과 */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">대출 원금</span>
                          <span className="text-lg font-bold text-slate-900">
                            {amount}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                          <span className="text-slate-600 font-medium">총 이자</span>
                          <span className="text-lg font-bold text-red-600">
                            +{formatNumber(Math.round(result!.totalInterest / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                          <span className="text-slate-600 font-medium">총 상환액</span>
                          <span className="text-xl font-bold text-blue-600">
                            {formatNumber(Math.round(result!.totalPayment / 10000))}만원
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
                          href="/mortgage-calculator"
                          className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-center shadow-lg shadow-slate-200"
                        >
                          주담대 계산기
                        </Link>
                      </div>

                      {/* 관련 콘텐츠 CTA */}
                      <RelatedContentCTA
                        posts={getPostsByCalculator('/loan-calculator')}
                        title="대출에 대해 더 알아보기"
                      />
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 실제 대출 상품에 따라 금리와 조건이 다를 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 결과 상세 - 결과가 있을 때만 표시 */}
        {showResult && result && (
          <>
            {/* 차트 섹션 */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                  대출 분석
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 파이 차트 */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">원금 vs 이자 비율</h3>
                    <div className="h-[280px]">
                      {pieChartData && <Pie data={pieChartData} options={chartOptions} />}
                    </div>
                  </div>

                  {/* 라인 차트 */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">연도별 잔액 추이</h3>
                    <div className="h-[280px]">
                      {getYearlyData() && <Line data={getYearlyData()!} options={lineOptions} />}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 광고 배치 - 결과 섹션 아래 */}
            <section className="py-8 bg-white">
              <div className="container mx-auto px-4 max-w-4xl">
                <AdUnit className="my-4" />
              </div>
            </section>

            {/* 상환 요약 */}
            <section className="py-16 bg-slate-50">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                  상환 요약
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">대출 원금</p>
                    <p className="text-2xl font-black text-slate-900">
                      {amount}
                      <span className="text-base font-bold text-slate-500 ml-1">만원</span>
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">연 이자율</p>
                    <p className="text-2xl font-black text-blue-600">
                      {interestRate}
                      <span className="text-base font-bold text-blue-400 ml-1">%</span>
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">총 이자</p>
                    <p className="text-2xl font-black text-red-600">
                      {formatNumber(Math.round(result.totalInterest / 10000))}
                      <span className="text-base font-bold text-red-400 ml-1">만원</span>
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">이자 비율</p>
                    <p className="text-2xl font-black text-purple-600">
                      {((result.totalInterest / (parseInt(amount.replace(/,/g, '')) * 10000)) * 100).toFixed(1)}
                      <span className="text-base font-bold text-purple-400 ml-1">%</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 월별 상환 스케줄 */}
            <section className="py-16 bg-white">
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
                            <td className="px-4 py-3 text-right text-slate-700">{formatNumber(Math.round(item.principal / 10000))}만</td>
                            <td className="px-4 py-3 text-right text-red-500">{formatNumber(Math.round(item.interest / 10000))}만</td>
                            <td className="px-4 py-3 text-right font-bold text-slate-900">{formatNumber(Math.round(item.payment / 10000))}만</td>
                            <td className="px-4 py-3 text-right text-slate-500">{formatNumber(Math.round(item.balance / 10000))}만</td>
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
          </>
        )}

        {/* 대출 계산기 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">대출 상환 가이드</h2>

              {/* 원리금균등상환 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  원리금균등상환이란?
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  <strong className="text-slate-800">매월 동일한 금액</strong>을 상환하는 방식입니다.
                  초기에는 이자 비중이 높고, 시간이 지날수록 원금 비중이 높아집니다.
                  월 상환액이 일정하여 <strong className="text-slate-800">재정 계획</strong>을 세우기 쉽습니다.
                </p>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>장점:</strong> 매월 같은 금액이므로 예산 관리가 쉬움<br />
                    <strong>단점:</strong> 총 이자 부담이 원금균등상환보다 높음
                  </p>
                </div>
              </div>

              {/* 원금균등상환 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  원금균등상환이란?
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  <strong className="text-slate-800">매월 동일한 원금</strong>을 상환하고, 이자는 잔액에 따라 줄어드는 방식입니다.
                  초기 상환 부담이 크지만, 시간이 지날수록 상환액이 줄어듭니다.
                  <strong className="text-slate-800">총 이자 부담이 적습니다.</strong>
                </p>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-green-800 text-sm">
                    <strong>장점:</strong> 총 이자 부담이 적음, 대출 잔액이 빠르게 감소<br />
                    <strong>단점:</strong> 초기 상환 부담이 큼
                  </p>
                </div>
              </div>

              {/* 금리 유형 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  금리 유형 비교
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-800 mb-2">고정금리</h4>
                    <p className="text-sm text-slate-600">
                      대출 기간 동안 금리가 변하지 않아 상환액이 일정합니다.
                      금리 인상기에 유리합니다.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-800 mb-2">변동금리</h4>
                    <p className="text-sm text-slate-600">
                      시장 금리에 따라 대출 금리가 변동됩니다.
                      초기 금리가 낮지만 리스크가 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 참고자료 */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-slate-800 mb-4">참고자료</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>
                    <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      금융감독원 - 금융상품 비교공시 (대출금리 비교)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.bok.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      한국은행 - 기준금리 및 금융시장 동향
                    </a>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 mt-4 italic">
                  * 실제 대출 금리는 개인 신용등급, 담보 여부, 금융기관별 정책에 따라 달라질 수 있습니다.
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
                    <span className="text-slate-300">원리금균등/원금균등 상환 지원</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">월 단위 이자 계산 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">상환 스케줄 전체 제공</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">연 이자율 기준 계산</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">중도상환 미반영 (단순 계산)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">실제 금리는 금융기관별 상이</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 금융감독원 대출금리 비교공시 기준
              </p>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/loan-calculator')} />
          </div>
        </section>

        {/* 광고 배치 - Footer 위 */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <AdUnit className="my-4" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
