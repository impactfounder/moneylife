'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

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
    description: '2026년 4대보험, 소득세 적용 실수령액 정확 계산',
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
    description: '2026년 기준 예상 월 연금 수령액과 손익분기 나이 계산',
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
    description: '2026년 8단계 누진세율, 6가지 공제 항목 자동 계산',
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

export default function CalculatorsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section - 메인 페이지와 동일한 다크 테마 */}
        <section className="relative pt-16 pb-16 lg:pt-20 lg:pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
          {/* Background Elements */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px]"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]"></div>
            <div className="absolute top-[40%] right-[30%] w-[200px] h-[200px] rounded-full bg-cyan-500/5 blur-[80px]"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              금융 계산기 모음
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
              연봉, 대출, 투자, 세금까지 — 9개의 필수 금융 계산기를 무료로 이용하세요
            </p>
          </div>
        </section>

        {/* Calculator Grid - 메인 페이지와 동일한 스타일 */}
        <section className="py-12 lg:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
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
                  <h2 className="text-base lg:text-xl font-bold text-slate-900 mb-1 lg:mb-2 group-hover:text-slate-700">
                    {calc.name}
                  </h2>
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

        {/* CTA Section - 메인 페이지와 동일한 다크 테마 */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl lg:text-3xl font-black text-white mb-4 tracking-tight">
              내 재무 상태, 정확히 알고 싶다면?
            </h2>
            <p className="text-slate-300 text-base lg:text-lg mb-8 max-w-2xl mx-auto">
              AI가 분석하는 맞춤형 재무 진단을 무료로 받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/financial-diagnosis"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                무료 AI 진단 시작하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/content"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors"
              >
                금융 콘텐츠 보러가기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
