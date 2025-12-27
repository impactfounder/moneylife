import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  // 4개 아이콘 (선택과 집중)
  const tools = [
    { icon: '🏆', label: '연봉' },
    { icon: '💰', label: '급여' },
    { icon: '🏠', label: '대출' },
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
          backgroundColor: '#0a0f1a',
          position: 'relative',
        }}
      >
        {/* Background Gradient Blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            right: '-120px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '50px 60px 30px',
            position: 'relative',
            zIndex: 10,
            justifyContent: 'center',
          }}
        >
          {/* Top - Logo (심플하게 텍스트만) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <span
              style={{
                fontSize: '42px',
                fontWeight: 800,
                color: 'white',
              }}
            >
              MoneyLife
            </span>
          </div>

          {/* Center - Main Message */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            {/* 메인 카피 - 80px */}
            <div
              style={{
                fontSize: '80px',
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.1,
                letterSpacing: '-2px',
              }}
            >
              내 돈, 잘 관리하고 있을까?
            </div>
            {/* 서브 카피 - 48px, 강조색 적용 */}
            <div
              style={{
                display: 'flex',
                fontSize: '44px',
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              <span style={{ color: '#94a3b8' }}>AI 자산 진단 &</span>
              <span style={{ color: '#4ade80', marginLeft: '16px' }}>급여 · 대출 · 세금 계산기</span>
            </div>
          </div>
        </div>

        {/* Bottom - Tools Dock (반투명 박스) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '36px 60px 44px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '72px',
            }}
          >
            {tools.map((tool) => (
              <div
                key={tool.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '70px' }}>{tool.icon}</span>
                <span
                  style={{
                    fontSize: '30px',
                    color: 'white',
                    fontWeight: 700,
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
