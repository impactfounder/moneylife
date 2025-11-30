# 📥 파일 다운로드 및 사용 가이드

## 🎉 완성된 프로젝트

**moneylife.kr** Next.js 마이그레이션 프로젝트가 완성되었습니다!

- ✅ 9개 금융 계산기 (100% TypeScript + React)
- ✅ 11개 콘텐츠 페이지 (SEO 최적화)
- ✅ 카카오톡 공유 기능 (Phase 2 완료)
- ✅ 반응형 디자인 (모바일 최적화)

---

## 📦 프로젝트 구조

```
nextjs-migration/
├── src/
│   ├── app/
│   │   ├── content/                    # 11개 콘텐츠 페이지
│   │   │   ├── page.tsx               # 콘텐츠 목록
│   │   │   ├── salary-3million/       # 월급 300만원의 현실
│   │   │   ├── salary-ranking/        # 연봉 순위표
│   │   │   ├── salary-table/          # 급여 실수령액표
│   │   │   ├── annual-salary-100m/    # 연봉 1억 실수령액
│   │   │   ├── pension-vs-irp/        # 연금저축 vs IRP
│   │   │   ├── salary-negotiation/    # 연봉 협상 전략
│   │   │   ├── isa-guide/             # ISA 계좌 가이드
│   │   │   ├── mortgage-refinance/    # 주담대 갈아타기
│   │   │   ├── pension-strategy/      # 퇴직연금 운용
│   │   │   ├── compound-interest/     # 복리 투자
│   │   │   └── tax-saving/            # 절세 전략
│   │   │
│   │   ├── capital-gains-tax-calculator/  # 양도소득세 계산기
│   │   ├── compound-interest-calculator/  # 복리 이자 계산기
│   │   ├── income-tax-calculator/         # 종합소득세 계산기
│   │   ├── loan-calculator/               # 대출 계산기
│   │   ├── mortgage-calculator/           # 주택담보대출 계산기
│   │   ├── pension-calculator/            # 국민연금 계산기
│   │   ├── salary-calculator/             # 급여 계산기
│   │   ├── salary-rank/                   # 연봉 순위 테스트
│   │   ├── severance-calculator/          # 퇴직금 계산기
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                       # 메인 페이지
│   │
│   ├── components/                        # 공통 컴포넌트
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       └── Card.tsx
│   │
│   └── lib/                               # 계산 로직
│       ├── pension-calculator.ts
│       ├── salary-calculator.ts
│       ├── severance-calculator.ts
│       ├── income-tax-calculator.ts
│       ├── capital-gains-tax-calculator.ts
│       ├── loan-calculator.ts
│       ├── mortgage-calculator.ts
│       └── compound-interest-calculator.ts
│
├── public/                                # 정적 파일
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── README.md                              # 프로젝트 문서
├── CONTENT_FILES_COMPLETE.md             # 콘텐츠 완성 보고서
└── DOWNLOAD_GUIDE.md                      # 이 파일

```

---

## 📥 다운로드 방법

### 방법 1: Genspark "Download files" 버튼
1. Genspark 우측 상단 "Download files" 버튼 클릭
2. `nextjs-migration.zip` 다운로드
3. 압축 해제

### 방법 2: 개별 파일 복사
Genspark 파일 트리에서 필요한 파일을 개별적으로 복사

---

## 🚀 로컬 실행 방법

### 1. 의존성 설치
```bash
cd nextjs-migration
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 브라우저 접속
```
http://localhost:3000
```

### 4. 주요 페이지 확인
- **메인 페이지**: `http://localhost:3000`
- **콘텐츠 목록**: `http://localhost:3000/content`
- **급여 계산기**: `http://localhost:3000/salary-calculator`
- **연봉 순위 테스트**: `http://localhost:3000/salary-rank`

---

## ⚙️ 배포 전 필수 작업

### 1. Kakao JavaScript Key 삽입 ✅ **필수**
파일: `src/app/layout.tsx` (또는 각 페이지)

```tsx
// Kakao SDK 초기화
if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init('YOUR_JAVASCRIPT_KEY_HERE'); // ⚠️ 여기에 실제 키 입력!
}
```

**발급 방법:**
1. https://developers.kakao.com 접속
2. 내 애플리케이션 선택
3. 앱 설정 > 앱 키 > JavaScript 키 복사

---

### 2. 환경변수 설정 (선택)
`.env.local` 파일 생성:
```env
NEXT_PUBLIC_KAKAO_APP_KEY=YOUR_JAVASCRIPT_KEY
```

---

## 🌐 Vercel 배포

### 1. Vercel 계정 연결
```bash
npm install -g vercel
vercel login
```

### 2. 배포
```bash
cd nextjs-migration
vercel
```

### 3. 환경변수 설정
Vercel 대시보드 > Settings > Environment Variables
- `NEXT_PUBLIC_KAKAO_APP_KEY` 추가

### 4. 배포 완료
- Production URL: `https://your-project.vercel.app`

---

## 📝 주요 기능

### ✅ 9개 금융 계산기
1. 급여 계산기 (세전/세후)
2. 연봉 순위 테스트
3. 퇴직금 계산기
4. 국민연금 계산기
5. 대출 이자 계산기
6. 주택담보대출 계산기
7. 복리 이자 계산기
8. 종합소득세 계산기
9. 양도소득세 계산기

### ✅ 11개 콘텐츠 페이지
1. 월급 300만원의 현실
2. 2025년 연봉 순위표
3. 2025년 급여 실수령액표
4. 연봉 1억의 실수령액
5. 연금저축 vs IRP 비교
6. 연봉 협상 전략 가이드
7. ISA 계좌 완벽 가이드
8. 주담대 갈아타기 체크리스트
9. 퇴직연금 운용 전략
10. 복리 투자 시뮬레이션
11. 절세 전략 2025

### ✅ 카카오톡 공유 기능
- Canvas 기반 1080x1350px 이미지 카드 생성
- 계산 결과 미리보기
- 다운로드 및 공유 버튼

---

## 🐛 문제 해결

### Q1: "npm install" 실패
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Q2: 포트 3000 이미 사용 중
```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

### Q3: Tailwind CSS 스타일 안 나옴
```bash
# Tailwind 재빌드
npm run build
npm run dev
```

---

## 📞 지원

문제가 발생하면:
1. `README.md` 참고
2. `CONTENT_FILES_COMPLETE.md` 확인
3. Next.js 공식 문서: https://nextjs.org/docs

---

## 🎉 완성!

모든 파일이 정상적으로 생성되었습니다. 
로컬 테스트 후 Vercel 배포를 진행하세요!

**Happy Coding! 🚀**
