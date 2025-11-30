/**
 * 종합소득세 계산기 라이브러리
 * 2025년 기준 종합소득세 계산
 */

export interface IncomeTaxInput {
  totalIncome: number;          // 총 소득 (원)
  deductions: {
    personalDeduction: number;  // 인적공제 (기본공제 150만원 x 인원)
    insurancePremium: number;   // 보험료 공제
    medicalExpense: number;     // 의료비 공제
    educationExpense: number;   // 교육비 공제
    donationExpense: number;    // 기부금 공제
    cardExpense: number;        // 신용카드 공제
  };
}

export interface IncomeTaxResult {
  totalIncome: number;          // 총 소득
  totalDeduction: number;       // 총 공제액
  taxableIncome: number;        // 과세표준
  calculatedTax: number;        // 산출세액
  taxDeduction: number;         // 세액공제
  finalTax: number;             // 결정세액
  effectiveTaxRate: number;     // 실효세율 (%)
  breakdown: TaxBreakdown[];    // 세율 구간별 상세
}

export interface TaxBreakdown {
  bracket: string;
  rate: number;
  taxableAmount: number;
  tax: number;
}

// 2025년 기준 종합소득세율 (누진세율)
const TAX_BRACKETS = [
  { limit: 14000000, rate: 0.06 },    // 1,400만원 이하: 6%
  { limit: 50000000, rate: 0.15 },    // 5,000만원 이하: 15%
  { limit: 88000000, rate: 0.24 },    // 8,800만원 이하: 24%
  { limit: 150000000, rate: 0.35 },   // 1억 5천만원 이하: 35%
  { limit: 300000000, rate: 0.38 },   // 3억원 이하: 38%
  { limit: 500000000, rate: 0.40 },   // 5억원 이하: 40%
  { limit: 1000000000, rate: 0.42 },  // 10억원 이하: 42%
  { limit: Infinity, rate: 0.45 }     // 10억원 초과: 45%
];

/**
 * 종합소득세 계산
 */
export function calculateIncomeTax(input: IncomeTaxInput): IncomeTaxResult {
  const { totalIncome, deductions } = input;

  // 총 공제액 계산
  const totalDeduction =
    deductions.personalDeduction +
    deductions.insurancePremium +
    deductions.medicalExpense +
    deductions.educationExpense +
    deductions.donationExpense +
    deductions.cardExpense;

  // 과세표준 (총 소득 - 공제액)
  const taxableIncome = Math.max(0, totalIncome - totalDeduction);

  // 산출세액 계산 (누진세율 적용)
  let calculatedTax = 0;
  let remainingIncome = taxableIncome;
  const breakdown: TaxBreakdown[] = [];
  let previousLimit = 0;

  for (const bracket of TAX_BRACKETS) {
    const taxableAmount = Math.min(
      remainingIncome,
      bracket.limit - previousLimit
    );

    if (taxableAmount <= 0) break;

    const tax = taxableAmount * bracket.rate;
    calculatedTax += tax;

    breakdown.push({
      bracket:
        bracket.limit === Infinity
          ? `${(previousLimit / 10000).toFixed(0)}만원 초과`
          : `${(previousLimit / 10000).toFixed(0)}만원 ~ ${(bracket.limit / 10000).toFixed(0)}만원`,
      rate: bracket.rate * 100,
      taxableAmount,
      tax
    });

    remainingIncome -= taxableAmount;
    previousLimit = bracket.limit;

    if (remainingIncome <= 0) break;
  }

  // 세액공제 (근로소득세액공제 등 단순화)
  const taxDeduction = Math.min(calculatedTax * 0.05, 500000); // 최대 50만원

  // 결정세액
  const finalTax = Math.max(0, calculatedTax - taxDeduction);

  // 실효세율
  const effectiveTaxRate = totalIncome > 0 ? (finalTax / totalIncome) * 100 : 0;

  return {
    totalIncome,
    totalDeduction,
    taxableIncome,
    calculatedTax,
    taxDeduction,
    finalTax,
    effectiveTaxRate,
    breakdown: breakdown.filter((b) => b.taxableAmount > 0)
  };
}

/**
 * 세금 부담 평가
 */
export function getTaxBurdenEvaluation(effectiveTaxRate: number): string {
  if (effectiveTaxRate <= 5) return '✅ 낮은 세금 부담';
  if (effectiveTaxRate <= 10) return '✅ 보통 세금 부담';
  if (effectiveTaxRate <= 20) return '⚠️ 높은 세금 부담';
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
