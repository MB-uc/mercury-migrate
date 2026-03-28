export default function MetricCards({ metrics }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      gap: 10,
      marginBottom: 16,
    }}>
      {metrics.map((m, i) => (
        <div key={i} style={{
          background: 'var(--surface-2)',
          borderRadius: 8,
          padding: '10px 14px',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 4 }}>{m.label}</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1 }}>{m.value}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>{m.sub}</div>
          {m.progress != null && (
            <div style={{ background: 'var(--surface-3)', borderRadius: 4, height: 5, marginTop: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${m.progress}%`, background: 'var(--accent)', borderRadius: 4, transition: 'width 0.6s ease' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
