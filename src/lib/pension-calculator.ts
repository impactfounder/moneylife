/**
 * 연금 계산기 라이브러리
 * 2026년 기준 국민연금 예상 수령액 계산
 */

export interface PensionInput {
  currentAge: number;           // 현재 나이
  averageMonthlyIncome: number; // 평균 월소득 (원)
  joinedYears: number;          // 가입 기간 (년)
  expectedRetirementAge: number;// 예상 은퇴 나이
}

export interface PensionResult {
  expectedMonthlyPension: number;      // 예상 월 연금 수령액
  totalContribution: number;           // 총 납부 예상액
  totalLifetimeReceive: number;        // 평균 수명까지 총 수령액 (85세 기준)
  breakEvenAge: number;                // 손익분기 나이
  contributionRate: number;            // 연금 보험료율 (%)
  monthlyContribution: number;         // 월 납부액
}

const PENSION_RATE = 0.095; // 국민연금 보험료율 9.5% (2026년 기준, 2033년까지 매년 0.5%p 인상)
const AVERAGE_LIFE_EXPECTANCY = 85; // 평균 수명
const REPLACEMENT_RATE = 0.40; // 소득대체율 40% (2026년 기준)

/**
 * 국민연금 예상 수령액 계산
 */
export function calculatePension(input: PensionInput): PensionResult {
  const {
    currentAge,
    averageMonthlyIncome,
    joinedYears,
    expectedRetirementAge
  } = input;

  // 월 납부액 (소득의 9.5%, 본인 4.75% + 회사 4.75%)
  const monthlyContribution = averageMonthlyIncome * PENSION_RATE;

  // 총 납부 예상액
  const remainingYears = Math.max(0, expectedRetirementAge - currentAge);
  const totalMonths = (joinedYears + remainingYears) * 12;
  const totalContribution = monthlyContribution * totalMonths;

  // 예상 월 연금 수령액 (단순 계산식)
  // 실제 국민연금은 A값, B값 등 복잡한 공식이 있지만 여기서는 단순화
  const basicPension = averageMonthlyIncome * REPLACEMENT_RATE;
  const yearFactor = Math.min((joinedYears + remainingYears) / 40, 1); // 최대 40년 가입 기준
  const expectedMonthlyPension = basicPension * yearFactor;

  // 평균 수명까지 총 수령액
  const receivingYears = AVERAGE_LIFE_EXPECTANCY - expectedRetirementAge;
  const totalLifetimeReceive = expectedMonthlyPension * 12 * receivingYears;

  // 손익분기 나이 (납부액 = 수령액)
  const breakEvenMonths = Math.ceil(totalContribution / expectedMonthlyPension);
  const breakEvenAge = expectedRetirementAge + Math.floor(breakEvenMonths / 12);

  return {
    expectedMonthlyPension,
    totalContribution,
    totalLifetimeReceive,
    breakEvenAge,
    contributionRate: PENSION_RATE * 100,
    monthlyContribution
  };
}

/**
 * 연금 수령액 평가
 */
export function getPensionEvaluation(monthlyPension: number): string {
  if (monthlyPension >= 2000000) return '✅ 매우 안정적인 노후 준비';
  if (monthlyPension >= 1500000) return '✅ 안정적인 노후 준비';
  if (monthlyPension >= 1000000) return '⚠️ 보통 수준의 노후 준비';
  if (monthlyPension >= 500000) return '⚠️ 추가 노후 대비 필요';
  return '🚨 적극적인 노후 대비 필요';
}

/**
 * 숫자를 통화 형식으로 변환
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0
  }).format(value);
}
