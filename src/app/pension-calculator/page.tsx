'use client';

import { useState } from 'react';
import {
  calculatePension,
  getPensionEvaluation,
  formatCurrency,
  type PensionInput,
  type PensionResult
} from '@/lib/pension-calculator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { SEOContent } from '@/components/ui/SEOContent';

export default function PensionCalculator() {
  const [input, setInput] = useState<PensionInput>({
    currentAge: 35,
    averageMonthlyIncome: 3500000,
    joinedYears: 10,
    expectedRetirementAge: 65
  });
  const [result, setResult] = useState<PensionResult | null>(null);

  const handleCalculate = () => {
    const calculatedResult = calculatePension(input);
    setResult(calculatedResult);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              💰 국민연금 계산기
            </h1>
            <p className="text-lg text-gray-600">
              2025년 기준 국민연금 예상 수령액을 계산해보세요
            </p>
          </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                현재 나이
              </label>
              <Input
                type="number"
                value={input.currentAge}
                onChange={(value) =>
                  setInput({ ...input, currentAge: Number(value) })
                }
                min={20}
                max={70}
                step={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                평균 월소득 (원)
              </label>
              <Input
                type="number"
                value={input.averageMonthlyIncome}
                onChange={(value) =>
                  setInput({
                    ...input,
                    averageMonthlyIncome: Number(value)
                  })
                }
                min={0}
                step={100000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                현재까지 가입 기간 (년)
              </label>
              <Input
                type="number"
                value={input.joinedYears}
                onChange={(value) =>
                  setInput({ ...input, joinedYears: Number(value) })
                }
                min={0}
                max={40}
                step={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                예상 은퇴 나이
              </label>
              <Input
                type="number"
                value={input.expectedRetirementAge}
                onChange={(value) =>
                  setInput({
                    ...input,
                    expectedRetirementAge: Number(value)
                  })
                }
                min={50}
                max={75}
                step={1}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate} className="w-full" size="lg">
              💡 예상 연금 계산하기
            </Button>
          </div>
        </Card>

        {result && (
          <>
            <Card className="mb-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <div className="text-center">
                <div className="text-sm opacity-90 mb-2">예상 월 연금 수령액</div>
                <div className="text-5xl font-bold mb-2">
                  {formatCurrency(result.expectedMonthlyPension)}
                </div>
                <div className="text-lg opacity-90">
                  {getPensionEvaluation(result.expectedMonthlyPension)}
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">월 납부액</div>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(result.monthlyContribution)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  (보험료율 {result.contributionRate}%)
                </div>
              </Card>

              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">총 납부 예상액</div>
                <div className="text-3xl font-bold text-indigo-600">
                  {formatCurrency(result.totalContribution)}
                </div>
              </Card>

              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">평생 예상 수령액</div>
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(result.totalLifetimeReceive)}
                </div>
                <div className="text-xs text-gray-500 mt-1">(85세 기준)</div>
              </Card>

              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">손익분기 나이</div>
                <div className="text-3xl font-bold text-purple-600">
                  {result.breakEvenAge}세
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  (납부액 = 수령액)
                </div>
              </Card>
            </div>

            <Card className="bg-blue-50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                📊 연금 수령 시뮬레이션
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    {input.expectedRetirementAge}세 은퇴 시작
                  </span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(result.expectedMonthlyPension)} / 월
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    {result.breakEvenAge}세 손익분기
                  </span>
                  <span className="font-bold text-blue-600">
                    누적 수령액 = 납부액
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">85세 예상 수명</span>
                  <span className="font-bold text-purple-600">
                    총 {formatCurrency(result.totalLifetimeReceive)}
                  </span>
                </div>
              </div>
            </Card>
          </>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            ※ 본 계산 결과는 단순 예상치이며, 실제 국민연금 수령액은 A값, B값
            등 다양한 변수에 따라 달라집니다.
          </p>
          <p className="mt-2">
            ※ 2025년 기준 국민연금 보험료율 9%, 소득대체율 40% 적용
          </p>
        </div>

        {/* SEO 콘텐츠 섹션 */}
        <SEOContent
          title="2025년 국민연금 완벽 가이드"
          description="국민연금의 계산 원리, 수령 시기, 임의가입 여부, 추납 제도 등 국민연금에 대한 모든 것을 상세히 알아봅니다."
          content={`
            <h3>국민연금이란?</h3>
            <p>국민연금은 대한민국의 공적 연금 제도로, 노령, 장애, 사망 시 본인이나 유족에게 연금을 지급하는 사회보험입니다. 18세 이상 60세 미만 국내 거주 국민은 가입 대상이며, 최소 10년 이상 가입해야 노령연금을 수령할 수 있습니다.</p>

            <h3>2025년 국민연금 보험료율</h3>
            <p>2025년 기준 국민연금 보험료율은 기준소득월액의 <strong>9%</strong>입니다. 직장가입자는 근로자 4.5% + 사업주 4.5%로 분담하고, 지역가입자는 본인이 전액 부담합니다.</p>
            <ul>
              <li><strong>기준소득월액 하한:</strong> 39만원 (월 보험료 35,100원)</li>
              <li><strong>기준소득월액 상한:</strong> 590만원 (월 보험료 531,000원)</li>
            </ul>
            <p>소득이 상한액을 초과해도 보험료는 상한액 기준으로만 부과되며, 연금 수령액 계산 시에도 상한액이 적용됩니다.</p>

            <h3>국민연금 수령액 계산 공식</h3>
            <p>국민연금 수령액은 다음 공식으로 계산됩니다:</p>
            <p style="background-color: #f0fdf4; padding: 16px; border-radius: 8px;"><strong>기본연금액 = (A값 + B값) × 가입 개월 수 × 1.2 ÷ 12</strong></p>
            <ul>
              <li><strong>A값:</strong> 전체 가입자의 평균소득 (매년 변동, 2024년 약 298만원)</li>
              <li><strong>B값:</strong> 본인의 평균 기준소득월액</li>
              <li><strong>1.2:</strong> 소득대체율 (20년 가입 시 기준, 매년 0.5%씩 감소)</li>
            </ul>

            <h3>국민연금 수령 나이</h3>
            <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">출생연도</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">수령 시작 나이</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">조기수령 가능 나이</th>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1953~1956년생</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">61세</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">56세</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1957~1960년생</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">62세</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">57세</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1961~1964년생</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">63세</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">58세</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1965~1968년생</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">64세</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">59세</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1969년생 이후</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">65세</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">60세</td>
              </tr>
            </table>

            <h3>조기수령 vs 연기수령</h3>
            <p><strong>조기수령:</strong> 정상 수령 나이보다 최대 5년 일찍 받을 수 있지만, 1년당 6%(월 0.5%)씩 감액됩니다. 5년 조기수령 시 30% 감액.</p>
            <p><strong>연기수령:</strong> 정상 수령 나이 이후 최대 5년까지 연기할 수 있으며, 1년당 7.2%(월 0.6%)씩 증액됩니다. 5년 연기 시 36% 증액.</p>
            <p>건강 상태, 다른 소득원, 기대 수명 등을 고려해 선택하세요.</p>

            <h3>국민연금 추납 제도</h3>
            <p>과거 미가입 기간이나 납부 예외 기간의 보험료를 나중에 납부해 가입 기간을 늘릴 수 있는 제도입니다.</p>
            <ul>
              <li><strong>추납 가능 기간:</strong> 경력 단절, 실업, 군 복무 등으로 보험료를 내지 못한 기간</li>
              <li><strong>장점:</strong> 가입 기간 증가로 연금 수령액 증가</li>
              <li><strong>납부 방법:</strong> 일시납 또는 분할납 가능</li>
            </ul>

            <h3>국민연금 vs 개인연금, 무엇이 유리한가?</h3>
            <p>국민연금은 물가 연동 상승, 평생 수령, 정부 보증이라는 장점이 있어 안정적입니다. 개인연금은 추가적인 노후 대비 수단으로 활용하세요.</p>
            <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">구분</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">국민연금</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">개인연금(연금저축)</th>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">수익률</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">약 5~7% (물가연동)</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">운용 성과에 따라 변동</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">수령 기간</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">평생 (종신)</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">선택 (확정/종신)</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">세제 혜택</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">보험료 소득공제</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">세액공제 (연 최대 600만원)</td>
              </tr>
            </table>
          `}
          faqs={[
            {
              question: "국민연금 10년 미만 가입하면 어떻게 되나요?",
              answer: "10년 미만 가입 시 노령연금을 받을 수 없습니다. 대신 60세에 일시금(반환일시금)으로 납부한 보험료와 이자를 돌려받습니다. 단, 10년을 채울 수 있다면 추납 제도를 활용해 가입 기간을 늘리는 것이 유리합니다."
            },
            {
              question: "국민연금 조기수령은 손해인가요?",
              answer: "반드시 그렇지는 않습니다. 조기수령 시 30% 감액되지만, 5년 일찍 받기 시작하므로 약 76세까지는 조기수령이 누적 수령액에서 유리합니다. 다만 76세 이후까지 오래 산다면 정상 수령이 유리합니다. 건강 상태와 기대 수명을 고려해 결정하세요."
            },
            {
              question: "전업주부도 국민연금에 가입할 수 있나요?",
              answer: "네, 임의가입 제도를 통해 가입할 수 있습니다. 전업주부, 학생, 프리랜서 등 의무가입 대상이 아닌 분들도 본인이 원하면 국민연금에 가입해 노후를 대비할 수 있습니다. 월 9만원부터 가입 가능합니다."
            },
            {
              question: "국민연금이 고갈된다는데, 받을 수 있나요?",
              answer: "국민연금은 국가가 보장하는 공적 연금이므로 기금이 소진되더라도 정부 재정으로 지급됩니다. 다만 재정 안정을 위해 보험료율 인상, 수급 연령 상향 등의 제도 개혁이 논의되고 있습니다. 국민연금은 노후 대비의 기본 수단으로 활용하되, 개인연금 등으로 추가 준비하는 것이 좋습니다."
            },
            {
              question: "국민연금과 퇴직연금을 동시에 받을 수 있나요?",
              answer: "네, 국민연금과 퇴직연금(DB/DC형, IRP)은 별개의 제도이므로 동시에 수령 가능합니다. 국민연금은 공적 연금, 퇴직연금은 기업 복지 성격의 사적 연금입니다. 둘 다 노후 소득원으로 활용하세요."
            }
          ]}
          relatedLinks={[
            {
              title: "연금저축 vs IRP 비교",
              href: "/content/pension-vs-irp",
              description: "개인연금 상품 선택 가이드"
            },
            {
              title: "2025 연금 전략",
              href: "/content/pension-strategy",
              description: "효과적인 노후 대비 전략 수립"
            },
            {
              title: "퇴직금 계산기",
              href: "/severance-calculator",
              description: "예상 퇴직금 확인하기"
            },
            {
              title: "복리 계산기",
              href: "/compound-interest-calculator",
              description: "연금 외 투자 수익 계산"
            },
            {
              title: "급여 계산기",
              href: "/salary-calculator",
              description: "실수령액과 공제 내역 확인"
            },
            {
              title: "ISA 계좌 가이드",
              href: "/content/isa-guide",
              description: "절세 투자 계좌 활용법"
            }
          ]}
        />
        </div>
      </div>
      <Footer />
    </>
  );
}