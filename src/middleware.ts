import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search, hostname, protocol } = request.nextUrl
  const url = request.nextUrl.clone()

  // 1. www -> non-www 리다이렉트 (301)
  if (hostname === 'www.moneylife.kr') {
    url.hostname = 'moneylife.kr'
    return NextResponse.redirect(url, 301)
  }

  // 2. .html 확장자 제거 리다이렉트 (301)
  if (pathname.endsWith('.html')) {
    const newPathname = pathname.replace(/\.html$/, '')
    // index.html -> / 로 리다이렉트
    if (newPathname === '/index' || newPathname === '') {
      url.pathname = '/'
    } else {
      url.pathname = newPathname
    }
    return NextResponse.redirect(url, 301)
  }

  // 3. 중복 슬래시 제거
  if (pathname.includes('//')) {
    url.pathname = pathname.replace(/\/+/g, '/')
    return NextResponse.redirect(url, 301)
  }

  // 4. 쿼리 파라미터 중 {search_term_string} 같은 플레이스홀더 제거
  if (search.includes('{') && search.includes('}')) {
    url.search = ''
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    // 모든 경로에 적용 (정적 파일, API 제외)
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)',
  ],
}
