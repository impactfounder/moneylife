'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Calculator } from '@/types'
import {
  calculateKoreaRank,
  calculateWorldRank,
  formatNumber,
  convertBeforeToAfter,
  convertAfterToBefore,
} from '@/lib/calculations'
import { getRecentPosts } from '@/data/posts'

// Metadata는 'use client' 컴포넌트에서는 사용 불가
// layout.tsx에서 관리됨

const calculators: Calculator[] = [
  {
    id: 'salary-calculator',
    name: '급여 계산기',
    icon: '💰',
    description: '2025년 4대보험, 소득세 적용 실수령액 정확 계산',
    href: '/salary-calculator',
    popular: true
  },
  {
    id: 'loan-calculator',
    name: '대출 계산기',
    icon: '🏦',
    description: '원리금균등, 원금균등 방식별 월 상환액과 총 이자 계산',
    href: '/loan-calculator',
    popular: true
  },
  {
    id: 'mortgage-calculator',
    name: '주택담보대출 계산기',
    icon: '🏠',
    description: 'LTV 자동 계산, 월별 상환 스케줄로 대출 계획 수립',
    href: '/mortgage-calculator'
  },
  {
    id: 'compound-interest-calculator',
    name: '복리 이자 계산기',
    icon: '📈',
    description: '초기 투자금과 월 적립으로 10년 후 자산 시뮬레이션',
    href: '/compound-interest-calculator'
  },
  {
    id: 'pension-calculator',
    name: '국민연금 계산기',
    icon: '💰',
    description: '2025년 기준 예상 월 연금 수령액과 손익분기 나이 계산',
    href: '/pension-calculator'
  },
  {
    id: 'severance-calculator',
    name: '퇴직금 계산기',
    icon: '💼',
    description: '근속일수와 평균임금으로 퇴직금 + 퇴직소득세 계산',
    href: '/severance-calculator'
  },
  {
    id: 'income-tax-calculator',
    name: '종합소득세 계산기',
    icon: '📊',
    description: '2025년 8단계 누진세율, 6가지 공제 항목 자동 계산',
    href: '/income-tax-calculator'
  },
  {
    id: 'capital-gains-tax-calculator',
    name: '양도소득세 계산기',
    icon: '🏡',
    description: '부동산 양도차익, 장기보유공제, 다주택 중과세 반영',
    href: '/capital-gains-tax-calculator'
  }
]

