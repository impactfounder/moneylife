import type {
  LoanInput,
  LoanResult,
  LoanScheduleItem,
  LoanRegion,
  DSRResult,
  LTVResult,
} from '@/types'

// 2025년 스트레스 금리 가산 기준
const STRESS_RATE_BY_TYPE = {
  fixed: 0,        // 고정금리: 가산 없음
  variable: 1.5,   // 변동금리: 1.5%p 가산
  mixed: 0.75,     // 혼합형 (5년 고정 후 변동): 0.75%p 가산
  periodic: 0.375, // 주기형 (금리 조정 주기): 0.375%p 가산
}

// 지역별 LTV 기준 (2025년 기준)
const LTV_BY_REGION: Record<LoanRegion, { base: number; firstHomeBonus: number; name: string }> = {
  gangnam: { base: 50, firstHomeBonus: 10, name: '투기과열지구 (강남/서초/송파/용산)' },
  seoul: { base: 50, firstHomeBonus: 10, name: '조정대상지역 (서울)' },
  metro: { base: 60, firstHomeBonus: 10, name: '조정대상지역 (수도권)' },
  other: { base: 70, firstHomeBonus: 10, name: '비규제지역' },
  custom: { base: 70, firstHomeBonus: 0, name: '직접 입력' },
}

// DSR 한도 (2025년 기준)
const DSR_LIMIT = 40 // 40%

export function calculateLoan(input: LoanInput): LoanResult {
  const { amount, interestRate, months, method } = input
  const monthlyRate = interestRate / 100 / 12

  let baseResult: LoanResult
  if (method === 'equal-principal-interest') {
    baseResult = calculateEqualPayment(amount, monthlyRate, months)
  } else {
    baseResult = calculateEqualPrincipal(amount, monthlyRate, months)
  }

  // 스트레스 DSR 계산 (연 소득이 있는 경우)
  if (input.annualIncome && input.annualIncome > 0) {
    baseResult.dsrResult = calculateStressDSR(input, baseResult.monthlyPayment)
  }

  // LTV 계산 (주택 가격이 있는 경우)
  if (input.propertyValue && input.propertyValue > 0 && input.region) {
    baseResult.ltvResult = calculateLTV(input)
  }

  return baseResult
}

// 원리금균등상환
function calculateEqualPayment(
  principal: number,
  monthlyRate: number,
  months: number
): LoanResult {
  // 금리가 0인 경우 처리
  if (monthlyRate === 0) {
    const monthlyPayment = principal / months
    const schedule: LoanScheduleItem[] = []
    let balance = principal

    for (let month = 1; month <= months; month++) {
      balance -= monthlyPayment
      schedule.push({
        month,
        principal: Math.round(monthlyPayment),
        interest: 0,
        payment: Math.round(monthlyPayment),
        balance: Math.round(Math.max(balance, 0)),
      })
    }

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(principal),
      totalInterest: 0,
      schedule,
    }
  }

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)

  const schedule: LoanScheduleItem[] = []
  let balance = principal

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate
    const principalPayment = monthlyPayment - interest
    balance -= principalPayment

    schedule.push({
      month,
      principal: Math.round(principalPayment),
      interest: Math.round(interest),
      payment: Math.round(monthlyPayment),
      balance: Math.round(Math.max(balance, 0)),
    })
  }

  const totalPayment = monthlyPayment * months
  const totalInterest = totalPayment - principal

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    schedule,
  }
}

// 원금균등상환
function calculateEqualPrincipal(
  principal: number,
  monthlyRate: number,
  months: number
): LoanResult {
  const principalPayment = principal / months
  const schedule: LoanScheduleItem[] = []
  let balance = principal
  let totalPayment = 0

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate
    const payment = principalPayment + interest
    balance -= principalPayment
    totalPayment += payment

    schedule.push({
      month,
      principal: Math.round(principalPayment),
      interest: Math.round(interest),
      payment: Math.round(payment),
      balance: Math.round(Math.max(balance, 0)),
    })
  }

  const totalInterest = totalPayment - principal

  return {
    monthlyPayment: Math.round(schedule[0].payment),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    schedule,
  }
}

/**
 * 스트레스 DSR 계산
 */
