import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { blogPosts, getPostBySlug, getPostsByCalculator } from '@/data/posts'

interface Props {
  params: Promise<{ slug: string }>
}

// 정적 경로 생성
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

// 메타데이터 생성
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: '페이지를 찾을 수 없습니다',
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
    },
    alternates: {
      canonical: `/guide/${post.slug}`,
    },
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // 관련 포스트 (같은 계산기 관련 글 중 현재 글 제외)
  const relatedPosts = getPostsByCalculator(post.relatedCalculator)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            image: ['https://moneylife.kr/og-image.png'],
            datePublished: post.publishedAt,
            author: {
              '@type': 'Organization',
              name: 'MoneyLife',
              url: 'https://moneylife.kr',
            },
            publisher: {
              '@type': 'Organization',
              name: 'MoneyLife',
              logo: {
                '@type': 'ImageObject',
                url: 'https://moneylife.kr/og-image.png',
              },
            },
          }),
        }}
      />
      <main className="min-h-screen bg-white">
        {/* 히어로 섹션 */}
        <div className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* 브레드크럼 */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-primary">
                홈
              </Link>
              <span>/</span>
              <Link href="/guide" className="hover:text-primary">
                가이드
              </Link>
              <span>/</span>
              <span className="text-gray-700">{post.category}</span>
            </nav>

            {/* 메타 정보 */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-gray-400 text-sm">
                {post.readTime} 읽기
              </span>
              <span className="text-gray-400 text-sm">
                {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
              </span>
            </div>

            {/* 제목 */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* 설명 */}
            <p className="text-lg text-gray-600">
              {post.description}
            </p>
          </div>
        </div>

        {/* 본문 */}
        <div className="container mx-auto px-4 max-w-4xl py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 목차 (데스크톱) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">목차</h3>
                <nav className="space-y-2">
                  {post.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>

                {/* 계산기 바로가기 */}
                <div className="mt-8 p-4 bg-primary/5 rounded-xl">
                  <p className="text-sm text-gray-700 mb-3">
                    직접 계산해보세요
                  </p>
                  <Link
                    href={post.relatedCalculator}
                    className="flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                  >
                    {post.relatedCalculatorName} 바로가기
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* 콘텐츠 */}
            <article className="flex-1 min-w-0">
              {/* 모바일 목차 */}
              <div className="lg:hidden mb-8 p-4 bg-gray-50 rounded-xl">
                <details>
                  <summary className="font-bold text-gray-900 cursor-pointer">
                    목차 보기
                  </summary>
                  <nav className="mt-4 space-y-2">
                    {post.toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-gray-600 hover:text-primary"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </details>
              </div>

              {/* 본문 콘텐츠 */}
              <div
                className="prose prose-lg max-w-none
                  prose-headings:scroll-mt-24
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:font-bold prose-h3:text-gray-800 prose-h3:mt-8 prose-h3:mb-4
                  prose-h4:text-lg prose-h4:font-semibold prose-h4:text-gray-800 prose-h4:mt-6 prose-h4:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-ul:my-4 prose-li:text-gray-700
                  prose-table:text-sm
                  prose-th:bg-gray-50 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                  prose-td:p-3 prose-td:border-b prose-td:border-gray-100
                  prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-gray-700
                  prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-gray-900 prose-pre:text-gray-100
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* 계산기 CTA */}
              <div className="mt-12 p-6 md:p-8 bg-gradient-to-r from-primary to-blue-600 rounded-2xl text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      직접 계산해보세요!
                    </h3>
                    <p className="text-white/90 text-sm">
                      {post.relatedCalculatorName}로 나의 상황에 맞게 계산해보세요.
                    </p>
                  </div>
                  <Link
                    href={post.relatedCalculator}
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap"
                  >
                    {post.relatedCalculatorName}
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          </div>

          {/* 관련 글 */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                함께 읽으면 좋은 글
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/guide/${relatedPost.slug}`}
                    className="group bg-gray-50 rounded-xl p-6 hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-3xl mb-4 block">
                      {relatedPost.thumbnail}
                    </span>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {relatedPost.readTime} 읽기
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 더 많은 글 */}
          <div className="mt-12 text-center">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              ← 모든 가이드 보기
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
