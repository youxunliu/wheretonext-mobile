import { useState, useEffect } from 'react';
import { C } from '../colors';
import Globe from '../components/Globe';

const TOUR_MARKERS = [
  { lon: 73.5,   lat: 4,    label: 'Maldives',   emoji: '🇲🇻', blurb: 'Overwater paradise — open to all passports.' },
  { lon: 44.8,   lat: 41.7, label: 'Georgia',    emoji: '🇬🇪', blurb: '365-day stay for almost everyone.' },
  { lon: 19.8,   lat: 41.3, label: 'Albania',    emoji: '🇦🇱', blurb: 'Unlocked by a Schengen visa — a surprise find.' },
  { lon: 103.85, lat: 1.35, label: 'Singapore',  emoji: '🇸🇬', blurb: 'Gateway to Southeast Asia.' },
  { lon: 37.9,   lat: -1.3, label: 'Kenya',      emoji: '🇰🇪', blurb: 'Great Migration, simple eTA.' },
  { lon: -99.1,  lat: 19.4, label: 'Mexico',     emoji: '🇲🇽', blurb: 'Open with a US or Canadian visa.' },
];

const STARS = Array.from({ length: 30 }).map((_, k) => ({
  x: (k * 101) % 100, y: (k * 47) % 100, sz: (k % 3) + 1, o: .3 + (k % 5) * .1,
}));

const slides = [
  { title: 'Unlock your\nfull itinerary', sub: 'See every country your passport, residence and visas make accessible — not just the obvious ones.' },
  { title: 'Find surprising\ndestinations', sub: "A Schengen residence permit can open a dozen countries you didn't know you could visit visa-free." },
  { title: 'One tap,\nall borders', sub: 'An interactive world map, colour-coded by access type, with current entry requirements.' },
];

export default function Onboarding({ onNext }) {
  const [i, setI] = useState(0);
  const [tourIdx, setTourIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTourIdx(x => (x + 1) % TOUR_MARKERS.length), 1800);
    return () => clearInterval(id);
  }, []);

  const s = slides[i];
  const zoom = [1, 1.18, 1.4][i];
  const rot = [18, 10, 5][i];
  const m = TOUR_MARKERS[tourIdx];

  return (
    <div style={{
      height: '100%', background: `radial-gradient(ellipse at 50% 20%, #0f1522 0%, ${C.bg} 65%)`,
      color: C.txt, display: 'flex', flexDirection: 'column', padding: '52px 24px 28px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .5 }}>
        {STARS.map((s, k) => (
          <div key={k} style={{
            position: 'absolute', left: s.x + '%', top: s.y + '%',
            width: s.sz, height: s.sz, background: '#fff', borderRadius: '50%', opacity: s.o,
          }} />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 230, position: 'relative', zIndex: 2 }}>
        <Globe size={210} zoom={zoom} rotateSpeed={rot} markers={TOUR_MARKERS} activeMarkerIdx={tourIdx} showPlane={true} />
      </div>

      <div style={{ textAlign: 'center', minHeight: 30, marginTop: 2, zIndex: 2 }}>
        <div key={tourIdx} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(34,211,238,.08)', border: `1px solid ${C.accent}44`,
          borderRadius: 100, padding: '5px 14px', fontSize: 12,
          animation: 'fadeSlide .5s ease-out',
        }}>
          <span style={{ fontSize: 14 }}>{m.emoji}</span>
          <span style={{ color: C.txt, fontWeight: 500 }}>{m.label}</span>
          <span style={{ color: C.txt3, marginLeft: 4 }}>· {m.blurb}</span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 12, zIndex: 2 }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 300,
          lineHeight: 1.15, whiteSpace: 'pre-line', margin: '0 0 10px',
        }}>{s.title}</h1>
        <p style={{ fontSize: 13, color: C.txt2, lineHeight: 1.5, maxWidth: 300, margin: '0 auto' }}>{s.sub}</p>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '14px 0 12px', zIndex: 2 }}>
        {slides.map((_, idx) => (
          <div key={idx} style={{
            width: idx === i ? 20 : 6, height: 6, borderRadius: 3,
            background: idx === i ? C.accent : C.line2, transition: 'all .25s',
          }} />
        ))}
      </div>

      <button onClick={() => i < slides.length - 1 ? setI(i + 1) : onNext()} style={{
        height: 54, borderRadius: 27, background: C.accent, color: '#000',
        fontSize: 15, fontWeight: 600, border: 'none', fontFamily: 'inherit',
        cursor: 'pointer', zIndex: 2,
      }}>
        {i < slides.length - 1 ? 'Continue' : 'Get Started'}
      </button>
      {i < slides.length - 1 && (
        <div onClick={onNext} style={{
          textAlign: 'center', marginTop: 12, color: C.txt3, fontSize: 14, cursor: 'pointer', zIndex: 2,
        }}>Skip</div>
      )}
      <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