function calculateStressDSR(input: LoanInput, monthlyPayment: number): DSRResult {
  const {
    amount,
    interestRate,
    months,
    method,
    rateType = 'variable',
    annualIncome = 0,
    existingDebtPayment = 0,
  } = input

  // 스트레스 금리 가산
  const stressRate = STRESS_RATE_BY_TYPE[rateType]
  const stressInterestRate = interestRate + stressRate

  // 스트레스 금리 적용 시 월 상환액 계산
  const stressMonthlyRate = stressInterestRate / 100 / 12
  let monthlyPaymentAtStress: number

  if (method === 'equal-principal-interest') {
    if (stressMonthlyRate === 0) {
      monthlyPaymentAtStress = amount / months
    } else {
      monthlyPaymentAtStress =
        (amount * stressMonthlyRate * Math.pow(1 + stressMonthlyRate, months)) /
        (Math.pow(1 + stressMonthlyRate, months) - 1)
    }
  } else {
    // 원금균등상환 첫 달 기준
    monthlyPaymentAtStress = (amount / months) + (amount * stressMonthlyRate)
  }

  // DSR 계산
  const annualPayment = monthlyPayment * 12
  const annualPaymentAtStress = monthlyPaymentAtStress * 12

  const baseDSR = ((annualPayment + existingDebtPayment) / annualIncome) * 100
  const stressDSR = ((annualPaymentAtStress + existingDebtPayment) / annualIncome) * 100

  // DSR 40% 기준 대출 한도 역산
  const maxAnnualPayment = (annualIncome * DSR_LIMIT / 100) - existingDebtPayment
  const maxMonthlyPayment = maxAnnualPayment / 12

  // 대출 한도 역산 (원리금균등상환 기준)
  const baseLoanLimit = calculateLoanLimitFromPayment(maxMonthlyPayment, interestRate, months)
  const stressLoanLimit = calculateLoanLimitFromPayment(maxMonthlyPayment, stressInterestRate, months)

  const limitReduction = baseLoanLimit - stressLoanLimit
  const limitReductionPercent = baseLoanLimit > 0 ? (limitReduction / baseLoanLimit) * 100 : 0

  return {
    baseDSR: Math.round(baseDSR * 100) / 100,
    stressDSR: Math.round(stressDSR * 100) / 100,
    stressRate,
    baseLoanLimit: Math.round(baseLoanLimit),
    stressLoanLimit: Math.round(stressLoanLimit),
    limitReduction: Math.round(limitReduction),
    limitReductionPercent: Math.round(limitReductionPercent * 10) / 10,
    dsrExceeded: stressDSR > DSR_LIMIT,
    monthlyPaymentAtStress: Math.round(monthlyPaymentAtStress),
  }
}

/**
 * 월 상환액으로부터 대출 한도 역산
 */
function calculateLoanLimitFromPayment(
  monthlyPayment: number,
  annualRate: number,
  months: number
): number {
  if (monthlyPayment <= 0) return 0

  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) {
    return monthlyPayment * months
  }

  // 원리금균등상환 공식의 역산
  // P = M * [(1+r)^n - 1] / [r * (1+r)^n]
  const factor = Math.pow(1 + monthlyRate, months)
  return monthlyPayment * (factor - 1) / (monthlyRate * factor)
}

/**
 * LTV 계산
 */
function calculateLTV(input: LoanInput): LTVResult {
  const {
    region = 'other',
    propertyValue = 0,
    isFirstHome = false,
    customLTV,
  } = input

  const regionData = LTV_BY_REGION[region]
  let baseLTV = regionData.base
  let ltvBonus = 0

  // 직접 입력인 경우
  if (region === 'custom' && customLTV !== undefined) {
    baseLTV = customLTV
  } else if (isFirstHome) {
    ltvBonus = regionData.firstHomeBonus
  }

  const appliedLTV = Math.min(baseLTV + ltvBonus, 80) // 최대 80%
  const maxLoanAmount = Math.round(propertyValue * appliedLTV / 100)

  return {
    region,
    regionName: regionData.name,
    baseLTV,
    appliedLTV,
    maxLoanAmount,
    isFirstHome,
    ltvBonus,
  }
}

/**
 * 지역별 LTV 정보 반환
 */
export function getLTVByRegion() {
  return LTV_BY_REGION
}

/**
 * 금리 유형별 스트레스 가산 금리 반환
 */
export function getStressRates() {
  return STRESS_RATE_BY_TYPE
}

/**
 * DSR 한도 반환
 */
export function getDSRLimit() {
  return DSR_LIMIT
}
