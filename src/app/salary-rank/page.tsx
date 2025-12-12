'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SEOContent } from '@/components/ui/SEOContent'
import {
  calculateKoreaRank,
  calculateWorldRank,
  calculateAgeRank,
  convertBeforeToAfter,
  formatNumber,
  incrementChecks,
} from '@/lib/calculations'
import type { RankResult, AgeGroup, Region } from '@/types'

export default function SalaryRankPage() {
  const [salaryInput, setSalaryInput] = useState('')
  const [salaryType, setSalaryType] = useState<'before' | 'after'>('after')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('all')
  const [region, setRegion] = useState<Region>('all')
  
  const [result, setResult] = useState<{
    korea: RankResult
    world: RankResult
    age: RankResult | null
    actualSalary: number
    annualSalary: number
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    let salary = parseInt(salaryInput)
    if (!salary || salary <= 0) {
      alert('월 급여를 입력해주세요')
      return
    }

    // 세전인 경우 세후로 변환
    if (salaryType === 'before') {
      salary = convertBeforeToAfter(salary)
    }

    // 순위 계산
    const koreaRank = calculateKoreaRank(salary, region)
    const worldRank = calculateWorldRank(salary)
    const ageRank = calculateAgeRank(salary, ageGroup)
    const annualSalary = Math.round(salary * 12 / 10000)

    setResult({
      korea: koreaRank,
      world: worldRank,
      age: ageRank,
      actualSalary: salary,
      annualSalary
    })

    // 조회수 증가
    incrementChecks()
  }

  const handleRecalculate = () => {
    setResult(null)
    setSalaryInput('')
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🏆 내 연봉, 대한민국 상위 몇 %?
            </h1>
            <p className="text-lg text-gray-600">
              통계청 공식 데이터 기반 정확한 소득 순위 확인
            </p>
            <p className="text-sm text-gray-500 mt-2">
              📊 데이터 출처: 통계청 가계금융복지조사(2024) / 국세청 근로소득 통계(2023)
            </p>
          </div>

          {/* 입력 폼 */}
          {!result && (
            <Card title="💸 내 소득 순위 계산하기" subtitle="간단한 정보만 입력하면 1초만에 확인!">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 급여 유형 */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    📋 급여 유형 <span className="text-danger">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="salaryType"
                        value="after"
                        checked={salaryType === 'after'}
                        onChange={(e) => setSalaryType(e.target.value as 'after')}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">세후 (실수령액)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="salaryType"
                        value="before"
                        checked={salaryType === 'before'}
                        onChange={(e) => setSalaryType(e.target.value as 'before')}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-gray-700">세전 (총급여)</span>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {salaryType === 'after' 
                      ? '통장에 들어오는 실제 금액을 입력하세요'
                      : '세금과 4대보험을 제외하기 전 금액을 입력하세요'
                    }
                  </p>
                </div>

                {/* 월급 입력 */}
                <Input
                  label={salaryType === 'after' ? '💰 월 실수령액' : '💰 월 총급여'}
                  value={salaryInput}
                  onChange={setSalaryInput}
                  type="number"
                  placeholder="예: 2500000"
                  unit="원"
                  required
                  min={0}
                  step={10000}
                  helpText={salaryType === 'after' 
                    ? '세금과 4대보험을 제외한 실제 받는 금액'
                    : '4대보험과 세금 제외 전 금액'
                  }
                />

                {/* 나이대 */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    👤 나이대 <span className="text-gray-500 text-sm">(선택)</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {(['all', '20s', '30s', '40s', '50s'] as AgeGroup[]).map((age) => (
                      <label key={age} className="flex items-center justify-center cursor-pointer">
                        <input
                          type="radio"
                          name="ageGroup"
                          value={age}
                          checked={ageGroup === age}
                          onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                          className="sr-only"
                        />
                        <span className={`w-full text-center px-4 py-2 rounded-lg border-2 transition-all ${
                          ageGroup === age
                            ? 'border-primary bg-primary text-white font-semibold'
                            : 'border-gray-300 text-gray-700 hover:border-primary'
                        }`}>
                          {age === 'all' ? '전체' : age === '20s' ? '20대' : age === '30s' ? '30대' : age === '40s' ? '40대' : '50대'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 지역 */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    📍 지역 <span className="text-gray-500 text-sm">(선택)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['all', 'seoul', 'metro', 'other'] as Region[]).map((reg) => (
                      <label key={reg} className="flex items-center justify-center cursor-pointer">
                        <input
                          type="radio"
                          name="region"
                          value={reg}
                          checked={region === reg}
                          onChange={(e) => setRegion(e.target.value as Region)}
                          className="sr-only"
                        />
                        <span className={`w-full text-center px-4 py-2 rounded-lg border-2 transition-all ${
                          region === reg
                            ? 'border-primary bg-primary text-white font-semibold'
                            : 'border-gray-300 text-gray-700 hover:border-primary'
                        }`}>
                          {reg === 'all' ? '전체' : reg === 'seoul' ? '서울' : reg === 'metro' ? '수도권' : '기타'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <span className="text-xl">🚀 내 순위 확인하기</span>
                </Button>
              </form>
            </Card>
          )}

          {/* 결과 표시 */}
          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* 결과 헤더 */}
              <Card>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    🎉 당신의 소득 랭킹
                  </h2>
                  <div className="text-3xl font-bold text-primary mb-1">
                    월 {formatNumber(result.actualSalary)}원
                  </div>
                  <div className="text-gray-600">
                    (연봉 약 {result.annualSalary}만원)
                  </div>
                </div>
              </Card>

              {/* 대한민국 순위 */}
              <Card>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">🇰🇷 대한민국</h3>
                    <div className="text-3xl font-bold text-primary">
                      상위 {result.korea.percentile}%
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${result.korea.percentile}%` }}
                    />
                  </div>
                  <p className="text-gray-600">{result.korea.description}</p>
                </div>
              </Card>

              {/* 전세계 순위 */}
              <Card>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">🌏 전세계</h3>
                    <div className="text-3xl font-bold text-secondary">
                      상위 {result.world.percentile}%
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill bg-gradient-to-r from-secondary to-green-400"
                      style={{ width: `${result.world.percentile}%` }}
                    />
                  </div>
                  <p className="text-gray-600">{result.world.description}</p>
                </div>
              </Card>

              {/* 연령별 순위 */}
              {result.age && (
                <Card>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">
                        👥 {result.age.label} 평균
                      </h3>
                      <div className="text-3xl font-bold text-warning">
                        상위 {result.age.percentile}%
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill bg-gradient-to-r from-warning to-yellow-400"
                        style={{ width: `${result.age.percentile}%` }}
                      />
                    </div>
                    <p className="text-gray-600">{result.age.description}</p>
                  </div>
                </Card>
              )}

              {/* 액션 버튼 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleRecalculate} variant="secondary" className="flex-1">
                  🔄 다시 계산하기
                </Button>
                <Button variant="primary" className="flex-1">
                  📸 이미지 카드 만들기 (준비중)
                </Button>
              </div>

              {/* 추가 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-blue-50">
                  <h4 className="font-bold text-gray-900 mb-2">💡 더 정확한 계산</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    4대보험, 세금을 포함한 상세 급여 계산
                  </p>
                  <Link
                    href="/salary-calculator"
                    className="text-primary font-semibold text-sm hover:underline"
                  >
                    급여 계산기 바로가기 →
                  </Link>
                </Card>

                <Card className="bg-green-50">
                  <h4 className="font-bold text-gray-900 mb-2">📊 평균 연봉</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    연령별, 직군별 평균 연봉 통계
                  </p>
                  <Link
                    href="/content"
                    className="text-secondary font-semibold text-sm hover:underline"
                  >
                    연봉 통계 보기 →
                  </Link>
                </Card>
              </div>
            </div>
          )}

          {/* SEO 콘텐츠 섹션 */}
          <SEOContent
            title="대한민국 연봉 순위와 소득 분포 분석"
            description="통계청과 국세청 공식 데이터를 기반으로 대한민국의 소득 분포, 평균 연봉, 중위 소득의 차이를 상세히 분석합니다."
            content={`
              <h3>평균 소득 vs 중위 소득, 무엇이 다를까?</h3>
              <p>많은 사람들이 '평균 연봉'을 기준으로 자신의 위치를 가늠하지만, 실제 소득 분포를 이해하려면 <strong>중위 소득</strong>이 더 정확한 지표입니다.</p>
              <p><strong>평균 소득</strong>은 전체 소득을 인원수로 나눈 값입니다. 극소수의 고소득자가 평균을 크게 끌어올리기 때문에 실제 체감과 다를 수 있습니다.</p>
              <p><strong>중위 소득</strong>은 전체 인원을 소득순으로 나열했을 때 정중앙에 위치한 사람의 소득입니다. 상위 고소득자의 영향을 덜 받아 '일반적인' 소득 수준을 더 잘 반영합니다.</p>

              <h3>2024년 대한민국 소득 현황</h3>
              <p>통계청 가계금융복지조사와 국세청 근로소득 통계에 따르면:</p>
              <ul>
                <li><strong>근로소득자 평균 연봉:</strong> 약 4,200만원</li>
                <li><strong>근로소득자 중위 연봉:</strong> 약 3,200만원</li>
                <li><strong>상위 10% 진입 연봉:</strong> 약 7,800만원</li>
                <li><strong>상위 1% 진입 연봉:</strong> 약 2억 4,000만원</li>
              </ul>
              <p>평균과 중위 소득의 차이(약 1,000만원)가 보여주듯, 소득 분포는 상위에 치우쳐 있습니다. 즉, 평균 이하라고 느껴도 실제로는 중위 이상일 수 있습니다.</p>

              <h3>연령별 평균 연봉 (2024년 기준)</h3>
              <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">연령대</th>
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">평균 연봉</th>
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">중위 연봉</th>
                  <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">상위 10%</th>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">20대</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 2,800만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 2,400만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 4,500만원</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">30대</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 4,200만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 3,600만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 7,000만원</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">40대</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 5,100만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 4,200만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 8,500만원</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">50대</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 5,400만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 4,000만원</td>
                  <td style="padding: 12px; border: 1px solid #e5e7eb;">약 9,200만원</td>
                </tr>
              </table>
              <p>50대가 평균 연봉이 가장 높지만, 중위 소득은 40대와 비슷하거나 오히려 낮습니다. 이는 50대의 소득 양극화가 더 심하다는 것을 의미합니다.</p>

              <h3>지역별 소득 격차</h3>
              <p>서울과 수도권, 그 외 지역 간의 소득 격차도 상당합니다:</p>
              <ul>
                <li><strong>서울:</strong> 평균 연봉 약 5,000만원 (중위 약 4,000만원)</li>
                <li><strong>경기·인천:</strong> 평균 연봉 약 4,400만원 (중위 약 3,500만원)</li>
                <li><strong>광역시:</strong> 평균 연봉 약 3,800만원 (중위 약 3,200만원)</li>
                <li><strong>기타 지역:</strong> 평균 연봉 약 3,400만원 (중위 약 2,800만원)</li>
              </ul>

              <h3>직종별 연봉 순위 TOP 10 (2024년)</h3>
              <ol>
                <li>의사, 한의사: 평균 약 1억 5,000만원</li>
                <li>금융·보험 관리자: 평균 약 1억 2,000만원</li>
                <li>IT·정보통신 관리자: 평균 약 1억원</li>
                <li>항공기 조종사: 평균 약 9,500만원</li>
                <li>변호사: 평균 약 9,000만원</li>
                <li>대기업 임원: 평균 약 8,500만원</li>
                <li>제약회사 연구원: 평균 약 7,500만원</li>
                <li>소프트웨어 개발자: 평균 약 6,500만원</li>
                <li>회계사: 평균 약 6,000만원</li>
                <li>공무원(고위직): 평균 약 5,800만원</li>
              </ol>

              <h3>상위 몇 %에 해당하는지 알아야 하는 이유</h3>
              <p>자신의 소득 순위를 아는 것은 단순한 호기심을 넘어 실질적인 의미가 있습니다:</p>
              <ul>
                <li><strong>연봉 협상:</strong> 같은 연차, 같은 직종의 평균 대비 자신의 위치를 알면 협상에 유리합니다.</li>
                <li><strong>커리어 계획:</strong> 목표 소득 수준에 도달하기 위한 현실적인 계획을 세울 수 있습니다.</li>
                <li><strong>재정 계획:</strong> 주거, 대출, 저축 등 재정 계획을 세울 때 참고할 수 있습니다.</li>
              </ul>
            `}
            faqs={[
              {
                question: "내 연봉이 평균보다 낮은데 중위보다는 높다고 나옵니다. 어떤 게 맞나요?",
                answer: "둘 다 맞습니다. 평균은 고소득자에 의해 끌어올려지기 때문에 대부분의 사람들은 평균 이하입니다. 중위 소득이 더 현실적인 '보통' 수준을 나타내므로, 중위 이상이라면 절반 이상보다 많이 버는 것입니다. 자신의 위치를 파악할 때는 중위 소득을 기준으로 보는 것이 더 정확합니다."
              },
              {
                question: "상위 10%에 들려면 연봉이 얼마여야 하나요?",
                answer: "2024년 기준 전체 근로소득자 상위 10%에 진입하려면 연봉 약 7,800만원 이상이 필요합니다. 다만 연령대별로 다릅니다. 30대 상위 10%는 약 7,000만원, 40대는 약 8,500만원, 50대는 약 9,200만원입니다."
              },
              {
                question: "연봉 1억이면 상위 몇 %인가요?",
                answer: "연봉 1억원은 대한민국 전체 근로소득자 중 상위 약 5~6%에 해당합니다. 즉, 100명 중 5~6명 정도만이 연봉 1억원 이상을 받습니다. 세후 실수령액은 약 7,200만원(월 600만원) 정도입니다."
              },
              {
                question: "대한민국 평균 연봉은 왜 높게 느껴지나요?",
                answer: "평균은 극소수의 고소득자(연봉 수억원)에 의해 크게 올라갑니다. 예를 들어 10명 중 9명이 3,000만원이고 1명이 3억원이면 평균은 5,700만원이 됩니다. 그래서 대부분의 사람들이 '평균 이하'라고 느끼는 것이 정상이며, 중위 소득과 비교하는 것이 더 현실적입니다."
              },
              {
                question: "세전 연봉과 세후 연봉 중 어떤 것으로 비교해야 하나요?",
                answer: "공식 통계는 대부분 세전 연봉(총급여)을 기준으로 합니다. 연봉 순위를 비교할 때는 세전 기준으로 비교하세요. 다만 실제 생활 수준을 가늠할 때는 세후 실수령액이 더 현실적입니다. 본 계산기는 세후(실수령액)로 입력해도 자동 환산하여 정확한 순위를 보여줍니다."
              }
            ]}
            relatedLinks={[
              {
                title: "연봉 1억 실수령액 분석",
                href: "/content/annual-salary-100m",
                description: "연봉 1억의 실제 세후 수령액과 세금 구조"
              },
              {
                title: "2025년 연봉 실수령액 표",
                href: "/content/salary-table",
                description: "연봉 구간별 실수령액 한눈에 보기"
              },
              {
                title: "급여 계산기",
                href: "/salary-calculator",
                description: "세전 급여로 실수령액 정확히 계산"
              },
              {
                title: "연령별 평균 연봉 통계",
                href: "/content/salary-ranking",
                description: "20대~50대 연령별 상세 연봉 데이터"
              },
              {
                title: "연봉 협상 가이드",
                href: "/content/salary-negotiation",
                description: "효과적인 연봉 협상 전략과 팁"
              },
              {
                title: "월급 300만원 분석",
                href: "/content/salary-3million",
                description: "직장인 평균 급여 구간 상세 분석"
              }
            ]}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
