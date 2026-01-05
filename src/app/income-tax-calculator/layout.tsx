import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '종합소득세 계산기 2026 - 세율표 기준 계산 | moneylife.kr',
  description: '2026년 종합소득세 계산기. 과세표준에 따른 세율표를 적용해 종합소득세와 지방소득세를 계산합니다.',
  keywords: '종합소득세 계산기, 소득세 계산, 종소세 계산, 세율표, 과세표준, 소득세율',
  openGraph: {
    title: '종합소득세 계산기 2026 - 세율표 기준 계산',
    description: '2026년 종합소득세 계산기. 과세표준에 따른 세율표를 적용해 종합소득세와 지방소득세를 계산합니다.',
    url: 'https://moneylife.kr/income-tax-calculator',
    type: 'website',
  },
}

export default function IncomeTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
