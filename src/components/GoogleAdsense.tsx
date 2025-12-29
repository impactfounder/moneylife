'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

export function GoogleAdsense() {
  const pathname = usePathname()

  // 메인 페이지에서는 광고 스크립트 로드 안 함 (UX 보호)
  if (pathname === '/') {
    return null
  }

  return (
    <Script
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2515762248094919"
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  )
}
