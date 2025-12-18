/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static Export 제거 (개발 모드에서는 필요 없음)
  // output: 'export',

  images: {
    unoptimized: true,
  },

  // 환경 변수
  env: {
    SITE_URL: 'https://moneylife.kr',
    GTM_ID: 'GTM-MN9KGF64',
    KAKAO_APP_KEY: '2e34fd72aa8a49ccbd7d9b3a3054f6ee',
    ADSENSE_CLIENT: 'ca-pub-2515762248094919',
  },

  // SEO 최적화
  reactStrictMode: true,

  // 성능 최적화
  swcMinify: true,

  // SEO: 리다이렉트 규칙 (301 영구 리다이렉트)
  async redirects() {
    return [
      // .html 확장자 제거
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true,
      },
      // index.html -> /
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      // 트레일링 슬래시 통일 (없는 것으로)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ]
  },

  // SEO: 보안 헤더
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;
