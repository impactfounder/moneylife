import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '연봉 1억 실수령액은 얼마? (2025년 최신) | moneylife.kr',
  description: '2025년 기준 연봉 1억원의 실수령액은 약 7,200만원입니다. 4대보험과 세금을 제외한 월급과 연봉을 계산해드립니다.',
  keywords: '연봉 1억, 실수령액, 연봉 계산, 2025년 연봉, 세후 급여, 연봉 1억 세금',
  alternates: {
    canonical: '/content/annual-salary-100m',
  },
}

export default function AnnualSalary100M() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* 🎯 Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💵 연봉
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            연봉 1억 실수령액은?
          </h1>
          <p className="text-lg text-gray-600">
            2025년 기준 4대보험, 세금 빼면 얼마?
          </p>
        </section>

        {/* 📌 핵심 요약 */}
        <section className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 한 줄 요약</h2>
          <div className="space-y-4">
            <div className="bg-white bg-opacity-20 rounded-xl p-6">
              <div className="text-5xl font-bold mb-2">7,448만원</div>
              <div className="text-xl">월 약 621만원</div>
            </div>
            <div className="text-lg">
              ✓ 세전 연봉: 1억원<br />
              ✓ 공제액: 약 2,552만원 (25.5%)<br />
              ✓ 실수령: 7,448만원 (74.5%)
            </div>
          </div>
        </section>

        {/* 📊 상세 계산 */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📊 연봉 1억원 상세 계산</h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">💰 세전 기준</h3>
              <div className="space-y-2 text-lg">
                <div className="flex justify-between">
                  <span>연봉 (세전)</span>
                  <span className="font-bold">100,000,000원</span>
                </div>
                <div className="flex justify-between">
                  <span>월급 (세전)</span>
                  <span className="font-bold">8,333,333원</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-red-200 bg-red-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-red-900 mb-4">➖ 4대보험 공제</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>국민연금 (4.5%)</span>
                  <span className="font-semibold">4,500,000원</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>건강보험 (3.545%)</span>
                  <span className="font-semibold">3,545,000원</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>장기요양보험 (건보의 12.95%)</span>
                  <span className="font-semibold">459,078원</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>고용보험 (0.9%)</span>
                  <span className="font-semibold">900,000원</span>
                </div>
                <div className="border-t-2 border-red-300 pt-2 mt-2 flex justify-between font-bold text-red-700">
                  <span>4대보험 소계</span>
                  <span>9,404,078원</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-orange-200 bg-orange-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-orange-900 mb-4">➖ 세금 공제</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>소득세 (24% 누진 적용)</span>
                  <span className="font-semibold">14,180,400원</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>지방소득세 (소득세의 10%)</span>
                  <span className="font-semibold">1,418,040원</span>
                </div>
                <div className="border-t-2 border-orange-300 pt-2 mt-2 flex justify-between font-bold text-orange-700">
                  <span>세금 소계</span>
                  <span>15,598,440원</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl border-4 border-green-500">
              <h3 className="text-xl font-semibold text-green-900 mb-4">✅ 실수령액</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-2xl font-bold text-green-700">
                  <span>연간 실수령</span>
                  <span>74,477,922원</span>
                </div>
                <div className="flex justify-between text-xl font-semibold text-green-600">
                  <span>월 실수령 (평균)</span>
                  <span>6,206,493원</span>
                </div>
                <div className="flex justify-between text-gray-700 pt-2 border-t-2 border-green-300">
                  <span>총 공제액</span>
                  <span className="text-red-600 font-semibold">25,522,078원 (25.5%)</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            * 단일 근로자, 부양가족 없음 기준<br />
            * 실제 금액은 연말정산 시 공제항목에 따라 다를 수 있음
          </p>
        </section>

        {/* 💡 연봉 1억 현실 */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">💡 연봉 1억의 현실</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
              <h3 className="font-semibold text-blue-900 mb-3">📊 연봉 1억은 상위 몇 %?</h3>
              <div className="text-gray-700 text-sm space-y-2">
                <p>• 대한민국 근로자 중 <strong>상위 약 5~7%</strong></p>
                <p>• 40대 평균 연봉: 5,500만원 (1억은 약 1.8배)</p>
                <p>• 대기업 부장급, IT 개발자, 금융권 과장 이상 수준</p>
                <Link href="/content/salary-ranking" className="text-primary underline block mt-2">
                  → 내 연봉 순위 확인하기
                </Link>
              </div>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
              <h3 className="font-semibold text-green-900 mb-3">🏠 생활 수준</h3>
              <div className="text-gray-700 text-sm space-y-2">
                <p>• 서울 생활 가능: <strong>여유 있음</strong></p>
                <p>• 주택 구매력: 강남 제외 대부분 지역 가능</p>
                <p>• 노후 준비 + 자녀 교육 + 여가 생활 동시 가능</p>
                <p>• 월 저축 가능 금액: 약 200~300만원</p>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-xl">
              <h3 className="font-semibold text-orange-900 mb-3">💸 절세 전략 필수</h3>
              <div className="text-gray-700 text-sm space-y-2">
                <p>• 소득세율 24% (과세표준 8,800만원 초과)</p>
                <p>• IRP + 연금저축 세액공제 필수 (최대 148.5만원 환급)</p>
                <p>• 월세 세액공제, 신용카드 공제 등 적극 활용</p>
                <Link href="/content/tax-saving" className="text-primary underline block mt-2">
                  → 절세 전략 자세히 보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 📈 연봉 구간별 비교 */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📈 고연봉 구간 비교</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-amber-50">
                  <th className="border border-gray-300 px-4 py-3 text-left">연봉 (세전)</th>
                  <th className="border border-gray-300 px-4 py-3 text-right">실수령 (연)</th>
                  <th className="border border-gray-300 px-4 py-3 text-right">실수령 (월)</th>
                  <th className="border border-gray-300 px-4 py-3 text-right">공제율</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">8,000만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">6,283만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">524만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">21.5%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">9,000만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">6,879만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">573만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">23.6%</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">1억원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right text-purple-700 font-bold">7,448만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right text-purple-700 font-bold">621만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right text-red-600 font-bold">25.5%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">1억 2천만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">8,516만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">710만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">29.0%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">1억 5천만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">1억 318만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">860만원</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">31.2%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            * 연봉이 높을수록 누진세 적용으로 공제율 증가<br />
            * 1억 5천만원 이상부터는 소득세율 35% 적용
          </p>
        </section>

        {/* 🛠️ 유용한 도구 */}
        <section className="bg-gradient-to-r from-primary-light to-secondary-light rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ 연봉 관련 유용한 계산기</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/salary-calculator" className="block bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2">급여 계산기</h3>
              <p className="text-sm text-gray-600">
                내 연봉 실수령액 계산
              </p>
            </Link>

            <Link href="/content/salary-table" className="block bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-lg mb-2">실수령액 표</h3>
              <p className="text-sm text-gray-600">
                3천만원~3억원 한눈에
              </p>
            </Link>

            <Link href="/content/tax-saving" className="block bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💸</div>
              <h3 className="font-semibold text-lg mb-2">절세 전략</h3>
              <p className="text-sm text-gray-600">
                고연봉자 필수 절세법
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            내 연봉 실수령액이 궁금하신가요?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            급여 계산기로 정확한 금액을 확인하세요
          </p>
          <Link
            href="/salary-calculator"
            className="inline-block bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow"
          >
            💰 급여 계산하기
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
