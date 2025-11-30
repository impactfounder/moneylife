import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/Card'

export const metadata = {
  title: '월급 300만원의 현실 - 2025년 구매력 분석 | moneylife.kr',
  description: '2025년 기준 월급 300만원의 실수령액, 생활비, 저축 가능 금액을 상세히 분석합니다. 서울/지방별 생활 수준 비교.',
  keywords: '월급 300만원, 실수령액, 생활비, 저축, 2025년 급여',
}

export default function Salary3MillionPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                💰 월급 300만원의 현실
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                2025년 기준 월급 300만원의 구매력과 생활 수준 분석
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                <span>📅 2025년 1월 기준</span>
                <span>•</span>
                <span>⏱️ 10분 소요</span>
              </div>
            </div>
          </div>
        </section>

        {/* 본문 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <article className="max-w-4xl mx-auto">

              {/* 실수령액 계산 */}
              <Card className="mb-8 bg-slate-50 border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  📊 월급 300만원, 실수령액은?
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">세전 월급</span>
                    <span className="text-xl font-bold text-slate-900">3,000,000원</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">국민연금 (4.5%)</span>
                      <span className="text-red-600">-135,000원</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">건강보험 (3.545%)</span>
                      <span className="text-red-600">-106,350원</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">장기요양 (12.95%)</span>
                      <span className="text-red-600">-13,772원</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">고용보험 (0.9%)</span>
                      <span className="text-red-600">-27,000원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">소득세 + 지방소득세</span>
                      <span className="text-red-600">-45,000원</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-slate-900">실수령액</span>
                      <span className="text-2xl font-bold text-indigo-600">약 2,673,000원</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 대한민국 순위 */}
              <Card className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  📈 대한민국에서 월급 300만원은?
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-700">전체 근로자 중</span>
                      <span className="text-xl font-bold text-indigo-600">상위 40-50%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div className="bg-slate-900 h-3 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">20대 평균</div>
                      <div className="text-lg font-bold text-slate-900">약 230만원</div>
                      <div className="text-xs text-green-600 mt-1">↑ 평균 이상</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="text-sm text-slate-600 mb-1">30대 평균</div>
                      <div className="text-lg font-bold text-slate-900">약 350만원</div>
                      <div className="text-xs text-red-600 mt-1">↓ 평균 이하</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 생활비 분석 */}
              <Card className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  🏠 월급 300만원으로 서울 생활 가능할까?
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">월 고정 지출 (서울 1인 가구 기준)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700">월세 (원룸, 보증금 500만원)</span>
                        <span className="font-semibold text-slate-900">800,000원</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700">식비 (외식 포함)</span>
                        <span className="font-semibold text-slate-900">500,000원</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700">교통비</span>
                        <span className="font-semibold text-slate-900">150,000원</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700">통신비 (휴대폰 + 인터넷)</span>
                        <span className="font-semibold text-slate-900">80,000원</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700">공과금 (전기/수도/가스)</span>
                        <span className="font-semibold text-slate-900">100,000원</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-700">생활용품 및 기타</span>
                        <span className="font-semibold text-slate-900">150,000원</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-slate-900">총 고정 지출</span>
                          <span className="text-red-600">1,780,000원</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-slate-900">지출 후 잔액</span>
                      <span className="text-xl font-bold text-indigo-600">약 893,000원</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      여가/교제비, 의료비, 긴급 예비비 등으로 사용 가능
                    </p>
                  </div>
                </div>
              </Card>

              {/* 저축 가능 금액 */}
              <Card className="mb-8 bg-emerald-50 border-emerald-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  💰 저축 가능 금액은?
                </h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
                      <div className="text-sm text-slate-600 mb-1">절약형</div>
                      <div className="text-2xl font-bold text-emerald-600">50만원</div>
                      <div className="text-xs text-slate-500 mt-1">외식/여가 최소화</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
                      <div className="text-sm text-slate-600 mb-1">보통형</div>
                      <div className="text-2xl font-bold text-indigo-600">30만원</div>
                      <div className="text-xs text-slate-500 mt-1">적당한 소비</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm">
                      <div className="text-sm text-slate-600 mb-1">여유형</div>
                      <div className="text-2xl font-bold text-purple-600">10만원</div>
                      <div className="text-xs text-slate-500 mt-1">취미/여가 활동</div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-3">10년 후 자산 시뮬레이션 (월 30만원 저축)</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-700">단순 저축 (이자 0%)</span>
                        <span className="font-semibold text-slate-900">3,600만원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">예금 (연 3%)</span>
                        <span className="font-semibold text-indigo-600">약 4,200만원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">적립식 펀드 (연 5%)</span>
                        <span className="font-semibold text-emerald-600">약 4,700만원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 지역별 비교 */}
              <Card className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  🗺️ 지역별 생활 수준 비교
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-slate-700">지역</th>
                        <th className="px-4 py-3 text-right text-slate-700">평균 월세</th>
                        <th className="px-4 py-3 text-right text-slate-700">월 생활비</th>
                        <th className="px-4 py-3 text-right text-slate-700">저축 가능</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">서울</td>
                        <td className="px-4 py-3 text-right text-slate-700">80만원</td>
                        <td className="px-4 py-3 text-right text-red-600">178만원</td>
                        <td className="px-4 py-3 text-right text-indigo-600">30-50만원</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-900">경기 (수도권)</td>
                        <td className="px-4 py-3 text-right text-slate-700">60만원</td>
                        <td className="px-4 py-3 text-right text-slate-700">158만원</td>
                        <td className="px-4 py-3 text-right text-indigo-600">50-70만원</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-slate-900">부산/대구</td>
                        <td className="px-4 py-3 text-right text-slate-700">50만원</td>
                        <td className="px-4 py-3 text-right text-slate-700">148만원</td>
                        <td className="px-4 py-3 text-right text-emerald-600">60-80만원</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-900">지방 중소도시</td>
                        <td className="px-4 py-3 text-right text-slate-700">40만원</td>
                        <td className="px-4 py-3 text-right text-slate-700">138만원</td>
                        <td className="px-4 py-3 text-right text-emerald-600">70-90만원</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* 결론 */}
              <Card className="mb-8 bg-gradient-to-r from-slate-50 to-indigo-50 border-indigo-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  💡 결론: 월급 300만원으로 살 수 있을까?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">지방 중소도시</h3>
                      <p className="text-sm text-slate-600">여유 있는 생활 가능, 월 70-90만원 저축 가능</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">서울</h3>
                      <p className="text-sm text-slate-600">절약하면 생활 가능, 월 30-50만원 저축 가능</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🚨</span>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">주의사항</h3>
                      <p className="text-sm text-slate-600">경조사비, 의료비 등 변동비 발생 시 저축 어려움</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* CTA */}
              <Card className="bg-slate-900 text-white text-center shadow-xl shadow-slate-200">
                <h3 className="text-2xl font-bold mb-4">
                  💰 내 월급 실수령액 계산해보기
                </h3>
                <p className="text-slate-300 mb-6">
                  2025년 최신 4대보험, 소득세 적용
                </p>
                <Link
                  href="/salary-calculator"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all hover:scale-105 shadow-lg"
                >
                  급여 계산기 사용하기
                </Link>
              </Card>

            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
