'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import { calculateSeverance } from '@/lib/severance-calculator'
import { formatNumber } from '@/lib/calculations'
import type { SeveranceResult } from '@/types'

export default function SeveranceCalculatorPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [averageSalary, setAverageSalary] = useState('')
  const [result, setResult] = useState<SeveranceResult | null>(null)
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

    if (!startDate || !endDate || !averageSalary) {
      alert('모든 항목을 입력해주세요')
      return
    }

    const salary = parseInt(averageSalary.replace(/,/g, '')) * 10000 // 만원 -> 원
    if (!salary || salary <= 0) {
      alert('평균임금을 올바르게 입력해주세요')
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

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* 히어로 섹션 */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50">
          {/* 배경 그라데이션 */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-orange-400/10 blur-[100px]"></div>
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

        {/* 관련 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/severance-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
