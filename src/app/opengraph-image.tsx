import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = '금융계산기 - moneylife.kr'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        }}
      >
        {/* 메인 카드 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '32px',
            padding: '60px 80px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* 이모지 */}
          <div style={{ fontSize: 80, marginBottom: 20 }}>💰</div>

          {/* 타이틀 */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            금융계산기
          </div>

          {/* 서브타이틀 */}
          <div
            style={{
              fontSize: 28,
              color: '#64748b',
              marginBottom: 32,
            }}
          >
            대출부터 연봉순위까지, 모든 금융 계산을 1초만에!
          </div>

          {/* 기능 태그들 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['연봉순위', '급여계산', '대출계산', '복리이자', '퇴직금'].map((tag) => (
              <div
                key={tag}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  padding: '12px 24px',
                  borderRadius: '100px',
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 24,
            color: '#94a3b8',
            fontWeight: 600,
          }}
        >
          moneylife.kr
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
