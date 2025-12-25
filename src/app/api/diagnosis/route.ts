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

    const prompt = `당신은 냉정하고 신랄한 재무 상담사입니다. 사용자의 재무 데이터를 분석하고 팩트 폭격을 해주세요.

## 사용자 정보
- 나이: ${data.age}세
- 직업: ${data.occupation}
- 월 소득: ${data.monthlySalary}만원
- 월 지출: ${data.monthlySpending}만원
- 주거비: ${data.housingCost}만원
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

## 응답 형식 (반드시 아래 JSON 형식으로만 응답)
{
  "score": 0~100 사이 정수 (재무 건강 점수),
  "grade": "S/A/B/C/D/F 중 하나",
  "persona": "사용자를 한 단어로 정의하는 캐릭터명 (예: 빚의 노예, 황금 밸런스 마스터, 미래 없는 욜로족, 영끌 용사, 짠돌이 현자 등)",
  "personaEmoji": "페르소나를 나타내는 이모지 1개",
  "roast": "2~3문장으로 사용자의 재무 상태를 신랄하게 팩트 폭격. 직설적이고 따끔하게.",
  "advice": ["조언1", "조언2", "조언3"] (각 조언은 이모지로 시작, 구체적이고 실행 가능한 조언 3개)
}

점수 기준:
- 90점 이상: S등급 (완벽한 재무 관리)
- 80점 이상: A등급 (우수)
- 70점 이상: B등급 (양호)
- 60점 이상: C등급 (보통)
- 50점 이상: D등급 (주의 필요)
- 50점 미만: F등급 (위험)

JSON만 출력하세요. 다른 텍스트는 포함하지 마세요.`

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      // API 키가 없으면 로컬 분석으로 폴백
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
            maxOutputTokens: 1024,
          }
        })
      }
    )

    if (!response.ok) {
      console.error('Gemini API error:', await response.text())
      // API 에러 시 로컬 분석으로 폴백
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

    // JSON 파싱 시도
    try {
      // ```json ... ``` 형식 처리
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
          advice: parsed.advice.slice(0, 3)
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

function generateLocalAnalysis(
  data: DiagnosisInput,
  savingsRate: number,
  debtToIncomeRatio: number,
  monthsOfExpenses: number,
  netWorth: number
) {
  // 점수 계산
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
    persona = '카드값 폭탄 시한폭탄'
    personaEmoji = '💣'
    roast = '수입보다 지출이 많습니다. 매달 빚이 늘어나는 중이에요. 지금 바로 지출을 줄이지 않으면 파산 일직선입니다.'
  } else if (savingsRate < 10 && debtToIncomeRatio > 200) {
    persona = '빚의 노예'
    personaEmoji = '⛓️'
    roast = '벌어서 이자 내기도 바쁘시네요. 돈을 위해 일하는 게 아니라, 은행을 위해 일하고 계십니다.'
  } else if (savingsRate < 10) {
    persona = '미래 없는 욜로족'
    personaEmoji = '🎉'
    roast = '오늘만 사는 스타일이시군요. 10년 뒤 당신은 오늘의 당신을 원망할 겁니다.'
  } else if (savingsRate >= 50 && debtToIncomeRatio === 0) {
    persona = '숨만 쉬는 자린고비'
    personaEmoji = '🐜'
    roast = '저축 좋죠. 근데 삶의 질은요? 돈 쓸 때 써야 행복도 삽니다.'
  } else if (savingsRate >= 30 && monthsOfExpenses >= 6 && debtToIncomeRatio < 100) {
    persona = '황금 밸런스 마스터'
    personaEmoji = '⚖️'
    roast = '지출과 저축의 완벽한 균형! 이대로만 가면 노후 걱정 없습니다.'
  } else if (debtToIncomeRatio > 300) {
    persona = '영끌의 선봉장'
    personaEmoji = '🏠'
    roast = '부동산에 영혼까지 끌어모으셨군요. 금리 인상이 무섭지 않으세요?'
  } else if (monthsOfExpenses < 3) {
    persona = '위태로운 모래성'
    personaEmoji = '🏰'
    roast = '비상금이 3개월치도 안 됩니다. 갑자기 실직하면 어떡하실 건가요?'
  } else if (data.stockInvestment > data.savingsDeposit * 3) {
    persona = '공격적 투자 광전사'
    personaEmoji = '⚔️'
    roast = '주식/코인에 올인하셨네요. 대박 아니면 쪽박, 그 스릴을 즐기시는군요.'
  } else {
    persona = '평범한 월급쟁이'
    personaEmoji = '👔'
    roast = '무난하게 살고 계시네요. 좋게 말하면 안정적, 나쁘게 말하면 그저 그렇습니다.'
  }

  const advice: string[] = []
  if (savingsRate < 20) {
    advice.push('💸 저축률을 최소 20% 이상으로 올리세요. 현재 저축률이 너무 낮아 자산 형성이 어렵습니다.')
  }
  if (monthsOfExpenses < 6) {
    advice.push('🏦 비상금을 최소 6개월치 생활비로 확보하세요. 예상치 못한 상황에 대비해야 합니다.')
  }
  if (debtToIncomeRatio > 200) {
    advice.push('📉 부채 상환을 최우선으로 하세요. 연봉 대비 부채가 너무 많습니다.')
  }
  if (data.debtInterestRate > 10) {
    advice.push('🔥 고금리 대출부터 갚으세요. 이자가 눈덩이처럼 불어나고 있습니다.')
  }
  if (data.stockInvestment === 0 && data.savingsDeposit > data.monthlySalary * 6) {
    advice.push('📈 여유자금으로 투자를 시작하세요. 예금만으로는 인플레이션을 이길 수 없습니다.')
  }
  if (data.housingCost > data.monthlySalary * 0.3) {
    advice.push('🏠 주거비가 소득의 30%를 초과합니다. 주거비 절감 방안을 고려해보세요.')
  }
  if (advice.length === 0) {
    advice.push('✨ 현재 재무 상태가 양호합니다. 꾸준히 유지하면서 투자 비중을 조금씩 늘려보세요.')
  }

  return {
    score,
    grade,
    gradeColor: getGradeColor(grade),
    persona,
    personaEmoji,
    roast,
    advice: advice.slice(0, 3)
  }
}
