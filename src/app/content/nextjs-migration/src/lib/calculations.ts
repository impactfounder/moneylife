import type { RankResult, PercentileData, Region, AgeGroup } from '@/types';

// ============================================
// 통계 데이터 (2024년 기준)
// ============================================

const KOREA_STATISTICS = {
  all: { p10: 1500000, p25: 2000000, p50: 2800000, p75: 4000000, p90: 6000000 },
  seoul: { p10: 1800000, p25: 2400000, p50: 3300000, p75: 4800000, p90: 7200000 },
  metro: { p10: 1600000, p25: 2200000, p50: 3000000, p75: 4500000, p90: 6600000 },
  other: { p10: 1400000, p25: 1800000, p50: 2500000, p75: 3500000, p90: 5400000 }
};

const AGE_STATISTICS = {
  '20s': { p10: 1200000, p25: 1600000, p50: 2200000, p75: 3000000, p90: 4500000 },
  '30s': { p10: 1800000, p25: 2400000, p50: 3200000, p75: 4500000, p90: 6500000 },
  '40s': { p10: 2000000, p25: 2800000, p50: 3800000, p75: 5500000, p90: 8000000 },
  '50s': { p10: 1800000, p25: 2500000, p50: 3500000, p75: 5000000, p90: 7500000 }
};

// ============================================
// 한국 소득 순위 계산
// ============================================

export function calculateKoreaRank(
  salary: number,
  region: Region = 'all'
): RankResult {
  const regionData = KOREA_STATISTICS[region];
  const percentile = calculatePercentile(salary, regionData);
  const description = getPercentileDescription(percentile);

  return {
    percentile: Math.round(percentile * 10) / 10,
    description,
    median: regionData.p50
  };
}

// ============================================
// 연령별 순위 계산
// ============================================

export function calculateAgeRank(
  salary: number,
  ageGroup: AgeGroup
): RankResult | null {
  if (ageGroup === 'all') return null;

  const ageData = AGE_STATISTICS[ageGroup];
  const percentile = calculatePercentile(salary, ageData);
  const ageLabels = {
    '20s': '20대',
    '30s': '30대',
    '40s': '40대',
    '50s': '50대'
  };

  return {
    percentile: Math.round(percentile * 10) / 10,
    description: `${ageLabels[ageGroup]} 중위 소득: ${formatNumber(ageData.p50)}원`,
    median: ageData.p50,
    label: ageLabels[ageGroup]
  };
}

// ============================================
// 세계 소득 순위 계산
// ============================================

export function calculateWorldRank(salary: number): RankResult {
  const worldMedian = 950000; // 세계 중위 소득 (PPP 기준)
  
  let percentile: number;
  
  if (salary >= 10000000) {
    percentile = 0.1;
  } else if (salary >= 8000000) {
    percentile = 0.5;
  } else if (salary >= 6000000) {
    percentile = 1;
  } else if (salary >= 4000000) {
    percentile = 5;
  } else if (salary >= 2800000) {
    percentile = 15;
  } else if (salary >= 1500000) {
    percentile = 30;
  } else if (salary >= worldMedian) {
    percentile = 50;
  } else {
    percentile = 70 + ((worldMedian - salary) / worldMedian) * 30;
  }

  return {
    percentile: Math.round(percentile * 10) / 10,
    description: percentile <= 10 
      ? '전 세계 최상위권입니다! 🌟' 
      : '전 세계 평균 이상입니다',
    median: worldMedian
  };
}

// ============================================
// 퍼센타일 계산 (공통 로직)
// ============================================

function calculatePercentile(salary: number, data: PercentileData): number {
  if (salary >= data.p90) {
    const excess = (salary - data.p90) / data.p90;
    return Math.max(10 - excess * 5, 1);
  } else if (salary >= data.p75) {
    const ratio = (salary - data.p75) / (data.p90 - data.p75);
    return 25 - ratio * 15;
  } else if (salary >= data.p50) {
    const ratio = (salary - data.p50) / (data.p75 - data.p50);
    return 50 - ratio * 25;
  } else if (salary >= data.p25) {
    const ratio = (salary - data.p25) / (data.p50 - data.p25);
    return 75 - ratio * 25;
  } else if (salary >= data.p10) {
    const ratio = (salary - data.p10) / (data.p25 - data.p10);
    return 90 - ratio * 15;
  } else {
    const deficit = (data.p10 - salary) / data.p10;
    return Math.min(90 + deficit * 10, 99);
  }
}

// ============================================
// 퍼센타일 설명 생성
// ============================================

function getPercentileDescription(percentile: number): string {
  if (percentile <= 10) {
    return '100명 중 10번째 이내! 대한민국 최상위권입니다 🏆';
  } else if (percentile <= 25) {
    return '100명 중 25번째 이내! 상위권입니다 ⭐';
  } else if (percentile <= 50) {
    return '100명 중 50번째 이내! 중상위권입니다 👍';
  } else if (percentile <= 75) {
    return '100명 중 75번째 이내! 평균 수준입니다 💼';
  } else {
    return '성장 가능성이 있습니다! 💪';
  }
}

// ============================================
// 세전 → 세후 변환
// ============================================

export function convertBeforeToAfter(beforeTax: number): number {
  // 4대보험 계산
  const nationalPension = Math.min(beforeTax * 0.045, 265500);
  const healthInsurance = beforeTax * 0.03545;
  const longTermCare = healthInsurance * 0.1295;
  const employmentInsurance = beforeTax * 0.009;

  // 소득세 계산 (간이세액표 기준)
  const yearlyBeforeTax = beforeTax * 12;
  const incomeTax = calculateSimpleIncomeTax(yearlyBeforeTax) / 12;
  const localTax = incomeTax * 0.1;

  const totalDeductions =
    nationalPension +
    healthInsurance +
    longTermCare +
    employmentInsurance +
    incomeTax +
    localTax;

  return Math.round(beforeTax - totalDeductions);
}

// ============================================
// 간이 소득세 계산
// ============================================

function calculateSimpleIncomeTax(yearlyIncome: number): number {
  const brackets = [
    { limit: 14000000, rate: 0.06, deduction: 0 },
    { limit: 50000000, rate: 0.15, deduction: 1260000 },
    { limit: 88000000, rate: 0.24, deduction: 5760000 },
    { limit: 150000000, rate: 0.35, deduction: 15440000 },
    { limit: 300000000, rate: 0.38, deduction: 19940000 },
    { limit: 500000000, rate: 0.40, deduction: 25940000 },
    { limit: Infinity, rate: 0.45, deduction: 35940000 }
  ];

  const bracket = brackets.find(b => yearlyIncome <= b.limit)!;
  const tax = yearlyIncome * bracket.rate - bracket.deduction;
  
  return Math.max(tax, 0);
}

// ============================================
// 숫자 포맷팅
// ============================================

export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

export function formatCurrency(num: number): string {
  return `${formatNumber(num)}원`;
}

export function formatPercent(num: number, decimals: number = 1): string {
  return `${num.toFixed(decimals)}%`;
}

// ============================================
// 조회수 관리 (LocalStorage)
// ============================================

export function incrementChecks(): number {
  if (typeof window === 'undefined') return 0;
  
  const current = parseInt(localStorage.getItem('totalChecks') || '0');
  const newCount = current + 1;
  localStorage.setItem('totalChecks', newCount.toString());
  
  return newCount;
}

export function getTotalChecks(): number {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem('totalChecks') || '0');
}
