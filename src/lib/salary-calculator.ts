import type { SalaryInput, SalaryResult } from '@/types'

// 비과세 한도 (2025년 기준)
const TAX_EXEMPT_LIMITS = {
  mealAllowance: 200000,      // 식대 월 20만원
  carAllowance: 200000,       // 자가운전보조금 월 20만원
  childcareAllowance: 100000, // 육아수당 월 10만원
  researchAllowance: Infinity, // 연구활동비 (별도 한도 없음, 실비정산)
  otherExempt: Infinity,      // 기타 비과세
}

// 세율 구간 정보
const TAX_BRACKETS = [
  { limit: 14000000, rate: 0.06, deduction: 0, label: '6%' },
  { limit: 50000000, rate: 0.15, deduction: 1260000, label: '15%' },
  { limit: 88000000, rate: 0.24, deduction: 5760000, label: '24%' },
  { limit: 150000000, rate: 0.35, deduction: 15440000, label: '35%' },
  { limit: 300000000, rate: 0.38, deduction: 19940000, label: '38%' },
  { limit: 500000000, rate: 0.40, deduction: 25940000, label: '40%' },
  { limit: 1000000000, rate: 0.42, deduction: 35940000, label: '42%' },
  { limit: Infinity, rate: 0.45, deduction: 65940000, label: '45%' },
]

/**
 * 급여 계산 로직 (2025년 기준) - 고도화 버전
 */
export function calculateSalary(input: SalaryInput): SalaryResult {
  const { grossSalary, dependents = 0, childrenUnder20 = 0, taxExempt, incentive } = input

  // 비과세 금액 계산 (한도 적용)
  let monthlyTaxExempt = 0
  if (taxExempt) {
    monthlyTaxExempt =
      Math.min(taxExempt.mealAllowance || 0, TAX_EXEMPT_LIMITS.mealAllowance) +
      Math.min(taxExempt.carAllowance || 0, TAX_EXEMPT_LIMITS.carAllowance) +
      Math.min(taxExempt.childcareAllowance || 0, TAX_EXEMPT_LIMITS.childcareAllowance) +
      (taxExempt.researchAllowance || 0) +
      (taxExempt.otherExempt || 0)
  }

  // 과세 대상 급여 (총 급여 - 비과세)
  const taxableGrossSalary = Math.max(grossSalary - monthlyTaxExempt, 0)

  // 4대보험 계산 (과세 급여 기준)
  const nationalPension = Math.min(taxableGrossSalary * 0.045, 265500) // 상한액 265,500원
  const healthInsurance = taxableGrossSalary * 0.03545
  const longTermCare = healthInsurance * 0.1295
  const employmentInsurance = taxableGrossSalary * 0.009

  // 연간 과세 급여
  const yearlyTaxableGross = taxableGrossSalary * 12

  // 소득세 계산 (연간 기준으로 계산 후 월 단위로 변환)
  const { tax: yearlyIncomeTax, bracket: baseBracket } = calculateIncomeTaxWithBracket(
    yearlyTaxableGross,
    dependents,
    childrenUnder20
  )
  const incomeTax = yearlyIncomeTax / 12
  const localIncomeTax = incomeTax * 0.1

  // 공제 합계
  const totalDeductions =
    nationalPension +
    healthInsurance +
    longTermCare +
    employmentInsurance +
    incomeTax +
    localIncomeTax

  // 실수령액 (비과세 포함)
  const netSalary = Math.round(grossSalary - totalDeductions)

  // 기본 결과
  const result: SalaryResult = {
    grossSalary,
    netSalary,
    nationalPension: Math.round(nationalPension),
    healthInsurance: Math.round(healthInsurance),
    longTermCare: Math.round(longTermCare),
    employmentInsurance: Math.round(employmentInsurance),
    incomeTax: Math.round(incomeTax),
    localIncomeTax: Math.round(localIncomeTax),
    totalDeductions: Math.round(totalDeductions),
    annualGross: Math.round((grossSalary * 12) / 10000),
    annualNet: Math.round((netSalary * 12) / 10000),
    taxExemptTotal: monthlyTaxExempt,
    taxableIncome: Math.round(taxableGrossSalary),
  }

  // 성과급 계산 (있는 경우)
  if (incentive && incentive.amount > 0) {
    const yearlyGrossWithIncentive = (grossSalary * 12) + incentive.amount
    const yearlyTaxableWithIncentive = (taxableGrossSalary * 12) + incentive.amount

    // 성과급 포함 소득세 계산
    const { tax: taxWithIncentive, bracket: newBracket } = calculateIncomeTaxWithBracket(
      yearlyTaxableWithIncentive,
      dependents,
      childrenUnder20
    )

    // 성과급으로 인한 추가 세금
    const incentiveTax = taxWithIncentive - yearlyIncomeTax
    const incentiveLocalTax = incentiveTax * 0.1

    // 성과급에 대한 4대보험 추가 (성과급도 4대보험 대상)
    const incentiveNationalPension = Math.min(incentive.amount * 0.045, 265500 * 12 - nationalPension * 12)
    const incentiveHealthInsurance = incentive.amount * 0.03545
    const incentiveLongTermCare = incentiveHealthInsurance * 0.1295
    const incentiveEmploymentInsurance = incentive.amount * 0.009

    const totalIncentiveDeduction =
      Math.max(incentiveNationalPension, 0) +
      incentiveHealthInsurance +
      incentiveLongTermCare +
      incentiveEmploymentInsurance +
      incentiveTax +
      incentiveLocalTax

    const incentiveNetAmount = incentive.amount - totalIncentiveDeduction

    // 연간 실수령액 (성과급 포함)
    const yearlyNetWithIncentive = (netSalary * 12) + incentiveNetAmount

    result.incentiveResult = {
      grossWithIncentive: Math.round(yearlyGrossWithIncentive / 10000),
      netWithIncentive: Math.round(yearlyNetWithIncentive / 10000),
      incentiveTax: Math.round(incentiveTax + incentiveLocalTax),
      incentiveNetAmount: Math.round(incentiveNetAmount),
      taxBracketChange: baseBracket !== newBracket ? {
        beforeBracket: baseBracket,
        afterBracket: newBracket,
        rateIncrease: TAX_BRACKETS.find(b => b.label === newBracket)!.rate -
                      TAX_BRACKETS.find(b => b.label === baseBracket)!.rate,
      } : undefined,
    }
  }

  return result
}

