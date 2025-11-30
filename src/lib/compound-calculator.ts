import type { CompoundInterestInput, CompoundInterestResult } from '@/types'

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const { principal, monthlyDeposit, annualRate, years, compoundFrequency } = input

  const compoundsPerYear = {
    'monthly': 12,
    'quarterly': 4,
    'semi-annually': 2,
    'annually': 1
  }[compoundFrequency]

  const rate = annualRate / 100
  const periods = years * compoundsPerYear
  const ratePerPeriod = rate / compoundsPerYear
  const depositsPerPeriod = 12 / compoundsPerYear

  // 원금의 복리
  const principalAmount = principal * Math.pow(1 + ratePerPeriod, periods)

  // 월 적립금의 복리
  let depositAmount = 0
  if (monthlyDeposit > 0) {
    const depositPerPeriod = monthlyDeposit * depositsPerPeriod
    depositAmount = depositPerPeriod * ((Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod)
  }

  const finalAmount = principalAmount + depositAmount
  const totalDeposit = principal + (monthlyDeposit * 12 * years)
  const totalInterest = finalAmount - totalDeposit

  // 연도별 데이터
  const yearlyData = []
  let balance = principal
  for (let year = 1; year <= years; year++) {
    const yearPeriods = year * compoundsPerYear
    const yearPrincipalAmount = principal * Math.pow(1 + ratePerPeriod, yearPeriods)
    
    let yearDepositAmount = 0
    if (monthlyDeposit > 0) {
      const depositPerPeriod = monthlyDeposit * depositsPerPeriod
      yearDepositAmount = depositPerPeriod * ((Math.pow(1 + ratePerPeriod, yearPeriods) - 1) / ratePerPeriod)
    }
    
    balance = yearPrincipalAmount + yearDepositAmount
    const yearDeposit = principal + (monthlyDeposit * 12 * year)
    const yearInterest = balance - yearDeposit

    yearlyData.push({
      year,
      balance: Math.round(balance),
      deposit: yearDeposit,
      interest: Math.round(yearInterest)
    })
  }

  return {
    finalAmount: Math.round(finalAmount),
    totalDeposit,
    totalInterest: Math.round(totalInterest),
    yearlyData
  }
}
