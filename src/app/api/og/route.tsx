import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  // Pretendard 폰트 로드
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf'
  ).then((res) => res.arrayBuffer())

  const calculators = [
    { icon: '🏆', label: '연봉순위' },
    { icon: '💰', label: '급여계산' },
    { icon: '🏠', label: '대출계산' },
    { icon: '📈', label: '복리계산' },
    { icon: '💼', label: '퇴직금' },
    { icon: '🏛️', label: '연금계산' },
    { icon: '📊', label: '소득세' },
    { icon: '⏰', label: '최저시급' },
    { icon: '🏦', label: '주담대' },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          fontFamily: 'Pretendard',
          position: 'relative',
        }}
      >
        {/* Background Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Top Section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '50px 60px 30px',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '42px',
                fontWeight: 700,
                color: 'white',
              }}
            >
              MoneyLife
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'white',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                padding: '6px 14px',
                borderRadius: '999px',
              }}
            >
              AI
            </span>
          </div>

          {/* Main Copy */}
          <div
            style={{
              fontSize: '52px',
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            내 돈, AI가 1분 만에 진단
          </div>

          {/* Sub Copy */}
          <div
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              textAlign: 'center',
            }}
          >
            무료 재무 진단 + 9가지 필수 금융 계산기
          </div>
        </div>

        {/* Calculator Grid - 핵심 강조 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            padding: '20px 60px 50px',
          }}
        >
          {/* Section Label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
              background: 'rgba(6,182,212,0.15)',
              padding: '8px 20px',
              borderRadius: '999px',
              border: '1px solid rgba(6,182,212,0.3)',
            }}
          >
            <span style={{ fontSize: '16px', color: '#22d3ee', fontWeight: 700 }}>
              9가지 필수 금융 도구
            </span>
          </div>

          {/* Calculator Cards Grid */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              maxWidth: '900px',
            }}
          >
            {calculators.map((calc) => (
              <div
                key={calc.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255,255,255,0.08)',
                  padding: '14px 20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span style={{ fontSize: '28px' }}>{calc.icon}</span>
                <span
                  style={{
                    fontSize: '18px',
                    color: '#e2e8f0',
                    fontWeight: 700,
                  }}
                >
                  {calc.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            background: 'rgba(0,0,0,0.3)',
          }}
        >
          <span style={{ fontSize: '16px', color: '#64748b' }}>
            moneylife.kr
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Pretendard',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
