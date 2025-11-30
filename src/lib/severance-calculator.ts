import type { SeveranceInput, SeveranceResult } from '@/types'

export function calculateSeverance(input: SeveranceInput): SeveranceResult {
  const { startDate, endDate, averageSalary } = input

  // 근속일수 계산
  const start = new Date(startDate)
  const end = new Date(endDate)
  const workingDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  const workingYears = workingDays / 365

  // 퇴직금 계산 (1년 이상 근무 시)
  let severancePay = 0
  if (workingDays >= 365) {
    // 퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365)
    const dailyAverage = averageSalary / 30
    severancePay = dailyAverage * 30 * (workingDays / 365)
  }

  // 퇴직소득세 계산 (간이)
  const severanceTax = calculateSeveranceTax(severancePay, workingYears)
  const netSeverance = severancePay - severanceTax

  return {
    workingDays,
    workingYears: Math.floor(workingYears * 10) / 10,
    severancePay: Math.round(severancePay),
    severanceTax: Math.round(severanceTax),
    netSeverance: Math.round(netSeverance)
  }
}

function calculateSeveranceTax(amount: number, years: number): number {
  // 근속연수공제
  const yearlyDeduction = years <= 5 ? 300000 : years <= 10 ? 500000 : years <= 20 ? 700000 : 1000000
  const serviceDeduction = yearlyDeduction * Math.min(years, 20)

  // 과세표준
  const taxableAmount = Math.max((amount - serviceDeduction) / 12, 0)

  // 세율 적용
  const brackets = [
    { limit: 12000000, rate: 0.06, deduction: 0 },
    { limit: 46000000, rate: 0.15, deduction: 1080000 },
    { limit: 88000000, rate: 0.24, deduction: 5220000 },
    { limit: 150000000, rate: 0.35, deduction: 14900000 },
    { limit: Infinity, rate: 0.38, deduction: 19400000 }
  ]

  const bracket = brackets.find(b => taxableAmount <= b.limit)!
  const yearlyTax = Math.max(taxableAmount * bracket.rate - bracket.deduction, 0)

  // 퇴직소득세액공제 (최대 1.2억)
  const taxCredit = Math.min(yearlyTax * 0.45, 120000000)

  return Math.max((yearlyTax - taxCredit) * 12, 0)
}
