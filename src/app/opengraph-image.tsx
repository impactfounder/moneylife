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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fafbfc',
          background: 'linear-gradient(135deg, #fef3f2 0%, #fdf4ff 25%, #f0f9ff 75%, #ecfdf5 100%)',
          padding: '60px 80px',
        }}
      >
        {/* 왼쪽: 텍스트 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '550px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#1e293b',
              marginBottom: 24,
              lineHeight: 1.1,
            }}
          >
            금융계산기
          </div>

          <div
            style={{
              fontSize: 28,
              color: '#64748b',
              marginBottom: 40,
              lineHeight: 1.6,
            }}
          >
            스마트한 금융, 더 나은 삶.
            대출, 급여, 세금 등 모든 금융 계산을 1초만에!
          </div>

          <div
            style={{
              fontSize: 24,
              color: '#3b82f6',
              fontWeight: 700,
            }}
          >
            moneylife.kr
          </div>
        </div>

        {/* 오른쪽: 일러스트 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 메인 카드 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              borderRadius: 32,
              padding: 40,
              boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.12)',
            }}
          >
            {/* 계산기 화면 */}
            <div
              style={{
                display: 'flex',
                backgroundColor: '#1e293b',
                borderRadius: 16,
                padding: '24px 32px',
                marginBottom: 24,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#4ade80', fontSize: 42, fontWeight: 700 }}>
                3,500,000
              </span>
            </div>

            {/* 버튼 그리드 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#f1f5f9', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#334155' }}>7</div>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#f1f5f9', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#334155' }}>8</div>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#f1f5f9', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#334155' }}>9</div>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#3b82f6', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: 'white' }}>+</div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#f1f5f9', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#334155' }}>4</div>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#f1f5f9', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#334155' }}>5</div>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#f1f5f9', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#334155' }}>6</div>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#10b981', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: 'white' }}>=</div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#f1f5f9', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#334155' }}>1</div>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#f1f5f9', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#334155' }}>2</div>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#f1f5f9', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#334155' }}>3</div>
                <div style={{ display: 'flex', width: 56, height: 56, backgroundColor: '#f59e0b', borderRadius: 14, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: 'white' }}>%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
