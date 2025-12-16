'use client'

import { useEffect, useRef } from 'react'

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

// 빌드타임 상수로 환경 체크 (불필요한 상태 관리 제거)
const isProduction = process.env.NODE_ENV === 'production'

export function AdUnit({
  slot = 'auto',
  format = 'auto',
  className = ''
}: AdUnitProps) {
  const isAdPushed = useRef(false)

  useEffect(() => {
    // 개발 환경이면 광고 로드 안함
    if (!isProduction) return

    // 이미 광고가 푸시되었으면 중복 실행 방지
    if (isAdPushed.current) return

    // adsbygoogle 스크립트 로드 대기
    const timer = setTimeout(() => {
      try {
        // adsbygoogle 배열이 없으면 초기화
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
        isAdPushed.current = true
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }, 100) // 스크립트 로드 대기

    return () => clearTimeout(timer)
  }, [])

  // 개발 환경에서는 플레이스홀더 표시
  if (!isProduction) {
    return (
      <div
        className={`ad-container ${className}`}
        style={{
          minHeight: '90px',
          width: '100%',
          backgroundColor: '#f1f5f9',
          border: '2px dashed #cbd5e1',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          fontSize: '14px'
        }}
      >
        [광고 영역 - 프로덕션에서만 표시]
      </div>
    )
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
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
