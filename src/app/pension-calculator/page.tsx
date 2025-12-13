'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import {
  calculatePension,
  getPensionEvaluation,
  type PensionInput,
  type PensionResult
} from '@/lib/pension-calculator'
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
import { Pie, Bar, Line } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement)

export default function PensionCalculatorPage() {
  const [currentAge, setCurrentAge] = useState('')
  const [monthlyIncome, setMonthlyIncome] = useState('')
  const [joinedYears, setJoinedYears] = useState('')
  const [retirementAge, setRetirementAge] = useState('65')
  const [result, setResult] = useState<PensionResult | null>(null)
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

    const age = parseInt(currentAge)
    const income = parseInt(monthlyIncome.replace(/,/g, '')) * 10000
    const years = parseInt(joinedYears)
    const retirement = parseInt(retirementAge)

    if (!age || !income || !years || !retirement) {
      alert('모든 값을 입력해주세요')
      return
    }

    const input: PensionInput = {
      currentAge: age,
      averageMonthlyIncome: income,
      joinedYears: years,
      expectedRetirementAge: retirement
    }

    const calcResult = calculatePension(input)
    setResult(calcResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setCurrentAge('')
    setMonthlyIncome('')
    setJoinedYears('')
    setRetirementAge('65')
    setResult(null)
  }

  // 파이 차트 데이터 (납부액 vs 수령액)
  const pieChartData = result ? {
    labels: ['총 납부액', '순수익 (수령액 - 납부액)'],
    datasets: [{
      data: [
        Math.round(result.totalContribution / 10000),
        Math.max(0, Math.round((result.totalLifetimeReceive - result.totalContribution) / 10000))
      ],
      backgroundColor: ['#3b82f6', '#10b981'],
      borderWidth: 0,
    }],
  } : null

  // 바 차트 데이터 (총 납부액 vs 평생 수령액)
  const barChartData = result ? {
    labels: ['총 납부 예상액', '평생 예상 수령액'],
    datasets: [{
      data: [
        Math.round(result.totalContribution / 10000),
        Math.round(result.totalLifetimeReceive / 10000)
      ],
      backgroundColor: ['#f59e0b', '#10b981'],
      borderWidth: 0,
      borderRadius: 8,
    }],
  } : null

  // 라인 차트 데이터 (연령별 누적 수령액)
  const getLineChartData = () => {
    if (!result) return null

    const startAge = 65
    const endAge = 85
    const data = []
    const labels = []

    for (let age = startAge; age <= endAge; age += 5) {
      const yearsReceiving = age - startAge
      const cumulativeReceive = result.expectedMonthlyPension * 12 * yearsReceiving
      labels.push(`${age}세`)
      data.push(Math.round(cumulativeReceive / 10000))
    }

    return {
      labels,
      datasets: [{
        label: '누적 수령액',
        data,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }],
    }
  }

  const lineChartData = getLineChartData()

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
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-green-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-teal-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  2025년 국민연금 기준
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  국민연금 계산기
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  예상 국민연금 수령액과 손익분기 나이를 계산합니다
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">
                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 현재 나이 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          현재 나이
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(e.target.value)}
                            placeholder="예: 35"
                            min="20"
                            max="70"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            세
                          </div>
                        </div>
                      </div>

                      {/* 평균 월소득 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          평균 월소득
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={monthlyIncome}
                            onChange={(e) => handleFormatInput(e.target.value, setMonthlyIncome)}
                            placeholder="예: 350"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 가입 기간 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          현재까지 가입 기간
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={joinedYears}
                            onChange={(e) => setJoinedYears(e.target.value)}
                            placeholder="예: 10"
                            min="0"
                            max="40"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            년
                          </div>
                        </div>
                      </div>

                      {/* 예상 은퇴 나이 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          예상 은퇴 나이
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(e.target.value)}
                            placeholder="예: 65"
                            min="50"
                            max="75"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            세
                          </div>
                        </div>
                      </div>

                      {/* 계산 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        연금 수령액 계산하기
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* 결과 헤더 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">예상 월 연금 수령액</p>
                        <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                          {formatNumber(Math.round(result!.expectedMonthlyPension / 10000))}
                          <span className="text-2xl font-bold text-slate-500 ml-1">만원</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          {getPensionEvaluation(result!.expectedMonthlyPension)}
                        </p>
                      </div>

                      {/* 상세 결과 */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">월 납부액</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(Math.round(result!.monthlyContribution / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                          <span className="text-slate-600 font-medium">총 납부 예상액</span>
                          <span className="text-lg font-bold text-blue-600">
                            {formatNumber(Math.round(result!.totalContribution / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                          <span className="text-slate-600 font-medium">평생 예상 수령액</span>
                          <span className="text-xl font-bold text-green-600">
                            {formatNumber(Math.round(result!.totalLifetimeReceive / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                          <span className="text-slate-600 font-medium">손익분기 나이</span>
                          <span className="text-lg font-bold text-purple-600">
                            {result!.breakEvenAge}세
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
                          href="/severance-calculator"
                          className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-center shadow-lg shadow-slate-200"
                        >
                          퇴직금 계산기
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 단순 예상치이며 실제 수령액은 A값, B값 등에 따라 달라집니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 차트 섹션 */}
        {showResult && result && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">연금 분석</h2>

              {/* 요약 카드 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">예상 가입 기간</p>
                  <p className="text-xl font-bold text-slate-900">
                    {parseInt(joinedYears) + (parseInt(retirementAge) - parseInt(currentAge))}년
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">월 납부액</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatNumber(Math.round(result.monthlyContribution / 10000))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">손익분기점</p>
                  <p className="text-xl font-bold text-purple-600">{result.breakEvenAge}세</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">수익률</p>
                  <p className="text-xl font-bold text-green-600">
                    {result.totalContribution > 0 ? ((result.totalLifetimeReceive / result.totalContribution - 1) * 100).toFixed(0) : 0}%
                  </p>
                </div>
              </div>

              {/* 차트 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {pieChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">납부액 vs 순수익</h3>
                    <div className="h-64">
                      <Pie data={pieChartData} options={chartOptions} />
                    </div>
                  </div>
                )}

                {barChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">납부액 vs 수령액</h3>
                    <div className="h-64">
                      <Bar data={barChartData} options={barChartOptions} />
                    </div>
                  </div>
                )}
              </div>

              {lineChartData && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">연령별 누적 수령액 추이</h3>
                  <div className="h-64">
                    <Line data={lineChartData} options={barChartOptions} />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 국민연금 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">국민연금 가이드</h2>

            <div className="space-y-8">
              {/* 연금 계산 공식 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">연금액 계산 공식</h3>
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-center font-mono text-sm text-slate-700">
                    기본연금액 = <span className="text-blue-600 font-bold">1.2</span> × (<span className="text-green-600 font-bold">A값 + B값</span>) × <span className="text-purple-600 font-bold">(1 + 0.05n)</span> / 12
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-bold text-blue-700 mb-2">A값 (균등부분)</h4>
                    <p className="text-sm text-slate-600">
                      전체 가입자의 3년간 평균소득월액의 평균값
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-bold text-green-700 mb-2">B값 (소득비례)</h4>
                    <p className="text-sm text-slate-600">
                      본인의 가입기간 중 기준소득월액의 평균값
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h4 className="font-bold text-purple-700 mb-2">n (가입년수)</h4>
                    <p className="text-sm text-slate-600">
                      20년 초과 가입기간 (최대 소득대체율 40%)
                    </p>
                  </div>
                </div>
              </div>

              {/* 수령 시기별 연금액 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">수령 시기별 연금액 변화</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 mb-2">조기 수령 (60~64세)</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 1년당 6% 감액</li>
                      <li>• 5년 조기 수령 시 30% 감액</li>
                      <li>• 평생 감액된 금액 수령</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 mb-2">정상 수령 (65세)</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 기본 연금액 100% 수령</li>
                      <li>• 가입기간 10년 이상 필요</li>
                      <li>• 출생년도별 수령 나이 상이</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                    <h4 className="font-bold text-green-700 mb-2">연기 수령 (66~70세)</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 1년당 7.2% 증액</li>
                      <li>• 5년 연기 시 36% 증액</li>
                      <li>• 평생 증액된 금액 수령</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 연금 종류 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">국민연금 종류</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">노령연금</h4>
                    <p className="text-sm text-slate-600">
                      가입기간 10년 이상, 65세 이상인 경우 매월 지급되는 연금
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">장애연금</h4>
                    <p className="text-sm text-slate-600">
                      가입 중 발생한 질병 또는 부상으로 장애가 남은 경우 지급
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">유족연금</h4>
                    <p className="text-sm text-slate-600">
                      국민연금 가입자 또는 수급자 사망 시 유족에게 지급
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">반환일시금</h4>
                    <p className="text-sm text-slate-600">
                      가입기간 10년 미만, 60세 도달 시 납부액 반환
                    </p>
                  </div>
                </div>
              </div>

              {/* 연금 수령 전략 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">연금 수령 전략</h3>
                <div className="space-y-4">
                  <div className="bg-amber-50 rounded-xl p-4">
                    <h4 className="font-bold text-amber-700 mb-2">기대수명이 긴 경우</h4>
                    <p className="text-sm text-slate-600">
                      연기 연금 선택이 유리합니다. 70세까지 연기하면 평생 36% 증액된 연금을 받을 수 있습니다.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-bold text-blue-700 mb-2">건강이 좋지 않은 경우</h4>
                    <p className="text-sm text-slate-600">
                      조기 연금을 고려할 수 있습니다. 다만 감액된 금액이 평생 적용되므로 신중히 결정하세요.
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-bold text-green-700 mb-2">임의가입으로 가입기간 늘리기</h4>
                    <p className="text-sm text-slate-600">
                      전업주부, 프리랜서 등도 임의가입으로 가입기간을 늘려 연금액을 증가시킬 수 있습니다.
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
              <h2 className="text-xl font-bold mb-6 text-center">계산 기준 안내</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">2025년 국민연금 보험료율 9%</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">소득대체율 40% 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">평생 수령액은 85세 기준</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">조기수령 시 감액, 연기 시 증액</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">실제 수령액은 물가상승률 반영</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">가입기간 10년 이상 필요</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 국민연금공단 (2025년)
              </p>
            </div>
          </div>
        </section>

        {/* 참고자료 */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">참고자료</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                국민연금공단
              </a>
              <a href="https://minwon.nps.or.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                국민연금 민원마당
              </a>
              <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                보건복지부
              </a>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/pension-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
