import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '소개 - MoneyLife',
  description: 'MoneyLife 서비스 소개입니다. 복잡한 금융 계산을 쉽고 정확하게 도와드리는 금융 유틸리티 서비스입니다.',
}

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              MoneyLife 소개
            </h1>
            <p className="text-lg text-slate-300">
              복잡한 금융 계산을 쉽고 정확하게 도와드리는 금융 유틸리티 서비스
            </p>
          </div>
        </section>

        {/* 핵심 가치 */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">정확한 계산</h3>
                <p className="text-slate-600">
                  최신 세법과 규정을 반영하여 연봉 실수령액, 대출 이자, 적금 만기액 등을 정확하게 계산해드립니다.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">유용한 정보</h3>
                <p className="text-slate-600">
                  어려운 금융 용어와 제도를 알기 쉽게 풀어서 설명해드리는 가이드 콘텐츠를 제공합니다.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">빠른 결과</h3>
                <p className="text-slate-600">
                  복잡한 계산을 1초 만에 처리하여 즉시 결과를 확인할 수 있습니다.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">개인정보 보호</h3>
                <p className="text-slate-600">
                  모든 계산은 브라우저에서 처리되며, 입력한 정보는 서버에 저장되지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 제공 서비스 */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">제공 서비스</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-slate-900">급여 계산기</h4>
                  <p className="text-slate-600 text-sm">2025년 최신 세율 적용, 4대보험 자동 계산</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-slate-900">대출 계산기</h4>
                  <p className="text-slate-600 text-sm">원리금균등, 원금균등, 체증식 상환 방식 지원</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-slate-900">주택담보대출 계산기</h4>
                  <p className="text-slate-600 text-sm">LTV, DTI, DSR 규제 반영 대출 한도 계산</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-slate-900">퇴직금 계산기</h4>
                  <p className="text-slate-600 text-sm">근속연수 기반 정확한 퇴직금 계산</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-slate-900">국민연금 계산기</h4>
                  <p className="text-slate-600 text-sm">예상 연금 수령액 시뮬레이션</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-slate-900">복리 이자 계산기</h4>
                  <p className="text-slate-600 text-sm">장기 투자 수익률 시뮬레이션</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-slate-900">종합소득세 계산기</h4>
                  <p className="text-slate-600 text-sm">소득세, 지방세 자동 계산</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-teal-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold text-slate-900">양도소득세 계산기</h4>
                  <p className="text-slate-600 text-sm">부동산 양도차익 세금 계산</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 문의하기 */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">문의하기</h2>
              <p className="text-slate-600 mb-4">
                서비스 이용 중 불편한 점이나 제안사항이 있으시면 아래 이메일로 연락주세요.
              </p>
              <a
                href="mailto:contact@moneylife.kr"
                className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold"
              >
                📧 contact@moneylife.kr
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-slate-900">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              지금 바로 계산해보세요
            </h2>
            <p className="text-slate-300 mb-6">
              9개 전문 계산기로 1초만에 결과 확인
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
            >
              계산기로 돌아가기 →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
