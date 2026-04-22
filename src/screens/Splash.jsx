import { useEffect } from 'react';
import { C } from '../colors';
import Globe from '../components/Globe';

const STARS = Array.from({ length: 40 }).map((_, i) => ({
  x: (i * 97) % 100, y: (i * 53) % 100, s: (i % 3) + 1, o: .3 + (i % 5) * .12,
}));

export default function Splash({ onNext }) {
  useEffect(() => {
    const t = setTimeout(onNext, 2400);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <div style={{
      height: '100%', background: `radial-gradient(ellipse at 50% 40%, #0f1522 0%, ${C.bg} 70%)`,
      color: C.txt, display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 40, paddingBottom: 60, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .6 }}>
        {STARS.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', left: s.x + '%', top: s.y + '%',
            width: s.s, height: s.s, background: '#fff', borderRadius: '50%', opacity: s.o,
          }} />
        ))}
      </div>
      <Globe size={260} zoom={1} rotateSpeed={20} showPlane={true} />
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 300 }}>
          WhereTo<em style={{ fontStyle: 'italic', color: C.accent }}>Next</em>
        </div>
        <div style={{ fontSize: 12, color: C.txt3, letterSpacing: 3, textTransform: 'uppercase', marginTop: 8 }}>
          Passport intelligence
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 6, justifyContent: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: '50%', background: C.accent,
              animation: `dot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
      </div>
      <style>{`@keyframes dot{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
    </div>
  );
}
