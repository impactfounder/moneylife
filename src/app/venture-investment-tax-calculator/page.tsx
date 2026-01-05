'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { RelatedGuides } from '@/components/ui/RelatedGuides'
import { getPostsByCalculator } from '@/data/posts'

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
                            2026년 기준 | 벤처투자 소득공제 최대 100%
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">2026년 벤처투자 소득공제 혜택</h2>

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

                    {/* 관련 가이드 섹션 */}
                    <RelatedGuides posts={getPostsByCalculator('/venture-investment-tax-calculator')} />
                </div>
            </main>
            <Footer />
        </>
    )
}
