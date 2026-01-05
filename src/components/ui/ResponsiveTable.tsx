'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

interface ResponsiveTableProps {
  children: ReactNode
  className?: string
}

export function ResponsiveTable({ children, className = '' }: ResponsiveTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(false)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return

    const hasOverflow = el.scrollWidth > el.clientWidth
    setShowScrollHint(hasOverflow && el.scrollLeft === 0)
    setShowLeftShadow(el.scrollLeft > 0)
    setShowRightShadow(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const handleScroll = () => {
    checkScroll()
    setShowScrollHint(false)
  }

  return (
    <div className={`relative ${className}`}>
      {/* 스크롤 힌트 */}
      {showScrollHint && (
        <div className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1 text-xs text-slate-400 bg-white/90 px-2 py-1 rounded-full shadow-sm border border-slate-200 animate-pulse">
          <span>←</span>
          <span>스크롤</span>
          <span>→</span>
        </div>
      )}

      {/* 왼쪽 그라데이션 */}
      {showLeftShadow && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-[5]" />
      )}

      {/* 오른쪽 그라데이션 */}
      {showRightShadow && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-[5]" />
      )}

      {/* 테이블 래퍼 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
      >
        {children}
      </div>
    </div>
  )
}
