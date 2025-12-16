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
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="inline-block bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-slate-200">
            급여
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            내 연봉, 상위 몇 %?
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            2025년 한국 근로자 연봉 순위표
          </p>
        </section>

        {/* 핵심 요약 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-slate-900 rounded-full"></span>
            핵심 요약
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-500 mb-1">중위 연봉 (상위 50%)</p>
              <p className="text-xl font-bold text-slate-900">3,800만원</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-500 mb-1">상위 30%</p>
              <p className="text-xl font-bold text-slate-900">5,000만원</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-500 mb-1">상위 10%</p>
              <p className="text-xl font-bold text-slate-900">8,000만원</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-500 mb-1">상위 1%</p>
              <p className="text-xl font-bold text-slate-900">2억원+</p>
            </div>
          </div>
        </section>

        {/* 연봉 순위표 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">2025년 연봉 순위표</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">상위 %</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700">연봉 (세전)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">평가</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">상위 1%</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">2억원 이상</td>
                  <td className="px-4 py-3 text-slate-600">최상위 고소득자</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">상위 5%</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">1억 2천만원</td>
                  <td className="px-4 py-3 text-slate-600">고소득자</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">상위 10%</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">8,000만원</td>
                  <td className="px-4 py-3 text-slate-600">상위권</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">상위 20%</td>
                  <td className="px-4 py-3 text-right font-semibold">6,000만원</td>
                  <td className="px-4 py-3 text-slate-600">중상위권</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">상위 30%</td>
                  <td className="px-4 py-3 text-right font-semibold">5,000만원</td>
                  <td className="px-4 py-3 text-slate-600">중위권 이상</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium">상위 50% (중위)</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">3,800만원</td>
                  <td className="px-4 py-3 text-slate-600">평균</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3">상위 70%</td>
                  <td className="px-4 py-3 text-right">3,000만원</td>
                  <td className="px-4 py-3 text-slate-600">하위권</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3">상위 90%</td>
                  <td className="px-4 py-3 text-right">2,200만원</td>
                  <td className="px-4 py-3 text-slate-600">저소득</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 mt-4">
            * 국세청 근로소득 통계 (2024년 기준) 참고 | 정규직 + 비정규직 전체 포함
          </p>
        </section>

        {/* 연령대별 연봉 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">연령대별 연봉 중위값</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">연령대</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700">중위 연봉</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">특징</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">20대</td>
                  <td className="px-4 py-3 text-right font-semibold">2,800만원</td>
                  <td className="px-4 py-3 text-slate-600">신입 ~ 3년차</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">30대</td>
                  <td className="px-4 py-3 text-right font-semibold">4,200만원</td>
                  <td className="px-4 py-3 text-slate-600">대리 ~ 과장</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium">40대</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">5,500만원</td>
                  <td className="px-4 py-3 text-slate-600">과장 ~ 부장 (최고점)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">50대</td>
                  <td className="px-4 py-3 text-right font-semibold">4,800만원</td>
                  <td className="px-4 py-3 text-slate-600">임원 or 퇴직 준비</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">60대 이상</td>
                  <td className="px-4 py-3 text-right font-semibold">2,500만원</td>
                  <td className="px-4 py-3 text-slate-600">재취업, 단순직</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 연봉 높이는 방법 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">연봉 상위권 진입 전략</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-2">이직으로 연봉 인상</h3>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
                  <p>• 평균 이직 시 연봉 인상률: <strong>20~30%</strong></p>
                  <p>• 내부 승진 시: 10~15% (이직이 더 유리)</p>
                  <p>• 3~5년 경력이면 이직 타이밍 적기</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-2">고연봉 직군 전환</h3>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
                  <p>• IT/개발: 평균 5,000만원+</p>
                  <p>• 금융/증권: 평균 6,000만원+</p>
                  <p>• 의료/제약: 평균 5,500만원+</p>
                  <p>• 법률/회계: 평균 7,000만원+</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-2">추가 수입원 확보</h3>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
                  <p>• N잡: 프리랜서, 강의, 블로그 수익</p>
                  <p>• 투자 소득: 배당주, ETF 투자</p>
                  <p>• 부동산: 월세, 전세 갭 투자</p>
                </div>
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
              <p className="text-sm text-slate-600">세전/세후 급여 즉시 계산</p>
            </Link>

            <Link href="/salary-rank" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">연봉 순위 테스트</h3>
              <p className="text-sm text-slate-600">내 연봉 백분위 확인</p>
            </Link>

            <Link href="/content/salary-negotiation" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">연봉 협상 전략</h3>
              <p className="text-sm text-slate-600">연봉 협상 노하우</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            내 연봉이 궁금하신가요?
          </h2>
          <p className="text-slate-400 mb-6">
            연봉 순위 테스트로 상위 몇 %인지 확인하세요
          </p>
          <Link
            href="/salary-rank"
            className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
          >
            연봉 순위 테스트하기 →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
