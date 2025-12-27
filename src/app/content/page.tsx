'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'

// 제목을 줄바꿈 지점에서 분리하여 배열로 반환 (긴 제목만)
const splitTitleForLineBreak = (title: string): string[] => {
  // 짧은 제목(20자 이하)은 줄바꿈 하지 않음
  if (title.length <= 20) {
    return [title]
  }
  // 우선순위: 하이픈 > 물음표 > 쉼표
  if (title.includes(' - ')) {
    const idx = title.indexOf(' - ')
    return [title.slice(0, idx), title.slice(idx)]
  }
  if (title.includes('? ')) {
    const idx = title.indexOf('? ') + 1
    return [title.slice(0, idx), title.slice(idx + 1)]
  }
  if (title.includes(', ')) {
    const idx = title.lastIndexOf(', ') + 1
    return [title.slice(0, idx), title.slice(idx + 1)]
  }
  return [title]
}

const contents = [
  {
    id: 1,
    title: '월급 300만원의 현실',
    description: '2025년 기준 월급 300만원의 실수령액, 생활비, 저축 가능 금액을 상세히 분석합니다',
    icon: '💰',
    href: '/content/salary-3million',
    category: '급여'
  },
  {
    id: 2,
    title: '내 연봉, 상위 몇 %?',
    description: '2025년 한국 근로자 연봉 순위표. 내 연봉이 상위 몇 %인지 확인하세요',
    icon: '📊',
    href: '/content/salary-ranking',
    category: '급여'
  },
  {
    id: 3,
    title: '2025년 연봉별 실수령액 표',
    description: '연봉 3천만원부터 3억원까지 실수령액 한눈에 비교',
    icon: '💵',
    href: '/content/salary-table',
    category: '급여'
  },
  {
    id: 4,
    title: 'ISA 계좌 완벽 가이드',
    description: 'ISA 계좌의 모든 것. 가입 조건, 세제 혜택, 투자 전략까지',
    icon: '📈',
    href: '/content/isa-guide',
    category: '투자'
  },
  {
    id: 5,
    title: '연금저축 vs IRP 비교',
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
    category: '급여'
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
  },
  {
    id: 12,
    title: '연봉 협상 전 꼭 알아야 할 5가지 공제 항목',
    description: '4대보험과 세금 공제 항목 정리. 실수령액 정확히 계산하기',
    icon: '📋',
    href: '/content/salary-deduction-guide',
    category: '급여'
  },
  {
    id: 13,
    title: '연봉 vs 월급, 뭐가 더 유리할까?',
    description: '퇴직금, 상여금 포함 여부에 따른 실제 수령액 차이',
    icon: '💵',
    href: '/content/salary-vs-monthly-pay',
    category: '급여'
  },
  {
    id: 14,
    title: '원리금균등 vs 원금균등 vs 체증식',
    description: '대출 상환 방식에 따른 총 이자 차이 비교 분석',
    icon: '📊',
    href: '/content/loan-repayment-method-comparison',
    category: '대출'
  },
  {
    id: 15,
    title: '대출 이자 100만원 아끼는 중도상환 전략',
    description: '중도상환수수료, 최적 타이밍, 전략적 상환 방법',
    icon: '⏰',
    href: '/content/prepayment-strategy',
    category: '대출'
  },
  {
    id: 16,
    title: '2025년 은행별 신용대출 금리 비교',
    description: '주요 은행별 신용대출 금리와 우대금리 조건',
    icon: '🏦',
    href: '/content/bank-loan-rate-comparison',
    category: '대출'
  },
  {
    id: 17,
    title: 'LTV, DTI, DSR 완벽 정리',
    description: '주택담보대출 핵심 규제와 대출 한도 계산법',
    icon: '🏠',
    href: '/content/ltv-dti-dsr-explained',
    category: '대출'
  },
  {
    id: 18,
    title: '2025년 주담대 갈아타기, 지금이 적기일까?',
    description: '대환대출 적정 시기와 절차, 비용 계산법',
    icon: '🔄',
    href: '/content/mortgage-refinancing',
    category: '대출'
  },
  {
    id: 19,
    title: '생애최초 주택구입자를 위한 특례대출 총정리',
    description: '디딤돌대출, 보금자리론 등 우대 조건과 신청 방법',
    icon: '🏡',
    href: '/content/first-time-buyer-loans',
    category: '대출'
  },
  {
    id: 20,
    title: '2025년 연봉 실수령액 표 - 완벽 정리',
    description: '3000만원부터 1억까지 4대보험 적용 실수령액',
    icon: '💰',
    href: '/content/2025-salary-net-income-table',
    category: '급여'
  },
  {
    id: 21,
    title: '연말정산 환급 극대화하는 법',
    description: '신용카드, 의료비, 교육비 공제부터 연금저축까지',
    icon: '🧾',
    href: '/content/year-end-tax-adjustment-tips',
    category: '세금'
  },
  {
    id: 22,
    title: '퇴직금 IRP로 받으면 세금 얼마나 줄어들까?',
    description: '퇴직금 수령 방식에 따른 세금 차이와 절세 방법',
    icon: '💼',
    href: '/content/retirement-severance-irp-tax',
    category: '연금'
  },
  {
    id: 23,
    title: '30대 평균 연봉은 얼마?',
    description: '2025년 30대 직장인의 평균 연봉과 중위 소득 분석',
    icon: '👔',
    href: '/content/30s-average-salary-korea',
    category: '급여'
  },
  {
    id: 24,
    title: '국민연금 언제부터 받을 수 있나?',
    description: '출생연도별 수령 시작 나이와 예상 연금액 계산',
    icon: '👴',
    href: '/content/national-pension-receive-age',
    category: '연금'
  },
  {
    id: 25,
    title: '부동산 양도소득세 계산법 완벽 정리',
    description: '1세대 1주택 비과세 요건, 장기보유특별공제 총정리',
    icon: '🏘️',
    href: '/content/capital-gains-tax-real-estate',
    category: '세금'
  }
]

const categories = ['전체', '급여', '대출', '부동산', '투자', '연금', '세금']

export default function ContentPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체')

  const filteredContents = selectedCategory === '전체'
    ? contents
    : contents.filter(content => content.category === selectedCategory)

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* 히어로 섹션 */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              금융 가이드
            </h1>
            <p className="text-base md:text-lg text-slate-600">
              자산 관리에 도움이 되는 유용한 정보를 제공합니다
            </p>
          </div>
        </section>

        {/* 카테고리 필터 - Header(64px) + Ticker(28px on desktop) */}
        <section className="bg-white border-b border-slate-200 sticky top-16 md:top-[92px] z-40">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-3 py-6 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 콘텐츠 그리드 */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <span className="text-sm text-slate-500">
                {filteredContents.length}개의 가이드
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContents.map((content) => (
                <Link key={content.id} href={content.href}>
                  <Card className="h-full hover:scale-105 transition-transform cursor-pointer">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl">{content.icon}</span>
                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                          {content.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {splitTitleForLineBreak(content.title).map((line, i) => (
                          <span key={i} className="block">{line}</span>
                        ))}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {content.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-slate-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              금융 계산이 필요하신가요?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              9개 전문 계산기로 1초만에 계산하세요
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors shadow-lg"
            >
              계산기로 돌아가기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
