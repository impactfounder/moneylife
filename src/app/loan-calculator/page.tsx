'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import { calculateLoan } from '@/lib/loan-calculator'
import { formatNumber } from '@/lib/calculations'
import type { LoanResult } from '@/types'

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
                  🏦 2025년 최신 금리 기준
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
                        💰 상환액 계산하기
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

        {/* 결과 상세 (스케줄) - 결과가 있을 때만 표시 */}
        {showResult && result && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                📊 월별 상환 스케줄
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
        )}

        {/* 관련 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/loan-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
