import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'

export const metadata = {
  title: '금융 콘텐츠 - 재테크 가이드 | moneylife.kr',
  description: '연봉, 급여, 투자, 세금에 대한 유용한 금융 콘텐츠를 제공합니다.',
}

const contents = [
  {
    id: 1,
    title: '월급 300만원의 현실',
    description: '2025년 월급 300만원의 구매력과 생활 수준을 분석합니다',
    icon: '💰',
    href: '/content/salary-3million',
    category: '급여'
  },
  {
    id: 2,
    title: '2025년 연봉 순위표',
    description: '연령대별, 지역별 상세 연봉 순위 데이터',
    icon: '📊',
    href: '/content/salary-ranking',
    category: '연봉'
  },
  {
    id: 3,
    title: '2025년 급여 실수령액표',
    description: '세전 급여별 실수령액 총정리',
    icon: '💵',
    href: '/content/salary-table',
    category: '급여'
  },
  {
    id: 4,
    title: 'ISA 계좌 완벽 가이드 (2025)',
    description: '절세와 투자를 동시에! ISA 계좌 활용법',
    icon: '📈',
    href: '/content/isa-guide',
    category: '투자'
  },
  {
    id: 5,
    title: '연금저축 vs IRP 비교 (2025)',
    description: '노후 준비의 핵심, 어떤 것을 선택할까?',
    icon: '🏦',
    href: '/content/pension-vs-irp',
    category: '연금'
  },
  {
    id: 6,
    title: '연봉 1억의 실수령액과 세금',
    description: '고소득자의 세금 부담과 실제 생활',
    icon: '💎',
    href: '/content/annual-salary-100m',
    category: '연봉'
  },
  {
    id: 7,
    title: '연봉 협상 전략 가이드',
    description: '연봉 협상 시 알아야 할 모든 것. 타이밍, 준비 자료, 실전 화법까지',
    icon: '💪',
    href: '/content/salary-negotiation',
    category: '급여'
  },
  {
    id: 8,
    title: '주택담보대출 갈아타기',
    description: '금리 0.5%만 낮춰도 수천만원 절약! 주담대 갈아타기 완벽 가이드',
    icon: '🏠',
    href: '/content/mortgage-refinance',
    category: '부동산'
  },
  {
    id: 9,
    title: '퇴직연금 운용 전략',
    description: 'DC형, IRP 퇴직연금 똑똑하게 운용하는 방법',
    icon: '🎓',
    href: '/content/pension-strategy',
    category: '연금'
  },
  {
    id: 10,
    title: '복리 투자 시뮬레이션',
    description: '월 30만원 × 20년 × 연 7% = 1억 5천만원! 복리의 마법',
    icon: '🚀',
    href: '/content/compound-interest',
    category: '투자'
  },
  {
    id: 11,
    title: '절세 전략 2025',
    description: '2025년 최신 세법 기준 합법적 절세 방법 총정리',
    icon: '💸',
    href: '/content/tax-saving',
    category: '세금'
  }
]

export default function ContentPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              📚 금융 콘텐츠
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              재테크에 도움이 되는 유용한 정보를 제공합니다
            </p>
          </div>
        </section>

        {/* 콘텐츠 그리드 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contents.map((content) => (
                <Link key={content.id} href={content.href}>
                  <Card className="h-full hover:scale-105 transition-transform cursor-pointer">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-5xl">{content.icon}</span>
                        <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                          {content.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {content.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {content.description}
                      </p>
                      
                      <div className="mt-4 flex items-center text-primary font-semibold text-sm">
                        자세히 보기
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              금융 계산이 필요하신가요?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              9개 전문 계산기로 1초만에 계산하세요
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              💰 계산기로 돌아가기
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
