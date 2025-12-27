// ============================================
// 금융 계산 관련 타입
// ============================================

export interface SalaryData {
  monthlySalary: number;
  annualSalary: number;
  salaryType: 'before' | 'after';
  ageGroup?: AgeGroup;
  region?: Region;
}

export type AgeGroup = '20s' | '30s' | '40s' | '50s' | '60s' | 'all';
export type Region = 'seoul' | 'metro' | 'other' | 'all';

export interface RankResult {
  percentile: number;
  description: string;
  median: number;
  label?: string;
}

export interface RankData {
  percentage: number;
  salary: number;
  annualSalary: number;
  age: string;
  region: string;
}

export interface TierInfo {
  name: 'VIP' | 'Premium' | 'Standard';
  tier: string;
  colorStart: string;
  colorEnd: string;
  textColor: string;
  accentColor: string;
  message: string;
  badge: string;
}

// ============================================
// 계산기 타입 (수정됨: page.tsx의 id와 일치시킴)
// ============================================

export type CalculatorType =
  | 'salary-rank'
  | 'salary-calculator'
  | 'loan-calculator'
  | 'mortgage-calculator'
  | 'compound-interest-calculator'
  | 'pension-calculator'
  | 'severance-calculator'
  | 'income-tax-calculator'
  | 'capital-gains-tax-calculator'
  | 'venture-investment-tax-calculator'
  | 'minimum-wage-calculator';

export interface Calculator {
  id: CalculatorType;
  name: string;
  icon: string;
  description: string;
  href: string;
  popular?: boolean;
  badge?: string; // badge 속성 추가
}

// ============================================
// 통계 데이터 타입
// ============================================

export interface StatisticsData {
  korea: {
    all: PercentileData;
    seoul: PercentileData;
    metro: PercentileData;
    other: PercentileData;
  };
  world: {
    median: number;
    percentiles: number[];
  };
  ageGroups: {
    '20s': PercentileData;
    '30s': PercentileData;
    '40s': PercentileData;
    '50s': PercentileData;
    '60s': PercentileData;
  };
}

export interface PercentileData {
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  p95: number;
  p99: number;
}

// ============================================
// 대출 계산 타입
// ============================================

export interface LoanInput {
  amount: number;
  interestRate: number;
  months: number;
  method: 'equal-principal-interest' | 'equal-principal';
  // 스트레스 DSR 관련 (고도화)
  rateType?: 'fixed' | 'variable' | 'mixed' | 'periodic'; // 금리 유형
  annualIncome?: number;           // 연 소득 (DSR 계산용)
  existingDebtPayment?: number;    // 기존 대출 연 상환액
  // LTV 관련 (고도화)
  region?: LoanRegion;             // 지역
  propertyValue?: number;          // 주택 가격
  isFirstHome?: boolean;           // 생애최초 여부
  customLTV?: number;              // 직접 입력 LTV
}

export type LoanRegion =
  | 'gangnam'      // 강남/서초/송파/용산 (투기과열지구)
  | 'seoul'        // 서울 기타 (조정대상지역)
  | 'metro'        // 수도권 (조정대상지역)
  | 'other'        // 기타 지역
  | 'custom';      // 직접 입력

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: LoanScheduleItem[];
  // 스트레스 DSR 결과 (고도화)
  dsrResult?: DSRResult;
  // LTV 결과 (고도화)
  ltvResult?: LTVResult;
}

export interface LoanScheduleItem {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  balance: number;
}

// 스트레스 DSR 결과
export interface DSRResult {
  baseDSR: number;                 // 기본 DSR (%)
  stressDSR: number;               // 스트레스 DSR (%)
  stressRate: number;              // 가산 금리 (%)
  baseLoanLimit: number;           // 기본 대출 한도
  stressLoanLimit: number;         // 스트레스 DSR 적용 대출 한도
  limitReduction: number;          // 한도 감소액
  limitReductionPercent: number;   // 한도 감소율 (%)
  dsrExceeded: boolean;            // DSR 40% 초과 여부
  monthlyPaymentAtStress: number;  // 스트레스 금리 적용 시 월 상환액
}

// LTV 결과
export interface LTVResult {
  region: LoanRegion;
  regionName: string;
  baseLTV: number;                 // 기본 LTV (%)
  appliedLTV: number;              // 적용 LTV (%)
  maxLoanAmount: number;           // 최대 대출 가능액
  isFirstHome: boolean;
  ltvBonus: number;                // 생애최초 추가 LTV (%)
}

// ============================================
// 급여 계산 타입
// ============================================

export interface SalaryInput {
  grossSalary: number;
  dependents: number;
  childrenUnder20: number;
  // 비과세 항목 (상세설정)
  taxExempt?: {
    mealAllowance: number;      // 식대 (월 20만원 한도)
    carAllowance: number;       // 자가운전보조금 (월 20만원 한도)
    childcareAllowance: number; // 육아수당 (월 10만원 한도)
    researchAllowance: number;  // 연구활동비
    otherExempt: number;        // 기타 비과세
  };
  // 성과급 (별도 입력)
  incentive?: {
    amount: number;             // 연간 성과급 (원)
    paymentMonth?: number;      // 지급 월 (선택, 기본 12월)
  };
}

export interface SalaryResult {
  grossSalary: number;
  netSalary: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCare: number;
  employmentInsurance: number;
  incomeTax: number;
  localIncomeTax: number;
  totalDeductions: number;
  annualGross: number;
  annualNet: number;
  // 비과세 관련 추가 정보
  taxExemptTotal?: number;      // 총 비과세액
  taxableIncome?: number;       // 과세표준
  // 성과급 관련 추가 정보
  incentiveResult?: {
    grossWithIncentive: number;       // 성과급 포함 연봉
    netWithIncentive: number;         // 성과급 포함 연 실수령액
    incentiveTax: number;             // 성과급에 대한 추가 세금
    incentiveNetAmount: number;       // 성과급 실수령액
    taxBracketChange?: {              // 세율 구간 변동 정보
      beforeBracket: string;
      afterBracket: string;
      rateIncrease: number;
    };
  };
}

// ============================================
// 복리 계산 타입
// ============================================

export interface CompoundInterestInput {
  principal: number;
  monthlyDeposit: number;
  annualRate: number;
  years: number;
  compoundFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
}

export interface CompoundInterestResult {
  finalAmount: number;
  totalDeposit: number;
  totalInterest: number;
  yearlyData: YearlyCompoundData[];
}

export interface YearlyCompoundData {
  year: number;
  balance: number;
  deposit: number;
  interest: number;
}

// ============================================
// 퇴직금 계산 타입
// ============================================

export interface SeveranceInput {
  startDate: Date;
  endDate: Date;
  averageSalary: number;
}

export interface SeveranceResult {
  workingDays: number;
  workingYears: number;
  severancePay: number;
  severanceTax: number;
  netSeverance: number;
}

// ============================================
// UI 컴포넌트 타입
// ============================================

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

// InputProps 수정: 선택적 속성 허용
export interface InputProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'email' | 'tel';
  placeholder?: string;
  unit?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
  error?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

// ============================================
// SEO 메타데이터 타입
// ============================================

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

// ============================================
// Kakao 공유 타입
// ============================================

export interface KakaoShareContent {
  title: string;
  description: string;
  imageUrl: string;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
}