'use client'

import { useEffect, useRef, useState } from 'react'

// TypeScript 타입 선언
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>
  }
}

interface AdUnitProps {
  slot?: string
  format?: string
  className?: string
}

export function AdUnit({
  slot = 'auto',
  format = 'auto',
  className = ''
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isAdPushed = useRef(false)
  const [isProduction, setIsProduction] = useState(false)

  useEffect(() => {
    // 프로덕션 환경인지 확인
    setIsProduction(process.env.NODE_ENV === 'production')
  }, [])

  useEffect(() => {
    // 개발 환경이면 광고 로드 안함
    if (!isProduction) return

    // 이미 광고가 푸시되었으면 중복 실행 방지
    if (isAdPushed.current) return

    try {
      // adsbygoogle 배열이 없으면 초기화
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
      isAdPushed.current = true
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [isProduction])

  // 개발 환경에서는 아무것도 렌더링하지 않음
  if (!isProduction) {
    return null
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          minHeight: '90px',
          width: '100%'
        }}
        data-ad-client="ca-pub-2515762248094919"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
