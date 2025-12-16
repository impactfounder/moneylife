'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          문제가 발생했습니다
        </h2>
        <p className="text-slate-600 mb-6">
          페이지를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  )
}
