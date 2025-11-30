'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { calculateSalary } from '@/lib/salary-calculator'
import { formatNumber } from '@/lib/calculations' // ✅ 경로 수정됨
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