import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '국민연금 계산기 2026 - 예상 수령액 계산 | moneylife.kr',
  description: '국민연금 예상 수령액을 계산합니다. 가입기간과 평균 소득을 입력하면 예상 연금액을 확인할 수 있습니다.',
  keywords: '국민연금 계산기, 연금 수령액 계산, 국민연금 예상액, 노후 연금, 연금 시뮬레이션',
  openGraph: {
    title: '국민연금 계산기 2026 - 예상 수령액 계산',
    description: '국민연금 예상 수령액을 계산합니다. 가입기간과 평균 소득을 입력하면 예상 연금액을 확인할 수 있습니다.',
    url: 'https://moneylife.kr/pension-calculator',
    type: 'website',
  },
}

export default function PensionCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
