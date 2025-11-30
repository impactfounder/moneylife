'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function VentureInvestmentTaxCalculator() {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-12 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        벤처투자 세제혜택 계산기
                    </h1>
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center py-20">
                        <div className="text-6xl mb-6">🚀</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            서비스 준비중입니다
                        </h2>
                        <p className="text-gray-600 mb-8">
                            벤처투자 시 소득공제·세액공제 혜택을 계산하는 기능이 곧 추가될 예정입니다.
                        </p>
                        <button
                            className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors"
                            onClick={() => window.history.back()}
                        >
                            돌아가기
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
