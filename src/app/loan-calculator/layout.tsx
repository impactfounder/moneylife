import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '대출이자 계산기 - 원리금균등, 원금균등 상환 | moneylife.kr',
  description: '대출 원리금균등상환, 원금균등상환 방식별 월 상환금과 총 이자를 계산합니다. 상환 스케줄까지 한눈에 확인하세요.',
  keywords: '대출 계산기, 대출이자 계산, 원리금균등상환, 원금균등상환, 월 상환금, 대출 상환 계획',
  openGraph: {
    title: '대출이자 계산기 - 원리금균등, 원금균등 상환',
    description: '대출 원리금균등상환, 원금균등상환 방식별 월 상환금과 총 이자를 계산합니다.',
    url: 'https://moneylife.kr/loan-calculator',
    type: 'website',
  },
}

export default function LoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
