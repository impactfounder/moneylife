'use client';

import { useState } from 'react';
import {
  calculateCapitalGainsTax,
  getTaxBurdenEvaluation,
  formatCurrency,
  type CapitalGainsTaxInput,
  type CapitalGainsTaxResult
} from '@/lib/capital-gains-tax-calculator';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

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
                onChange={(e) =>
                  setInput({
                    ...input,
                    acquisitionPrice: Number(e.target.value)
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
                onChange={(e) =>
                  setInput({ ...input, transferPrice: Number(e.target.value) })
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
                onChange={(e) =>
                  setInput({
                    ...input,
                    acquisitionExpense: Number(e.target.value)
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
                onChange={(e) =>
                  setInput({
                    ...input,
                    transferExpense: Number(e.target.value)
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
                onChange={(e) =>
                  setInput({ ...input, holdingPeriod: Number(e.target.value) })
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
      </div>
    </div>
  );
}
