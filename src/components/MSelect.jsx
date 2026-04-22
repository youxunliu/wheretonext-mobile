import { useState } from 'react';
import { C } from '../colors';

export function MSelect({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const sel = options.find(o => o.code === value);
  const filt = options.filter(o => o.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div onClick={() => setOpen(true)} style={{
        height: 52, borderRadius: 14, background: C.bg3, border: `1px solid ${C.line}`,
        padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
      }}>
        <span style={{ fontSize: 22 }}>{sel?.flag || '🌐'}</span>
        <span style={{ fontSize: 15, color: sel ? C.txt : C.txt3, flex: 1 }}>
          {sel?.name || placeholder}
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14">
          <path d="M3 5l4 4 4-4" stroke={C.txt2} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 200,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }} onClick={() => setOpen(false)}>
          <div style={{
            background: C.bg2, borderTopLeftRadius: 24, borderTopRightRadius: 24,
            padding: '20px 0 32px', maxHeight: '72%', display: 'flex', flexDirection: 'column',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 38, height: 4, background: C.line2, borderRadius: 2, margin: '0 auto 16px' }} />
            <div style={{ padding: '0 20px 12px' }}>
              <input autoFocus value={q} onChange={e => setQ(e.target.value)}
                placeholder="Search…"
                style={{
                  width: '100%', height: 44, borderRadius: 12, background: C.bg3,
                  border: `1px solid ${C.line}`, padding: '0 14px', fontSize: 15,
                  color: C.txt, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                }} />
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {filt.map(o => (
                <div key={o.code} onClick={() => { onChange(o.code); setOpen(false); setQ(''); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 20px',
                    background: o.code === value ? C.bg3 : 'transparent',
                    cursor: 'pointer',
                  }}>
                  <span style={{ fontSize: 22 }}>{o.flag || '🌐'}</span>
                  <span style={{ fontSize: 16, color: C.txt }}>{o.name}</span>
                </div>
              ))}
              {filt.length === 0 && <div style={{ padding: 20, color: C.txt3, textAlign: 'center' }}>No results</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function MSelectMulti({ options, onPick, onClose, placeholder }) {
  const [q, setQ] = useState('');
  const filt = options.filter(o => o.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 200,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }} onClick={onClose}>
      <div style={{
        background: C.bg2, borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: '20px 0 32px', maxHeight: '72%', display: 'flex', flexDirection: 'column',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 38, height: 4, background: C.line2, borderRadius: 2, margin: '0 auto 16px' }} />
        <div style={{ padding: '0 20px 12px' }}>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)}
            placeholder={placeholder || 'Search…'}
            style={{
              width: '100%', height: 44, borderRadius: 12, background: C.bg3,
              border: `1px solid ${C.line}`, padding: '0 14px', fontSize: 15,
              color: C.txt, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
            }} />
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {filt.map(o => (
            <div key={o.code} onClick={() => onPick(o.code)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', cursor: 'pointer' }}>
              <span style={{ fontSize: 22 }}>{o.flag || '🌐'}</span>
              <span style={{ fontSize: 16, color: C.txt }}>{o.name}</span>
            </div>
          ))}
          {filt.length === 0 && <div style={{ padding: 20, color: C.txt3, textAlign: 'center' }}>No results</div>}
        </div>
      </div>
    </div>
  );
}
