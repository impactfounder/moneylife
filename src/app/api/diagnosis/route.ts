import { NextRequest, NextResponse } from 'next/server'

interface DiagnosisInput {
  age: number
  occupation: string
  monthlySalary: number
  savingsDeposit: number
  stockInvestment: number
  realEstate: number
  monthlySpending: number
  housingCost: number
  totalDebt: number
  debtInterestRate: number
}

interface GeminiResponse {
  score: number
  grade: string
  persona: string
  personaEmoji: string
  roast: string
  advice: string[]
  goals: {
    shortTerm: string
    midTerm: string
    longTerm: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: DiagnosisInput = await request.json()

    // 기본 통계 계산
    const totalAssets = data.savingsDeposit + data.stockInvestment + data.realEstate
    const netWorth = totalAssets - data.totalDebt
    const savingsRate = data.monthlySalary > 0
      ? Math.round(((data.monthlySalary - data.monthlySpending - data.housingCost) / data.monthlySalary) * 100)
      : 0
    const debtToIncomeRatio = data.monthlySalary > 0
      ? Math.round((data.totalDebt / (data.monthlySalary * 12)) * 100)
      : 0
    const liquidAssets = data.savingsDeposit + data.stockInvestment
    const monthlyExpenses = data.monthlySpending + data.housingCost
    const monthsOfExpenses = monthlyExpenses > 0 ? Math.round((liquidAssets / monthlyExpenses) * 10) / 10 : 0

    const prompt = `당신은 친구처럼 편하지만 아주 신랄하고 재치있는 재무 상담사입니다. 반말로 비꼬듯이 팩트 폭격을 해주세요.

## 사용자 정보
- 나이: ${data.age}세
- 직업: ${data.occupation}
- 월 소득: ${data.monthlySalary}만원
- 월 지출: ${data.monthlySpending}만원 (소득 대비 ${data.monthlySalary > 0 ? Math.round(data.monthlySpending / data.monthlySalary * 100) : 0}%)
- 주거비: ${data.housingCost}만원 (소득 대비 ${data.monthlySalary > 0 ? Math.round(data.housingCost / data.monthlySalary * 100) : 0}%)
- 예적금: ${data.savingsDeposit}만원
- 주식/투자: ${data.stockInvestment}만원
- 부동산: ${data.realEstate}만원
- 총 부채: ${data.totalDebt}만원
- 부채 평균 이자율: ${data.debtInterestRate}%

## 계산된 지표
- 저축률: ${savingsRate}% (권장: 20% 이상)
- 비상금: ${monthsOfExpenses}개월치 (권장: 6개월 이상)
- 부채/연소득 비율: ${debtToIncomeRatio}% (권장: 200% 미만)
- 순자산: ${netWorth}만원
- 총 자산: ${totalAssets}만원

## 요청 사항

1. **Persona (별명)**: 사용자의 소비 패턴과 자산 상태를 보고 '비꼬는 듯한' 재미있는 별명을 지어줘.
   - 좋은 예시: '걸어 다니는 중소기업', '숨만 쉬는 쿠션', '스타벅스 대주주', '월급 자동이체 장인', '카드사 VIP', '은행 이자 기부자', '미래의 건물주(희망편)', '적금통장 방치러', '영끌 파이터'
   - 나쁜 예시: '빚의 노예', '월급쟁이' (너무 평범함)

2. **Roast (팩트폭행)**: 친구가 술자리에서 상담해 주듯이 구어체 반말로, 아주 신랄하고 재치 있게 3~4문장 작성해줘.
   - 사용자의 아픈 곳(소비 과다, 저축 부족, 투자 안 함 등)을 유머러스하게 꼬집어줘
   - "~네", "~잖아", "~거든?" 같은 구어체 사용

3. **Advice (조언)**: 뻔한 소리 말고, 당장 실행할 수 있는 구체적인 액션 아이템 3개.
   - 좋은 예시: "📱 넷플릭스 구독부터 끊어", "🏦 청약통장에 2만원이라도 자동이체 걸어"

4. **Goals (목표)**: 사용자 상황에 맞는 현실적인 재무 목표를 제시해줘.
   - shortTerm (1년): 지금 당장 시작해서 1년 안에 달성할 수 있는 목표 (예: "비상금 500만원 모으기", "카드빚 청산")
   - midTerm (3년): 3년 안에 달성할 중기 목표 (예: "순자산 5천만원 달성", "투자 포트폴리오 구축")
   - longTerm (5년): 5년 후 달성할 장기 목표 (예: "내 집 마련 목돈 1억", "월 배당금 30만원 만들기")

## 응답 형식 (반드시 아래 JSON 형식으로만 응답)
{
  "score": 0~100 사이 정수,
  "grade": "S/A/B/C/D/F 중 하나",
  "persona": "재미있고 비꼬는 별명",
  "personaEmoji": "별명에 어울리는 이모지 1개",
  "roast": "3~4문장의 신랄한 팩트폭행 (반말, 구어체)",
  "advice": ["구체적 조언1", "구체적 조언2", "구체적 조언3"],
  "goals": {
    "shortTerm": "1년 목표 (구체적 금액 포함)",
    "midTerm": "3년 목표 (구체적 금액 포함)",
    "longTerm": "5년 목표 (구체적 금액 포함)"
  }
}

점수 기준:
- 90점 이상: S등급 (재무 천재)
- 80점 이상: A등급 (우수)
- 70점 이상: B등급 (양호)
- 60점 이상: C등급 (보통)
- 50점 이상: D등급 (주의)
- 50점 미만: F등급 (위험)

JSON만 출력해. 다른 텍스트 금지.`

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        result: generateLocalAnalysis(data, savingsRate, debtToIncomeRatio, monthsOfExpenses, netWorth),
        stats: { savingsRate, debtToIncomeRatio, netWorth, monthsOfExpenses }
      })
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1500,
          }
        })
      }
    )

    if (!response.ok) {
      console.error('Gemini API error:', await response.text())
      return NextResponse.json({
        success: true,
        result: generateLocalAnalysis(data, savingsRate, debtToIncomeRatio, monthsOfExpenses, netWorth),
        stats: { savingsRate, debtToIncomeRatio, netWorth, monthsOfExpenses }
      })
    }

    const geminiData = await response.json()
    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      return NextResponse.json({
        success: true,
        result: generateLocalAnalysis(data, savingsRate, debtToIncomeRatio, monthsOfExpenses, netWorth),
        stats: { savingsRate, debtToIncomeRatio, netWorth, monthsOfExpenses }
      })
    }

    try {
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/)
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text
      const parsed: GeminiResponse = JSON.parse(jsonStr.trim())

      return NextResponse.json({
        success: true,
        result: {
          score: Math.max(0, Math.min(100, parsed.score)),
          grade: parsed.grade,
          gradeColor: getGradeColor(parsed.grade),
          persona: parsed.persona,
          personaEmoji: parsed.personaEmoji,
          roast: parsed.roast,
          advice: parsed.advice.slice(0, 3),
          goals: parsed.goals || generateLocalGoals(data, savingsRate, netWorth)
        },
        stats: { savingsRate, debtToIncomeRatio, netWorth, monthsOfExpenses }
      })
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Text:', text)
      return NextResponse.json({
        success: true,
        result: generateLocalAnalysis(data, savingsRate, debtToIncomeRatio, monthsOfExpenses, netWorth),
        stats: { savingsRate, debtToIncomeRatio, netWorth, monthsOfExpenses }
      })
    }

  } catch (error) {
    console.error('Diagnosis API error:', error)
    return NextResponse.json(
      { success: false, error: '진단 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

function getGradeColor(grade: string): string {
  switch (grade) {
    case 'S': return 'text-yellow-500'
    case 'A': return 'text-green-500'
    case 'B': return 'text-blue-500'
    case 'C': return 'text-slate-500'
    case 'D': return 'text-orange-500'
    default: return 'text-red-500'
  }
}

function generateLocalGoals(data: DiagnosisInput, savingsRate: number, netWorth: number) {
  const monthlySaving = Math.max(0, data.monthlySalary - data.monthlySpending - data.housingCost)

  let shortTerm: string
  let midTerm: string
  let longTerm: string

  if (data.totalDebt > 0 && data.debtInterestRate > 5) {
    shortTerm = `고금리 부채 ${Math.min(data.totalDebt, monthlySaving * 12)}만원 상환하기`
  } else if (savingsRate < 10) {
    shortTerm = '월 저축률 20% 달성하기'
  } else {
    shortTerm = `비상금 ${Math.round(data.monthlySpending * 6)}만원 모으기`
  }

  if (netWorth < 5000) {
    midTerm = '순자산 5,000만원 달성하기'
  } else if (netWorth < 10000) {
    midTerm = '순자산 1억원 돌파하기'
  } else {
    midTerm = `투자 포트폴리오 ${Math.round(netWorth * 0.5)}만원 구축하기`
  }

  if (data.age < 35) {
    longTerm = '내 집 마련 목돈 1억원 모으기'
  } else if (data.age < 45) {
    longTerm = '월 50만원 패시브 인컴 만들기'
  } else {
    longTerm = '노후 자금 3억원 확보하기'
  }

  return { shortTerm, midTerm, longTerm }
}

function generateLocalAnalysis(
  data: DiagnosisInput,
  savingsRate: number,
  debtToIncomeRatio: number,
  monthsOfExpenses: number,
  netWorth: number
) {
  let score = 50

  if (savingsRate >= 50) score += 25
  else if (savingsRate >= 30) score += 20
  else if (savingsRate >= 20) score += 15
  else if (savingsRate >= 10) score += 10
  else if (savingsRate >= 0) score += 5
  else score -= 10

  if (monthsOfExpenses >= 12) score += 20
  else if (monthsOfExpenses >= 6) score += 15
  else if (monthsOfExpenses >= 3) score += 10
  else if (monthsOfExpenses >= 1) score += 5
  else score -= 5

  if (debtToIncomeRatio === 0) score += 20
  else if (debtToIncomeRatio < 100) score += 15
  else if (debtToIncomeRatio < 200) score += 10
  else if (debtToIncomeRatio < 300) score += 5
  else score -= 10

  const expectedNetWorth = data.monthlySalary * 12 * (data.age - 22) * 0.1
  if (netWorth >= expectedNetWorth * 2) score += 15
  else if (netWorth >= expectedNetWorth) score += 10
  else if (netWorth >= expectedNetWorth * 0.5) score += 5
  else if (netWorth < 0) score -= 10

  score = Math.max(0, Math.min(100, score))

  let grade: string
  if (score >= 90) grade = 'S'
  else if (score >= 80) grade = 'A'
  else if (score >= 70) grade = 'B'
  else if (score >= 60) grade = 'C'
  else if (score >= 50) grade = 'D'
  else grade = 'F'

  let persona: string
  let personaEmoji: string
  let roast: string

  if (savingsRate < 0) {
    persona = '월급 증발 마법사'
    personaEmoji = '💨'
    roast = '야 솔직히 이건 월급이 아니라 용돈이야. 들어오자마자 사라지는 거 보면 네 통장이 블랙홀인 것 같아. 이러다 진짜 마이너스 통장이 본 통장 되겠다?'
  } else if (savingsRate < 10 && debtToIncomeRatio > 200) {
    persona = '은행 이자 기부자'
    personaEmoji = '🏦'
    roast = '너 월급 받으면 이자 내고, 생활비 쓰고 나면 뭐가 남아? 아 맞다, 안 남지. 지금 네가 일하는 건 너를 위해서가 아니라 은행을 위해서인 거 알지?'
  } else if (savingsRate < 10) {
    persona = '스타벅스 대주주'
    personaEmoji = '☕'
    roast = '월급 들어오면 뭐하냐 어차피 다 쓸 건데. 10년 뒤에 "아 그때 좀 모아둘걸" 할 거 100%야. 미래의 너한테 미리 사과해.'
  } else if (savingsRate >= 50 && debtToIncomeRatio === 0) {
    persona = '숨만 쉬는 짠돌이'
    personaEmoji = '🐜'
    roast = '저축률 대박이네? 근데 뭐 먹고 사는 거야? 가끔은 맛있는 것도 먹고 여행도 가. 돈은 쓰라고 있는 거거든? 물론 적당히.'
  } else if (savingsRate >= 30 && monthsOfExpenses >= 6 && debtToIncomeRatio < 100) {
    persona = '황금비율 인간'
    personaEmoji = '✨'
    roast = '오 뭐야 좀 치는데? 저축도 하고 투자도 하고 비상금도 있네. 솔직히 이 정도면 나보다 잘하는 거 인정. 그냥 이대로만 살아.'
  } else if (debtToIncomeRatio > 300) {
    persona = '영끌 파이터'
    personaEmoji = '🥊'
    roast = '부동산에 영혼까지 끌어모았구나? 금리 오를 때마다 심장 쫄깃하겠다. 집값 올라야 할 텐데... 안 오르면 어쩌려고?'
  } else if (monthsOfExpenses < 3) {
    persona = 'YOLO 실천자'
    personaEmoji = '🎢'
    roast = '비상금 3개월치도 없어? 갑자기 회사 짤리면 어떡할 건데? 부모님한테 손 벌릴 거야? 제발 비상금부터 채워.'
  } else if (data.stockInvestment > data.savingsDeposit * 3) {
    persona = '주식 풀베팅러'
    personaEmoji = '📉'
    roast = '예금보다 주식이 3배가 넘어? 대박 아니면 쪽박 스타일이네. 떨어지면 멘탈 버틸 수 있어? 분산투자라는 말 들어봤어?'
  } else {
    persona = '월급 자동이체 장인'
    personaEmoji = '💸'
    roast = '무난하게 살고 있네. 나쁘진 않은데, 그렇다고 대단하지도 않아. 뭔가 변화가 필요해 보여. 이대로 10년 가면 그대로야.'
  }

  const advice: string[] = []
  if (savingsRate < 20) {
    advice.push('🍜 배달앱 삭제해. 이번 달부터 일주일에 2번만 시켜먹어.')
  }
  if (monthsOfExpenses < 6) {
    advice.push('🏦 월급 들어오면 자동이체로 30만원부터 비상금 통장에 넣어.')
  }
  if (debtToIncomeRatio > 200) {
    advice.push('💳 카드 한도 반으로 줄여. 없으면 안 쓰게 돼.')
  }
  if (data.debtInterestRate > 10) {
    advice.push('🔥 고금리 대출 먼저 갚아. 이자 아끼는 게 투자 수익보다 확실해.')
  }
  if (data.stockInvestment === 0 && data.savingsDeposit > data.monthlySalary * 6) {
    advice.push('📈 예금만 하지 말고 ETF라도 월 10만원씩 적립해봐.')
  }
  if (data.housingCost > data.monthlySalary * 0.3) {
    advice.push('🏠 월세가 너무 비싸. 이사 고려하거나 룸메이트 구해봐.')
  }
  if (advice.length === 0) {
    advice.push('👍 지금 잘하고 있어. ISA 계좌 만들어서 세금 아끼면서 투자해봐.')
  }

  return {
    score,
    grade,
    gradeColor: getGradeColor(grade),
    persona,
    personaEmoji,
    roast,
    advice: advice.slice(0, 3),
    goals: generateLocalGoals(data, savingsRate, netWorth)
  }
}
