import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '연봉 순위 계산기 - 내 연봉은 상위 몇 %? | moneylife.kr',
  description: '내 연봉이 한국에서 상위 몇 퍼센트인지 확인하세요. 연령대별, 전체 근로자 기준 연봉 순위를 계산합니다.',
  keywords: '연봉 순위, 연봉 백분위, 연봉 상위 퍼센트, 내 연봉 순위, 연봉 비교',
  openGraph: {
    title: '연봉 순위 계산기 - 내 연봉은 상위 몇 %?',
    description: '내 연봉이 한국에서 상위 몇 퍼센트인지 확인하세요. 연령대별, 전체 근로자 기준 연봉 순위를 계산합니다.',
    url: 'https://moneylife.kr/salary-rank',
    type: 'website',
  },
}

export default function SalaryRankLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
