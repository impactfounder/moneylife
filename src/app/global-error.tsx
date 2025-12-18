'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '1rem'
            }}>
              문제가 발생했습니다
            </h2>
            <button
              onClick={() => reset()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0f172a',
                color: 'white',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              다시 시도
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
