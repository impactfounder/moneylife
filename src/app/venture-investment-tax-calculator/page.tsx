'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SEOContent } from '@/components/ui/SEOContent'

export default function VentureInvestmentTaxCalculator() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* 헤더 */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            벤처투자 세액공제 계산기
                        </h1>
                        <p className="text-lg text-gray-600">
                            벤처기업 투자 시 받을 수 있는 소득공제 혜택을 계산합니다
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            2025년 기준 | 벤처투자 소득공제 최대 100%
                        </p>
                    </div>

                    {/* 준비중 안내 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center py-16 mb-8">
                        <div className="text-6xl mb-6">🚀</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            계산기 서비스 준비중입니다
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            벤처기업 투자 시 받을 수 있는 소득공제·세액공제 혜택을 자동 계산하는 기능이 곧 추가될 예정입니다.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors"
                            >
                                홈으로 돌아가기
                            </Link>
                            <Link
                                href="/income-tax-calculator"
                                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                            >
                                종합소득세 계산기
                            </Link>
                        </div>
                    </div>

                    {/* 벤처투자 세제혜택 안내 */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">2025년 벤처투자 소득공제 혜택</h2>

                        <div className="space-y-6">
                            <div className="p-4 bg-indigo-50 rounded-xl">
                                <h3 className="font-bold text-indigo-900 mb-2">투자금액별 공제율</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>- 3,000만원 이하 투자: <strong className="text-indigo-600">100% 소득공제</strong></li>
                                    <li>- 3,000만원 ~ 5,000만원: <strong className="text-indigo-600">70% 소득공제</strong></li>
                                    <li>- 5,000만원 초과분: <strong className="text-indigo-600">30% 소득공제</strong></li>
                                </ul>
                            </div>

                            <div className="p-4 bg-green-50 rounded-xl">
                                <h3 className="font-bold text-green-900 mb-2">공제 한도</h3>
                                <p className="text-gray-700">
                                    종합소득금액의 <strong className="text-green-600">50%</strong>까지 소득공제 가능
                                </p>
                            </div>

                            <div className="p-4 bg-amber-50 rounded-xl">
                                <h3 className="font-bold text-amber-900 mb-2">투자 대상</h3>
                                <ul className="space-y-1 text-gray-700 text-sm">
                                    <li>- 벤처기업 직접 투자</li>
                                    <li>- 개인투자조합 출자</li>
                                    <li>- 벤처기업투자신탁 수익증권</li>
                                    <li>- 크라우드펀딩을 통한 벤처기업 투자</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* SEO 콘텐츠 */}
                    <SEOContent
                        title="2025년 벤처투자 세액공제 완벽 가이드"
                        description="벤처기업 투자 시 받을 수 있는 세제 혜택을 상세히 알아보세요."
                        content={`
                            <h3>벤처투자 소득공제란?</h3>
                            <p>벤처투자 소득공제는 개인이 벤처기업에 투자할 경우 투자금액의 일정 비율을 종합소득금액에서 공제받을 수 있는 세제 혜택입니다. 정부가 벤처기업 육성과 스타트업 생태계 활성화를 위해 도입한 제도로, 개인 투자자에게 상당한 절세 효과를 제공합니다.</p>

                            <h3>2025년 벤처투자 소득공제율</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>투자금액 구간</th>
                                        <th>공제율</th>
                                        <th>공제 한도</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>3,000만원 이하</td>
                                        <td>100%</td>
                                        <td>종합소득금액의 50%</td>
                                    </tr>
                                    <tr>
                                        <td>3,000만원 ~ 5,000만원</td>
                                        <td>70%</td>
                                        <td>종합소득금액의 50%</td>
                                    </tr>
                                    <tr>
                                        <td>5,000만원 초과</td>
                                        <td>30%</td>
                                        <td>종합소득금액의 50%</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3>투자 대상 및 방법</h3>
                            <p>벤처투자 소득공제를 받기 위해서는 다음 방법으로 투자해야 합니다:</p>

                            <h4>1. 벤처기업 직접 투자</h4>
                            <p>중소기업창업투자회사, 벤처기업에 직접 출자하여 주식 또는 출자지분을 취득하는 방법입니다. 투자 후 3년 이상 보유해야 공제 혜택이 유지됩니다.</p>

                            <h4>2. 개인투자조합 출자</h4>
                            <p>개인투자조합(엔젤투자조합)에 출자하여 간접적으로 벤처기업에 투자하는 방법입니다. 전문 투자자의 안목을 활용할 수 있어 안정적입니다.</p>

                            <h4>3. 크라우드펀딩</h4>
                            <p>온라인 소액투자 중개업자(크라우드펀딩 플랫폼)를 통해 벤처기업에 투자하는 방법입니다. 소액으로도 참여 가능하여 접근성이 좋습니다.</p>

                            <h4>4. 벤처기업투자신탁</h4>
                            <p>벤처기업투자신탁 수익증권을 매입하여 투자하는 방법입니다. 분산 투자 효과가 있습니다.</p>

                            <h3>소득공제 적용 예시</h3>
                            <p>연봉 1억원(종합소득금액 약 7,500만원)인 근로자가 벤처기업에 5,000만원을 투자한 경우:</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>금액</th>
                                        <th>공제율</th>
                                        <th>공제금액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>3,000만원 이하</td>
                                        <td>3,000만원</td>
                                        <td>100%</td>
                                        <td>3,000만원</td>
                                    </tr>
                                    <tr>
                                        <td>3,000만원~5,000만원</td>
                                        <td>2,000만원</td>
                                        <td>70%</td>
                                        <td>1,400만원</td>
                                    </tr>
                                    <tr>
                                        <td>합계</td>
                                        <td>5,000만원</td>
                                        <td>-</td>
                                        <td>4,400만원</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>단, 종합소득금액(7,500만원)의 50%인 3,750만원까지만 공제 가능하므로, 실제 공제금액은 <strong>3,750만원</strong>입니다.</p>
                            <p>소득세율 35% 구간이라면 약 <strong>1,312만원</strong>의 세금을 절감할 수 있습니다.</p>

                            <h3>벤처투자 소득공제 주의사항</h3>
                            <ul>
                                <li>투자일로부터 3년 이내 주식 처분 시 추징됨</li>
                                <li>투자한 벤처기업이 폐업하면 공제 유지</li>
                                <li>종합소득금액이 없는 해에는 공제 불가</li>
                                <li>다음 해로 이월 공제 불가</li>
                                <li>투자 증명서 발급 필수 (벤처기업확인서 등)</li>
                            </ul>

                            <h3>벤처기업 확인 방법</h3>
                            <p>투자하려는 기업이 벤처기업인지 확인하는 방법:</p>
                            <ul>
                                <li>벤처확인시스템(www.venturein.or.kr)에서 조회</li>
                                <li>해당 기업에 벤처기업확인서 요청</li>
                                <li>크라우드펀딩 플랫폼에서 확인</li>
                            </ul>

                            <h3>연말정산 시 필요 서류</h3>
                            <p>벤처투자 소득공제를 받으려면 다음 서류를 연말정산 시 제출해야 합니다:</p>
                            <ul>
                                <li>벤처기업투자확인서 (벤처기업 또는 조합에서 발급)</li>
                                <li>주식 또는 출자지분 취득 증명서</li>
                                <li>투자 영수증</li>
                            </ul>
                        `}
                        faqs={[
                            {
                                question: '벤처투자 소득공제는 누구나 받을 수 있나요?',
                                answer: '근로소득자, 사업소득자 등 종합소득이 있는 개인은 누구나 벤처투자 소득공제를 받을 수 있습니다. 다만, 해당 연도에 종합소득금액이 있어야 하며, 종합소득금액의 50% 한도 내에서 공제받을 수 있습니다.',
                            },
                            {
                                question: '벤처투자 후 언제까지 주식을 보유해야 하나요?',
                                answer: '소득공제를 받은 주식은 투자일로부터 3년 이상 보유해야 합니다. 3년 이내에 주식을 양도하거나 회사가 벤처기업에서 제외되면 공제받은 세액이 추징됩니다. 다만, 회사 폐업이나 파산의 경우는 추징 대상에서 제외됩니다.',
                            },
                            {
                                question: '크라우드펀딩으로 투자해도 소득공제를 받을 수 있나요?',
                                answer: '네, 금융위원회에 등록된 온라인소액투자중개업자(크라우드펀딩 플랫폼)를 통해 벤처기업에 투자한 경우에도 동일한 소득공제 혜택을 받을 수 있습니다. 와디즈, 오픈트레이드, 크라우디 등 공인된 플랫폼에서 투자하면 됩니다.',
                            },
                            {
                                question: '벤처투자로 손실이 나면 어떻게 되나요?',
                                answer: '벤처투자 손실의 경우, 양도소득세 계산 시 다른 주식 양도차익과 상계할 수 있습니다. 또한, 벤처기업이 폐업하여 주식 가치가 0원이 되어도 이미 받은 소득공제는 추징되지 않습니다. 다만, 투자 손실 자체가 소득공제되는 것은 아닙니다.',
                            },
                            {
                                question: '소득공제와 세액공제의 차이는 무엇인가요?',
                                answer: '소득공제는 과세표준(세금을 계산하는 기준 금액)을 줄여주는 것이고, 세액공제는 계산된 세금에서 직접 차감하는 것입니다. 벤처투자는 소득공제 방식이므로, 본인의 소득세율에 따라 절세 효과가 달라집니다. 소득세율이 높을수록 절세 효과가 큽니다.',
                            },
                        ]}
                        relatedLinks={[
                            {
                                title: '종합소득세 계산기',
                                href: '/income-tax-calculator',
                                description: '연간 소득에 대한 세금을 계산해보세요',
                            },
                            {
                                title: '급여 실수령액 계산기',
                                href: '/salary-calculator',
                                description: '월급에서 실제로 받는 금액 확인',
                            },
                            {
                                title: '양도소득세 계산기',
                                href: '/capital-gains-tax-calculator',
                                description: '주식 양도 시 세금 계산',
                            },
                            {
                                title: '복리 이자 계산기',
                                href: '/compound-interest-calculator',
                                description: '투자 수익 시뮬레이션',
                            },
                            {
                                title: '절세 전략 2025',
                                href: '/content/tax-saving',
                                description: '2025년 절세 방법 총정리',
                            },
                            {
                                title: 'ISA 계좌 가이드',
                                href: '/content/isa-guide',
                                description: '투자 시 세금 혜택받는 방법',
                            },
                        ]}
                    />
                </div>
            </main>
            <Footer />
        </>
    )
}
