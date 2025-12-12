'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateLoan } from '@/lib/loan-calculator'
import { formatNumber } from '@/lib/calculations'
import type { LoanResult } from '@/types'

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [months, setMonths] = useState('')
  const [method, setMethod] = useState<'equal-principal-interest' | 'equal-principal'>('equal-principal-interest')
  const [result, setResult] = useState<LoanResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const loanAmount = parseInt(amount)
    const rate = parseFloat(interestRate)
    const period = parseInt(months)

    if (!loanAmount || !rate || !period) {
      alert('모든 값을 입력해주세요')
      return
    }

    const calcResult = calculateLoan({
      amount: loanAmount,
      interestRate: rate,
      months: period,
      method
    })

    setResult(calcResult)
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🏦 대출 계산기
            </h1>
            <p className="text-lg text-gray-600">
              대출 금액과 이자율을 입력하면 월 상환액과 총 이자를 계산합니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 입력 폼 */}
            <Card title="📝 대출 정보 입력">
              <form onSubmit={handleCalculate} className="space-y-6">
                <Input
                  label="💰 대출 금액"
                  value={amount}
                  onChange={setAmount}
                  type="number"
                  placeholder="예: 100000000"
                  unit="원"
                  required
                  min={0}
                  step={1000000}
                />

                <Input
                  label="📊 연 이자율"
                  value={interestRate}
                  onChange={setInterestRate}
                  type="number"
                  placeholder="예: 4.5"
                  unit="%"
                  required
                  min={0}
                  max={20}
                  step={0.1}
                />

                <Input
                  label="📅 대출 기간"
                  value={months}
                  onChange={setMonths}
                  type="number"
                  placeholder="예: 360"
                  unit="개월"
                  required
                  min={1}
                  max={600}
                  helpText={months ? `약 ${Math.floor(parseInt(months) / 12)}년` : ''}
                />

                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    🔄 상환 방식
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{ borderColor: method === 'equal-principal-interest' ? '#2563eb' : '#d1d5db' }}>
                      <input
                        type="radio"
                        name="method"
                        value="equal-principal-interest"
                        checked={method === 'equal-principal-interest'}
                        onChange={(e) => setMethod(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">원리금균등상환</div>
                        <div className="text-sm text-gray-600">매월 같은 금액 상환 (이자+원금)</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{ borderColor: method === 'equal-principal' ? '#2563eb' : '#d1d5db' }}>
                      <input
                        type="radio"
                        name="method"
                        value="equal-principal"
                        checked={method === 'equal-principal'}
                        onChange={(e) => setMethod(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">원금균등상환</div>
                        <div className="text-sm text-gray-600">매월 같은 원금 + 이자 (초반 부담 큼)</div>
                      </div>
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  💸 상환액 계산하기
                </Button>
              </form>
            </Card>

            {/* 결과 */}
            {result && (
              <div className="space-y-6 animate-fade-in">
                <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-2">
                      {method === 'equal-principal-interest' ? '매월 상환액' : '첫 달 상환액'}
                    </p>
                    <h2 className="text-4xl font-bold mb-4">
                      {formatNumber(result.monthlyPayment)}원
                    </h2>
                    {method === 'equal-principal' && (
                      <p className="text-sm opacity-90">
                        * 매월 감소 (마지막 달: {formatNumber(result.schedule[result.schedule.length - 1].payment)}원)
                      </p>
                    )}
                  </div>
                </Card>

                <Card>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">대출 원금</span>
                      <span className="text-xl font-bold text-gray-900">
                        {formatNumber(parseInt(amount))}원
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-600">총 이자</span>
                      <span className="text-xl font-bold text-danger">
                        +{formatNumber(result.totalInterest)}원
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-600">총 상환액</span>
                      <span className="text-2xl font-bold text-primary">
                        {formatNumber(result.totalPayment)}원
                      </span>
                    </div>
                  </div>
                </Card>

                <Card title="📊 월별 상환 스케줄" subtitle="처음 12개월">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left">월</th>
                          <th className="px-3 py-2 text-right">원금</th>
                          <th className="px-3 py-2 text-right">이자</th>
                          <th className="px-3 py-2 text-right">상환액</th>
                          <th className="px-3 py-2 text-right">잔액</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {result.schedule.slice(0, 12).map((item) => (
                          <tr key={item.month} className="hover:bg-gray-50">
                            <td className="px-3 py-2">{item.month}개월</td>
                            <td className="px-3 py-2 text-right">{formatNumber(item.principal)}</td>
                            <td className="px-3 py-2 text-right text-danger">{formatNumber(item.interest)}</td>
                            <td className="px-3 py-2 text-right font-semibold">{formatNumber(item.payment)}</td>
                            <td className="px-3 py-2 text-right text-gray-600">{formatNumber(item.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {result.schedule.length > 12 && (
                    <p className="text-sm text-gray-500 text-center mt-3">
                      ... 외 {result.schedule.length - 12}개월
                    </p>
                  )}
                </Card>
              </div>
            )}
          </div>

          {/* SEO 콘텐츠 섹션 */}
          <SEOContent
            title="2025년 대출 상환 완벽 가이드"
            description="대출 상환 방식의 차이점과 금리가 총 이자에 미치는 영향, 현명한 대출 전략을 상세히 알아봅니다."
            content={`
              <h3>대출 상환 방식 이해하기</h3>
              <p>대출을 받을 때 가장 중요한 결정 중 하나는 상환 방식 선택입니다. 상환 방식에 따라 월 상환액과 총 이자 부담이 크게 달라지므로, 자신의 재정 상황에 맞는 방식을 선택하는 것이 중요합니다.</p>

              <h3>원리금균등상환 vs 원금균등상환</h3>
              <p><strong>원리금균등상환</strong>은 대출 기간 동안 매월 동일한 금액(원금+이자)을 상환하는 방식입니다. 초기에는 이자 비중이 높고 후반으로 갈수록 원금 비중이 높아집니다. 매월 납부액이 일정해 가계 예산 관리가 용이합니다.</p>
              <p><strong>원금균등상환</strong>은 매월 동일한 원금에 남은 원금에 대한 이자를 더해 상환하는 방식입니다. 초기 상환 부담이 크지만, 총 이자 부담은 원리금균등상환보다 적습니다. 시간이 지날수록 월 상환액이 줄어듭니다.</p>

              <h3>상환 방식별 비교 예시 (1억원, 연 4%, 30년)</h3>
              <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">구분</th>
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">원리금균등</th>
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">원금균등</th>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">첫 달 상환액</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 47.7만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 61.1만원</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">마지막 달 상환액</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 47.7만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 27.9만원</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">총 이자</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>약 7,185만원</strong></td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>약 6,017만원</strong></td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">이자 차이</td>
                  <td colspan="2" style="padding: 12px; border: 1px solid #e5e7eb; text-align: center;">원금균등이 약 1,168만원 절약</td>
                </tr>
              </table>

              <h3>LTV, DTI, DSR 완벽 이해</h3>
              <p><strong>LTV (Loan To Value, 담보인정비율)</strong>: 담보 가치 대비 대출 가능 비율입니다. 예를 들어 5억원 아파트에 LTV 70%가 적용되면 최대 3.5억원까지 대출 가능합니다. 2025년 기준 규제지역에 따라 40~70%가 적용됩니다.</p>
              <p><strong>DTI (Debt To Income, 총부채상환비율)</strong>: 연소득 대비 연간 원리금 상환액 비율입니다. 연소득 5,000만원에 DTI 40%가 적용되면 연간 최대 2,000만원까지 원리금 상환이 가능합니다.</p>
              <p><strong>DSR (Debt Service Ratio, 총부채원리금상환비율)</strong>: 모든 대출의 연간 원리금 상환액이 연소득에서 차지하는 비율입니다. 기존 대출이 있으면 신규 대출 한도가 줄어듭니다. 2025년 기준 은행권 40%, 비은행권 50%가 적용됩니다.</p>

              <h3>금리 1% 차이가 만드는 이자 차이</h3>
              <p>금리는 작은 차이도 장기간에 걸쳐 큰 금액 차이로 이어집니다. 1억원을 30년간 대출받을 경우:</p>
              <ul>
                <li><strong>연 3%:</strong> 총 이자 약 5,177만원 (월 상환액 약 42.2만원)</li>
                <li><strong>연 4%:</strong> 총 이자 약 7,185만원 (월 상환액 약 47.7만원)</li>
                <li><strong>연 5%:</strong> 총 이자 약 9,325만원 (월 상환액 약 53.7만원)</li>
              </ul>
              <p>금리 1% 차이로 30년간 약 2,000만원의 이자 차이가 발생합니다. 따라서 대출 시 0.1%라도 낮은 금리를 찾는 것이 중요합니다.</p>

              <h3>2025년 주택담보대출 금리 동향</h3>
              <p>2025년 현재 은행권 주택담보대출 금리는 연 3.5%~5.5% 수준에서 형성되어 있습니다. 고정금리와 변동금리 중 선택할 수 있으며, 금리 인하기에는 변동금리가, 금리 인상기에는 고정금리가 유리할 수 있습니다. 혼합금리(초기 고정 후 변동)도 인기 있는 선택지입니다.</p>

              <h3>대출 이자 절약을 위한 팁</h3>
              <p><strong>1. 중도상환 활용:</strong> 여유 자금이 생기면 중도상환으로 원금을 줄여 이자 부담을 낮출 수 있습니다. 단, 중도상환수수료(보통 1.2~1.5%)를 확인하세요.</p>
              <p><strong>2. 대출 갈아타기:</strong> 더 낮은 금리 상품이 있다면 대환대출을 고려해보세요. 취급 수수료와 중도상환수수료를 고려해 손익분기점을 계산해야 합니다.</p>
              <p><strong>3. 신용점수 관리:</strong> 신용점수가 높을수록 우대금리를 받을 수 있습니다. 카드 결제일 준수, 연체 없는 상환 기록이 중요합니다.</p>
            `}
            faqs={[
              {
                question: "원리금균등상환과 원금균등상환 중 어떤 것이 유리한가요?",
                answer: "총 이자 측면에서는 원금균등상환이 유리합니다. 같은 조건에서 수백~수천만원의 이자를 절약할 수 있습니다. 하지만 초기 상환 부담이 크므로, 현재 여유 자금이 있고 안정적 수입이 있다면 원금균등상환을, 초기 부담을 줄이고 싶다면 원리금균등상환을 선택하세요."
              },
              {
                question: "고정금리와 변동금리 중 무엇을 선택해야 하나요?",
                answer: "향후 금리 전망에 따라 다릅니다. 금리 인상이 예상되면 고정금리로 현재 금리를 확정하는 것이 유리하고, 금리 인하가 예상되면 변동금리로 낮아지는 금리의 혜택을 받을 수 있습니다. 확신이 없다면 초기 5년 고정 후 변동되는 혼합금리도 좋은 선택입니다."
              },
              {
                question: "DSR 규제로 대출이 어려운데 어떻게 해야 하나요?",
                answer: "DSR 한도를 높이려면 소득을 증빙하거나(부업, 배우자 소득 합산), 기존 대출을 상환해 부채 비율을 낮추세요. 또한 DSR 규제가 덜 엄격한 비은행권(저축은행, 보험사 등)을 이용하는 방법도 있지만, 금리가 더 높을 수 있으니 신중히 결정하세요."
              },
              {
                question: "중도상환수수료는 얼마나 되나요?",
                answer: "일반적으로 대출 후 3년 이내 중도상환 시 1.2~1.5%의 수수료가 부과됩니다. 3년 이후에는 대부분 면제됩니다. 일부 은행은 연간 원금의 10~30%까지 무료 중도상환을 허용하니 대출 약정 시 확인하세요."
              },
              {
                question: "주택담보대출과 신용대출의 금리 차이는 얼마나 되나요?",
                answer: "주택담보대출은 담보가 있어 연 3.5~5.5% 수준이지만, 신용대출은 담보 없이 신용만으로 대출받으므로 연 4.5~10% 이상으로 금리가 높습니다. 가능하다면 담보대출을 활용하는 것이 이자 부담을 크게 줄일 수 있습니다."
              }
            ]}
            relatedLinks={[
              {
                title: "주택담보대출 갈아타기 가이드",
                href: "/content/mortgage-refinance",
                description: "대환대출로 이자 비용을 절약하는 방법"
              },
              {
                title: "주택담보대출 계산기",
                href: "/mortgage-calculator",
                description: "아파트, 주택 담보대출 상환액 계산"
              },
              {
                title: "연봉별 대출 한도 계산",
                href: "/salary-calculator",
                description: "내 연봉으로 받을 수 있는 대출 한도 확인"
              },
              {
                title: "복리 계산기",
                href: "/compound-interest-calculator",
                description: "투자 수익의 복리 효과 계산"
              },
              {
                title: "ISA 계좌 가이드",
                href: "/content/isa-guide",
                description: "절세 투자를 위한 ISA 계좌 활용법"
              },
              {
                title: "2025 연금 전략",
                href: "/content/pension-strategy",
                description: "노후 대비 연금 투자 전략"
              }
            ]}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
