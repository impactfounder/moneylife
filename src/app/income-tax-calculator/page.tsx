'use client';

import { useState } from 'react';
import {
  calculateIncomeTax,
  getTaxBurdenEvaluation,
  formatCurrency,
  type IncomeTaxInput,
  type IncomeTaxResult
} from '@/lib/income-tax-calculator';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

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
      </div>
    </div>
  );
}