import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  // Google Fonts에서 Noto Sans KR 로드 (더 안정적)
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLGC5nwmHQ.woff'
  ).then((res) => res.arrayBuffer())

  const calculators = [
    { icon: '🏆', label: '연봉순위' },
    { icon: '💰', label: '급여' },
    { icon: '🏠', label: '대출' },
    { icon: '📈', label: '투자' },
    { icon: '💼', label: '퇴직금' },
    { icon: '🏛️', label: '연금' },
    { icon: '📊', label: '세금' },
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
          fontFamily: 'Noto Sans KR',
        }}
      >
        {/* Main Content Area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: '60px',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                fontSize: '48px',
                fontWeight: 700,
                color: 'white',
                marginRight: '16px',
              }}
            >
              MoneyLife
            </span>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'white',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                padding: '8px 20px',
                borderRadius: '999px',
              }}
            >
              AI
            </span>
          </div>

          {/* Main Copy */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}
          >
            AI와 함께하는
          </div>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              marginBottom: '24px',
              lineHeight: 1.2,
            }}
          >
            금융 진단 & 계산기
          </div>

          {/* Sub Copy */}
          <div
            style={{
              fontSize: '24px',
              color: '#94a3b8',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            1분 만에 무료 재무 진단 + 9가지 필수 금융 도구
          </div>

          {/* Calculator Icons Row */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
            }}
          >
            {calculators.map((calc) => (
              <div
                key={calc.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '110px',
                  height: '100px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <span style={{ fontSize: '36px', marginBottom: '8px' }}>
                  {calc.icon}
                </span>
                <span
                  style={{
                    fontSize: '16px',
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
            padding: '24px',
            background: 'rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ fontSize: '18px', color: '#64748b', fontWeight: 700 }}>
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
          name: 'Noto Sans KR',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
