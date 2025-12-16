import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CalculatorCTA } from '@/components/ui/CalculatorCTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ISA 계좌 완벽 가이드 | moneylife.kr',
  description: 'ISA 계좌의 모든 것. 가입 조건, 세제 혜택, 투자 전략까지 2025년 최신 정보로 정리했습니다.',
  keywords: 'ISA, 개인종합자산관리계좌, ISA 계좌, ISA 세제혜택, ISA 투자전략',
}

export default function ISAGuide() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="inline-block bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-slate-200">
            투자
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            ISA 계좌 완벽 가이드
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            ISA는 대한민국 최강의 절세 계좌입니다. 2025년 기준 최신 정보로 똑똑하게 활용하세요.
          </p>
        </section>

        {/* 상단 계산기 CTA */}
        <section className="mb-8">
          <CalculatorCTA
            calculatorPath="/compound-interest-calculator"
            calculatorName="복리 계산기"
            description="ISA로 투자하면 얼마나 불어날까?"
          />
        </section>

        {/* ISA란? */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">ISA란?</h2>

          <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-6">
            <p className="font-semibold mb-2">Individual Savings Account (개인종합자산관리계좌)</p>
            <p className="leading-relaxed">
              하나의 계좌에서 예금, 적금, 펀드, ETF, 주식 등 다양한 금융상품을 자유롭게 투자하면서 <strong>세금 혜택</strong>까지 받을 수 있는 만능 계좌입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-2xl font-bold mb-1">200~400만원</p>
              <p className="text-sm">비과세 한도 (소득에 따라 차등)</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-2xl font-bold mb-1">9.9%</p>
              <p className="text-sm">분리과세 세율 (한도 초과분)</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-2xl font-bold mb-1">1억원</p>
              <p className="text-sm">연간 납입 한도</p>
            </div>
          </div>
        </section>

        {/* 가입 조건 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">가입 조건</h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">구분</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">조건</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">나이</td>
                  <td className="px-4 py-3 text-slate-700">만 19세 이상 (직전 3개년 중 1회 이상 금융소득 있으면 만 15세 이상)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">소득</td>
                  <td className="px-4 py-3 text-slate-700">근로소득자 or 사업소득자 (소득 증빙 필요)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">계좌 개수</td>
                  <td className="px-4 py-3 text-slate-700">1인 1계좌만 가능</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">의무 가입 기간</td>
                  <td className="px-4 py-3 text-slate-700">최소 3년 (세제 혜택 받으려면 필수)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-slate-900 mb-4">ISA 유형별 비교</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">구분</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">일반형 ISA</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">서민형 ISA</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">농어민 ISA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">대상</td>
                  <td className="px-4 py-3 text-slate-700">소득 제한 없음</td>
                  <td className="px-4 py-3 text-slate-700">총급여 5천만원 or 종합소득 3.8천만원 이하</td>
                  <td className="px-4 py-3 text-slate-700">농어민</td>
                </tr>
                <tr className="bg-teal-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900">비과세 한도</td>
                  <td className="px-4 py-3 text-slate-700">200만원</td>
                  <td className="px-4 py-3 font-bold text-teal-700">400만원</td>
                  <td className="px-4 py-3 font-bold text-teal-700">400만원</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">한도 초과분 세율</td>
                  <td className="px-4 py-3 text-slate-700">9.9%</td>
                  <td className="px-4 py-3 text-slate-700">9.9%</td>
                  <td className="px-4 py-3 text-slate-700">9.9%</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">추천 대상</td>
                  <td className="px-4 py-3 text-slate-700">고소득자</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">대부분의 직장인</td>
                  <td className="px-4 py-3 text-slate-700">농어민</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-slate-500 mt-4">
            총급여 5,000만원 이하라면 무조건 서민형 ISA로 가입하세요! (비과세 한도 2배)
          </p>
        </section>

        {/* 세제 혜택 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">세제 혜택</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">비과세 (한도 내)</h3>
              <p className="text-sm text-slate-700 mb-2">
                일반형 200만원 / 서민형 400만원까지 <strong>세금 0원</strong>
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p className="text-slate-700">
                  예시: 서민형 ISA에서 수익 300만원 발생 → 세금 <strong>0원</strong>
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">분리과세 (한도 초과분)</h3>
              <p className="text-sm text-slate-700 mb-2">
                한도 초과분은 9.9% 분리과세 (일반 금융소득 15.4% 대비 낮음)
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p className="text-slate-700">
                  예시: 서민형 ISA에서 수익 500만원 발생 → 400만원 비과세 + 100만원 × 9.9% = <strong>9.9만원</strong>
                </p>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-slate-900 mb-4">실전 절세 계산 예시</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">연 수익</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">ISA (서민형)</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">일반 계좌</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 border-b-2 border-slate-200">절세 금액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-700">100만원</td>
                  <td className="px-4 py-3 text-right font-bold text-teal-700">0원</td>
                  <td className="px-4 py-3 text-right text-slate-700">15.4만원</td>
                  <td className="px-4 py-3 text-right font-bold text-teal-700">15.4만원</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-700">300만원</td>
                  <td className="px-4 py-3 text-right font-bold text-teal-700">0원</td>
                  <td className="px-4 py-3 text-right text-slate-700">46.2만원</td>
                  <td className="px-4 py-3 text-right font-bold text-teal-700">46.2만원</td>
                </tr>
                <tr className="bg-teal-50/50">
                  <td className="px-4 py-3 text-slate-700">500만원</td>
                  <td className="px-4 py-3 text-right font-bold text-teal-700">9.9만원</td>
                  <td className="px-4 py-3 text-right text-slate-700">77만원</td>
                  <td className="px-4 py-3 text-right font-bold text-teal-700">67.1만원</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-700">1,000만원</td>
                  <td className="px-4 py-3 text-right font-bold text-teal-700">59.4만원</td>
                  <td className="px-4 py-3 text-right text-slate-700">154만원</td>
                  <td className="px-4 py-3 text-right font-bold text-teal-700">94.6만원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 투자 전략 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">ISA 투자 전략</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">투자 가능 상품</h3>
              <ul className="space-y-1 text-sm text-slate-700">
                <li>• 국내 주식 - 삼성전자, 카카오 등</li>
                <li>• ETF - 미국 S&P500, 나스닥, 한국배당 등</li>
                <li>• 펀드 - 인덱스펀드, 혼합형펀드</li>
                <li>• 채권 - 국공채, 회사채</li>
                <li>• RP (환매조건부채권)</li>
                <li>• 예금/적금 (증권사 ISA만)</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-3">투자 불가 상품</h3>
              <ul className="space-y-1 text-sm text-slate-700">
                <li>• 해외 주식 직접 매수 (ETF로 간접 투자)</li>
                <li>• 파생상품 - 옵션, 선물, ELS 등</li>
                <li>• 레버리지/인버스 ETF</li>
                <li>• 가상화폐</li>
              </ul>
            </div>
          </div>

          <h3 className="font-semibold text-slate-900 mb-4">추천 포트폴리오</h3>
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-3">안정형 (위험 회피형)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">국내 배당주 ETF</span>
                  <span className="font-bold text-slate-900">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">채권형 ETF</span>
                  <span className="font-bold text-slate-900">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">예금/RP</span>
                  <span className="font-bold text-slate-900">20%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">기대 수익률: 연 4~6%</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-3">중립형 (균형 추구)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">미국 S&P500 ETF</span>
                  <span className="font-bold text-slate-900">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">국내 대형주 ETF</span>
                  <span className="font-bold text-slate-900">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">배당주 ETF</span>
                  <span className="font-bold text-slate-900">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">채권/예금</span>
                  <span className="font-bold text-slate-900">10%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">기대 수익률: 연 6~10%</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-3">공격형 (고수익 추구)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">미국 나스닥 ETF</span>
                  <span className="font-bold text-slate-900">50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">국내 성장주</span>
                  <span className="font-bold text-slate-900">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">섹터별 ETF (반도체, 2차전지)</span>
                  <span className="font-bold text-slate-900">20%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">기대 수익률: 연 10%+ / 변동성 높음</p>
            </div>
          </div>
        </section>

        {/* 주의사항 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">주의사항</h2>

          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">3년 이내 해지 시</h3>
              <p className="text-sm text-slate-700">
                모든 세제 혜택 소급 박탈 (비과세 무효, 15.4% 과세)
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">연간 납입 한도</h3>
              <p className="text-sm text-slate-700">
                연간 최대 1억원까지 납입 가능. 총 납입 한도 제한 없음.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-900 mb-2">중도 인출</h3>
              <p className="text-sm text-slate-700">
                인출은 가능하지만, 인출 금액은 다시 납입 불가. 예: 3,000만원 넣고 → 500만원 인출 → 남은 납입 가능액 7,000만원 (복구 안 됨)
              </p>
            </div>
          </div>
        </section>

        {/* 증권사 선택 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">증권사 선택 가이드</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-center font-semibold text-slate-700">증권사</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700">장점</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700">추천 대상</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">미래에셋증권</td>
                  <td className="px-4 py-3 text-slate-700">ETF 종류 많음, UI 편리</td>
                  <td className="px-4 py-3 text-slate-700">ETF 중심 투자자</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">삼성증권</td>
                  <td className="px-4 py-3 text-slate-700">리서치 자료 풍부</td>
                  <td className="px-4 py-3 text-slate-700">정보 활용형 투자자</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">NH투자증권</td>
                  <td className="px-4 py-3 text-slate-700">예금 연계 가능</td>
                  <td className="px-4 py-3 text-slate-700">안정형 투자자</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">키움증권</td>
                  <td className="px-4 py-3 text-slate-700">거래 수수료 저렴</td>
                  <td className="px-4 py-3 text-slate-700">비용 민감형</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">토스증권</td>
                  <td className="px-4 py-3 text-slate-700">MZ세대 친화적 UI</td>
                  <td className="px-4 py-3 text-slate-700">초보 투자자</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 개설 절차 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">ISA 계좌 개설 절차</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-1">증권사 선택 및 앱 설치</h3>
                <p className="text-sm text-slate-600">미래에셋, 삼성, NH, 키움, 토스 등에서 선택</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-1">소득 증빙 서류 준비</h3>
                <p className="text-sm text-slate-600">근로소득 원천징수영수증 or 소득금액증명원 (국세청 홈택스 발급)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-1">ISA 계좌 신청</h3>
                <p className="text-sm text-slate-600">앱에서 &apos;ISA 계좌 개설&apos; 메뉴 → 서민형/일반형 선택</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-1">본인 인증 및 서류 업로드</h3>
                <p className="text-sm text-slate-600">휴대폰 인증 + 신분증 촬영 + 소득 서류 첨부</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-slate-900 mb-1">승인 대기 (1~3일)</h3>
                <p className="text-sm text-slate-600">증권사 심사 후 계좌 개설 완료 알림</p>
              </div>
            </div>
          </div>
        </section>

        {/* 관련 계산기 */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">관련 계산기</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/compound-interest-calculator" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">복리 이자 계산기</h3>
              <p className="text-sm text-slate-600">ISA 장기 투자 시 복리 효과를 시뮬레이션</p>
            </Link>

            <Link href="/income-tax-calculator" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <h3 className="font-semibold text-slate-900 mb-1">종합소득세 계산기</h3>
              <p className="text-sm text-slate-600">ISA 비과세 혜택과 일반 과세 비교</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            직접 계산해보세요
          </h2>
          <p className="text-slate-400 mb-6">
            3년만 유지하면 최대 400만원 비과세 혜택!
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
