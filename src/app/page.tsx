'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { formatNumber } from '@/lib/calculations'
import { getRecentPosts } from '@/data/posts'
import { QuickRankModal } from '@/components/ui/QuickRankModal'

// 전체 계산기 목록 (9개)
const calculators = [
  {
    id: 'salary-rank',
    name: '연봉 순위 계산기',
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
  {
    id: 'mortgage-calculator',
    name: '주택담보대출 계산기',
    icon: '🏠',
    description: 'LTV 자동 계산, 월별 상환 스케줄로 대출 계획 수립',
    href: '/mortgage-calculator',
  },
  {
    id: 'compound-interest-calculator',
    name: '복리 계산기',
    icon: '📈',
    description: '초기 투자금과 월 적립으로 10년 후 자산 시뮬레이션',
    href: '/compound-interest-calculator',
  },
  {
    id: 'pension-calculator',
    name: '국민연금 계산기',
    icon: '🏛️',
    description: '2025년 기준 예상 월 연금 수령액과 손익분기 나이 계산',
    href: '/pension-calculator',
  },
  {
    id: 'severance-calculator',
    name: '퇴직금 계산기',
    icon: '💼',
    description: '근속일수와 평균임금으로 퇴직금 + 퇴직소득세 계산',
    href: '/severance-calculator',
  },
  {
    id: 'income-tax-calculator',
    name: '종합소득세 계산기',
    icon: '📊',
    description: '2025년 8단계 누진세율, 6가지 공제 항목 자동 계산',
    href: '/income-tax-calculator',
  },
  {
    id: 'minimum-wage-calculator',
    name: '최저시급 계산기',
    icon: '⏰',
    description: '2026년 최저시급 10,320원 기준 월급, 주휴수당 계산',
    href: '/minimum-wage-calculator',
  },
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
      setError('연봉을 입력해주세요')
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-[1.1] tracking-[-0.025em] animate-slide-in">
                내 돈, 잘 관리하고 있을까?
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  AI 자산 진단으로 1분 만에 확인
                </span>
              </h1>

              {/* Sub Copy */}
              <p className="text-base md:text-lg text-slate-400 mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed animate-slide-in" style={{ animationDelay: '100ms' }}>
                연봉 순위부터 맞춤형 자산 진단까지,
                <br className="hidden sm:block" />
                30초 만에 나만의 금융 솔루션을 받아보세요.
              </p>

              {/* Easy Entry Form */}
              <div className="w-full max-w-md animate-fade-in" style={{ animationDelay: '200ms' }}>
                <form onSubmit={handleShowRank} className="space-y-6">
                  {/* 행동 유도 문구 */}
                  <p className="text-lg md:text-xl font-bold text-cyan-400 text-center animate-bounce">
                    내 연봉, 대한민국 상위 몇 %일까? 👇
                  </p>

                  {/* 입력 필드 */}
                  <div className="flex items-baseline justify-center gap-3">
                    <input
                      type="text"
                      value={salaryInput}
                      onChange={(e) => handleFormatInput(e.target.value)}
                      placeholder="예: 4,500"
                      className="w-52 md:w-60 py-2 text-4xl md:text-5xl font-bold text-center bg-transparent border-b-2 border-white/40 focus:border-cyan-400 focus:outline-none transition-all text-white placeholder-white/30 placeholder:text-lg md:placeholder:text-xl tracking-tight"
                    />
                    <span className="text-xl md:text-2xl font-medium text-slate-400">
                      만원
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 text-center">
                    ※ 세전 연봉 기준 (성과급·제수당 포함)
                  </p>
                  {error && (
                    <p className="text-sm text-red-400 text-center font-medium animate-fade-in">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    내 연봉 순위 & 재무 점수 확인하기
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </form>
                <p className="text-center text-sm text-slate-400 mt-4">
                  가입 없이 30초 만에 진단 완료
                </p>
              </div>

              {/* Trust Badges - 모바일 2x2, PC 1열 */}
              <div className="grid grid-cols-2 md:flex md:justify-center gap-2 md:gap-4 mt-8 md:mt-12 max-w-sm md:max-w-none mx-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg py-2.5 px-3 md:px-4">
                  <span className="text-green-400">✓</span>
                  <span className="text-xs text-slate-300 font-medium">100% 무료</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg py-2.5 px-3 md:px-4">
                  <span className="text-green-400">✓</span>
                  <span className="text-xs text-slate-300 font-medium">회원가입 없음</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg py-2.5 px-3 md:px-4">
                  <span className="text-green-400">✓</span>
                  <span className="text-xs text-slate-300 font-medium">개인정보 저장 안함</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-lg py-2.5 px-3 md:px-4">
                  <span className="text-green-400">✓</span>
                  <span className="text-xs text-slate-300 font-medium">통계청 데이터 기반</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                왜 MoneyLife인가요?
              </h2>
              <p className="text-slate-500 text-lg">
                단순 계산을 넘어, 진짜 금융 인사이트를 드립니다
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

        {/* Calculators Section - 전체 9개 노출 */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                필요한 기능만 골라 쓰세요
              </h2>
              <p className="text-slate-500 text-lg">
                금융 계산부터 자산 진단까지, 한 곳에서 해결
              </p>
            </div>

            {/* All Calculators Grid - 모바일 2열, PC 3열 */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {calculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className="group relative bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-300 border border-slate-100 hover:border-slate-200 overflow-hidden"
                >
                  {/* Badge - 있을 때만 표시 */}
                  {calc.badge && (
                    <span className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-slate-900 text-white text-[10px] lg:text-xs font-bold px-2 lg:px-3 py-1 lg:py-1.5 rounded-full">
                      {calc.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-slate-100 rounded-xl lg:rounded-2xl flex items-center justify-center text-2xl lg:text-3xl mb-4 lg:mb-6 group-hover:scale-110 group-hover:bg-slate-200 transition-all">
                    {calc.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-base lg:text-xl font-bold text-slate-900 mb-1 lg:mb-2 group-hover:text-slate-700">
                    {calc.name}
                  </h3>
                  <p className="text-slate-500 text-xs lg:text-sm leading-relaxed line-clamp-2">
                    {calc.description}
                  </p>

                  {/* Arrow - PC에서만 표시 */}
                  <div className="hidden lg:flex mt-6 items-center text-slate-400 group-hover:text-slate-600 transition-colors">
                    <span className="text-sm font-medium">바로가기</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Guide Section - 6개 노출 */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-2 tracking-tight">
                  금융 가이드
                </h2>
                <p className="text-slate-500">
                  자산 관리에 도움되는 최신 콘텐츠
                </p>
              </div>
              <Link
                href="/content"
                className="hidden sm:inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                전체 가이드 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* 모바일 1열, 태블릿 2열, PC 3열 - 6개 노출 (가이드 페이지와 동일한 카드) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {getRecentPosts(6).map((post) => (
                <Link
                  key={post.slug}
                  href={`/content/${post.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  {/* 상단: 아이콘 + 뱃지 */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{post.thumbnail}</span>
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  {/* 제목 */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2 break-keep min-h-[3.5rem] leading-snug">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link
                href="/content"
                className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
              >
                전체 가이드 보기
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6 tracking-tight">
              당신만의 금융 솔루션,
              <br />
              지금 바로 시작하세요
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
              30초 투자로 나의 재무 건강 점수와 맞춤형 자산 관리 전략을 무료로 받아보세요.
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
        annualSalary={modalSalary}
      />
    </>
  )
}
