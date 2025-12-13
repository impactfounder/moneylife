'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import { calculateSalary } from '@/lib/salary-calculator'
import { formatNumber } from '@/lib/calculations'
import type { SalaryResult } from '@/types'

export default function SalaryCalculatorPage() {
  const [grossSalary, setGrossSalary] = useState('')
  const [dependents, setDependents] = useState('1')
  const [childrenUnder20, setChildrenUnder20] = useState('0')
  const [result, setResult] = useState<SalaryResult | null>(null)
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

    const gross = parseInt(grossSalary.replace(/,/g, '')) * 10000 // 만원 -> 원
    if (!gross || gross <= 0) {
      alert('세전 급여를 입력해주세요')
      return
    }

    const calcResult = calculateSalary({
      grossSalary: gross,
      dependents: parseInt(dependents) || 1,
      childrenUnder20: parseInt(childrenUnder20) || 0,
    })

    setResult(calcResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setGrossSalary('')
    setDependents('1')
    setChildrenUnder20('0')
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
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-teal-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  2025년 4대보험 요율 적용
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  급여 실수령액 계산기
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  세전 급여에서 4대보험과 세금을 제외한 실수령액을 계산합니다
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">
                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 세전 급여 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          세전 급여 (월)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={grossSalary}
                            onChange={(e) => handleFormatInput(e.target.value, setGrossSalary)}
                            placeholder="예: 350"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">
                          예: 월 350만원 = 350
                        </p>
                      </div>

                      {/* 부양가족 수 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          부양가족 수 (본인 포함)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={dependents}
                            onChange={(e) => setDependents(e.target.value)}
                            placeholder="1"
                            min="1"
                            max="10"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            명
                          </div>
                        </div>
                      </div>

                      {/* 20세 이하 자녀 수 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          20세 이하 자녀 수
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={childrenUnder20}
                            onChange={(e) => setChildrenUnder20(e.target.value)}
                            placeholder="0"
                            min="0"
                            max="10"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            명
                          </div>
                        </div>
                      </div>

                      {/* 계산 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        실수령액 계산하기
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* 결과 헤더 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">월 실수령액</p>
                        <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                          {formatNumber(Math.round(result!.netSalary / 10000))}
                          <span className="text-2xl font-bold text-slate-500 ml-1">만원</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          세전 대비 약 {((result!.netSalary / result!.grossSalary) * 100).toFixed(1)}% 수령
                        </p>
                      </div>

                      {/* 상세 결과 */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">세전 급여</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(Math.round(result!.grossSalary / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                          <span className="text-slate-600 font-medium">총 공제액</span>
                          <span className="text-lg font-bold text-red-600">
                            -{formatNumber(Math.round(result!.totalDeductions / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                          <span className="text-slate-600 font-medium">실수령액</span>
                          <span className="text-xl font-bold text-blue-600">
                            {formatNumber(Math.round(result!.netSalary / 10000))}만원
                          </span>
                        </div>
                      </div>

                      {/* 공제 상세 내역 */}
                      <div className="pt-4 border-t border-slate-200">
                        <p className="text-sm font-bold text-slate-700 mb-3">공제 상세 내역</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-500">국민연금</span>
                            <span className="text-slate-700">-{formatNumber(result!.nationalPension)}원</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">건강보험</span>
                            <span className="text-slate-700">-{formatNumber(result!.healthInsurance)}원</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">장기요양보험</span>
                            <span className="text-slate-700">-{formatNumber(result!.longTermCare)}원</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">고용보험</span>
                            <span className="text-slate-700">-{formatNumber(result!.employmentInsurance)}원</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">소득세</span>
                            <span className="text-slate-700">-{formatNumber(result!.incomeTax)}원</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">지방소득세</span>
                            <span className="text-slate-700">-{formatNumber(result!.localIncomeTax)}원</span>
                          </div>
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
                          href="/salary-rank"
                          className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-center shadow-lg shadow-slate-200"
                        >
                          연봉 순위 확인
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 2025년 4대보험 요율 및 간이세액표 기준
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
                    <span className="text-slate-300">2025년 4대보험 요율 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">국민연금 상한액: 월 617만원</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">건강보험료율: 7.09% (근로자 3.545%)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">장기요양보험료율: 건강보험의 12.95%</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">고용보험료율: 0.9%</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">간이세액표 기준 소득세 계산</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 국민건강보험공단, 국세청 간이세액표 (2025년)
              </p>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/salary-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
