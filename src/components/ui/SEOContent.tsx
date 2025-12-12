'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FAQItem {
  question: string
  answer: string
}

interface RelatedLink {
  title: string
  href: string
  description: string
}

interface SEOContentProps {
  title: string
  description: string
  content: string
  faqs: FAQItem[]
  relatedLinks?: RelatedLink[]
}

export function SEOContent({ title, description, content, faqs, relatedLinks }: SEOContentProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <div className="mt-12 space-y-8">
      {/* 상세 가이드 섹션 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <div
          className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>

      {/* FAQ 섹션 */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">자주 묻는 질문 (FAQ)</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <span className="text-2xl text-gray-500 flex-shrink-0">
                  {openFAQ === index ? '−' : '+'}
                </span>
              </button>
              {openFAQ === index && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 관련 콘텐츠 링크 */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 금융 정보 더 보기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
