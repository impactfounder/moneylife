import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  const tools = [
    { icon: '🏆', label: '연봉' },
    { icon: '💰', label: '급여' },
    { icon: '🏠', label: '대출' },
    { icon: '📈', label: '투자' },
    { icon: '💸', label: '세금' },
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Glow Effects */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Grid Pattern Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: '60px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontSize: '48px',
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-0.02em',
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
                padding: '8px 16px',
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
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.3,
              marginBottom: '16px',
            }}
          >
            내 돈, AI가 1분 만에 진단
          </div>

          {/* Sub Copy */}
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(203,213,225,0.9)',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            무료 재무 진단 + 맞춤형 금융 계산기
          </div>

          {/* AI Visual Element - Floating Circles */}
          <div
            style={{
              position: 'absolute',
              top: '80px',
              right: '80px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '12px',
                }}
              >
                {[0, 1, 2, 3].map((j) => (
                  <div
                    key={j}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: (i + j) % 2 === 0
                        ? 'rgba(6,182,212,0.6)'
                        : 'rgba(139,92,246,0.4)',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tools Dock */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 60px 50px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)',
          }}
        >
          {/* Section Title */}
          <div
            style={{
              fontSize: '18px',
              color: 'rgba(148,163,184,1)',
              marginBottom: '20px',
              fontWeight: 600,
            }}
          >
            9가지 필수 금융 도구 탑재
          </div>

          {/* Tool Cards */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
            }}
          >
            {tools.map((tool) => (
              <div
                key={tool.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100px',
                  height: '90px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span style={{ fontSize: '32px', marginBottom: '8px' }}>
                  {tool.icon}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(226,232,240,0.9)',
                    fontWeight: 600,
                  }}
                >
                  {tool.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
