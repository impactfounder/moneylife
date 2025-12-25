'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { formatNumber } from '@/lib/calculations'

// 2026년 최저시급
const MINIMUM_WAGE_2026 = 10320
const MINIMUM_WAGE_2025 = 9860

export default function MinimumWageCalculatorPage() {
  const [hoursPerDay, setHoursPerDay] = useState('8')
  const [daysPerWeek, setDaysPerWeek] = useState('5')
  const [includeWeeklyAllowance, setIncludeWeeklyAllowance] = useState(true)
  const [selectedYear, setSelectedYear] = useState<'2026' | '2025'>('2026')
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{
    hourlyWage: number
    dailyWage: number
    weeklyWage: number
    monthlyWage: number
    annualWage: number
    weeklyAllowance: number
    weeklyHours: number
  } | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const hours = parseFloat(hoursPerDay) || 8
    const days = parseFloat(daysPerWeek) || 5
    const minimumWage = selectedYear === '2026' ? MINIMUM_WAGE_2026 : MINIMUM_WAGE_2025

    // 주간 근무시간
    const weeklyHours = hours * days

    // 주휴수당 계산 (주 15시간 이상 근무 시)
    // 주휴수당 = (주간 근무시간 / 40) * 8 * 시급
    const weeklyAllowanceHours = weeklyHours >= 15 ? (weeklyHours / 40) * 8 : 0
    const weeklyAllowance = includeWeeklyAllowance ? Math.round(weeklyAllowanceHours * minimumWage) : 0

    // 일급 = 시급 * 일일 근무시간
    const dailyWage = Math.round(minimumWage * hours)

    // 주급 = 일급 * 주간 근무일수 + 주휴수당
    const weeklyWage = Math.round(dailyWage * days + weeklyAllowance)

    // 월급 = 주급 * (52주 / 12개월) ≈ 4.345주
    const monthlyWage = Math.round(weeklyWage * 4.345)

    // 연봉 = 월급 * 12
    const annualWage = monthlyWage * 12

    setResult({
      hourlyWage: minimumWage,
      dailyWage,
      weeklyWage,
      monthlyWage,
      annualWage,
      weeklyAllowance,
      weeklyHours,
    })
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setHoursPerDay('8')
    setDaysPerWeek('5')
    setIncludeWeeklyAllowance(true)
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
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-amber-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-yellow-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6 border border-orange-200">
                  2026년 최저시급 10,320원 확정
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  최저시급 계산기
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  근무시간과 일수에 따른 일급, 주급, 월급을 계산합니다
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">
                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 연도 선택 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          적용 연도
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedYear('2026')}
                            className={`py-3 rounded-xl font-bold transition-all ${
                              selectedYear === '2026'
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            2026년
                            <span className="block text-xs mt-0.5 opacity-70">10,320원</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedYear('2025')}
                            className={`py-3 rounded-xl font-bold transition-all ${
                              selectedYear === '2025'
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            2025년
                            <span className="block text-xs mt-0.5 opacity-70">9,860원</span>
                          </button>
                        </div>
                      </div>

                      {/* 하루 근무시간 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          하루 근무시간
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={hoursPerDay}
                            onChange={(e) => setHoursPerDay(e.target.value)}
                            placeholder="8"
                            min="1"
                            max="24"
                            step="0.5"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            시간
                          </div>
                        </div>
                      </div>

                      {/* 주간 근무일수 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          주간 근무일수
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={daysPerWeek}
                            onChange={(e) => setDaysPerWeek(e.target.value)}
                            placeholder="5"
                            min="1"
                            max="7"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            일
                          </div>
                        </div>
                      </div>

                      {/* 주휴수당 포함 여부 */}
                      <div>
                        <label className="flex items-center justify-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeWeeklyAllowance}
                            onChange={(e) => setIncludeWeeklyAllowance(e.target.checked)}
                            className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                          />
                          <span className="text-sm font-bold text-slate-700">
                            주휴수당 포함 (주 15시간 이상 근무 시)
                          </span>
                        </label>
                      </div>

                      {/* 계산 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        급여 계산하기
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* 결과 헤더 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">{selectedYear}년 최저시급 기준 월급</p>
                        <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                          {formatNumber(result!.monthlyWage)}
                          <span className="text-2xl font-bold text-slate-500 ml-1">원</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          주 {result!.weeklyHours}시간 근무 기준
                          {includeWeeklyAllowance && result!.weeklyHours >= 15 && ' (주휴수당 포함)'}
                        </p>
                      </div>

                      {/* 상세 결과 */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                          <span className="text-slate-600 font-medium">시급</span>
                          <span className="text-lg font-bold text-orange-600">
                            {formatNumber(result!.hourlyWage)}원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">일급</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(result!.dailyWage)}원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">주급</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(result!.weeklyWage)}원
                          </span>
                        </div>
                        {includeWeeklyAllowance && result!.weeklyHours >= 15 && (
                          <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                            <span className="text-slate-600 font-medium">주휴수당 (주)</span>
                            <span className="text-lg font-bold text-green-600">
                              +{formatNumber(result!.weeklyAllowance)}원
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                          <span className="text-slate-600 font-medium">월급</span>
                          <span className="text-xl font-bold text-blue-600">
                            {formatNumber(result!.monthlyWage)}원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-100 rounded-xl">
                          <span className="text-slate-600 font-medium">연봉 (세전)</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(result!.annualWage)}원
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
                          href="/salary-calculator"
                          className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-center shadow-lg shadow-slate-200"
                        >
                          실수령액 계산
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 주휴수당은 주 15시간 이상 근무 시 지급됩니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2026년 vs 2025년 비교 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              2026년 vs 2025년 최저시급 비교
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 rounded-2xl p-6 text-center border-2 border-orange-200">
                <p className="text-slate-500 text-sm mb-2">2026년 최저시급</p>
                <p className="text-4xl font-black text-orange-600">
                  10,320
                  <span className="text-lg font-bold text-orange-400 ml-1">원</span>
                </p>
                <p className="text-sm text-orange-600 mt-2 font-semibold">
                  +460원 (+4.7%) 인상
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200">
                <p className="text-slate-500 text-sm mb-2">2025년 최저시급</p>
                <p className="text-4xl font-black text-slate-600">
                  9,860
                  <span className="text-lg font-bold text-slate-400 ml-1">원</span>
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  기준 연도
                </p>
              </div>
            </div>

            {/* 월급 비교 (주 40시간 기준) */}
            <div className="mt-8 bg-slate-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4 text-center">주 40시간 근무 시 월급 비교</h3>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-slate-400 text-sm mb-1">2026년</p>
                  <p className="text-2xl font-bold text-orange-400">2,241,960원</p>
                  <p className="text-xs text-slate-500">주휴수당 포함</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-1">2025년</p>
                  <p className="text-2xl font-bold text-slate-400">2,141,900원</p>
                  <p className="text-xs text-slate-500">주휴수당 포함</p>
                </div>
              </div>
              <p className="text-center text-sm text-slate-400 mt-4">
                월 <span className="text-orange-400 font-bold">약 10만원</span> 차이
              </p>
            </div>
          </div>
        </section>

        {/* 광고 배치 */}
        <section className="py-8 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <AdUnit className="my-4" />
          </div>
        </section>

        {/* 주휴수당 안내 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">주휴수당이란?</h2>

              <div className="mb-8">
                <p className="text-slate-600 leading-relaxed mb-4">
                  주휴수당은 <strong className="text-slate-800">1주일간 소정 근로일을 개근한 근로자</strong>에게
                  유급 주휴일을 부여하고, 이에 대해 지급하는 수당입니다.
                  주 15시간 이상 근무하면 주휴수당을 받을 수 있습니다.
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">주휴수당 계산 방법</h3>
                <div className="space-y-3 text-slate-700">
                  <p><strong>주휴수당 = (주간 근무시간 ÷ 40) × 8 × 시급</strong></p>
                  <div className="text-sm space-y-2 mt-4">
                    <p>• 주 40시간 근무: 8시간 × 10,320원 = <strong>82,560원</strong></p>
                    <p>• 주 30시간 근무: 6시간 × 10,320원 = <strong>61,920원</strong></p>
                    <p>• 주 20시간 근무: 4시간 × 10,320원 = <strong>41,280원</strong></p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">주휴수당 지급 조건</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span><strong>주 15시간 이상</strong> 근무해야 함</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>소정 근로일을 <strong>개근</strong>해야 함</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>다음 주에 근무 예정이어야 함 (퇴사 주는 미지급)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 최저시급 변천사 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              최근 5년간 최저시급 변화
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">연도</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">최저시급</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">인상액</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">인상률</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200 bg-blue-50">월급 (주40시간)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-orange-50/50">
                    <td className="px-4 py-3 text-center font-bold text-orange-600">2026년</td>
                    <td className="px-4 py-3 text-center font-bold text-slate-900">10,320원</td>
                    <td className="px-4 py-3 text-center text-slate-700">+460원</td>
                    <td className="px-4 py-3 text-center text-slate-700">+4.7%</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600 bg-blue-50/50">2,241,960원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">2025년</td>
                    <td className="px-4 py-3 text-center text-slate-900">9,860원</td>
                    <td className="px-4 py-3 text-center text-slate-700">+240원</td>
                    <td className="px-4 py-3 text-center text-slate-700">+2.5%</td>
                    <td className="px-4 py-3 text-center text-blue-600 bg-blue-50/50">2,141,900원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">2024년</td>
                    <td className="px-4 py-3 text-center text-slate-900">9,620원</td>
                    <td className="px-4 py-3 text-center text-slate-700">+460원</td>
                    <td className="px-4 py-3 text-center text-slate-700">+5.0%</td>
                    <td className="px-4 py-3 text-center text-blue-600 bg-blue-50/50">2,089,750원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">2023년</td>
                    <td className="px-4 py-3 text-center text-slate-900">9,160원</td>
                    <td className="px-4 py-3 text-center text-slate-700">+460원</td>
                    <td className="px-4 py-3 text-center text-slate-700">+5.3%</td>
                    <td className="px-4 py-3 text-center text-blue-600 bg-blue-50/50">1,989,790원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">2022년</td>
                    <td className="px-4 py-3 text-center text-slate-900">8,720원</td>
                    <td className="px-4 py-3 text-center text-slate-700">+440원</td>
                    <td className="px-4 py-3 text-center text-slate-700">+5.1%</td>
                    <td className="px-4 py-3 text-center text-blue-600 bg-blue-50/50">1,893,960원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4">
              * 월급은 주 40시간 근무, 주휴수당 포함 기준
            </p>
          </div>
        </section>

        {/* 계산 기준 안내 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-6 text-center">계산 기준 안내</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span className="text-slate-300">2026년 최저시급: 10,320원</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span className="text-slate-300">주휴수당: 주 15시간 이상 근무 시 지급</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span className="text-slate-300">월 환산: 주급 × 4.345주</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span className="text-slate-300">세전 금액 기준 (4대보험 미적용)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span className="text-slate-300">주휴수당 = (주간 근무시간/40) × 8 × 시급</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span className="text-slate-300">연봉 = 월급 × 12개월</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 고용노동부 최저임금위원회 (2025.08 결정)
              </p>
            </div>
          </div>
        </section>

        {/* 관련 콘텐츠 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              관련 콘텐츠
            </h2>
            <Link
              href="/content/minimum-wage-2026"
              className="block bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 hover:from-orange-100 hover:to-amber-100 transition-colors border border-orange-200 mb-6"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">📋</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">2026년 최저시급 완벽 가이드</h3>
                  <p className="text-sm text-slate-600">주휴수당 계산법, 알바생/사업주가 알아야 할 것, FAQ까지 총정리</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* 관련 계산기 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              관련 계산기
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/salary-calculator"
                className="bg-white rounded-2xl p-6 hover:bg-slate-50 transition-colors border border-slate-200"
              >
                <h3 className="font-bold text-slate-900 mb-2">급여 실수령액 계산기</h3>
                <p className="text-sm text-slate-600">4대보험, 세금 공제 후 실수령액</p>
              </Link>
              <Link
                href="/severance-calculator"
                className="bg-white rounded-2xl p-6 hover:bg-slate-50 transition-colors border border-slate-200"
              >
                <h3 className="font-bold text-slate-900 mb-2">퇴직금 계산기</h3>
                <p className="text-sm text-slate-600">근속기간별 퇴직금 계산</p>
              </Link>
              <Link
                href="/income-tax-calculator"
                className="bg-white rounded-2xl p-6 hover:bg-slate-50 transition-colors border border-slate-200"
              >
                <h3 className="font-bold text-slate-900 mb-2">종합소득세 계산기</h3>
                <p className="text-sm text-slate-600">2025년 세율 기준</p>
              </Link>
            </div>
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
