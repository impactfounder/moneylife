# 🔄 Genspark → Cursor (Next.js) 마이그레이션 가이드

## 📋 목차
1. [Cursor에 프로젝트 가져오기](#1-cursor에-프로젝트-가져오기)
2. [의존성 설치](#2-의존성-설치)
3. [개발 서버 실행](#3-개발-서버-실행)
4. [기존 코드 마이그레이션](#4-기존-코드-마이그레이션)
5. [배포하기](#5-배포하기)

---

## 1. Cursor에 프로젝트 가져오기

### 방법 A: 수동 복사 (추천)

#### Step 1: Cursor에서 새 폴더 생성
```bash
mkdir moneylife-nextjs
cd moneylife-nextjs
```

#### Step 2: Genspark에서 생성한 파일들 복사

**이미 생성된 파일들**:
```
✅ package.json
✅ tsconfig.json
✅ next.config.js
✅ tailwind.config.ts
✅ postcss.config.js
✅ .gitignore
✅ README.md
✅ src/types/index.ts
✅ src/lib/calculations.ts
```

**복사 방법**:
1. Genspark 에디터에서 각 파일 내용 복사
2. Cursor에서 같은 경로에 파일 생성 후 붙여넣기

#### Step 3: 폴더 구조 생성
```bash
# Cursor 터미널에서 실행
mkdir -p src/app src/components src/lib src/types src/styles public
```

---

## 2. 의존성 설치

### Cursor 터미널에서 실행:

```bash
# npm 사용
npm install

# 또는 yarn
yarn install

# 또는 pnpm (빠름)
pnpm install
```

### 설치 시간
- npm: ~2분
- yarn: ~1분30초
- pnpm: ~1분

---

## 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 열기

### 예상 화면
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

---

## 4. 기존 코드 마이그레이션

### 4.1 전역 스타일 설정

**파일**: `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans text-gray-900 bg-white;
  }
}

/* 기존 CSS 변수 유지 */
:root {
  --color-primary: #2563eb;
  --color-secondary: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
}
```

---

### 4.2 루트 레이아웃 생성

**파일**: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: '금융계산기 - moneylife.kr',
  description: '대출부터 연봉순위까지, 모든 금융 계산을 1초만에',
  keywords: ['금융계산기', '연봉순위', '급여계산기', '대출계산기'],
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
      </head>
      <body>
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
```

---

### 4.3 메인 페이지 (간단 버전)

**파일**: `src/app/page.tsx`

```typescript
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            💰 금융계산기
          </h1>
          <p className="text-xl text-gray-600">
            대출부터 연봉순위까지, 모든 금융 계산을 1초만에!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 계산기 카드들 */}
          <CalculatorCard
            href="/salary-rank"
            icon="🏆"
            title="연봉 순위 테스트"
            description="내 연봉이 대한민국 상위 몇 %?"
          />
          <CalculatorCard
            href="/salary-calculator"
            icon="💰"
            title="급여 계산기"
            description="실수령액 정확히 계산하기"
          />
          {/* 나머지 계산기들... */}
        </div>
      </div>
    </main>
  )
}

function CalculatorCard({ href, icon, title, description }: {
  href: string
  icon: string
  title: string
  description: string
}) {
  return (
    <a
      href={href}
      className="block p-6 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </a>
  )
}
```

---

### 4.4 연봉 순위 페이지 (기본 구조)

**파일**: `src/app/salary-rank/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { calculateKoreaRank, calculateWorldRank } from '@/lib/calculations'
import type { RankResult } from '@/types'

export default function SalaryRankPage() {
  const [salary, setSalary] = useState('')
  const [result, setResult] = useState<{
    korea: RankResult
    world: RankResult
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const salaryNum = parseInt(salary)
    
    if (salaryNum > 0) {
      setResult({
        korea: calculateKoreaRank(salaryNum),
        world: calculateWorldRank(salaryNum)
      })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          🏆 내 연봉, 대한민국 상위 몇 %?
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit}>
            <label className="block mb-4">
              <span className="text-gray-700 font-semibold">월 실수령액</span>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="예: 2500000"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🚀 내 순위 확인하기
            </button>
          </form>
        </div>

        {result && (
          <div className="space-y-6">
            <ResultCard
              title="🇰🇷 대한민국"
              percentile={result.korea.percentile}
              description={result.korea.description}
            />
            <ResultCard
              title="🌏 전세계"
              percentile={result.world.percentile}
              description={result.world.description}
            />
          </div>
        )}
      </div>
    </main>
  )
}

function ResultCard({ title, percentile, description }: {
  title: string
  percentile: number
  description: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="text-4xl font-bold text-blue-600 mb-2">
        상위 {percentile}%
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
```

---

## 5. 배포하기

### 5.1 Vercel 배포 (추천)

#### Step 1: Vercel 계정 연결
```bash
npm i -g vercel
vercel login
```

#### Step 2: 배포
```bash
vercel
```

#### Step 3: 도메인 설정
```bash
vercel domains add moneylife.kr
```

---

### 5.2 Netlify 배포

#### Step 1: `netlify.toml` 생성
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Step 2: Netlify CLI로 배포
```bash
npm i -g netlify-cli
netlify deploy --prod
```

---

## 📊 마이그레이션 체크리스트

### 필수 단계
- [ ] `package.json` 복사
- [ ] `tsconfig.json` 복사
- [ ] `next.config.js` 복사
- [ ] `tailwind.config.ts` 복사
- [ ] `src/types/index.ts` 복사
- [ ] `src/lib/calculations.ts` 복사
- [ ] `npm install` 실행
- [ ] `npm run dev` 실행
- [ ] 브라우저에서 확인

### 선택 단계
- [ ] 컴포넌트 생성
- [ ] 페이지 생성
- [ ] 스타일 조정
- [ ] 이미지 추가
- [ ] SEO 최적화
- [ ] 배포

---

## 🐛 문제 해결

### 문제 1: `npm install` 실패
```bash
# 캐시 삭제 후 재시도
rm -rf node_modules package-lock.json
npm install
```

### 문제 2: 타입 에러
```bash
# 타입 체크만 실행
npm run type-check

# 에러 무시하고 빌드 (비추천)
npm run build -- --no-lint
```

### 문제 3: 포트 충돌
```bash
# 다른 포트로 실행
PORT=3001 npm run dev
```

---

## 💡 유용한 명령어

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 타입 체크만
npm run type-check

# ESLint 실행
npm run lint
```

---

## 📚 다음 단계

1. ✅ 기본 설정 완료
2. ✅ 개발 서버 실행
3. ⏳ 컴포넌트 추가
4. ⏳ 페이지 추가
5. ⏳ 배포

---

**🎉 마이그레이션 완료를 축하합니다!**

이제 Cursor에서 Next.js + TypeScript로 개발하실 수 있습니다! 😊
