import { useState } from 'react';
import { C, BADGE } from '../colors';
import { computeAccess } from '../data';

const COL = { vf: C.vf, voa: C.voa, ev: C.ev, vr: C.vr, surprise: C.surprise };

function accessKey(d) {
  if (d.blocked) return 'vr';
  if (d.surprise) return 'surprise';
  return d.access.type;
}

function Legend({ c, l, ring }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.txt2 }}>
      {ring
        ? <div style={{ width: 8, height: 8, borderRadius: '50%', border: `1px solid ${c}`, position: 'relative' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: c, position: 'absolute', top: 1, left: 1 }} />
          </div>
        : <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />}
      <span>{l}</span>
    </div>
  );
}

function Stat({ n, l, c }) {
  return (
    <div style={{ background: C.bg2, borderRadius: 12, padding: '10px 8px', textAlign: 'center', border: `1px solid ${C.line}` }}>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 400, color: c, lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 10, color: C.txt3, marginTop: 3, letterSpacing: .3 }}>{l}</div>
    </div>
  );
}

function SelectedSheet({ d, onClose, onDetail }) {
  const k = d.blocked ? 'vr' : d.surprise ? null : d.access.type;
  const badge = d.surprise ? { bg: 'rgba(34,211,238,.18)', fg: C.surprise, l: '✦ Surprise Unlock' } : BADGE[k];
  return (
    <div style={{ background: C.bg2, borderRadius: 16, border: `1px solid ${C.line}`, padding: 16, marginTop: 8 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 36 }}>{d.f}</span>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 400, lineHeight: 1.1 }}>{d.n}</div>
            <div style={{ fontSize: 11, color: C.txt3, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>{d.r}</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', color: C.txt3, fontSize: 20, border: 'none', cursor: 'pointer' }}>×</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{
          padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600,
          background: badge.bg, color: badge.fg, letterSpacing: .5,
        }}>{badge.l}</span>
        {!d.blocked && d.access.days && <span style={{ fontSize: 12, color: C.txt2 }}>up to {d.access.days} days</span>}
      </div>
      {d.blocked
        ? <div style={{ fontSize: 13, color: C.txt2, lineHeight: 1.6 }}>Your current documents don't grant access. You'll need to apply for a visa at a consulate.</div>
        : <div style={{ fontSize: 13, color: C.txt2, lineHeight: 1.6 }}>{d.nt}</div>}
      {!d.blocked && (
        <button onClick={onDetail} style={{
          marginTop: 14, width: '100%', height: 44, borderRadius: 22,
          background: C.accent, color: '#000', fontSize: 14, fontWeight: 600,
          border: 'none', fontFamily: 'inherit', cursor: 'pointer',
        }}>View Details →</button>
      )}
    </div>
  );
}

function MiniRow({ d, onClick }) {
  const k = d.blocked ? 'vr' : d.surprise ? null : d.access.type;
  const badge = d.surprise ? { bg: 'rgba(34,211,238,.18)', fg: C.surprise, l: '✦' } : BADGE[k];
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px', background: C.bg2, borderRadius: 12,
      border: `1px solid ${C.line}`, cursor: 'pointer',
    }}>
      <span style={{ fontSize: 22 }}>{d.f}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: C.txt }}>{d.n}</div>
        <div style={{ fontSize: 11, color: C.txt3 }}>{d.r}</div>
      </div>
      <span style={{
        padding: '3px 8px', borderRadius: 100, fontSize: 10, fontWeight: 600,
        background: badge.bg, color: badge.fg,
      }}>{badge.l}</span>
    </div>
  );
}

// Fixed background dots — generated once outside component to avoid re-render flicker
const BG_DOTS = (() => {
  const dots = [];
  const add = (x0, y0, x1, y1, n) => {
    for (let i = 0; i < n; i++) {
      dots.push([x0 + ((i * 97 + i * 37) % (x1 - x0 + 1)), y0 + ((i * 53 + i * 71) % (y1 - y0 + 1))]);
    }
  };
  add(40, 60, 110, 110, 60);   // N America
  add(70, 110, 100, 160, 40);  // S America
  add(150, 55, 185, 80, 30);   // Europe
  add(160, 85, 200, 145, 60);  // Africa
  add(190, 70, 210, 95, 25);   // Middle East
  add(210, 60, 280, 110, 70);  // Asia
  add(235, 100, 260, 125, 30); // SE Asia
  add(250, 135, 280, 160, 25); // Oceania
  return dots;
})();

