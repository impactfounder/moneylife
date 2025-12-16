'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CalculatorCTA } from '@/components/ui/CalculatorCTA'
import { getPostBySlug, blogPosts } from '@/data/posts'

interface PageProps {
  params: { slug: string }
}

export default function ContentDetailPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <div className="inline-block bg-slate-100 text-slate-600 border border-slate-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                {post.thumbnail} {post.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-slate-600 mb-6">
                {post.description}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
                <span>📅 {post.publishedAt}</span>
                <span>•</span>
                <span>⏱️ {post.readTime} 읽기</span>
              </div>
            </div>
          </div>
        </section>

        {/* 상단 계산기 CTA */}
        <section className="py-6">
          <div className="container mx-auto px-4 max-w-4xl">
            <CalculatorCTA
              calculatorPath={post.relatedCalculator}
              calculatorName={post.relatedCalculatorName}
              description="이 글과 관련된 계산기로 확인해보세요"
            />
          </div>
        </section>

        {/* 목차 */}
        {post.toc && post.toc.length > 0 && (
          <section className="py-8">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">📑 목차</h2>
                <nav className="space-y-2">
                  {post.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      • {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </section>
        )}

        {/* 본문 */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 prose prose-slate prose-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children, ...props }) => {
                    // Remove {#id} pattern from heading text
                    const text = String(children).replace(/\s*\{#[\w-]+\}\s*$/, '')
                    const idMatch = String(children).match(/\{#([\w-]+)\}/)
                    const id = idMatch ? idMatch[1] : props.id || text.toLowerCase().replace(/\s+/g, '-')
                    return (
                      <h2 id={id} className="text-2xl font-bold text-slate-900 mt-12 mb-6 pb-3 border-b border-slate-200">
                        {text}
                      </h2>
                    )
                  },
                  h3: ({ children }) => {
                    // Remove {#id} pattern from heading text
                    const text = String(children).replace(/\s*\{#[\w-]+\}\s*$/, '')
                    return (
                      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">
                        {text}
                      </h3>
                    )
                  },
                  p: ({ children }) => (
                    <p className="text-slate-700 leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-700">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-slate-700">{children}</li>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border-collapse border border-slate-200 text-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-slate-100">{children}</thead>
                  ),
                  th: ({ children }) => (
                    <th className="border border-slate-200 px-4 py-3 text-center font-semibold text-slate-700">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => {
                    // 숫자/금액 데이터는 우측정렬, 텍스트는 좌측정렬
                    const content = String(children)
                    const isNumeric = /^[\d,\.\-+%*만원억원천원]+$/.test(content.replace(/\s/g, '')) ||
                                      /^\*\*[\d,]+\*\*$/.test(content.replace(/\s/g, ''))
                    return (
                      <td className={`border border-slate-200 px-4 py-3 text-slate-700 ${isNumeric ? 'text-right' : ''}`}>
                        {children}
                      </td>
                    )
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-slate-300 pl-4 my-6 text-slate-600 italic">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className
                    if (isInline) {
                      return (
                        <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
                          {children}
                        </code>
                      )
                    }
                    return (
                      <code className="block bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        {children}
                      </code>
                    )
                  },
                  pre: ({ children }) => (
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-6">
                      {children}
                    </pre>
                  ),
                  hr: () => <hr className="my-8 border-slate-200" />,
                  strong: ({ children }) => (
                    <strong className="font-bold text-slate-900">{children}</strong>
                  ),
                  a: ({ children, href }) => (
                    <a href={href} className="text-blue-600 hover:text-blue-800 underline">
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          </div>
        </section>

        {/* 관련 계산기 CTA */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-slate-900 text-white rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">
                직접 계산해보세요
              </h3>
              <p className="text-slate-300 mb-6">
                {post.relatedCalculatorName}로 정확한 수치를 확인하세요
              </p>
              <Link
                href={post.relatedCalculator}
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-colors shadow-lg"
              >
                {post.relatedCalculatorName} 바로가기 →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
