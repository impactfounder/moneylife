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
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 30%, #e0f2fe 70%, #f0f9ff 100%)',
          padding: '40px 60px',
        }}
      >
        {/* 왼쪽: 텍스트 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            paddingRight: '40px',
          }}
        >
          {/* 타이틀 */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: 16,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            금융계산기
          </div>

          {/* 서브타이틀 */}
          <div
            style={{
              fontSize: 24,
              color: '#64748b',
              marginBottom: 32,
              lineHeight: 1.5,
            }}
          >
            스마트한 금융, 더 나은 삶. 대출, 급여,{'\n'}
            세금 등 모든 금융 계산을 1초만에!
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: 20,
              color: '#3b82f6',
              fontWeight: 600,
            }}
          >
            moneylife.kr
          </div>
        </div>

        {/* 오른쪽: 일러스트 영역 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '500px',
            position: 'relative',
          }}
        >
          {/* 메인 계산기 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '30px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              width: '280px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* 계산기 화면 */}
            <div
              style={{
                display: 'flex',
                backgroundColor: '#1e293b',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#4ade80', fontSize: 36, fontWeight: 700 }}>
                ₩ 3,500,000
              </span>
            </div>

            {/* 계산기 버튼들 */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    width: '50px',
                    height: '50px',
                    backgroundColor: ['÷', '×', '-', '+', '='].includes(btn) ? '#3b82f6' : '#f1f5f9',
                    color: ['÷', '×', '-', '+', '='].includes(btn) ? 'white' : '#334155',
                    borderRadius: '12px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    fontWeight: 600,
                  }}
                >
                  {btn}
                </div>
              ))}
            </div>
          </div>

          {/* 차트 카드 (왼쪽 위) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '20px',
              left: '-20px',
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              zIndex: 3,
            }}
          >
            {/* 미니 바 차트 */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '60px' }}>
              <div style={{ width: '16px', height: '30px', backgroundColor: '#93c5fd', borderRadius: '4px' }} />
              <div style={{ width: '16px', height: '45px', backgroundColor: '#60a5fa', borderRadius: '4px' }} />
              <div style={{ width: '16px', height: '35px', backgroundColor: '#3b82f6', borderRadius: '4px' }} />
              <div style={{ width: '16px', height: '55px', backgroundColor: '#2563eb', borderRadius: '4px' }} />
            </div>
            <span style={{ fontSize: 12, color: '#64748b', marginTop: '8px' }}>수익 분석</span>
          </div>

          {/* 코인 아이콘들 */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: '60px',
              right: '20px',
              fontSize: 40,
              zIndex: 1,
            }}
          >
            🪙
          </div>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '100px',
              right: '0px',
              fontSize: 32,
              zIndex: 1,
            }}
          >
            💰
          </div>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '40px',
              left: '20px',
              fontSize: 36,
              zIndex: 1,
            }}
          >
            📊
          </div>

          {/* 파이 차트 (오른쪽 아래) */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '30px',
              right: '40px',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'conic-gradient(#3b82f6 0% 40%, #10b981 40% 70%, #f59e0b 70% 100%)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              zIndex: 3,
            }}
          >
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
                backgroundColor: 'white',
                borderRadius: '50%',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
