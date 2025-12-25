'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { formatNumber } from '@/lib/calculations'

type DiagnosisStep = 'info' | 'assets' | 'spending' | 'debt' | 'loading'

interface FormData {
  age: string
  occupation: string
  monthlySalary: string
  savingsDeposit: string
  stockInvestment: string
  realEstate: string
  monthlySpending: string
  housingCost: string
  totalDebt: string
  debtInterestRate: string
}

export default function FinancialDiagnosisPage() {
  const router = useRouter()
  const [step, setStep] = useState<DiagnosisStep>('info')
  const [formData, setFormData] = useState<FormData>({
    age: '',
    occupation: '직장인',
    monthlySalary: '',
    savingsDeposit: '',
    stockInvestment: '',
    realEstate: '',
    monthlySpending: '',
    housingCost: '',
    totalDebt: '',
    debtInterestRate: '',
  })

  const handleFormatInput = (value: string, field: keyof FormData) => {
    const numbers = value.replace(/[^0-9]/g, '')
    if (numbers) {
      setFormData(prev => ({ ...prev, [field]: formatNumber(parseInt(numbers)) }))
    } else {
      setFormData(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleNext = () => {
    if (step === 'info') setStep('assets')
    else if (step === 'assets') setStep('spending')
    else if (step === 'spending') setStep('debt')
    else if (step === 'debt') {
      setStep('loading')
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step === 'assets') setStep('info')
    else if (step === 'spending') setStep('assets')
    else if (step === 'debt') setStep('spending')
  }

  const handleSubmit = async () => {
    // 데이터를 sessionStorage에 저장
    const diagnosisData = {
      age: parseInt(formData.age) || 30,
      occupation: formData.occupation,
      monthlySalary: parseInt(formData.monthlySalary.replace(/,/g, '')) || 0,
      savingsDeposit: parseInt(formData.savingsDeposit.replace(/,/g, '')) || 0,
      stockInvestment: parseInt(formData.stockInvestment.replace(/,/g, '')) || 0,
      realEstate: parseInt(formData.realEstate.replace(/,/g, '')) || 0,
      monthlySpending: parseInt(formData.monthlySpending.replace(/,/g, '')) || 0,
      housingCost: parseInt(formData.housingCost.replace(/,/g, '')) || 0,
      totalDebt: parseInt(formData.totalDebt.replace(/,/g, '')) || 0,
      debtInterestRate: parseFloat(formData.debtInterestRate) || 0,
    }

    sessionStorage.setItem('financialDiagnosisData', JSON.stringify(diagnosisData))

    // 결과 페이지로 이동
    router.push('/financial-diagnosis/result')
  }

  const isStepValid = () => {
    if (step === 'info') {
      return formData.age && formData.monthlySalary
    }
    if (step === 'assets') {
      return true // 자산은 0이어도 됨
    }
    if (step === 'spending') {
      return formData.monthlySpending
    }
    if (step === 'debt') {
      return true // 빚이 없을 수도 있음
    }
    return false
  }

  const progressPercentage = {
    'info': 25,
    'assets': 50,
    'spending': 75,
    'debt': 100,
    'loading': 100,
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* 히어로 섹션 */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50">
          {/* 배경 그라데이션 */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-indigo-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-6 border border-violet-200">
                  AI 기반 무료 진단
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  AI 재무 진단
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  30초 만에 당신의 재무 상태를 냉정하게 분석해드립니다
                </p>
              </div>

              {/* 진행률 바 */}
              {step !== 'loading' && (
                <div className="w-full max-w-lg mb-8">
                  <div className="flex justify-between text-sm text-slate-500 mb-2">
                    <span>진행률</span>
                    <span>{progressPercentage[step]}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${progressPercentage[step]}%` }}
                    />
                  </div>
                </div>
              )}

              {/* 폼 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">

                  {/* Step 1: 기본 정보 */}
                  {step === 'info' && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900">기본 정보</h2>
                        <p className="text-sm text-slate-500 mt-1">나이와 소득을 알려주세요</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          나이
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                            placeholder="30"
                            min="18"
                            max="100"
                            className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            세
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          직업
                        </label>
                        <select
                          value={formData.occupation}
                          onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                          className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                        >
                          <option value="직장인">직장인</option>
                          <option value="자영업">자영업</option>
                          <option value="프리랜서">프리랜서</option>
                          <option value="학생">학생</option>
                          <option value="무직">무직</option>
                          <option value="기타">기타</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          월 세후 소득
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.monthlySalary}
                            onChange={(e) => handleFormatInput(e.target.value, 'monthlySalary')}
                            placeholder="350"
                            className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: 자산 현황 */}
                  {step === 'assets' && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900">자산 현황</h2>
                        <p className="text-sm text-slate-500 mt-1">현재 보유 자산을 입력하세요</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          예적금
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.savingsDeposit}
                            onChange={(e) => handleFormatInput(e.target.value, 'savingsDeposit')}
                            placeholder="0"
                            className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          주식/펀드/코인
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.stockInvestment}
                            onChange={(e) => handleFormatInput(e.target.value, 'stockInvestment')}
                            placeholder="0"
                            className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          부동산 (시세)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.realEstate}
                            onChange={(e) => handleFormatInput(e.target.value, 'realEstate')}
                            placeholder="0"
                            className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: 지출 현황 */}
                  {step === 'spending' && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900">지출 현황</h2>
                        <p className="text-sm text-slate-500 mt-1">월 평균 지출을 입력하세요</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          월 총 지출 (고정+변동)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.monthlySpending}
                            onChange={(e) => handleFormatInput(e.target.value, 'monthlySpending')}
                            placeholder="200"
                            className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">
                          식비, 쇼핑, 통신비, 교통비, 보험료 등 포함
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          월세/관리비 (있다면)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.housingCost}
                            onChange={(e) => handleFormatInput(e.target.value, 'housingCost')}
                            placeholder="0"
                            className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: 부채 현황 */}
                  {step === 'debt' && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900">부채 현황</h2>
                        <p className="text-sm text-slate-500 mt-1">빚이 있다면 입력하세요</p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          총 부채 (대출금)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.totalDebt}
                            onChange={(e) => handleFormatInput(e.target.value, 'totalDebt')}
                            placeholder="0"
                            className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">
                          주담대, 신용대출, 학자금 등 모든 대출 합산
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          평균 대출 금리
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.debtInterestRate}
                            onChange={(e) => setFormData(prev => ({ ...prev, debtInterestRate: e.target.value }))}
                            placeholder="5"
                            step="0.1"
                            min="0"
                            max="30"
                            className="w-full px-4 py-4 text-lg font-bold text-center border-2 border-slate-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all bg-slate-50 focus:bg-white text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            %
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 로딩 상태 */}
                  {step === 'loading' && (
                    <div className="py-12 text-center">
                      <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-violet-200 border-t-violet-600 mb-6"></div>
                      <h2 className="text-xl font-bold text-slate-900 mb-2">
                        AI가 분석 중입니다...
                      </h2>
                      <p className="text-slate-500">
                        당신의 재무 상태를 냉정하게 평가하는 중
                      </p>
                    </div>
                  )}

                  {/* 버튼 */}
                  {step !== 'loading' && (
                    <div className="flex gap-3 mt-8">
                      {step !== 'info' && (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="flex-1 py-4 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          이전
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
                          isStepValid()
                            ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-200'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {step === 'debt' ? 'AI 진단 받기' : '다음'}
                      </button>
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 입력 정보는 저장되지 않으며, AI 분석에만 사용됩니다
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
