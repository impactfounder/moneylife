'use client'

import { useState } from 'react'
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

export default function SalaryRankPage() {
  const [salaryInput, setSalaryInput] = useState('')
  const [salaryType, setSalaryType] = useState<'before' | 'after'>('after')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('all')

  const [result, setResult] = useState<{
    korea: RankResult
    world: RankResult
    age: RankResult | null
    actualSalary: number
    annualSalary: number
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 만원 단위 입력을 원 단위로 변환
    let salary = parseInt(salaryInput) * 10000
    if (!salary || salary <= 0) {
      alert('월 급여를 입력해주세요')
      return
    }

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

      <main className="min-h-screen bg-gradient-to-b from-slate-100 to-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-lg">

          {/* 입력 폼 */}
          {!result && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 md:p-8">
              {/* 헤더 */}
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  내 연봉상위 몇 %일까?
                </h1>
                <p className="text-sm text-slate-500">
                  1초만에 확인하는 소득 순위
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  📊 통계청 데이터 기반 정확한 계산
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 급여 유형 */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">
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
                  <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">
                    월 급여 (만원)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={salaryInput}
                      onChange={(e) => setSalaryInput(e.target.value)}
                      placeholder="예: 300"
                      className="w-full px-4 py-4 text-lg text-center border-2 border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all"
                      required
                      min={0}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                      만원
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 text-center">
                    {salaryType === 'after'
                      ? '실제 통장에 입금되는 금액'
                      : '세금과 4대보험 제외 전 금액'
                    }
                  </p>
                </div>

                {/* 나이대 */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">
                    나이대 <span className="text-slate-400 font-normal">(선택)</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['all', '20s', '30s', '40s'] as AgeGroup[]).map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setAgeGroup(age)}
                        className={`py-2.5 px-3 rounded-xl font-semibold text-sm transition-all ${
                          ageGroup === age
                            ? 'bg-slate-900 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {age === 'all' ? '전체' : age === '20s' ? '20대' : age === '30s' ? '30대' : '40대'}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {(['50s', '60s'] as AgeGroup[]).map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setAgeGroup(age)}
                        className={`py-2.5 px-3 rounded-xl font-semibold text-sm transition-all ${
                          ageGroup === age
                            ? 'bg-slate-900 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {age === '50s' ? '50대' : '60대'}
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
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 text-center">
                <p className="text-sm text-slate-500 mb-2">당신의 월 소득</p>
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {Math.round(result.actualSalary / 10000).toLocaleString()}만원
                </div>
                <div className="text-sm text-slate-500">
                  (연봉 약 {result.annualSalary.toLocaleString()}만원)
                </div>
              </div>

              {/* 대한민국 순위 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
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
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
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
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6">
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
              <div className="flex gap-3">
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

              {/* 광고 배치 */}
              <div className="my-4">
                <AdUnit />
              </div>

              {/* 추가 정보 */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/salary-calculator"
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 hover:shadow-xl transition-all"
                >
                  <div className="text-2xl mb-2">💼</div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">급여 계산기</h4>
                  <p className="text-xs text-slate-500">4대보험, 세금 계산</p>
                </Link>

                <Link
                  href="/content/salary-ranking"
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 hover:shadow-xl transition-all"
                >
                  <div className="text-2xl mb-2">📊</div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">연봉 통계</h4>
                  <p className="text-xs text-slate-500">연령별, 직군별 비교</p>
                </Link>
              </div>
            </div>
          )}

          {/* 관련 가이드 섹션 */}
          <div className="mt-8">
            <RelatedGuides posts={getPostsByCalculator('/salary-rank')} />
          </div>

          {/* 광고 배치 - Footer 위 */}
          <div className="my-8">
            <AdUnit />
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
