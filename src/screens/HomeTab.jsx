import { C, BADGE } from '../colors';
import { PASSPORTS, computeAccess } from '../data';

function DestCardH({ d, onClick }) {
  const viaLabel = d.via === 'schengen' ? 'Schengen' : d.via === 'us' ? 'US Visa' : d.via?.toUpperCase() || '';
  return (
    <div onClick={onClick} style={{
      flexShrink: 0, width: 220, borderRadius: 16, overflow: 'hidden',
      border: `1px solid ${C.accent}33`, cursor: 'pointer',
    }}>
      <div style={{
        height: 110, background: `linear-gradient(135deg, ${d.g[0]} 0%, ${d.g[1]} 100%)`,
        position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 12,
      }}>
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: C.accent, color: '#000', fontSize: 9, fontWeight: 700,
          padding: '3px 7px', borderRadius: 100, letterSpacing: .8,
        }}>SURPRISE</div>
        <span style={{ position: 'absolute', top: 10, right: 12, fontSize: 34, filter: 'drop-shadow(0 2px 6px #0008)' }}>{d.f}</span>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,.55)', letterSpacing: 1, textTransform: 'uppercase' }}>{d.r}</div>
      </div>
      <div style={{ padding: '12px 14px', background: C.bg2 }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 400, lineHeight: 1.1 }}>{d.n}</div>
        <div style={{ fontSize: 11, color: C.txt3, marginTop: 2 }}>Via {viaLabel}</div>
      </div>
    </div>
  );
}

function DestRow({ d, onClick }) {
  const badge = BADGE[d.access.type];
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 14,
      padding: 12, cursor: 'pointer',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `linear-gradient(135deg, ${d.g[0]}, ${d.g[1]})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, flexShrink: 0,
      }}>{d.f}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: C.txt }}>{d.n}</div>
        <div style={{ fontSize: 11, color: C.txt3, marginTop: 2 }}>{d.r}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          padding: '3px 8px', borderRadius: 100, fontSize: 10, fontWeight: 600,
          background: badge.bg, color: badge.fg, display: 'inline-block',
        }}>{badge.l}</div>
        {d.access.days && <div style={{ fontSize: 10, color: C.txt3, marginTop: 3 }}>{d.access.days}d</div>}
      </div>
    </div>
  );
}

export default function HomeTab({ profile, onDetail }) {
  const results = computeAccess(profile.passports, profile.residence, profile.residenceExpiry, profile.visas);
  const surprising = results.filter(d => d.surprise);
  const passports = (profile.passports || []).map(c => PASSPORTS.find(p => p.code === c)).filter(Boolean);
  const accessible = results.filter(d => !d.blocked);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: C.bg, color: C.txt, paddingBottom: 80 }}>
      <div style={{ padding: '68px 20px 20px' }}>
        <div style={{ fontSize: 13, color: C.txt3, marginBottom: 4 }}>Good morning,</div>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 300,
          display: 'flex', alignItems: 'baseline', gap: 8,
        }}>
          <span style={{ display: 'inline-flex', gap: 2 }}>
            {passports.map(p => <span key={p.code}>{p.flag}</span>)}
          </span>
          <span>where to <em style={{ fontStyle: 'italic', color: C.accent }}>next?</em></span>
        </div>
      </div>

      {/* Hero stat card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${C.accent}18 0%, ${C.bg3} 100%)`,
          border: `1px solid ${C.accent}33`, borderRadius: 20, padding: 20,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.accent, fontWeight: 600, marginBottom: 8 }}>
            Your access score
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 56, fontWeight: 300, lineHeight: 1, color: C.txt }}>
              {accessible.length}
            </div>
            <div style={{ fontSize: 14, color: C.txt2 }}>of {results.length} destinations</div>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
            {results.map((d, i) => (
              <div key={i} style={{
                flex: 1, height: 6, borderRadius: 3,
                background: d.blocked ? C.line2 : d.surprise ? C.surprise : d.access.type === 'vf' ? C.vf : d.access.type === 'voa' ? C.voa : C.ev,
                opacity: d.blocked ? .3 : 1,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Surprising finds */}
      {surprising.length > 0 && (
        <>
          <div style={{ padding: '12px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 400, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: C.accent }}>✦</span> Surprising finds
            </h3>
            <span style={{ fontSize: 12, color: C.txt3 }}>{surprising.length} places</span>
          </div>
          <div style={{ padding: '0 20px 8px', fontSize: 12, color: C.txt3, lineHeight: 1.5 }}>
            Places accessible because of your visas and residence — not your passport alone.
          </div>
          <div style={{ padding: '8px 0 20px', display: 'flex', gap: 12, overflowX: 'auto', paddingLeft: 20, paddingRight: 20 }}>
            {surprising.map(d => <DestCardH key={d.c} d={d} onClick={() => onDetail(d)} />)}
          </div>
        </>
      )}

      {/* All accessible */}
      <div style={{ padding: '8px 20px 12px' }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 400, margin: 0 }}>All accessible</h3>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {accessible.filter(d => !d.surprise).slice(0, 12).map(d => (
          <DestRow key={d.c} d={d} onClick={() => onDetail(d)} />
        ))}
      </div>
    </div>
  );
}
