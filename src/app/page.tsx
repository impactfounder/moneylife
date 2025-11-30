'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Calculator } from '@/types'
import {
  calculateKoreaRank,
  calculateWorldRank,
  formatNumber,
} from '@/lib/calculations'

// Metadata는 'use client' 컴포넌트에서는 사용 불가
// layout.tsx에서 관리됨

const calculators: Calculator[] = [
  {
    id: 'salary-rank',
    name: '연봉 순위 테스트',
    icon: '🏆',
    description: '내 연봉이 대한민국, 전세계 상위 몇 %인지 1초만에 확인하세요',
    href: '/salary-rank',
    popular: true,
    badge: '바이럴'
  },
  {
    id: 'salary-calculator',
    name: '급여 계산기',
    icon: '💰',
    description: '2025년 4대보험, 소득세 적용 실수령액 정확 계산',
    href: '/salary-calculator',
    popular: true
  },
  {
    id: 'loan-calculator',
    name: '대출 계산기',
    icon: '🏦',
    description: '원리금균등, 원금균등 방식별 월 상환액과 총 이자 계산',
    href: '/loan-calculator',
    popular: true
  },
  {
    id: 'mortgage-calculator',
    name: '주택담보대출 계산기',
    icon: '🏠',
    description: 'LTV 자동 계산, 월별 상환 스케줄로 대출 계획 수립',
    href: '/mortgage-calculator'
  },
  {
    id: 'compound-interest-calculator',
    name: '복리 이자 계산기',
    icon: '📈',
    description: '초기 투자금과 월 적립으로 10년 후 자산 시뮬레이션',
    href: '/compound-interest-calculator'
  },
  {
    id: 'pension-calculator',
    name: '국민연금 계산기',
    icon: '💰',
    description: '2025년 기준 예상 월 연금 수령액과 손익분기 나이 계산',
    href: '/pension-calculator'
  },
  {
    id: 'severance-calculator',
    name: '퇴직금 계산기',
    icon: '💼',
    description: '근속일수와 평균임금으로 퇴직금 + 퇴직소득세 계산',
    href: '/severance-calculator'
  },
  {
    id: 'income-tax-calculator',
    name: '종합소득세 계산기',
    icon: '📊',
    description: '2025년 8단계 누진세율, 6가지 공제 항목 자동 계산',
    href: '/income-tax-calculator'
  },
  {
    id: 'capital-gains-tax-calculator',
    name: '양도소득세 계산기',
    icon: '🏡',
    description: '부동산 양도차익, 장기보유공제, 다주택 중과세 반영',
    href: '/capital-gains-tax-calculator'
  }
]

