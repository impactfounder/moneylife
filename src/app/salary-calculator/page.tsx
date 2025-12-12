'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateSalary } from '@/lib/salary-calculator'
import { formatNumber } from '@/lib/calculations'
import type { SalaryResult } from '@/types'

export default function SalaryCalculatorPage() {
  const [grossSalary, setGrossSalary] = useState('')
  const [dependents, setDependents] = useState('0')
  const [childrenUnder20, setChildrenUnder20] = useState('0')
  const [result, setResult] = useState<SalaryResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const gross = parseInt(grossSalary)
    if (!gross || gross <= 0) {
      alert('세전 급여를 입력해주세요')
      return
    }

    const calcResult = calculateSalary({
      grossSalary: gross,
      dependents: parseInt(dependents) || 0,
      childrenUnder20: parseInt(childrenUnder20) || 0,
    })

    setResult(calcResult)
  }

  const handleReset = () => {
    setGrossSalary('')
    setDependents('0')
    setChildrenUnder20('0')
    setResult(null)
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              💰 급여 계산기
            </h1>
            <p className="text-lg text-gray-600">
              세전 급여에서 4대보험과 세금을 제외한 실수령액을 정확하게 계산합니다
            </p>
            <p className="text-sm text-gray-500 mt-2">
              📅 2025년 기준 | 국민연금 상한액 265,500원 적용
            </p>
          </div>

          {/* 입력 폼 */}
          <Card title="📝 급여 정보 입력" subtitle="세전 급여(총급여)를 입력하세요">
            <form onSubmit={handleCalculate} className="space-y-6">
              <Input
                label="💵 세전 급여 (월)"
                value={grossSalary}
                onChange={setGrossSalary}
                type="number"
                placeholder="예: 3500000"
                unit="원"
                required
                min={0}
                step={10000}
                helpText="4대보험과 세금을 제외하기 전 금액"
              />

              <Input
                label="👨‍👩‍👧‍👦 부양가족 수"
                value={dependents}
                onChange={setDependents}
                type="number"
                placeholder="0"
                unit="명"
                min={0}
                max={10}
                helpText="본인 제외, 배우자 및 부모님 등 (세금 공제)"
              />

              <Input
                label="👶 20세 이하 자녀 수"
                value={childrenUnder20}
                onChange={setChildrenUnder20}
                type="number"
                placeholder="0"
                unit="명"
                min={0}
                max={10}
                helpText="자녀세액공제 대상 (추가 공제)"
              />

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" size="lg">
                  💰 실수령액 계산하기
                </Button>
                <Button type="button" onClick={handleReset} variant="secondary" size="lg">
                  🔄 초기화
                </Button>
              </div>
            </form>
          </Card>

          {/* 결과 표시 */}
          {result && (
            <div className="mt-8 space-y-6 animate-fade-in">
              {/* 결과 요약 */}
              <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
                <div className="text-center">
                  <p className="text-sm opacity-90 mb-2">월 실수령액</p>
                  <h2 className="text-5xl font-bold mb-2">
                    {formatNumber(result.netSalary)}원
                  </h2>
                  <p className="text-sm opacity-90">
                    세전 {formatNumber(result.grossSalary)}원 →{' '}
                    <span className="font-semibold">
                      약 {((result.netSalary / result.grossSalary) * 100).toFixed(1)}% 수령
                    </span>
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm">
                      연봉 약 <span className="font-bold text-lg">{result.annualGross}만원</span> →
                      실수령 <span className="font-bold text-lg">{result.annualNet}만원</span>
                    </p>
                  </div>
                </div>
              </Card>

              {/* 공제 내역 */}
              <Card title="📊 공제 내역" subtitle={"총 공제액: " + formatNumber(result.totalDeductions) + "원"}>
                <div className="space-y-4">
                  <DeductionItem
                    icon="🏥"
                    label="국민연금 (4.5%)"
                    amount={result.nationalPension}
                    color="bg-blue-100 text-blue-700"
                  />
                  <DeductionItem
                    icon="⚕️"
                    label="건강보험 (3.545%)"
                    amount={result.healthInsurance}
                    color="bg-green-100 text-green-700"
                  />
                  <DeductionItem
                    icon="👴"
                    label="장기요양 (12.95% of 건강보험)"
                    amount={result.longTermCare}
                    color="bg-purple-100 text-purple-700"
                  />
                  <DeductionItem
                    icon="💼"
                    label="고용보험 (0.9%)"
                    amount={result.employmentInsurance}
                    color="bg-yellow-100 text-yellow-700"
                  />
                  <div className="border-t border-gray-200 my-4" />
                  <DeductionItem
                    icon="📝"
                    label="소득세"
                    amount={result.incomeTax}
                    color="bg-red-100 text-red-700"
                  />
                  <DeductionItem
                    icon="🏛️"
                    label="지방소득세 (10% of 소득세)"
                    amount={result.localIncomeTax}
                    color="bg-orange-100 text-orange-700"
                  />
                </div>
              </Card>

              {/* 도움말 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-blue-50">
                  <h4 className="font-bold text-gray-900 mb-2">💡 TIP: 연봉 협상</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    희망 실수령액이 있다면 세전 급여로 역계산하세요!
                  </p>
                  <p className="text-sm text-primary font-semibold">
                    실수령 {formatNumber(result.netSalary)}원 →
                    세전 약 {formatNumber(result.grossSalary)}원 필요
                  </p>
                </Card>

                <Card className="bg-green-50">
                  <h4 className="font-bold text-gray-900 mb-2">🏆 내 연봉 순위</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    내 연봉이 대한민국 상위 몇 %인지 확인해보세요
                  </p>
                  <Link
                    href="/salary-rank"
                    className="text-secondary font-semibold text-sm hover:underline"
                  >
                    연봉 순위 테스트 →
                  </Link>
                </Card>
              </div>
            </div>
          )}

          {/* 안내사항 */}
          <Card className="mt-8 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-4">📌 계산 기준 안내</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ 2025년 4대보험 요율 적용</li>
              <li>✓ 국민연금 상한액: 265,500원 (월 5,900,000원 초과 시)</li>
              <li>✓ 간이세액표 기준 소득세 계산</li>
              <li>✓ 부양가족 및 자녀 공제 반영</li>
              <li>✓ 실제 급여와 차이가 있을 수 있으니 참고용으로 활용하세요</li>
            </ul>
          </Card>

          {/* SEO 콘텐츠 섹션 */}
          <SEOContent
            title="2025년 급여 계산 완벽 가이드"
            description="급여 실수령액 계산의 원리와 2025년 최신 4대보험 요율, 세금 공제 기준을 상세히 알아봅니다."
            content={`
              <h3>급여 실수령액이란?</h3>
              <p>급여 실수령액은 회사에서 지급하는 세전 급여(총급여)에서 4대보험료와 소득세, 지방소득세를 공제한 후 실제로 통장에 입금되는 금액을 말합니다. 같은 연봉이라도 부양가족 수, 비과세 항목 적용 여부에 따라 실수령액이 달라질 수 있습니다.</p>

              <h3>2025년 4대보험 요율 총정리</h3>
              <p>2025년 기준 4대보험 요율은 다음과 같습니다:</p>
              <ul>
                <li><strong>국민연금:</strong> 근로자 4.5% + 사업주 4.5% = 총 9% (월 상한액 265,500원, 기준소득월액 상한 5,900,000원)</li>
                <li><strong>건강보험:</strong> 근로자 3.545% + 사업주 3.545% = 총 7.09%</li>
                <li><strong>장기요양보험:</strong> 건강보험료의 12.95% (건강보험료에 추가)</li>
                <li><strong>고용보험:</strong> 근로자 0.9% (사업주는 업종별 0.9%~1.65%)</li>
              </ul>

              <h3>2025년 국민연금 변경사항</h3>
              <p>2025년 국민연금 기준소득월액 상한액이 기존 590만원에서 617만원으로 인상될 예정이었으나, 현재 590만원 기준이 적용되고 있습니다. 이에 따른 최대 보험료는 월 265,500원입니다. 소득이 이 상한액을 초과하더라도 국민연금은 상한액 기준으로만 부과됩니다.</p>

              <h3>소득세 계산 방식</h3>
              <p>소득세는 간이세액표에 따라 계산됩니다. 과세표준 구간별 세율은 다음과 같습니다:</p>
              <ul>
                <li>1,400만원 이하: 6%</li>
                <li>1,400만원 초과 ~ 5,000만원 이하: 15%</li>
                <li>5,000만원 초과 ~ 8,800만원 이하: 24%</li>
                <li>8,800만원 초과 ~ 1억 5천만원 이하: 35%</li>
                <li>1억 5천만원 초과 ~ 3억원 이하: 38%</li>
                <li>3억원 초과 ~ 5억원 이하: 40%</li>
                <li>5억원 초과 ~ 10억원 이하: 42%</li>
                <li>10억원 초과: 45%</li>
              </ul>
              <p>지방소득세는 소득세의 10%가 추가로 부과됩니다.</p>

              <h3>실수령액을 높이는 방법</h3>
              <p><strong>1. 비과세 항목 활용:</strong> 식대(월 20만원 한도), 자가운전보조금(월 20만원 한도), 출산/보육수당(월 20만원 한도) 등은 비과세 처리가 가능합니다.</p>
              <p><strong>2. 부양가족 공제:</strong> 배우자, 부모님, 자녀 등 부양가족이 있으면 소득세 공제를 받아 실수령액이 증가합니다.</p>
              <p><strong>3. 연말정산 활용:</strong> 신용카드 사용액, 의료비, 교육비, 기부금 등 각종 공제 항목을 최대한 활용하세요.</p>

              <h3>월급 구간별 실수령액 예시 (2025년, 부양가족 0명 기준)</h3>
              <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">세전 월급</th>
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">4대보험</th>
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">소득세+지방세</th>
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">실수령액</th>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">250만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 22.4만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 2.0만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>약 225.6만원</strong></td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">300만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 26.9만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 4.5만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>약 268.6만원</strong></td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">400만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 35.9만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 11.2만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>약 352.9만원</strong></td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">500만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 44.8만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 22.3만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>약 432.9만원</strong></td>
                </tr>
              </table>
            `}
            faqs={[
              {
                question: "세전 급여와 세후 급여의 차이는 무엇인가요?",
                answer: "세전 급여는 회사에서 책정한 총급여로, 4대보험과 세금을 공제하기 전 금액입니다. 세후 급여(실수령액)는 모든 공제 후 실제 통장에 입금되는 금액입니다. 일반적으로 세전 급여의 약 80~90% 정도가 실수령액이 됩니다."
              },
              {
                question: "연봉 3,000만원이면 월 실수령액은 얼마인가요?",
                answer: "연봉 3,000만원(월 세전 약 250만원)의 경우, 4대보험과 세금을 공제하면 월 실수령액은 약 225~230만원 정도입니다. 부양가족이 있으면 소득세 공제로 실수령액이 조금 더 높아집니다."
              },
              {
                question: "4대보험은 반드시 가입해야 하나요?",
                answer: "정규직 근로자는 4대보험(국민연금, 건강보험, 고용보험, 산재보험) 의무 가입 대상입니다. 다만, 월 60시간 미만 단시간 근로자나 일부 특수한 경우에는 가입 제외될 수 있습니다. 프리랜서나 자영업자는 지역가입자로 별도 가입합니다."
              },
              {
                question: "부양가족 공제는 어떻게 받나요?",
                answer: "배우자, 부모님(만 60세 이상), 자녀(만 20세 이하) 등 연간 소득금액이 100만원 이하인 가족을 부양가족으로 등록하면 소득세 공제를 받을 수 있습니다. 회사 인사팀에 부양가족 변동 신고서를 제출하거나 연말정산 시 신청하면 됩니다."
              },
              {
                question: "비과세 식대란 무엇인가요?",
                answer: "식대는 월 20만원 한도 내에서 비과세 처리가 가능합니다. 즉, 월급 중 20만원까지는 소득세와 4대보험 산정 시 제외될 수 있어 실수령액이 높아집니다. 회사 급여 체계에 비과세 식대가 포함되어 있는지 확인해보세요."
              }
            ]}
            relatedLinks={[
              {
                title: "연봉 1억 실수령액은 얼마?",
                href: "/content/annual-salary-100m",
                description: "연봉 1억 원의 실제 실수령액과 세금 구조를 분석합니다."
              },
              {
                title: "2025년 연봉 실수령액 표",
                href: "/content/salary-table",
                description: "연봉 구간별 실수령액을 한눈에 비교해보세요."
              },
              {
                title: "연봉 순위 테스트",
                href: "/salary-rank",
                description: "내 연봉이 대한민국 상위 몇 %인지 확인하세요."
              },
              {
                title: "월급 300만원 실수령액",
                href: "/content/salary-3million",
                description: "직장인 평균 급여 구간의 상세 분석"
              },
              {
                title: "연말정산 절세 전략",
                href: "/content/tax-saving",
                description: "13월의 월급을 받기 위한 절세 꿀팁"
              },
              {
                title: "연봉 협상 가이드",
                href: "/content/salary-negotiation",
                description: "효과적인 연봉 협상을 위한 전략과 팁"
              }
            ]}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}

function DeductionItem({
  icon,
  label,
  amount,
  color,
}: {
  icon: string
  label: string
  amount: number
  color: string
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg ${color}`}>
          {icon}
        </span>
        <span className="text-gray-700 font-medium">{label}</span>
      </div>
      <span className="text-lg font-bold text-gray-900">
        -{formatNumber(amount)}원
      </span>
    </div>
  )
}