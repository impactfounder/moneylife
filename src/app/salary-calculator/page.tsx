'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { RelatedContentCTA } from '@/components/ui/RelatedContentCTA'
import { getPostsByCalculator } from '@/data/posts'
import { calculateSalary } from '@/lib/salary-calculator'
import { formatNumber } from '@/lib/calculations'
import type { SalaryResult } from '@/types'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

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
                  * 2025년 4대보험 요율 및 간이세액표 기준
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
                      <span className="text-slate-600">국민연금 (4.5%)</span>
                      <span className="font-medium text-slate-900">{formatNumber(result.nationalPension)}원</span>
                    </div>
                    <div className="px-6 py-4 flex justify-between">
                      <span className="text-slate-600">건강보험 (3.545%)</span>
                      <span className="font-medium text-slate-900">{formatNumber(result.healthInsurance)}원</span>
                    </div>
                    <div className="px-6 py-4 flex justify-between">
                      <span className="text-slate-600">장기요양보험 (건보의 12.95%)</span>
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
                  <span className="text-sm font-normal text-slate-500 ml-2">(2025년 기준)</span>
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  4대보험은 국민연금, 건강보험, 고용보험, 산재보험을 말합니다.
                  <strong className="text-slate-800"> 국민연금(4.5%)</strong>,
                  <strong className="text-slate-800"> 건강보험(3.545%)</strong>,
                  <strong className="text-slate-800"> 장기요양보험(건강보험료의 12.95%)</strong>,
                  <strong className="text-slate-800"> 고용보험(0.9%)</strong>이 급여에서 공제됩니다.
                  산재보험은 회사가 전액 부담하므로 근로자 급여에서는 공제되지 않습니다.
                </p>
              </div>

              {/* 소득세와 지방소득세 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  소득세와 지방소득세
                  <span className="text-sm font-normal text-slate-500 ml-2">(2025년 기준)</span>
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
                  <span className="text-sm font-normal text-slate-500 ml-2">(2025년 기준)</span>
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span><strong className="text-slate-800">식대:</strong> 월 20만원까지 비과세</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span><strong className="text-slate-800">교통비:</strong> 월 20만원까지 비과세</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span><strong className="text-slate-800">육아수당:</strong> 월 10만원까지 비과세 (6세 이하 자녀)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>연구보조비, 야간근로수당, 출산·보육수당 등</span>
                  </li>
                </ul>
              </div>

              {/* 참고자료 */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-slate-800 mb-4">참고자료</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>
                    <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      국민연금공단 - 국민연금 보험료 (2025년 상한액: 617만원)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      국민건강보험공단 - 건강보험료 안내 (2025년 보수월액 3.545%)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      국세청 - 소득세법 및 세율표 (2025년 기준)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.comwel.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      근로복지공단 - 고용보험 안내 (0.9%)
                    </a>
                  </li>
                </ul>
                <p className="text-xs text-slate-500 mt-4 italic">
                  * 본 계산기는 2025년 보험료율 및 세법을 반영하였습니다. 간이세액표 기준으로 계산되며, 연말정산 시 실제 세액과 차이가 있을 수 있습니다.
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