export default function Home() {
  const [salaryInput, setSalaryInput] = useState('')
  const [salaryType, setSalaryType] = useState<'before' | 'after'>('after')
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{
    koreaRank: number
    worldRank: number
    actualSalary: number
    annualSalary: number
  } | null>(null)

  const handleQuickCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    let salary = parseInt(salaryInput.replace(/,/g, ''))
    if (!salary || salary <= 0) {
      alert('월 급여를 입력해주세요')
      return
    }

    // 만원 단위 -> 원 단위 변환
    salary = salary * 10000

    // 통계 비교를 위해 '세전(Gross)' 기준으로 통일
    let grossSalary = salary

    if (salaryType === 'after') {
      // 세후 입력 시 -> 세전으로 변환하여 비교
      grossSalary = convertAfterToBefore(salary)
    }
    // 세전 입력 시 -> 그대로 사용

    // 순위 계산 (세전 기준)
    const koreaRankResult = calculateKoreaRank(grossSalary, 'all')
    const worldRankResult = calculateWorldRank(grossSalary)
    const annualSalary = Math.round(grossSalary * 12 / 10000)

    setResult({
      koreaRank: koreaRankResult.percentile,
      worldRank: worldRankResult.percentile,
      actualSalary: salaryType === 'after' ? salary : convertBeforeToAfter(salary), // 보여주는 실수령액
      annualSalary
    })
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setSalaryInput('')
    setResult(null)
  }

  const handleFormatInput = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '')
    if (numbers) {
      setSalaryInput(formatNumber(parseInt(numbers)))
    } else {
      setSalaryInput('')
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* 히어로 섹션 */}
        {/* 히어로 섹션 */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50">
          {/* Stripe-like Mesh Gradient Background */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-teal-400/10 blur-[100px]"></div>
            {/* Grid Pattern Overlay for Tech feel */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-8 animate-fade-in border border-slate-200">
                  💰 2025년 최신 세법 완벽 반영
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight animate-slide-in">
                  Smart Finance,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">
                    Better Life
                  </span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-slide-in" style={{ animationDelay: '100ms' }}>
                  복잡한 금융 계산, 이제 전문가처럼 쉽고 정확하게.<br className="hidden lg:block" />
                  연봉부터 세금까지 모든 계산을 한 곳에서 해결하세요.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-in" style={{ animationDelay: '200ms' }}>
                  <button
                    onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-1"
                  >
                    모든 계산기 보기
                  </button>
                  <Link
                    href="/salary-rank"
                    className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all hover:border-slate-300"
                  >
                    내 연봉 순위 확인
                  </Link>
                </div>
              </div>

              {/* 빠른 연봉 순위 계산기 (카드 형태) */}
              <div className="lg:w-1/2 w-full max-w-md animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
                  {/* 뱃지 */}
                  {/* 뱃지 제거됨 */}

                  <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                    내 연봉상위 몇 %일까?
                  </h2>
                  <p className="text-slate-500 text-center mb-8 text-sm">
                    1초만에 확인하는 소득 순위<br />
                    <span className="text-xs text-slate-400 mt-1 inline-block">📊 통계청 데이터 기반 정확한 계산</span>
                  </p>

                  {!showResult ? (
                    <form onSubmit={handleQuickCalculate} className="space-y-6">
                      {/* 급여 유형 선택 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          급여 유형
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setSalaryType('after')}
                            className={`px-3 py-3 rounded-xl font-semibold transition-all text-sm leading-tight ${salaryType === 'after'
                              ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                          >
                            세후<br /><span className="text-xs opacity-75">(실수령액)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSalaryType('before')}
                            className={`px-3 py-3 rounded-xl font-semibold transition-all text-sm leading-tight ${salaryType === 'before'
                              ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                          >
                            세전<br /><span className="text-xs opacity-75">(연봉계약서)</span>
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
                            type="text"
                            value={salaryInput}
                            onChange={(e) => handleFormatInput(e.target.value)}
                            placeholder="예: 300"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-3 text-center">
                          {salaryType === 'after' ? '실제 통장에 입금되는 금액' : '4대보험·세금 공제 전 금액'}
                        </p>
                      </div>

                      {/* 제출 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        🏆 내 순위 확인하기
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-8 py-4">
                      {/* 결과 표시 */}
                      <div className="text-center">
                        <div className="text-sm text-slate-500 mb-2 font-medium">
                          월 {formatNumber(result?.actualSalary || 0)}만원 (연봉 약 {result?.annualSalary || 0}백만원)
                        </div>
                        <div className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">
                          상위 {result?.koreaRank || 0}%
                        </div>
                        <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                          🇰🇷 대한민국 소득 기준
                        </div>
                      </div>

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
                          상세 분석 보기
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 계산기 그리드 */}
        <section id="calculators" className="pb-20 pt-10 bg-slate-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
                🧮 계산기
              </h2>
            </div>
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
              {calculators.map((calc, index) => (
                <Link
                  key={calc.id + index}
                  href={calc.href}
                  className="group relative bg-white rounded-2xl p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 hover:border-slate-200 flex flex-col items-center text-center animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* 아이콘 박스 */}
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-100 group-hover:shadow-inner">
                    {calc.icon}
                  </div>

                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                    {calc.name}
                  </h3>

                  {/* 설명 */}
                  <p className="text-slate-500 text-sm leading-relaxed break-keep font-medium">
                    {calc.description}
                  </p>

                  {/* 뱃지 (우측 상단 고정) */}
                  {calc.popular && (
                    <span className="absolute top-6 right-6 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {calc.badge || '인기'}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 인기 콘텐츠 섹션 */}
        <section className="pb-32 bg-slate-50/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
                  📚 인기 콘텐츠
                </h2>
                <Link
                  href="/content"
                  className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
                >
                  전체보기 →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getRecentPosts(3).map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/content/${post.slug}`}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-slate-200 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{post.thumbnail}</span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2">
                      {post.description}
                    </p>
                    <div className="mt-4 text-xs text-slate-400">
                      {post.readTime} 읽기
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 특징 섹션 */}
        <section className="bg-white py-32 border-t border-slate-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-slate-900 mb-16 tracking-tight">
              ✨ 왜 금융계산기를 사용해야 할까요?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">정확한 계산</h3>
                <p className="text-gray-600">
                  통계청, 국세청 2025년 최신 데이터 기반
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1초 결과</h3>
                <p className="text-gray-600">
                  복잡한 금융 계산도 즉시 확인
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">개인정보 보호</h3>
                <p className="text-gray-600">
                  모든 계산은 브라우저에서만 처리
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl mb-4">💯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% 무료</h3>
                <p className="text-gray-600">
                  회원가입, 로그인 없이 바로 사용
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
