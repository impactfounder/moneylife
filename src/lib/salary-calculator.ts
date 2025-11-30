import type { SalaryInput, SalaryResult } from '@/types'

/**
 * 급여 계산 로직 (2025년 기준)
 */
export function calculateSalary(input: SalaryInput): SalaryResult {
  const { grossSalary, dependents = 0, childrenUnder20 = 0 } = input

  // 4대보험 계산
  const nationalPension = Math.min(grossSalary * 0.045, 265500) // 상한액 265,500원
  const healthInsurance = grossSalary * 0.03545
  const longTermCare = healthInsurance * 0.1295
  const employmentInsurance = grossSalary * 0.009

  // 과세표준 계산 (간이세액표 방식)
  const yearlyGross = grossSalary * 12
  const incomeTax = calculateSimplifiedIncomeTax(yearlyGross, dependents, childrenUnder20) / 12
  const localIncomeTax = incomeTax * 0.1

  // 공제 합계
  const totalDeductions =
    nationalPension +
    healthInsurance +
    longTermCare +
    employmentInsurance +
    incomeTax +
    localIncomeTax

  // 실수령액
  const netSalary = Math.round(grossSalary - totalDeductions)

  return {
    grossSalary,
    netSalary,
    nationalPension: Math.round(nationalPension),
    healthInsurance: Math.round(healthInsurance),
    longTermCare: Math.round(longTermCare),
    employmentInsurance: Math.round(employmentInsurance),
    incomeTax: Math.round(incomeTax),
    localIncomeTax: Math.round(localIncomeTax),
    totalDeductions: Math.round(totalDeductions),
    annualGross: Math.round(yearlyGross / 10000),
    annualNet: Math.round((netSalary * 12) / 10000),
  }
}

/**
 * 간이세액표 기반 소득세 계산
 */
function calculateSimplifiedIncomeTax(
  yearlyIncome: number,
  dependents: number,
  childrenUnder20: number
): number {
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
  const taxBrackets = [
    { limit: 14000000, rate: 0.06, deduction: 0 },
    { limit: 50000000, rate: 0.15, deduction: 1260000 },
    { limit: 88000000, rate: 0.24, deduction: 5760000 },
    { limit: 150000000, rate: 0.35, deduction: 15440000 },
    { limit: 300000000, rate: 0.38, deduction: 19940000 },
    { limit: 500000000, rate: 0.40, deduction: 25940000 },
    { limit: Infinity, rate: 0.45, deduction: 35940000 },
  ]

  const bracket = taxBrackets.find((b) => taxableIncome <= b.limit)!
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

  return Math.round(finalTax)
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
