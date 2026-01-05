/**
 * 주택담보대출 계산기 라이브러리
 * 2026년 기준 주택담보대출 계산 로직
 */

export interface MortgageInput {
  propertyPrice: number;        // 주택 가격
  loanAmount: number;           // 대출 금액
  interestRate: number;         // 연 이자율 (%)
  loanPeriod: number;           // 대출 기간 (년)
  paymentType: 'equalPayment' | 'equalPrincipal';  // 상환 방식
  additionalMonthlyPayment?: number;  // 월 추가 상환금 (선택)
}

export interface MortgageResult {
  loanToValue: number;          // LTV (주택담보대출비율) %
  monthlyPayment: number;       // 월 상환액
  totalPayment: number;         // 총 상환액
  totalInterest: number;        // 총 이자
  schedule: MonthlySchedule[];   // 월별 상환 스케줄
}

export interface MonthlySchedule {
  month: number;
  principalPayment: number;
  interestPayment: number;
  totalPayment: number;
  remainingBalance: number;
}

/**
 * 주택담보대출 계산
 */
export function calculateMortgage(input: MortgageInput): MortgageResult {
  const {
    propertyPrice,
    loanAmount,
    interestRate,
    loanPeriod,
    paymentType,
    additionalMonthlyPayment = 0
  } = input;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanPeriod * 12;
  const schedule: MonthlySchedule[] = [];

  let remainingBalance = loanAmount;
  let totalPayment = 0;
  let totalInterest = 0;

  if (paymentType === 'equalPayment') {
    // 원리금균등 상환
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment + additionalMonthlyPayment;

      // 마지막 달 또는 잔액보다 많은 경우
      if (principalPayment >= remainingBalance) {
        principalPayment = remainingBalance;
        remainingBalance = 0;
      } else {
        remainingBalance -= principalPayment;
      }

      const actualPayment = principalPayment + interestPayment;
      totalPayment += actualPayment;
      totalInterest += interestPayment;

      schedule.push({
        month,
        principalPayment,
        interestPayment,
        totalPayment: actualPayment,
        remainingBalance
      });

      if (remainingBalance === 0) break;
    }
  } else {
    // 원금균등 상환
    const principalPayment = loanAmount / totalMonths;

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      let actualPrincipalPayment = principalPayment + additionalMonthlyPayment;

      if (actualPrincipalPayment >= remainingBalance) {
        actualPrincipalPayment = remainingBalance;
        remainingBalance = 0;
      } else {
        remainingBalance -= actualPrincipalPayment;
      }

      const actualPayment = actualPrincipalPayment + interestPayment;
      totalPayment += actualPayment;
      totalInterest += interestPayment;

      schedule.push({
        month,
        principalPayment: actualPrincipalPayment,
        interestPayment,
        totalPayment: actualPayment,
        remainingBalance
      });

      if (remainingBalance === 0) break;
    }
  }

  const loanToValue = (loanAmount / propertyPrice) * 100;

  return {
    loanToValue,
    monthlyPayment: schedule[0]?.totalPayment || 0,
    totalPayment,
    totalInterest,
    schedule
  };
}

/**
 * LTV 경고 메시지
 */
export function getLTVWarning(ltv: number): string {
  if (ltv <= 40) return '✅ 안전한 대출 비율입니다';
  if (ltv <= 60) return '⚠️ 적정 대출 비율입니다';
  if (ltv <= 70) return '⚠️ 높은 대출 비율입니다';
  return '🚨 매우 높은 대출 비율입니다 (위험)';
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
