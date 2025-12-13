'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import { calculateCompoundInterest } from '@/lib/compound-calculator'
import { formatNumber } from '@/lib/calculations'
import type { CompoundInterestResult } from '@/types'

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('')
  const [monthlyDeposit, setMonthlyDeposit] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [years, setYears] = useState('')
  const [result, setResult] = useState<CompoundInterestResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    const calcResult = calculateCompoundInterest({
      principal: parseInt(principal) || 0,
      monthlyDeposit: parseInt(monthlyDeposit) || 0,
      annualRate: parseFloat(annualRate),
      years: parseInt(years),
      compoundFrequency: 'monthly'
    })

    setResult(calcResult)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">📈 복리 이자 계산기</h1>
            <p className="text-lg text-gray-600">초기 투자금과 월 적립금으로 미래 자산을 계산합니다</p>
          </div>

          <Card title="📝 투자 정보 입력">
            <form onSubmit={handleCalculate} className="space-y-6">
              <Input label="💰 초기 투자금" value={principal} onChange={setPrincipal} type="number" placeholder="예: 10000000" unit="원" required min={0} />
              <Input label="💵 월 적립금" value={monthlyDeposit} onChange={setMonthlyDeposit} type="number" placeholder="예: 500000" unit="원" min={0} />
              <Input label="📊 연 이자율" value={annualRate} onChange={setAnnualRate} type="number" placeholder="예: 5" unit="%" required min={0} max={100} step={0.1} />
              <Input label="📅 투자 기간" value={years} onChange={setYears} type="number" placeholder="예: 10" unit="년" required min={1} max={50} />
              <Button type="submit" className="w-full" size="lg">📈 미래 자산 계산하기</Button>
            </form>
          </Card>

          {result && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="text-center">
                  <p className="text-sm opacity-90 mb-2">미래 예상 자산</p>
                  <h2 className="text-5xl font-bold mb-4">{formatNumber(result.finalAmount)}원</h2>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-sm opacity-90">총 원금</p>
                      <p className="text-xl font-bold">{formatNumber(result.totalDeposit)}원</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">수익금</p>
                      <p className="text-xl font-bold">+{formatNumber(result.totalInterest)}원</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="📊 연도별 자산 증가">
                <div className="space-y-2">
                  {result.yearlyData.map(item => (
                    <div key={item.year} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.year}년차</span>
                      <span className="text-lg font-bold text-primary">{formatNumber(item.balance)}원</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* 관련 가이드 섹션 */}
          <RelatedGuides posts={getPostsByCalculator('/compound-interest-calculator')} />
        </div>
      </main>
      <Footer />
    </>
  )
}
