import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2026 최저시급 계산기 - 월급, 주휴수당 계산 | moneylife.kr',
  description: '2026년 최저시급 10,320원 기준 월급 계산기. 근무시간별 일급, 주급, 월급과 주휴수당까지 자동 계산합니다.',
  keywords: '최저시급 계산기, 2026 최저시급, 최저임금 계산, 주휴수당 계산, 알바 월급 계산',
  openGraph: {
    title: '2026 최저시급 계산기 - 월급, 주휴수당 계산',
    description: '2026년 최저시급 10,320원 기준 월급 계산기. 근무시간별 일급, 주급, 월급과 주휴수당까지 자동 계산합니다.',
    url: 'https://moneylife.kr/minimum-wage-calculator',
    type: 'website',
  },
}

export default function MinimumWageCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
