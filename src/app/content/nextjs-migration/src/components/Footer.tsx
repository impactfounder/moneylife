import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 로고 및 설명 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💰</span>
              <span className="text-xl font-bold text-gray-900">금융계산기</span>
            </div>
            <p className="text-gray-600 mb-4">
              대출부터 연봉순위까지,<br />
              모든 금융 계산을 1초만에!
            </p>
            <p className="text-sm text-gray-500">
              © {currentYear} moneylife.kr<br />
              All rights reserved.
            </p>
          </div>

          {/* 계산기 링크 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">계산기</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/salary-rank" className="text-gray-600 hover:text-primary transition-colors">
                  연봉 순위 테스트
                </Link>
              </li>
              <li>
                <Link href="/salary-calculator" className="text-gray-600 hover:text-primary transition-colors">
                  급여 계산기
                </Link>
              </li>
              <li>
                <Link href="/loan-calculator" className="text-gray-600 hover:text-primary transition-colors">
                  대출 계산기
                </Link>
              </li>
            </ul>
          </div>

          {/* 정보 링크 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">정보</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/content" className="text-gray-600 hover:text-primary transition-colors">
                  금융 가이드
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-primary transition-colors">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 메시지 */}
        <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            본 사이트의 모든 계산은 참고용이며, 실제 금융 거래 시 전문가와 상담하시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  )
}
