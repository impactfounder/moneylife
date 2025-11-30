import type { LoanInput, LoanResult, LoanScheduleItem } from '@/types'

export function calculateLoan(input: LoanInput): LoanResult {
  const { amount, interestRate, months, method } = input
  const monthlyRate = interestRate / 100 / 12

  if (method === 'equal-principal-interest') {
    return calculateEqualPayment(amount, monthlyRate, months)
  } else {
    return calculateEqualPrincipal(amount, monthlyRate, months)
  }
}

// 원리금균등상환
function calculateEqualPayment(
  principal: number,
  monthlyRate: number,
  months: number
): LoanResult {
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
