import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '금융계산기 - moneylife.kr',
    template: '%s | 금융계산기'
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '금융계산기 - moneylife.kr',
    description: '대출부터 연봉순위까지, 모든 금융 계산을 1초만에!',
    url: 'https://moneylife.kr',
    siteName: '금융계산기',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://moneylife.kr/og-image.png',
        width: 1200,
        height: 630,
        alt: '금융계산기 - moneylife.kr',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '금융계산기 - moneylife.kr',
    description: '대출부터 연봉순위까지, 모든 금융 계산을 1초만에!',
    images: ['https://moneylife.kr/og-image.png'],
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
    google: 'your-google-verification-code', // Google Search Console에서 받은 코드
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MN9KGF64');`,
          }}
        />
        
        {/* Kakao SDK */}
        <script src="https://developers.kakao.com/sdk/js/kakao.js" async />
        
        {/* Pretendard Font (Optional) */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
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
      </body>
    </html>
  )
}
