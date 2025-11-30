'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { calculateSeverance } from '@/lib/severance-calculator'
import { formatNumber } from '@/lib/calculations'
import type { SeveranceResult } from '@/types'

export default function SeveranceCalculatorPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [averageSalary, setAverageSalary] = useState('')
  const [result, setResult] = useState<SeveranceResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate || !averageSalary) {
      alert('모든 값을 입력해주세요')
      return
    }

    const calcResult = calculateSeverance({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      averageSalary: parseInt(averageSalary)
    })

    setResult(calcResult)
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              💼 퇴직금 계산기
            </h1>
            <p className="text-lg text-gray-600">
              근속일수와 평균임금으로 퇴직금을 계산합니다
            </p>
            <p className="text-sm text-gray-500 mt-2">
              📜 근로기준법 제34조 기준
            </p>
          </div>

          <Card title="📝 근무 정보 입력">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    📅 입사일
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    📅 퇴사일
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input-base"
                    required
                  />
                </div>
              </div>

              <Input
                label="💰 평균 월급 (최근 3개월)"
                value={averageSalary}
                onChange={setAverageSalary}
                type="number"
                placeholder="예: 3000000"
                unit="원"
                required
                min={0}
                step={10000}
                helpText="퇴직 전 3개월 평균 급여 (세전)"
              />

              <Button type="submit" className="w-full" size="lg">
                💼 퇴직금 계산하기
              </Button>
            </form>
          </Card>

          {result && (
            <div className="mt-8 space-y-6 animate-fade-in">
              {result.workingDays < 365 ? (
                <Card className="bg-yellow-50 border-2 border-yellow-200">
                  <div className="text-center">
                    <div className="text-4xl mb-3">⚠️</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      퇴직금 지급 대상 아님
                    </h3>
                    <p className="text-gray-600">
                      근속일수: <span className="font-bold">{result.workingDays}일</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      퇴직금은 1년(365일) 이상 근무 시 지급됩니다
                    </p>
                  </div>
                </Card>
              ) : (
                <>
                  <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                    <div className="text-center">
                      <p className="text-sm opacity-90 mb-2">예상 퇴직금 (세후)</p>
                      <h2 className="text-5xl font-bold mb-4">
                        {formatNumber(result.netSeverance)}원
                      </h2>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                        <div>
                          <p className="text-sm opacity-90">근속기간</p>
                          <p className="text-xl font-bold">{result.workingYears}년</p>
                          <p className="text-xs opacity-75">({result.workingDays}일)</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">세전 퇴직금</p>
                          <p className="text-xl font-bold">{formatNumber(result.severancePay)}원</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-600">세전 퇴직금</span>
                        <span className="text-xl font-bold text-secondary">
                          {formatNumber(result.severancePay)}원
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-600">퇴직소득세</span>
                        <span className="text-xl font-bold text-danger">
                          -{formatNumber(result.severanceTax)}원
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-600">실수령액</span>
                        <span className="text-2xl font-bold text-primary">
                          {formatNumber(result.netSeverance)}원
                        </span>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-blue-50">
                    <h4 className="font-bold text-gray-900 mb-2">💡 TIP: IRP 절세 전략</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      퇴직금을 IRP(개인형 퇴직연금)에 넣으면 세금을 나중으로 미룰 수 있습니다!
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ 퇴직소득세 이연 (당장 세금 안냄)</li>
                      <li>✓ 운용 수익 비과세</li>
                      <li>✓ 55세 이후 연금 수령 시 세액공제</li>
                    </ul>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