export default function WorldMap({ profile, onDetail }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const results = computeAccess(profile.passports, profile.residence, profile.residenceExpiry, profile.visas);

  const filtered = filter === 'all' ? results
    : filter === 'surprise' ? results.filter(d => d.surprise)
    : results.filter(d => accessKey(d) === filter);

  const stats = {
    vf: results.filter(d => !d.surprise && !d.blocked && d.access.type === 'vf').length,
    voa: results.filter(d => !d.surprise && !d.blocked && (d.access.type === 'voa' || d.access.type === 'ev')).length,
    surprise: results.filter(d => d.surprise).length,
    vr: results.filter(d => d.blocked).length,
  };

  return (
    <div style={{ height: '100%', background: C.bg, color: C.txt, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '72px 20px 14px' }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: C.txt3, fontWeight: 500, marginBottom: 4 }}>
          World map
        </div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 300 }}>
          Your <em style={{ fontStyle: 'italic', color: C.accent }}>accessible</em> world
        </div>
      </div>

      {/* Map */}
      <div style={{ padding: '0 16px', position: 'relative' }}>
        <div style={{
          background: C.bg2, borderRadius: 20, border: `1px solid ${C.line}`,
          padding: 8, position: 'relative', overflow: 'hidden',
        }}>
          <svg viewBox="0 0 320 180" style={{ width: '100%', display: 'block' }}>
            {BG_DOTS.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="0.8" fill={C.line2} opacity=".8" />)}
            {filtered.map(d => {
              const k = accessKey(d);
              const col = COL[k];
              const isSel = selected?.c === d.c;
              return (
                <g key={d.c} style={{ cursor: 'pointer' }} onClick={() => setSelected(d)}>
                  {isSel && <circle cx={d.x} cy={d.y} r="8" fill={col} opacity=".25" />}
                  {d.surprise && <circle cx={d.x} cy={d.y} r="6" fill="none" stroke={col} strokeWidth="0.7" opacity=".6" />}
                  <circle cx={d.x} cy={d.y} r={isSel ? 3.5 : 2.7} fill={col}
                    stroke={d.surprise ? C.bg2 : 'none'} strokeWidth={d.surprise ? 0.5 : 0} />
                </g>
              );
            })}
          </svg>
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(10,12,16,.7)', backdropFilter: 'blur(8px)',
            borderRadius: 10, padding: '8px 10px', fontSize: 10,
            display: 'flex', flexDirection: 'column', gap: 5,
          }}>
            <Legend c={C.vf} l="Visa-Free" />
            <Legend c={C.voa} l="VOA / e-Visa" />
            <Legend c={C.surprise} l="Surprise ✦" ring />
            <Legend c={C.vr} l="Visa Required" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
        <Stat n={stats.vf} l="Visa-free" c={C.vf} />
        <Stat n={stats.voa} l="VOA/eVisa" c={C.voa} />
        <Stat n={stats.surprise} l="Surprise" c={C.surprise} />
        <Stat n={stats.vr} l="Required" c={C.vr} />
      </div>

      {/* Filter chips */}
      <div style={{ padding: '4px 16px 8px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {[['all', 'All'], ['vf', 'Visa-Free'], ['voa', 'VOA'], ['ev', 'e-Visa'], ['surprise', '✦ Surprise'], ['vr', 'Required']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 500,
            background: filter === k ? 'rgba(34,211,238,.12)' : C.bg3,
            color: filter === k ? C.accent : C.txt2,
            border: `1px solid ${filter === k ? C.accent : C.line}`,
            fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer',
          }}>{l}</button>
        ))}
      </div>

      {/* List / selected sheet */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 80px' }}>
        {selected ? (
          <SelectedSheet d={selected} onClose={() => setSelected(null)} onDetail={() => onDetail(selected)} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.txt3, fontWeight: 600, padding: '8px 0 4px' }}>
              Tap a dot, or browse below
            </div>
            {filtered.slice(0, 20).map(d => <MiniRow key={d.c} d={d} onClick={() => onDetail(d)} />)}
          </div>
        )}
      </div>
    </div>
  );
}
