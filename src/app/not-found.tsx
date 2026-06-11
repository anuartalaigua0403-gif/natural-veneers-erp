import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#080a10',
      color: '#e4e8f0',
      fontFamily: 'Inter, system-ui, sans-serif',
      gap: '16px',
    }}>
      <div style={{ fontSize: '48px' }}>🦷</div>
      <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Página no encontrada</h1>
      <p style={{ color: '#8892a4', fontSize: '14px' }}>
        La ruta que buscas no existe.
      </p>
      <Link href="/" style={{
        padding: '10px 24px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: 'white',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '13px',
        fontWeight: 600,
        marginTop: '8px',
      }}>
        Ir al ERP
      </Link>
    </div>
  )
}
