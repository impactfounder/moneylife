import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI 재무 진단 - 나의 재정 건강 점수 확인 | moneylife.kr',
  description: '무료 AI 재무 진단으로 나의 재정 건강 점수를 확인하세요. 저축률, 부채비율, 순자산 분석과 맞춤형 재무 조언을 받아보세요.',
  keywords: 'AI 재무 진단, 재정 건강 점수, 재무 상담, 저축률 계산, 부채비율 분석, 무료 재무 진단',
  openGraph: {
    title: 'AI 재무 진단 - 나의 재정 건강 점수는?',
    description: '무료 AI 재무 진단으로 나의 재정 건강 점수를 확인하세요. 맞춤형 재무 조언을 받아보세요.',
    url: 'https://moneylife.kr/financial-diagnosis',
    type: 'website',
  },
}

export default function FinancialDiagnosisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
