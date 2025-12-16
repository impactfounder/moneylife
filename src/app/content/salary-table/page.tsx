import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CalculatorCTA } from '@/components/ui/CalculatorCTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2025년 연봉별 실수령액 표 (3천~3억) | moneylife.kr',
  description: '2025년 연봉 3천만원부터 3억원까지 실수령액 한눈에 비교. 4대보험, 세금 제외한 월급과 연봉을 500만원 단위로 정리했습니다.',
  keywords: '연봉 실수령액 표, 연봉별 실수령표, 2025년 실수령액, 세후 연봉, 월급 실수령액',
}

export default function SalaryTable2025() {
  const salaryData = [
    { annual: 3000, monthly: 250, netAnnual: 2744, netMonthly: 229, deduction: 256 },
    { annual: 3500, monthly: 292, netAnnual: 3157, netMonthly: 263, deduction: 343 },
    { annual: 4000, monthly: 333, netAnnual: 3550, netMonthly: 296, deduction: 450 },
    { annual: 4500, monthly: 375, netAnnual: 3928, netMonthly: 327, deduction: 572 },
    { annual: 5000, monthly: 417, netAnnual: 4294, netMonthly: 358, deduction: 706 },
    { annual: 5500, monthly: 458, netAnnual: 4649, netMonthly: 387, deduction: 851 },
    { annual: 6000, monthly: 500, netAnnual: 4994, netMonthly: 416, deduction: 1006 },
    { annual: 7000, monthly: 583, netAnnual: 5656, netMonthly: 471, deduction: 1344 },
    { annual: 8000, monthly: 667, netAnnual: 6283, netMonthly: 524, deduction: 1717 },
    { annual: 9000, monthly: 750, netAnnual: 6879, netMonthly: 573, deduction: 2121 },
    { annual: 10000, monthly: 833, netAnnual: 7448, netMonthly: 621, deduction: 2552 },
    { annual: 12000, monthly: 1000, netAnnual: 8516, netMonthly: 710, deduction: 3484 },
    { annual: 15000, monthly: 1250, netAnnual: 10318, netMonthly: 860, deduction: 4682 },
    { annual: 20000, monthly: 1667, netAnnual: 13138, netMonthly: 1095, deduction: 6862 },
    { annual: 25000, monthly: 2083, netAnnual: 15866, netMonthly: 1322, deduction: 9134 },
    { annual: 30000, monthly: 2500, netAnnual: 18520, netMonthly: 1543, deduction: 11480 },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="inline-block bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-slate-200">
            급여
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            2025년 연봉별 실수령액 표
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            연봉 3천만원부터 3억원까지 한눈에 비교
          </p>
        </section>

        {/* 상단 계산기 CTA */}
        <section className="mb-8">
          <CalculatorCTA
            calculatorPath="/salary-calculator"
            calculatorName="급여 실수령액 계산기"
            description="내 연봉으로 정확한 실수령액 확인하기"
          />
        </section>

        {/* 핵심 요약 */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">알아두면 유용한 팁</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>실수령액 = 세전 급여 - 4대보험 - 소득세 - 지방소득세</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>평균 공제율: 연봉 3천만원 8~10%, 1억원 25~27%</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>고소득일수록 소득세 비중 높음 (누진세)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>부양가족, 공제항목에 따라 차이 발생</span>
            </li>
          </ul>
        </section>

        {/* 연봉별 실수령액 표 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">2025년 연봉별 실수령액 상세표</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">연봉<br/>(세전)</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">월급<br/>(세전)</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200 bg-teal-50">연봉<br/>(실수령)</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200 bg-teal-50">월급<br/>(실수령)</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">공제액<br/>(연)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {salaryData.map((data, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      {data.annual.toLocaleString()}만원
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {data.monthly}만원
                    </td>
                    <td className="px-4 py-3 text-right text-teal-700 font-bold bg-teal-50/50">
                      {data.netAnnual.toLocaleString()}만원
                    </td>
                    <td className="px-4 py-3 text-right text-teal-700 font-bold bg-teal-50/50">
                      {data.netMonthly}만원
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">
                      {data.deduction.toLocaleString()}만원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-2 text-sm text-slate-500">
            <p>* 2025년 세율표 기준 (국민연금 4.5%, 건강보험 3.545%, 고용보험 0.9%, 소득세, 지방소득세)</p>
            <p>* 단일 근로자, 부양가족 없음 가정</p>
            <p>* 실제 금액은 부양가족, 공제항목에 따라 다를 수 있음</p>
          </div>
        </section>

        {/* 구간별 특징 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">구간별 특징 분석</h2>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">3천만원 ~ 5천만원 (저소득 구간)</h3>
              <div className="text-slate-700 text-sm space-y-2">
                <p>• 실수령액 비율: <strong>약 85~90%</strong></p>
                <p>• 공제액: 약 300~700만원</p>
                <p>• 특징: 4대보험 비중이 높고, 소득세 비중 낮음</p>
                <p>• 연말정산 환급 가능성: 높음</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">5천만원 ~ 8천만원 (중산층 구간)</h3>
              <div className="text-slate-700 text-sm space-y-2">
                <p>• 실수령액 비율: <strong>약 80~85%</strong></p>
                <p>• 공제액: 약 700~1,700만원</p>
                <p>• 특징: 소득세가 본격적으로 증가하는 구간</p>
                <p>• 세율: 15~24% (누진세 적용)</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">1억원 이상 (고소득 구간)</h3>
              <div className="text-slate-700 text-sm space-y-2">
                <p>• 실수령액 비율: <strong>약 72~75%</strong></p>
                <p>• 공제액: 2,500만원 이상</p>
                <p>• 특징: 소득세 비중 급격히 증가 (24~35% 세율)</p>
                <p>• 절세 전략 필수: IRP, 연금저축 세액공제 활용</p>
              </div>
            </div>
          </div>
        </section>

        {/* 실수령액 높이는 방법 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">실수령액 높이는 방법</h2>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">합법적인 절세 전략</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 p-4 rounded-xl">
                <h4 className="font-semibold text-slate-900 mb-2">연금저축 + IRP</h4>
                <p className="text-slate-700">
                  연 900만원 납입 시 최대 148.5만원 세액공제<br />
                  <Link href="/content/pension-strategy" className="text-teal-600 hover:text-teal-700">→ 자세히 보기</Link>
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <h4 className="font-semibold text-slate-900 mb-2">월세 세액공제</h4>
                <p className="text-slate-700">
                  월세의 15% 또는 12% 세액공제<br />
                  (무주택 세대주, 연 750만원 한도)
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <h4 className="font-semibold text-slate-900 mb-2">체크카드 사용</h4>
                <p className="text-slate-700">
                  신용카드(15%) vs 체크카드(30%) 공제율<br />
                  연말 3개월은 체크카드 집중 사용
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <h4 className="font-semibold text-slate-900 mb-2">주택청약저축</h4>
                <p className="text-slate-700">
                  연 240만원 소득공제 (무주택 세대주)<br />
                  총급여 7천만원 이하만 가능
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 관련 계산기 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">관련 계산기</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/salary-calculator" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">급여 계산기</h3>
              <p className="text-sm text-slate-600">정확한 실수령액 계산</p>
            </Link>

            <Link href="/income-tax-calculator" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">종합소득세 계산기</h3>
              <p className="text-sm text-slate-600">2025년 세율표로 계산</p>
            </Link>

            <Link href="/content/tax-saving" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">절세 전략 가이드</h3>
              <p className="text-sm text-slate-600">합법적 절세 방법</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            직접 계산해보세요
          </h2>
          <p className="text-slate-400 mb-6">
            급여 계산기로 4대보험, 세금 빠진 정확한 금액 확인하세요
          </p>
          <Link
            href="/salary-calculator"
            className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
          >
            급여 계산하기 →
          </Link>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
