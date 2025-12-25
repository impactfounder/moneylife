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
  const [isAnimating, setIsAnimating] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // 세후 월급 -> 세전으로 변환 후 순위 계산
  const salaryInWon = monthlySalary * 10000
  const grossSalary = convertAfterToBefore(salaryInWon)
  const rankResult = calculateKoreaRank(grossSalary, 'all')
  const percentile = rankResult.percentile
  const annualSalary = Math.round(grossSalary * 12 / 10000) // 만원 단위 연봉

  // Count up 애니메이션
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      setDisplayPercentile(0)

      const duration = 1500 // 1.5초
      const steps = 60
      const increment = percentile / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= percentile) {
          setDisplayPercentile(percentile)
          clearInterval(timer)
          setIsAnimating(false)
        } else {
          setDisplayPercentile(Math.round(current * 10) / 10)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isOpen, percentile])

  // ESC 키로 닫기
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

  // 배경 클릭으로 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  const handleGoToDiagnosis = () => {
    onClose()
    router.push(`/financial-diagnosis?monthlySalary=${monthlySalary}`)
  }

  // 순위에 따른 메시지
  const getMessage = () => {
    if (percentile <= 5) {
      return { emoji: '👑', message: '최상위권 연봉이시네요! 자산 관리도 그만큼 잘하고 계신가요?' }
    } else if (percentile <= 15) {
      return { emoji: '🎉', message: '상위권 연봉이시네요! 하지만 자산 관리도 상위권일까요?' }
    } else if (percentile <= 30) {
      return { emoji: '💪', message: '평균 이상의 연봉! 이제 자산 증식 전략이 필요해요.' }
    } else if (percentile <= 50) {
      return { emoji: '📊', message: '대한민국 중상위권! 효율적인 자산 관리가 필요합니다.' }
    } else {
      return { emoji: '🚀', message: '지금부터 시작이에요! 체계적인 재무 관리로 역전하세요.' }
    }
  }

  const { emoji, message } = getMessage()

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-in"
      >
        {/* Top gradient bar */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />

        <div className="p-8">
          {/* 결과 헤더 */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{emoji}</div>
            <p className="text-slate-500 text-sm mb-2">
              월 실수령액 {formatNumber(monthlySalary)}만원 (연봉 약 {formatNumber(annualSalary)}만원)
            </p>
          </div>

          {/* 메인 결과 - 상위 % */}
          <div className="text-center mb-8">
            <p className="text-slate-600 text-lg mb-2">당신의 연봉은</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-sm text-slate-500">대한민국</span>
              <span className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                상위 {displayPercentile}%
              </span>
            </div>
          </div>

          {/* 프로그레스 바 시각화 */}
          <div className="mb-8">
            <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${100 - displayPercentile}%` }}
              />
              {/* 마커 */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-lg transition-all duration-1000 ease-out"
                style={{ left: `calc(${100 - displayPercentile}% - 8px)` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2">
              <span>상위 1%</span>
              <span>상위 50%</span>
              <span>하위</span>
            </div>
          </div>

          {/* 핵심 메시지 */}
          <div className="bg-slate-50 rounded-2xl p-4 mb-8 text-center">
            <p className="text-slate-700 font-medium">
              {message}
            </p>
          </div>

          {/* CTA 버튼 */}
          <div className="space-y-3">
            <button
              onClick={handleGoToDiagnosis}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              AI 상세 재무 진단 받기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 text-slate-500 font-medium hover:text-slate-700 transition-colors"
            >
              닫기
            </button>
          </div>

          {/* 부가 정보 */}
          <p className="text-center text-xs text-slate-400 mt-6">
            * 통계청 2024년 임금근로자 소득 데이터 기준
          </p>
        </div>
      </div>
    </div>
  )
}
