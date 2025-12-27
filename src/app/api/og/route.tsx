import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  const calculators = [
    { icon: '🏆', label: 'Salary Rank' },
    { icon: '💰', label: 'Payroll' },
    { icon: '🏠', label: 'Loan' },
    { icon: '📈', label: 'Investment' },
    { icon: '💼', label: 'Severance' },
    { icon: '🏛️', label: 'Pension' },
    { icon: '📊', label: 'Tax' },
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
              marginBottom: '40px',
            }}
          >
            <span
              style={{
                fontSize: '56px',
                fontWeight: 700,
                color: 'white',
                marginRight: '16px',
              }}
            >
              MoneyLife
            </span>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'white',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                padding: '10px 24px',
                borderRadius: '999px',
              }}
            >
              AI
            </span>
          </div>

          {/* Main Copy */}
          <div
            style={{
              fontSize: '44px',
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              marginBottom: '16px',
            }}
          >
            AI Financial Diagnosis & Calculators
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
            Free AI diagnosis + 9 essential financial tools
          </div>

          {/* Calculator Icons Row */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
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
                  width: '120px',
                  height: '100px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <span style={{ fontSize: '40px', marginBottom: '8px' }}>
                  {calc.icon}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#e2e8f0',
                    fontWeight: 600,
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
          <span style={{ fontSize: '20px', color: '#64748b', fontWeight: 600 }}>
            moneylife.kr
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
