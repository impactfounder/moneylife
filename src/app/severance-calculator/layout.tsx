import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '퇴직금 계산기 2025 - 근속기간별 퇴직금 계산 | moneylife.kr',
  description: '퇴직금 자동 계산기. 입사일, 퇴사일, 평균임금을 입력하면 퇴직금과 퇴직소득세를 계산합니다.',
  keywords: '퇴직금 계산기, 퇴직금 계산, 퇴직금 세금, 퇴직소득세, 근속기간 퇴직금',
  openGraph: {
    title: '퇴직금 계산기 2025 - 근속기간별 퇴직금 계산',
    description: '퇴직금 자동 계산기. 입사일, 퇴사일, 평균임금을 입력하면 퇴직금과 퇴직소득세를 계산합니다.',
    url: 'https://moneylife.kr/severance-calculator',
    type: 'website',
  },
}

export default function SeveranceCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
