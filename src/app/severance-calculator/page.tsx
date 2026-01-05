'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { RelatedContentCTA } from '@/components/ui/RelatedContentCTA'
import { getPostsByCalculator } from '@/data/posts'
import { calculateSeverance } from '@/lib/severance-calculator'
import { formatNumber } from '@/lib/calculations'
import type { SeveranceResult } from '@/types'
import { DynamicPie as Pie, DynamicBar as Bar } from '@/components/charts/DynamicCharts'

export default function SeveranceCalculatorPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [averageSalary, setAverageSalary] = useState('')
  const [result, setResult] = useState<SeveranceResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    setError(null)

    if (!startDate || !endDate || !averageSalary) {
      setError('모든 항목을 입력해주세요')
      return
    }

    const salary = parseInt(averageSalary.replace(/,/g, '')) * 10000 // 만원 -> 원
    if (!salary || salary <= 0) {
      setError('평균임금을 올바르게 입력해주세요')
      return
    }

    const calcResult = calculateSeverance({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      averageSalary: salary,
    })

    setResult(calcResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setStartDate('')
    setEndDate('')
    setAverageSalary('')
    setResult(null)
  }

  // 파이 차트 데이터 (실수령 vs 세금)
  const pieChartData = result && result.workingDays >= 365 ? {
    labels: ['실수령 퇴직금', '퇴직소득세'],
    datasets: [{
      data: [
        Math.round(result.netSeverance / 10000),
        Math.round(result.severanceTax / 10000)
      ],
      backgroundColor: ['#10b981', '#ef4444'],
      borderWidth: 0,
    }],
  } : null

  // 바 차트 데이터 (세전/세금/실수령 비교)
  const barChartData = result && result.workingDays >= 365 ? {
    labels: ['세전 퇴직금', '퇴직소득세', '실수령 퇴직금'],
    datasets: [{
      data: [
        Math.round(result.severancePay / 10000),
        Math.round(result.severanceTax / 10000),
        Math.round(result.netSeverance / 10000)
      ],
      backgroundColor: ['#3b82f6', '#ef4444', '#10b981'],
      borderWidth: 0,
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
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-teal-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-yellow-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  2025년 퇴직소득세 기준
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  퇴직금 계산기
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  근속 기간과 평균임금으로 예상 퇴직금을 계산합니다
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">
                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 입사일 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          입사일
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          required
                        />
                      </div>

                      {/* 퇴직일 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          퇴직일
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          required
                        />
                      </div>

                      {/* 3개월 평균임금 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          3개월 평균임금 (월)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={averageSalary}
                            onChange={(e) => handleFormatInput(e.target.value, setAverageSalary)}
                            placeholder="예: 350"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">
                          퇴직 전 3개월 임금의 월 평균 (기본급+상여금+수당)
                        </p>
                      </div>

                      {/* 에러 메시지 */}
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <p className="text-red-600 text-sm font-medium">{error}</p>
                        </div>
                      )}

                      {/* 계산 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        퇴직금 계산하기
                      </button>
                    </form>
                  ) : result && result.workingDays < 365 ? (
                    <div className="space-y-6 text-center">
                      <div className="text-6xl">😢</div>
                      <h3 className="text-xl font-bold text-red-600">퇴직금 수령 불가</h3>
                      <p className="text-slate-600">
                        근속 기간이 <strong className="text-red-600">{result.workingDays}일</strong>로
                        1년(365일) 미만입니다.
                      </p>
                      <p className="text-sm text-slate-500">
                        근로기준법에 따라 1년 이상 근무해야 퇴직금을 받을 수 있습니다.
                      </p>
                      <button
                        onClick={handleReset}
                        className="w-full py-3.5 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        다시 계산
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* 결과 헤더 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">예상 퇴직금 (세후)</p>
                        <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                          {formatNumber(Math.round(result!.netSeverance / 10000))}
                          <span className="text-2xl font-bold text-slate-500 ml-1">만원</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          근속 {result!.workingDays}일 (약 {result!.workingYears}년)
                        </p>
                      </div>

                      {/* 상세 결과 */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">세전 퇴직금</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(Math.round(result!.severancePay / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                          <span className="text-slate-600 font-medium">퇴직소득세</span>
                          <span className="text-lg font-bold text-red-600">
                            -{formatNumber(Math.round(result!.severanceTax / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-amber-50 rounded-xl">
                          <span className="text-slate-600 font-medium">실수령 퇴직금</span>
                          <span className="text-xl font-bold text-amber-600">
                            {formatNumber(Math.round(result!.netSeverance / 10000))}만원
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

                      {/* 관련 콘텐츠 CTA */}
                      <RelatedContentCTA
                        posts={getPostsByCalculator('/severance-calculator')}
                        title="퇴직금에 대해 더 알아보기"
                      />
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 퇴직소득세는 근속연수공제 기준 간이계산입니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 차트 섹션 */}
        {showResult && result && result.workingDays >= 365 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">퇴직금 분석</h2>

              {/* 요약 카드 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">근속 기간</p>
                  <p className="text-xl font-bold text-slate-900">{result.workingYears}년</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">3개월 평균임금</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatNumber(parseInt(averageSalary.replace(/,/g, '')))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">퇴직소득세</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatNumber(Math.round(result.severanceTax / 10000))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">세금 비율</p>
                  <p className="text-xl font-bold text-purple-600">
                    {result.severancePay > 0 ? ((result.severanceTax / result.severancePay) * 100).toFixed(1) : 0}%
                  </p>
                </div>
              </div>

              {/* 차트 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pieChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">실수령 vs 세금</h3>
                    <div className="h-64">
                      <Pie data={pieChartData} options={chartOptions} />
                    </div>
                  </div>
                )}

                {barChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">금액 비교</h3>
                    <div className="h-64">
                      <Bar data={barChartData} options={barChartOptions} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 광고 배치 - 차트 섹션 아래 */}
        {showResult && result && result.workingDays >= 365 && (
          <section className="py-8 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <AdUnit className="my-4" />
            </div>
          </section>
        )}

        {/* 퇴직금 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">퇴직금 가이드</h2>

            <div className="space-y-8">
              {/* 퇴직금 계산 방법 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">퇴직금 계산 방법</h3>
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-center font-mono text-slate-700">
                    퇴직금 = <span className="text-blue-600 font-bold">1일 평균임금</span> × <span className="text-green-600 font-bold">30일</span> × <span className="text-purple-600 font-bold">(재직일수 ÷ 365)</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-bold text-blue-700 mb-2">1일 평균임금</h4>
                    <p className="text-sm text-slate-600">
                      퇴직 전 3개월간 지급받은 임금 총액을 그 기간의 총 일수로 나눈 금액
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-bold text-green-700 mb-2">30일</h4>
                    <p className="text-sm text-slate-600">
                      1년 근무 시 30일분의 평균임금을 퇴직금으로 지급
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h4 className="font-bold text-purple-700 mb-2">재직일수</h4>
                    <p className="text-sm text-slate-600">
                      입사일부터 퇴사일까지의 총 일수 (휴직 기간 포함)
                    </p>
                  </div>
                </div>
              </div>

              {/* 퇴직소득세 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">퇴직소득세 이해하기</h3>
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">근속연수공제</h4>
                    <p className="text-sm text-slate-600 mb-2">
                      근속 기간에 따라 퇴직금에서 일정 금액을 공제합니다.
                    </p>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 5년 이하: 연 30만원</li>
                      <li>• 10년 이하: 150만원 + (5년 초과 연수 × 50만원)</li>
                      <li>• 20년 이하: 400만원 + (10년 초과 연수 × 80만원)</li>
                      <li>• 20년 초과: 1,200만원 + (20년 초과 연수 × 120만원)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">퇴직소득세 계산</h4>
                    <p className="text-sm text-slate-600">
                      퇴직소득 = (퇴직금 - 근속연수공제) ÷ 근속연수 × 12<br/>
                      환산급여에 기본세율을 적용하여 산출세액 결정
                    </p>
                  </div>
                </div>
              </div>

              {/* 퇴직금 수령 방법 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">퇴직금 수령 방법 비교</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">일시금 수령</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 퇴직 시 한번에 전액 수령</li>
                      <li>• 퇴직소득세 즉시 납부</li>
                      <li>• 목돈 필요 시 유리</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">IRP(개인형퇴직연금) 이체</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 퇴직소득세 30~40% 감면</li>
                      <li>• 연금으로 분할 수령 가능</li>
                      <li>• 추가 운용 수익 기대</li>
                      <li>• 55세 이후 연금 수령</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 퇴직연금 유형 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">퇴직연금 유형</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50 rounded-xl p-4">
                    <h4 className="font-bold text-amber-700 mb-2">DB형 (확정급여형)</h4>
                    <p className="text-sm text-slate-600">
                      퇴직 시 받을 급여가 미리 확정. 회사가 운용 책임, 근로자는 안정적 수령
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-bold text-blue-700 mb-2">DC형 (확정기여형)</h4>
                    <p className="text-sm text-slate-600">
                      회사 납입금이 확정. 근로자가 직접 운용, 수익률에 따라 퇴직금 변동
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-bold text-green-700 mb-2">IRP (개인형)</h4>
                    <p className="text-sm text-slate-600">
                      개인이 추가 납입 가능. 세액공제 혜택, 자유로운 운용 가능
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
                    <span className="text-slate-300">근로기준법 퇴직금 기준 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">1년 이상 근무 시 퇴직금 지급 대상</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">퇴직금 = 1일평균임금 × 30일 × (재직일수÷365)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">퇴직소득세 근속연수공제 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">DC형 퇴직연금은 별도 계산 필요</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">IRP 수령 시 추가 세제 혜택</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 고용노동부, 국세청 퇴직소득세 기준 (2025년)
              </p>
            </div>
          </div>
        </section>

        {/* 참고자료 */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">참고자료</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.moel.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                고용노동부
              </a>
              <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                국세청
              </a>
              <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                국민연금공단
              </a>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/severance-calculator')} />
          </div>
        </section>

        {/* 광고 배치 - Footer 위 */}
        <section className="py-8 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <AdUnit className="my-4" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
