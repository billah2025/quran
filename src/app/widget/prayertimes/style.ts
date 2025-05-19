// app/widget/prayertimes/style.ts
export const PRAYER_WIDGET_STYLE = {
    wrapper: {
      fontFamily: "'Noto Sans Bengali', sans-serif",
      backgroundColor: '#fefce8',
      borderRadius: '12px',
      padding: '16px',
      maxWidth: '420px',
      margin: '0 auto',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      color: '#0f172a',
      fontSize: '14px',
    },
    header: {
      fontWeight: 600,
      fontSize: '18px',
      marginBottom: '4px',
    },
    sub: {
      fontSize: '12px',
      color: '#475569',
      marginBottom: '12px',
    },
    select: {
      width: '100%',
      padding: '8px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      marginBottom: '16px',
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      padding: '8px',
      borderBottom: '1px dashed #ccc',
      textAlign: 'center' as const,
    },
    active: {
      backgroundColor: '#d1fae5',
      fontWeight: 'bold',
    },
    countdown: {
      marginTop: '10px',
      textAlign: 'center' as const,
      color: '#15803d',
      fontWeight: 600,
      fontSize: '14px',
    },
  }
  