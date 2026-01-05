'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { RelatedContentCTA } from '@/components/ui/RelatedContentCTA'
import { HelpTooltip } from '@/components/ui/Tooltip'
import { DynamicPie as Pie, DynamicBar as Bar } from '@/components/charts/DynamicCharts'
import { getPostsByCalculator } from '@/data/posts'
import { calculateSalary, getTaxExemptLimits } from '@/lib/salary-calculator'
import { formatNumber } from '@/lib/calculations'
import type { SalaryResult } from '@/types'

export default function SalaryCalculatorPage() {
  const [grossSalary, setGrossSalary] = useState('')
  const [dependents, setDependents] = useState('1')
  const [childrenUnder20, setChildrenUnder20] = useState('0')
  const [result, setResult] = useState<SalaryResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 상세 설정 (비과세 & 성과급)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [mealAllowance, setMealAllowance] = useState('')
  const [carAllowance, setCarAllowance] = useState('')
  const [childcareAllowance, setChildcareAllowance] = useState('')
  const [researchAllowance, setResearchAllowance] = useState('')
  const [otherExempt, setOtherExempt] = useState('')
  const [incentive, setIncentive] = useState('')

  const taxExemptLimits = getTaxExemptLimits()

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

    const gross = parseInt(grossSalary.replace(/,/g, '')) * 10000 // 만원 -> 원
    if (!gross || gross <= 0) {
      setError('세전 급여를 입력해주세요')
      return
    }

    // 비과세 항목 (만원 -> 원)
    const taxExempt = showAdvanced ? {
      mealAllowance: parseInt(mealAllowance.replace(/,/g, '') || '0') * 10000,
      carAllowance: parseInt(carAllowance.replace(/,/g, '') || '0') * 10000,
      childcareAllowance: parseInt(childcareAllowance.replace(/,/g, '') || '0') * 10000,
      researchAllowance: parseInt(researchAllowance.replace(/,/g, '') || '0') * 10000,
      otherExempt: parseInt(otherExempt.replace(/,/g, '') || '0') * 10000,
    } : undefined

    // 성과급 (만원 -> 원)
    const incentiveData = showAdvanced && incentive ? {
      amount: parseInt(incentive.replace(/,/g, '') || '0') * 10000,
    } : undefined

    const calcResult = calculateSalary({
      grossSalary: gross,
      dependents: parseInt(dependents) || 1,
      childrenUnder20: parseInt(childrenUnder20) || 0,
      taxExempt,
      incentive: incentiveData,
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
    setError(null)
    // 상세 설정 초기화
    setMealAllowance('')
    setCarAllowance('')
    setChildcareAllowance('')
    setResearchAllowance('')
    setOtherExempt('')
    setIncentive('')
  }

  // 파이 차트 데이터
  const pieChartData = result ? {
    labels: ['실수령액', '4대보험', '세금'],
    datasets: [
      {
        data: [
          result.netSalary,
          result.nationalPension + result.healthInsurance + result.longTermCare + result.employmentInsurance,
          result.incomeTax + result.localIncomeTax
        ],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 0,
      },
    ],
  } : null

  // 바 차트 데이터 (공제 항목별)
  const barChartData = result ? {
    labels: ['국민연금', '건강보험', '장기요양', '고용보험', '소득세', '지방소득세'],
    datasets: [
      {
        label: '공제액 (원)',
        data: [
          result.nationalPension,
          result.healthInsurance,
          result.longTermCare,
          result.employmentInsurance,
          result.incomeTax,
          result.localIncomeTax
        ],
        backgroundColor: ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#f97316'],
        borderRadius: 8,
      },
    ],
  } : null

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

  const barOptions = {
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
          callback: (value: number | string) => formatNumber(Number(value)) + '원'
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
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-teal-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  2026년 4대보험 요율 적용
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
                    <form onSubmit={handleCalculate} className="space-y-6" aria-label="급여 실수령액 계산기">
                      {/* 에러 메시지 */}
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <p className="text-red-600 text-sm font-medium">{error}</p>
                        </div>
                      )}

                      {/* 세전 급여 */}
                      <div>
                        <label htmlFor="grossSalary" className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          세전 급여 (월)
                          <HelpTooltip content="4대보험, 세금 공제 전 급여입니다" />
                        </label>
                        <div className="relative">
                          <input
                            id="grossSalary"
                            type="text"
                            inputMode="numeric"
                            value={grossSalary}
                            onChange={(e) => {
                              handleFormatInput(e.target.value, setGrossSalary)
                              if (error) setError(null)
                            }}
                            placeholder="예: 350"
                            aria-describedby="grossSalaryHint"
                            aria-invalid={error ? 'true' : 'false'}
                            className={`w-full px-4 py-4 text-2xl font-bold text-center border-2 rounded-xl focus:ring-2 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900 ${
                              error
                                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                                : 'border-slate-200 focus:border-slate-900 focus:ring-slate-200'
                            }`}
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                        <p id="grossSalaryHint" className="text-xs text-slate-400 mt-2 text-center">
                          예: 월 350만원 = 350
                        </p>
                      </div>

                      {/* 부양가족 수 */}
                      <div>
                        <label htmlFor="dependents" className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          부양가족 수 (본인 포함)
                          <HelpTooltip content="본인을 포함한 부양가족 수입니다. 세금 공제 산정에 사용됩니다" />
                        </label>
                        <div className="relative">
                          <input
                            id="dependents"
                            type="number"
                            inputMode="numeric"
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

                      {/* 상세 설정 토글 */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAdvanced(!showAdvanced)}
                          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          상세 설정 (비과세/성과급)
                        </button>
                      </div>

                      {/* 상세 설정 영역 */}
                      {showAdvanced && (
                        <div className="space-y-6 pt-4 border-t border-slate-200">
                          {/* 비과세 항목 섹션 */}
                          <div>
                            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                              <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">₩</span>
                              비과세 항목 (월)
                            </h3>
                            <div className="space-y-3">
                              {/* 식대 */}
                              <div className="flex items-center gap-3">
                                <label className="w-24 text-sm text-slate-600 shrink-0">식대</label>
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    value={mealAllowance}
                                    onChange={(e) => handleFormatInput(e.target.value, setMealAllowance)}
                                    placeholder="0"
                                    className="w-full px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-1 focus:ring-slate-200 bg-slate-50 focus:bg-white text-slate-900"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">만원</span>
                                </div>
                                <span className="text-xs text-slate-400 whitespace-nowrap">한도 {taxExemptLimits.mealAllowance / 10000}만</span>
                              </div>

                              {/* 자가운전보조금 */}
                              <div className="flex items-center gap-3">
                                <label className="w-24 text-sm text-slate-600 shrink-0">자가운전</label>
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    value={carAllowance}
                                    onChange={(e) => handleFormatInput(e.target.value, setCarAllowance)}
                                    placeholder="0"
                                    className="w-full px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-1 focus:ring-slate-200 bg-slate-50 focus:bg-white text-slate-900"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">만원</span>
                                </div>
                                <span className="text-xs text-slate-400 whitespace-nowrap">한도 {taxExemptLimits.carAllowance / 10000}만</span>
                              </div>

                              {/* 육아수당 */}
                              <div className="flex items-center gap-3">
                                <label className="w-24 text-sm text-slate-600 shrink-0">육아수당</label>
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    value={childcareAllowance}
                                    onChange={(e) => handleFormatInput(e.target.value, setChildcareAllowance)}
                                    placeholder="0"
                                    className="w-full px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-1 focus:ring-slate-200 bg-slate-50 focus:bg-white text-slate-900"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">만원</span>
                                </div>
                                <span className="text-xs text-slate-400 whitespace-nowrap">한도 {taxExemptLimits.childcareAllowance / 10000}만</span>
                              </div>

                              {/* 연구활동비 */}
                              <div className="flex items-center gap-3">
                                <label className="w-24 text-sm text-slate-600 shrink-0">연구활동비</label>
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    value={researchAllowance}
                                    onChange={(e) => handleFormatInput(e.target.value, setResearchAllowance)}
                                    placeholder="0"
                                    className="w-full px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-1 focus:ring-slate-200 bg-slate-50 focus:bg-white text-slate-900"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">만원</span>
                                </div>
                                <span className="text-xs text-slate-400 whitespace-nowrap">실비정산</span>
                              </div>

                              {/* 기타 비과세 */}
                              <div className="flex items-center gap-3">
                                <label className="w-24 text-sm text-slate-600 shrink-0">기타</label>
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    value={otherExempt}
                                    onChange={(e) => handleFormatInput(e.target.value, setOtherExempt)}
                                    placeholder="0"
                                    className="w-full px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-1 focus:ring-slate-200 bg-slate-50 focus:bg-white text-slate-900"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">만원</span>
                                </div>
                                <span className="text-xs text-slate-400 whitespace-nowrap">직접입력</span>
                              </div>
                            </div>
                          </div>

                          {/* 성과급 섹션 */}
                          <div className="pt-4 border-t border-slate-100">
                            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">★</span>
                              성과급 (연간)
                            </h3>
                            <div className="flex items-center gap-3">
                              <label className="w-24 text-sm text-slate-600 shrink-0">예상 성과급</label>
                              <div className="relative flex-1">
                                <input
                                  type="text"
                                  value={incentive}
                                  onChange={(e) => handleFormatInput(e.target.value, setIncentive)}
                                  placeholder="0"
                                  className="w-full px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-1 focus:ring-slate-200 bg-slate-50 focus:bg-white text-slate-900"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">만원</span>
                              </div>
                              <span className="text-xs text-slate-400 whitespace-nowrap">PS/PI</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 ml-[108px]">
                              성과급 포함 시 세율 구간 변동을 확인할 수 있습니다
                            </p>
                          </div>
                        </div>
                      )}

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
                        {result!.taxExemptTotal && result!.taxExemptTotal > 0 && (
                          <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                            <span className="text-slate-600 font-medium">비과세 금액</span>
                            <span className="text-lg font-bold text-green-600">
                              {formatNumber(Math.round(result!.taxExemptTotal / 10000))}만원
                            </span>
                          </div>
                        )}
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

                      {/* 성과급 비교 결과 */}
                      {result!.incentiveResult && (
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                          <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <span className="text-blue-500">★</span> 성과급 포함 시뮬레이션
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">성과급 포함 연봉</span>
                              <span className="font-bold text-slate-900">{formatNumber(result!.incentiveResult.grossWithIncentive)}만원</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">성과급 세금</span>
                              <span className="font-bold text-red-600">-{formatNumber(Math.round(result!.incentiveResult.incentiveTax / 10000))}만원</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">성과급 실수령액</span>
                              <span className="font-bold text-blue-600">{formatNumber(Math.round(result!.incentiveResult.incentiveNetAmount / 10000))}만원</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-blue-200">
                              <span className="text-slate-700 font-medium">연간 총 실수령액</span>
                              <span className="font-black text-indigo-600">{formatNumber(result!.incentiveResult.netWithIncentive)}만원</span>
                            </div>
                            {result!.incentiveResult.taxBracketChange && (
                              <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                                <p className="text-xs text-amber-700 font-medium">
                                  ⚠️ 세율 구간 변동: {result!.incentiveResult.taxBracketChange.beforeBracket} → {result!.incentiveResult.taxBracketChange.afterBracket}
                                  <span className="ml-1 text-amber-600">
                                    (+{(result!.incentiveResult.taxBracketChange.rateIncrease * 100).toFixed(0)}%p)
                                  </span>
                                </p>
                              </div>
                            )}
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
                          href="/salary-rank"
                          className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-center shadow-lg shadow-slate-200"
                        >
                          연봉 순위 확인
                        </Link>
                      </div>

                      {/* 관련 콘텐츠 CTA */}
                      <RelatedContentCTA
                        posts={getPostsByCalculator('/salary-calculator')}
                        title="급여에 대해 더 알아보기"
                      />
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 2026년 4대보험 요율 및 간이세액표 기준
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 결과 상세 섹션 - 결과가 있을 때만 표시 */}
        {showResult && result && (
          <>
            {/* 급여 구성 비율 차트 */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                  급여 구성 비율
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 파이 차트 */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">구성 비율</h3>
                    <div className="h-[280px]">
                      {pieChartData && <Pie data={pieChartData} options={chartOptions} />}
                    </div>
                  </div>

                  {/* 바 차트 */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">공제 항목별 금액</h3>
                    <div className="h-[280px]">
                      {barChartData && <Bar data={barChartData} options={barOptions} />}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 공제 내역 상세 */}
            <section className="py-16 bg-slate-50">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                  공제 내역 상세
                </h2>
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                  {/* 비과세 (있는 경우) */}
                  {result.taxExemptTotal && result.taxExemptTotal > 0 && (
                    <>
                      <div className="bg-green-50 px-6 py-4 border-b border-slate-200">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-900">비과세 금액</span>
                          <span className="text-lg font-bold text-green-600">
                            {formatNumber(result.taxExemptTotal)}원
                          </span>
                        </div>
                      </div>
                      <div className="px-6 py-4 border-b border-slate-200">
                        <p className="text-sm text-slate-600">
                          비과세 항목은 4대보험 및 소득세 과세표준에서 제외됩니다.
                        </p>
                      </div>
                    </>
                  )}

                  {/* 4대보험 */}
                  <div className="bg-amber-50 px-6 py-4 border-b border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">4대보험 공제</span>
                      <span className="text-lg font-bold text-amber-600">
                        -{formatNumber(result.nationalPension + result.healthInsurance + result.longTermCare + result.employmentInsurance)}원
                      </span>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="px-6 py-4 flex justify-between">
                      <span className="text-slate-600">국민연금 (4.75%)</span>
                      <span className="font-medium text-slate-900">{formatNumber(result.nationalPension)}원</span>
                    </div>
                    <div className="px-6 py-4 flex justify-between">
                      <span className="text-slate-600">건강보험 (3.595%)</span>
                      <span className="font-medium text-slate-900">{formatNumber(result.healthInsurance)}원</span>
                    </div>
                    <div className="px-6 py-4 flex justify-between">
                      <span className="text-slate-600">장기요양보험 (건보의 13.14%)</span>
                      <span className="font-medium text-slate-900">{formatNumber(result.longTermCare)}원</span>
                    </div>
                    <div className="px-6 py-4 flex justify-between">
                      <span className="text-slate-600">고용보험 (0.9%)</span>
                      <span className="font-medium text-slate-900">{formatNumber(result.employmentInsurance)}원</span>
                    </div>
                  </div>

                  {/* 세금 */}
                  <div className="bg-red-50 px-6 py-4 border-t-2 border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">세금 공제</span>
                      <span className="text-lg font-bold text-red-600">
                        -{formatNumber(result.incomeTax + result.localIncomeTax)}원
                      </span>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="px-6 py-4 flex justify-between">
                      <span className="text-slate-600">소득세</span>
                      <span className="font-medium text-slate-900">{formatNumber(result.incomeTax)}원</span>
                    </div>
                    <div className="px-6 py-4 flex justify-between">
                      <span className="text-slate-600">지방소득세 (소득세의 10%)</span>
                      <span className="font-medium text-slate-900">{formatNumber(result.localIncomeTax)}원</span>
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

            {/* 연간 급여 요약 */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                  연간 급여 요약
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-2xl p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">연간 세전 급여</p>
                    <p className="text-3xl font-black text-slate-900">
                      {formatNumber(Math.round(result.grossSalary * 12 / 10000))}
                      <span className="text-lg font-bold text-slate-500 ml-1">만원</span>
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-2xl p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">연간 공제액</p>
                    <p className="text-3xl font-black text-red-600">
                      {formatNumber(Math.round(result.totalDeductions * 12 / 10000))}
                      <span className="text-lg font-bold text-red-400 ml-1">만원</span>
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">연간 실수령액</p>
                    <p className="text-3xl font-black text-green-600">
                      {formatNumber(Math.round(result.netSalary * 12 / 10000))}
                      <span className="text-lg font-bold text-green-400 ml-1">만원</span>
                    </p>
                  </div>
                </div>

                {/* 성과급 포함 비교 (있는 경우) */}
                {result.incentiveResult && (
                  <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">
                      성과급 포함 vs 미포함 비교
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">성과급 미포함</p>
                        <p className="text-2xl font-black text-slate-700">
                          {formatNumber(result.annualNet)}만원
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">성과급 포함</p>
                        <p className="text-2xl font-black text-indigo-600">
                          {formatNumber(result.incentiveResult.netWithIncentive)}만원
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          +{formatNumber(result.incentiveResult.netWithIncentive - result.annualNet)}만원
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* 급여 계산기 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">급여 계산기 가이드</h2>

              {/* 4대보험이란? */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  4대보험이란?
                  <span className="text-sm font-normal text-slate-500 ml-2">(2026년 기준)</span>
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  4대보험은 국민연금, 건강보험, 고용보험, 산재보험을 말합니다.
                  <strong className="text-slate-800"> 국민연금(4.75%)</strong>,
                  <strong className="text-slate-800"> 건강보험(3.595%)</strong>,
                  <strong className="text-slate-800"> 장기요양보험(건강보험료의 13.14%)</strong>,
                  <strong className="text-slate-800"> 고용보험(0.9%)</strong>이 급여에서 공제됩니다.
                  산재보험은 회사가 전액 부담하므로 근로자 급여에서는 공제되지 않습니다.
                </p>
              </div>

              {/* 소득세와 지방소득세 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  소득세와 지방소득세
                  <span className="text-sm font-normal text-slate-500 ml-2">(2026년 기준)</span>
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  소득세는 과세표준에 따라 <strong className="text-slate-800">6~45%의 8단계 누진세율</strong>이 적용됩니다.
                  지방소득세는 소득세의 10%입니다. 부양가족과 자녀가 많을수록 공제액이 커져 세금이 줄어듭니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600">
                  <strong className="text-slate-800">소득세 세율표:</strong> 1,400만원 이하 6%, 5,000만원 이하 15%, 8,800만원 이하 24%,
                  1억5천만원 이하 35%, 3억원 이하 38%, 5억원 이하 40%, 10억원 이하 42%, 10억원 초과 45%
                </div>
              </div>

              {/* 비과세 항목 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  비과세 항목
                  <span className="text-sm font-normal text-slate-500 ml-2">(2026년 기준)</span>
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span><strong className="text-slate-800">식대:</strong> 월 20만원까지 비과세</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span><strong className="text-slate-800">자가운전보조금:</strong> 월 20만원까지 비과세 (본인 차량 업무 사용시)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span><strong className="text-slate-800">육아수당:</strong> 월 10만원까지 비과세 (6세 이하 자녀)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span><strong className="text-slate-800">연구활동비:</strong> 연구직 종사자의 실비 정산 금액</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>야간근로수당, 출산·보육수당, 학자금 등</span>
                  </li>
                </ul>
              </div>

              {/* 성과급 안내 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  성과급(PS/PI) 세금 계산
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  성과급은 연간 총 급여에 합산되어 과세됩니다. 성과급이 포함되면 <strong className="text-slate-800">과세표준 구간이 올라갈 수 있어</strong>
                  세율이 높아질 수 있습니다. 상세 설정에서 예상 성과급을 입력하면 세율 구간 변동 여부를 확인할 수 있습니다.
                </p>
                <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
                  <strong>💡 Tip:</strong> 성과급이 세율 구간 경계에 걸리면 일부만 높은 세율이 적용됩니다.
                  예를 들어 과세표준이 4,800만원인 상태에서 400만원 성과급을 받으면, 초과분 200만원만 24% 세율이 적용됩니다.
                </div>
              </div>

              {/* 참고자료 */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-slate-800 mb-4">참고자료</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>
                    <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      국민연금공단 - 국민연금 보험료 (2026년 상한액: 637만원, 보험료율 9.5%)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      국민건강보험공단 - 건강보험료 안내 (2026년 보수월액 3.595%)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      국세청 - 소득세법 및 세율표 (2026년 기준)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.comwel.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      근로복지공단 - 고용보험 안내 (0.9%)
                    </a>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 mt-4 italic">
                  * 본 계산기는 2026년 보험료율 및 세법을 반영하였습니다. 간이세액표 기준으로 계산되며, 연말정산 시 실제 세액과 차이가 있을 수 있습니다.
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
                    <span className="text-slate-300">2026년 4대보험 요율 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">국민연금: 9.5% (근로자 4.75%), 상한액 637만원</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">건강보험료율: 7.19% (근로자 3.595%)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">비과세 항목 한도 적용</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">장기요양보험료율: 건강보험의 13.14%</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">고용보험료율: 0.9%</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">간이세액표 기준 소득세 계산</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">성과급 세율 구간 변동 계산</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 국민건강보험공단, 국세청 간이세액표 (2026년)
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
