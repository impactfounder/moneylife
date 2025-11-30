'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="glass-effect border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform duration-300 group-hover:scale-110">💰</span>
          <span className="font-bold text-xl text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors">
            금융계산기
          </span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            홈
          </Link>
          <Link href="/salary-rank" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            연봉 순위
          </Link>
          <Link href="/content" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            콘텐츠
          </Link>
          <Link href="/#calculators" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            계산기 목록
          </Link>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="메뉴"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md absolute w-full left-0 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link
              href="/"
              className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏠 홈
            </Link>
            <Link
              href="/salary-rank"
              className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏆 연봉 순위
            </Link>
            <Link
              href="/content"
              className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              📚 콘텐츠
            </Link>
            <Link
              href="/#calculators"
              className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              🧮 계산기 목록
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
