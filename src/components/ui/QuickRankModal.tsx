'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { calculateKoreaRank, formatNumber, convertAfterToBefore } from '@/lib/calculations'

interface QuickRankModalProps {
  isOpen: boolean
  onClose: () => void
  monthlySalary: number // 만원 단위
}

export function QuickRankModal({ isOpen, onClose, monthlySalary }: QuickRankModalProps) {
  const router = useRouter()
  const [displayPercentile, setDisplayPercentile] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)

  // 세후 월급 -> 세전으로 변환 후 순위 계산
  const salaryInWon = monthlySalary * 10000
  const grossSalary = convertAfterToBefore(salaryInWon)
  const rankResult = calculateKoreaRank(grossSalary, 'all')
  const percentile = rankResult.percentile
  const annualSalary = Math.round(grossSalary * 12 / 10000)

  // Count up 애니메이션
  useEffect(() => {
    if (isOpen) {
      setDisplayPercentile(0)

      const duration = 1500
      const steps = 60
      const increment = percentile / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= percentile) {
          setDisplayPercentile(percentile)
          clearInterval(timer)
        } else {
          setDisplayPercentile(Math.round(current * 10) / 10)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isOpen, percentile])

  // ESC 키 및 배경 클릭 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  const handleGoToDiagnosis = () => {
    onClose()
    router.push(`/financial-diagnosis?monthlySalary=${monthlySalary}`)
  }

  const getMessage = () => {
    if (percentile <= 5) return { emoji: '👑', message: '최상위권 연봉이시네요! 자산 관리도 그만큼 잘하고 계신가요?' }
    else if (percentile <= 15) return { emoji: '🎉', message: '상위권 연봉이시네요! 하지만 자산 관리도 상위권일까요?' }
    else if (percentile <= 30) return { emoji: '💪', message: '평균 이상의 연봉! 이제 자산 증식 전략이 필요해요.' }
    else if (percentile <= 50) return { emoji: '📊', message: '대한민국 중상위권! 효율적인 자산 관리가 필요합니다.' }
    else return { emoji: '🚀', message: '지금부터 시작이에요! 체계적인 재무 관리로 역전하세요.' }
  }

  const { emoji, message } = getMessage()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleBackdropClick}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-in"
      >
        {/* Top Gradient Bar */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

        <div className="p-8 flex flex-col items-center">

          {/* 1. 이모지 & 월급 정보 */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{emoji}</div>
            <p className="text-slate-500 text-sm font-medium">
              월 실수령액 {formatNumber(monthlySalary)}만원
              <span className="block text-xs text-slate-400 mt-1">(연봉 약 {formatNumber(annualSalary)}만원)</span>
            </p>
          </div>

          {/* 2. 메인 결과 (수직 정렬) */}
          <div className="text-center mb-8 w-full">
            <p className="text-slate-500 text-sm font-bold mb-2 tracking-wide uppercase">대한민국 상위</p>

            {/* 숫자 컨테이너: tabular-nums + absolute % 배치로 레이아웃 안정화 */}
            <div className="relative flex justify-center items-baseline h-[80px]">
              <div className="relative">
                <span className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 tabular-nums tracking-tight leading-none">
                  {displayPercentile.toFixed(1)}
                </span>
                <span className="text-3xl lg:text-4xl font-bold text-blue-600 absolute -right-9 top-1">%</span>
              </div>
            </div>
          </div>

          {/* 3. 프로그레스 바 */}
          <div className="w-full mb-8">
            <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(5, 100 - displayPercentile)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              <span>Top 1%</span>
              <span>Top 50%</span>
              <span>Bottom</span>
            </div>
          </div>

          {/* 4. 메시지 박스 */}
          <div className="w-full bg-slate-50 rounded-2xl p-4 mb-6 text-center border border-slate-100">
            <p className="text-slate-700 font-medium text-sm leading-relaxed break-keep">
              {message}
            </p>
          </div>

          {/* 5. 버튼 */}
          <button
            onClick={handleGoToDiagnosis}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mb-3"
          >
            AI 상세 재무 진단 받기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <button
            onClick={onClose}
            className="text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors py-2"
          >
            닫기
          </button>

          {/* 푸터 정보 */}
          <p className="text-[10px] text-slate-300 mt-4 text-center">
            * 통계청 2024년 임금근로자 소득 데이터 기준
          </p>
        </div>
      </div>
    </div>
  )
}
