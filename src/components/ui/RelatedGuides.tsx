'use client'

import Link from 'next/link'
import { BlogPost } from '@/data/posts'

interface RelatedGuidesProps {
  posts: BlogPost[]
  title?: string
}

export function RelatedGuides({ posts, title = '금융 전문가의 꿀팁' }: RelatedGuidesProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">함께 읽으면 돈 버는 글</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={`/guide/${post.slug}`}
            className="group flex flex-col bg-white rounded-xl border border-gray-100 p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300"
          >
            {/* 썸네일 */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">{post.thumbnail}</span>
            </div>

            {/* 제목 */}
            <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>

            {/* 설명 */}
            <p className="text-sm text-gray-500 line-clamp-2 flex-1">
              {post.description}
            </p>

            {/* 읽기 시간 */}
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
              <span className="px-2 py-1 bg-gray-100 rounded">{post.category}</span>
              <span>{post.readTime} 읽기</span>
            </div>
          </Link>
        ))}
      </div>

      {/* 더보기 링크 */}
      <div className="mt-6 text-center">
        <Link
          href="/guide"
          className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:underline"
        >
          더 많은 금융 가이드 보기
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
