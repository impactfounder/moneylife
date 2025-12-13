'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
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

          {/* 관련 가이드 섹션 */}
          <RelatedGuides posts={getPostsByCalculator('/salary-rank')} />
        </div>
      </main>

      <Footer />
    </>
  )
}
