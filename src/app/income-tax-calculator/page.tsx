'use client';

import { useState } from 'react';
import {
  calculateIncomeTax,
  getTaxBurdenEvaluation,
  formatCurrency,
  type IncomeTaxInput,
  type IncomeTaxResult
} from '@/lib/income-tax-calculator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { SEOContent } from '@/components/ui/SEOContent';

export default function IncomeTaxCalculator() {
  const [input, setInput] = useState<IncomeTaxInput>({
    totalIncome: 50000000,
    deductions: {
      personalDeduction: 1500000,
      insurancePremium: 1000000,
      medicalExpense: 500000,
      educationExpense: 300000,
      donationExpense: 200000,
      cardExpense: 1000000
    }
  });
  const [result, setResult] = useState<IncomeTaxResult | null>(null);

  const handleCalculate = () => {
    const calculatedResult = calculateIncomeTax(input);
    setResult(calculatedResult);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📊 종합소득세 계산기
            </h1>
            <p className="text-lg text-gray-600">
              2025년 기준 종합소득세를 정확하게 계산해보세요
            </p>
          </div>

        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            💰 소득 정보
          </h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              총 소득 (원)
            </label>
            <Input
              type="number"
              value={input.totalIncome}
              onChange={(value) =>
                setInput({ ...input, totalIncome: Number(value) })
              }
              min={0}
              step={1000000}
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">
            🧾 공제 항목
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                인적공제 (원)
              </label>
              <Input
                type="number"
                value={input.deductions.personalDeduction}
                onChange={(value) =>
                  setInput({
                    ...input,
                    deductions: {
                      ...input.deductions,
                      personalDeduction: Number(value)
                    }
                  })
                }
                min={0}
                step={1500000}
              />
              <div className="text-xs text-gray-500 mt-1">
                기본공제 150만원 x 인원
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                보험료 공제 (원)
              </label>
              <Input
                type="number"
                value={input.deductions.insurancePremium}
                onChange={(value) =>
                  setInput({
                    ...input,
                    deductions: {
                      ...input.deductions,
                      insurancePremium: Number(value)
                    }
                  })
                }
                min={0}
                step={100000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                의료비 공제 (원)
              </label>
              <Input
                type="number"
                value={input.deductions.medicalExpense}
                onChange={(value) =>
                  setInput({
                    ...input,
                    deductions: {
                      ...input.deductions,
                      medicalExpense: Number(value)
                    }
                  })
                }
                min={0}
                step={100000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                교육비 공제 (원)
              </label>
              <Input
                type="number"
                value={input.deductions.educationExpense}
                onChange={(value) =>
                  setInput({
                    ...input,
                    deductions: {
                      ...input.deductions,
                      educationExpense: Number(value)
                    }
                  })
                }
                min={0}
                step={100000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기부금 공제 (원)
              </label>
              <Input
                type="number"
                value={input.deductions.donationExpense}
                onChange={(value) =>
                  setInput({
                    ...input,
                    deductions: {
                      ...input.deductions,
                      donationExpense: Number(value)
                    }
                  })
                }
                min={0}
                step={100000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                신용카드 공제 (원)
              </label>
              <Input
                type="number"
                value={input.deductions.cardExpense}
                onChange={(value) =>
                  setInput({
                    ...input,
                    deductions: {
                      ...input.deductions,
                      cardExpense: Number(value)
                    }
                  })
                }
                min={0}
                step={100000}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate} className="w-full" size="lg">
              💡 세금 계산하기
            </Button>
          </div>
        </Card>

        {result && (
          <>
            <Card className="mb-8 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <div className="text-center">
                <div className="text-sm opacity-90 mb-2">결정세액 (납부할 세금)</div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">총 소득</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(result.totalIncome)}
                </div>
              </Card>

              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">총 공제액</div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.totalDeduction)}
                </div>
              </Card>

              <Card className="text-center">
                <div className="text-sm text-gray-600 mb-2">과세표준</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(result.taxableIncome)}
                </div>
              </Card>
            </div>

            <Card className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📊 세율 구간별 상세
              </h2>
              <div className="space-y-3">
                {result.breakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.bracket}
                      </div>
                      <div className="text-sm text-gray-600">
                        과세금액: {formatCurrency(item.taxableAmount)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">
                        {formatCurrency(item.tax)}
                      </div>
                      <div className="text-sm text-gray-600">
                        세율 {item.rate}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">산출세액</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(result.calculatedTax)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">세액공제</span>
                  <span className="font-bold text-green-600">
                    - {formatCurrency(result.taxDeduction)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xl font-bold text-gray-900">
                    결정세액
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    {formatCurrency(result.finalTax)}
                  </span>
                </div>
              </div>
            </Card>
          </>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            ※ 본 계산 결과는 단순 참고용이며, 실제 세금은 개인별 상황에 따라
            달라질 수 있습니다.
          </p>
          <p className="mt-2">※ 2025년 기준 종합소득세율 적용</p>
        </div>

        {/* SEO 콘텐츠 섹션 */}
        <SEOContent
          title="2025년 종합소득세 완벽 가이드"
          description="종합소득세의 계산 방법, 세율 구간, 공제 항목, 절세 전략을 상세히 알아봅니다."
          content={`
            <h3>종합소득세란?</h3>
            <p>종합소득세는 개인이 1년간 벌어들인 모든 소득을 합산해 부과하는 세금입니다. 근로소득, 사업소득, 이자소득, 배당소득, 연금소득, 기타소득을 합산해 과세하며, 매년 5월에 신고·납부합니다. 직장인의 경우 대부분 연말정산으로 처리되지만, 프리랜서, 자영업자, 2군데 이상 급여를 받는 사람은 종합소득세 신고 대상입니다.</p>

            <h3>2025년 종합소득세 세율표</h3>
            <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">과세표준</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">세율</th>
                <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">누진공제</th>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1,400만원 이하</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">6%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">-</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1,400만원 ~ 5,000만원</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">15%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">126만원</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">5,000만원 ~ 8,800만원</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">24%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">576만원</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">8,800만원 ~ 1.5억원</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">35%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1,544만원</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1.5억원 ~ 3억원</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">38%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">1,994만원</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">3억원 ~ 5억원</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">40%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">2,594만원</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">5억원 ~ 10억원</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">42%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">3,594만원</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">10억원 초과</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">45%</td>
                <td style="padding: 12px; border: 1px solid #e5e7eb;">6,594만원</td>
              </tr>
            </table>
            <p>지방소득세는 종합소득세의 10%가 추가로 부과됩니다.</p>

            <h3>주요 소득공제 항목</h3>
            <p><strong>1. 인적공제:</strong> 본인, 배우자, 부양가족 1인당 150만원 기본공제. 70세 이상 경로우대 100만원 추가, 장애인 200만원 추가 등.</p>
            <p><strong>2. 연금보험료 공제:</strong> 국민연금 보험료 전액 공제.</p>
            <p><strong>3. 특별소득공제:</strong> 건강보험료, 고용보험료, 주택자금(청약저축, 주택담보대출 이자 등).</p>
            <p><strong>4. 조특법 공제:</strong> 신용카드 사용액, 청년 우대, 중소기업 취업자 감면 등.</p>

            <h3>주요 세액공제 항목</h3>
            <p><strong>1. 자녀세액공제:</strong> 자녀 1인당 15만원 (셋째부터 30만원 추가).</p>
            <p><strong>2. 연금계좌 세액공제:</strong> 연금저축+IRP 합산 최대 900만원 납입액의 12~15% 공제 (총급여 5,500만원 이하 15%, 초과 12%).</p>
            <p><strong>3. 의료비 세액공제:</strong> 총급여의 3% 초과분에 대해 15% 공제 (난임치료비 20%, 미숙아·장애인 의료비 등 30%).</p>
            <p><strong>4. 교육비 세액공제:</strong> 본인 전액, 자녀 유치원~대학 등록금 15% 공제.</p>
            <p><strong>5. 기부금 세액공제:</strong> 정치자금, 법정기부금, 지정기부금 등 10~100% 공제.</p>

            <h3>종합소득세 신고 대상자</h3>
            <ul>
              <li>프리랜서, 자영업자 (사업소득자)</li>
              <li>2곳 이상에서 급여를 받는 직장인</li>
              <li>금융소득(이자+배당) 연 2,000만원 초과자</li>
              <li>기타소득 연 300만원 초과자</li>
              <li>주택임대소득자</li>
              <li>연말정산을 하지 않은 직장인</li>
            </ul>

            <h3>종합소득세 절세 전략</h3>
            <p><strong>1. 경비 증빙 철저히:</strong> 사업자의 경우 사업 관련 지출에 대한 적격증빙(세금계산서, 카드영수증)을 철저히 관리하세요.</p>
            <p><strong>2. 연금저축·IRP 활용:</strong> 연금계좌에 최대 900만원까지 납입하면 108~135만원의 세액공제를 받을 수 있습니다.</p>
            <p><strong>3. 소득 분산:</strong> 가족 명의 사업자 등록, 공동사업자 등록 등으로 소득을 분산하면 누진세율 부담을 줄일 수 있습니다.</p>
            <p><strong>4. 노란우산공제:</strong> 소기업·소상공인의 경우 노란우산공제에 가입하면 최대 500만원까지 소득공제 가능.</p>
          `}
          faqs={[
            {
              question: "종합소득세와 근로소득세의 차이는 무엇인가요?",
              answer: "근로소득세는 직장에서 받는 급여에만 부과되는 세금으로, 회사에서 원천징수 후 연말정산으로 정산됩니다. 종합소득세는 근로소득을 포함해 사업소득, 이자·배당소득, 연금소득 등 모든 소득을 합산해 계산하며, 직접 신고·납부해야 합니다."
            },
            {
              question: "종합소득세는 언제 신고하나요?",
              answer: "매년 5월 1일부터 5월 31일까지 전년도 소득에 대해 신고·납부합니다. 성실신고확인 대상자는 6월 30일까지 연장됩니다. 홈택스를 통해 전자신고하면 세액공제 2만원 혜택이 있습니다."
            },
            {
              question: "프리랜서인데 경비는 어떻게 처리하나요?",
              answer: "프리랜서는 단순경비율 또는 기준경비율을 적용받거나, 장부를 작성해 실제 경비를 공제받을 수 있습니다. 수입이 2,400만원 이상이면 간편장부, 7,500만원 이상이면 복식부기 작성 의무가 있습니다. 실제 경비가 많다면 장부 작성이 유리합니다."
            },
            {
              question: "금융소득이 2,000만원 넘으면 어떻게 되나요?",
              answer: "금융소득(이자+배당)이 연 2,000만원을 초과하면 종합과세 대상이 됩니다. 2,000만원까지는 15.4% 분리과세, 초과분은 다른 소득과 합산해 종합소득세율(6~45%)이 적용됩니다. 고소득자의 경우 세 부담이 크게 증가할 수 있습니다."
            },
            {
              question: "종합소득세 신고를 안 하면 어떻게 되나요?",
              answer: "신고 대상자가 신고를 하지 않으면 무신고 가산세(20%)와 납부지연 가산세(연 8.03%)가 부과됩니다. 장기간 미신고 시 국세청 조사 대상이 될 수 있으며, 심한 경우 조세포탈로 형사처벌을 받을 수 있습니다."
            }
          ]}
          relatedLinks={[
            {
              title: "연말정산 절세 전략",
              href: "/content/tax-saving",
              description: "13월의 월급을 위한 절세 꿀팁"
            },
            {
              title: "급여 계산기",
              href: "/salary-calculator",
              description: "월 실수령액과 세금 확인"
            },
            {
              title: "연금저축 vs IRP",
              href: "/content/pension-vs-irp",
              description: "세액공제 혜택 비교"
            },
            {
              title: "ISA 계좌 가이드",
              href: "/content/isa-guide",
              description: "절세 투자 계좌 활용법"
            },
            {
              title: "연봉 순위 테스트",
              href: "/salary-rank",
              description: "내 소득 수준 확인하기"
            },
            {
              title: "양도소득세 계산기",
              href: "/capital-gains-tax-calculator",
              description: "부동산 매도 시 세금 계산"
            }
          ]}
        />
        </div>
      </div>
      <Footer />
    </>
  );
}