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

export type AgeGroup = '20s' | '30s' | '40s' | '50s' | 'all';
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
  | 'venture-investment';

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
  };
}

export interface PercentileData {
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
}

// ============================================
// 대출 계산 타입
// ============================================

export interface LoanInput {
  amount: number;
  interestRate: number;
  months: number;
  method: 'equal-principal-interest' | 'equal-principal';
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: LoanScheduleItem[];
}

export interface LoanScheduleItem {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  balance: number;
}

// ============================================
// 급여 계산 타입
// ============================================

export interface SalaryInput {
  grossSalary: number;
  dependents: number;
  childrenUnder20: number;
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