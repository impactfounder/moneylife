import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">💰</span>
              <span className="font-bold text-xl tracking-tight">금융계산기</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
              복잡한 금융 계산을 쉽고 정확하게.<br />
              2025년 최신 세법과 법령을 반영하여 신뢰할 수 있는 결과를 제공합니다.
              여러분의 현명한 금융 생활을 응원합니다.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-slate-200">바로가기</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/salary-rank" className="hover:text-white transition-colors">연봉 순위 계산기</Link></li>
              <li><Link href="/salary-calculator" className="hover:text-white transition-colors">급여 계산기</Link></li>
              <li><Link href="/loan-calculator" className="hover:text-white transition-colors">대출 계산기</Link></li>
              <li><Link href="/pension-calculator" className="hover:text-white transition-colors">국민연금 계산기</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-slate-200">문의하기</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="mailto:contact@moneylife.kr" className="hover:text-white transition-colors">contact@moneylife.kr</a></li>
              <li><span className="text-slate-500">제휴 및 광고 문의 환영</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} 금융계산기. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
