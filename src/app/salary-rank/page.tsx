'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import {
  calculateKoreaRank,
  calculateWorldRank,
  calculateAgeRank,
  convertBeforeToAfter,
  incrementChecks,
} from '@/lib/calculations'
import type { RankResult, AgeGroup } from '@/types'

function SalaryRankContent() {
  const searchParams = useSearchParams()
  const [salaryInput, setSalaryInput] = useState('')
  const [salaryType, setSalaryType] = useState<'before' | 'after'>('after')

  // URL 파라미터에서 값 읽어오기
  useEffect(() => {
    const salaryParam = searchParams.get('salary')
    const typeParam = searchParams.get('type')

    if (salaryParam) {
      setSalaryInput(salaryParam)
    }
    if (typeParam === 'before' || typeParam === 'after') {
      setSalaryType(typeParam)
    }
  }, [searchParams])
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('all')

  const [result, setResult] = useState<{
    korea: RankResult
    world: RankResult
    age: RankResult | null
    actualSalary: number
    annualSalary: number
  } | null>(null)
  const [error, setError] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 만원 단위 입력을 원 단위로 변환
    const parsedSalary = parseInt(salaryInput)
    if (!parsedSalary || isNaN(parsedSalary) || parsedSalary <= 0) {
      setError('월 급여를 입력해주세요')
      return
    }
    let salary = parsedSalary * 10000

    // 세전인 경우 세후로 변환
    if (salaryType === 'before') {
      salary = convertBeforeToAfter(salary)
    }

    // 순위 계산
    const koreaRank = calculateKoreaRank(salary, 'all')
    const worldRank = calculateWorldRank(salary)
    const ageRank = calculateAgeRank(salary, ageGroup)
    const annualSalary = Math.round(salary * 12 / 10000)

    setResult({
      korea: koreaRank,
      world: worldRank,
      age: ageRank,
      actualSalary: salary,
      annualSalary
    })

    // 조회수 증가
    incrementChecks()
  }

  const handleRecalculate = () => {
    setResult(null)
    // 입력값 유지 (salaryInput을 초기화하지 않음)
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* 히어로 섹션 */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50">
          {/* 배경 그라데이션 */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-teal-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  📊 통계청 데이터 기반
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  내 연봉 상위 몇 %일까?
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  1초만에 확인하는 소득 순위 분석
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                {/* 입력 폼 */}
                {!result && (
                  <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* 급여 유형 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          급여 유형
                        </label>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setSalaryType('after')}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                              salaryType === 'after'
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            세후 (실수령액)
                          </button>
                          <button
                            type="button"
                            onClick={() => setSalaryType('before')}
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                              salaryType === 'before'
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            세전 (연봉계약서)
                          </button>
                        </div>
                      </div>

                      {/* 월급 입력 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          월 급여 (만원)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={salaryInput}
                            onChange={(e) => setSalaryInput(e.target.value)}
                            placeholder="예: 300"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                            required
                            min={0}
                          />
                          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">
                          {salaryType === 'after'
                            ? '실제 통장에 입금되는 금액'
                            : '세금과 4대보험 제외 전 금액'
                          }
                        </p>
                        {error && (
                          <p className="text-sm text-red-500 mt-2 text-center font-medium animate-fade-in">
                            {error}
                          </p>
                        )}
                      </div>

                      {/* 나이대 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          나이대 <span className="text-slate-400 font-normal">(선택)</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {(['all', '20s', '30s', '40s', '50s', '60s'] as AgeGroup[]).map((age) => (
                            <button
                              key={age}
                              type="button"
                              onClick={() => setAgeGroup(age)}
                              className={`py-3 px-3 rounded-xl font-semibold text-sm transition-all ${
                                ageGroup === age
                                  ? 'bg-slate-900 text-white shadow-lg'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {age === 'all' ? '전체' : age === '20s' ? '20대' : age === '30s' ? '30대' : age === '40s' ? '40대' : age === '50s' ? '50대' : '60대'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                      >
                        🏆 내 순위 확인하기
                      </button>
                    </form>
                  </div>
                )}

                {/* 결과 표시 */}
                {result && (
                  <div className="space-y-4 animate-fade-in">
                    {/* 결과 헤더 카드 */}
                    <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 bg-white/80 backdrop-blur-xl text-center">
                      <p className="text-sm text-slate-500 mb-2">당신의 월 소득</p>
                      <div className="text-3xl font-bold text-slate-900 mb-1">
                        {Math.round(result.actualSalary / 10000).toLocaleString()}만원
                      </div>
                      <div className="text-sm text-slate-500">
                        (연봉 약 {result.annualSalary.toLocaleString()}만원)
                      </div>
                    </div>

                    {/* 대한민국 순위 */}
                    <div className="glass-effect rounded-3xl p-6 shadow-xl border border-white/50 bg-white/80 backdrop-blur-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900">🇰🇷 대한민국</h3>
                        <div className="text-2xl font-bold text-teal-600">
                          상위 {result.korea.percentile}%
                        </div>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(100 - result.korea.percentile, 100)}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-500 mt-3">{result.korea.description}</p>
                    </div>

                    {/* 전세계 순위 */}
                    <div className="glass-effect rounded-3xl p-6 shadow-xl border border-white/50 bg-white/80 backdrop-blur-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900">🌏 전세계</h3>
                        <div className="text-2xl font-bold text-blue-600">
                          상위 {result.world.percentile}%
                        </div>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(100 - result.world.percentile, 100)}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-500 mt-3">{result.world.description}</p>
                    </div>

                    {/* 연령별 순위 */}
                    {result.age && (
                      <div className="glass-effect rounded-3xl p-6 shadow-xl border border-white/50 bg-white/80 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-slate-900">
                            👥 {result.age.label} 동년배
                          </h3>
                          <div className="text-2xl font-bold text-amber-600">
                            상위 {result.age.percentile}%
                          </div>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min(100 - result.age.percentile, 100)}%` }}
                          />
                        </div>
                        <p className="text-sm text-slate-500 mt-3">{result.age.description}</p>
                      </div>
                    )}

                    {/* 액션 버튼 */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleRecalculate}
                        className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                      >
                        🔄 다시 계산
                      </button>
                      <Link
                        href="/salary-calculator"
                        className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-semibold text-center hover:bg-slate-800 transition-all"
                      >
                        💰 상세 급여 계산
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 결과 표시 시 추가 섹션 */}
        {result && (
          <>
            {/* 광고 배치 */}
            <section className="py-8 bg-white">
              <div className="container mx-auto px-4 max-w-4xl">
                <AdUnit className="my-4" />
              </div>
            </section>

            {/* 추가 계산기 링크 */}
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                  관련 계산기
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link
                    href="/salary-calculator"
                    className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-slate-100 transition-all hover:shadow-lg"
                  >
                    <div className="text-3xl mb-3">💼</div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">급여 계산기</h4>
                    <p className="text-xs text-slate-500">4대보험, 세금 계산</p>
                  </Link>

                  <Link
                    href="/income-tax-calculator"
                    className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-slate-100 transition-all hover:shadow-lg"
                  >
                    <div className="text-3xl mb-3">📊</div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">종합소득세</h4>
                    <p className="text-xs text-slate-500">세금 계산</p>
                  </Link>

                  <Link
                    href="/pension-calculator"
                    className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-slate-100 transition-all hover:shadow-lg"
                  >
                    <div className="text-3xl mb-3">💰</div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">국민연금</h4>
                    <p className="text-xs text-slate-500">예상 연금 계산</p>
                  </Link>

                  <Link
                    href="/content/salary-ranking"
                    className="bg-slate-50 rounded-2xl p-6 text-center hover:bg-slate-100 transition-all hover:shadow-lg"
                  >
                    <div className="text-3xl mb-3">📈</div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">연봉 통계</h4>
                    <p className="text-xs text-slate-500">연령별 비교</p>
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}

        {/* 계산 기준 안내 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-6 text-center">계산 기준 안내</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">2024년 통계청 소득 데이터 기반</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">전국 근로소득자 분위별 분석</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">연령대별 세부 통계 반영</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">세계은행 글로벌 소득 데이터</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">PPP(구매력평가) 기준 환산</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">실시간 계산, 개인정보 저장 없음</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 통계청, 세계은행 (2024년)
              </p>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/salary-rank')} />
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

export default function SalaryRankPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white flex items-center justify-center">
        <div className="text-slate-500">로딩 중...</div>
      </div>
    }>
      <SalaryRankContent />
    </Suspense>
  )
}
