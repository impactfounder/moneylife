'use client';

import { useState } from 'react';
import {
  calculateMortgage,
  getLTVWarning,
  formatCurrency,
  type MortgageInput,
  type MortgageResult
} from '@/lib/mortgage-calculator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { SEOContent } from '@/components/ui/SEOContent';

export default function MortgageCalculator() {
  const [input, setInput] = useState<MortgageInput>({
    propertyPrice: 500000000,
    loanAmount: 300000000,
    interestRate: 4.5,
    loanPeriod: 30,
    paymentType: 'equalPayment',
    additionalMonthlyPayment: 0
  });
  const [result, setResult] = useState<MortgageResult | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleCalculate = () => {
    const calculatedResult = calculateMortgage(input);
    setResult(calculatedResult);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🏠 주택담보대출 계산기
            </h1>
            <p className="text-lg text-gray-600">
              2025년 기준 주택담보대출 상환액을 정확하게 계산해보세요
            </p>
          </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                주택 가격 (원)
              </label>
              <Input
                type="number"
                value={input.propertyPrice}
                onChange={(value) =>
                  setInput({ ...input, propertyPrice: Number(value) })
                }
                min={0}
                step={10000000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대출 금액 (원)
              </label>
              <Input
                type="number"
                value={input.loanAmount}
                onChange={(value) =>
                  setInput({ ...input, loanAmount: Number(value) })
                }
                min={0}
                step={10000000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연 이자율 (%)
              </label>
              <Input
                type="number"
                value={input.interestRate}
                onChange={(value) =>
                  setInput({ ...input, interestRate: Number(value) })
                }
                min={0}
                max={20}
                step={0.1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                대출 기간 (년)
              </label>
              <Input
                type="number"
                value={input.loanPeriod}
                onChange={(value) =>
                  setInput({ ...input, loanPeriod: Number(value) })
                }
                min={1}
                max={50}
                step={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                상환 방식
              </label>
              <select
                value={input.paymentType}
                onChange={(e) =>
                  setInput({
                    ...input,
                    paymentType: e.target.value as 'equalPayment' | 'equalPrincipal'
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="equalPayment">원리금균등 상환</option>
                <option value="equalPrincipal">원금균등 상환</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                월 추가 상환금 (선택, 원)
              </label>
              <Input
                type="number"
                value={input.additionalMonthlyPayment || 0}
                onChange={(value) =>
                  setInput({
                    ...input,
                    additionalMonthlyPayment: Number(value)
                  })
                }
                min={0}
                step={100000}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate} className="w-full" size="lg">
              💡 계산하기
            </Button>
          </div>
        </Card>

        {result && (
          <>
            <Card className="mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <div className="text-center">
                <div className="text-sm opacity-90 mb-2">LTV (주택담보대출비율)</div>
                <div className="text-5xl font-bold mb-2">
                  {result.loanToValue.toFixed(1)}%
                </div>
                <div className="text-lg opacity-90">
                  {getLTVWarning(result.loanToValue)}
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">월 상환액</div>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(result.monthlyPayment)}
                </div>
              </Card>

              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">총 상환액</div>
                <div className="text-3xl font-bold text-indigo-600">
                  {formatCurrency(result.totalPayment)}
                </div>
              </Card>

              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">총 이자</div>
                <div className="text-3xl font-bold text-purple-600">
                  {formatCurrency(result.totalInterest)}
                </div>
              </Card>
            </div>

            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  📊 월별 상환 스케줄
                </h2>
                <Button
                  onClick={() => setShowSchedule(!showSchedule)}
                  variant="secondary"
                  size="sm"
                >
                  {showSchedule ? '숨기기' : '자세히 보기'}
                </Button>
              </div>

              {showSchedule && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">회차</th>
                        <th className="px-4 py-2 text-right">원금</th>
                        <th className="px-4 py-2 text-right">이자</th>
                        <th className="px-4 py-2 text-right">상환액</th>
                        <th className="px-4 py-2 text-right">잔액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.slice(0, 12).map((item) => (
                        <tr key={item.month} className="border-t">
                          <td className="px-4 py-2">{item.month}개월</td>
                          <td className="px-4 py-2 text-right">
                            {formatCurrency(item.principalPayment)}
                          </td>
                          <td className="px-4 py-2 text-right">
                            {formatCurrency(item.interestPayment)}
                          </td>
                          <td className="px-4 py-2 text-right font-bold">
                            {formatCurrency(item.totalPayment)}
                          </td>
                          <td className="px-4 py-2 text-right text-gray-600">
                            {formatCurrency(item.remainingBalance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4 text-center text-sm text-gray-500">
                    📌 처음 12개월만 표시됩니다
                  </div>
                </div>
              )}
            </Card>
          </>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>※ 본 계산 결과는 참고용이며, 실제 대출 조건은 금융기관에 따라 달라질 수 있습니다.</p>
          <p className="mt-2">※ 2025년 기준 주택담보대출 계산기</p>
        </div>

        {/* SEO 콘텐츠 섹션 */}
        <SEOContent
          title="2025년 주택담보대출 완벽 가이드"
          description="주택담보대출의 LTV, DTI, DSR 규제와 금리 동향, 유리한 대출 전략을 상세히 알아봅니다."
          content={`
            <h3>주택담보대출이란?</h3>
            <p>주택담보대출은 아파트, 빌라, 단독주택 등 부동산을 담보로 금융기관에서 자금을 빌리는 대출입니다. 담보가 있어 신용대출보다 금리가 낮고, 대출 한도도 높습니다. 주택 구입, 전세자금, 생활자금 등 다양한 용도로 활용됩니다.</p>

            <h3>2025년 주택담보대출 규제 현황</h3>
            <p>정부는 가계부채 관리와 부동산 시장 안정화를 위해 주택담보대출에 여러 규제를 적용하고 있습니다:</p>

            <h4>LTV (Loan To Value, 담보인정비율)</h4>
            <p>주택 가격 대비 최대 대출 가능 비율입니다.</p>
            <ul>
              <li><strong>규제지역:</strong> 40~50% (투기과열지구, 조정대상지역)</li>
              <li><strong>비규제지역:</strong> 70%</li>
              <li><strong>생애최초 주택구입:</strong> 최대 80% (비규제지역 기준)</li>
            </ul>
            <p>예: 5억원 아파트, LTV 60% 적용 시 최대 3억원 대출 가능</p>

            <h4>DTI (Debt To Income, 총부채상환비율)</h4>
            <p>연소득 대비 연간 원리금 상환액 비율입니다.</p>
            <ul>
              <li><strong>규제지역:</strong> 40~50%</li>
              <li><strong>비규제지역:</strong> 60%</li>
            </ul>
            <p>예: 연소득 6,000만원, DTI 40% 적용 시 연간 최대 2,400만원(월 200만원) 상환 가능</p>

            <h4>DSR (Debt Service Ratio, 총부채원리금상환비율)</h4>
            <p>모든 대출의 연간 원리금 상환액이 연소득에서 차지하는 비율입니다. 신용대출, 자동차 할부 등 기존 대출도 포함됩니다.</p>
            <ul>
              <li><strong>은행권:</strong> 40%</li>
              <li><strong>비은행권 (저축은행, 보험사 등):</strong> 50%</li>
            </ul>

            <h3>2025년 주택담보대출 금리</h3>
            <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">구분</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">금리 범위</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">특징</th>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">시중은행 고정금리</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">연 3.5~4.5%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">금리 확정, 상환 계획 수립 용이</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">시중은행 변동금리</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">연 3.3~4.2%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">COFIX 연동, 금리 인하 시 유리</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">인터넷은행</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">연 3.2~4.0%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">비대면, 우대금리 혜택</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">보금자리론</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">연 3.0~3.5%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">무주택자, 소득 요건 충족 시</td>
              </tr>
            </table>

            <h3>주택담보대출 이자 줄이는 팁</h3>
            <p><strong>1. 금리 비교:</strong> 은행마다 0.1~0.5%p 금리 차이가 날 수 있습니다. 금융감독원 금리비교 사이트나 은행 앱을 활용하세요.</p>
            <p><strong>2. 우대금리 활용:</strong> 급여이체, 카드실적, 자동이체 등 조건을 충족하면 0.1~0.5%p 우대금리를 받을 수 있습니다.</p>
            <p><strong>3. 중도상환:</strong> 여유 자금이 생기면 원금을 줄여 이자 부담을 낮추세요. 3년 이후 중도상환수수료가 면제됩니다.</p>
            <p><strong>4. 대환대출:</strong> 기존 대출보다 낮은 금리 상품이 있다면 갈아타기를 고려하세요.</p>

            <h3>주택 구입 시 필요 자금 계산법</h3>
            <p>주택 구입 시에는 매매대금 외에도 추가 비용이 발생합니다:</p>
            <ul>
              <li><strong>취득세:</strong> 주택 가격의 1~3% (1주택자 기준)</li>
              <li><strong>중개수수료:</strong> 거래금액의 0.4~0.9%</li>
              <li><strong>법무사 비용:</strong> 50~100만원</li>
              <li><strong>이사비용, 인테리어 등:</strong> 상황에 따라 상이</li>
            </ul>
            <p>예: 5억원 아파트 구입 시 약 1,500~2,000만원의 추가 비용 예상</p>
          `}
          faqs={[
            {
              question: "LTV가 60%인데, 5억 아파트에서 최대 얼마까지 대출받을 수 있나요?",
              answer: "LTV 60%가 적용되면 5억원의 60%인 3억원까지 대출이 가능합니다. 다만 이는 LTV 기준이고, DTI와 DSR 규제에 따라 실제 대출 한도는 더 낮아질 수 있습니다. 연소득과 기존 대출 여부에 따라 종합적으로 한도가 결정됩니다."
            },
            {
              question: "고정금리와 변동금리 중 어떤 것이 유리한가요?",
              answer: "금리 인상기에는 고정금리로 현재 금리를 확정하는 것이 유리하고, 금리 인하기에는 변동금리로 낮아지는 금리의 혜택을 받을 수 있습니다. 2025년 현재 금리 인하 기조가 예상되어 변동금리나 혼합금리(초기 5년 고정 후 변동)도 좋은 선택입니다."
            },
            {
              question: "생애최초 주택구입 혜택은 무엇인가요?",
              answer: "생애최초 주택구입자는 LTV 최대 80%, 취득세 감면(1.5억 이하 면제, 1.5~3억 50% 감면), 보금자리론 우대금리 등의 혜택을 받을 수 있습니다. 본인과 배우자 모두 주택 소유 이력이 없어야 합니다."
            },
            {
              question: "대출 중도상환수수료는 얼마인가요?",
              answer: "대부분의 은행에서 대출 후 3년 이내 중도상환 시 1.2~1.5%의 수수료가 부과됩니다. 3년 이후에는 수수료가 면제됩니다. 또한 연간 대출 원금의 10~30%까지 무료 중도상환을 허용하는 은행도 많습니다."
            },
            {
              question: "DSR 40%인데 대출을 더 받고 싶어요. 방법이 있나요?",
              answer: "DSR 한도를 높이려면 1) 소득 증빙 (부업, 배우자 소득 합산), 2) 기존 대출 상환으로 부채 비율 감소, 3) DSR 규제가 덜 엄격한 비은행권(저축은행, 보험사) 이용 등의 방법이 있습니다. 다만 비은행권은 금리가 더 높을 수 있습니다."
            }
          ]}
          relatedLinks={[
            {
              title: "대출 갈아타기 가이드",
              href: "/content/mortgage-refinance",
              description: "대환대출로 이자 절약하는 방법"
            },
            {
              title: "일반 대출 계산기",
              href: "/loan-calculator",
              description: "신용대출, 자동차 대출 등 상환액 계산"
            },
            {
              title: "급여 계산기",
              href: "/salary-calculator",
              description: "내 연봉으로 DSR 한도 확인"
            },
            {
              title: "복리 계산기",
              href: "/compound-interest-calculator",
              description: "여유 자금 투자 수익 계산"
            },
            {
              title: "연금 계산기",
              href: "/pension-calculator",
              description: "노후 대비 연금 예상액 확인"
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