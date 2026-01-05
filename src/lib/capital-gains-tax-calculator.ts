/**
 * 양도소득세 계산기 라이브러리
 * 2026년 기준 부동산 양도소득세 계산
 */

export interface CapitalGainsTaxInput {
  acquisitionPrice: number;     // 취득가액 (원)
  transferPrice: number;        // 양도가액 (원)
  acquisitionExpense: number;   // 취득비용 (취득세, 중개수수료 등)
  transferExpense: number;      // 양도비용 (중개수수료 등)
  holdingPeriod: number;        // 보유 기간 (년)
  isMultipleHomes: boolean;     // 다주택 여부
  isLongTerm: boolean;          // 장기보유특별공제 적용 여부
}

export interface CapitalGainsTaxResult {
  transferIncome: number;       // 양도차익
  deductions: number;           // 공제액 (장기보유특별공제)
  taxableIncome: number;        // 과세표준
  calculatedTax: number;        // 산출세액
  basicDeduction: number;       // 기본공제 (250만원)
  finalTax: number;             // 결정세액
  effectiveTaxRate: number;     // 실효세율 (%)
  netProfit: number;            // 실제 수익 (양도차익 - 세금)
}

// 2026년 기준 양도소득세율 (누진세율)
const TAX_BRACKETS = [
  { limit: 14000000, rate: 0.06 },
  { limit: 50000000, rate: 0.15 },
  { limit: 88000000, rate: 0.24 },
  { limit: 150000000, rate: 0.35 },
  { limit: 300000000, rate: 0.38 },
  { limit: 500000000, rate: 0.40 },
  { limit: 1000000000, rate: 0.42 },
  { limit: Infinity, rate: 0.45 }
];

// 장기보유특별공제율 (3년 이상 보유 시)
function getLongTermDeductionRate(years: number): number {
  if (years < 3) return 0;
  if (years < 4) return 0.24;  // 3년: 24%
  if (years < 5) return 0.32;  // 4년: 32%
  if (years < 6) return 0.40;  // 5년: 40%
  if (years < 7) return 0.48;  // 6년: 48%
  if (years < 8) return 0.56;  // 7년: 56%
  if (years < 9) return 0.64;  // 8년: 64%
  if (years < 10) return 0.72; // 9년: 72%
  return 0.80;                 // 10년 이상: 80%
}

/**
 * 양도소득세 계산
 */
export function calculateCapitalGainsTax(
  input: CapitalGainsTaxInput
): CapitalGainsTaxResult {
  const {
    acquisitionPrice,
    transferPrice,
    acquisitionExpense,
    transferExpense,
    holdingPeriod,
    isMultipleHomes,
    isLongTerm
  } = input;

  // 양도차익 = 양도가액 - (취득가액 + 취득비용 + 양도비용)
  const transferIncome =
    transferPrice - (acquisitionPrice + acquisitionExpense + transferExpense);

  // 장기보유특별공제
  let deductions = 0;
  if (isLongTerm && !isMultipleHomes) {
    const deductionRate = getLongTermDeductionRate(holdingPeriod);
    deductions = transferIncome * deductionRate;
  }

  // 기본공제 (연 250만원)
  const basicDeduction = 2500000;

  // 과세표준 = 양도차익 - 장기보유특별공제 - 기본공제
  const taxableIncome = Math.max(
    0,
    transferIncome - deductions - basicDeduction
  );

  // 산출세액 계산 (누진세율 적용)
  let calculatedTax = 0;
  let remainingIncome = taxableIncome;
  let previousLimit = 0;

  // 다주택자 중과세 (간이 적용: 기본 세율에 +20%p)
  const taxMultiplier = isMultipleHomes ? 1.2 : 1.0;

  for (const bracket of TAX_BRACKETS) {
    const taxableAmount = Math.min(
      remainingIncome,
      bracket.limit - previousLimit
    );

    if (taxableAmount <= 0) break;

    const tax = taxableAmount * bracket.rate * taxMultiplier;
    calculatedTax += tax;

    remainingIncome -= taxableAmount;
    previousLimit = bracket.limit;

    if (remainingIncome <= 0) break;
  }

  // 결정세액
  const finalTax = Math.round(calculatedTax / 10) * 10; // 10원 단위 절사

  // 실효세율
  const effectiveTaxRate =
    transferIncome > 0 ? (finalTax / transferIncome) * 100 : 0;

  // 실제 수익
  const netProfit = transferIncome - finalTax;

  return {
    transferIncome,
    deductions,
    taxableIncome,
    calculatedTax,
    basicDeduction,
    finalTax,
    effectiveTaxRate,
    netProfit
  };
}

/**
 * 세금 부담 평가
 */
export function getTaxBurdenEvaluation(effectiveTaxRate: number): string {
  if (effectiveTaxRate <= 10) return '✅ 낮은 세금 부담';
  if (effectiveTaxRate <= 20) return '⚠️ 보통 세금 부담';
  if (effectiveTaxRate <= 35) return '⚠️ 높은 세금 부담';
  return '🚨 매우 높은 세금 부담';
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
