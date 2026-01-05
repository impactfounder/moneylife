import { AdUnit } from './AdUnit'

interface InFeedAdProps {
  className?: string
}

export function InFeedAd({ className = '' }: InFeedAdProps) {
  return (
    <div className={`bg-slate-50/50 rounded-xl p-4 border border-slate-100 ${className}`}>
      <p className="text-xs text-slate-400 mb-2 text-center">광고</p>
      <AdUnit className="rounded-lg overflow-hidden" />
    </div>
  )
}
