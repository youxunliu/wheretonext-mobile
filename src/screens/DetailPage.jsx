import { C, BADGE } from '../colors';
import { PASSPORTS } from '../data';

function MetaItem({ k, v }) {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: C.txt3, fontWeight: 600, marginBottom: 2 }}>{k}</div>
      <div style={{ fontSize: 13, fontWeight: 500, color: C.txt }}>{v}</div>
    </div>
  );
}

function viaLabel(via) {
  if (!via) return null;
  if (via === 'schengen') return 'Schengen Visa/Residence';
  if (via === 'us') return 'US B1/B2 Visa';
  if (via === 'uk') return 'UK Visa';
  if (via === 'ca') return 'Canada Visa';
  return via.toUpperCase();
}

export default function DetailPage({ d, profile, onBack }) {
  const passport = PASSPORTS.find(p => p.code === (d.viaPassport || profile.passports?.[0]));
  const badge = d.surprise
    ? { bg: 'rgba(34,211,238,.18)', fg: C.surprise, l: '✦ Surprise Unlock' }
    : BADGE[d.access.type];
  const via = viaLabel(d.via);

  return (
    <div style={{ height: '100%', background: C.bg, color: C.txt, overflowY: 'auto', paddingBottom: 40 }}>
      {/* Hero */}
      <div style={{
        height: 240, background: `linear-gradient(135deg, ${d.g[0]}, ${d.g[1]})`,
        padding: '80px 20px 20px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.3), transparent 40%, rgba(0,0,0,.4))' }} />
        <div onClick={onBack} style={{
          position: 'absolute', top: 70, left: 16, zIndex: 2,
          width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,.35)',
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M9 3L5 7l4 4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span style={{ position: 'absolute', top: 60, right: 22, fontSize: 68, filter: 'drop-shadow(0 4px 12px #0006)', zIndex: 2 }}>{d.f}</span>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 6, fontWeight: 500 }}>{d.r}</div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 38, fontWeight: 300, color: '#fff', lineHeight: 1 }}>{d.n}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', marginTop: 6 }}>{d.tl}</div>
        </div>
      </div>

      {/* Entry summary card */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 20, padding: 18 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.txt3, fontWeight: 600, marginBottom: 14 }}>
            Entry for {passport?.flag} {passport?.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <span style={{
                padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 600,
                background: badge.bg, color: badge.fg, display: 'inline-block',
              }}>{badge.l}</span>
              <div style={{ fontSize: 13, color: C.txt2, marginTop: 10, lineHeight: 1.6 }}>
                {d.surprise
                  ? `Accessible via your ${via} — not your passport alone.`
                  : 'Your passport grants you entry to this destination.'}
              </div>
            </div>
            {d.access.days && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 300, color: C.accent, lineHeight: 1 }}>{d.access.days}</div>
                <div style={{ fontSize: 10, color: C.txt3, letterSpacing: 1, textTransform: 'uppercase' }}>days max</div>
              </div>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
            <MetaItem k="Currency" v={d.cu} />
            <MetaItem k="Language" v={d.la} />
            <MetaItem k="Method" v={d.surprise ? `Via ${via?.split(' ')[0]}` : 'Passport'} />
            <MetaItem k="Type" v={badge.l} />
          </div>
        </div>
      </div>

      {/* Entry note */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.txt3, fontWeight: 600, marginBottom: 10 }}>
          Entry requirements
        </div>
        <div style={{
          background: 'rgba(34,211,238,.06)', border: '1px solid rgba(34,211,238,.2)',
          borderRadius: 14, padding: 14, fontSize: 13, color: C.txt2, lineHeight: 1.6,
        }}>{d.nt}</div>
      </div>

      {/* Highlights */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.txt3, fontWeight: 600, marginBottom: 10 }}>
          Not to be missed
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {d.hl.map(h => (
            <span key={h} style={{
              padding: '6px 12px', background: C.bg3, border: `1px solid ${C.line}`,
              borderRadius: 100, fontSize: 12, color: C.txt2,
            }}>{h}</span>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '8px 20px 16px' }}>
        <div style={{
          background: 'rgba(250,204,21,.05)', border: '1px solid rgba(250,204,21,.2)',
          borderRadius: 14, padding: 14, fontSize: 12, color: C.txt3, lineHeight: 1.6,
        }}>
          <strong style={{ color: C.accent2 }}>Disclaimer:</strong> Visa policies change frequently. Always verify entry requirements with the official embassy of your destination before travelling. WhereToNext is not liable for travel disruptions.
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={() => window.open('https://www.google.com/flights', '_blank')}
          style={{
            height: 54, borderRadius: 27, background: C.accent, color: '#000',
            fontSize: 15, fontWeight: 600, border: 'none', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer',
          }}
        >
          ✈ See Flights
        </button>
        <button style={{
          height: 48, borderRadius: 24, background: 'transparent', border: `1px solid ${C.line2}`,
          color: C.txt2, fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer',
        }}>♥ Save to trips</button>
      </div>
    </div>
  );
}
