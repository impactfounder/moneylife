import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '복리 투자 시뮬레이션 | moneylife.kr',
  description: '복리의 마법을 시뮬레이션으로 확인하세요. 월 얼마를, 몇 %로, 몇 년 투자하면 얼마가 될까? 2025년 최신 투자 전략까지.',
  keywords: '복리, 복리계산, 복리투자, 장기투자, 복리 시뮬레이션, 재테크',
}

export default function CompoundInterestGuide() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-10 text-center">
          <div className="inline-block bg-slate-100 text-slate-600 border border-slate-200 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            투자
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            복리 투자 시뮬레이션
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            &ldquo;복리는 세상에서 가장 강력한 힘이다&rdquo; - 아인슈타인
          </p>
        </section>

        {/* 복리란? */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">복리란?</h2>

          <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-xl p-4 mb-6">
            <p className="leading-relaxed mb-4">
              원금에 붙은 이자가 다시 원금이 되어 이자를 낳는 구조.
              <strong> &ldquo;이자가 이자를 낳는다&rdquo;</strong>는 개념으로, 장기 투자 시 기하급수적 증가 효과.
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-sm">
              <p className="font-semibold mb-2">단리 vs 복리 예시 (1,000만원 투자, 연 10%, 10년)</p>
              <div className="space-y-1">
                <p>• <strong>단리:</strong> 1,000만원 + (100만원 × 10년) = 2,000만원</p>
                <p>• <strong>복리:</strong> 1,000만원 × (1.1)^10 = <span className="font-bold">2,594만원</span></p>
                <p className="text-xs mt-2 opacity-90">→ 복리가 594만원 더 많음!</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-slate-900 mb-1">72의 법칙</p>
              <p className="text-sm text-slate-600">72 ÷ 수익률 = 원금이 2배 되는 기간</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-slate-900 mb-1">시간의 힘</p>
              <p className="text-sm text-slate-600">투자 기간이 길수록 복리 효과 기하급수적 증가</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-slate-900 mb-1">꾸준함</p>
              <p className="text-sm text-slate-600">월 30만원이라도 꾸준히 투자하는 것이 핵심</p>
            </div>
          </div>
        </section>

        {/* 72의 법칙 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">72의 법칙</h2>

          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <p className="font-semibold text-slate-900 mb-2">공식: 72 ÷ 연 수익률 = 2배 되는 기간 (년)</p>
            <p className="text-sm text-slate-600">
              예: 연 10% 수익률이면, 72 ÷ 10 = 7.2년 → 약 7년이면 원금 2배
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">연 수익률</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700">원금 2배 기간</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">3%</td>
                  <td className="px-4 py-3 text-right">24년</td>
                  <td className="px-4 py-3 text-slate-600">예금, 채권</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">5%</td>
                  <td className="px-4 py-3 text-right">14.4년</td>
                  <td className="px-4 py-3 text-slate-600">안정형 ETF</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium">7%</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">10.3년</td>
                  <td className="px-4 py-3 text-slate-600">미국 S&P500 장기 평균</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">10%</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">7.2년</td>
                  <td className="px-4 py-3 text-slate-600">우량 성장주</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">15%</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">4.8년</td>
                  <td className="px-4 py-3 text-slate-600">고위험 고수익 투자</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-slate-500 mt-4">
            예시: 1,000만원을 연 7% 수익률로 투자하면, 약 10년 후 2,000만원, 20년 후 4,000만원, 30년 후 8,000만원!
          </p>
        </section>

        {/* 실전 시뮬레이션 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">실전 시뮬레이션</h2>

          {/* 시나리오 1 */}
          <div className="mb-8">
            <h3 className="font-semibold text-slate-900 mb-4">시나리오 1: 월 30만원 투자 (20년)</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">수익률</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">총 납입액</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">20년 후 자산</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">수익 금액</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3">3% (예금)</td>
                    <td className="px-4 py-3 text-right">7,200만원</td>
                    <td className="px-4 py-3 text-right">9,836만원</td>
                    <td className="px-4 py-3 text-right text-slate-600">+2,636만원</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3">5% (안정형)</td>
                    <td className="px-4 py-3 text-right">7,200만원</td>
                    <td className="px-4 py-3 text-right">1억 2,330만원</td>
                    <td className="px-4 py-3 text-right text-slate-600">+5,130만원</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium">7% (S&P500)</td>
                    <td className="px-4 py-3 text-right">7,200만원</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">1억 5,661만원</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">+8,461만원</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">10% (성장주)</td>
                    <td className="px-4 py-3 text-right">7,200만원</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">2억 2,800만원</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">+1억 5,600만원</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              → 수익률 3%와 10% 차이만으로도 20년 후 <strong>1억 3천만원 차이</strong>!
            </p>
          </div>

          {/* 시나리오 2 */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">시나리오 2: 월 50만원 투자 (30년)</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">수익률</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">총 납입액</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">30년 후 자산</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-700">수익 배수</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3">3%</td>
                    <td className="px-4 py-3 text-right">1억 8,000만원</td>
                    <td className="px-4 py-3 text-right">2억 9,100만원</td>
                    <td className="px-4 py-3 text-right">1.6배</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3">5%</td>
                    <td className="px-4 py-3 text-right">1억 8,000만원</td>
                    <td className="px-4 py-3 text-right">4억 1,600만원</td>
                    <td className="px-4 py-3 text-right">2.3배</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium">7%</td>
                    <td className="px-4 py-3 text-right">1억 8,000만원</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">6억 1,100만원</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">3.4배</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">10%</td>
                    <td className="px-4 py-3 text-right">1억 8,000만원</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">11억 3,200만원</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900">6.3배</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              → 월 50만원 × 30년 × 연 10% = <strong>11억원 자산 형성 가능</strong>!
            </p>
          </div>
        </section>

        {/* 복리 극대화 전략 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">복리 극대화 전략</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-2">빠르게 시작하라</h3>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
                  <p>복리는 <strong>시간의 함수</strong>. 1년만 늦어도 수익이 크게 줄어듦.</p>
                  <div className="mt-2 bg-white p-3 rounded-lg">
                    <p>예시: 월 30만원, 연 7% 투자 시</p>
                    <p>• 25세 시작 (40년 투자): <strong>9.5억원</strong></p>
                    <p>• 35세 시작 (30년 투자): <strong>3.7억원</strong></p>
                    <p className="text-slate-500 mt-1">→ 10년 차이로 5.8억원 손실</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-2">꾸준히 투자하라</h3>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
                  <p><strong>적립식 투자</strong>로 변동성을 낮추고 평균 단가 유리.</p>
                  <ul className="mt-2 space-y-1">
                    <li>• 매월 같은 날, 같은 금액 자동이체</li>
                    <li>• 주가 하락 시에도 중단하지 말고 계속 매수</li>
                    <li>• &quot;타이밍 맞추기&quot;보다 &quot;시간 버티기&quot;가 중요</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-2">재투자하라</h3>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
                  <p>배당금, 이자는 인출하지 말고 <strong>100% 재투자</strong>해야 복리 효과 극대화.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 주의사항 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">주의사항</h2>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">마이너스 복리 주의</h3>
              <p className="text-sm text-slate-700">
                손실도 복리로 커집니다. 연 -10% 손실이면 5년 후 원금의 59%만 남음.
                손절 타이밍, 분산 투자로 큰 손실 방지 필수!
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">인플레이션 고려</h3>
              <p className="text-sm text-slate-700">
                명목 수익률 5%라도, 인플레 3%면 실질 수익률은 2%.
                최소 연 5% 이상 수익률 목표로 인플레 방어 필수.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">중도 인출 금지</h3>
              <p className="text-sm text-slate-700">
                복리는 시간의 함수이므로, 중도 인출 시 복리 효과 대폭 감소.
              </p>
            </div>
          </div>
        </section>

        {/* 관련 계산기 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">관련 계산기</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/compound-interest-calculator" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">복리 이자 계산기</h3>
              <p className="text-sm text-slate-600">월 얼마를, 몇 %로, 몇 년 투자하면 얼마가 될까?</p>
            </Link>

            <Link href="/salary-rank" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">연봉 순위 테스트</h3>
              <p className="text-sm text-slate-600">내 연봉으로 월 얼마 투자 가능한지 확인</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            지금 바로 복리 이자를 계산해보세요
          </h2>
          <p className="mb-6 opacity-90">
            월 30만원 × 20년 × 연 7% = 1억 5천만원!
          </p>
          <Link
            href="/compound-interest-calculator"
            className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
          >
            복리 이자 계산하기 →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
