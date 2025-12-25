'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface TickerItem {
  price: number
  change: number
}

interface TickerData {
  bitcoin: TickerItem
  ethereum: TickerItem
  gold: TickerItem
  usdkrw: TickerItem
  kospi: TickerItem
  nasdaq: TickerItem
  sp500: TickerItem
  dow: TickerItem
  updatedAt: string
}

function MarketTicker() {
  const [data, setData] = useState<TickerData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/ticker')
        if (res.ok) {
          const tickerData = await res.json()
          setData(tickerData)
        }
      } catch (error) {
        console.error('Failed to fetch ticker data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    // 5분마다 갱신
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number, type: 'crypto' | 'gold' | 'currency' | 'index') => {
    if (price === 0) return '-'

    if (type === 'crypto') {
      // 억 단위 표시
      if (price >= 100000000) {
        return `${(price / 100000000).toFixed(1)}억`
      }
      // 만 단위 표시
      if (price >= 10000) {
        return `${Math.round(price / 10000)}만`
      }
      return price.toLocaleString()
    }

    if (type === 'gold') {
      // 금: 만원 단위
      return `${Math.round(price / 10000)}만`
    }

    if (type === 'index') {
      // 지수: 소수점 없이
      return price.toLocaleString(undefined, { maximumFractionDigits: 0 })
    }

    // 환율: 소수점 없이
    return price.toLocaleString(undefined, { maximumFractionDigits: 0 })
  }

  const getChangeStyle = (change: number): React.CSSProperties => {
    if (change > 0) return { color: '#f87171' } // 한국식: 상승=빨강
    if (change < 0) return { color: '#60a5fa' } // 한국식: 하락=파랑
    return { color: '#64748b' }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return '▲'
    if (change < 0) return '▼'
    return ''
  }

  const formatChange = (change: number) => {
    if (change === 0) return '-'
    return `${getChangeIcon(change)}${Math.abs(change).toFixed(2)}%`
  }

  // 모바일에서는 표시하지 않음
  if (isLoading) {
    return (
      <div className="hidden md:block bg-slate-900 text-slate-400 py-2 border-t border-slate-700">
        <div className="flex items-center justify-center text-sm">
          <span className="animate-pulse">시세 불러오는 중...</span>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  // 순서: 코스피 → 환율 → 금 → 나스닥 → S&P → 다우 → BTC → ETH
  const tickerItems = [
    { label: '코스피', price: formatPrice(data.kospi.price, 'index'), change: data.kospi.change },
    { label: '환율', price: formatPrice(data.usdkrw.price, 'currency'), change: data.usdkrw.change },
    { label: '금(1돈)', price: formatPrice(data.gold.price, 'gold'), change: data.gold.change },
    { label: '나스닥', price: formatPrice(data.nasdaq.price, 'index'), change: data.nasdaq.change },
    { label: 'S&P500', price: formatPrice(data.sp500.price, 'index'), change: data.sp500.change },
    { label: '다우', price: formatPrice(data.dow.price, 'index'), change: data.dow.change },
    { label: 'BTC', price: formatPrice(data.bitcoin.price, 'crypto'), change: data.bitcoin.change },
    { label: 'ETH', price: formatPrice(data.ethereum.price, 'crypto'), change: data.ethereum.change },
  ]

  return (
    <div className="hidden xl:block bg-slate-900 py-1.5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 text-sm">
          {tickerItems.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">{item.label}</span>
              <span className="text-white font-bold">{item.price}</span>
              <span style={getChangeStyle(item.change)} className="text-sm">
                {formatChange(item.change)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="glass-effect border-x-0 border-t-0 border-b border-slate-100 xl:border-b-0 sticky top-0 z-50 shadow-sm xl:shadow-none">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-black text-xl text-slate-900 tracking-tight">
            MoneyLife
          </span>
          <span className="text-[10px] font-bold text-white bg-gradient-to-r from-violet-500 to-blue-500 px-2 py-0.5 rounded-full tracking-wide">
            AI
          </span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            홈
          </Link>
          <Link href="/content" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            콘텐츠
          </Link>
          <Link href="/#calculators" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            계산기
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
              홈
            </Link>

            <Link
              href="/content"
              className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              콘텐츠
            </Link>
            <Link
              href="/#calculators"
              className="px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              계산기
            </Link>
          </nav>
        </div>
      )}

      {/* 시세 티커 */}
      <MarketTicker />
    </header>
  )
}
