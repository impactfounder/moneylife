'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { calculateSeverance } from '@/lib/severance-calculator'
import { formatNumber } from '@/lib/calculations'
import { SEOContent } from '@/components/ui/SEOContent'
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

          {/* SEO 콘텐츠 */}
          <SEOContent
            title="2025년 퇴직금 계산 완벽 가이드"
            description="퇴직금 계산 방법, 지급 기준, 세금 처리까지 상세히 알아보세요."
            content={`
              <h3>퇴직금이란?</h3>
              <p>퇴직금은 근로자가 1년 이상 근무한 후 퇴직할 때 받는 급여입니다. 근로기준법 제34조에 따라 사용자는 계속근로기간 1년에 대해 30일분 이상의 평균임금을 퇴직금으로 지급해야 합니다.</p>

              <h3>2025년 퇴직금 계산 방법</h3>
              <p>퇴직금 = <strong>1일 평균임금 × 30일 × (총 재직일수 ÷ 365일)</strong></p>
              <p>여기서 평균임금은 퇴직 전 3개월간 받은 임금 총액을 해당 기간의 총 일수로 나눈 금액입니다. 기본급뿐 아니라 상여금, 각종 수당도 포함됩니다.</p>

              <h4>평균임금에 포함되는 항목</h4>
              <ul>
                <li>기본급</li>
                <li>상여금 (연간 상여금의 3/12)</li>
                <li>연차수당</li>
                <li>직책수당, 가족수당 등 고정 수당</li>
                <li>연장근로수당, 야간근로수당</li>
              </ul>

              <h3>퇴직금 지급 기준</h3>
              <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>지급 요건</td>
                    <td>1년 이상 계속 근로</td>
                  </tr>
                  <tr>
                    <td>지급 기한</td>
                    <td>퇴직일로부터 14일 이내</td>
                  </tr>
                  <tr>
                    <td>지급 형태</td>
                    <td>일시금 또는 퇴직연금</td>
                  </tr>
                  <tr>
                    <td>적용 대상</td>
                    <td>5인 이상 사업장 (4인 이하도 준용)</td>
                  </tr>
                </tbody>
              </table>

              <h3>퇴직소득세 계산</h3>
              <p>퇴직금에 대한 세금은 근속연수에 따라 공제 혜택이 있어 일반 소득세보다 낮습니다.</p>

              <h4>근속연수공제</h4>
              <table>
                <thead>
                  <tr>
                    <th>근속연수</th>
                    <th>공제액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>5년 이하</td>
                    <td>30만원 × 근속연수</td>
                  </tr>
                  <tr>
                    <td>10년 이하</td>
                    <td>150만원 + 50만원 × (근속연수 - 5년)</td>
                  </tr>
                  <tr>
                    <td>20년 이하</td>
                    <td>400만원 + 80만원 × (근속연수 - 10년)</td>
                  </tr>
                  <tr>
                    <td>20년 초과</td>
                    <td>1,200만원 + 120만원 × (근속연수 - 20년)</td>
                  </tr>
                </tbody>
              </table>

              <h3>퇴직연금 제도</h3>
              <p>퇴직연금은 근로자의 퇴직급여를 금융기관에 적립하여 운용하는 제도입니다.</p>

              <h4>퇴직연금 유형 비교</h4>
              <table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>DB형</th>
                    <th>DC형</th>
                    <th>IRP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>적립 주체</td>
                    <td>회사</td>
                    <td>회사</td>
                    <td>개인</td>
                  </tr>
                  <tr>
                    <td>운용 주체</td>
                    <td>회사</td>
                    <td>근로자</td>
                    <td>개인</td>
                  </tr>
                  <tr>
                    <td>급여 산정</td>
                    <td>퇴직 시 평균임금</td>
                    <td>운용 수익에 따라</td>
                    <td>운용 수익에 따라</td>
                  </tr>
                  <tr>
                    <td>리스크</td>
                    <td>회사</td>
                    <td>근로자</td>
                    <td>개인</td>
                  </tr>
                </tbody>
              </table>

              <h3>퇴직금 중간정산</h3>
              <p>근로기준법 개정으로 2012년 이후 퇴직금 중간정산이 제한되었습니다. 다만 아래 사유에 해당하면 중간정산이 가능합니다:</p>
              <ul>
                <li>무주택자의 주택 구입</li>
                <li>전세금 또는 임차보증금 부담</li>
                <li>본인, 배우자, 부양가족의 6개월 이상 요양</li>
                <li>파산선고 또는 개인회생절차 개시</li>
                <li>천재지변 등 고용노동부장관이 인정하는 사유</li>
              </ul>
            `}
            faqs={[
              {
                question: '퇴직금은 언제 받을 수 있나요?',
                answer: '퇴직금은 퇴직일로부터 14일 이내에 지급받을 수 있습니다. 만약 14일 이내에 지급받지 못하면 지연이자(연 20%)를 청구할 수 있습니다. 다만, 당사자 간 합의로 지급 기일을 연장할 수 있습니다.',
              },
              {
                question: '계약직도 퇴직금을 받을 수 있나요?',
                answer: '네, 계약직도 1년 이상 근무하면 퇴직금을 받을 수 있습니다. 계약 갱신으로 총 근속기간이 1년 이상이 되면 퇴직금 지급 대상입니다. 1년 미만 계약이 반복 갱신된 경우도 계속 근로로 인정됩니다.',
              },
              {
                question: '퇴직금과 실업급여를 동시에 받을 수 있나요?',
                answer: '네, 퇴직금과 실업급여는 별개의 제도입니다. 퇴직금은 근로기준법에 따른 급여이고, 실업급여는 고용보험에서 지급하는 급여입니다. 두 가지 모두 수급 요건을 충족하면 동시에 받을 수 있습니다.',
              },
              {
                question: '퇴직금을 IRP로 수령하면 어떤 이점이 있나요?',
                answer: '퇴직금을 IRP(개인형 퇴직연금)로 수령하면 퇴직소득세가 이연됩니다. 55세 이후 연금으로 수령하면 퇴직소득세의 30~40%만 연금소득세로 납부하면 됩니다. 또한 IRP에서 추가 적립 시 세액공제 혜택(최대 700만원)도 받을 수 있습니다.',
              },
              {
                question: '퇴직금 계산 시 상여금은 어떻게 반영되나요?',
                answer: '퇴직금 계산 시 상여금은 연간 지급액을 12로 나눈 월 평균액을 평균임금에 포함합니다. 예를 들어, 연간 상여금이 400%라면 퇴직 전 3개월 평균임금 계산 시 기본급의 100%(400% ÷ 12 × 3)가 추가됩니다.',
              },
            ]}
            relatedLinks={[
              {
                title: '급여 실수령액 계산기',
                href: '/salary-calculator',
                description: '월급에서 실제로 받는 금액을 계산해보세요',
              },
              {
                title: '연금저축 vs IRP 비교',
                href: '/content/pension-vs-irp',
                description: '퇴직연금 수령 전 꼭 알아야 할 정보',
              },
              {
                title: '국민연금 계산기',
                href: '/pension-calculator',
                description: '예상 연금 수령액을 미리 계산해보세요',
              },
              {
                title: '종합소득세 계산기',
                href: '/income-tax-calculator',
                description: '연간 소득에 대한 세금 계산',
              },
              {
                title: '복리 이자 계산기',
                href: '/compound-interest-calculator',
                description: '퇴직금으로 재테크 시뮬레이션',
              },
              {
                title: '퇴직연금 운용 전략',
                href: '/content/pension-strategy',
                description: '퇴직연금 현명하게 운용하는 방법',
              },
            ]}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
