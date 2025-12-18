import type { RankResult, PercentileData, Region, AgeGroup } from '@/types';

// ============================================
// 통계 데이터 (2024년 기준)
// ============================================

// ============================================
// 통계 데이터 (2024년 추정치 반영)
// ============================================

const KOREA_STATISTICS = {
  // 단위: 월 소득 (원)
  // p10: 하위 10%, p99: 상위 1%
  all: {
    p10: 1500000,
    p25: 2200000,
    p50: 3000000, // 중위소득 약 300만원 (연 3600)
    p75: 5000000, // 상위 25% 약 500만원 (연 6000)
    p90: 8300000, // 상위 10% 약 830만원 (연 1억)
    p95: 11000000, // 상위 5% 약 1100만원 (연 1.3억)
    p99: 27000000  // 상위 1% 약 2700만원 (연 3.2억)
  },
  seoul: {
    p10: 1800000, p25: 2600000, p50: 3600000, p75: 5800000, p90: 9200000, p95: 13000000, p99: 32000000
  },
  metro: {
    p10: 1600000, p25: 2400000, p50: 3300000, p75: 5400000, p90: 8800000, p95: 12000000, p99: 29000000
  },
  other: {
    p10: 1400000, p25: 2000000, p50: 2700000, p75: 4500000, p90: 7500000, p95: 10000000, p99: 24000000
  }
};

const AGE_STATISTICS = {
  '20s': { p10: 1500000, p25: 2000000, p50: 2500000, p75: 3200000, p90: 4500000, p95: 5500000, p99: 8000000 },
  '30s': { p10: 2000000, p25: 2800000, p50: 3600000, p75: 5000000, p90: 7000000, p95: 9000000, p99: 15000000 },
  '40s': { p10: 2200000, p25: 3000000, p50: 4200000, p75: 6500000, p90: 9500000, p95: 13000000, p99: 25000000 },
  '50s': { p10: 2000000, p25: 2800000, p50: 4000000, p75: 6000000, p90: 9000000, p95: 12000000, p99: 23000000 },
  '60s': { p10: 1200000, p25: 1800000, p50: 2800000, p75: 4500000, p90: 7000000, p95: 9500000, p99: 18000000 }
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
    '50s': '50대',
    '60s': '60대'
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
// 퍼센타일 계산 (공통 로직)
// ============================================

function calculatePercentile(salary: number, data: PercentileData): number {
  if (salary >= data.p99) {
    const excess = (salary - data.p99) / data.p99;
    return Math.max(1 - excess * 0.5, 0.1); // 상위 1% 이내
  } else if (salary >= data.p95) {
    const ratio = (salary - data.p95) / (data.p99 - data.p95);
    return 5 - ratio * 4; // 1% ~ 5%
  } else if (salary >= data.p90) {
    const ratio = (salary - data.p90) / (data.p95 - data.p90);
    return 10 - ratio * 5; // 5% ~ 10%
  } else if (salary >= data.p75) {
    const ratio = (salary - data.p75) / (data.p90 - data.p75);
    return 25 - ratio * 15; // 10% ~ 25%
  } else if (salary >= data.p50) {
    const ratio = (salary - data.p50) / (data.p75 - data.p50);
    return 50 - ratio * 25; // 25% ~ 50%
  } else if (salary >= data.p25) {
    const ratio = (salary - data.p25) / (data.p50 - data.p25);
    return 75 - ratio * 25; // 50% ~ 75%
  } else if (salary >= data.p10) {
    const ratio = (salary - data.p10) / (data.p25 - data.p10);
    return 90 - ratio * 15; // 75% ~ 90%
  } else {
    const deficit = (data.p10 - salary) / data.p10;
    return Math.min(90 + deficit * 10, 99.9); // 90% ~
  }
}

// ============================================
// 퍼센타일 설명 생성
// ============================================

function getPercentileDescription(percentile: number): string {
  if (percentile <= 1) {
    return '대한민국 상위 1%! 신의 경지입니다 👑';
  } else if (percentile <= 5) {
    return '대한민국 상위 5%! 놀라운 성과입니다 🌟';
  } else if (percentile <= 10) {
    return '대한민국 상위 10%! 억대 연봉 클럽 🏆';
  } else if (percentile <= 25) {
    return '상위 25% 이내! 성공적인 커리어입니다 ⭐';
  } else if (percentile <= 50) {
    return '중위권 이상! 안정적인 소득입니다 👍';
  } else if (percentile <= 75) {
    return '평균 수준입니다. 더 높은 곳을 향해! 💼';
  } else {
    return '성장 잠재력이 무한합니다! 화이팅! 💪';
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
