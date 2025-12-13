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

                      {/* 세율 구간 */}
                      {result!.breakdown.length > 0 && (
                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-sm font-bold text-slate-700 mb-3">세율 구간별 상세</p>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {result!.breakdown.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-slate-500">{item.bracket} ({item.rate}%)</span>
                                <span className="text-slate-700 font-medium">{formatNumber(Math.round(item.tax / 10000))}만원</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

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

        {/* 관련 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/income-tax-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
