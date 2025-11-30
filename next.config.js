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
};

module.exports = nextConfig;
