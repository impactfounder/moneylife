import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { blogPosts } from '@/data/posts'

export const metadata = {
  title: '금융 가이드 - 돈 되는 금융 정보',
  description: '연봉 실수령액, 대출, 세금, 투자 등 실생활에 필요한 금융 정보를 쉽고 자세하게 알려드립니다.',
}

export default function GuidePage() {
  const categories = [...new Set(blogPosts.map((post) => post.category))]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              금융 가이드
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              연봉, 대출, 세금, 투자까지 - 실생활에 꼭 필요한 금융 정보를 쉽고 자세하게 알려드립니다.
            </p>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Link
              href="/guide"
              className="px-4 py-2 rounded-full bg-primary text-white font-medium text-sm"
            >
              전체
            </Link>
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium text-sm cursor-default"
              >
                {category}
              </span>
            ))}
          </div>

          {/* 포스트 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/guide/${post.slug}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                {/* 썸네일 */}
                <div className="h-40 bg-gradient-to-br from-primary/10 to-blue-50 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    {post.thumbnail}
                  </span>
                </div>

                {/* 콘텐츠 */}
                <div className="p-6">
                  {/* 카테고리 & 읽기 시간 */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {post.readTime} 읽기
                    </span>
                  </div>

                  {/* 제목 */}
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* 설명 */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.description}
                  </p>

                  {/* 날짜 */}
                  <p className="text-xs text-gray-400 mt-4">
                    {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* 계산기 CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              직접 계산해보세요!
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              글로 읽은 내용을 금융 계산기로 직접 확인해보세요.
              나의 상황에 맞는 정확한 결과를 얻을 수 있습니다.
            </p>
            <Link
              href="/#calculators"
              className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              계산기 바로가기
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
