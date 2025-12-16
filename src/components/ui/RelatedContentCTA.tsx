import Link from 'next/link'
import { BlogPost } from '@/data/posts'

interface RelatedContentCTAProps {
  posts: BlogPost[]
  title?: string
}

export function RelatedContentCTA({ posts, title = '이 결과와 관련된 유용한 정보' }: RelatedContentCTAProps) {
  if (posts.length === 0) return null

  // 최대 2개의 포스트만 표시
  const displayPosts = posts.slice(0, 2)

  return (
    <div className="mt-6 pt-6 border-t border-slate-200">
      <p className="text-sm font-semibold text-slate-600 mb-4 text-center">
        {title}
      </p>
      <div className="space-y-3">
        {displayPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/content/${post.slug}`}
            className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group"
          >
            <span className="text-2xl flex-shrink-0">{post.thumbnail}</span>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-slate-900 truncate">
                {post.title}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                {post.readTime} 읽기
              </p>
            </div>
            <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
