import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ISA 계좌 완벽 가이드 | moneylife.kr',
  description: 'ISA 계좌의 모든 것. 가입 조건, 세제 혜택, 투자 전략까지 2025년 최신 정보로 정리했습니다.',
  keywords: 'ISA, 개인종합자산관리계좌, ISA 계좌, ISA 세제혜택, ISA 투자전략',
}

export default function ISAGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* 🎯 Hero Section */}
        <section className="mb-12">
          <div className="inline-block bg-secondary-light text-secondary-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💎 투자
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            ISA 계좌 완벽 가이드
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            ISA는 대한민국 최강의 절세 계좌입니다.<br />
            2025년 기준 최신 정보로 똑똑하게 활용하세요.
          </p>
        </section>

        {/* 📌 핵심 요약 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 ISA란?</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
            <p className="text-lg font-semibold mb-3">
              📖 Individual Savings Account (개인종합자산관리계좌)
            </p>
            <p className="text-gray-700 leading-relaxed">
              하나의 계좌에서 예금, 적금, 펀드, ETF, 주식 등 다양한 금융상품을 
              자유롭게 투자하면서 <strong className="text-primary">세금 혜택</strong>까지 
              받을 수 있는 만능 계좌입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-primary-light rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">200~400만원</div>
              <div className="text-sm text-gray-700">비과세 한도 (소득에 따라 차등)</div>
            </div>
            <div className="p-6 bg-secondary-light rounded-xl">
              <div className="text-3xl font-bold text-secondary mb-2">9.9%</div>
              <div className="text-sm text-gray-700">분리과세 세율 (한도 초과분)</div>
            </div>
            <div className="p-6 bg-warning-light rounded-xl">
              <div className="text-3xl font-bold text-warning mb-2">1억원</div>
              <div className="text-sm text-gray-700">연간 납입 한도</div>
            </div>
          </div>
        </section>

        {/* 📝 Step 1: 가입 조건 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📝 Step 1: 가입 조건 확인</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">✅ 기본 조건</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left">구분</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">조건</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">나이</td>
                      <td className="border border-gray-300 px-4 py-3">만 19세 이상 (직전 3개년 중 1회 이상 금융소득 있으면 만 15세 이상)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">소득</td>
                      <td className="border border-gray-300 px-4 py-3">근로소득자 or 사업소득자 (소득 증빙 필요)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">계좌 개수</td>
                      <td className="border border-gray-300 px-4 py-3">1인 1계좌만 가능</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">의무 가입 기간</td>
                      <td className="border border-gray-300 px-4 py-3">최소 3년 (세제 혜택 받으려면 필수)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">🎁 ISA 유형별 비교</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left">구분</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">일반형 ISA</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">서민형 ISA</th>
                      <th className="border border-gray-300 px-4 py-3 text-left">농어민 ISA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">대상</td>
                      <td className="border border-gray-300 px-4 py-3">소득 제한 없음</td>
                      <td className="border border-gray-300 px-4 py-3">총급여 5천만원 or 종합소득 3.8천만원 이하</td>
                      <td className="border border-gray-300 px-4 py-3">농어민</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-4 py-3 font-semibold">비과세 한도</td>
                      <td className="border border-gray-300 px-4 py-3">200만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-primary font-bold">400만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-primary font-bold">400만원</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">한도 초과분 세율</td>
                      <td className="border border-gray-300 px-4 py-3">9.9%</td>
                      <td className="border border-gray-300 px-4 py-3">9.9%</td>
                      <td className="border border-gray-300 px-4 py-3">9.9%</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-semibold">추천 대상</td>
                      <td className="border border-gray-300 px-4 py-3">고소득자</td>
                      <td className="border border-gray-300 px-4 py-3 text-green-700 font-semibold">대부분의 직장인</td>
                      <td className="border border-gray-300 px-4 py-3">농어민</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                💡 <strong>팁:</strong> 총급여 5,000만원 이하라면 무조건 서민형 ISA로 가입하세요! (비과세 한도 2배)
              </p>
            </div>
          </div>
        </section>

        {/* 💰 Step 2: 세제 혜택 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">💰 Step 2: 세제 혜택 이해하기</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">🎁 비과세 vs 분리과세</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">✅ 비과세 (한도 내)</h4>
                  <p className="text-gray-700 mb-3">
                    일반형 200만원 / 서민형 400만원까지 <strong>세금 0원</strong>
                  </p>
                  <div className="bg-white p-4 rounded text-sm">
                    <p className="text-gray-700">
                      예시: 서민형 ISA에서 수익 300만원 발생<br />
                      → 세금 <span className="text-green-600 font-bold">0원</span>
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">✅ 분리과세 (한도 초과분)</h4>
                  <p className="text-gray-700 mb-3">
                    한도 초과분은 9.9% 분리과세 (일반 금융소득 15.4% 대비 낮음)
                  </p>
                  <div className="bg-white p-4 rounded text-sm">
                    <p className="text-gray-700">
                      예시: 서민형 ISA에서 수익 500만원 발생<br />
                      → 400만원 비과세 + 100만원 × 9.9% = <span className="text-blue-600 font-bold">9.9만원</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <h4 className="font-semibold text-red-900 mb-3">❌ 일반 계좌와 비교</h4>
                <p className="text-gray-700 mb-3">
                  일반 주식/펀드 계좌: 배당소득세 15.4% + 금융소득 종합과세 위험
                </p>
                <div className="bg-white p-4 rounded text-sm">
                  <p className="text-gray-700">
                    동일하게 수익 500만원 발생 시<br />
                    → 500만원 × 15.4% = <span className="text-red-600 font-bold">77만원</span> 세금
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  💡 ISA 사용 시 약 <strong>67만원 절세</strong> (77만원 - 9.9만원)
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">📊 실전 절세 계산 예시</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left">연 수익</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">ISA (서민형)</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">일반 계좌</th>
                      <th className="border border-gray-300 px-4 py-3 text-right">절세 금액</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">100만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-green-600 font-bold">0원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">15.4만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-primary font-bold">15.4만원</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">300만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-green-600 font-bold">0원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">46.2만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-primary font-bold">46.2만원</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-4 py-3">500만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-green-600 font-bold">9.9만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">77만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-primary font-bold">67.1만원</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">1,000만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-green-600 font-bold">59.4만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">154만원</td>
                      <td className="border border-gray-300 px-4 py-3 text-right text-primary font-bold">94.6만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 📈 Step 3: 투자 전략 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📈 Step 3: ISA 투자 전략</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">💡 투자 가능 상품</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">✅ 가능 (추천)</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>국내 주식</strong> - 삼성전자, 카카오 등</li>
                    <li>• <strong>ETF</strong> - 미국 S&P500, 나스닥, 한국배당 등</li>
                    <li>• <strong>펀드</strong> - 인덱스펀드, 혼합형펀드</li>
                    <li>• <strong>채권</strong> - 국공채, 회사채</li>
                    <li>• <strong>RP (환매조건부채권)</strong></li>
                    <li>• <strong>예금/적금</strong> (증권사 ISA만 가능)</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-red-900 mb-3">❌ 불가능</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>해외 주식</strong> - 테슬라, 애플 등 직접 매수 불가</li>
                    <li>• <strong>파생상품</strong> - 옵션, 선물, ELS 등</li>
                    <li>• <strong>레버리지/인버스 ETF</strong></li>
                    <li>• <strong>가상화폐</strong></li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-3">
                    💡 해외 주식은 ETF로 간접 투자 가능 (예: TIGER 미국S&P500)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">🎯 추천 포트폴리오</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-green-900 mb-3">🛡️ 안정형 (위험 회피형)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>국내 배당주 ETF (예: ARIRANG 고배당)</span>
                      <span className="font-bold">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>채권형 ETF (예: KODEX 국고채3년)</span>
                      <span className="font-bold">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>예금/RP</span>
                      <span className="font-bold">20%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4">
                    📊 기대 수익률: 연 4~6% / 안정적 배당 수익
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">⚖️ 중립형 (균형 추구)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>미국 S&P500 ETF (예: TIGER 미국S&P500)</span>
                      <span className="font-bold">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>국내 대형주 ETF (예: KODEX 200)</span>
                      <span className="font-bold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>배당주 ETF</span>
                      <span className="font-bold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>채권/예금</span>
                      <span className="font-bold">10%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4">
                    📊 기대 수익률: 연 6~10% / 적절한 위험 분산
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-orange-900 mb-3">🚀 공격형 (고수익 추구)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>미국 나스닥 ETF (예: TIGER 미국나스닥100)</span>
                      <span className="font-bold">50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>국내 성장주 (삼성전자, 네이버 등)</span>
                      <span className="font-bold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>섹터별 ETF (예: 반도체, 2차전지)</span>
                      <span className="font-bold">20%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4">
                    📊 기대 수익률: 연 10%+ / 변동성 높음
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ⚠️ Step 4: 주의사항 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">⚠️ Step 4: 주의사항</h2>

          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-red-900 mb-3">❌ 3년 이내 해지 시</h3>
              <p className="text-gray-700 mb-3">
                → 모든 세제 혜택 소급 박탈 (비과세 무효, 15.4% 과세)
              </p>
              <div className="bg-white p-4 rounded text-sm">
                <p className="text-gray-700">
                  예시: 2년차에 수익 300만원 발생 후 해지<br />
                  → 300만원 × 15.4% = <span className="text-red-600 font-bold">46.2만원 세금 부과</span>
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-yellow-900 mb-3">⚠️ 연간 납입 한도</h3>
              <p className="text-gray-700">
                • 연간 최대 1억원까지 납입 가능<br />
                • 총 납입 한도 제한 없음 (계좌 유지 중 계속 납입 가능)
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-blue-900 mb-3">💡 중도 인출</h3>
              <p className="text-gray-700 mb-3">
                • 인출은 가능하지만, 인출 금액은 다시 납입 불가<br />
                • 예: 3,000만원 넣고 → 500만원 인출 → 남은 납입 가능액 7,000만원 (복구 안 됨)
              </p>
            </div>
          </div>
        </section>

        {/* 🛠️ Step 5: 증권사별 비교 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🏦 Step 5: 증권사 선택 가이드</h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left">증권사</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">장점</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">추천 대상</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">미래에셋증권</td>
                  <td className="border border-gray-300 px-4 py-3">ETF 종류 많음, UI 편리</td>
                  <td className="border border-gray-300 px-4 py-3">ETF 중심 투자자</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">삼성증권</td>
                  <td className="border border-gray-300 px-4 py-3">리서치 자료 풍부</td>
                  <td className="border border-gray-300 px-4 py-3">정보 활용형 투자자</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">NH투자증권</td>
                  <td className="border border-gray-300 px-4 py-3">예금 연계 가능</td>
                  <td className="border border-gray-300 px-4 py-3">안정형 투자자</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">키움증권</td>
                  <td className="border border-gray-300 px-4 py-3">거래 수수료 저렴</td>
                  <td className="border border-gray-300 px-4 py-3">비용 민감형</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-semibold">토스증권</td>
                  <td className="border border-gray-300 px-4 py-3">MZ세대 친화적 UI</td>
                  <td className="border border-gray-300 px-4 py-3">초보 투자자</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600">
            💡 <strong>선택 팁:</strong> 본인이 이미 사용 중인 증권사가 있다면, 같은 곳에서 개설하는 것이 관리하기 편합니다.
          </p>
        </section>

        {/* 📌 개설 절차 */}
        <section className="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📌 ISA 계좌 개설 절차</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">증권사 선택 및 앱 설치</h3>
                <p className="text-sm text-gray-600">미래에셋, 삼성, NH, 키움, 토스 등에서 선택</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">소득 증빙 서류 준비</h3>
                <p className="text-sm text-gray-600">근로소득 원천징수영수증 or 소득금액증명원 (국세청 홈택스 발급)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">ISA 계좌 신청</h3>
                <p className="text-sm text-gray-600">앱에서 'ISA 계좌 개설' 메뉴 → 서민형/일반형 선택</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">본인 인증 및 서류 업로드</h3>
                <p className="text-sm text-gray-600">휴대폰 인증 + 신분증 촬영 + 소득 서류 첨부</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">승인 대기 (1~3일)</h3>
                <p className="text-sm text-gray-600">증권사 심사 후 계좌 개설 완료 알림</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-green-700">입금 및 투자 시작!</h3>
                <p className="text-sm text-gray-600">최초 입금 후 ETF/주식 매수 시작</p>
              </div>
            </div>
          </div>
        </section>

        {/* 🛠️ 유용한 도구 */}
        <section className="bg-gradient-to-r from-primary-light to-secondary-light rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ ISA 투자에 도움되는 계산기</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/compound-interest-calculator" className="block bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-lg mb-2">복리 이자 계산기</h3>
              <p className="text-sm text-gray-600">
                ISA 장기 투자 시 복리 효과를 시뮬레이션
              </p>
            </Link>

            <Link href="/income-tax-calculator" className="block bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">💸</div>
              <h3 className="font-semibold text-lg mb-2">종합소득세 계산기</h3>
              <p className="text-sm text-gray-600">
                ISA 비과세 혜택과 일반 과세 비교
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-secondary to-primary text-white rounded-2xl p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ISA로 똑똑한 절세 투자 시작하세요
          </h2>
          <p className="text-lg mb-8 opacity-90">
            3년만 유지하면 최대 400만원 비과세 혜택!
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
