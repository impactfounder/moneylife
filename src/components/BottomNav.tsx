'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', icon: '🏠', label: '홈' },
  { href: '/salary-rank', icon: '🧮', label: '계산기' },
  { href: '/content', icon: '📚', label: '콘텐츠' },
]

export function BottomNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    if (href === '/salary-rank') {
      // 계산기 관련 경로들
      return pathname.includes('calculator') || pathname === '/salary-rank'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                active ? 'text-violet-600' : 'text-slate-400'
              }`}
            >
              <span className="text-2xl mb-0.5">{item.icon}</span>
              <span className={`text-[10px] font-bold ${active ? 'text-violet-600' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
