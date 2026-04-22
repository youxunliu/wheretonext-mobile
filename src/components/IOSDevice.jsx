export default function IOSDevice({ children, dark = true }) {
  return (
    <div style={{
      width: 402, height: 874, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
      fontFamily: '-apple-system, system-ui, sans-serif',
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50,
      }} />
      {/* Status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 32px 14px', pointerEvents: 'none',
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: dark ? '#fff' : '#000' }}>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="17" height="11" viewBox="0 0 17 11">
            <rect x="0" y="7" width="3" height="4" rx=".5" fill={dark ? '#fff' : '#000'} />
            <rect x="4.5" y="5" width="3" height="6" rx=".5" fill={dark ? '#fff' : '#000'} />
            <rect x="9" y="2.5" width="3" height="8.5" rx=".5" fill={dark ? '#fff' : '#000'} />
            <rect x="13.5" y="0" width="3" height="11" rx=".5" fill={dark ? '#fff' : '#000'} />
          </svg>
          <svg width="15" height="11" viewBox="0 0 15 11">
            <path d="M7.5 2.8c2 0 3.9.8 5.2 2.1l1-1A8.7 8.7 0 007.5 1.2 8.7 8.7 0 001.3 3.9l1 1A7.4 7.4 0 017.5 2.8zm0 3.2c1.2 0 2.3.5 3.1 1.3l1-1A6 6 0 007.5 4.6a6 6 0 00-4.1 1.7l1 1A4.4 4.4 0 017.5 6zM7.5 9a1.3 1.3 0 100 2.5 1.3 1.3 0 000-2.5z" fill={dark ? '#fff' : '#000'} />
          </svg>
          <div style={{ width: 24, height: 11, border: `1px solid ${dark ? '#fff' : '#000'}66`, borderRadius: 3, padding: 1, position: 'relative' }}>
            <div style={{ width: '80%', height: '100%', background: dark ? '#fff' : '#000', borderRadius: 1 }} />
          </div>
        </div>
      </div>
      <div style={{ height: '100%' }}>{children}</div>
      {/* Home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 139, height: 5, borderRadius: 100, zIndex: 60,
        background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
