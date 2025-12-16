import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CalculatorCTA } from '@/components/ui/CalculatorCTA'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '연봉 협상 전략 가이드 | moneylife.kr',
  description: '연봉 협상 시 알아야 할 모든 것. 타이밍, 준비 자료, 실전 화법까지 단계별 전략을 소개합니다.',
  keywords: '연봉협상, 연봉인상, 연봉 협상 전략, 연봉 협상 화법, 이직 연봉협상',
}

export default function SalaryNegotiationGuide() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* 🎯 Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-block bg-slate-100 text-slate-600 border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💰 급여
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            연봉 협상 전략 가이드
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            연봉 협상은 커리어에서 가장 중요한 순간입니다.<br />
            체계적인 준비와 전략으로 원하는 연봉을 받아내세요.
          </p>
        </section>

        {/* 상단 계산기 CTA */}
        <section className="mb-8">
          <CalculatorCTA
            calculatorPath="/salary-calculator"
            calculatorName="급여 실수령액 계산기"
            description="협상 전 내 실수령액 확인하기"
          />
        </section>

        {/* 📌 핵심 요약 */}
        <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 핵심 요약</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/20 backdrop-blur rounded-xl">
              <div className="text-3xl font-bold mb-2">20-30%</div>
              <div className="text-sm">이직 시 평균 연봉 인상률</div>
            </div>
            <div className="p-6 bg-white/20 backdrop-blur rounded-xl">
              <div className="text-3xl font-bold mb-2">10-15%</div>
              <div className="text-sm">내부 승진 시 평균 인상률</div>
            </div>
            <div className="p-6 bg-white/20 backdrop-blur rounded-xl">
              <div className="text-3xl font-bold mb-2">3-6개월</div>
              <div className="text-sm">연봉 협상 준비 권장 기간</div>
            </div>
          </div>
        </section>

        {/* 📝 Step 1: 협상 준비 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📝 Step 1: 협상 준비</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">1️⃣ 시장 조사</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="text-primary mr-3">▸</span>
                  <div>
                    <strong>동종 업계 연봉 정보 수집</strong><br />
                    사람인, 잡코리아, 블라인드 등에서 유사 직무/경력의 연봉 범위 조사
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">▸</span>
                  <div>
                    <strong>현재 나의 연봉 순위 확인</strong><br />
                    <Link href="/salary-rank" className="text-primary underline">
                      연봉 순위 테스트로 대한민국/세계 상위 몇 %인지 확인
                    </Link>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3">▸</span>
                  <div>
                    <strong>희망 연봉 계산</strong><br />
                    <Link href="/salary-calculator" className="text-primary underline">
                      급여 계산기로 세전/세후 금액 미리 계산
                    </Link>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">2️⃣ 성과 자료 정리</h3>
              <div className="bg-slate-50 p-6 rounded-xl">
                <p className="font-semibold mb-4">✅ 준비해야 할 자료</p>
                <ul className="space-y-2 text-slate-700">
                  <li>• 프로젝트 성과 및 매출 기여 실적 (숫자 중심)</li>
                  <li>• 업무 효율 개선 사례 (시간/비용 절감)</li>
                  <li>• 자격증, 교육 이수 내역</li>
                  <li>• 동료/상사의 평가 또는 추천서</li>
                  <li>• 타사 오퍼레터 (있을 경우)</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">3️⃣ 협상 범위 설정</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-200 px-4 py-3 text-center">구분</th>
                      <th className="border border-slate-200 px-4 py-3 text-center">금액</th>
                      <th className="border border-slate-200 px-4 py-3 text-center">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">🎯 목표 연봉</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">6,000만원</td>
                      <td className="border border-slate-200 px-4 py-3">최상의 협상 결과</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">✅ 수용 연봉</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">5,500만원</td>
                      <td className="border border-slate-200 px-4 py-3">협상 가능한 최소선</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-4 py-3 font-semibold">❌ 거절 연봉</td>
                      <td className="border border-slate-200 px-4 py-3 text-right">5,000만원 이하</td>
                      <td className="border border-slate-200 px-4 py-3">이하면 이직 고려</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 💬 Step 2: 실전 화법 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">💬 Step 2: 실전 화법</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-secondary">✅ 해야 할 말</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="font-semibold text-green-900 mb-2">📈 성과 중심</p>
                  <p className="text-slate-700">
                    "지난 1년간 A 프로젝트로 매출 2억원 달성했고, B 업무 프로세스 개선으로 팀 업무 시간 30% 단축했습니다."
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="font-semibold text-blue-900 mb-2">🎯 시장 근거</p>
                  <p className="text-slate-700">
                    "동종 업계 유사 경력 연봉이 5,500~6,000만원대이고, 제 성과를 고려하면 6,000만원이 적절하다고 판단됩니다."
                  </p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <p className="font-semibold text-purple-900 mb-2">🤝 협력 의지</p>
                  <p className="text-slate-700">
                    "회사와 함께 성장하고 싶고, 더 큰 기여를 하고 싶습니다. 적절한 보상이 동반된다면 장기 근속하겠습니다."
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-danger">❌ 하지 말아야 할 말</h3>
              <div className="space-y-3">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-900">
                    ❌ "생활비가 부족해서요" → 개인 사정은 협상 근거 X
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-900">
                    ❌ "아무개가 저보다 받더라고요" → 동료 비교는 금물
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-900">
                    ❌ "안 주시면 나가겠습니다" → 협박은 역효과
                  </p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-900">
                    ❌ "업계 최고 수준 주세요" → 구체적 근거 없는 요구
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ⏰ Step 3: 타이밍 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">⏰ Step 3: 협상 타이밍</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600">✅ 좋은 타이밍</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">✓</span>
                  <div>
                    <strong>연말 인사평가 직후</strong><br />
                    성과 평가가 명확할 때
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">✓</span>
                  <div>
                    <strong>큰 프로젝트 성공 직후</strong><br />
                    가시적 성과가 있을 때
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">✓</span>
                  <div>
                    <strong>역할/책임 증가 시점</strong><br />
                    승진이나 팀장 임명 시
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-xl">✓</span>
                  <div>
                    <strong>타사 오퍼 보유 시</strong><br />
                    협상 카드가 생겼을 때
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-600">❌ 나쁜 타이밍</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 text-xl">✗</span>
                  <div>
                    <strong>회사 실적 악화 시</strong><br />
                    구조조정 분위기일 때
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 text-xl">✗</span>
                  <div>
                    <strong>프로젝트 실패 직후</strong><br />
                    부정적 이미지가 있을 때
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 text-xl">✗</span>
                  <div>
                    <strong>입사 초기 (6개월 이내)</strong><br />
                    검증 기간이 부족할 때
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-3 text-xl">✗</span>
                  <div>
                    <strong>상사가 바쁜 시기</strong><br />
                    결산, 감사, 큰 행사 진행 중
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 🎁 Step 4: 연봉 외 협상 포인트 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🎁 Step 4: 연봉 외 협상 포인트</h2>
          
          <p className="text-slate-700 mb-6">
            연봉이 어렵다면, 다른 혜택으로 협상하세요:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-3 text-blue-900">💰 금전적 혜택</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• 성과급/인센티브 비율 상향</li>
                <li>• 스톡옵션 (스타트업)</li>
                <li>• 사이닝 보너스</li>
                <li>• 중식비/교통비 지원 확대</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-3 text-green-900">⚖️ 워라밸 혜택</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• 재택근무/하이브리드 근무</li>
                <li>• 유연근무제</li>
                <li>• 휴가 일수 추가</li>
                <li>• 안식년 제도</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-3 text-purple-900">📚 성장 혜택</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• 교육비 지원 (학위, 자격증)</li>
                <li>• 컨퍼런스 참가 지원</li>
                <li>• 도서비 지원</li>
                <li>• 해외 연수 기회</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-3 text-slate-900">🎖️ 직무 혜택</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• 직급/직책 상향</li>
                <li>• 프로젝트 리더 기회</li>
                <li>• 팀 구성원 확대</li>
                <li>• 자율 프로젝트 권한</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 📊 연봉 협상 시나리오별 전략 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📊 시나리오별 전략</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-primary p-6 bg-slate-50 rounded-r-xl">
              <h3 className="font-semibold text-lg mb-3">🏢 내부 연봉 협상 (기존 회사)</h3>
              <p className="text-slate-700 mb-4">
                → 성과 중심 + 장기 기여 의지 강조
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  "지난 3년간 회사와 함께 성장했고, 앞으로도 기여하고 싶습니다. 
                  제 성과를 고려하면 시장가치는 6,000만원이지만, 회사에 대한 
                  애정을 고려해 5,500만원만 제안드립니다."
                </p>
              </div>
            </div>

            <div className="border-l-4 border-secondary p-6 bg-slate-50 rounded-r-xl">
              <h3 className="font-semibold text-lg mb-3">🚀 이직 연봉 협상 (신규 회사)</h3>
              <p className="text-slate-700 mb-4">
                → 현재 연봉 + 20~30% 상향 제시
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  "현재 5,000만원을 받고 있고, 이직을 고려하는 만큼 6,000만원을 
                  희망합니다. A사에서도 오퍼를 받았지만, 귀사의 비전에 더 매력을 
                  느껴 협상 중입니다."
                </p>
              </div>
            </div>

            <div className="border-l-4 border-warning p-6 bg-slate-50 rounded-r-xl">
              <h3 className="font-semibold text-lg mb-3">🎯 카운터 오퍼 협상 (퇴사 시도 시)</h3>
              <p className="text-slate-700 mb-4">
                → 타사 조건 + 잔류 이유 명확히
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-slate-700">
                  "B사에서 6,500만원 조건으로 제안받았지만, 여기 팀과 프로젝트에 
                  애정이 있습니다. 동일한 조건이라면 남고 싶습니다."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 🛠️ 유용한 도구 */}
        <section className="bg-gradient-to-r from-primary-light to-secondary-light rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ 협상에 도움되는 계산기</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/salary-rank" className="block bg-white p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-semibold text-lg mb-2">연봉 순위 테스트</h3>
              <p className="text-sm text-slate-600">
                내 연봉이 대한민국/세계 상위 몇 %인지 1초만에 확인
              </p>
            </Link>

            <Link href="/salary-calculator" className="block bg-white p-6 rounded-xl hover:shadow-sm border border-slate-200 transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2">급여 계산기</h3>
              <p className="text-sm text-slate-600">
                세전/세후 연봉을 즉시 계산하고 실수령액 확인
              </p>
            </Link>
          </div>
        </section>

        {/* 📌 최종 체크리스트 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">📌 협상 전 최종 체크리스트</h2>
          
          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">시장 조사 완료 (동종 업계 연봉 범위 확인)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">성과 자료 정리 완료 (숫자 중심)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">목표/수용/거절 연봉 범위 설정</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">실전 화법 연습 (거울 앞 or 지인과 리허설)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">협상 타이밍 확인 (회사 상황 + 개인 성과)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">대안 혜택 리스트 준비 (연봉 외 협상 카드)</span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
              <span className="text-slate-700">타사 오퍼 확보 (선택사항, 있으면 유리)</span>
            </label>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            지금 바로 내 연봉 순위를 확인하세요
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            협상 전 정확한 시장 위치 파악이 첫 걸음입니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/salary-rank"
              className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-shadow"
            >
              🏆 내 연봉 순위 확인
            </Link>
            <Link
              href="/salary-calculator"
              className="inline-block bg-slate-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              💰 급여 계산하기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
