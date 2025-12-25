import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, search, hostname } = request.nextUrl
  const url = request.nextUrl.clone()

  // 1. www -> non-www 리다이렉트 (301)
  if (hostname === 'www.moneylife.kr') {
    url.hostname = 'moneylife.kr'
    return NextResponse.redirect(url, 301)
  }

  // 2. .html 확장자 제거 리다이렉트 (301)
  if (pathname.endsWith('.html')) {
    let newPathname = pathname.replace(/\.html$/, '')

    // index.html 처리 (루트 및 서브디렉토리)
    // /index -> /
    // /content/index -> /content
    if (newPathname === '/index') {
      newPathname = '/'
    } else if (newPathname.endsWith('/index')) {
      newPathname = newPathname.replace(/\/index$/, '')
    }

    url.pathname = newPathname || '/'
    return NextResponse.redirect(url, 301)
  }

  // 2-1. /index 경로도 처리 (html 없이 직접 접근 시)
  if (pathname === '/index' || pathname.endsWith('/index')) {
    url.pathname = pathname === '/index' ? '/' : pathname.replace(/\/index$/, '')
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
    // 모든 경로에 적용 (정적 파일, API 제외하되 .html은 포함)
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico).*)',
    // .html 요청을 명시적으로 포함
    '/:path*.html',
  ],
}
