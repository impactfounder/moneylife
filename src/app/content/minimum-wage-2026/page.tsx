import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CalculatorCTA } from '@/components/ui/CalculatorCTA'
import { AdUnit } from '@/components/AdUnit'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2026년 최저시급 완벽 가이드 (10,320원) | moneylife.kr',
  description: '2026년 최저시급 10,320원 확정! 월급 계산, 주휴수당, 인상률, 알바생과 사업주가 알아야 할 모든 것을 정리했습니다.',
  keywords: '2026 최저시급, 최저임금 2026, 최저시급 인상, 주휴수당 계산, 최저임금 월급',
}

export default function MinimumWage2026Guide() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-orange-200">
            2026년 확정
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            2026년 최저시급 완벽 가이드
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            10,320원으로 확정된 2026년 최저임금의 모든 것
          </p>
        </section>

        {/* 상단 계산기 CTA */}
        <section className="mb-8">
          <CalculatorCTA
            calculatorPath="/minimum-wage-calculator"
            calculatorName="최저시급 계산기"
            description="2026년 최저시급으로 내 월급 계산하기"
          />
        </section>

        {/* 핵심 요약 */}
        <section className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">2026년 최저시급 핵심 정리</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 text-lg">
              <div className="flex items-start">
                <span className="mr-3">✓</span>
                <span><strong>시급:</strong> 10,320원 (4.7% 인상)</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3">✓</span>
                <span><strong>일급 (8시간):</strong> 82,560원</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3">✓</span>
                <span><strong>주급 (40시간):</strong> 495,360원</span>
              </div>
            </div>
            <div className="space-y-3 text-lg">
              <div className="flex items-start">
                <span className="mr-3">✓</span>
                <span><strong>월급 (209시간):</strong> 2,156,880원</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3">✓</span>
                <span><strong>주휴수당 포함 월급:</strong> 2,241,960원</span>
              </div>
              <div className="flex items-start">
                <span className="mr-3">✓</span>
                <span><strong>적용 시기:</strong> 2026년 1월 1일</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2025년 대비 변화 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">2025년 대비 얼마나 올랐나?</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-orange-50 rounded-xl p-5 border-2 border-orange-200 text-center">
              <p className="text-sm text-slate-600 mb-1">2026년</p>
              <p className="text-4xl font-black text-orange-600">10,320원</p>
              <p className="text-sm text-orange-600 font-semibold mt-2">+460원 (+4.7%)</p>
            </div>
            <div className="bg-slate-100 rounded-xl p-5 border border-slate-200 text-center">
              <p className="text-sm text-slate-600 mb-1">2025년</p>
              <p className="text-4xl font-black text-slate-600">9,860원</p>
              <p className="text-sm text-slate-500 mt-2">기준</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-5 text-white">
            <h3 className="font-bold mb-3">월급 차이 (주 40시간, 주휴수당 포함)</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-slate-400 text-sm">2026년</p>
                <p className="text-xl font-bold text-orange-400">2,241,960원</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">2025년</p>
                <p className="text-xl font-bold">2,141,900원</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">차액</p>
                <p className="text-xl font-bold text-green-400">+100,060원</p>
              </div>
            </div>
            <p className="text-center text-sm text-slate-400 mt-3">연간 약 120만원 증가</p>
          </div>
        </section>

        {/* 광고 - 중간 */}
        <section className="mb-8">
          <AdUnit className="rounded-xl overflow-hidden" />
        </section>

        {/* 월급 계산 상세 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">2026년 최저임금 월급 계산</h2>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-3">기본 월급 계산식</h3>
              <div className="text-slate-700 space-y-2">
                <p><strong>월급 = 시급 × 월 소정근로시간</strong></p>
                <p className="text-sm">• 주 40시간 근무 시: 10,320원 × 209시간 = <strong>2,156,880원</strong></p>
                <p className="text-sm text-slate-500">* 209시간 = (40시간 + 8시간 주휴) × 4.345주</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-3">주휴수당 포함 계산</h3>
              <div className="text-slate-700 space-y-2">
                <p><strong>주휴수당 = (주간 근무시간 ÷ 40) × 8 × 시급</strong></p>
                <p className="text-sm">• 주 40시간 근무: (40÷40) × 8 × 10,320 = <strong>82,560원/주</strong></p>
                <p className="text-sm">• 월 환산: 82,560원 × 4.345주 = <strong>358,723원/월</strong></p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">주간 근무시간</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">기본급 (월)</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">주휴수당 (월)</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200 bg-orange-50">총 월급</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">40시간</td>
                    <td className="px-4 py-3 text-center text-slate-700">1,793,472원</td>
                    <td className="px-4 py-3 text-center text-slate-700">358,694원</td>
                    <td className="px-4 py-3 text-center font-bold text-orange-600 bg-orange-50/50">2,152,166원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">30시간</td>
                    <td className="px-4 py-3 text-center text-slate-700">1,345,104원</td>
                    <td className="px-4 py-3 text-center text-slate-700">269,021원</td>
                    <td className="px-4 py-3 text-center font-bold text-orange-600 bg-orange-50/50">1,614,125원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">20시간</td>
                    <td className="px-4 py-3 text-center text-slate-700">896,736원</td>
                    <td className="px-4 py-3 text-center text-slate-700">179,347원</td>
                    <td className="px-4 py-3 text-center font-bold text-orange-600 bg-orange-50/50">1,076,083원</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900">15시간</td>
                    <td className="px-4 py-3 text-center text-slate-700">672,552원</td>
                    <td className="px-4 py-3 text-center text-slate-700">134,510원</td>
                    <td className="px-4 py-3 text-center font-bold text-orange-600 bg-orange-50/50">807,062원</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 text-center font-semibold text-slate-500">15시간 미만</td>
                    <td className="px-4 py-3 text-center text-slate-500">-</td>
                    <td className="px-4 py-3 text-center text-slate-500">미지급</td>
                    <td className="px-4 py-3 text-center text-slate-500 bg-slate-100">시급만 적용</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">* 월 환산 기준: 주급 × 4.345주 (연 52주 ÷ 12개월)</p>
          </div>
        </section>

        {/* 주휴수당 상세 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">주휴수당 완벽 이해</h2>

          <div className="space-y-4">
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
              <h3 className="font-semibold text-slate-900 mb-3">주휴수당이란?</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                주휴수당은 1주일간 소정 근로일을 개근한 근로자에게 유급 휴일(주휴일)을 주고,
                그 날에 대해 지급하는 임금입니다. 쉽게 말해 <strong>"일주일 열심히 일하면 하루 쉬어도 돈 주는 것"</strong>입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 mb-2">지급 조건</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• 주 15시간 이상 근무</li>
                  <li>• 소정 근로일 개근</li>
                  <li>• 다음 주 근무 예정</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-4">
                <h4 className="font-semibold text-red-800 mb-2">미지급 사유</h4>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• 주 15시간 미만 근무</li>
                  <li>• 결근 (지각/조퇴는 OK)</li>
                  <li>• 퇴사 주 (마지막 주)</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-100 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-3">주휴수당 계산 예시</h3>
              <div className="text-sm text-slate-700 space-y-2">
                <p><strong>예시 1)</strong> 주 5일, 하루 8시간 근무</p>
                <p className="pl-4">→ (40÷40) × 8 × 10,320 = <strong>82,560원/주</strong></p>
                <p className="mt-2"><strong>예시 2)</strong> 주 3일, 하루 6시간 근무 (주 18시간)</p>
                <p className="pl-4">→ (18÷40) × 8 × 10,320 = <strong>37,152원/주</strong></p>
                <p className="mt-2"><strong>예시 3)</strong> 주 2일, 하루 6시간 근무 (주 12시간)</p>
                <p className="pl-4">→ 주 15시간 미만으로 <strong>주휴수당 없음</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* 광고 - 중간 */}
        <section className="mb-8">
          <AdUnit className="rounded-xl overflow-hidden" />
        </section>

        {/* 알바생이 알아야 할 것 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">알바생이 꼭 알아야 할 것</h2>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="font-semibold text-blue-900 mb-3">1. 최저시급 미만 지급은 불법</h3>
              <p className="text-slate-700 text-sm">
                최저임금법에 따라 최저시급(10,320원) 미만으로 급여를 지급하면 사업주는
                <strong> 3년 이하의 징역 또는 2천만원 이하의 벌금</strong>에 처해질 수 있습니다.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-5">
              <h3 className="font-semibold text-purple-900 mb-3">2. 수습 기간 감액 제한</h3>
              <p className="text-slate-700 text-sm">
                수습 기간이라도 <strong>1년 이상 고용 예정</strong>인 경우에만 3개월간 최저임금의 90%(9,288원)를 지급할 수 있습니다.
                1년 미만 계약직, 단순노무직은 감액이 불가합니다.
              </p>
            </div>

            <div className="bg-teal-50 rounded-xl p-5">
              <h3 className="font-semibold text-teal-900 mb-3">3. 4대보험과 3.3% 세금</h3>
              <div className="text-slate-700 text-sm space-y-2">
                <p><strong>4대보험 가입 시:</strong> 국민연금, 건강보험, 고용보험 공제 (약 9% 차감)</p>
                <p><strong>프리랜서(3.3%):</strong> 사업소득세 3.3% 원천징수 (5월 종합소득세 신고 필요)</p>
                <p className="text-amber-700 mt-2">* 주 15시간 미만 초단시간 근로자는 4대보험 가입 제외</p>
              </div>
            </div>

            <div className="bg-rose-50 rounded-xl p-5">
              <h3 className="font-semibold text-rose-900 mb-3">4. 임금 체불 시 대처법</h3>
              <ul className="text-slate-700 text-sm space-y-1">
                <li>• <strong>고용노동부 진정:</strong> 국번없이 1350 또는 온라인 신청</li>
                <li>• <strong>체당금 제도:</strong> 사업주 파산 시 국가가 대신 지급</li>
                <li>• <strong>증거 확보:</strong> 근무기록, 계약서, 메시지 등 보관</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 사업주가 알아야 할 것 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">사업주가 알아야 할 것</h2>

          <div className="space-y-4">
            <div className="bg-slate-100 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-3">인건비 증가 시뮬레이션</h3>
              <div className="text-slate-700 text-sm">
                <p className="mb-2">직원 1명 (주 40시간, 주휴수당 포함) 기준:</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-500">2025년 월 인건비</p>
                    <p className="text-lg font-bold">2,141,900원</p>
                  </div>
                  <div>
                    <p className="text-slate-500">2026년 월 인건비</p>
                    <p className="text-lg font-bold text-orange-600">2,241,960원</p>
                  </div>
                </div>
                <p className="mt-3 text-amber-700">
                  → 연간 인건비 약 <strong>120만원 증가</strong> (4대보험 사업주 부담분 별도)
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="font-semibold text-blue-900 mb-3">정부 지원금 활용</h3>
              <ul className="text-slate-700 text-sm space-y-2">
                <li>• <strong>일자리 안정자금:</strong> 월 최대 11만원 지원 (30인 미만 사업장)</li>
                <li>• <strong>두루누리 사회보험료:</strong> 4대보험료 80% 지원 (10인 미만)</li>
                <li>• <strong>청년추가고용장려금:</strong> 청년 채용 시 연 최대 900만원</li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-5">
              <h3 className="font-semibold text-amber-900 mb-3">최저임금 위반 시 처벌</h3>
              <ul className="text-slate-700 text-sm space-y-1">
                <li>• 3년 이하 징역 또는 2천만원 이하 벌금</li>
                <li>• 근로감독관 지도점검 대상</li>
                <li>• 미지급 임금 + 지연이자(연 20%) 지급</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 최근 5년 최저시급 변화 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">최근 5년간 최저시급 변화</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">연도</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">최저시급</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">인상액</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">인상률</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-orange-50/50">
                  <td className="px-4 py-3 text-center font-bold text-orange-600">2026년</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-900">10,320원</td>
                  <td className="px-4 py-3 text-center text-slate-700">+460원</td>
                  <td className="px-4 py-3 text-center text-slate-700">+4.7%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center font-semibold text-slate-900">2025년</td>
                  <td className="px-4 py-3 text-center text-slate-900">9,860원</td>
                  <td className="px-4 py-3 text-center text-slate-700">+240원</td>
                  <td className="px-4 py-3 text-center text-slate-700">+2.5%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center font-semibold text-slate-900">2024년</td>
                  <td className="px-4 py-3 text-center text-slate-900">9,620원</td>
                  <td className="px-4 py-3 text-center text-slate-700">+460원</td>
                  <td className="px-4 py-3 text-center text-slate-700">+5.0%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center font-semibold text-slate-900">2023년</td>
                  <td className="px-4 py-3 text-center text-slate-900">9,620원</td>
                  <td className="px-4 py-3 text-center text-slate-700">+460원</td>
                  <td className="px-4 py-3 text-center text-slate-700">+5.0%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center font-semibold text-slate-900">2022년</td>
                  <td className="px-4 py-3 text-center text-slate-900">9,160원</td>
                  <td className="px-4 py-3 text-center text-slate-700">+440원</td>
                  <td className="px-4 py-3 text-center text-slate-700">+5.1%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-slate-100 rounded-xl p-4">
            <h3 className="font-semibold text-slate-900 mb-2">10년간 최저시급 변화</h3>
            <p className="text-sm text-slate-700">
              2016년 <strong>6,030원</strong> → 2026년 <strong>10,320원</strong><br />
              10년간 약 <strong>71% 상승</strong> (연평균 5.5% 인상)
            </p>
          </div>
        </section>

        {/* 광고 - 하단 */}
        <section className="mb-8">
          <AdUnit className="rounded-xl overflow-hidden" />
        </section>

        {/* 자주 묻는 질문 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">자주 묻는 질문 (FAQ)</h2>

          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Q. 2026년 최저시급은 언제부터 적용되나요?</h3>
              <p className="text-slate-700 text-sm">
                2026년 1월 1일부터 적용됩니다. 12월 31일까지는 2025년 최저시급(9,860원)이 적용됩니다.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Q. 수습 기간에도 최저시급 다 줘야 하나요?</h3>
              <p className="text-slate-700 text-sm">
                1년 이상 고용 예정인 경우에만 3개월간 90%(9,288원)를 지급할 수 있습니다.
                1년 미만 계약직이나 단순노무직은 수습 감액이 불가합니다.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Q. 주휴수당은 꼭 줘야 하나요?</h3>
              <p className="text-slate-700 text-sm">
                주 15시간 이상 근무하고 개근한 경우 반드시 지급해야 합니다.
                주휴수당 미지급도 최저임금법 위반으로 처벌 대상입니다.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-semibold text-slate-900 mb-2">Q. 식대, 교통비는 최저임금에 포함되나요?</h3>
              <p className="text-slate-700 text-sm">
                매월 정기적/일률적으로 지급되는 식대와 교통비는 최저임금에 포함됩니다.
                다만 실비 변상적 성격의 비용(실제 지출 보전)은 제외됩니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Q. 최저임금 위반 신고는 어디에 하나요?</h3>
              <p className="text-slate-700 text-sm">
                고용노동부(국번없이 1350) 또는 고용노동부 홈페이지에서 온라인 신고할 수 있습니다.
                익명 신고도 가능하며, 신고자 보호 조치가 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 관련 계산기 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">관련 계산기</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/minimum-wage-calculator" className="block p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors border border-orange-200">
              <h3 className="font-semibold text-slate-900 mb-1">최저시급 계산기</h3>
              <p className="text-sm text-slate-600">2026년 최저시급으로 월급 계산</p>
            </Link>

            <Link href="/salary-calculator" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">급여 실수령액 계산기</h3>
              <p className="text-sm text-slate-600">4대보험, 세금 공제 후 계산</p>
            </Link>

            <Link href="/severance-calculator" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">퇴직금 계산기</h3>
              <p className="text-sm text-slate-600">근속기간별 퇴직금 계산</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            내 급여 직접 계산해보세요
          </h2>
          <p className="text-slate-400 mb-6">
            2026년 최저시급 기준으로 월급, 주휴수당까지 한 번에 계산
          </p>
          <Link
            href="/minimum-wage-calculator"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            최저시급 계산하기 →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
