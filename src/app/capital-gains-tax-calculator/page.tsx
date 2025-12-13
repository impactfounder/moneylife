'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import {
  calculateCapitalGainsTax,
  getTaxBurdenEvaluation,
  type CapitalGainsTaxInput,
  type CapitalGainsTaxResult
} from '@/lib/capital-gains-tax-calculator'
import { formatNumber } from '@/lib/calculations'

export default function CapitalGainsTaxCalculatorPage() {
  const [acquisitionPrice, setAcquisitionPrice] = useState('')
  const [transferPrice, setTransferPrice] = useState('')
  const [acquisitionExpense, setAcquisitionExpense] = useState('')
  const [transferExpense, setTransferExpense] = useState('')
  const [holdingPeriod, setHoldingPeriod] = useState('')
  const [isMultipleHomes, setIsMultipleHomes] = useState(false)
  const [isLongTerm, setIsLongTerm] = useState(true)
  const [result, setResult] = useState<CapitalGainsTaxResult | null>(null)
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

    const acquisition = parseInt(acquisitionPrice.replace(/,/g, '')) * 10000
    const transfer = parseInt(transferPrice.replace(/,/g, '')) * 10000
    const acqExpense = parseInt(acquisitionExpense.replace(/,/g, '')) * 10000 || 0
    const transExpense = parseInt(transferExpense.replace(/,/g, '')) * 10000 || 0
    const period = parseInt(holdingPeriod) || 1

    if (!acquisition || !transfer) {
      alert('취득가액과 양도가액을 입력해주세요')
      return
    }

    const input: CapitalGainsTaxInput = {
      acquisitionPrice: acquisition,
      transferPrice: transfer,
      acquisitionExpense: acqExpense,
      transferExpense: transExpense,
      holdingPeriod: period,
      isMultipleHomes,
      isLongTerm
    }

    const calcResult = calculateCapitalGainsTax(input)
    setResult(calcResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setAcquisitionPrice('')
    setTransferPrice('')
    setAcquisitionExpense('')
    setTransferExpense('')
    setHoldingPeriod('')
    setIsMultipleHomes(false)
    setIsLongTerm(true)
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
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-red-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-amber-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  2025년 양도소득세율 적용
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  양도소득세 계산기
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  부동산 양도 시 예상 세금을 계산합니다
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">
                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 취득가액 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          취득가액 (매입가)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={acquisitionPrice}
                            onChange={(e) => handleFormatInput(e.target.value, setAcquisitionPrice)}
                            placeholder="예: 50,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 양도가액 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          양도가액 (매도가)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={transferPrice}
                            onChange={(e) => handleFormatInput(e.target.value, setTransferPrice)}
                            placeholder="예: 70,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 취득비용 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          취득비용 (취득세, 중개료 등)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={acquisitionExpense}
                            onChange={(e) => handleFormatInput(e.target.value, setAcquisitionExpense)}
                            placeholder="예: 1,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 양도비용 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          양도비용 (중개료 등)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={transferExpense}
                            onChange={(e) => handleFormatInput(e.target.value, setTransferExpense)}
                            placeholder="예: 500"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 보유 기간 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          보유 기간
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={holdingPeriod}
                            onChange={(e) => setHoldingPeriod(e.target.value)}
                            placeholder="예: 5"
                            min="0"
                            max="50"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            년
                          </div>
                        </div>
                      </div>

                      {/* 옵션 */}
                      <div className="space-y-3">
                        <label className="flex items-center justify-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isMultipleHomes}
                            onChange={(e) => setIsMultipleHomes(e.target.checked)}
                            className="w-5 h-5 text-slate-900 rounded focus:ring-2 focus:ring-slate-200"
                          />
                          <span className="text-slate-700 font-medium">다주택자 (중과세)</span>
                        </label>
                        <label className="flex items-center justify-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isLongTerm}
                            onChange={(e) => setIsLongTerm(e.target.checked)}
                            className="w-5 h-5 text-slate-900 rounded focus:ring-2 focus:ring-slate-200"
                          />
                          <span className="text-slate-700 font-medium">장기보유특별공제 적용 (3년 이상)</span>
                        </label>
                      </div>

                      {/* 계산 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        양도소득세 계산하기
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* 결과 헤더 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">납부할 양도소득세</p>
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
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                          <span className="text-slate-600 font-medium">양도차익</span>
                          <span className="text-lg font-bold text-green-600">
                            {formatNumber(Math.round(result!.transferIncome / 10000))}만원
                          </span>
                        </div>
                        {result!.deductions > 0 && (
                          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                            <span className="text-slate-600 font-medium">장기보유공제</span>
                            <span className="text-lg font-bold text-purple-600">
                              -{formatNumber(Math.round(result!.deductions / 10000))}만원
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                          <span className="text-slate-600 font-medium">과세표준</span>
                          <span className="text-lg font-bold text-blue-600">
                            {formatNumber(Math.round(result!.taxableIncome / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                          <span className="text-slate-600 font-medium">결정세액</span>
                          <span className="text-xl font-bold text-orange-600">
                            {formatNumber(Math.round(result!.finalTax / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">실제 수익</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(Math.round(result!.netProfit / 10000))}만원
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
              <h2 className="text-xl font-bold mb-6 text-center">계산 기준 안내</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">2025년 양도소득세율 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">장기보유특별공제 최대 30%</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">기본공제 250만원</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">다주택자 중과세율 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">1세대 1주택 비과세 미적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">지방소득세 포함</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 국세청 양도소득세 규정 (2025년)
              </p>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/capital-gains-tax-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
