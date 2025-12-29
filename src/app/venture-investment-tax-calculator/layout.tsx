import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '벤처투자 소득공제 계산기 - 엔젤투자 세제혜택 | moneylife.kr',
  description: '벤처기업 투자 소득공제 계산기. 엔젤투자, 벤처펀드 투자 시 받을 수 있는 소득공제 금액을 계산합니다.',
  keywords: '벤처투자 소득공제, 엔젤투자 세제혜택, 벤처기업 투자, 소득공제 계산기',
  openGraph: {
    title: '벤처투자 소득공제 계산기 - 엔젤투자 세제혜택',
    description: '벤처기업 투자 소득공제 계산기. 엔젤투자, 벤처펀드 투자 시 받을 수 있는 소득공제 금액을 계산합니다.',
    url: 'https://moneylife.kr/venture-investment-tax-calculator',
    type: 'website',
  },
}

export default function VentureInvestmentTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
