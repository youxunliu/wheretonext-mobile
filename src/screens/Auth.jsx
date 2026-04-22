import { C } from '../colors';

const authBtn = (bg, fg) => ({
  height: 52, borderRadius: 26, background: bg, color: fg, fontSize: 15, fontWeight: 600,
  border: 'none', fontFamily: 'inherit', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
});

export default function Auth({ onNext }) {
  return (
    <div style={{
      height: '100%', background: C.bg, color: C.txt,
      display: 'flex', flexDirection: 'column', padding: '72px 28px 40px',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: C.accent, fontWeight: 500, marginBottom: 4 }}>
          Welcome
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 38, fontWeight: 300, lineHeight: 1.1, margin: 0 }}>
          Sign in to<br /><em style={{ fontStyle: 'italic', color: C.accent }}>WhereToNext</em>
        </h1>
        <p style={{ fontSize: 14, color: C.txt2, lineHeight: 1.6, marginTop: 12 }}>
          Save your travel profile, sync across devices, and get notified when visa policies change.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        <button onClick={() => onNext('apple')} style={authBtn('#fff', '#000')}>
          <svg width="16" height="19" viewBox="0 0 16 19" fill="currentColor">
            <path d="M12.5 10.3c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8 2.1-1.2 2.9-2.4c.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.7zM10 3c.7-.8 1.1-1.9 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3C8.1 4.5 9.3 3.8 10 3z" />
          </svg>
          Continue with Apple
        </button>
        <button onClick={() => onNext('google')} style={authBtn('#fff', '#1f2937')}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.4h4.8c-.2 1.1-.8 2-1.8 2.6v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.4z" />
            <path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3C2.4 15.9 5.5 18 9 18z" />
            <path fill="#FBBC05" d="M3.9 10.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V5H.9C.3 6.2 0 7.6 0 9s.3 2.8.9 4l3-2.3z" />
            <path fill="#EA4335" d="M9 3.6c1.3 0 2.6.5 3.5 1.4l2.6-2.6C13.5.9 11.4 0 9 0 5.5 0 2.4 2.1.9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z" />
          </svg>
          Continue with Google
        </button>
        <button onClick={() => onNext('email')} style={{ ...authBtn('transparent', C.txt), border: `1px solid ${C.line2}` }}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <rect x="1" y="1" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M1 3l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Sign in with Email
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
          <div style={{ flex: 1, height: 1, background: C.line }} />
          <span style={{ fontSize: 12, color: C.txt3 }}>or</span>
          <div style={{ flex: 1, height: 1, background: C.line }} />
        </div>
        <button onClick={() => onNext('guest')} style={{
          height: 48, background: 'none', color: C.txt2, fontSize: 14,
          border: 'none', fontFamily: 'inherit', cursor: 'pointer',
        }}>
          Continue as guest
        </button>
      </div>
      <div style={{ fontSize: 11, color: C.txt3, textAlign: 'center', lineHeight: 1.6 }}>
        By continuing, you agree to our <span style={{ color: C.txt2 }}>Terms of Service</span> and <span style={{ color: C.txt2 }}>Privacy Policy</span>.
      </div>
    </div>
  );
}
