'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateCompoundInterest } from '@/lib/compound-calculator'
import { formatNumber } from '@/lib/calculations'
import type { CompoundInterestResult } from '@/types'

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('')
  const [monthlyDeposit, setMonthlyDeposit] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [years, setYears] = useState('')
  const [result, setResult] = useState<CompoundInterestResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const calcResult = calculateCompoundInterest({
      principal: parseInt(principal) || 0,
      monthlyDeposit: parseInt(monthlyDeposit) || 0,
      annualRate: parseFloat(annualRate),
      years: parseInt(years),
      compoundFrequency: 'monthly'
    })

    setResult(calcResult)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📈 복리 이자 계산기</h1>
            <p className="text-lg text-gray-600">초기 투자금과 월 적립금으로 미래 자산을 계산합니다</p>
          </div>

          <Card title="📝 투자 정보 입력">
            <form onSubmit={handleCalculate} className="space-y-6">
              <Input label="💰 초기 투자금" value={principal} onChange={setPrincipal} type="number" placeholder="예: 10000000" unit="원" required min={0} />
              <Input label="💵 월 적립금" value={monthlyDeposit} onChange={setMonthlyDeposit} type="number" placeholder="예: 500000" unit="원" min={0} />
              <Input label="📊 연 이자율" value={annualRate} onChange={setAnnualRate} type="number" placeholder="예: 5" unit="%" required min={0} max={100} step={0.1} />
              <Input label="📅 투자 기간" value={years} onChange={setYears} type="number" placeholder="예: 10" unit="년" required min={1} max={50} />
              <Button type="submit" className="w-full" size="lg">📈 미래 자산 계산하기</Button>
            </form>
          </Card>

          {result && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="text-center">
                  <p className="text-sm opacity-90 mb-2">미래 예상 자산</p>
                  <h2 className="text-5xl font-bold mb-4">{formatNumber(result.finalAmount)}원</h2>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-sm opacity-90">총 원금</p>
                      <p className="text-xl font-bold">{formatNumber(result.totalDeposit)}원</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">수익금</p>
                      <p className="text-xl font-bold">+{formatNumber(result.totalInterest)}원</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="📊 연도별 자산 증가">
                <div className="space-y-2">
                  {result.yearlyData.map(item => (
                    <div key={item.year} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.year}년차</span>
                      <span className="text-lg font-bold text-primary">{formatNumber(item.balance)}원</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* SEO 콘텐츠 섹션 */}
          <SEOContent
            title="복리의 마법: 장기 투자 수익 극대화 가이드"
            description="아인슈타인이 '8번째 불가사의'라고 부른 복리의 원리와 효과적인 장기 투자 전략을 상세히 알아봅니다."
            content={`
              <h3>복리란 무엇인가?</h3>
              <p><strong>복리(Compound Interest)</strong>는 원금뿐만 아니라 이자에도 이자가 붙는 방식입니다. 시간이 지날수록 이자가 기하급수적으로 증가하기 때문에, 장기 투자에서 엄청난 효과를 발휘합니다. 아인슈타인은 복리를 "인류 최대의 발명", "우주에서 가장 강력한 힘"이라고 표현했습니다.</p>

              <h3>단리 vs 복리 비교</h3>
              <p><strong>단리:</strong> 원금에만 이자가 붙음. 1억원을 연 5% 단리로 10년 투자 시 → 1억 5,000만원</p>
              <p><strong>복리:</strong> 원금+이자에 이자가 붙음. 1억원을 연 5% 복리로 10년 투자 시 → 1억 6,289만원</p>
              <p>10년만에 약 1,289만원의 차이가 발생합니다. 기간이 길어질수록 이 차이는 기하급수적으로 커집니다.</p>

              <h3>복리 효과 시뮬레이션</h3>
              <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">투자 기간</th>
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">1,000만원 (연 7%)</th>
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">월 50만원 적립 (연 7%)</th>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">5년</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">1,403만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">3,580만원</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">10년</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">1,967만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">8,654만원</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">20년</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">3,870만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">2억 6,046만원</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">30년</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">7,612만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">6억 1,227만원</td>
                </tr>
              </table>
              <p>30년간 월 50만원씩 적립하면 원금 1억 8,000만원이 <strong>6억 원 이상</strong>이 됩니다!</p>

              <h3>72의 법칙: 원금이 2배가 되는 기간</h3>
              <p><strong>72의 법칙</strong>은 투자금이 2배가 되는 기간을 간단히 계산하는 방법입니다.</p>
              <p style="background-color: #f0fdf4; padding: 16px; border-radius: 8px; font-size: 1.1em;"><strong>72 ÷ 연이율(%) = 원금 2배 소요 기간(년)</strong></p>
              <ul>
                <li>연 6% 수익률: 72 ÷ 6 = <strong>12년</strong></li>
                <li>연 8% 수익률: 72 ÷ 8 = <strong>9년</strong></li>
                <li>연 10% 수익률: 72 ÷ 10 = <strong>7.2년</strong></li>
              </ul>

              <h3>복리 투자를 위한 금융 상품</h3>
              <p><strong>1. ISA 계좌:</strong> 다양한 금융상품을 한 계좌에서 운용하며, 수익에 대해 최대 400만원까지 비과세 혜택을 받을 수 있습니다.</p>
              <p><strong>2. 연금저축펀드:</strong> 세액공제 혜택과 함께 노후 자금을 복리로 굴릴 수 있습니다. 연 최대 600만원까지 세액공제 가능.</p>
              <p><strong>3. IRP (개인형 퇴직연금):</strong> 퇴직금을 옮기거나 추가 납입해 세제 혜택과 복리 효과를 동시에 누릴 수 있습니다.</p>
              <p><strong>4. 적립식 펀드/ETF:</strong> 매월 일정 금액을 투자해 평균 매입단가를 낮추고 장기 복리 효과를 누릴 수 있습니다.</p>

              <h3>복리 효과를 극대화하는 3가지 원칙</h3>
              <p><strong>1. 일찍 시작하세요:</strong> 같은 금액이라도 10년 먼저 시작하면 결과가 2배 이상 차이 납니다. 20대부터 시작하면 은퇴 시점에 엄청난 차이를 만들어냅니다.</p>
              <p><strong>2. 꾸준히 투자하세요:</strong> 시장 타이밍을 맞추려 하지 말고, 매월 일정 금액을 꾸준히 투자하는 적립식 투자가 장기적으로 더 유리합니다.</p>
              <p><strong>3. 비용을 최소화하세요:</strong> 펀드 수수료, 세금 등 비용이 복리로 쌓이면 큰 손실이 됩니다. 저비용 인덱스 펀드나 ETF를 활용하고, 세제 혜택 상품을 적극 활용하세요.</p>

              <h3>투자 시작 시기의 중요성</h3>
              <p>25세에 시작한 A씨와 35세에 시작한 B씨가 동일하게 월 50만원씩 연 7% 수익률로 60세까지 투자한다면:</p>
              <ul>
                <li>A씨 (35년 투자): 약 8억 6,000만원</li>
                <li>B씨 (25년 투자): 약 4억 원</li>
              </ul>
              <p>단 10년의 차이가 4억 원 이상의 격차를 만들어냅니다.</p>
            `}
            faqs={[
              {
                question: "복리와 단리의 가장 큰 차이점은 무엇인가요?",
                answer: "단리는 원금에만 이자가 붙지만, 복리는 원금+누적 이자에 이자가 붙습니다. 초기에는 차이가 작지만, 시간이 지날수록 기하급수적으로 차이가 커집니다. 10년 이상 장기 투자에서 복리 효과는 극적으로 나타납니다."
              },
              {
                question: "연 7% 수익률이 현실적인가요?",
                answer: "역사적으로 미국 S&P 500 지수는 장기 평균 약 10%, 국내 주식시장은 약 7~8%의 연평균 수익률을 기록했습니다. 물론 단기적으로는 큰 변동이 있지만, 20~30년 장기 투자 시 이 정도 수익률은 충분히 현실적인 목표입니다."
              },
              {
                question: "적은 돈으로도 복리 투자가 의미 있나요?",
                answer: "물론입니다! 월 10만원씩 30년간 연 7%로 투자하면 원금 3,600만원이 약 1억 2,000만원이 됩니다. 금액보다 '시간'이 더 중요합니다. 적은 금액이라도 일찍 시작하는 것이 나중에 큰 금액으로 시작하는 것보다 유리합니다."
              },
              {
                question: "복리 투자에 가장 좋은 금융 상품은 무엇인가요?",
                answer: "세제 혜택이 있는 ISA, 연금저축펀드, IRP를 우선 활용하세요. 이후 일반 계좌에서 저비용 인덱스 펀드나 ETF(예: S&P 500 추종, 전세계 주식 등)에 적립식으로 투자하는 것이 효과적입니다."
              },
              {
                question: "물가상승률을 고려하면 실제 수익률은 얼마나 되나요?",
                answer: "실질 수익률은 명목 수익률에서 물가상승률을 뺀 값입니다. 연 7% 수익률에 물가상승률 2~3%를 감안하면 실질 수익률은 약 4~5%입니다. 그래도 은행 예금(1~3%)보다는 훨씬 높고, 장기 복리 효과는 여전히 강력합니다."
              }
            ]}
            relatedLinks={[
              {
                title: "ISA 계좌 완벽 가이드",
                href: "/content/isa-guide",
                description: "절세와 복리를 동시에! ISA 활용법"
              },
              {
                title: "연금저축 vs IRP 비교",
                href: "/content/pension-vs-irp",
                description: "노후 대비 연금 상품 선택 가이드"
              },
              {
                title: "국민연금 계산기",
                href: "/pension-calculator",
                description: "예상 연금 수령액 확인"
              },
              {
                title: "급여 계산기",
                href: "/salary-calculator",
                description: "실수령액 확인 후 투자 여력 파악"
              },
              {
                title: "연봉 순위 테스트",
                href: "/salary-rank",
                description: "내 소득 수준 확인하기"
              },
              {
                title: "2025 연금 전략",
                href: "/content/pension-strategy",
                description: "효과적인 노후 대비 전략"
              }
            ]}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