/**
 * 간이세액표 기반 소득세 계산 (세율 구간 정보 포함)
 */
function calculateIncomeTaxWithBracket(
  yearlyIncome: number,
  dependents: number,
  childrenUnder20: number
): { tax: number; bracket: string } {
  // 기본공제 (본인 포함)
  const totalDependents = dependents + 1
  const basicDeduction = totalDependents * 1500000

  // 자녀공제 (20세 이하)
  const childDeduction = childrenUnder20 * 1500000

  // 근로소득공제
  let earnedIncomeDeduction = 0
  if (yearlyIncome <= 5000000) {
    earnedIncomeDeduction = yearlyIncome * 0.7
  } else if (yearlyIncome <= 15000000) {
    earnedIncomeDeduction = 3500000 + (yearlyIncome - 5000000) * 0.4
  } else if (yearlyIncome <= 45000000) {
    earnedIncomeDeduction = 7500000 + (yearlyIncome - 15000000) * 0.15
  } else if (yearlyIncome <= 100000000) {
    earnedIncomeDeduction = 12000000 + (yearlyIncome - 45000000) * 0.05
  } else {
    earnedIncomeDeduction = 14750000 + (yearlyIncome - 100000000) * 0.02
  }
  earnedIncomeDeduction = Math.min(earnedIncomeDeduction, 20000000)

  // 과세표준
  const taxableIncome = Math.max(
    yearlyIncome - earnedIncomeDeduction - basicDeduction - childDeduction,
    0
  )

  // 세율 구간별 계산
  const bracket = TAX_BRACKETS.find((b) => taxableIncome <= b.limit)!
  const calculatedTax = taxableIncome * bracket.rate - bracket.deduction

  // 근로소득세액공제 (총급여 5,500만원 이하: 55% 공제)
  let taxCredit = 0
  if (yearlyIncome <= 55000000) {
    taxCredit = Math.min(calculatedTax * 0.55, 740000)
  } else if (yearlyIncome <= 70000000) {
    taxCredit = Math.max(740000 - (yearlyIncome - 55000000) * 0.5, 660000)
  } else {
    taxCredit = Math.max(660000 - (yearlyIncome - 70000000) * 0.5, 500000)
  }

  const finalTax = Math.max(calculatedTax - taxCredit, 0)

  return {
    tax: Math.round(finalTax),
    bracket: bracket.label,
  }
}

/**
 * 간이세액표 기반 소득세 계산 (기존 함수 - 하위 호환성)
 */
function calculateSimplifiedIncomeTax(
  yearlyIncome: number,
  dependents: number,
  childrenUnder20: number
): number {
  return calculateIncomeTaxWithBracket(yearlyIncome, dependents, childrenUnder20).tax
}

/**
 * 역계산: 실수령액에서 세전 급여 추정
 */
export function estimateGrossSalary(netSalary: number): number {
  // 간단한 역산 공식 (평균 공제율 약 18%)
  const estimatedGross = netSalary / 0.82

  // 정확한 계산으로 재검증
  const result = calculateSalary({ grossSalary: estimatedGross, dependents: 0, childrenUnder20: 0 })

  if (Math.abs(result.netSalary - netSalary) < 10000) {
    return Math.round(estimatedGross)
  }

  // 이진 탐색으로 정확한 값 찾기
  let low = netSalary
  let high = netSalary * 1.5

  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2
    const testResult = calculateSalary({ grossSalary: mid, dependents: 0, childrenUnder20: 0 })

    if (Math.abs(testResult.netSalary - netSalary) < 1000) {
      return Math.round(mid)
    }

    if (testResult.netSalary < netSalary) {
      low = mid
    } else {
      high = mid
    }
  }

  return Math.round((low + high) / 2)
}

/**
 * 비과세 한도 정보 반환
 */
export function getTaxExemptLimits() {
  return TAX_EXEMPT_LIMITS
}

/**
 * 세율 구간 정보 반환
 */
export function getTaxBrackets() {
  return TAX_BRACKETS.map(b => ({
    limit: b.limit,
    rate: b.rate,
    label: b.label,
  }))
}
