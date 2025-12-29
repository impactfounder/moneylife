/**
 * 2026년 미래 기준 대출 정책
 * 국토교통부 주택시장 안정대책 및 금융위 스트레스 DSR 가이드라인 기반
 */

// ============================================
// 지역 유형 정의 (국토부 기준)
// ============================================
export type RegionType =
  | 'speculation'   // 투기과열지구 (강남/서초/송파/용산)
  | 'regulated'     // 조정대상지역 (서울 기타, 수도권 과밀억제권역)
  | 'non_regulated' // 비규제지역
  | 'first_home';   // 생애최초 주택구입 특례

export type BorrowerType =
  | 'single_home'   // 무주택/1주택자
  | 'multi_home';   // 다주택자

export type RateType =
  | 'fixed'         // 고정금리
  | 'variable'      // 변동금리
  | 'mixed_5y'      // 혼합형 (5년 고정 후 변동)
  | 'periodic';     // 주기형 (금리 조정 주기)

// ============================================
// 2026년 공식 규제 매트릭스 (국토부 기준)
// ============================================
export interface RegulationMatrix {
  ltv: number;        // LTV 한도 (%)
  dti: number;        // DTI 한도 (%)
  dsr: number;        // DSR 한도 (%)
  maxLoanCap?: number; // 대출 최대한도 (원), 생애최초 등 특례용
  description: string;
}

export const REGULATION_2026: Record<RegionType, Record<BorrowerType, RegulationMatrix>> = {
  // 투기과열지구 (강남/서초/송파/용산)
  speculation: {
    single_home: {
      ltv: 50,
      dti: 40,
      dsr: 40,
      description: '투기과열지구 (강남/서초/송파/용산)',
    },
    multi_home: {
      ltv: 0,  // 다주택자 대출 불가
      dti: 0,
      dsr: 0,
      description: '투기과열지구 다주택자 - 대출 불가',
    },
  },
  // 조정대상지역 (서울 기타, 수도권 과밀억제권역)
  regulated: {
    single_home: {
      ltv: 60,
      dti: 50,
      dsr: 40,
      description: '조정대상지역 (서울 기타/수도권 과밀억제권역)',
    },
    multi_home: {
      ltv: 0,  // 다주택자 대출 불가
      dti: 0,
      dsr: 0,
      description: '조정대상지역 다주택자 - 대출 불가',
    },
  },
  // 비규제지역
  non_regulated: {
    single_home: {
      ltv: 70,
      dti: 60,
      dsr: 40,
      description: '비규제지역',
    },
    multi_home: {
      ltv: 60,
      dti: 50,
      dsr: 40,
      description: '비규제지역 다주택자',
    },
  },
  // 생애최초 주택구입 특례
  first_home: {
    single_home: {
      ltv: 80,
      dti: 60,
      dsr: 40,
      maxLoanCap: 600000000, // 6억 원 한도
      description: '생애최초 주택구입 특례 (최대 6억 원)',
    },
    multi_home: {
      ltv: 0,  // 해당 없음 (생애최초는 무주택자만)
      dti: 0,
      dsr: 0,
      description: '해당 없음',
    },
  },
};

// ============================================
// 2026년 스트레스 DSR 3단계 (100% 반영)
// ============================================
export interface StressRateConfig {
  baseStress: number;     // 기본 가산 금리 (%p)
  maxStress: number;      // 최대 가산 금리 (%p)
  description: string;
}

export const STRESS_RATE_2026: Record<RateType, StressRateConfig> = {
  fixed: {
    baseStress: 0,
    maxStress: 0,
    description: '고정금리 - 스트레스 가산 없음',
  },
  variable: {
    baseStress: 1.5,
    maxStress: 3.0,  // 한국은행 가이드라인 중 가장 보수적인 값
    description: '변동금리 - 최대 3.0%p 가산',
  },
  mixed_5y: {
    baseStress: 0.75,
    maxStress: 1.5,
    description: '혼합형(5년) - 최대 1.5%p 가산',
  },
  periodic: {
    baseStress: 0.375,
    maxStress: 0.75,
    description: '주기형 - 최대 0.75%p 가산',
  },
};

// DSR 적용률 (2026년 3단계: 100%)
export const DSR_STRESS_APPLICATION_RATE = 1.0; // 100% 반영

// ============================================
// 대출 한도 계산 입력/결과 인터페이스
// ============================================
export interface LoanLimitInput {
  propertyValue: number;       // 주택 가격 (원)
  annualIncome: number;        // 연 소득 (원)
  existingDebtPayment: number; // 기존 대출 연 상환액 (원)
  loanPeriodMonths: number;    // 대출 기간 (개월)
  interestRate: number;        // 기본 금리 (%)
  regionType: RegionType;      // 지역 유형
  borrowerType: BorrowerType;  // 차주 유형
  rateType: RateType;          // 금리 유형
}

