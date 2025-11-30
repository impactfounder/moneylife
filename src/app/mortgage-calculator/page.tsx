'use client';

import { useState } from 'react';
import {
  calculateMortgage,
  getLTVWarning,
  formatCurrency,
  type MortgageInput,
  type MortgageResult
} from '@/lib/mortgage-calculator';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

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
      </div>
    </div>
  );
}