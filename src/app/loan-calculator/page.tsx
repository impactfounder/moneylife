'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { calculateLoan } from '@/lib/loan-calculator'
import { formatNumber } from '@/lib/calculations'
import type { LoanResult } from '@/types'

export default function LoanCalculatorPage() {
  const [amount, setAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [months, setMonths] = useState('')
  const [method, setMethod] = useState<'equal-principal-interest' | 'equal-principal'>('equal-principal-interest')
  const [result, setResult] = useState<LoanResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const loanAmount = parseInt(amount)
    const rate = parseFloat(interestRate)
    const period = parseInt(months)

    if (!loanAmount || !rate || !period) {
      alert('모든 값을 입력해주세요')
      return
    }

    const calcResult = calculateLoan({
      amount: loanAmount,
      interestRate: rate,
      months: period,
      method
    })

    setResult(calcResult)
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🏦 대출 계산기
            </h1>
            <p className="text-lg text-gray-600">
              대출 금액과 이자율을 입력하면 월 상환액과 총 이자를 계산합니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 입력 폼 */}
            <Card title="📝 대출 정보 입력">
              <form onSubmit={handleCalculate} className="space-y-6">
                <Input
                  label="💰 대출 금액"
                  value={amount}
                  onChange={setAmount}
                  type="number"
                  placeholder="예: 100000000"
                  unit="원"
                  required
                  min={0}
                  step={1000000}
                />

                <Input
                  label="📊 연 이자율"
                  value={interestRate}
                  onChange={setInterestRate}
                  type="number"
                  placeholder="예: 4.5"
                  unit="%"
                  required
                  min={0}
                  max={20}
                  step={0.1}
                />

                <Input
                  label="📅 대출 기간"
                  value={months}
                  onChange={setMonths}
                  type="number"
                  placeholder="예: 360"
                  unit="개월"
                  required
                  min={1}
                  max={600}
                  helpText={months ? `약 ${Math.floor(parseInt(months) / 12)}년` : ''}
                />

                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    🔄 상환 방식
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{ borderColor: method === 'equal-principal-interest' ? '#2563eb' : '#d1d5db' }}>
                      <input
                        type="radio"
                        name="method"
                        value="equal-principal-interest"
                        checked={method === 'equal-principal-interest'}
                        onChange={(e) => setMethod(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">원리금균등상환</div>
                        <div className="text-sm text-gray-600">매월 같은 금액 상환 (이자+원금)</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{ borderColor: method === 'equal-principal' ? '#2563eb' : '#d1d5db' }}>
                      <input
                        type="radio"
                        name="method"
                        value="equal-principal"
                        checked={method === 'equal-principal'}
                        onChange={(e) => setMethod(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">원금균등상환</div>
                        <div className="text-sm text-gray-600">매월 같은 원금 + 이자 (초반 부담 큼)</div>
                      </div>
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  💸 상환액 계산하기
                </Button>
              </form>
            </Card>

            {/* 결과 */}
            {result && (
              <div className="space-y-6 animate-fade-in">
                <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <div className="text-center">
                    <p className="text-sm opacity-90 mb-2">
                      {method === 'equal-principal-interest' ? '매월 상환액' : '첫 달 상환액'}
                    </p>
                    <h2 className="text-4xl font-bold mb-4">
                      {formatNumber(result.monthlyPayment)}원
                    </h2>
                    {method === 'equal-principal' && (
                      <p className="text-sm opacity-90">
                        * 매월 감소 (마지막 달: {formatNumber(result.schedule[result.schedule.length - 1].payment)}원)
                      </p>
                    )}
                  </div>
                </Card>

                <Card>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">대출 원금</span>
                      <span className="text-xl font-bold text-gray-900">
                        {formatNumber(parseInt(amount))}원
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-gray-600">총 이자</span>
                      <span className="text-xl font-bold text-danger">
                        +{formatNumber(result.totalInterest)}원
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-600">총 상환액</span>
                      <span className="text-2xl font-bold text-primary">
                        {formatNumber(result.totalPayment)}원
                      </span>
                    </div>
                  </div>
                </Card>

                <Card title="📊 월별 상환 스케줄" subtitle="처음 12개월">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left">월</th>
                          <th className="px-3 py-2 text-right">원금</th>
                          <th className="px-3 py-2 text-right">이자</th>
                          <th className="px-3 py-2 text-right">상환액</th>
                          <th className="px-3 py-2 text-right">잔액</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {result.schedule.slice(0, 12).map((item) => (
                          <tr key={item.month} className="hover:bg-gray-50">
                            <td className="px-3 py-2">{item.month}개월</td>
                            <td className="px-3 py-2 text-right">{formatNumber(item.principal)}</td>
                            <td className="px-3 py-2 text-right text-danger">{formatNumber(item.interest)}</td>
                            <td className="px-3 py-2 text-right font-semibold">{formatNumber(item.payment)}</td>
                            <td className="px-3 py-2 text-right text-gray-600">{formatNumber(item.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {result.schedule.length > 12 && (
                    <p className="text-sm text-gray-500 text-center mt-3">
                      ... 외 {result.schedule.length - 12}개월
                    </p>
                  )}
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
