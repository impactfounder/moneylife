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
import { RelatedGuides } from '@/components/ui/RelatedGuides';
import { getPostsByCalculator } from '@/data/posts';

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

        {/* 관련 가이드 섹션 */}
        <RelatedGuides posts={getPostsByCalculator('/pension-calculator')} />
        </div>
      </div>
      <Footer />
    </>
  );
}