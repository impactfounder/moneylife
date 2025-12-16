import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '주택담보대출 갈아타기 체크리스트 | moneylife.kr',
  description: '주담대 갈아타기로 이자 절감하는 방법. 전환 시기, 비용, 절차까지 2025년 최신 정보로 정리했습니다.',
  keywords: '주담대, 주택담보대출, 대출갈아타기, 대환대출, 금리인하, 대출전환',
}

export default function MortgageRefinanceGuide() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-block bg-slate-100 text-slate-600 border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🏠 부동산
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            주택담보대출 갈아타기 체크리스트
          </h1>
          <p className="text-lg text-slate-600">
            금리 0.5%p 낮추면 20년간 수백만원 절감!
          </p>
        </section>

        {/* 핵심 요약 */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 갈아타기 핵심 요약</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-sm opacity-90 mb-1">금리 차이 기준</p>
              <p className="text-2xl font-bold">0.5%p</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-sm opacity-90 mb-1">평균 전환 비용</p>
              <p className="text-2xl font-bold">100~300만원</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-sm opacity-90 mb-1">전환 소요 기간</p>
              <p className="text-2xl font-bold">1~2주</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="font-semibold mb-2">✅ 갈아타기 대상</h3>
            <ul className="space-y-1 text-sm">
              <li>• 현재 금리가 연 4.0% 이상</li>
              <li>• 신용점수가 상승했거나 소득이 증가한 경우</li>
              <li>• 남은 대출 기간이 5년 이상</li>
            </ul>
          </div>
        </section>

        {/* Step 1: 현재 상황 점검 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📝 Step 1: 현재 상황 점검</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">1️⃣ 내 대출 정보 확인</h3>

              <div className="bg-slate-50 p-6 rounded-xl mb-4">
                <p className="font-semibold mb-4 text-slate-700">📋 체크해야 할 항목</p>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                    <span className="text-slate-700">현재 금리 (고정 or 변동)</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                    <span className="text-slate-700">대출 잔액 (원금 얼마 남았는지)</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                    <span className="text-slate-700">남은 대출 기간 (만기일)</span>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                    <span className="text-slate-700">중도상환수수료율 (보통 1~3년차 1.4%, 이후 면제)</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">2️⃣ 신용·소득 상황 확인</h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left font-semibold">항목</th>
                      <th className="border border-slate-200 px-4 py-3 text-left font-semibold">확인 방법</th>
                      <th className="border border-slate-200 px-4 py-3 text-left font-semibold">중요도</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">신용점수</td>
                      <td className="border border-slate-200 px-4 py-3">NICE, KCB 앱 (무료 조회)</td>
                      <td className="border border-slate-200 px-4 py-3 text-red-600">★★★★★</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">연소득</td>
                      <td className="border border-slate-200 px-4 py-3">근로소득 원천징수영수증</td>
                      <td className="border border-slate-200 px-4 py-3 text-teal-700">★★★★☆</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">DSR</td>
                      <td className="border border-slate-200 px-4 py-3">전체 대출 원리금/연소득</td>
                      <td className="border border-slate-200 px-4 py-3 text-red-600">★★★★★</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-slate-600 mt-4">
                💡 <strong>팁:</strong> 신용점수가 50점 이상 상승했거나 연소득이 20% 이상 증가했다면 금리 인하 가능성 높음!
              </p>
            </div>
          </div>
        </section>

        {/* Step 2: 절감 효과 계산 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">💰 Step 2: 절감 효과 계산</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">📊 실제 사례 비교</h3>

              <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white p-4 rounded-xl mb-4">
                <p className="font-semibold">🏠 조건: 대출 잔액 3억원, 남은 기간 20년 (원리금균등상환 기준)</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left font-semibold">구분</th>
                      <th className="border border-slate-200 px-4 py-3 text-right font-semibold">현재 (4.5%)</th>
                      <th className="border border-slate-200 px-4 py-3 text-right font-semibold">전환 후 (3.8%)</th>
                      <th className="border border-slate-200 px-4 py-3 text-right font-semibold">절감액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">월 상환액</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">190만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">177만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-green-700 font-bold">▼ 13만원/월</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">연간 이자</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">1,350만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">1,140만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-green-700 font-bold">▼ 210만원/년</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">20년 총 이자</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">1억 5,600만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">1억 2,400만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-green-700 font-bold text-base">▼ 3,200만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-r-xl">
              <h4 className="font-semibold text-yellow-900 mb-3">📉 전환 비용 고려</h4>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>중도상환수수료 (3억원 × 1.4%)</span>
                  <span className="font-semibold">420만원</span>
                </div>
                <div className="flex justify-between">
                  <span>법무사 비용 + 등록세</span>
                  <span className="font-semibold">80만원</span>
                </div>
                <div className="flex justify-between">
                  <span>기타 수수료</span>
                  <span className="font-semibold">50만원</span>
                </div>
                <div className="flex justify-between border-t-2 border-yellow-300 pt-2 font-bold text-base">
                  <span>총 전환 비용</span>
                  <span className="text-teal-700">550만원</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-4">
                → 연간 210만원 절감 × 20년 = 4,200만원 - 550만원 = <strong className="text-green-700">순이익 3,650만원</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Step 3: 은행별 금리 비교 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🏦 Step 3: 은행별 금리 비교</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">📌 2025년 주요 은행 금리 (예시)</h3>
              <p className="text-sm text-slate-600 mb-4">
                * 실제 금리는 신용점수, DSR, 우대조건에 따라 달라집니다.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left font-semibold">은행</th>
                      <th className="border border-slate-200 px-4 py-3 text-center font-semibold">기준금리</th>
                      <th className="border border-slate-200 px-4 py-3 text-center font-semibold">최대 우대</th>
                      <th className="border border-slate-200 px-4 py-3 text-center font-semibold">최저 금리</th>
                      <th className="border border-slate-200 px-4 py-3 text-left font-semibold">특징</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">KB국민</td>
                      <td className="border border-slate-200 px-4 py-3 text-center">4.2%</td>
                      <td className="border border-slate-200 px-4 py-3 text-center">-0.8%</td>
                      <td className="border border-slate-200 px-4 py-3 text-center text-green-700 font-bold">3.4%</td>
                      <td className="border border-slate-200 px-4 py-3">주거래 우대 많음</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">신한은행</td>
                      <td className="border border-slate-200 px-4 py-3 text-center">4.3%</td>
                      <td className="border border-slate-200 px-4 py-3 text-center">-0.9%</td>
                      <td className="border border-slate-200 px-4 py-3 text-center text-green-700 font-bold">3.4%</td>
                      <td className="border border-slate-200 px-4 py-3">신용우수자 금리 좋음</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">카카오뱅크</td>
                      <td className="border border-slate-200 px-4 py-3 text-center">3.9%</td>
                      <td className="border border-slate-200 px-4 py-3 text-center">-0.5%</td>
                      <td className="border border-slate-200 px-4 py-3 text-center text-green-700 font-bold">3.4%</td>
                      <td className="border border-slate-200 px-4 py-3">비대면, 심사 빠름</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">🎁 우대금리 조건 체크리스트</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">✅ 일반 우대 (-0.3~0.5%)</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• 급여 이체 (월 200만원 이상)</li>
                    <li>• 신용카드 실적 (월 30만원 이상)</li>
                    <li>• 자동이체 3건 이상</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-green-900 mb-3">✅ 특별 우대 (-0.2~0.4%)</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• 신용점수 900점 이상</li>
                    <li>• DSR 40% 이하</li>
                    <li>• 다자녀 가구 (2자녀 이상)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: 갈아타기 절차 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📋 Step 4: 갈아타기 절차</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">은행 금리 비교 및 상담 예약</h3>
                <p className="text-sm text-slate-600">3~5개 은행 비교 후 최저 금리 은행 선택 → 방문/비대면 상담 예약</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">서류 준비</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• 신분증 (주민등록증 or 운전면허증)</li>
                  <li>• 등기부등본 (인터넷 발급, 1,000원)</li>
                  <li>• 재직증명서 + 소득증명원</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">대출 심사 (2~3일)</h3>
                <p className="text-sm text-slate-600">신용점수, DSR, LTV 등 종합 심사 → 승인 여부 통보</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">기존 대출 중도상환</h3>
                <p className="text-sm text-slate-600">기존 은행에 중도상환 신청 → 중도상환수수료 납부</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-green-700">대출 실행 및 이자 절감 시작!</h3>
                <p className="text-sm text-slate-600">신규 은행 계좌로 대출금 입금 → 매월 낮은 이자로 상환 시작</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: 주의사항 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Step 5: 꼭 확인할 주의사항</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
              <h3 className="font-semibold text-red-900 mb-3">❌ 갈아타기 하지 말아야 할 경우</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• 중도상환수수료가 너무 높아서 손익분기점이 5년 이상</li>
                <li>• 남은 대출 기간이 3년 이하</li>
                <li>• 신용점수 하락으로 오히려 금리가 더 높아지는 경우</li>
                <li>• DSR 규제로 대출 승인 자체가 어려운 경우</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-r-xl">
              <h3 className="font-semibold text-yellow-900 mb-3">DSR 규제 주의</h3>
              <p className="text-slate-700 mb-3 text-sm">
                2025년 기준, 총부채원리금상환비율(DSR) 40% 초과 시 대출 제한
              </p>
              <div className="bg-white p-4 rounded text-sm">
                <p className="font-semibold mb-2">DSR 계산 공식</p>
                <code className="text-teal-700">
                  (모든 대출 연간 원리금 상환액 ÷ 연소득) × 100
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* 관련 계산기 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ 관련 계산기</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/mortgage-calculator" className="block bg-slate-50 p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-semibold text-lg mb-2">주택담보대출 계산기</h3>
              <p className="text-sm text-slate-600">
                금리별 월 상환액과 총 이자를 즉시 계산
              </p>
            </Link>

            <Link href="/loan-calculator" className="block bg-slate-50 p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="text-3xl mb-3">🏦</div>
              <h3 className="font-semibold text-lg mb-2">대출 계산기</h3>
              <p className="text-sm text-slate-600">
                다양한 대출 상품의 이자와 상환 계획 비교
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            지금 바로 주담대 절감 효과를 확인하세요
          </h2>
          <p className="text-lg mb-8 opacity-90">
            금리 0.5%만 낮춰도 20년간 수천만원 절약!
          </p>
          <Link
            href="/mortgage-calculator"
            className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-shadow"
          >
            🏠 주담대 계산하기
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
