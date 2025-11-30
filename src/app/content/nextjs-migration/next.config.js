/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static Site Generation (SSG)
  images: {
    unoptimized: true, // Static export용
  },
  trailingSlash: true, // SEO를 위한 trailing slash
  
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
  
  // 리다이렉트 (기존 URL 유지)
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:page.html',
        destination: '/:page',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
