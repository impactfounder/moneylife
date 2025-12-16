import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CalculatorCTA } from '@/components/ui/CalculatorCTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '퇴직연금 운용 전략 | moneylife.kr',
  description: 'DC형, DB형, IRP 퇴직연금 똑똑하게 운용하는 방법. 2025년 최신 절세 전략과 투자 포트폴리오까지.',
  keywords: '퇴직연금, DC형, IRP, 퇴직연금 운용, 퇴직연금 절세, 퇴직연금 투자',
}

export default function PensionStrategy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* 🎯 Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-block bg-slate-100 text-slate-600 border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💼 은퇴준비
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            퇴직연금 운용 전략
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            퇴직연금은 노후 자산의 핵심입니다.<br />
            방치하지 말고, 제대로 운용해서 수익률을 극대화하세요.
          </p>
        </section>

        {/* 상단 계산기 CTA */}
        <section className="mb-8">
          <CalculatorCTA
            calculatorPath="/pension-calculator"
            calculatorName="국민연금 계산기"
            description="예상 연금 수령액 확인하기"
          />
        </section>

        {/* 📌 핵심 요약 */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 퇴직연금 핵심 요약</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 bg-white/20 backdrop-blur rounded-xl">
              <div className="text-3xl font-bold mb-2">900만원</div>
              <div className="text-sm">연간 세액공제 한도 (IRP 추가 납입)</div>
            </div>
            <div className="p-6 bg-white/20 backdrop-blur rounded-xl">
              <div className="text-3xl font-bold mb-2">16.5%</div>
              <div className="text-sm">세액공제율 (총급여 5,500만원 이하)</div>
            </div>
            <div className="p-6 bg-white/20 backdrop-blur rounded-xl">
              <div className="text-3xl font-bold mb-2">148.5만원</div>
              <div className="text-sm">최대 연간 절세 금액 (900만원 × 16.5%)</div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur border-l-4 border-white p-6 rounded-r-xl">
            <h3 className="font-semibold mb-3">✅ 퇴직연금 운용의 3가지 원칙</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>절대 방치하지 마세요</strong> - 예금만 넣어두면 인플레이션 대비 실질 수익률 마이너스</li>
              <li>• <strong>장기 투자하세요</strong> - 20~30년 투자 기간이므로 복리 효과 극대화 가능</li>
              <li>• <strong>세액공제 한도 채우세요</strong> - 연 900만원 한도까지 납입하면 최대 148.5만원 돌려받음</li>
            </ul>
          </div>
        </section>

        {/* 📝 Step 1: 유형별 이해 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📝 Step 1: 퇴직연금 유형 이해하기</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">📊 DB형 vs DC형 vs IRP 비교</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left">구분</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">DB형 (확정급여)</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">DC형 (확정기여)</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">IRP (개인형)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">납입 주체</td>
                      <td className="border border-slate-200 px-4 py-3">회사</td>
                      <td className="border border-slate-200 px-4 py-3">회사</td>
                      <td className="border border-slate-200 px-4 py-3">개인 + 회사</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">운용 주체</td>
                      <td className="border border-slate-200 px-4 py-3">회사</td>
                      <td className="border border-slate-200 px-4 py-3 text-primary font-semibold">본인</td>
                      <td className="border border-slate-200 px-4 py-3 text-primary font-semibold">본인</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">수익률 책임</td>
                      <td className="border border-slate-200 px-4 py-3">회사</td>
                      <td className="border border-slate-200 px-4 py-3">본인</td>
                      <td className="border border-slate-200 px-4 py-3">본인</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">퇴직 시 수령액</td>
                      <td className="border border-slate-200 px-4 py-3">고정 (근속연수 × 평균임금)</td>
                      <td className="border border-slate-200 px-4 py-3">변동 (운용 성과에 따라)</td>
                      <td className="border border-slate-200 px-4 py-3">변동 (운용 성과에 따라)</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">세액공제</td>
                      <td className="border border-slate-200 px-4 py-3">불가</td>
                      <td className="border border-slate-200 px-4 py-3">불가</td>
                      <td className="border border-slate-200 px-4 py-3 text-green-700 font-bold">가능 (최대 900만원)</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">추천 대상</td>
                      <td className="border border-slate-200 px-4 py-3">안정 추구, 투자 무관심</td>
                      <td className="border border-slate-200 px-4 py-3">직접 운용 희망</td>
                      <td className="border border-slate-200 px-4 py-3">절세 + 추가 납입</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-slate-600 mt-4">
                💡 <strong>추천:</strong> DC형 + IRP 병행 (회사 DC로 기본 운용 + 개인 IRP로 추가 납입 및 세액공제)
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">🎯 내 상황별 최적 전략</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-green-900 mb-3">✅ 직장인 (30~40대)</h4>
                  <p className="text-slate-700 text-sm mb-3">
                    → <strong>DC형 + IRP 병행 + 공격적 운용</strong>
                  </p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li>• 회사 DC: 국내외 주식 ETF 70% + 채권 30%</li>
                    <li>• 개인 IRP: 연 900만원 납입 → 세액공제 148.5만원</li>
                    <li>• 남은 투자 기간 20~30년이므로 고수익 추구 가능</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">✅ 직장인 (50대 이상)</h4>
                  <p className="text-slate-700 text-sm mb-3">
                    → <strong>DC형 + IRP + 안정적 운용</strong>
                  </p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li>• 회사 DC: 채권 50% + 배당 ETF 30% + 예금 20%</li>
                    <li>• 개인 IRP: 연 900만원 납입 (퇴직 전까지 최대한 채우기)</li>
                    <li>• 변동성 낮은 안정형 포트폴리오로 전환</li>
                  </ul>
                </div>

                <div className="border-l-4 border-teal-600 bg-slate-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-slate-900 mb-3">✅ 자영업자 / 프리랜서</h4>
                  <p className="text-slate-700 text-sm mb-3">
                    → <strong>IRP 단독 운용 + 최대 납입</strong>
                  </p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li>• 개인 IRP: 연 1,800만원 납입 (단, 세액공제는 900만원 한도)</li>
                    <li>• 운용: 미국 S&P500 ETF 60% + 국내 배당 ETF 40%</li>
                    <li>• 국민연금 부족분 보완용으로 활용</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 💰 Step 2: 세액공제 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">💰 Step 2: IRP 세액공제 극대화</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">🎁 세액공제 혜택</h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
                <p className="text-lg font-semibold mb-3 text-slate-800">
                  📖 IRP 추가 납입 시 연말정산에서 세금 돌려받기
                </p>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span>연간 납입 한도</span>
                    <span className="font-semibold">900만원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>세액공제율 (총급여 5,500만원 이하)</span>
                    <span className="font-semibold text-primary">16.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>세액공제율 (총급여 5,500만원 초과)</span>
                    <span className="font-semibold text-secondary">13.2%</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left">연간 납입액</th>
                      <th className="border border-slate-200 px-4 py-3 text-right">총급여 5,500만원 이하</th>
                      <th className="border border-slate-200 px-4 py-3 text-right">총급여 5,500만원 초과</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3">300만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-primary font-bold">49.5만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-secondary font-bold">39.6만원</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3">600만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-primary font-bold">99만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-secondary font-bold">79.2만원</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">900만원 (최대)</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-green-700 font-bold text-base">148.5만원</td>
                      <td className="border border-slate-200 px-4 py-3 text-right text-green-700 font-bold text-base">118.8만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                <h4 className="font-semibold text-yellow-900 mb-3">💡 실전 절세 팁</h4>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li>• 12월 31일까지 납입해야 해당 연도 세액공제 가능</li>
                  <li>• 한 번에 900만원 부담스럽다면, 월 75만원씩 자동이체 추천</li>
                  <li>• 퇴직금을 IRP로 받으면 세금 5.5% → 3.3%로 감면 (추가 혜택)</li>
                  <li>• 55세 이상 + 가입 5년 이상 충족 시 연금 수령 가능 (퇴직소득세 30% 감면)</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">📊 30년 장기 절세 시뮬레이션</h3>
              
              <div className="bg-blue-50 p-6 rounded-xl">
                <p className="font-semibold mb-4 text-blue-900">🔢 조건: 매년 900만원 납입, 총급여 5,500만원 이하</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">연간 세액공제 혜택</span>
                    <span className="font-bold text-primary">148.5만원</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">30년 누적 세액공제 (148.5만원 × 30년)</span>
                    <span className="font-bold text-primary">4,455만원</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">30년 총 납입액 (900만원 × 30년)</span>
                    <span className="font-bold">2억 7,000만원</span>
                  </div>
                  <div className="flex justify-between items-center border-t-2 border-blue-300 pt-3">
                    <span className="text-slate-800 font-semibold">실질 본인 부담액</span>
                    <span className="font-bold text-green-700 text-base">2억 2,545만원</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-4">
                  → 4,455만원을 세금 환급받아 재투자하면 복리 효과로 더 큰 자산 형성 가능!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 📈 Step 3: 투자 전략 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📈 Step 3: 퇴직연금 투자 전략</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">💡 투자 가능 상품</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-green-900 mb-3">✅ 추천 상품</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• <strong>국내 주식형 ETF</strong> - KODEX 200, TIGER 배당 등</li>
                    <li>• <strong>해외 주식형 ETF</strong> - TIGER 미국S&P500, 나스닥 등</li>
                    <li>• <strong>채권형 ETF</strong> - KODEX 국고채3년 등</li>
                    <li>• <strong>TDF (타겟데이트펀드)</strong> - 자동 리밸런싱</li>
                    <li>• <strong>원리금보장형</strong> - 예금, RP (안정형)</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-red-900 mb-3">❌ 비추천 상품</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li>• <strong>원리금보장형 위주</strong> - 인플레 대비 실질 수익률 마이너스</li>
                    <li>• <strong>보장성 보험</strong> - 높은 수수료, 낮은 수익률</li>
                    <li>• <strong>펀드 (액티브형)</strong> - 수수료 높고 ETF 대비 성과 낮음</li>
                    <li>• <strong>파생결합증권 (DLS/ELS)</strong> - 복잡하고 손실 위험</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">🎯 연령별 추천 포트폴리오</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-green-900 mb-3">🚀 20~30대: 공격형 (100% 주식)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>미국 S&P500 ETF (TIGER 미국S&P500)</span>
                      <span className="font-bold">50%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>국내 주식 ETF (KODEX 200)</span>
                      <span className="font-bold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>섹터별 ETF (나스닥, 2차전지 등)</span>
                      <span className="font-bold">20%</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-4">
                    📊 기대 수익률: 연 7~10% / 남은 기간 30~40년으로 변동성 감내 가능
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-blue-900 mb-3">⚖️ 40대: 중립형 (주식 70% + 채권 30%)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>미국 S&P500 ETF</span>
                      <span className="font-bold">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>국내 배당 ETF (TIGER 배당)</span>
                      <span className="font-bold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>채권형 ETF (KODEX 국고채3년)</span>
                      <span className="font-bold">30%</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-4">
                    📊 기대 수익률: 연 5~7% / 안정성과 수익성 균형
                  </p>
                </div>

                <div className="border-l-4 border-teal-600 bg-slate-50 p-6 rounded-r-xl">
                  <h4 className="font-semibold text-slate-900 mb-3">🛡️ 50대 이상: 안정형 (주식 40% + 채권 40% + 예금 20%)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>국내 배당 ETF</span>
                      <span className="font-bold">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>채권형 ETF</span>
                      <span className="font-bold">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>예금/RP (원리금보장)</span>
                      <span className="font-bold">20%</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-4">
                    📊 기대 수익률: 연 3~5% / 원금 보전 중심, 변동성 최소화
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">🤖 TDF (타겟데이트펀드) 활용</h3>
              
              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="font-semibold text-purple-900 mb-3">🎯 TDF란?</h4>
                <p className="text-slate-700 text-sm mb-4">
                  은퇴 시점에 맞춰 자동으로 주식 비중을 줄이고 채권 비중을 늘려주는 자동 리밸런싱 펀드
                </p>
                <div className="bg-white p-4 rounded text-sm">
                  <p className="font-semibold mb-2 text-slate-800">예시: 미래에셋 TDF 2050 (2050년 은퇴 예정자용)</p>
                  <ul className="space-y-1 text-slate-700">
                    <li>• 현재 (2025년): 주식 90% + 채권 10%</li>
                    <li>• 2040년: 주식 60% + 채권 40%</li>
                    <li>• 2050년 (은퇴): 주식 20% + 채권 80%</li>
                  </ul>
                </div>
                <p className="text-xs text-slate-600 mt-4">
                  💡 <strong>장점:</strong> 자동 리밸런싱으로 관리 부담 적음 / <strong>단점:</strong> 수수료 0.3~0.5% (ETF 대비 높음)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: 주의사항 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Step 4: 퇴직연금 운용 주의사항</h2>

          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-red-900 mb-3">❌ 절대 하지 말아야 할 실수</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• <strong>방치하기:</strong> 예금만 넣어두면 연 1~2% 수익률로 인플레 손실</li>
                <li>• <strong>단기 매매:</strong> 퇴직연금은 장기 투자가 목적, 단기 매매 시 수수료만 손실</li>
                <li>• <strong>고위험 상품:</strong> 파생상품, DLS/ELS 등 원금 손실 위험 큰 상품 비추천</li>
                <li>• <strong>55세 이전 해지:</strong> 기타소득세 16.5% + 지방세 1.65% = 18.15% 과세 (손해)</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-yellow-900 mb-3">수령 시 세금 주의</h3>
              <p className="text-slate-700 mb-3 text-sm">
                퇴직연금 수령 방법에 따라 세금이 크게 달라집니다.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-left">수령 방법</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">세율</th>
                      <th className="border border-slate-200 px-4 py-3 text-left">추천 대상</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="border border-slate-200 px-4 py-3 font-semibold">연금 수령 (55세 이상 + 5년 이상 가입)</td>
                      <td className="border border-slate-200 px-4 py-3 text-green-700 font-bold">퇴직소득세의 70% (30% 감면)</td>
                      <td className="border border-slate-200 px-4 py-3">대부분 추천</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3">일시금 수령</td>
                      <td className="border border-slate-200 px-4 py-3">퇴직소득세 100%</td>
                      <td className="border border-slate-200 px-4 py-3">급한 자금 필요 시</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="border border-slate-200 px-4 py-3">55세 이전 중도 해지</td>
                      <td className="border border-slate-200 px-4 py-3 text-red-700 font-bold">기타소득세 16.5% + 지방세 1.65%</td>
                      <td className="border border-slate-200 px-4 py-3">비추천</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
              <h3 className="font-semibold text-blue-900 mb-3">💡 리밸런싱 주기</h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>• <strong>20~40대:</strong> 연 1회 점검 (장기 투자 유지)</li>
                <li>• <strong>50대 이상:</strong> 6개월 1회 점검 (안정형으로 점진적 전환)</li>
                <li>• <strong>급등락 시:</strong> 주식 비중 ±10% 벗어나면 조정</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 🛠️ 유용한 도구 */}
        <section className="bg-gradient-to-r from-primary-light to-secondary-light rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ 퇴직연금 운용에 도움되는 계산기</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/pension-calculator" className="block bg-white p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-semibold text-lg mb-2">국민연금 계산기</h3>
              <p className="text-sm text-slate-600">
                국민연금 예상 수령액 계산
              </p>
            </Link>

            <Link href="/severance-calculator" className="block bg-white p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2">퇴직금 계산기</h3>
              <p className="text-sm text-slate-600">
                퇴직금 예상 금액 즉시 계산
              </p>
            </Link>

            <Link href="/compound-interest-calculator" className="block bg-white p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-lg mb-2">복리 이자 계산기</h3>
              <p className="text-sm text-slate-600">
                30년 장기 투자 시뮬레이션
              </p>
            </Link>
          </div>
        </section>

        {/* 📌 체크리스트 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📌 퇴직연금 운용 체크리스트</h2>
          
          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">내 퇴직연금 유형 확인 (DB형 / DC형 / IRP)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">현재 운용 현황 점검 (예금 비중이 80% 이상이면 위험)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">연령별 추천 포트폴리오 확인</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">IRP 추가 납입 (연 900만원 한도까지 세액공제 받기)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">연 1~2회 리밸런싱 실시</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">55세 이상 + 5년 이상 가입 조건 충족 여부 확인</span>
            </label>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            지금 바로 퇴직연금 수익률을 확인하세요
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            30년 장기 투자, 복리 효과로 자산 배로 불리기!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/compound-interest-calculator"
              className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-shadow"
            >
              📈 복리 이자 계산하기
            </Link>
            <Link
              href="/severance-calculator"
              className="inline-block bg-slate-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              💰 퇴직금 계산하기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
