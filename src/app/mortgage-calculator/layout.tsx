import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '주택담보대출 계산기 - LTV, DTI, DSR 한도 계산 | moneylife.kr',
  description: '주택담보대출 한도와 월 상환금을 계산합니다. LTV, DTI, DSR 규제에 따른 대출 가능 금액을 확인하세요.',
  keywords: '주택담보대출 계산기, 주담대 계산기, LTV 계산, DTI 계산, DSR 계산, 대출 한도',
  openGraph: {
    title: '주택담보대출 계산기 - LTV, DTI, DSR 한도 계산',
    description: '주택담보대출 한도와 월 상환금을 계산합니다. LTV, DTI, DSR 규제에 따른 대출 가능 금액을 확인하세요.',
    url: 'https://moneylife.kr/mortgage-calculator',
    type: 'website',
  },
}

export default function MortgageCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
