'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdUnit } from '@/components/AdUnit'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { RelatedContentCTA } from '@/components/ui/RelatedContentCTA'
import { getPostsByCalculator } from '@/data/posts'
import {
  calculateLoanLimit2026,
  compareRateScenarios,
  getRegionInfo,
  getRateTypeInfo,
  type RegionType,
  type BorrowerType,
  type RateType,
  type LoanLimitResult,
} from '@/lib/loan-policy-2026'
import { formatNumber } from '@/lib/calculations'
import { DynamicBar as Bar } from '@/components/charts/DynamicCharts'

export default function LoanCalculatorPage() {
  // 입력 상태
  const [propertyValue, setPropertyValue] = useState('')
  const [annualIncome, setAnnualIncome] = useState('')
  const [existingDebt, setExistingDebt] = useState('')
  const [loanYears, setLoanYears] = useState('30')
  const [interestRate, setInterestRate] = useState('4.5')
  const [regionType, setRegionType] = useState<RegionType>('regulated')
  const [borrowerType, setBorrowerType] = useState<BorrowerType>('single_home')
  const [rateType, setRateType] = useState<RateType>('variable')

  // 결과 상태
  const [result, setResult] = useState<LoanLimitResult | null>(null)
  const [rateComparison, setRateComparison] = useState<Record<RateType, LoanLimitResult> | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState('')

  const regionInfo = getRegionInfo()
  const rateTypeInfo = getRateTypeInfo()

  const handleFormatInput = (value: string, setter: (v: string) => void) => {
    const numbers = value.replace(/[^0-9]/g, '')
    if (numbers) {
      setter(formatNumber(parseInt(numbers)))
    } else {
      setter('')
    }
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const property = parseInt(propertyValue.replace(/,/g, '')) * 10000
    const income = parseInt(annualIncome.replace(/,/g, '')) * 10000
    const debt = parseInt(existingDebt.replace(/,/g, '') || '0') * 10000
    const months = parseInt(loanYears) * 12
    const rate = parseFloat(interestRate)

    if (!property || property <= 0) {
      setError('주택 가격을 입력해주세요')
      return
    }
    if (!income || income <= 0) {
      setError('연 소득을 입력해주세요')
      return
    }
    if (!rate || rate <= 0) {
      setError('금리를 입력해주세요')
      return
    }

    const input = {
      propertyValue: property,
      annualIncome: income,
      existingDebtPayment: debt,
      loanPeriodMonths: months,
      interestRate: rate,
      regionType,
      borrowerType,
      rateType,
    }

    const calcResult = calculateLoanLimit2026(input)
    const comparison = compareRateScenarios({
      propertyValue: property,
      annualIncome: income,
      existingDebtPayment: debt,
      loanPeriodMonths: months,
      interestRate: rate,
      regionType,
      borrowerType,
    })

    setResult(calcResult)
    setRateComparison(comparison)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setResult(null)
    setRateComparison(null)
  }

  // 바 차트 데이터 (규제별 한도 비교)
  const limitComparisonData = result ? {
    labels: ['LTV 한도', 'DTI 한도', 'DSR 한도', '최종 한도'],
    datasets: [
      {
        label: '대출 한도 (만원)',
        data: [
          Math.round(result.ltvLimit / 10000),
          Math.round(result.dtiLimit / 10000),
          Math.round(result.dsrLimit / 10000),
          Math.round(result.finalLimit / 10000),
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(99, 102, 241, 0.9)',
        ],
        borderRadius: 8,
      },
    ],
  } : null

  // 금리 유형별 비교 차트
  const rateComparisonData = rateComparison ? {
    labels: ['고정금리', '주기형', '혼합형(5년)', '변동금리'],
    datasets: [
      {
        label: '대출 한도 (만원)',
        data: [
          Math.round(rateComparison.fixed.finalLimit / 10000),
          Math.round(rateComparison.periodic.finalLimit / 10000),
          Math.round(rateComparison.mixed_5y.finalLimit / 10000),
          Math.round(rateComparison.variable.finalLimit / 10000),
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderRadius: 8,
      },
    ],
  } : null

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number | string) => formatNumber(Number(value)) + '만원'
        }
      }
    }
  }

  const getBottleneckLabel = (bottleneck: string) => {
    switch (bottleneck) {
      case 'ltv': return 'LTV 규제';
      case 'dti': return 'DTI 규제';
      case 'dsr': return '스트레스 DSR 규제';
      case 'cap': return '대출 한도 상한';
      case 'blocked': return '대출 불가';
      default: return bottleneck;
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* 히어로 섹션 */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-orange-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-amber-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6 border border-red-200">
                  2026년 스트레스 DSR 3단계 (100% 반영)
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                  2026 미래 기준<br className="sm:hidden" /> 대출 한도 시뮬레이터
                </h1>
                <p className="text-base text-slate-600 max-w-xl mx-auto">
                  국토교통부 공식 LTV/DTI/DSR 규제 매트릭스 기반
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">

                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 1. 지역 선택 (최우선) */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          1. 매수 예정 아파트 위치 <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                          {(Object.entries(regionInfo) as [RegionType, typeof regionInfo.speculation][]).map(([key, info]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setRegionType(key)}
                              className={`w-full px-4 py-3 rounded-xl text-left transition-all flex justify-between items-center ${
                                regionType === key
                                  ? 'bg-slate-900 text-white shadow-lg'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              <div>
                                <span className="font-semibold">{info.label}</span>
                                <span className="block text-xs opacity-70 mt-0.5">{info.description}</span>
                              </div>
                              <span className={`text-sm font-bold ${regionType === key ? 'text-white' : 'text-slate-500'}`}>
                                LTV {info.ltv}%
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 2. 차주 유형 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          2. 주택 보유 현황
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setBorrowerType('single_home')}
                            className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                              borrowerType === 'single_home'
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            무주택/1주택
                          </button>
                          <button
                            type="button"
                            onClick={() => setBorrowerType('multi_home')}
                            className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                              borrowerType === 'multi_home'
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            다주택자
                          </button>
                        </div>
                        {borrowerType === 'multi_home' && regionType !== 'non_regulated' && (
                          <p className="text-xs text-red-500 mt-2 font-medium">
                            ⚠️ 다주택자는 규제지역 내 주택담보대출이 불가합니다.
                          </p>
                        )}
                      </div>

                      {/* 3. 주택 가격 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          3. 매수 예정 주택 가격 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={propertyValue}
                            onChange={(e) => handleFormatInput(e.target.value, setPropertyValue)}
                            placeholder="예: 100,000 (10억)"
                            className="w-full px-4 py-4 text-xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 4. 연 소득 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          4. 연 소득 (세전) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={annualIncome}
                            onChange={(e) => handleFormatInput(e.target.value, setAnnualIncome)}
                            placeholder="예: 8,000 (8천만원)"
                            className="w-full px-4 py-4 text-xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 5. 기존 대출 상환액 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          5. 기존 대출 연 상환액 (선택)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={existingDebt}
                            onChange={(e) => handleFormatInput(e.target.value, setExistingDebt)}
                            placeholder="0"
                            className="w-full px-4 py-3 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                            만원/년
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          신용대출, 카드론, 2금융권 대출 모두 포함
                        </p>
                      </div>

                      {/* 6. 대출 조건 */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            대출 기간
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={loanYears}
                              onChange={(e) => setLoanYears(e.target.value)}
                              min="1"
                              max="40"
                              className="w-full px-3 py-3 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 transition-all bg-slate-50 focus:bg-white text-slate-900"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                              년
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            예상 금리
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={interestRate}
                              onChange={(e) => setInterestRate(e.target.value)}
                              step="0.1"
                              min="0"
                              max="20"
                              className="w-full px-3 py-3 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 transition-all bg-slate-50 focus:bg-white text-slate-900"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                              %
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 7. 금리 유형 선택 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          7. 금리 유형 선택
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(Object.entries(rateTypeInfo) as [RateType, typeof rateTypeInfo.fixed][]).map(([key, info]) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setRateType(key)}
                              className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                                rateType === key
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              <div className="font-semibold">{info.label}</div>
                              <div className="text-[10px] opacity-70 mt-0.5">
                                {info.stressRate > 0 ? `+${info.stressRate}%p 가산` : '가산 없음'}
                              </div>
                            </button>
                          ))}
                        </div>
                        {rateType === 'variable' && (
                          <p className="text-xs text-amber-600 mt-2 font-medium">
                            💡 변동금리는 스트레스 DSR로 한도가 줄어듭니다. 고정금리/주기형 선택 시 더 많은 한도 확보 가능!
                          </p>
                        )}
                      </div>

                      {/* 에러 메시지 */}
                      {error && (
                        <p className="text-sm text-red-500 text-center font-medium">
                          {error}
                        </p>
                      )}

                      {/* 계산 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        대출 한도 시뮬레이션
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* 경고 문구 (고정) */}
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <p className="text-xs text-amber-800 font-medium leading-relaxed">
                          ⚠️ 본 결과는 2026년 시행 예정인 <strong>'스트레스 DSR 3단계(100% 반영)'</strong> 기준입니다.
                          현재 시점의 한도보다 <strong>약 10~20% 더 적게</strong> 산출될 수 있습니다.
                        </p>
                      </div>

                      {/* 결과 헤더 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">최종 대출 가능 한도</p>
                        <div className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
                          {result?.finalLimit === 0 ? (
                            <span className="text-red-600">대출 불가</span>
                          ) : (
                            <>
                              {formatNumber(Math.round(result!.finalLimit / 10000))}
                              <span className="text-xl font-bold text-slate-500 ml-1">만원</span>
                            </>
                          )}
                        </div>
                        {result && result.finalLimit > 0 && (
                          <p className="text-sm text-slate-500">
                            예상 월 상환액: <span className="font-bold text-slate-700">{formatNumber(Math.round(result.monthlyPayment / 10000))}만원</span>
                          </p>
                        )}
                      </div>

                      {/* 제약 조건 (Bottleneck) */}
                      {result && result.bottleneck !== 'blocked' && (
                        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                          <p className="text-sm text-red-800">
                            <span className="font-bold">제약 조건:</span> {getBottleneckLabel(result.bottleneck)}
                          </p>
                          <p className="text-xs text-red-600 mt-1">
                            {result.bottleneck === 'dsr'
                              ? `연 소득 대비 DSR ${result.dsrRatio}%로, ${result.appliedDSR}% 한도에 도달했습니다.`
                              : result.bottleneck === 'ltv'
                                ? `주택가격 대비 LTV ${result.appliedLTV}% 한도에 도달했습니다.`
                                : result.bottleneck === 'dti'
                                  ? `연 소득 대비 DTI ${result.appliedDTI}% 한도에 도달했습니다.`
                                  : `생애최초 특례 최대 한도 6억 원에 도달했습니다.`
                            }
                          </p>
                        </div>
                      )}

                      {/* 상세 규제별 한도 */}
                      {result && result.finalLimit > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                            <span className="text-sm text-slate-600">LTV 한도 ({result.appliedLTV}%)</span>
                            <span className="font-bold text-blue-600">{formatNumber(Math.round(result.ltvLimit / 10000))}만원</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                            <span className="text-sm text-slate-600">DTI 한도 ({result.appliedDTI}%)</span>
                            <span className="font-bold text-green-600">{formatNumber(Math.round(result.dtiLimit / 10000))}만원</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                            <span className="text-sm text-slate-600">
                              DSR 한도 ({result.appliedDSR}%)
                              {result.stressRate > 0 && <span className="text-xs text-red-500 ml-1">+{result.stressRate}%p</span>}
                            </span>
                            <span className="font-bold text-red-600">{formatNumber(Math.round(result.dsrLimit / 10000))}만원</span>
                          </div>
                        </div>
                      )}

                      {/* 금리 유형별 비교 */}
                      {rateComparison && result && result.finalLimit > 0 && (
                        <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                          <h4 className="text-sm font-bold text-slate-700 mb-3">
                            💡 금리 유형별 한도 비교
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 bg-white rounded-lg">
                              <div className="text-slate-500">고정금리</div>
                              <div className="font-bold text-green-600">{formatNumber(Math.round(rateComparison.fixed.finalLimit / 10000))}만원</div>
                            </div>
                            <div className="p-2 bg-white rounded-lg">
                              <div className="text-slate-500">주기형</div>
                              <div className="font-bold text-blue-600">{formatNumber(Math.round(rateComparison.periodic.finalLimit / 10000))}만원</div>
                            </div>
                            <div className="p-2 bg-white rounded-lg">
                              <div className="text-slate-500">혼합형(5년)</div>
                              <div className="font-bold text-amber-600">{formatNumber(Math.round(rateComparison.mixed_5y.finalLimit / 10000))}만원</div>
                            </div>
                            <div className="p-2 bg-white rounded-lg">
                              <div className="text-slate-500">변동금리</div>
                              <div className="font-bold text-red-600">{formatNumber(Math.round(rateComparison.variable.finalLimit / 10000))}만원</div>
                            </div>
                          </div>
                          {rateType === 'variable' && rateComparison.fixed.finalLimit > rateComparison.variable.finalLimit && (
                            <p className="text-xs text-indigo-700 mt-3 font-medium">
                              ✨ 고정금리 선택 시 <strong className="text-indigo-800">
                                {formatNumber(Math.round((rateComparison.fixed.finalLimit - rateComparison.variable.finalLimit) / 10000))}만원
                              </strong> 더 대출 가능합니다!
                            </p>
                          )}
                        </div>
                      )}

                      {/* 경고 메시지들 */}
                      {result && result.warnings.length > 0 && (
                        <div className="space-y-2">
                          {result.warnings.map((warning, idx) => (
                            <div key={idx} className="p-3 bg-amber-50 rounded-lg text-xs text-amber-700">
                              {warning}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 버튼 */}
                      <div className="flex gap-3">
                        <button
                          onClick={handleReset}
                          className="flex-1 py-3.5 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          다시 계산
                        </button>
                        <Link
                          href="/mortgage-calculator"
                          className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-colors text-center shadow-lg shadow-slate-200"
                        >
                          주담대 계산기
                        </Link>
                      </div>

                      {/* 관련 콘텐츠 */}
                      <RelatedContentCTA
                        posts={getPostsByCalculator('/loan-calculator')}
                        title="대출 규제에 대해 더 알아보기"
                      />
                    </div>
                  )}
                </div>

                {/* 출처 표기 */}
                <p className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed">
                  ※ 본 계산은 국토교통부 주택시장 안정대책 및<br />
                  금융위 스트레스 DSR 가이드라인을 준수합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 결과 상세 - 결과가 있을 때만 */}
        {showResult && result && result.finalLimit > 0 && (
          <>
            {/* 차트 섹션 */}
            <section className="py-12 bg-white">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                  규제별 한도 분석
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 규제별 한도 비교 */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">LTV/DTI/DSR 한도 비교</h3>
                    <div className="h-[280px]">
                      {limitComparisonData && <Bar data={limitComparisonData} options={barOptions} />}
                    </div>
                  </div>

                  {/* 금리 유형별 한도 비교 */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">금리 유형별 한도 비교</h3>
                    <div className="h-[280px]">
                      {rateComparisonData && <Bar data={rateComparisonData} options={barOptions} />}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 상세 분석 리포트 */}
            <section className="py-12 bg-slate-50">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">상세 분석 리포트</h2>

                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="font-bold text-slate-800 mb-2">적용된 규제</p>
                      <p>{result.regionDescription}</p>
                      <p className="mt-1">LTV {result.appliedLTV}% / DTI {result.appliedDTI}% / DSR {result.appliedDSR}%</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="font-bold text-slate-800 mb-2">금리 분석</p>
                      <p>기본 금리: {interestRate}%</p>
                      <p>스트레스 가산: +{result.stressRate}%p</p>
                      <p className="font-semibold text-blue-700">실효 금리: {result.effectiveRate}%</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-xl">
                      <p className="font-bold text-slate-800 mb-2">대출 상환 분석</p>
                      <p>대출 기간: {loanYears}년 ({parseInt(loanYears) * 12}개월)</p>
                      <p>월 상환액: {formatNumber(Math.round(result.monthlyPayment / 10000))}만원</p>
                      <p>예상 DSR: {result.dsrRatio}%</p>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <p className="font-bold text-amber-800 mb-2">⚠️ 분석 결과</p>
                      <p className="text-amber-700">
                        {result.regionDescription} 지역에서 LTV 기준으로는 {formatNumber(Math.round(result.ltvLimit / 10000))}만원까지 가능하지만,{' '}
                        <strong>2026년 스트레스 DSR 규제로 인해 실제로는 {formatNumber(Math.round(result.finalLimit / 10000))}만원</strong>까지만 가능합니다.
                        {result.bottleneck === 'dsr' && (
                          <span> ({getBottleneckLabel(result.bottleneck)}이 제약 조건)</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* 가이드 섹션 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">2026년 대출 규제 가이드</h2>

              {/* 스트레스 DSR 3단계 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  스트레스 DSR 3단계란?
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  2026년부터 시행되는 스트레스 DSR 3단계는 <strong className="text-slate-800">미래 금리 상승 가능성을 100% 반영</strong>하여
                  대출 심사 시 현재 금리보다 높은 가산 금리를 적용하는 제도입니다.
                </p>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-red-800 text-sm">
                    <strong>금리 유형별 가산 금리 (2026년 기준):</strong><br />
                    • 고정금리: 가산 없음 (0%p)<br />
                    • 주기형: 최대 +0.75%p<br />
                    • 혼합형(5년): 최대 +1.5%p<br />
                    • 변동금리: <strong className="text-red-700">최대 +3.0%p</strong>
                  </p>
                </div>
              </div>

              {/* 지역별 LTV/DTI 규제 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  지역별 LTV/DTI 규제 (국토부 기준)
                </h3>
                <p className="text-xs text-slate-400 mb-2 md:hidden flex items-center gap-1">
                  <span>←</span> 좌우 스크롤 <span>→</span>
                </p>
                <div className="overflow-x-auto -mx-2 px-2">
                  <table className="w-full text-sm border-collapse min-w-[400px]">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="p-3 text-left font-bold">지역</th>
                        <th className="p-3 text-center font-bold">LTV</th>
                        <th className="p-3 text-center font-bold">DTI</th>
                        <th className="p-3 text-center font-bold">DSR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3 font-medium">투기과열지구 (강남/서초/송파/용산)</td>
                        <td className="p-3 text-center text-red-600 font-bold">50%</td>
                        <td className="p-3 text-center">40%</td>
                        <td className="p-3 text-center">40%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">조정대상지역 (서울/수도권)</td>
                        <td className="p-3 text-center text-amber-600 font-bold">60%</td>
                        <td className="p-3 text-center">50%</td>
                        <td className="p-3 text-center">40%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">비규제지역</td>
                        <td className="p-3 text-center text-green-600 font-bold">70%</td>
                        <td className="p-3 text-center">60%</td>
                        <td className="p-3 text-center">40%</td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="p-3 font-medium">생애최초 특례</td>
                        <td className="p-3 text-center text-blue-600 font-bold">80%</td>
                        <td className="p-3 text-center">60%</td>
                        <td className="p-3 text-center">40%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  * 다주택자는 규제지역 내 주택담보대출 불가
                </p>
              </div>

              {/* 참고자료 */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-slate-800 mb-4">참고자료</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>
                    <a href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      국토교통부 - 주택시장 안정대책
                    </a>
                  </li>
                  <li>
                    <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      금융위원회 - 스트레스 DSR 가이드라인
                    </a>
                  </li>
                  <li>
                    <a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      금융감독원 - 대출금리 비교공시
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 계산 기준 안내 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-6 text-center">2026 미래 기준 적용 사항</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">●</span>
                    <span className="text-slate-300">스트레스 DSR 3단계 (100% 반영)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">●</span>
                    <span className="text-slate-300">변동금리 최대 3.0%p 가산</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">●</span>
                    <span className="text-slate-300">모든 대출 포함 (신용대출, 카드론 등)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">국토부 공식 LTV/DTI 매트릭스</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">MIN(LTV, DTI, DSR) 최종 한도 산출</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">생애최초 특례 6억 Cap 적용</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                ※ 본 계산은 국토교통부 주택시장 안정대책 및 금융위 스트레스 DSR 가이드라인을 준수합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/loan-calculator')} />
          </div>
        </section>

        {/* 광고 */}
        <section className="py-8 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <AdUnit className="my-4" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
