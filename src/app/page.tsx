'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { formatNumber } from '@/lib/calculations'
import { getRecentPosts } from '@/data/posts'
import { QuickRankModal } from '@/components/ui/QuickRankModal'

// Top 3 인기 계산기
const topCalculators = [
  {
    id: 'salary-rank',
    name: '연봉 순위',
    icon: '🏆',
    description: '내 연봉은 상위 몇 %? 통계청 데이터 기반 정확한 순위 확인',
    href: '/salary-rank',
    badge: '인기',
  },
  {
    id: 'salary-calculator',
    name: '급여 계산기',
    icon: '💰',
    description: '2025년 4대보험, 소득세 적용 실수령액 정확 계산',
    href: '/salary-calculator',
    badge: '필수',
  },
  {
    id: 'loan-calculator',
    name: '대출 계산기',
    icon: '🏦',
    description: '원리금균등, 원금균등 방식별 월 상환액과 총 이자 계산',
    href: '/loan-calculator',
    badge: '추천',
  },
]

// 나머지 계산기들
const moreCalculators = [
  { name: '주택담보대출', href: '/mortgage-calculator', icon: '🏠' },
  { name: '복리 계산기', href: '/compound-interest-calculator', icon: '📈' },
  { name: '국민연금', href: '/pension-calculator', icon: '🏛️' },
  { name: '퇴직금', href: '/severance-calculator', icon: '💼' },
  { name: '종합소득세', href: '/income-tax-calculator', icon: '📊' },
  { name: '양도소득세', href: '/capital-gains-tax-calculator', icon: '🏡' },
  { name: '최저시급', href: '/minimum-wage-calculator', icon: '⏰' },
]

export default function Home() {
  const [salaryInput, setSalaryInput] = useState('')
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalSalary, setModalSalary] = useState(0)

  const handleFormatInput = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '')
    if (numbers) {
      setSalaryInput(formatNumber(parseInt(numbers)))
    } else {
      setSalaryInput('')
    }
  }

  const handleShowRank = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const parsedSalary = parseInt(salaryInput.replace(/,/g, ''))
    if (!parsedSalary || isNaN(parsedSalary) || parsedSalary <= 0) {
      setError('월 실수령액을 입력해주세요')
      return
    }

    // 모달 열기 (바로 페이지 이동 X)
    setModalSalary(parsedSalary)
    setShowModal(true)
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero Section - Dark Navy Theme */}
        <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-36 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
          {/* Background Elements */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px]"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]"></div>
            <div className="absolute top-[40%] right-[30%] w-[200px] h-[200px] rounded-full bg-cyan-500/5 blur-[80px]"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 max-w-5xl">
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm font-medium mb-8 animate-fade-in">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                AI 재무 진단 서비스
              </div>

              {/* Main Copy */}
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight animate-slide-in">
                내 돈, 잘 관리하고 있을까?
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  AI가 1분 만에 무료로 진단
                </span>
              </h1>

              {/* Sub Copy */}
              <p className="text-lg lg:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-in" style={{ animationDelay: '100ms' }}>
                연봉 상위 %부터 자산 증식 로드맵까지,
                <br className="hidden sm:block" />
                인공지능이 객관적으로 분석해 드립니다.
              </p>

              {/* Easy Entry Form */}
              <div className="w-full max-w-md animate-fade-in" style={{ animationDelay: '200ms' }}>
                <form onSubmit={handleShowRank} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={salaryInput}
                      onChange={(e) => handleFormatInput(e.target.value)}
                      placeholder="월 실수령액 입력"
                      className="w-full px-6 py-5 text-xl font-bold text-center bg-white rounded-2xl border-2 border-transparent focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all text-slate-900 placeholder-slate-400 shadow-2xl shadow-black/20"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
                      만원
                    </div>
                  </div>
                  {error && (
                    <p className="text-sm text-red-400 text-center font-medium animate-fade-in">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    내 재무 점수 무료로 확인하기
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </form>
                <p className="text-center text-sm text-slate-400 mt-4">
                  가입 없이 30초 만에 진단 완료
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-slate-400 text-sm animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% 무료
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  개인정보 저장 안함
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  통계청 데이터 기반
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                왜 MoneyLife 진단인가요?
              </h2>
              <p className="text-slate-500 text-lg">
                단순 계산기를 넘어, 진짜 인사이트를 드립니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                  📊
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  객관적 위치 파악
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  대한민국 통계 데이터 기반으로 내 연봉과 자산 순위를 정확히 알려드려요. 나는 과연 상위 몇 %일까?
                </p>
              </div>

              {/* Card 2 */}
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                  🧙‍♂️
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  냉철한 AI 분석
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  월급이 사라지는 원인을 콕 집어내는 AI의 팩트 폭행 리포트. 재미있지만 뼈 때리는 진단을 받아보세요.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  구체적 로드맵
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  단순 조언을 넘어, 1년/3년/5년 뒤 모을 수 있는 자산을 시뮬레이션하고 실천 가능한 목표를 제시합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Calculators Section */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                필요한 기능만 골라 쓰세요
              </h2>
              <p className="text-slate-500 text-lg">
                가장 많이 사용되는 핵심 계산기
              </p>
            </div>

            {/* Top 3 Calculators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {topCalculators.map((calc, index) => (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 hover:border-slate-200 overflow-hidden"
                >
                  {/* Badge */}
                  <span className="absolute top-6 right-6 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {calc.badge}
                  </span>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-slate-200 transition-all">
                    {calc.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700">
                    {calc.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {calc.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center text-slate-400 group-hover:text-slate-600 transition-colors">
                    <span className="text-sm font-medium">바로가기</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* More Calculators */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {moreCalculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <span>{calc.icon}</span>
                    {calc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Latest Content Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  금융 꿀팁
                </h2>
                <p className="text-slate-500">
                  돈 관리에 도움되는 최신 콘텐츠
                </p>
              </div>
              <Link
                href="/content"
                className="hidden sm:inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                전체보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getRecentPosts(3).map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/content/${post.slug}`}
                  className="group bg-slate-50 rounded-2xl p-6 hover:bg-slate-100 transition-all duration-300 border border-transparent hover:border-slate-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{post.thumbnail}</span>
                    <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{post.readTime} 읽기</span>
                    <span className="group-hover:text-slate-600 transition-colors">
                      읽어보기 →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link
                href="/content"
                className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
              >
                전체 콘텐츠 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              지금 바로 내 재무 상태를
              <br />
              점검해보세요
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
              30초 투자로 나의 재무 건강 점수와 맞춤형 자산 증식 전략을 무료로 받아보세요.
            </p>
            <Link
              href="/financial-diagnosis"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              무료 AI 진단 시작하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-slate-900 mb-1">정확한 계산</h3>
                <p className="text-sm text-slate-500">
                  2025년 최신 세법 반영
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-slate-900 mb-1">1초 결과</h3>
                <p className="text-sm text-slate-500">
                  복잡한 계산도 즉시
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="font-bold text-slate-900 mb-1">정보 보호</h3>
                <p className="text-sm text-slate-500">
                  브라우저에서만 처리
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">💯</div>
                <h3 className="font-bold text-slate-900 mb-1">100% 무료</h3>
                <p className="text-sm text-slate-500">
                  가입 없이 바로 사용
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Quick Rank Modal */}
      <QuickRankModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        monthlySalary={modalSalary}
      />
    </>
  )
}
