'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'
import {
  calculateCapitalGainsTax,
  getTaxBurdenEvaluation,
  type CapitalGainsTaxInput,
  type CapitalGainsTaxResult
} from '@/lib/capital-gains-tax-calculator'
import { formatNumber } from '@/lib/calculations'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function CapitalGainsTaxCalculatorPage() {
  const [acquisitionPrice, setAcquisitionPrice] = useState('')
  const [transferPrice, setTransferPrice] = useState('')
  const [acquisitionExpense, setAcquisitionExpense] = useState('')
  const [transferExpense, setTransferExpense] = useState('')
  const [holdingPeriod, setHoldingPeriod] = useState('')
  const [isMultipleHomes, setIsMultipleHomes] = useState(false)
  const [isLongTerm, setIsLongTerm] = useState(true)
  const [result, setResult] = useState<CapitalGainsTaxResult | null>(null)
  const [showResult, setShowResult] = useState(false)

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

    const acquisition = parseInt(acquisitionPrice.replace(/,/g, '')) * 10000
    const transfer = parseInt(transferPrice.replace(/,/g, '')) * 10000
    const acqExpense = parseInt(acquisitionExpense.replace(/,/g, '')) * 10000 || 0
    const transExpense = parseInt(transferExpense.replace(/,/g, '')) * 10000 || 0
    const period = parseInt(holdingPeriod) || 1

    if (!acquisition || !transfer) {
      alert('취득가액과 양도가액을 입력해주세요')
      return
    }

    const input: CapitalGainsTaxInput = {
      acquisitionPrice: acquisition,
      transferPrice: transfer,
      acquisitionExpense: acqExpense,
      transferExpense: transExpense,
      holdingPeriod: period,
      isMultipleHomes,
      isLongTerm
    }

    const calcResult = calculateCapitalGainsTax(input)
    setResult(calcResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setShowResult(false)
    setAcquisitionPrice('')
    setTransferPrice('')
    setAcquisitionExpense('')
    setTransferExpense('')
    setHoldingPeriod('')
    setIsMultipleHomes(false)
    setIsLongTerm(true)
    setResult(null)
  }

  // 파이 차트 데이터 (세금 vs 순수익)
  const pieChartData = result && result.transferIncome > 0 ? {
    labels: ['양도소득세', '순수익 (세후)'],
    datasets: [{
      data: [
        Math.round(result.finalTax / 10000),
        Math.round(result.netProfit / 10000)
      ],
      backgroundColor: ['#ef4444', '#10b981'],
      borderWidth: 0,
    }],
  } : null

  // 바 차트 데이터 (거래 내역)
  const barChartData = result ? {
    labels: ['취득가액', '양도가액', '양도차익', '공제액', '세금', '순수익'],
    datasets: [{
      data: [
        Math.round((parseInt(acquisitionPrice.replace(/,/g, '')) + parseInt(acquisitionExpense.replace(/,/g, '') || '0'))),
        Math.round(parseInt(transferPrice.replace(/,/g, ''))),
        Math.round(result.transferIncome / 10000),
        Math.round(result.deductions / 10000),
        Math.round(result.finalTax / 10000),
        Math.round(result.netProfit / 10000)
      ],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#22c55e'],
      borderRadius: 8,
    }],
  } : null

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  const barChartOptions = {
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
          callback: function(value: number | string) {
            return formatNumber(Number(value)) + '만'
          }
        }
      }
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* 히어로 섹션 */}
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-slate-50">
          {/* 배경 그라데이션 */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-400/10 blur-[100px]"></div>
            <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-red-400/10 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-amber-400/10 blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center">
              {/* 타이틀 영역 */}
              <div className="text-center mb-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold mb-6 border border-slate-200">
                  2025년 양도소득세율 적용
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                  양도소득세 계산기
                </h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  부동산 양도 시 예상 세금을 계산합니다
                </p>
              </div>

              {/* 계산기 카드 */}
              <div className="w-full max-w-lg">
                <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden bg-white/80 backdrop-blur-xl">
                  {!showResult ? (
                    <form onSubmit={handleCalculate} className="space-y-6">
                      {/* 취득가액 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          취득가액 (매입가)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={acquisitionPrice}
                            onChange={(e) => handleFormatInput(e.target.value, setAcquisitionPrice)}
                            placeholder="예: 50,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 양도가액 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          양도가액 (매도가)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={transferPrice}
                            onChange={(e) => handleFormatInput(e.target.value, setTransferPrice)}
                            placeholder="예: 70,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 취득비용 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          취득비용 (취득세, 중개료 등)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={acquisitionExpense}
                            onChange={(e) => handleFormatInput(e.target.value, setAcquisitionExpense)}
                            placeholder="예: 1,000"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 양도비용 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          양도비용 (중개료 등)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={transferExpense}
                            onChange={(e) => handleFormatInput(e.target.value, setTransferExpense)}
                            placeholder="예: 500"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            만원
                          </div>
                        </div>
                      </div>

                      {/* 보유 기간 */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                          보유 기간
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={holdingPeriod}
                            onChange={(e) => setHoldingPeriod(e.target.value)}
                            placeholder="예: 5"
                            min="0"
                            max="50"
                            className="w-full px-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-2 focus:ring-slate-200 transition-all bg-slate-50 focus:bg-white placeholder-slate-300 text-slate-900"
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            년
                          </div>
                        </div>
                      </div>

                      {/* 옵션 */}
                      <div className="space-y-3">
                        <label className="flex items-center justify-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isMultipleHomes}
                            onChange={(e) => setIsMultipleHomes(e.target.checked)}
                            className="w-5 h-5 text-slate-900 rounded focus:ring-2 focus:ring-slate-200"
                          />
                          <span className="text-slate-700 font-medium">다주택자 (중과세)</span>
                        </label>
                        <label className="flex items-center justify-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isLongTerm}
                            onChange={(e) => setIsLongTerm(e.target.checked)}
                            className="w-5 h-5 text-slate-900 rounded focus:ring-2 focus:ring-slate-200"
                          />
                          <span className="text-slate-700 font-medium">장기보유특별공제 적용 (3년 이상)</span>
                        </label>
                      </div>

                      {/* 계산 버튼 */}
                      <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        양도소득세 계산하기
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      {/* 결과 헤더 */}
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">납부할 양도소득세</p>
                        <div className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                          {formatNumber(Math.round(result!.finalTax / 10000))}
                          <span className="text-2xl font-bold text-slate-500 ml-1">만원</span>
                        </div>
                        <p className="text-sm text-slate-400">
                          실효세율: {result!.effectiveTaxRate.toFixed(2)}% | {getTaxBurdenEvaluation(result!.effectiveTaxRate)}
                        </p>
                      </div>

                      {/* 상세 결과 */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                          <span className="text-slate-600 font-medium">양도차익</span>
                          <span className="text-lg font-bold text-green-600">
                            {formatNumber(Math.round(result!.transferIncome / 10000))}만원
                          </span>
                        </div>
                        {result!.deductions > 0 && (
                          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                            <span className="text-slate-600 font-medium">장기보유공제</span>
                            <span className="text-lg font-bold text-purple-600">
                              -{formatNumber(Math.round(result!.deductions / 10000))}만원
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                          <span className="text-slate-600 font-medium">과세표준</span>
                          <span className="text-lg font-bold text-blue-600">
                            {formatNumber(Math.round(result!.taxableIncome / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                          <span className="text-slate-600 font-medium">결정세액</span>
                          <span className="text-xl font-bold text-orange-600">
                            {formatNumber(Math.round(result!.finalTax / 10000))}만원
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                          <span className="text-slate-600 font-medium">실제 수익</span>
                          <span className="text-lg font-bold text-slate-900">
                            {formatNumber(Math.round(result!.netProfit / 10000))}만원
                          </span>
                        </div>
                      </div>

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
                    </div>
                  )}
                </div>

                {/* 안내 문구 */}
                <p className="text-center text-xs text-slate-400 mt-4">
                  * 간이 계산이며, 실제 세금은 상황에 따라 달라질 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 차트 섹션 */}
        {showResult && result && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">양도 분석</h2>

              {/* 요약 카드 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">양도차익</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatNumber(Math.round(result.transferIncome / 10000))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">양도소득세</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatNumber(Math.round(result.finalTax / 10000))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">순수익</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatNumber(Math.round(result.netProfit / 10000))}만원
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-500 mb-1">실효세율</p>
                  <p className="text-xl font-bold text-purple-600">{result.effectiveTaxRate.toFixed(2)}%</p>
                </div>
              </div>

              {/* 차트 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pieChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">세금 vs 순수익</h3>
                    <div className="h-64">
                      <Pie data={pieChartData} options={chartOptions} />
                    </div>
                  </div>
                )}

                {barChartData && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">거래 내역</h3>
                    <div className="h-64">
                      <Bar data={barChartData} options={barChartOptions} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 양도소득세 가이드 */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">양도소득세 가이드</h2>

            <div className="space-y-8">
              {/* 양도소득세란 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">양도소득세란?</h3>
                <p className="text-slate-600 mb-4">
                  양도소득세는 부동산, 주식 등 자산을 양도(매매, 교환)할 때 발생하는 이익에 대해 부과되는 세금입니다.
                  양도차익에서 필요경비와 각종 공제를 뺀 과세표준에 세율을 적용합니다.
                </p>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-center font-mono text-sm text-slate-700">
                    양도소득세 = (<span className="text-blue-600 font-bold">양도가액</span> - <span className="text-red-600 font-bold">취득가액</span> - <span className="text-purple-600 font-bold">필요경비</span> - <span className="text-green-600 font-bold">공제</span>) × <span className="text-orange-600 font-bold">세율</span>
                  </p>
                </div>
              </div>

              {/* 1세대 1주택 비과세 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">1세대 1주택 비과세 요건</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="font-bold text-green-700 mb-2">기본 요건</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 1세대 1주택 (부수토지 포함)</li>
                      <li>• 2년 이상 보유 (조정대상지역: 2년 거주)</li>
                      <li>• 양도가액 12억원 이하 전액 비과세</li>
                      <li>• 12억원 초과 시 초과분만 과세</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4">
                    <h4 className="font-bold text-amber-700 mb-2">주의사항</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 일시적 2주택: 종전주택 3년 내 양도 시 비과세</li>
                      <li>• 상속주택: 별도 요건 확인 필요</li>
                      <li>• 조정대상지역: 실거주 요건 필수</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 장기보유특별공제 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">장기보유특별공제</h3>
                <p className="text-slate-600 mb-4">
                  3년 이상 보유한 부동산 양도 시 양도차익에서 일정 비율을 공제받을 수 있습니다.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-bold text-slate-700">보유기간</th>
                        <th className="px-4 py-2 text-center font-bold text-slate-700">일반</th>
                        <th className="px-4 py-2 text-center font-bold text-slate-700">1세대 1주택</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="px-4 py-2">3년</td><td className="text-center">6%</td><td className="text-center">12%</td></tr>
                      <tr><td className="px-4 py-2">5년</td><td className="text-center">10%</td><td className="text-center">20%</td></tr>
                      <tr><td className="px-4 py-2">10년</td><td className="text-center">20%</td><td className="text-center">40%</td></tr>
                      <tr><td className="px-4 py-2">15년 이상</td><td className="text-center">30%</td><td className="text-center">80%</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 다주택자 중과세 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">다주택자 중과세</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-xl p-4">
                    <h4 className="font-bold text-red-700 mb-2">조정대상지역 다주택자</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 2주택: 기본세율 + 20%p</li>
                      <li>• 3주택 이상: 기본세율 + 30%p</li>
                      <li>• 장기보유공제 배제</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-bold text-blue-700 mb-2">중과 배제 대상</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 수도권 외 지역 주택</li>
                      <li>• 상속받은 주택 (5년 이내)</li>
                      <li>• 이혼으로 취득한 주택</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 절세 전략 */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">양도소득세 절세 전략</h3>
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">1. 1세대 1주택 비과세 활용</h4>
                    <p className="text-sm text-slate-600">
                      가능하다면 1세대 1주택 요건을 갖춰 비과세 혜택을 받으세요.
                      12억원까지 전액 비과세됩니다.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">2. 장기보유특별공제</h4>
                    <p className="text-sm text-slate-600">
                      3년 이상 보유하면 장기보유특별공제를 받을 수 있습니다.
                      15년 이상 보유 시 최대 80%까지 공제됩니다.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">3. 필요경비 철저히 관리</h4>
                    <p className="text-sm text-slate-600">
                      취득세, 중개수수료, 인테리어 비용 등 필요경비 영수증을 철저히 보관하세요.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-2">4. 양도 시기 조절</h4>
                    <p className="text-sm text-slate-600">
                      연도별로 양도소득을 분산하면 낮은 세율 구간을 적용받을 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 계산 기준 안내 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-6 text-center">계산 기준 안내</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">2025년 양도소득세율 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">장기보유특별공제 최대 30%</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">기본공제 250만원</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">다주택자 중과세율 적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">1세대 1주택 비과세 미적용</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-bold">✓</span>
                    <span className="text-slate-300">지방소득세 포함</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                출처: 국세청 양도소득세 규정 (2025년)
              </p>
            </div>
          </div>
        </section>

        {/* 참고자료 */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">참고자료</h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.nts.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                국세청
              </a>
              <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                홈택스
              </a>
              <a href="https://www.molit.go.kr" target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-100 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
                국토교통부
              </a>
            </div>
          </div>
        </section>

        {/* 관련 가이드 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <RelatedGuides posts={getPostsByCalculator('/capital-gains-tax-calculator')} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
