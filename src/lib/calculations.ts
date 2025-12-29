import type { RankResult, PercentileData, Region, AgeGroup } from '@/types';
import {
  INCOME_PERCENTILE_2023,
  REGION_ADJUSTMENT,
  AGE_ADJUSTMENT,
  INCOME_STATS_META,
} from '@/data/income-percentile-2023';

// ============================================
// 국세청 2023년 귀속 근로소득 백분위 기반 계산
// 출처: 국세청 만근 근로자 근로소득 천분위 통계
// ============================================

/**
 * 연봉(원)을 기준으로 상위 몇 %인지 계산
 * @param annualSalary 연봉 (원)
 * @returns 상위 X% (예: 5 = 상위 5%)
 */
function calculatePercentileFromAnnual(annualSalary: number): number {
  // 백분위 포인트를 연봉 기준 내림차순 정렬
  const sortedPoints = Object.entries(INCOME_PERCENTILE_2023)
    .map(([p, v]) => ({ percentile: parseFloat(p), value: v }))
    .sort((a, b) => b.value - a.value);

  // 최상위 초과
  if (annualSalary >= sortedPoints[0].value) {
    // 상위 0.1% 이상인 경우, 0.1% 미만 범위로 추정
    const excess = (annualSalary - sortedPoints[0].value) / sortedPoints[0].value;
    return Math.max(0.1 - excess * 0.05, 0.01);
  }

  // 해당 구간 찾아서 선형 보간
  for (let i = 0; i < sortedPoints.length - 1; i++) {
    const upper = sortedPoints[i];     // 더 높은 연봉 (낮은 백분위)
    const lower = sortedPoints[i + 1]; // 더 낮은 연봉 (높은 백분위)

    if (annualSalary >= lower.value && annualSalary < upper.value) {
      // 구간 내 선형 보간
      const ratio = (annualSalary - lower.value) / (upper.value - lower.value);
      return lower.percentile - ratio * (lower.percentile - upper.percentile);
    }
  }

  // 최하위 이하
  return 99.9;
}

// ============================================
// 한국 소득 순위 계산 (월 소득 기준 - 기존 API 유지)
// ============================================

export function calculateKoreaRank(
  salary: number,      // 월 소득 (원)
  region: Region = 'all'
): RankResult {
  // 월 소득을 연 소득으로 변환
  const annualSalary = salary * 12;

  // 지역별 보정 적용 (지역 소득 수준 차이 반영)
  const adjustmentFactor = REGION_ADJUSTMENT[region] || 1.0;
  const adjustedSalary = annualSalary / adjustmentFactor;

  // 백분위 계산
  const percentile = calculatePercentileFromAnnual(adjustedSalary);
  const description = getPercentileDescription(percentile);

  // 지역별 중위소득 계산
  const medianAnnual = INCOME_STATS_META.median * adjustmentFactor;
  const medianMonthly = Math.round(medianAnnual / 12);

  return {
    percentile: Math.round(percentile * 10) / 10,
    description,
    median: medianMonthly
  };
}

// ============================================
// 연령별 순위 계산
// ============================================

export function calculateAgeRank(
  salary: number,      // 월 소득 (원)
  ageGroup: AgeGroup
): RankResult | null {
  if (ageGroup === 'all') return null;

  // 월 소득을 연 소득으로 변환
  const annualSalary = salary * 12;

  // 연령대별 보정 적용
  const adjustmentFactor = AGE_ADJUSTMENT[ageGroup] || 1.0;
  const adjustedSalary = annualSalary / adjustmentFactor;

  // 백분위 계산
  const percentile = calculatePercentileFromAnnual(adjustedSalary);

  const ageLabels: Record<string, string> = {
    '20s': '20대',
    '30s': '30대',
    '40s': '40대',
    '50s': '50대',
    '60s': '60대'
  };

  // 연령대별 중위소득 계산
  const medianAnnual = INCOME_STATS_META.median * adjustmentFactor;
  const medianMonthly = Math.round(medianAnnual / 12);

  return {
    percentile: Math.round(percentile * 10) / 10,
    description: `${ageLabels[ageGroup]} 중위 소득: ${formatNumber(medianMonthly)}원`,
    median: medianMonthly,
    label: ageLabels[ageGroup]
  };
}

// ============================================
// 세계 소득 순위 계산
// ============================================

export function calculateWorldRank(salary: number): RankResult {
  const worldMedian = 1500000; // 세계 중위 소득 상향 조정 (PPP 반영)

  let percentile: number;

  if (salary >= 30000000) {
    percentile = 0.1;
  } else if (salary >= 15000000) {
    percentile = 0.5;
  } else if (salary >= 10000000) {
    percentile = 1;
  } else if (salary >= 7000000) {
    percentile = 5;
  } else if (salary >= 5000000) {
    percentile = 10;
  } else if (salary >= 3000000) {
    percentile = 20;
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
// 퍼센타일 설명 생성
// ============================================

function getPercentileDescription(percentile: number): string {
  if (percentile <= 1) {
    return '최상위권 연봉이시네요! 자산 관리도 그만큼 잘하고 계신가요?';
  } else if (percentile <= 5) {
    return '상위 5% 이내! 대단한 성과입니다';
  } else if (percentile <= 7) {
    return '억대 연봉! 상위 7% 이내입니다';
  } else if (percentile <= 10) {
    return '상위 10% 이내! 훌륭한 소득 수준입니다';
  } else if (percentile <= 20) {
    return '상위 20% 이내! 안정적인 고소득자입니다';
  } else if (percentile <= 30) {
    return '상위 30% 이내! 평균 이상의 소득입니다';
  } else if (percentile <= 50) {
    return '중위권 이상! 안정적인 소득입니다';
  } else if (percentile <= 70) {
    return '평균 수준의 소득입니다';
  } else {
    return '성장 가능성이 있습니다. 화이팅!';
  }
}

// ============================================
// 레거시 호환용 퍼센타일 계산 (PercentileData 사용)
// ============================================

export function calculatePercentile(salary: number, data: PercentileData): number {
  if (salary >= data.p99) {
    const excess = (salary - data.p99) / data.p99;
    return Math.max(1 - excess * 0.5, 0.1);
  } else if (salary >= data.p95) {
    const ratio = (salary - data.p95) / (data.p99 - data.p95);
    return 5 - ratio * 4;
  } else if (salary >= data.p90) {
    const ratio = (salary - data.p90) / (data.p95 - data.p90);
    return 10 - ratio * 5;
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
    return Math.min(90 + deficit * 10, 99.9);
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
// 세후 → 세전 변환 (역산)
// ============================================

export function convertAfterToBefore(afterTax: number): number {
  // 이진 탐색으로 근사값 찾기
  let low = afterTax;
  let high = afterTax * 2; // 세금이 50%를 넘지 않는다고 가정
  let mid = 0;
  let calculatedAfter = 0;

  // 100원 단위 오차 허용
  while (high - low > 100) {
    mid = Math.floor((low + high) / 2);
    calculatedAfter = convertBeforeToAfter(mid);

    if (calculatedAfter < afterTax) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return high;
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

// ============================================
// 통계 메타데이터 export
// ============================================

export { INCOME_STATS_META };
