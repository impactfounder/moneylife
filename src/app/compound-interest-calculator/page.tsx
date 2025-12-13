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

                      {/* 연도별 성장 */}
                      <div className="pt-4 border-t border-slate-200">
                        <p className="text-sm font-bold text-slate-700 mb-3">연도별 자산 증가</p>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {result!.yearlyData.map(item => (
                            <div key={item.year} className="flex justify-between text-sm">
                              <span className="text-slate-500">{item.year}년차</span>
                              <span className="text-slate-700 font-medium">{formatNumber(Math.round(item.balance / 10000))}만원</span>
                            </div>
                          ))}
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

        {/* 관련 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/compound-interest-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
