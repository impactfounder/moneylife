import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '복리 계산기 - 복리 이자 수익 시뮬레이션 | moneylife.kr',
  description: '복리 이자 계산기. 원금, 이율, 기간을 입력하면 복리 수익과 원리금을 계산합니다. 적금, 투자 수익 시뮬레이션에 활용하세요.',
  keywords: '복리 계산기, 복리 이자 계산, 이자 계산기, 적금 계산기, 투자 수익 계산',
  openGraph: {
    title: '복리 계산기 - 복리 이자 수익 시뮬레이션',
    description: '복리 이자 계산기. 원금, 이율, 기간을 입력하면 복리 수익과 원리금을 계산합니다.',
    url: 'https://moneylife.kr/compound-interest-calculator',
    type: 'website',
  },
}

export default function CompoundInterestCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
