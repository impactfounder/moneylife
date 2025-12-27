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
          backgroundColor: '#0f172a',
          position: 'relative',
        }}
      >
        {/* Background Gradient Blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)',
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '60px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Top - Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '60px',
            }}
          >
            <span
              style={{
                fontSize: '40px',
                fontWeight: 700,
                color: 'white',
                marginRight: '12px',
              }}
            >
              MoneyLife
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'white',
                backgroundColor: '#8b5cf6',
                padding: '6px 16px',
                borderRadius: '999px',
              }}
            >
              AI
            </span>
          </div>

          {/* Center - Main Message */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: '60px',
                fontWeight: 700,
                color: 'white',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              내 돈, 잘 관리하고 있을까?
            </div>
            <div
              style={{
                fontSize: '30px',
                color: '#94a3b8',
              }}
            >
              AI 자산 진단부터 9가지 금융 도구까지
            </div>
          </div>
        </div>

        {/* Bottom - Tools Dock */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px 60px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '48px',
            }}
          >
            {tools.map((tool) => (
              <div
                key={tool.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '40px' }}>{tool.icon}</span>
                <span
                  style={{
                    fontSize: '16px',
                    color: 'white',
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
