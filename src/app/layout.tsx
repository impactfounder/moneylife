import type { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import { BottomNav } from '@/components/BottomNav'
import { GoogleAdsense } from '@/components/GoogleAdsense'
import './globals.css'

// Next.js 폰트 최적화 - 자동 셀프 호스팅 및 캐싱
const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'AI 금융 진단 - MoneyLife',
    template: '%s | AI 금융 진단 머니라이프'
  },
  description: '대출부터 연봉순위까지, 모든 금융 계산을 1초만에! 급여계산기, 대출계산기, 연봉순위 테스트 등 9개 계산기 무료 제공',
  keywords: [
    '금융계산기',
    '연봉순위',
    '급여계산기',
    '대출계산기',
    '실수령액',
    '퇴직금',
    '복리이자',
    '연금계산',
    '종합소득세',
    '양도소득세'
  ],
  authors: [{ name: 'moneylife.kr' }],
  creator: 'moneylife.kr',
  publisher: 'moneylife.kr',
  metadataBase: new URL('https://moneylife.kr'),
  openGraph: {
    title: 'MoneyLife AI - AI와 함께하는 금융 진단 & 계산기',
    description: '1분 만에 무료 재무 진단 + 9가지 필수 금융 도구. 연봉순위, 대출, 투자, 세금까지 한 곳에서!',
    url: 'https://moneylife.kr',
    siteName: 'MoneyLife AI',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://moneylife.kr/og-image-v4.png',
        width: 1200,
        height: 630,
        alt: 'MoneyLife AI - AI와 함께하는 금융 진단 & 계산기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoneyLife AI - AI와 함께하는 금융 진단 & 계산기',
    description: '1분 만에 무료 재무 진단 + 9가지 필수 금융 도구. 연봉순위, 대출, 투자, 세금까지 한 곳에서!',
    images: ['https://moneylife.kr/og-image-v4.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Google Search Console에서 받은 코드로 교체 필요
  },
}

// JSON-LD 구조화 데이터
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'moneylife.kr',
  url: 'https://moneylife.kr',
  logo: 'https://moneylife.kr/logo.png',
  description: '금융 계산기 및 재테크 정보 제공 - 급여계산기, 대출계산기, 연봉순위 등',
  sameAs: []
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '금융계산기 - moneylife.kr',
  url: 'https://moneylife.kr',
  description: '대출부터 연봉순위까지, 모든 금융 계산을 1초만에!',
  publisher: {
    '@type': 'Organization',
    name: 'moneylife.kr'
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://moneylife.kr/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${pretendard.className} antialiased pb-20 md:pb-0`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MN9KGF64"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* 모바일 하단 네비게이션 */}
        <BottomNav />

        {/* Google Tag Manager - afterInteractive for better performance */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MN9KGF64');`,
          }}
        />

        {/* Kakao SDK는 필요한 페이지에서 동적 로드 (financial-diagnosis/result) */}

        {/* Google AdSense - 메인 페이지 제외 */}
        <GoogleAdsense />
      </body>
    </html>
  )
}
