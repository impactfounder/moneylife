'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { calculateSeverance } from '@/lib/severance-calculator'
import { formatNumber } from '@/lib/calculations'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import type { SeveranceResult } from '@/types'

export default function SeveranceCalculatorPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [averageSalary, setAverageSalary] = useState('')
  const [result, setResult] = useState<SeveranceResult | null>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate || !averageSalary) {
      alert('모든 항목을 입력해주세요')
      return
    }

    const salary = parseInt(averageSalary.replace(/,/g, ''))
    if (!salary || salary <= 0) {
      alert('평균임금을 올바르게 입력해주세요')
      return
    }

    const calcResult = calculateSeverance({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      averageSalary: salary,
    })

    setResult(calcResult)
  }

  const handleReset = () => {
    setStartDate('')
    setEndDate('')
    setAverageSalary('')
    setResult(null)
  }

  const formatSalaryInput = (value: string) => {
    const num = value.replace(/[^\d]/g, '')
    if (num) {
      return parseInt(num).toLocaleString()
    }
    return ''
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              퇴직금 계산기
            </h1>
            <p className="text-lg text-gray-600">
              근속 기간과 평균임금을 입력하여 퇴직금과 퇴직소득세를 정확하게 계산합니다
            </p>
            <p className="text-sm text-gray-500 mt-2">
              2025년 기준 | 퇴직소득세 간이계산 포함
            </p>
          </div>

          {/* 입력 폼 */}
          <Card title="퇴직금 정보 입력" subtitle="입사일, 퇴직일, 평균임금을 입력하세요">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    입사일
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    퇴직일
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  3개월 평균임금 (월)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={averageSalary}
                    onChange={(e) => setAverageSalary(formatSalaryInput(e.target.value))}
                    placeholder="예: 3,500,000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 pr-12"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  퇴직 전 3개월간 받은 임금의 월 평균 (기본급 + 상여금 + 수당 포함)
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" size="lg">
                  퇴직금 계산하기
                </Button>
                <Button type="button" onClick={handleReset} variant="secondary" size="lg">
                  초기화
                </Button>
              </div>
            </form>
          </Card>

          {/* 결과 표시 */}
          {result && (
            <div className="mt-8 space-y-6 animate-fade-in">
              {/* 퇴직금 수령 불가 안내 */}
              {result.workingDays < 365 ? (
                <Card className="bg-red-50 border-red-200">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-red-700 mb-2">퇴직금 수령 불가</h3>
                    <p className="text-gray-700">
                      근속 기간이 <strong className="text-red-600">{result.workingDays}일</strong>로
                      1년(365일) 미만입니다.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      근로기준법에 따라 1년 이상 근무해야 퇴직금을 받을 수 있습니다.
                    </p>
                  </div>
                </Card>
              ) : (
                <>
                  {/* 결과 요약 */}
                  <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <div className="text-center">
                      <p className="text-sm opacity-90 mb-2">예상 퇴직금 (세후)</p>
                      <h2 className="text-5xl font-bold mb-2">
                        {formatNumber(result.netSeverance)}원
                      </h2>
                      <p className="text-sm opacity-90">
                        세전 {formatNumber(result.severancePay)}원 - 퇴직소득세 {formatNumber(result.severanceTax)}원
                      </p>
                    </div>
                  </Card>

                  {/* 상세 내역 */}
                  <Card title="퇴직금 상세 내역">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">근속 기간</span>
                        <span className="font-bold text-gray-900">
                          {result.workingDays}일 (약 {result.workingYears}년)
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">세전 퇴직금</span>
                        <span className="font-bold text-gray-900">
                          {formatNumber(result.severancePay)}원
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-600">퇴직소득세</span>
                        <span className="font-bold text-red-600">
                          -{formatNumber(result.severanceTax)}원
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                          <span className="font-bold text-gray-900">실수령 퇴직금</span>
                          <span className="font-bold text-amber-600 text-xl">
                            {formatNumber(result.netSeverance)}원
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* 참고 정보 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-blue-50">
                      <h4 className="font-bold text-gray-900 mb-2">퇴직금 계산 공식</h4>
                      <p className="text-sm text-gray-600">
                        퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        1일 평균임금 = 3개월 평균임금 ÷ 30일
                      </p>
                    </Card>

                    <Card className="bg-green-50">
                      <h4 className="font-bold text-gray-900 mb-2">퇴직연금으로 수령하면?</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        퇴직연금(IRP)으로 수령 시 세금 혜택이 있습니다.
                      </p>
                      <Link
                        href="/content/pension-vs-irp"
                        className="text-secondary font-semibold text-sm hover:underline"
                      >
                        연금저축 vs IRP 비교 →
                      </Link>
                    </Card>
                  </div>
                </>
              )}
            </div>
          )}

          {/* 안내사항 */}
          <Card className="mt-8 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-4">계산 기준 안내</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>- 근로기준법에 따른 퇴직금 계산 기준 적용</li>
              <li>- 1년 이상 근무 시 퇴직금 지급 대상</li>
              <li>- 퇴직소득세는 근속연수공제 및 환산급여 기준 간이계산</li>
              <li>- 실제 퇴직금은 회사 정책 및 상여금 산정 방식에 따라 다를 수 있습니다</li>
              <li>- DC형 퇴직연금은 별도 계산이 필요합니다</li>
            </ul>
          </Card>

          {/* 관련 가이드 섹션 */}
          <RelatedGuides posts={getPostsByCalculator('/severance-calculator')} />
        </div>
      </main>

      <Footer />
    </>
  )
}
