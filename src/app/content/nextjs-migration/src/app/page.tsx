import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Calculator } from '@/types'

export const metadata: Metadata = {
  title: '금융계산기 - 연봉순위, 급여, 대출, 세금 계산 | moneylife.kr',
  description: '2025년 최신 금융계산기. 연봉순위 테스트, 급여 실수령액, 대출 상환액, 퇴직금, 국민연금, 종합소득세, 양도소득세를 1초만에 계산하세요. 100% 무료, 개인정보 보호.',
  keywords: '금융계산기, 연봉순위, 급여계산기, 대출계산기, 퇴직금계산, 국민연금, 종합소득세, 양도소득세, 실수령액, 내연봉순위',
  openGraph: {
    title: '💰 금융계산기 - 모든 금융 계산을 1초만에',
    description: '연봉순위 테스트부터 세금 계산까지. 9개 전문 계산기로 재테크 시작하세요!',
    type: 'website',
    url: 'https://moneylife.kr',
  },
  twitter: {
    card: 'summary_large_image',
    title: '💰 금융계산기 - 모든 금융 계산을 1초만에',
    description: '연봉순위 테스트부터 세금 계산까지. 9개 전문 계산기로 재테크 시작하세요!',
  }
}

const calculators: Calculator[] = [
  {
    id: 'salary-rank',
    name: '연봉 순위 테스트',
    icon: '🏆',
    description: '내 연봉이 대한민국, 전세계 상위 몇 %인지 1초만에 확인하세요',
    href: '/salary-rank',
    popular: true,
    badge: '바이럴'
  },
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
  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in">
              💰 금융계산기
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6 animate-fade-in">
              Smart Finance, Better Life
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-4 animate-fade-in">
              대출, 급여, 연금까지 모든 금융 계산을 한 곳에서
            </p>
            <p className="text-base md:text-lg text-gray-500 mb-8 animate-fade-in">
              2025년 최신 법령을 반영한 정확한 계산 결과를 제공합니다
            </p>
            
            {/* 주요 특징 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8 animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm md:text-base">2025년 최신 법령 반영</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm md:text-base">공식 기관 자료 기반</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm md:text-base">무료 무제한 이용</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm md:text-base">개인정보 보호</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Link
                href="/salary-rank"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
              >
                🏆 내 연봉 순위 확인하기
              </Link>
            </div>
          </div>
        </section>

        {/* 계산기 그리드 */}
        <section id="calculators" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              💼 9개 전문 계산기
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              2025년 최신 데이터 기반 · 100% 무료 · 개인정보 수집 없음
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calc, index) => (
                <Link
                  key={calc.id + index}
                  href={calc.href}
                  className="group card p-6 hover:scale-105 transition-transform animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl group-hover:scale-110 transition-transform">
                      {calc.icon}
                    </span>
                    {calc.popular && (
                      <span className="bg-danger text-white text-xs font-bold px-2 py-1 rounded-full">
                        {calc.badge || '인기'}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {calc.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {calc.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform">
                    계산하기
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 특징 섹션 */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
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