export interface LoanLimitResult {
  // 각 규제별 한도
  ltvLimit: number;            // LTV 기준 한도 (원)
  dtiLimit: number;            // DTI 기준 한도 (원)
  dsrLimit: number;            // 스트레스 DSR 기준 한도 (원)

  // 최종 한도 (MIN 적용)
  finalLimit: number;          // 최종 대출 가능 한도 (원)
  bottleneck: 'ltv' | 'dti' | 'dsr' | 'cap' | 'blocked'; // 제약 조건

  // 적용된 규제 정보
  appliedLTV: number;
  appliedDTI: number;
  appliedDSR: number;
  stressRate: number;          // 적용된 스트레스 금리 (%p)
  effectiveRate: number;       // 실효 금리 (기본금리 + 스트레스금리)

  // 상세 정보
  regionDescription: string;
  rateDescription: string;
  monthlyPayment: number;      // 예상 월 상환액 (원)
  dsrRatio: number;            // 산출 DSR (%)

  // 비교용 (고정금리 선택 시)
  fixedRateLimit?: number;     // 고정금리 선택 시 한도

  // 경고 메시지
  warnings: string[];
}

// ============================================
// 핵심 계산 함수들
// ============================================

/**
 * 월 상환액 계산 (원리금균등상환)
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;
  if (annualRate <= 0) return principal / months;

  const monthlyRate = annualRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

/**
 * 월 상환액으로부터 대출 한도 역산
 */
export function calculateLoanFromPayment(
  monthlyPayment: number,
  annualRate: number,
  months: number
): number {
  if (monthlyPayment <= 0 || months <= 0) return 0;
  if (annualRate <= 0) return monthlyPayment * months;

  const monthlyRate = annualRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, months);
  return monthlyPayment * (factor - 1) / (monthlyRate * factor);
}

/**
 * 2026년 미래 기준 대출 한도 계산 (핵심 함수)
 */
export function calculateLoanLimit2026(input: LoanLimitInput): LoanLimitResult {
  const {
    propertyValue,
    annualIncome,
    existingDebtPayment,
    loanPeriodMonths,
    interestRate,
    regionType,
    borrowerType,
    rateType,
  } = input;

  const warnings: string[] = [];

  // 1. 규제 매트릭스 조회
  const regulation = REGULATION_2026[regionType][borrowerType];
  const stressConfig = STRESS_RATE_2026[rateType];

  // 다주택자 대출 불가 체크
  if (regulation.ltv === 0) {
    return {
      ltvLimit: 0,
      dtiLimit: 0,
      dsrLimit: 0,
      finalLimit: 0,
      bottleneck: 'blocked',
      appliedLTV: 0,
      appliedDTI: 0,
      appliedDSR: 0,
      stressRate: 0,
      effectiveRate: interestRate,
      regionDescription: regulation.description,
      rateDescription: stressConfig.description,
      monthlyPayment: 0,
      dsrRatio: 0,
      warnings: ['다주택자는 해당 지역에서 주택담보대출이 불가합니다.'],
    };
  }

  // 2. LTV 기준 한도
  let ltvLimit = Math.round(propertyValue * regulation.ltv / 100);

  // 3. DTI 기준 한도 (연 소득 대비 연 원리금 상환액)
  const maxAnnualPaymentDTI = annualIncome * regulation.dti / 100;
  const maxMonthlyPaymentDTI = maxAnnualPaymentDTI / 12;
  const dtiLimit = Math.round(calculateLoanFromPayment(maxMonthlyPaymentDTI, interestRate, loanPeriodMonths));

  // 4. 스트레스 DSR 기준 한도 (2026년 3단계: 100% 반영, 보수적 가산 적용)
  const stressRate = stressConfig.maxStress * DSR_STRESS_APPLICATION_RATE;
  const effectiveRate = interestRate + stressRate;

  // DSR 계산: (신규대출 연 상환액 + 기존대출 연 상환액) / 연 소득 <= 40%
  const maxTotalAnnualPayment = annualIncome * regulation.dsr / 100;
  const availableAnnualPayment = maxTotalAnnualPayment - existingDebtPayment;

  let dsrLimit = 0;
  if (availableAnnualPayment > 0) {
    const availableMonthlyPayment = availableAnnualPayment / 12;
    dsrLimit = Math.round(calculateLoanFromPayment(availableMonthlyPayment, effectiveRate, loanPeriodMonths));
  } else {
    warnings.push('기존 대출 상환액이 DSR 한도를 초과합니다. 추가 대출이 어렵습니다.');
  }

  // 5. 생애최초 특례 CAP 적용
  let capLimit = Infinity;
  if (regulation.maxLoanCap) {
    capLimit = regulation.maxLoanCap;
    ltvLimit = Math.min(ltvLimit, capLimit);
  }

  // 6. 최종 한도 결정 (MIN)
  type LimitType = 'ltv' | 'dti' | 'dsr' | 'cap';
  const limits: { type: LimitType; value: number }[] = [
    { type: 'ltv', value: ltvLimit },
    { type: 'dti', value: dtiLimit },
    { type: 'dsr', value: dsrLimit },
  ];

  if (regulation.maxLoanCap) {
    limits.push({ type: 'cap', value: capLimit });
  }

  const minLimit = limits.reduce((min, curr) =>
    curr.value < min.value ? curr : min
  );

  const finalLimit = Math.max(minLimit.value, 0);

  // 7. 예상 월 상환액 및 DSR 계산
  const monthlyPayment = calculateMonthlyPayment(finalLimit, effectiveRate, loanPeriodMonths);
  const dsrRatio = annualIncome > 0
    ? ((monthlyPayment * 12 + existingDebtPayment) / annualIncome) * 100
    : 0;

  // 8. 고정금리 선택 시 한도 비교 (변동금리인 경우에만)
  let fixedRateLimit: number | undefined;
  if (rateType === 'variable' || rateType === 'mixed_5y' || rateType === 'periodic') {
    const fixedAvailableMonthlyPayment = availableAnnualPayment / 12;
    fixedRateLimit = Math.round(calculateLoanFromPayment(fixedAvailableMonthlyPayment, interestRate, loanPeriodMonths));
    fixedRateLimit = Math.min(fixedRateLimit, ltvLimit, dtiLimit);
    if (regulation.maxLoanCap) {
      fixedRateLimit = Math.min(fixedRateLimit, capLimit);
    }
  }

  // 9. 경고 메시지 추가
  if (dsrRatio > 35) {
    warnings.push('DSR이 35%를 초과하여 일부 금융기관에서 추가 심사가 필요할 수 있습니다.');
  }
  if (stressRate > 0) {
    warnings.push(`변동금리 선택으로 스트레스 금리 ${stressRate}%p가 가산되었습니다.`);
  }
  if (regionType === 'speculation') {
    warnings.push('투기과열지구는 가장 강력한 대출 규제가 적용됩니다.');
  }

  return {
    ltvLimit,
    dtiLimit,
    dsrLimit,
    finalLimit,
    bottleneck: minLimit.type,
    appliedLTV: regulation.ltv,
    appliedDTI: regulation.dti,
    appliedDSR: regulation.dsr,
    stressRate,
    effectiveRate,
    regionDescription: regulation.description,
    rateDescription: stressConfig.description,
    monthlyPayment: Math.round(monthlyPayment),
    dsrRatio: Math.round(dsrRatio * 100) / 100,
    fixedRateLimit,
    warnings,
  };
}

