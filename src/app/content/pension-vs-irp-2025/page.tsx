import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CalculatorCTA } from '@/components/ui/CalculatorCTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '연금저축 vs IRP 비교 2025 | moneylife.kr',
  description: '연금저축 vs IRP 완벽 비교 2025! 세액공제 한도, 수익률, 추천 대상까지 한눈에 정리. 어떤 연금이 나에게 유리할까?',
  keywords: '연금저축, IRP, 개인형퇴직연금, 연금저축 세액공제, IRP 세액공제, 연금 비교, 2025',
}

export default function PensionVsIRP2025() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-2 sm:px-4 py-6 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-8 sm:mb-12 text-center px-2">
          <div className="inline-block bg-slate-100 text-slate-600 border border-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            연금
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            연금저축 vs IRP 완벽 비교 2025
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            2025년 최신 기준으로 연금저축과 IRP를 비교합니다.
          </p>
        </section>

        {/* 상단 계산기 CTA */}
        <section className="mb-6 sm:mb-8">
          <CalculatorCTA
            calculatorPath="/pension-calculator"
            calculatorName="국민연금 계산기"
            description="내 연금 예상액 확인하기"
          />
        </section>

        {/* 핵심 요약 */}
        <section className="bg-slate-900 text-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">한 줄 요약</h2>
          <div className="text-sm sm:text-xl font-semibold space-y-2 sm:space-y-3">
            <p>✅ <strong>연금저축 600만</strong> + <strong>IRP 300만</strong> = <strong>900만원</strong> 세액공제</p>
            <p>✅ 최대 <strong>148.5만원</strong> 환급 (총급여 5,500만 이하)</p>
            <p>✅ 둘 다 가입하는 것이 <strong>가장 유리</strong></p>
          </div>
        </section>

        {/* 핵심 비교표 */}
        <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">연금저축 vs IRP 핵심 비교</h2>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center whitespace-nowrap">구분</th>
                  <th className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">연금저축</th>
                  <th className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">IRP (개인형 퇴직연금)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 font-semibold whitespace-nowrap text-center">가입 대상</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">누구나 가능</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">근로자, 자영업자, 공무원 등</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 font-semibold whitespace-nowrap text-center">세액공제 한도</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-blue-700 font-bold">연 600만원</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-blue-700 font-bold">연 900만원<br />(연금저축 포함)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 font-semibold whitespace-nowrap text-center">세액공제율</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right">16.5% or 13.2%</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right">16.5% or 13.2%</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 font-semibold whitespace-nowrap text-center">최대 공제액</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-green-700 font-bold">99만원</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-green-700 font-bold">148.5만원</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 font-semibold whitespace-nowrap text-center">투자 상품</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">펀드, 보험, ETF</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">펀드, ETF, 예금 (원리금보장형 30% 이상)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 font-semibold whitespace-nowrap text-center">중도 인출</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">가능 (기타소득세 16.5%)</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">원칙적 불가 (예외 있음)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 font-semibold whitespace-nowrap text-center">수령 시기</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">만 55세 이상</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">만 55세 이상</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 font-semibold whitespace-nowrap text-center">추천 대상</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">유연한 운용 원함</td>
                  <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-center">세액공제 최대화</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mt-3 sm:mt-4">
            * 2025년 기준 / 총급여 5,500만원 이하 16.5%, 초과 13.2%
          </p>
        </section>

        {/* 세액공제 계산 */}
        <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">세액공제 금액 계산</h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-6 rounded-xl">
              <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4">총급여 5,500만원 이하 (16.5%)</h3>
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-left">납입액</th>
                      <th className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right">연금저축만</th>
                      <th className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right">연금저축 + IRP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3">연 300만원</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-blue-700 font-bold">49.5만원</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right">49.5만원</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3">연 600만원</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-blue-700 font-bold">99만원</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right">99만원</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 font-semibold">연 900만원</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-slate-500 text-xs sm:text-sm">한도 초과<br className="sm:hidden" />(99만원)</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-green-700 font-bold">148.5만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-3 sm:p-6 rounded-xl">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">총급여 5,500만원 초과 (13.2%)</h3>
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-left">납입액</th>
                      <th className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right">연금저축만</th>
                      <th className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right">연금저축 + IRP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3">연 300만원</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-blue-700 font-bold">39.6만원</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right">39.6만원</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3">연 600만원</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-blue-700 font-bold">79.2만원</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right">79.2만원</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 font-semibold">연 900만원</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-slate-500 text-xs sm:text-sm">한도 초과<br className="sm:hidden" />(79.2만원)</td>
                      <td className="border border-slate-200 px-2 sm:px-4 py-2 sm:py-3 text-right text-green-700 font-bold">118.8만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 추천 전략 */}
        <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">상황별 추천 전략</h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="border-l-4 border-green-500 bg-green-50 p-4 sm:p-6 rounded-r-xl">
              <h3 className="font-semibold text-green-900 mb-2 sm:mb-3 text-sm sm:text-base">✅ 직장인 (DC형 퇴직연금 없음)</h3>
              <p className="text-slate-700 text-xs sm:text-sm mb-2 sm:mb-3">
                → <strong>연금저축 600만원 + IRP 300만원 = 총 900만원</strong>
              </p>
              <p className="text-slate-600 text-xs sm:text-sm">
                • 세액공제: 148.5만원 (총급여 5,500만원 이하)<br />
                • 월 75만원씩 자동이체 추천
              </p>
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 sm:p-6 rounded-r-xl">
              <h3 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">✅ 직장인 (DC형 퇴직연금 있음)</h3>
              <p className="text-slate-700 text-xs sm:text-sm mb-2 sm:mb-3">
                → <strong>회사 DC + IRP 추가 납입 (300만원)</strong>
              </p>
              <p className="text-slate-600 text-xs sm:text-sm">
                • 회사 DC: 회사가 납입 (세액공제 없음)<br />
                • 개인 IRP: 300만원 추가 납입 (세액공제 49.5만원)
              </p>
            </div>

            <div className="border-l-4 border-slate-500 bg-slate-50 p-4 sm:p-6 rounded-r-xl">
              <h3 className="font-semibold text-slate-900 mb-2 sm:mb-3 text-sm sm:text-base">✅ 자영업자 / 프리랜서</h3>
              <p className="text-slate-700 text-xs sm:text-sm mb-2 sm:mb-3">
                → <strong>IRP 900만원 (또는 연금저축 600 + IRP 300)</strong>
              </p>
              <p className="text-slate-600 text-xs sm:text-sm">
                • 국민연금 부족분 보완용으로 활용<br />
                • 세액공제 최대 148.5만원
              </p>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 p-4 sm:p-6 rounded-r-xl">
              <h3 className="font-semibold text-purple-900 mb-2 sm:mb-3 text-sm sm:text-base">✅ 여유 자금이 많은 경우</h3>
              <p className="text-slate-700 text-xs sm:text-sm mb-2 sm:mb-3">
                → <strong>연금저축 1,800만원 + IRP 900만원 = 총 2,700만원</strong>
              </p>
              <p className="text-slate-600 text-xs sm:text-sm">
                • 세액공제는 900만원까지만 인정<br />
                • 나머지는 비과세 혜택 (연금 수령 시)
              </p>
            </div>
          </div>
        </section>

        {/* 주의사항 */}
        <section className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">주의사항</h2>

          <div className="space-y-3 sm:space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-r-xl">
              <h3 className="font-semibold text-red-900 mb-2 sm:mb-3 text-sm sm:text-base">❌ 중도 해지 시</h3>
              <p className="text-slate-700 text-xs sm:text-sm">
                • 55세 이전 해지: <strong>기타소득세 16.5%</strong> 과세<br />
                • 세액공제 받은 금액 토해내야 함
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sm:p-6 rounded-r-xl">
              <h3 className="font-semibold text-yellow-900 mb-2 sm:mb-3 text-sm sm:text-base">IRP 원리금보장형 30% 의무</h3>
              <p className="text-slate-700 text-xs sm:text-sm">
                • IRP는 원리금보장형 30% 이상 의무<br />
                • 나머지 70%만 주식/ETF 투자 가능
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded-r-xl">
              <h3 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">연금 수령 시</h3>
              <p className="text-slate-700 text-xs sm:text-sm">
                • 55세 이상 + 5년 이상 유지 시 수령 가능<br />
                • 연금소득세: 3.3~5.5% (일반 15.4%보다 유리)
              </p>
            </div>
          </div>
        </section>

        {/* 유용한 도구 */}
        <section className="bg-slate-100 rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">연금 관련 유용한 계산기</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            <Link href="/pension-calculator" className="block bg-white p-4 sm:p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="flex sm:block items-center gap-3">
                <div className="text-2xl sm:text-3xl sm:mb-3">💼</div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg sm:mb-2">국민연금 계산기</h3>
                  <p className="text-xs sm:text-sm text-slate-600">예상 수령액 계산</p>
                </div>
              </div>
            </Link>

            <Link href="/content/pension-strategy" className="block bg-white p-4 sm:p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="flex sm:block items-center gap-3">
                <div className="text-2xl sm:text-3xl sm:mb-3">📈</div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg sm:mb-2">퇴직연금 운용 전략</h3>
                  <p className="text-xs sm:text-sm text-slate-600">DC형, IRP 운용 가이드</p>
                </div>
              </div>
            </Link>

            <Link href="/compound-interest-calculator" className="block bg-white p-4 sm:p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="flex sm:block items-center gap-3">
                <div className="text-2xl sm:text-3xl sm:mb-3">💰</div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg sm:mb-2">복리 이자 계산기</h3>
                  <p className="text-xs sm:text-sm text-slate-600">30년 장기 투자 시뮬레이션</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            지금 바로 연금 가입하세요
          </h2>
          <p className="text-sm sm:text-lg text-slate-300 mb-6 sm:mb-8">
            연 900만원 납입 시 최대 148.5만원 세액공제!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/pension-calculator"
              className="inline-block bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-xl transition-shadow text-sm sm:text-base"
            >
              국민연금 계산하기
            </Link>
            <Link
              href="/content/pension-strategy"
              className="inline-block bg-slate-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-slate-700 transition-all text-sm sm:text-base"
            >
              운용 전략 보기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
