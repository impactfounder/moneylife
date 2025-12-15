import Link from 'next/link'
import type { BlogPost } from '@/data/posts'

interface RelatedTipsProps {
  posts: BlogPost[]
  title?: string
}

export function RelatedTips({ posts, title = "이 계산기와 함께 보면 좋은 글" }: RelatedTipsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={`/content/${post.slug}`}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-slate-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{post.thumbnail}</span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-slate-500 text-sm line-clamp-2">
              {post.description}
            </p>
            <div className="mt-4 text-xs text-slate-400">
              {post.readTime} 읽기
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