/**
 * 금리 유형별 시나리오 비교
 */
export function compareRateScenarios(
  baseInput: Omit<LoanLimitInput, 'rateType'>
): Record<RateType, LoanLimitResult> {
  const rateTypes: RateType[] = ['fixed', 'variable', 'mixed_5y', 'periodic'];
  const results: Record<string, LoanLimitResult> = {};

  for (const rateType of rateTypes) {
    results[rateType] = calculateLoanLimit2026({ ...baseInput, rateType });
  }

  return results as Record<RateType, LoanLimitResult>;
}

/**
 * 지역 유형 정보 반환
 */
export function getRegionInfo() {
  return {
    speculation: {
      label: '투기과열지구',
      description: '강남구, 서초구, 송파구, 용산구',
      ltv: REGULATION_2026.speculation.single_home.ltv,
    },
    regulated: {
      label: '조정대상지역',
      description: '서울 기타, 수도권 과밀억제권역',
      ltv: REGULATION_2026.regulated.single_home.ltv,
    },
    non_regulated: {
      label: '비규제지역',
      description: '그 외 지역',
      ltv: REGULATION_2026.non_regulated.single_home.ltv,
    },
    first_home: {
      label: '생애최초 주택구입',
      description: '무주택자 생애 첫 주택 구입 (최대 6억)',
      ltv: REGULATION_2026.first_home.single_home.ltv,
    },
  };
}

/**
 * 금리 유형 정보 반환
 */
export function getRateTypeInfo() {
  return {
    fixed: {
      label: '고정금리',
      description: '대출 기간 전체 금리 고정',
      stressRate: STRESS_RATE_2026.fixed.maxStress,
      recommendation: '금리 상승 우려 시 추천',
    },
    variable: {
      label: '변동금리',
      description: '시장 금리에 따라 변동',
      stressRate: STRESS_RATE_2026.variable.maxStress,
      recommendation: '초기 금리는 낮지만 대출 한도 감소',
    },
    mixed_5y: {
      label: '혼합형 (5년)',
      description: '5년간 고정 후 변동',
      stressRate: STRESS_RATE_2026.mixed_5y.maxStress,
      recommendation: '균형잡힌 선택',
    },
    periodic: {
      label: '주기형',
      description: '일정 주기로 금리 조정',
      stressRate: STRESS_RATE_2026.periodic.maxStress,
      recommendation: '변동금리보다 안정적',
    },
  };
}
