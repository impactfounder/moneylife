import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '급여 실수령액 계산기 2026 - 4대보험, 세금 공제 | moneylife.kr',
  description: '2026년 4대보험 요율 적용 급여 계산기. 세전 급여에서 국민연금, 건강보험, 고용보험, 소득세를 공제한 실수령액을 계산합니다.',
  keywords: '급여 계산기, 실수령액 계산기, 월급 계산기, 4대보험 계산, 세후 월급, 연봉 실수령액',
  openGraph: {
    title: '급여 실수령액 계산기 2026 - 4대보험, 세금 공제',
    description: '2026년 4대보험 요율 적용 급여 계산기. 세전 급여에서 4대보험과 세금을 공제한 실수령액을 계산합니다.',
    url: 'https://moneylife.kr/salary-calculator',
    type: 'website',
  },
}

export default function SalaryCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
