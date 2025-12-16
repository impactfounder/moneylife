import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '절세 전략 2025 | moneylife.kr',
  description: '2025년 최신 세법 기준 절세 전략. 연말정산, 종합소득세, 양도소득세까지 합법적으로 세금 줄이는 모든 방법.',
  keywords: '절세, 절세전략, 연말정산, 종합소득세, 양도소득세, 세액공제, 소득공제',
}

export default function TaxSavingGuide() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* 🎯 Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-block bg-slate-100 text-slate-600 border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💸 세금
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            절세 전략 2025
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            "합법적 절세는 권리입니다"<br />
            2025년 최신 세법 기준으로 최대한 세금을 줄이는 모든 방법을 정리했습니다.
          </p>
        </section>

        {/* 📌 핵심 요약 */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 절세 핵심 요약</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 bg-white/20 backdrop-blur rounded-xl">
              <div className="text-3xl font-bold mb-2">최대 1,000만원</div>
              <div className="text-sm">연말정산 환급 가능 금액 (직장인)</div>
            </div>
            <div className="p-6 bg-white/20 backdrop-blur rounded-xl">
              <div className="text-3xl font-bold mb-2">148.5만원</div>
              <div className="text-sm">IRP 900만원 납입 시 세액공제 (16.5%)</div>
            </div>
            <div className="p-6 bg-white/20 backdrop-blur rounded-xl">
              <div className="text-3xl font-bold mb-2">30%</div>
              <div className="text-sm">연금 수령 시 퇴직소득세 감면율</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur border-l-4 border-white/50 p-6 rounded-r-xl">
            <h3 className="font-semibold mb-3">✅ 2025년 달라진 세법</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>근로소득 과세표준 조정</strong> - 세금 구간 8단계 유지</li>
              <li>• <strong>신용카드 소득공제 한도</strong> - 총급여 7천만원 이하 300만원, 초과 250만원</li>
              <li>• <strong>월세 세액공제</strong> - 총급여 7천만원 이하 15%, 초과 12%</li>
              <li>• <strong>IRP 세액공제</strong> - 연 900만원 한도 (16.5% or 13.2%)</li>
            </ul>
          </div>
        </section>

        {/* 📝 Step 1: 연말정산 절세 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📝 Step 1: 연말정산 절세 (직장인)</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">💰 소득공제 vs 세액공제</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">📉 소득공제</h4>
                  <p className="text-slate-700 text-sm mb-3">
                    <strong>과세표준을 줄임</strong> (세금 계산 기준 금액 감소)
                  </p>
                  <div className="bg-white p-4 rounded text-sm">
                    <p className="text-slate-700 mb-2">예시: 총급여 5,000만원, 소득공제 1,000만원</p>
                    <p className="text-slate-700">
                      • 과세표준: 5,000만원 - 1,000만원 = 4,000만원<br />
                      • 세금: 4,000만원 × 15% (세율) = 600만원<br />
                      • 절세액: <span className="text-primary font-bold">150만원</span> (1,000만원 × 15%)
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-3">💚 세액공제 (더 유리)</h4>
                  <p className="text-slate-700 text-sm mb-3">
                    <strong>세금을 직접 차감</strong> (계산된 세금에서 바로 빼줌)
                  </p>
                  <div className="bg-white p-4 rounded text-sm">
                    <p className="text-slate-700 mb-2">예시: 세금 600만원, 세액공제 150만원</p>
                    <p className="text-slate-700">
                      • 최종 세금: 600만원 - 150만원 = 450만원<br />
                      • 절세액: <span className="text-green-700 font-bold">150만원 (100% 차감)</span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                💡 <strong>핵심:</strong> 세액공제가 소득공제보다 유리! (100% 차감 vs 세율만큼만 차감)
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">📋 주요 소득공제 항목</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left">항목</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">공제율/한도</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">조건</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">신용카드</td>
                      <td className="border border-slate-200 px-4 py-3">15% (초과분 기준)</td>
                      <td className="border border-slate-200 px-4 py-3">총급여 25% 초과 사용분</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">체크카드</td>
                      <td className="border border-slate-200 px-4 py-3 text-primary font-bold">30%</td>
                      <td className="border border-slate-200 px-4 py-3">신용카드보다 2배 유리</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">전통시장/대중교통</td>
                      <td className="border border-slate-200 px-4 py-3 text-primary font-bold">40%</td>
                      <td className="border border-slate-200 px-4 py-3">우선 사용 권장</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">주택청약저축</td>
                      <td className="border border-slate-200 px-4 py-3">연 240만원 한도</td>
                      <td className="border border-slate-200 px-4 py-3">무주택 세대주, 총급여 7천만원 이하</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">소기업·소상공인공제</td>
                      <td className="border border-slate-200 px-4 py-3">연 500만원 한도</td>
                      <td className="border border-slate-200 px-4 py-3">개인사업자만 가능</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">🎁 주요 세액공제 항목</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left">항목</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">공제율</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">최대 공제액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">IRP 납입</td>
                      <td className="border border-slate-200 px-4 py-3 text-green-700 font-bold">16.5% or 13.2%</td>
                      <td className="border border-slate-200 px-4 py-3 text-green-700 font-bold">148.5만원 (900만원 납입 시)</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">월세</td>
                      <td className="border border-slate-200 px-4 py-3">15% or 12%</td>
                      <td className="border border-slate-200 px-4 py-3">120만원 (월세 750만원 이상)</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">의료비</td>
                      <td className="border border-slate-200 px-4 py-3">15%</td>
                      <td className="border border-slate-200 px-4 py-3">한도 없음 (총급여 3% 초과분)</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">교육비</td>
                      <td className="border border-slate-200 px-4 py-3">15%</td>
                      <td className="border border-slate-200 px-4 py-3">본인 무제한, 자녀 300만원/명</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">기부금</td>
                      <td className="border border-slate-200 px-4 py-3">15~30%</td>
                      <td className="border border-slate-200 px-4 py-3">총급여의 10~30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 💡 Step 2: 실전 절세 전략 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">💡 Step 2: 실전 절세 전략</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">🎯 전략 1: 신용카드 사용 최적화</h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-4">
                <p className="font-semibold text-slate-800 mb-3">✅ 최적 사용 전략</p>
                <ol className="space-y-2 text-sm text-slate-700">
                  <li><strong>1~9월:</strong> 신용카드 사용 (포인트, 할인 혜택)</li>
                  <li><strong>10~12월:</strong> 체크카드/전통시장/대중교통 집중 (공제율 높음)</li>
                  <li><strong>목표:</strong> 총급여의 25% 초과 사용 (초과분만 공제 대상)</li>
                </ol>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-xl">
                <p className="font-semibold mb-3 text-slate-800">📊 실전 예시 (총급여 5,000만원)</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>25% 기준 금액</span>
                    <span className="font-semibold">1,250만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>신용카드 사용 (1~9월)</span>
                    <span className="font-semibold">1,000만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>체크카드 사용 (10~12월)</span>
                    <span className="font-semibold">500만원</span>
                  </div>
                  <div className="flex justify-between border-t-2 border-slate-200 pt-2 font-bold">
                    <span>총 사용액</span>
                    <span>1,500만원</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>초과분 (공제 대상)</span>
                    <span className="font-bold">250만원</span>
                  </div>
                  <div className="flex justify-between text-green-700 border-t pt-2">
                    <span>소득공제 금액</span>
                    <span className="font-bold">75만원 (250만원 × 30%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">🎯 전략 2: IRP 최대 활용</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-green-900 mb-3">✅ IRP 절세 효과</h4>
                  <p className="text-slate-700 text-sm mb-3">
                    연 900만원 납입 시, 세액공제로 즉시 148.5만원 돌려받음 (총급여 5,500만원 이하)
                  </p>
                  <div className="bg-white p-4 rounded text-sm">
                    <p className="text-slate-700">
                      예시: 월 75만원 × 12개월 = 900만원 납입<br />
                      → 연말정산 시 <span className="text-green-700 font-bold">148.5만원 환급</span><br />
                      → 실질 본인 부담: 751.5만원 (약 17% 할인)
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">💡 꿀팁: 12월 한번에 납입</h4>
                  <p className="text-slate-700 text-sm">
                    IRP는 12월 31일까지만 납입하면 세액공제 가능.<br />
                    → 12월에 900만원 한번에 납입해도 OK! (부담스럽다면 월 분할도 가능)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">🎯 전략 3: 월세 세액공제</h3>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                <h4 className="font-semibold text-yellow-900 mb-3">🏠 월세 사는 무주택자 필수</h4>
                <p className="text-slate-700 text-sm mb-3">
                  월세의 15% (총급여 7천만원 이하) 또는 12% 세액공제
                </p>
                <div className="bg-white p-4 rounded text-sm">
                  <p className="text-slate-700">
                    예시: 월 60만원 × 12개월 = 720만원 월세<br />
                    → 세액공제: <span className="text-yellow-900 font-bold">108만원</span> (720만원 × 15%)<br />
                    → 연말정산 시 108만원 환급
                  </p>
                </div>
                <p className="text-xs text-slate-600 mt-3">
                  조건: 무주택 세대주, 총급여 7천만원 이하, 주택 기준시가 4억원 이하, 전용 85㎡ 이하
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">🎯 전략 4: 연금저축 + IRP 병행</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left">구분</th>
                      <th className="border border-slate-200 px-4 py-3 text-right">납입 한도</th>
                      <th className="border border-slate-200 px-4 py-3 text-right">세액공제 한도</th>
                      <th className="border border-slate-200 px-4 py-3 text-right">최대 공제액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3">연금저축</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">연 1,800만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">600만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-primary font-bold">99만원</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3">IRP</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">연 1,800만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">300만원 (추가)</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-primary font-bold">49.5만원</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">합계</td>
                      <td className="border border-slate-200 px-4 py-3 text-right font-semibold">-</td>
                      <td className="border border-slate-200 px-4 py-3 text-right font-semibold">900만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-green-700 font-bold text-base">148.5만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-slate-600 mt-4">
                💡 <strong>추천:</strong> 연금저축 600만원 + IRP 300만원 = 총 900만원 납입 (최대 절세)
              </p>
            </div>
          </div>
        </section>

        {/* 💸 Step 3: 종합소득세 절세 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">💸 Step 3: 종합소득세 절세 (프리랜서/사업자)</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">📋 주요 경비 처리 항목</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">✅ 공제 가능 경비</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• 사무실 임차료 (전용 공간)</li>
                    <li>• 통신비 (업무용 휴대폰)</li>
                    <li>• 접대비 (거래처 식사, 선물)</li>
                    <li>• 차량 유지비 (업무용 50%)</li>
                    <li>• 교육비 (업무 관련 강의)</li>
                    <li>• 서적비 (업무 관련 도서)</li>
                    <li>• 광고홍보비</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-red-900 mb-3">❌ 공제 불가 경비</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• 개인 생활비 (식비, 주거비)</li>
                    <li>• 가족 여행 경비</li>
                    <li>• 개인 학원비 (자녀 교육)</li>
                    <li>• 개인 의료비</li>
                    <li>• 사적 모임 식사</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-4">
                <strong>주의:</strong> 증빙 자료 (영수증, 계약서) 반드시 보관! 세무조사 대비
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">🧮 간편장부 vs 복식부기</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left">구분</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">간편장부</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">복식부기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">대상</td>
                      <td className="border border-slate-200 px-4 py-3">수입 7,500만원 미만</td>
                      <td className="border border-slate-200 px-4 py-3">수입 7,500만원 이상</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">기장 방법</td>
                      <td className="border border-slate-200 px-4 py-3">간단 (매입/매출만)</td>
                      <td className="border border-slate-200 px-4 py-3">복잡 (자산/부채 등)</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">세무사 비용</td>
                      <td className="border border-slate-200 px-4 py-3">월 5~10만원</td>
                      <td className="border border-slate-200 px-4 py-3">월 15~30만원</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">공제 혜택</td>
                      <td className="border border-slate-200 px-4 py-3">기장세액공제 최대 100만원</td>
                      <td className="border border-slate-200 px-4 py-3">기장세액공제 최대 200만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 🏠 Step 4: 양도소득세 절세 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🏠 Step 4: 양도소득세 절세 (부동산)</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">📋 비과세 조건</h3>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6">
                <h4 className="font-semibold text-green-900 mb-3">✅ 1주택자 비과세 조건 (세금 0원)</h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>• <strong>보유 기간:</strong> 2년 이상</li>
                  <li>• <strong>거주 요건:</strong> 없음 (2021년 이후 폐지)</li>
                  <li>• <strong>주택 가격:</strong> 실거래가 12억원 이하 (비과세 100%)</li>
                  <li>• <strong>12억 초과:</strong> 초과분에 대해서만 과세</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-3">📊 실전 예시</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-4 rounded">
                    <p className="font-semibold mb-2 text-slate-800">사례 1: 보유 2년 이상, 10억원 매도</p>
                    <p className="text-slate-700">
                      → 12억원 이하이므로 <span className="text-green-700 font-bold">양도소득세 0원</span>
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded">
                    <p className="font-semibold mb-2 text-slate-800">사례 2: 보유 2년 이상, 15억원 매도</p>
                    <p className="text-slate-700">
                      → 12억원까지 비과세, 3억원 초과분만 과세<br />
                      → 양도차익 5억원 가정 시 <span className="text-teal-700 font-bold">약 1억원 세금</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">💡 장기보유특별공제</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left">보유 기간</th>
                      <th className="border border-slate-200 px-4 py-3 text-right">공제율 (1주택자)</th>
                      <th className="border border-slate-200 px-4 py-3 text-right">공제율 (다주택자)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3">3년 이상</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">12%</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">6%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3">5년 이상</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">20%</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">10%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3">10년 이상</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-primary font-bold">40%</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">20%</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">15년 이상</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-green-700 font-bold">최대 80%</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">30%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-slate-600 mt-4">
                💡 <strong>핵심:</strong> 10년 이상 보유 시 양도차익의 40% 공제 → 세금 대폭 절감!
              </p>
            </div>
          </div>
        </section>

        {/* Step 5: 주의사항 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Step 5: 절세 시 주의사항</h2>

          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-red-900 mb-3">❌ 불법 탈세 vs 합법 절세</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• <strong>불법 탈세:</strong> 허위 영수증, 소득 누락, 가공 경비 → 가산세 + 형사처벌</li>
                <li>• <strong>합법 절세:</strong> 세법이 인정하는 공제 항목 최대 활용 → 권리</li>
                <li>• <strong>원칙:</strong> 증빙 자료 반드시 보관, 의심스러우면 세무사 상담</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-yellow-900 mb-3">세무조사 대비</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• 영수증, 계약서 최소 5년 보관</li>
                <li>• 경비 처리 시 업무 관련성 명확히 입증</li>
                <li>• 현금 거래 최소화 (카드/계좌이체 권장)</li>
                <li>• 고액 현금 거래 시 세무서 신고 의무</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-blue-900 mb-3">💡 세무사 상담 추천 케이스</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• 프리랜서/사업자로 처음 종합소득세 신고</li>
                <li>• 부동산 매도 시 양도소득세 절세 방법</li>
                <li>• 고소득자 (연 1억 이상) 절세 전략</li>
                <li>• 상속/증여 계획</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 🛠️ 유용한 도구 */}
        <section className="bg-gradient-to-r from-primary-light to-secondary-light rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ 절세에 도움되는 계산기</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/income-tax-calculator" className="block bg-white p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="text-3xl mb-3">💸</div>
              <h3 className="font-semibold text-lg mb-2">종합소득세 계산기</h3>
              <p className="text-sm text-slate-600">
                2025년 세율표로 세금 계산
              </p>
            </Link>

            <Link href="/capital-gains-tax-calculator" className="block bg-white p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-semibold text-lg mb-2">양도소득세 계산기</h3>
              <p className="text-sm text-slate-600">
                부동산 매도 시 세금 계산
              </p>
            </Link>

            <Link href="/salary-calculator" className="block bg-white p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2">급여 계산기</h3>
              <p className="text-sm text-slate-600">
                세전/세후 급여 즉시 계산
              </p>
            </Link>
          </div>
        </section>

        {/* 📌 체크리스트 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📌 연말 절세 체크리스트</h2>
          
          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">IRP 900만원 한도 채우기 (12월 31일까지)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">체크카드/전통시장 결제 집중 (10~12월)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">월세 세액공제 서류 준비 (임대차계약서, 이체 내역)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">의료비/교육비 영수증 정리</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">기부금 영수증 챙기기</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">주택청약저축 (무주택자)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">국세청 홈택스에서 예상 환급액 조회</span>
            </label>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            지금 바로 세금 계산해보세요
          </h2>
          <p className="text-lg mb-8 opacity-90">
            2025년 최신 세율표로 정확한 세금 확인!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/income-tax-calculator"
              className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-shadow"
            >
              💸 종합소득세 계산하기
            </Link>
            <Link
              href="/capital-gains-tax-calculator"
              className="inline-block bg-slate-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              🏠 양도소득세 계산하기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
