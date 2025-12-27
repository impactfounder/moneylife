'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { RelatedContentCTA } from '@/components/ui/RelatedContentCTA'
import { getPostsByCalculator } from '@/data/posts'
import { calculateLoan, getLTVByRegion, getStressRates, getDSRLimit } from '@/lib/loan-calculator'
import { formatNumber } from '@/lib/calculations'
import type { LoanResult, LoanRegion } from '@/types'
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
import { Pie, Line, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement)

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [years, setYears] = useState('')
  const [method, setMethod] = useState<'equal-principal-interest' | 'equal-principal'>('equal-principal-interest')
  const [result, setResult] = useState<LoanResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState<string>('')
  const [showAllSchedule, setShowAllSchedule] = useState(false)

  // 고도화: 스트레스 DSR & LTV 관련
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [rateType, setRateType] = useState<'fixed' | 'variable' | 'mixed' | 'periodic'>('variable')
  const [annualIncome, setAnnualIncome] = useState('')
  const [existingDebt, setExistingDebt] = useState('')
  const [region, setRegion] = useState<LoanRegion>('seoul')
  const [propertyValue, setPropertyValue] = useState('')
  const [isFirstHome, setIsFirstHome] = useState(false)
  const [customLTV, setCustomLTV] = useState('')

  const ltvByRegion = getLTVByRegion()
  const stressRates = getStressRates()
  const dsrLimit = getDSRLimit()

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
    setError('')

    const loanAmount = parseInt(amount.replace(/,/g, '')) * 10000 // 만원 -> 원
    const rate = parseFloat(interestRate)
    const period = parseInt(years) * 12 // 년 -> 개월

    if (!loanAmount || isNaN(loanAmount) || loanAmount <= 0) {
      setError('대출 금액을 입력해주세요')
      return
    }
    if (!rate || isNaN(rate) || rate <= 0) {
      setError('이자율을 입력해주세요')
      return
    }
    if (!period || isNaN(period) || period <= 0) {
      setError('대출 기간을 입력해주세요')
      return
    }

    const calcResult = calculateLoan({
      amount: loanAmount,
      interestRate: rate,
      months: period,
      method,
      // 고도화 옵션
      rateType: showAdvanced ? rateType : undefined,
      annualIncome: showAdvanced && annualIncome ? parseInt(annualIncome.replace(/,/g, '')) * 10000 : undefined,
      existingDebtPayment: showAdvanced && existingDebt ? parseInt(existingDebt.replace(/,/g, '')) * 10000 : undefined,
      region: showAdvanced ? region : undefined,
      propertyValue: showAdvanced && propertyValue ? parseInt(propertyValue.replace(/,/g, '')) * 10000 : undefined,
      isFirstHome: showAdvanced ? isFirstHome : undefined,
      customLTV: region === 'custom' && customLTV ? parseFloat(customLTV) : undefined,
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
    setShowAllSchedule(false)
    // 고도화 옵션 초기화
    setAnnualIncome('')
    setExistingDebt('')
    setPropertyValue('')
    setCustomLTV('')
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

  // 스트레스 DSR 비교 차트
  const dsrComparisonData = result?.dsrResult ? {
    labels: ['규제 전 한도', '스트레스 DSR 적용'],
    datasets: [
      {
        label: '대출 한도 (만원)',
        data: [
          Math.round(result.dsrResult.baseLoanLimit / 10000),
          Math.round(result.dsrResult.stressLoanLimit / 10000),
        ],
        backgroundColor: ['#3b82f6', '#ef4444'],
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
                  2025년 스트레스 DSR 반영
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
                          상세 설정 (DSR/LTV 분석)
                        </button>
                      </div>

                      {/* 상세 설정 영역 */}
                      {showAdvanced && (
                        <div className="space-y-6 pt-4 border-t border-slate-200">
                          {/* 금리 유형 (스트레스 DSR) */}
                          <div>
                            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                              <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs">%</span>
                              금리 유형 (스트레스 DSR)
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { value: 'fixed', label: '고정금리', stress: stressRates.fixed },
                                { value: 'variable', label: '변동금리', stress: stressRates.variable },
                                { value: 'mixed', label: '혼합형', stress: stressRates.mixed },
                                { value: 'periodic', label: '주기형', stress: stressRates.periodic },
                              ].map((type) => (
                                <button
                                  key={type.value}
                                  type="button"
                                  onClick={() => setRateType(type.value as typeof rateType)}
                                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                    rateType === type.value
                                      ? 'bg-slate-900 text-white'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  {type.label}
                                  <span className="block text-[10px] opacity-70">
                                    +{type.stress}%p
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 연 소득 */}
                          <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-slate-600 shrink-0">연 소득</label>
                            <div className="relative flex-1">
                              <input
                                type="text"
                                value={annualIncome}
                                onChange={(e) => handleFormatInput(e.target.value, setAnnualIncome)}
                                placeholder="0"
                                className="w-full px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-1 focus:ring-slate-200 bg-slate-50 focus:bg-white text-slate-900"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">만원</span>
                            </div>
                            <span className="text-xs text-slate-400 whitespace-nowrap">DSR 계산</span>
                          </div>

                          {/* 기존 대출 상환액 */}
                          <div className="flex items-center gap-3">
                            <label className="w-20 text-sm text-slate-600 shrink-0">기존 대출</label>
                            <div className="relative flex-1">
                              <input
                                type="text"
                                value={existingDebt}
                                onChange={(e) => handleFormatInput(e.target.value, setExistingDebt)}
                                placeholder="0"
                                className="w-full px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-1 focus:ring-slate-200 bg-slate-50 focus:bg-white text-slate-900"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">만원/년</span>
                            </div>
                            <span className="text-xs text-slate-400 whitespace-nowrap">연 상환액</span>
                          </div>

                          {/* LTV 지역 선택 */}
                          <div className="pt-4 border-t border-slate-100">
                            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">🏠</span>
                              매수 예정 지역 (LTV)
                            </h3>
                            <div className="space-y-2">
                              {[
                                { value: 'gangnam', label: '투기과열 (강남/서초/송파/용산)', ltv: ltvByRegion.gangnam.base },
                                { value: 'seoul', label: '서울 (기타 지역)', ltv: ltvByRegion.seoul.base },
                                { value: 'metro', label: '수도권 조정지역', ltv: ltvByRegion.metro.base },
                                { value: 'other', label: '비규제지역', ltv: ltvByRegion.other.base },
                                { value: 'custom', label: '직접 입력', ltv: null },
                              ].map((r) => (
                                <button
                                  key={r.value}
                                  type="button"
                                  onClick={() => setRegion(r.value as LoanRegion)}
                                  className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex justify-between items-center ${
                                    region === r.value
                                      ? 'bg-slate-900 text-white'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  <span>{r.label}</span>
                                  {r.ltv !== null && (
                                    <span className="text-xs opacity-70">LTV {r.ltv}%</span>
                                  )}
                                </button>
                              ))}
                            </div>

                            {/* 직접 입력 LTV */}
                            {region === 'custom' && (
                              <div className="mt-3 flex items-center gap-3">
                                <label className="w-20 text-sm text-slate-600 shrink-0">LTV</label>
                                <div className="relative flex-1">
                                  <input
                                    type="number"
                                    value={customLTV}
                                    onChange={(e) => setCustomLTV(e.target.value)}
                                    placeholder="70"
                                    min="0"
                                    max="100"
                                    className="w-full px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-1 focus:ring-slate-200 bg-slate-50 focus:bg-white text-slate-900"
                                  />
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">%</span>
                                </div>
                              </div>
                            )}

                            {/* 생애최초 여부 */}
                            {region !== 'custom' && (
                              <label className="mt-3 flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isFirstHome}
                                  onChange={(e) => setIsFirstHome(e.target.checked)}
                                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                                />
                                <span className="text-sm text-slate-600">
                                  생애최초 주택 구입 (LTV +10%p)
                                </span>
                              </label>
                            )}

                            {/* 주택 가격 */}
                            <div className="mt-3 flex items-center gap-3">
                              <label className="w-20 text-sm text-slate-600 shrink-0">주택 가격</label>
                              <div className="relative flex-1">
                                <input
                                  type="text"
                                  value={propertyValue}
                                  onChange={(e) => handleFormatInput(e.target.value, setPropertyValue)}
                                  placeholder="0"
                                  className="w-full px-3 py-2.5 text-sm font-medium border border-slate-200 rounded-lg focus:border-slate-400 focus:ring-1 focus:ring-slate-200 bg-slate-50 focus:bg-white text-slate-900"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">만원</span>
                              </div>
                              <span className="text-xs text-slate-400 whitespace-nowrap">시세</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 에러 메시지 */}
                      {error && (
                        <p className="text-sm text-red-500 text-center font-medium animate-fade-in">
                          {error}
                        </p>
                      )}

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

                      {/* 스트레스 DSR 결과 */}
                      {result!.dsrResult && (
                        <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
                          <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <span className="text-red-500">⚠️</span> 스트레스 DSR 분석
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">현재 DSR</span>
                              <span className={`font-bold ${result!.dsrResult.baseDSR > dsrLimit ? 'text-red-600' : 'text-slate-900'}`}>
                                {result!.dsrResult.baseDSR.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">스트레스 DSR (+{result!.dsrResult.stressRate}%p)</span>
                              <span className={`font-bold ${result!.dsrResult.stressDSR > dsrLimit ? 'text-red-600' : 'text-slate-900'}`}>
                                {result!.dsrResult.stressDSR.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-red-200">
                              <span className="text-slate-700 font-medium">DSR 한도</span>
                              <span className="font-bold text-slate-900">{dsrLimit}%</span>
                            </div>
                            {result!.dsrResult.dsrExceeded && (
                              <div className="mt-2 p-2 bg-red-100 rounded-lg">
                                <p className="text-xs text-red-700 font-medium">
                                  ⛔ DSR {dsrLimit}% 초과! 대출 한도 제한 가능성 있음
                                </p>
                              </div>
                            )}
                            <div className="mt-3 pt-2 border-t border-red-200">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-600">규제 전 예상 한도</span>
                                <span className="font-bold text-slate-900">{formatNumber(Math.round(result!.dsrResult.baseLoanLimit / 10000))}만원</span>
                              </div>
                              <div className="flex justify-between text-xs mt-1">
                                <span className="text-slate-600">스트레스 적용 한도</span>
                                <span className="font-bold text-red-600">{formatNumber(Math.round(result!.dsrResult.stressLoanLimit / 10000))}만원</span>
                              </div>
                              <div className="flex justify-between text-xs mt-1">
                                <span className="text-slate-600">한도 감소</span>
                                <span className="font-bold text-amber-600">-{formatNumber(Math.round(result!.dsrResult.limitReduction / 10000))}만원 ({result!.dsrResult.limitReductionPercent}%)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* LTV 결과 */}
                      {result!.ltvResult && (
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                          <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <span className="text-blue-500">🏠</span> LTV 분석
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">지역</span>
                              <span className="font-bold text-slate-900">{result!.ltvResult.regionName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">적용 LTV</span>
                              <span className="font-bold text-blue-600">
                                {result!.ltvResult.appliedLTV}%
                                {result!.ltvResult.ltvBonus > 0 && (
                                  <span className="text-xs text-green-600 ml-1">(+{result!.ltvResult.ltvBonus}%p 생애최초)</span>
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-blue-200">
                              <span className="text-slate-700 font-medium">최대 대출 가능액</span>
                              <span className="font-black text-indigo-600">{formatNumber(Math.round(result!.ltvResult.maxLoanAmount / 10000))}만원</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 버튼 */}
                      <div className="flex flex-col sm:flex-row gap-3">
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

                {/* 스트레스 DSR 비교 차트 */}
                {result.dsrResult && dsrComparisonData && (
                  <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">
                      스트레스 DSR 적용 시 대출 한도 변동
                    </h3>
                    <div className="h-[200px]">
                      <Bar data={dsrComparisonData} options={barOptions} />
                    </div>
                    <p className="text-xs text-center text-slate-500 mt-4">
                      * 스트레스 DSR 적용 시 대출 한도가 <span className="text-red-600 font-bold">
                        {formatNumber(Math.round(result.dsrResult.limitReduction / 10000))}만원 ({result.dsrResult.limitReductionPercent}%)
                      </span> 감소합니다
                    </p>
                  </div>
                )}
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">대출 원금</p>
                    <p className="text-xl md:text-2xl font-black text-slate-900">
                      {amount}
                      <span className="text-sm md:text-base font-bold text-slate-500 ml-1">만원</span>
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">연 이자율</p>
                    <p className="text-xl md:text-2xl font-black text-blue-600">
                      {interestRate}
                      <span className="text-sm md:text-base font-bold text-blue-400 ml-1">%</span>
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">총 이자</p>
                    <p className="text-xl md:text-2xl font-black text-red-600">
                      {formatNumber(Math.round(result.totalInterest / 10000))}
                      <span className="text-sm md:text-base font-bold text-red-400 ml-1">만원</span>
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-slate-500 text-sm mb-2">이자 비율</p>
                    <p className="text-xl md:text-2xl font-black text-purple-600">
                      {((result.totalInterest / (parseInt(amount.replace(/,/g, '')) * 10000)) * 100).toFixed(1)}
                      <span className="text-sm md:text-base font-bold text-purple-400 ml-1">%</span>
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
                  {/* 테이블 스크롤 힌트 */}
                  <div className="relative">
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 md:hidden"></div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[500px]">
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
                          {(showAllSchedule ? result.schedule : result.schedule.slice(0, 12)).map((item) => (
                            <tr key={item.month} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3 font-medium text-slate-900">{item.month}개월</td>
                              <td className="px-4 py-3 text-right text-slate-700">{formatNumber(Math.round(item.principal / 10000))}만원</td>
                              <td className="px-4 py-3 text-right text-red-500">{formatNumber(Math.round(item.interest / 10000))}만원</td>
                              <td className="px-4 py-3 text-right font-bold text-slate-900">{formatNumber(Math.round(item.payment / 10000))}만원</td>
                              <td className="px-4 py-3 text-right text-slate-500">{formatNumber(Math.round(item.balance / 10000))}만원</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {result.schedule.length > 12 && (
                    <div className="p-4 bg-slate-50 text-center">
                      <button
                        onClick={() => setShowAllSchedule(!showAllSchedule)}
                        className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        {showAllSchedule ? (
                          <>▲ 접기</>
                        ) : (
                          <>▼ 전체 {result.schedule.length}개월 보기</>
                        )}
                      </button>
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

              {/* 스트레스 DSR */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  2025년 스트레스 DSR이란?
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  스트레스 DSR은 <strong className="text-slate-800">미래 금리 상승 가능성</strong>을 반영해 대출 심사 시
                  현재 금리보다 높은 가산 금리를 적용하는 제도입니다. 2025년부터 본격 시행되어
                  <strong className="text-slate-800">변동금리 대출의 경우 1.5%p</strong>를 가산하여 DSR을 계산합니다.
                </p>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-red-800 text-sm">
                    <strong>금리 유형별 가산 금리:</strong><br />
                    • 고정금리: 가산 없음 (0%p)<br />
                    • 변동금리: +1.5%p<br />
                    • 혼합형 (5년 고정 후 변동): +0.75%p<br />
                    • 주기형 (금리 조정 주기): +0.375%p
                  </p>
                </div>
              </div>

              {/* LTV 규제 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  지역별 LTV 규제
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  LTV(담보인정비율)는 주택 가격 대비 대출 가능 비율입니다.
                  지역에 따라 다른 LTV가 적용되며, <strong className="text-slate-800">생애최초 주택 구입자는 10%p 우대</strong>를 받습니다.
                </p>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>지역별 LTV 한도:</strong><br />
                    • 투기과열지구 (강남/서초/송파/용산): 50%<br />
                    • 조정대상지역 (서울): 50%<br />
                    • 조정대상지역 (수도권): 60%<br />
                    • 비규제지역: 70%<br />
                    • 생애최초: 각 지역 기준 +10%p (최대 80%)
                  </p>
                </div>
              </div>

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
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-800 text-sm">
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
                  <li>
                    <a href="https://www.hf.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      주택금융공사 - 주택담보대출 안내
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
                    <span className="text-slate-300">2025년 스트레스 DSR 반영</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">금리 유형별 가산 금리 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">지역별 LTV 자동 매핑</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">생애최초 LTV 우대 반영</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">DSR 40% 한도 기준</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">대출 한도 역산 기능</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 금융감독원 대출금리 비교공시, 2025년 가계부채 관리방안
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
