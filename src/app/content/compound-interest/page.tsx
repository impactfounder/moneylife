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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* 🎯 Hero Section */}
        <section className="mb-12">
          <div className="inline-block bg-secondary-light text-secondary-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            📈 투자
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            복리 투자 시뮬레이션
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            "복리는 세상에서 가장 강력한 힘이다" - 아인슈타인<br />
            작은 돈도 꾸준히 투자하면 복리의 마법으로 큰 자산이 됩니다.
          </p>
        </section>

        {/* 📌 핵심 요약 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 복리란?</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
            <p className="text-lg font-semibold mb-3 text-gray-800">
              📖 복리 (複利, Compound Interest)
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              원금에 붙은 이자가 다시 원금이 되어 이자를 낳는 구조.<br />
              <strong className="text-primary">"이자가 이자를 낳는다"</strong>는 개념으로, 장기 투자 시 기하급수적 증가 효과.
            </p>
            <div className="bg-white p-4 rounded text-sm">
              <p className="font-semibold mb-2">📊 단리 vs 복리 예시 (1,000만원 투자, 연 10%, 10년)</p>
              <div className="space-y-1">
                <p>• <strong>단리:</strong> 1,000만원 + (100만원 × 10년) = 2,000만원</p>
                <p>• <strong>복리:</strong> 1,000만원 × (1.1)<sup>10</sup> = <span className="text-primary font-bold">2,594만원</span></p>
                <p className="text-xs text-gray-600 mt-2">→ 복리가 594만원 더 많음!</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-primary-light rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">72의 법칙</div>
              <div className="text-sm text-gray-700">72 ÷ 수익률 = 원금이 2배 되는 기간</div>
            </div>
            <div className="p-6 bg-secondary-light rounded-xl">
              <div className="text-3xl font-bold text-secondary mb-2">시간의 힘</div>
              <div className="text-sm text-gray-700">투자 기간이 길수록 복리 효과 기하급수적 증가</div>
            </div>
            <div className="p-6 bg-warning-light rounded-xl">
              <div className="text-3xl font-bold text-warning mb-2">꾸준함</div>
              <div className="text-sm text-gray-700">월 30만원이라도 꾸준히 투자하는 것이 핵심</div>
            </div>
          </div>
        </section>

        {/* 📝 Step 1: 72의 법칙 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📝 Step 1: 72의 법칙</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">🧮 원금이 2배 되는 시간</h3>
              
              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <p className="font-semibold text-blue-900 mb-3">공식: 72 ÷ 연 수익률 = 2배 되는 기간 (년)</p>
                <p className="text-sm text-gray-700">
                  예: 연 10% 수익률이면, 72 ÷ 10 = 7.2년 → 약 7년이면 원금 2배
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left">연 수익률</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">원금 2배 기간</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">예시</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">3%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">24년</td>
                      <td className="border border-gray-300 px-4 py-3">예금, 채권</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">5%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">14.4년</td>
                      <td className="border border-gray-300 px-4 py-3">안정형 ETF</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">7%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-primary font-bold">10.3년</td>
                      <td className="border border-gray-300 px-4 py-3">미국 S&P500 장기 평균</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">10%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-primary font-bold">7.2년</td>
                      <td className="border border-gray-300 px-4 py-3">우량 성장주</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">15%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-primary font-bold">4.8년</td>
                      <td className="border border-gray-300 px-4 py-3">고위험 고수익 투자</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                💡 <strong>예시:</strong> 1,000만원을 연 7% 수익률로 투자하면, 약 10년 후 2,000만원, 20년 후 4,000만원, 30년 후 8,000만원!
              </p>
            </div>
          </div>
        </section>

        {/* 💰 Step 2: 실전 시뮬레이션 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">💰 Step 2: 실전 시뮬레이션</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">📊 시나리오 1: 월 30만원 투자 (20년)</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left">수익률</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">총 납입액</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">20년 후 자산</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">수익 금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">3% (예금)</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">7,200만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">9,836만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-secondary">+2,636만원</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">5% (안정형)</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">7,200만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">1억 2,330만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-primary">+5,130만원</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">7% (S&P500)</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">7,200만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-green-700 font-bold">1억 5,661만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-green-700 font-bold">+8,461만원</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">10% (성장주)</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">7,200만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-blue-700 font-bold text-base">2억 2,800만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-blue-700 font-bold text-base">+1억 5,600만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                → 수익률 3%와 10% 차이만으로도 20년 후 <strong className="text-primary">1억 3천만원 차이</strong>!
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">📊 시나리오 2: 월 50만원 투자 (30년)</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left">수익률</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">총 납입액</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">30년 후 자산</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">수익 배수</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">3%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">1억 8,000만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">2억 9,100만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">1.6배</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">5%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">1억 8,000만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">4억 1,600만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-primary">2.3배</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">7%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">1억 8,000만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-green-700 font-bold">6억 1,100만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-green-700 font-bold">3.4배</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">10%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">1억 8,000만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-blue-700 font-bold text-base">11억 3,200만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-blue-700 font-bold text-base">6.3배</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                → 월 50만원 × 30년 × 연 10% = <strong className="text-primary">11억원 자산 형성 가능</strong>!
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">📊 시나리오 3: 일시불 1억원 투자 (20년)</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left">수익률</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">20년 후 자산</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">수익 금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">3%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">1억 8,061만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">+8,061만원</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">5%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">2억 6,533만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-primary">+1억 6,533만원</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">7%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-green-700 font-bold">3억 8,697만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-green-700 font-bold">+2억 8,697만원</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">10%</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-blue-700 font-bold text-base">6억 7,275만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-blue-700 font-bold text-base">+5억 7,275만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 📈 Step 3: 투자 전략 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📈 Step 3: 복리 극대화 투자 전략</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">💡 복리 투자 3대 원칙</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary bg-blue-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">1️⃣ 빠르게 시작하라</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    복리는 <strong>시간의 함수</strong>. 1년만 늦어도 수익이 크게 줄어듦.
                  </p>
                  <div className="bg-white p-4 rounded text-sm">
                    <p className="text-gray-700">
                      예시: 월 30만원, 연 7% 투자 시<br />
                      • 25세 시작 (40년 투자): <span className="text-primary font-bold">9.5억원</span><br />
                      • 35세 시작 (30년 투자): <span className="text-secondary font-bold">3.7억원</span><br />
                      → 10년 차이로 <strong className="text-red-600">5.8억원 손실</strong>
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-green-900 mb-3">2️⃣ 꾸준히 투자하라</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    <strong>적립식 투자</strong>로 변동성을 낮추고 평균 단가 유리.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 매월 같은 날, 같은 금액 자동이체</li>
                    <li>• 주가 하락 시에도 중단하지 말고 계속 매수</li>
                    <li>• "타이밍 맞추기"보다 "시간 버티기"가 중요</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-orange-900 mb-3">3️⃣ 재투자하라</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    배당금, 이자는 인출하지 말고 <strong>100% 재투자</strong>해야 복리 효과 극대화.
                  </p>
                  <div className="bg-white p-4 rounded text-sm">
                    <p className="text-gray-700">
                      예시: 1억원 투자, 연 배당 5% (500만원)<br />
                      • 재투자 O: 20년 후 <span className="text-primary font-bold">2억 6,533만원</span><br />
                      • 재투자 X: 20년 후 <span className="text-secondary">2억원</span> (배당 누적 1억)<br />
                      → 재투자 시 <strong className="text-green-600">6,533만원 추가 수익</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">🎯 수익률별 추천 투자처</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left">목표 수익률</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">추천 상품</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">위험도</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">3~4%</td>
                      <td className="border border-gray-300 px-4 py-3">예금, 채권, 원리금보장형</td>
                      <td className="border border-gray-300 px-4 py-3 text-green-600">낮음 ★☆☆☆☆</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">5~6%</td>
                      <td className="border border-gray-300 px-4 py-3">배당 ETF, 채권 혼합형 펀드</td>
                      <td className="border border-gray-300 px-4 py-3 text-yellow-600">중간 ★★★☆☆</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">7~10%</td>
                      <td className="border border-gray-300 px-4 py-3">미국 S&P500, 나스닥 ETF, 국내 주식 ETF</td>
                      <td className="border border-gray-300 px-4 py-3 text-orange-600">중상 ★★★★☆</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">10%+</td>
                      <td className="border border-gray-300 px-4 py-3">개별 성장주, 섹터 ETF (반도체, 2차전지)</td>
                      <td className="border border-gray-300 px-4 py-3 text-red-600">높음 ★★★★★</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                💡 <strong>추천:</strong> 30~40대는 7~10% 목표 (S&P500 ETF 중심), 50대 이상은 5~7% 목표 (안정형 비중 확대)
              </p>
            </div>
          </div>
        </section>

        {/* ⚠️ Step 4: 주의사항 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">⚠️ Step 4: 복리 투자 함정 주의</h2>

          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-red-900 mb-3">❌ 복리의 역습: 마이너스 복리</h3>
              <p className="text-gray-700 mb-3 text-sm">
                손실도 복리로 커집니다. 연 -10% 손실이면 5년 후 원금의 59%만 남음.
              </p>
              <div className="bg-white p-4 rounded text-sm">
                <p className="text-gray-700">
                  예시: 1,000만원 투자 → 연 -10% 손실<br />
                  • 1년 후: 900만원<br />
                  • 5년 후: <span className="text-red-600 font-bold">590만원 (-41%)</span><br />
                  • 10년 후: <span className="text-red-600 font-bold">349만원 (-65%)</span>
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                → 손절 타이밍, 분산 투자로 큰 손실 방지 필수!
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-yellow-900 mb-3">⚠️ 인플레이션 고려</h3>
              <p className="text-gray-700 text-sm">
                명목 수익률 5%라도, 인플레 3%면 실질 수익률은 2%.<br />
                최소 연 5% 이상 수익률 목표로 인플레 방어 필수.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-blue-900 mb-3">💡 중도 인출 금지</h3>
              <p className="text-gray-700 text-sm mb-3">
                복리는 시간의 함수이므로, 중도 인출 시 복리 효과 대폭 감소.
              </p>
              <div className="bg-white p-4 rounded text-sm">
                <p className="text-gray-700">
                  예시: 월 30만원 × 20년 × 연 7%<br />
                  • 중도 인출 없음: <span className="text-primary font-bold">1억 5,661만원</span><br />
                  • 10년차에 3,000만원 인출: <span className="text-secondary">1억 2,100만원</span><br />
                  → 중도 인출로 <strong className="text-red-600">3,561만원 손실</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 🛠️ 유용한 도구 */}
        <section className="bg-gradient-to-r from-primary-light to-secondary-light rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ 복리 투자에 도움되는 계산기</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/compound-interest-calculator" className="block bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-lg mb-2">복리 이자 계산기</h3>
              <p className="text-sm text-gray-600">
                월 얼마를, 몇 %로, 몇 년 투자하면 얼마가 될까?
              </p>
            </Link>

            <Link href="/salary-rank" className="block bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-semibold text-lg mb-2">연봉 순위 테스트</h3>
              <p className="text-sm text-gray-600">
                내 연봉으로 월 얼마 투자 가능한지 확인
              </p>
            </Link>
          </div>
        </section>

        {/* 📌 체크리스트 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📌 복리 투자 시작 체크리스트</h2>
          
          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-gray-700">목표 수익률 설정 (연 5~10% 권장)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-gray-700">월 투자 가능 금액 확정 (급여의 20~30%)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-gray-700">투자 기간 설정 (최소 10년 이상)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-gray-700">투자 상품 선택 (S&P500 ETF 추천)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-gray-700">자동이체 설정 (매월 같은 날)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-gray-700">배당금 재투자 설정</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-gray-700">연 1~2회 리밸런싱 계획</span>
            </label>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-secondary to-primary text-white rounded-2xl p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            지금 바로 복리 이자를 계산해보세요
          </h2>
          <p className="text-lg mb-8 opacity-90">
            월 30만원 × 20년 × 연 7% = 1억 5천만원!
          </p>
          <Link
            href="/compound-interest-calculator"
            className="inline-block bg-white text-secondary px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow"
          >
            📈 복리 이자 계산하기
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
