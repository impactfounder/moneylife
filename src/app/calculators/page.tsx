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

export default function CalculatorsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 text-white py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              금융 계산기 모음
            </h1>
            <p className="text-sm md:text-lg text-violet-100 max-w-2xl mx-auto">
              연봉, 대출, 투자, 세금까지 — 9개의 필수 금융 계산기를 무료로 이용하세요
            </p>
          </div>
        </section>

        {/* Calculator Grid */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {calculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.href}
                  className="group bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-lg border border-slate-100 hover:border-violet-200 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform">
                      {calc.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-base md:text-lg font-bold text-slate-800 group-hover:text-violet-700 transition-colors">
                          {calc.name}
                        </h2>
                        {calc.badge && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            calc.badge === '인기' ? 'bg-rose-100 text-rose-600' :
                            calc.badge === '필수' ? 'bg-blue-100 text-blue-600' :
                            'bg-emerald-100 text-emerald-600'
                          }`}>
                            {calc.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {calc.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 md:py-12 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <p className="text-slate-600 mb-4">
              더 많은 금융 정보가 궁금하신가요?
            </p>
            <Link
              href="/content"
              className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors"
            >
              금융 콘텐츠 보러가기
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
