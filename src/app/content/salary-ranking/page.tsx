import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '내 연봉, 상위 몇 %? 2025년 연봉 순위표 | moneylife.kr',
  description: '2025년 한국 근로자 연봉 순위표. 내 연봉이 상위 몇 %인지 확인하세요. 상위 50%, 30%, 10%, 1% 기준 공개.',
  keywords: '연봉 순위, 상위 몇 퍼센트, 연봉 상위%, 평균 연봉, 중위 연봉, 2025년 연봉',
}

export default function SalaryRanking() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* 🎯 Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💼 연봉
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            내 연봉, 상위 몇 %?
          </h1>
          <p className="text-lg text-gray-600">
            2025년 한국 근로자 연봉 순위표
          </p>
        </section>

        {/* 📌 핵심 요약 */}
        <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 핵심 요약</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>중위 연봉 (상위 50%): 약 <strong>3,800만원</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>상위 30%: 약 <strong>5,000만원</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>상위 10%: 약 <strong>8,000만원</strong></span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">✓</span>
              <span>상위 1%: 약 <strong>2억원 이상</strong></span>
            </li>
          </ul>
        </section>

        {/* 📊 전체 연봉 순위표 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📊 2025년 연봉 순위표</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">상위 %</th>
                  <th className="border border-gray-300 px-4 py-3 text-right">연봉 (세전)</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">평가</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-red-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">상위 1%</td>
                  <td className="border border-gray-300 px-4 py-3 text-right text-red-600 font-bold">2억원 이상</td>
                  <td className="border border-gray-300 px-4 py-3">최상위 고소득자</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">상위 5%</td>
                  <td className="border border-gray-300 px-4 py-3 text-right text-orange-600 font-bold">1억 2천만원</td>
                  <td className="border border-gray-300 px-4 py-3">고소득자</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">상위 10%</td>
                  <td className="border border-gray-300 px-4 py-3 text-right text-yellow-700 font-bold">8,000만원</td>
                  <td className="border border-gray-300 px-4 py-3">상위권</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">상위 20%</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-semibold">6,000만원</td>
                  <td className="border border-gray-300 px-4 py-3">중상위권</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">상위 30%</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-semibold">5,000만원</td>
                  <td className="border border-gray-300 px-4 py-3">중위권 이상</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">상위 50% (중위)</td>
                  <td className="border border-gray-300 px-4 py-3 text-right text-primary font-bold">3,800만원</td>
                  <td className="border border-gray-300 px-4 py-3">평균</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">상위 70%</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">3,000만원</td>
                  <td className="border border-gray-300 px-4 py-3">하위권</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">상위 90%</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">2,200만원</td>
                  <td className="border border-gray-300 px-4 py-3">저소득</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            * 국세청 근로소득 통계 (2024년 기준) 참고<br />
            * 정규직 + 비정규직 전체 포함
          </p>
        </section>

        {/* 📈 연령대별 연봉 순위 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📈 연령대별 연봉 중위값</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">연령대</th>
                  <th className="border border-gray-300 px-4 py-3 text-right">중위 연봉</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">특징</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">20대</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-semibold">2,800만원</td>
                  <td className="border border-gray-300 px-4 py-3">신입 ~ 3년차</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">30대</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-semibold">4,200만원</td>
                  <td className="border border-gray-300 px-4 py-3">대리 ~ 과장</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-3">40대</td>
                  <td className="border border-gray-300 px-4 py-3 text-right text-green-700 font-bold">5,500만원</td>
                  <td className="border border-gray-300 px-4 py-3">과장 ~ 부장 (최고점)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">50대</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-semibold">4,800만원</td>
                  <td className="border border-gray-300 px-4 py-3">임원 or 퇴직 준비</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3">60대 이상</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-semibold">2,500만원</td>
                  <td className="border border-gray-300 px-4 py-3">재취업, 단순직</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 💡 연봉 높이는 방법 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">💡 연봉 상위권 진입 전략</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
              <h3 className="font-semibold text-blue-900 mb-3">1️⃣ 이직으로 연봉 인상</h3>
              <p className="text-gray-700 text-sm">
                • 평균 이직 시 연봉 인상률: <strong>20~30%</strong><br />
                • 내부 승진 시: 10~15% (이직이 더 유리)<br />
                • 3~5년 경력이면 이직 타이밍 적기
              </p>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
              <h3 className="font-semibold text-green-900 mb-3">2️⃣ 고연봉 직군 전환</h3>
              <p className="text-gray-700 text-sm">
                • IT/개발: 평균 5,000만원+<br />
                • 금융/증권: 평균 6,000만원+<br />
                • 의료/제약: 평균 5,500만원+<br />
                • 법률/회계: 평균 7,000만원+
              </p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-xl">
              <h3 className="font-semibold text-orange-900 mb-3">3️⃣ 추가 수입원 확보</h3>
              <p className="text-gray-700 text-sm">
                • N잡: 프리랜서, 강의, 블로그 수익<br />
                • 투자 소득: 배당주, ETF 투자<br />
                • 부동산: 월세, 전세 갭 투자
              </p>
            </div>
          </div>
        </section>

        {/* 🛠️ 유용한 도구 */}
        <section className="bg-gradient-to-r from-primary-light to-secondary-light rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ 연봉 관련 유용한 계산기</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/salary-calculator" className="block bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2">급여 계산기</h3>
              <p className="text-sm text-gray-600">
                세전/세후 급여 즉시 계산
              </p>
            </Link>

            <Link href="/salary-rank" className="block bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-semibold text-lg mb-2">연봉 순위 테스트</h3>
              <p className="text-sm text-gray-600">
                내 연봉 백분위 확인
              </p>
            </Link>

            <Link href="/content/salary-negotiation" className="block bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💪</div>
              <h3 className="font-semibold text-lg mb-2">연봉 협상 전략</h3>
              <p className="text-sm text-gray-600">
                연봉 협상 노하우
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            내 연봉이 궁금하신가요?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            연봉 순위 테스트로 상위 몇 %인지 확인하세요
          </p>
          <Link
            href="/salary-rank"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow"
          >
            🏆 연봉 순위 테스트하기
          </Link>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
