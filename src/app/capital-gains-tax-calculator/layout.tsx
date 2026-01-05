import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '양도소득세 계산기 2026 - 부동산, 주식 양도세 | moneylife.kr',
  description: '양도소득세 계산기. 부동산, 주식 등 자산 양도 시 발생하는 양도소득세를 계산합니다. 장기보유특별공제도 적용됩니다.',
  keywords: '양도소득세 계산기, 양도세 계산, 부동산 양도세, 주식 양도세, 장기보유특별공제',
  openGraph: {
    title: '양도소득세 계산기 2026 - 부동산, 주식 양도세',
    description: '양도소득세 계산기. 부동산, 주식 등 자산 양도 시 발생하는 양도소득세를 계산합니다.',
    url: 'https://moneylife.kr/capital-gains-tax-calculator',
    type: 'website',
  },
}

export default function CapitalGainsTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