export default function Home() {
  const [salaryInput, setSalaryInput] = useState('')
  const [salaryType, setSalaryType] = useState<'before' | 'after'>('after')
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<{
    koreaRank: number
    worldRank: number
    actualSalary: number
    annualSalary: number
  } | null>(null)

  const handleQuickCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    
    let salary = parseInt(salaryInput.replace(/,/g, ''))
    if (!salary || salary <= 0) {
      alert('월 급여를 입력해주세요')
      return
    }

    // 세전인 경우 세후로 변환 (간단 계산: 약 85%)
    if (salaryType === 'before') {
      salary = Math.round(salary * 0.85)
    }

    // 순위 계산
    const koreaRankResult = calculateKoreaRank(salary, 'all')
    const worldRankResult = calculateWorldRank(salary)
    const annualSalary = Math.round(salary * 12 / 10000)

    setResult({
      koreaRank: koreaRankResult.percentage,
      worldRank: worldRankResult.percentage,
      actualSalary: salary,
      annualSalary
    })
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setSalaryInput('')
    setResult(null)
  }

  const handleFormatInput = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '')
    if (numbers) {
      setSalaryInput(formatNumber(parseInt(numbers)))
    } else {
      setSalaryInput('')
    }
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in">
              💰 금융계산기
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6 animate-fade-in">
              Smart Finance, Better Life
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-4 animate-fade-in">
              대출, 급여, 연금까지 모든 금융 계산을 한 곳에서
            </p>
            <p className="text-base md:text-lg text-gray-500 mb-8 animate-fade-in">
              2025년 최신 법령을 반영한 정확한 계산 결과를 제공합니다
            </p>
            
            {/* 주요 특징 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8 animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm md:text-base">2025년 최신 법령 반영</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm md:text-base">공식 기관 자료 기반</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm md:text-base">무료 무제한 이용</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-sm md:text-base">개인정보 보호</span>
              </div>
            </div>
            
            {/* 빠른 계산기 */}
            <div className="max-w-2xl mx-auto mt-8 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                    🔥 인기 급상승
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    내 연봉상위 몇 %일까?
                  </h2>
                  <p className="text-gray-600">
                    1초만에 확인하는 소득 순위
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    📊 통계청 데이터 기반 정확한 계산
                  </p>
                </div>

                {!showResult ? (
                  <form onSubmit={handleQuickCalculate} className="space-y-6">
                    {/* 급여 유형 선택 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        급여 유형
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSalaryType('after')}
                          className={`px-4 py-3 rounded-xl font-medium transition-all ${
                            salaryType === 'after'
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          세후 (실수령액)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSalaryType('before')}
                          className={`px-4 py-3 rounded-xl font-medium transition-all ${
                            salaryType === 'before'
                              ? 'bg-primary text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          세전 (연봉계약서)
                        </button>
                      </div>
                    </div>

                    {/* 월급 입력 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        월 급여 (만원)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={salaryInput}
                          onChange={(e) => handleFormatInput(e.target.value)}
                          placeholder="예: 300"
                          className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                          만원
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {salaryType === 'after' ? '실제 통장에 입금되는 금액' : '4대보험·세금 공제 전 금액'}
                      </p>
                    </div>

                    {/* 제출 버튼 */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      🏆 내 순위 확인하기
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    {/* 결과 표시 */}
                    <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                      <div className="text-sm text-gray-600 mb-2">
                        월 {formatNumber(result?.actualSalary || 0)}만원 (연봉 약 {result?.annualSalary || 0}백만원)
                      </div>
                      <div className="text-5xl font-bold text-primary mb-4">
                        상위 {result?.koreaRank || 0}%
                      </div>
                      <div className="text-gray-700 font-medium">
                        🇰🇷 대한민국 기준
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          상위 {result?.worldRank || 0}%
                        </div>
                        <div className="text-xs text-gray-600">🌏 전세계 기준</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          연 {result?.annualSalary || 0}백만
                        </div>
                        <div className="text-xs text-gray-600">💰 예상 연봉</div>
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleReset}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                      >
                        다시 계산
                      </button>
                      <Link
                        href="/salary-rank"
                        className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors text-center"
                      >
                        상세 분석 보기
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

{/* 계산기 그리드 */}
<section id="calculators" className="pb-20 pt-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calc, index) => (
                <Link
                  key={calc.id + index}
                  href={calc.href}
                  className="group relative bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 border border-slate-100 hover:border-blue-100 flex flex-col items-center text-center animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* 아이콘 박스 */}
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[1.75rem] mb-5 transition-transform duration-300 group-hover:scale-105 group-hover:bg-blue-100">
                    {calc.icon}
                  </div>

                  {/* 제목 */}
                  <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {calc.name}
                  </h3>
                  
                  {/* 설명 */}
                  <p className="text-slate-500 text-sm leading-relaxed break-keep">
                    {calc.description}
                  </p>
                  
                  {/* 뱃지 (우측 상단 고정) */}
                  {calc.popular && (
                    <span className="absolute top-5 right-5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {calc.badge || '인기'}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 특징 섹션 */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              ✨ 왜 금융계산기를 사용해야 할까요?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">정확한 계산</h3>
                <p className="text-gray-600">
                  통계청, 국세청 2025년 최신 데이터 기반
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1초 결과</h3>
                <p className="text-gray-600">
                  복잡한 금융 계산도 즉시 확인
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">개인정보 보호</h3>
                <p className="text-gray-600">
                  모든 계산은 브라우저에서만 처리
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">💯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% 무료</h3>
                <p className="text-gray-600">
                  회원가입, 로그인 없이 바로 사용
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}
