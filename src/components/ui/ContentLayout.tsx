import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ReactNode } from 'react'

interface ContentLayoutProps {
  children: ReactNode
  category: string
  title: string
  description: string
  relatedCalculator?: {
    href: string
    name: string
  }
}

export function ContentLayout({
  children,
  category,
  title,
  description,
  relatedCalculator
}: ContentLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-10">
          <div className="inline-block bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-slate-200">
            {category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {description}
          </p>
        </section>

        {/* Content */}
        <div className="space-y-8">
          {children}
        </div>

        {/* CTA Section */}
        {relatedCalculator && (
          <section className="mt-12 bg-slate-900 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              직접 계산해보세요
            </h2>
            <p className="text-slate-400 mb-6">
              정확한 금액을 계산기로 확인하세요
            </p>
            <Link
              href={relatedCalculator.href}
              className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
            >
              {relatedCalculator.name} →
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

// 핵심 요약 카드
interface SummaryCardProps {
  title: string
  items: string[]
}

export function SummaryCard({ title, items }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-slate-900 rounded-full"></span>
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-slate-700">
            <span className="text-slate-400 mt-0.5">•</span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  )
}

// 섹션 카드
interface SectionCardProps {
  title: string
  children: ReactNode
}

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-6">{title}</h2>
      {children}
    </div>
  )
}

// 정보 박스
interface InfoBoxProps {
  type?: 'default' | 'tip' | 'warning' | 'important'
  title?: string
  children: ReactNode
}

export function InfoBox({ type = 'default', title, children }: InfoBoxProps) {
  const styles = {
    default: 'bg-slate-50 border-slate-200',
    tip: 'bg-emerald-50 border-emerald-200',
    warning: 'bg-amber-50 border-amber-200',
    important: 'bg-blue-50 border-blue-200'
  }

  return (
    <div className={`rounded-xl p-4 border ${styles[type]}`}>
      {title && <p className="font-semibold text-slate-900 mb-2">{title}</p>}
      <div className="text-slate-700 text-sm leading-relaxed">{children}</div>
    </div>
  )
}

// 비교 테이블
interface TableColumn {
  key: string
  header: string
  align?: 'left' | 'center' | 'right'
}

interface ComparisonTableProps {
  columns: TableColumn[]
  data: Record<string, string | number>[]
  highlightRow?: number
}

export function ComparisonTable({ columns, data, highlightRow }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-slate-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 font-semibold text-slate-700 ${
                  col.align === 'right' ? 'text-right' :
                  col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-slate-50 transition-colors ${
                highlightRow === rowIndex ? 'bg-slate-50 font-semibold' : ''
              }`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 ${
                    col.align === 'right' ? 'text-right' :
                    col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// 스탯 그리드
interface StatItem {
  label: string
  value: string
  description?: string
}

interface StatGridProps {
  items: StatItem[]
}

export function StatGrid({ items }: StatGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div key={index} className="bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-500 mb-1">{item.label}</p>
          <p className="text-xl font-bold text-slate-900">{item.value}</p>
          {item.description && (
            <p className="text-xs text-slate-400 mt-1">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}

// 단계별 가이드
interface StepItem {
  title: string
  description: string
}

interface StepGuideProps {
  steps: StepItem[]
}

export function StepGuide({ steps }: StepGuideProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {index + 1}
          </div>
          <div className="flex-1 pt-1">
            <h4 className="font-semibold text-slate-900 mb-1">{step.title}</h4>
            <p className="text-slate-600 text-sm">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
