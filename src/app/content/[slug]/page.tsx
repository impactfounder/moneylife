'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
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

      <main className="min-h-screen bg-white">
        {/* 히어로 섹션 */}
        <section className="bg-white py-16 border-b border-slate-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-slate-400 text-sm">{post.readTime} 읽기</span>
                <span className="text-slate-400 text-sm">{post.publishedAt}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-slate-600">
                {post.description}
              </p>
            </div>
          </div>
        </section>

        {/* 목차 */}
        {post.toc && post.toc.length > 0 && (
          <section className="bg-slate-50 py-8 border-b border-slate-100">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-lg font-bold text-slate-900 mb-4">목차</h2>
                <nav className="space-y-2">
                  {post.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </section>
        )}

        {/* 본문 */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <article className="max-w-3xl mx-auto prose prose-slate prose-lg">
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
                    <th className="border border-slate-200 px-4 py-3 text-left font-semibold text-slate-700">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-slate-200 px-4 py-3 text-slate-700">
                      {children}
                    </td>
                  ),
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
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  직접 계산해보세요
                </h3>
                <p className="text-slate-600 mb-6">
                  {post.relatedCalculatorName}로 정확한 수치를 확인하세요
                </p>
                <Link
                  href={post.relatedCalculator}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                  {post.relatedCalculatorName} 바로가기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
