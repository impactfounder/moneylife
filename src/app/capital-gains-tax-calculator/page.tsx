'use client';

import { useState } from 'react';
import {
  calculateCapitalGainsTax,
  getTaxBurdenEvaluation,
  formatCurrency,
  type CapitalGainsTaxInput,
  type CapitalGainsTaxResult
} from '@/lib/capital-gains-tax-calculator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { SEOContent } from '@/components/ui/SEOContent';

export default function CapitalGainsTaxCalculator() {
  const [input, setInput] = useState<CapitalGainsTaxInput>({
    acquisitionPrice: 500000000,
    transferPrice: 700000000,
    acquisitionExpense: 10000000,
    transferExpense: 5000000,
    holdingPeriod: 5,
    isMultipleHomes: false,
    isLongTerm: true
  });
  const [result, setResult] = useState<CapitalGainsTaxResult | null>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateCapitalGainsTax(input);
    setResult(calculatedResult);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🏡 양도소득세 계산기
            </h1>
            <p className="text-lg text-gray-600">
              2025년 기준 부동산 양도소득세를 정확하게 계산해보세요
            </p>
          </div>

        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            💰 부동산 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                취득가액 (원)
              </label>
              <Input
                type="number"
                value={input.acquisitionPrice}
                onChange={(value) =>
                  setInput({
                    ...input,
                    acquisitionPrice: Number(value)
                  })
                }
                min={0}
                step={10000000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                양도가액 (원)
              </label>
              <Input
                type="number"
                value={input.transferPrice}
                onChange={(value) =>
                  setInput({ ...input, transferPrice: Number(value) })
                }
                min={0}
                step={10000000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                취득비용 (원)
              </label>
              <Input
                type="number"
                value={input.acquisitionExpense}
                onChange={(value) =>
                  setInput({
                    ...input,
                    acquisitionExpense: Number(value)
                  })
                }
                min={0}
                step={1000000}
              />
              <div className="text-xs text-gray-500 mt-1">
                취득세, 중개수수료 등
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                양도비용 (원)
              </label>
              <Input
                type="number"
                value={input.transferExpense}
                onChange={(value) =>
                  setInput({
                    ...input,
                    transferExpense: Number(value)
                  })
                }
                min={0}
                step={1000000}
              />
              <div className="text-xs text-gray-500 mt-1">중개수수료 등</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                보유 기간 (년)
              </label>
              <Input
                type="number"
                value={input.holdingPeriod}
                onChange={(value) =>
                  setInput({ ...input, holdingPeriod: Number(value) })
                }
                min={0}
                max={50}
                step={1}
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={input.isMultipleHomes}
                onChange={(e) =>
                  setInput({ ...input, isMultipleHomes: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">
                다주택자입니다 (중과세 적용)
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={input.isLongTerm}
                onChange={(e) =>
                  setInput({ ...input, isLongTerm: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">
                장기보유특별공제 적용 (3년 이상)
              </span>
            </label>
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate} className="w-full" size="lg">
              💡 양도세 계산하기
            </Button>
          </div>
        </Card>

        {result && (
          <>
            <Card className="mb-8 bg-gradient-to-br from-orange-500 to-red-600 text-white">
              <div className="text-center">
                <div className="text-sm opacity-90 mb-2">
                  납부할 양도소득세
                </div>
                <div className="text-5xl font-bold mb-2">
                  {formatCurrency(result.finalTax)}
                </div>
                <div className="text-lg opacity-90">
                  실효세율: {result.effectiveTaxRate.toFixed(2)}%
                </div>
                <div className="text-sm opacity-80 mt-2">
                  {getTaxBurdenEvaluation(result.effectiveTaxRate)}
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">양도차익</div>
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(result.transferIncome)}
                </div>
              </Card>

              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">실제 수익</div>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(result.netProfit)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  (양도차익 - 세금)
                </div>
              </Card>

              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">장기보유공제</div>
                <div className="text-3xl font-bold text-purple-600">
                  {formatCurrency(result.deductions)}
                </div>
              </Card>

              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">과세표준</div>
                <div className="text-3xl font-bold text-indigo-600">
                  {formatCurrency(result.taxableIncome)}
                </div>
              </Card>
            </div>

            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📊 세금 계산 상세
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">양도차익</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(result.transferIncome)}
                  </span>
                </div>

                {result.deductions > 0 && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">장기보유특별공제</span>
                    <span className="font-bold text-purple-600">
                      - {formatCurrency(result.deductions)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">기본공제</span>
                  <span className="font-bold text-blue-600">
                    - {formatCurrency(result.basicDeduction)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-bold text-gray-900">과세표준</span>
                  <span className="font-bold text-indigo-600">
                    {formatCurrency(result.taxableIncome)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                  <span className="text-xl font-bold text-gray-900">
                    결정세액
                  </span>
                  <span className="text-2xl font-bold text-orange-600">
                    {formatCurrency(result.finalTax)}
                  </span>
                </div>
              </div>
            </Card>
          </>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            ※ 본 계산 결과는 단순 참고용이며, 실제 양도소득세는 개인별
            상황에 따라 달라질 수 있습니다.
          </p>
          <p className="mt-2">※ 2025년 기준 양도소득세율 및 공제 규정 적용</p>
        </div>

        {/* SEO 콘텐츠 섹션 */}
        <SEOContent
          title="2025년 양도소득세 완벽 가이드"
          description="부동산 양도소득세의 계산 방법, 비과세 요건, 장기보유특별공제, 중과세 규정을 상세히 알아봅니다."
          content={`
            <h3>양도소득세란?</h3>
            <p>양도소득세는 부동산, 주식 등 자산을 팔아서 생긴 이익(양도차익)에 부과되는 세금입니다. 부동산의 경우 취득가액과 양도가액의 차이에서 필요경비와 공제를 제외한 금액에 세율을 적용해 계산합니다.</p>

            <h3>양도소득세 계산 공식</h3>
            <p style="background-color: #fff7ed; padding: 16px; border-radius: 8px;">
              <strong>양도소득세 = (양도가액 - 취득가액 - 필요경비 - 장기보유특별공제 - 기본공제) × 세율</strong>
            </p>
            <ul>
              <li><strong>양도가액:</strong> 실제 매도 금액</li>
              <li><strong>취득가액:</strong> 실제 매입 금액</li>
              <li><strong>필요경비:</strong> 취득세, 중개수수료, 인테리어 비용 등</li>
              <li><strong>기본공제:</strong> 연 250만원 (부동산)</li>
            </ul>

            <h3>2025년 양도소득세 세율</h3>
            <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">보유 기간</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">1주택자</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">다주택자</th>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1년 미만</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">70%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">70%</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1~2년</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">60%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">60%</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">2년 이상</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">기본세율 (6~45%)</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">기본세율 + 20~30%p</td>
              </tr>
            </table>
            <p>* 조정대상지역 2주택자 +20%p, 3주택 이상 +30%p 중과 (2025년 기준)</p>

            <h3>1세대 1주택 비과세 요건</h3>
            <p>다음 요건을 모두 충족하면 양도소득세가 면제됩니다:</p>
            <ul>
              <li><strong>보유 기간:</strong> 2년 이상 보유 (조정대상지역 취득 시 2년 거주 필수)</li>
              <li><strong>1세대 1주택:</strong> 양도일 현재 다른 주택이 없어야 함</li>
              <li><strong>양도가액:</strong> 12억원 이하 (초과분은 과세)</li>
            </ul>
            <p>12억원 초과 고가주택은 초과분에 대해서만 과세됩니다.</p>

            <h3>장기보유특별공제</h3>
            <p>오래 보유할수록 양도차익에서 많이 공제해줍니다:</p>
            <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">보유 기간</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">일반 부동산</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">1세대 1주택 (거주 요건 충족)</th>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">3년</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">6%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">24% (보유 12% + 거주 12%)</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">5년</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">10%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">40% (보유 20% + 거주 20%)</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">10년 이상</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">30%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">80% (최대)</td>
              </tr>
            </table>

            <h3>양도소득세 절세 전략</h3>
            <p><strong>1. 비과세 요건 충족:</strong> 1세대 1주택자는 2년 보유(+거주) 후 매도하면 12억원까지 비과세.</p>
            <p><strong>2. 장기보유:</strong> 3년 이상 보유하면 장기보유특별공제 적용. 10년 이상 보유 시 최대 80%까지 공제.</p>
            <p><strong>3. 필요경비 증빙:</strong> 취득세, 중개수수료, 인테리어 비용 등 영수증을 꼼꼼히 보관하세요.</p>
            <p><strong>4. 매도 시기 조절:</strong> 보유 기간 2년이 가까워지면 조금만 기다려 비과세 또는 세율 감면 혜택을 받으세요.</p>
            <p><strong>5. 일시적 2주택:</strong> 이사 등으로 일시적 2주택이 된 경우, 3년 내 기존 주택 매도 시 비과세 가능.</p>

            <h3>양도소득세 신고·납부</h3>
            <p>부동산 양도일이 속한 달의 말일부터 2개월 이내에 예정신고·납부해야 합니다. 기한 내 신고 시 예정신고납부세액공제(3%)를 받을 수 있습니다. 미신고 시 무신고 가산세(20%)와 납부지연 가산세가 부과됩니다.</p>
          `}
          faqs={[
            {
              question: "1세대 1주택 비과세 요건은 무엇인가요?",
              answer: "양도일 현재 1세대가 1주택만 보유하고, 2년 이상 보유(조정대상지역 취득분은 2년 거주 필수)하며, 양도가액이 12억원 이하인 경우 비과세됩니다. 12억원 초과 시 초과분에 대해서만 과세됩니다."
            },
            {
              question: "장기보유특별공제는 어떻게 받나요?",
              answer: "3년 이상 보유한 부동산을 매도할 때 자동으로 적용됩니다. 1세대 1주택으로 거주 요건까지 충족하면 최대 80%까지 공제됩니다. 별도 신청이 필요 없으며 양도소득세 신고 시 자동 계산됩니다."
            },
            {
              question: "다주택자 중과세는 언제 적용되나요?",
              answer: "조정대상지역 내 2주택자는 기본세율에 +20%p, 3주택 이상은 +30%p가 추가됩니다. 다만 일시적 2주택, 상속주택, 혼인·동거봉양 합가 등 일부 예외 사유가 있습니다. 비조정대상지역은 중과 대상에서 제외됩니다."
            },
            {
              question: "취득가액을 모르면 어떻게 하나요?",
              answer: "실제 취득가액을 모르는 경우 '환산취득가액'을 적용할 수 있습니다. 양도 당시 기준시가를 취득 당시 기준시가로 환산해 취득가액을 추정합니다. 다만 이 경우 장기보유특별공제가 제한될 수 있습니다."
            },
            {
              question: "양도소득세 예정신고는 꼭 해야 하나요?",
              answer: "네, 양도일이 속한 달의 말일부터 2개월 이내에 예정신고·납부해야 합니다. 기한 내 신고 시 납부세액의 3%를 공제받을 수 있고, 미신고 시 무신고 가산세 20%와 납부지연 가산세가 부과됩니다."
            }
          ]}
          relatedLinks={[
            {
              title: "주택담보대출 계산기",
              href: "/mortgage-calculator",
              description: "주택 구입 시 대출 상환액 계산"
            },
            {
              title: "종합소득세 계산기",
              href: "/income-tax-calculator",
              description: "연간 소득에 대한 세금 계산"
            },
            {
              title: "대출 계산기",
              href: "/loan-calculator",
              description: "일반 대출 상환액 계산"
            },
            {
              title: "복리 계산기",
              href: "/compound-interest-calculator",
              description: "매도 자금 재투자 수익 계산"
            },
            {
              title: "급여 계산기",
              href: "/salary-calculator",
              description: "월 실수령액 확인"
            },
            {
              title: "연금 계산기",
              href: "/pension-calculator",
              description: "노후 대비 연금 예상액"
            }
          ]}
        />
        </div>
      </div>
      <Footer />
    </>
  );
}