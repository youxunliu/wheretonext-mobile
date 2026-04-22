import { useState } from 'react';
import { C } from '../colors';
import { PASSPORTS, VISAS, RESIDENCE, isExpired } from '../data';
import { MSelect, MSelectMulti } from '../components/MSelect';
import DateField from '../components/DateField';

const labelStyle = {
  display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: .3,
  color: C.txt2, marginBottom: 8, textTransform: 'uppercase',
};

export default function DataEntry({ onSubmit, initial }) {
  const initPassports = initial?.passports ?? (initial?.passport ? [initial.passport] : []);
  const initVisas = initial?.visas ?? [];
  const normalizedVisas = Array.isArray(initVisas) && initVisas.length && typeof initVisas[0] === 'string'
    ? initVisas.map(c => ({ code: c, expiry: '' }))
    : initVisas;

  const [passports, setPassports] = useState(initPassports);
  const [residence, setResidence] = useState(initial?.residence || '');
  const [residenceExpiry, setResidenceExpiry] = useState(initial?.residenceExpiry || '');
  const [visas, setVisas] = useState(normalizedVisas);
  const [pickerOpen, setPickerOpen] = useState(false);

  const toggleVisa = c => setVisas(v => {
    const exists = v.find(x => x.code === c);
    return exists ? v.filter(x => x.code !== c) : [...v, { code: c, expiry: '' }];
  });
  const setVisaExpiry = (c, e) => setVisas(v => v.map(x => x.code === c ? { ...x, expiry: e } : x));
  const removePassport = c => setPassports(p => p.filter(x => x !== c));
  const addPassport = c => setPassports(p => p.includes(c) ? p : [...p, c]);

  return (
    <div style={{
      height: '100%', background: C.bg, color: C.txt, position: 'relative',
      display: 'flex', flexDirection: 'column', padding: '64px 24px 40px', overflowY: 'auto',
    }}>
      <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: C.accent, fontWeight: 500, marginBottom: 6 }}>
        Your profile
      </div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 300, lineHeight: 1.15, margin: '0 0 28px' }}>
        Your travel<br /><em style={{ fontStyle: 'italic', color: C.txt2 }}>documents</em>
      </h1>

      {/* Passports (multi) */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: .3, color: C.txt2, textTransform: 'uppercase' }}>
          Passport nationalities
        </div>
        <div style={{ fontSize: 11, color: C.txt3, marginTop: 3, lineHeight: 1.4 }}>
          Required. Add multiple if you're a dual citizen.
        </div>
      </div>

      {passports.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {passports.map(code => {
            const p = PASSPORTS.find(x => x.code === code);
            if (!p) return null;
            return (
              <div key={code} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(34,211,238,.1)', border: `1px solid ${C.accent}55`,
                borderRadius: 100, padding: '6px 8px 6px 10px',
              }}>
                <span style={{ fontSize: 16 }}>{p.flag}</span>
                <span style={{ fontSize: 13, color: C.txt, fontWeight: 500 }}>{p.name}</span>
                <div onClick={() => removePassport(code)} style={{
                  width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', marginLeft: 2,
                }}>
                  <svg width="8" height="8" viewBox="0 0 8 8">
                    <path d="M1 1l6 6M7 1L1 7" stroke={C.txt2} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div onClick={() => setPickerOpen(true)} style={{
        height: 52, borderRadius: 14, background: C.bg3, border: `1px dashed ${C.line2}`,
        padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
        color: C.txt2, fontSize: 14,
      }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>＋</span>
        <span>{passports.length === 0 ? 'Add passport' : 'Add another passport'}</span>
      </div>

      {pickerOpen && (
        <MSelectMulti
          options={PASSPORTS.filter(p => !passports.includes(p.code))}
          onPick={(code) => { addPassport(code); setPickerOpen(false); }}
          onClose={() => setPickerOpen(false)}
          placeholder="Search countries…"
        />
      )}

      {/* Residence */}
      <label style={{ ...labelStyle, marginTop: 24 }}>
        Country of residence
        <span style={{ color: C.txt3, fontWeight: 400, marginLeft: 6, textTransform: 'none', letterSpacing: 0 }}>optional</span>
      </label>
      <MSelect options={RESIDENCE} value={residence} onChange={setResidence} placeholder="Where do you live?" />
      {residence && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 11, color: C.txt3, marginBottom: 6, letterSpacing: .3, textTransform: 'uppercase' }}>
            Residence permit expires
          </div>
          <DateField value={residenceExpiry} onChange={setResidenceExpiry} placeholder="Optional · leave blank if permanent" />
        </div>
      )}
      <div style={{ fontSize: 12, color: C.txt3, marginTop: 8, lineHeight: 1.5 }}>
        Schengen, US or UK residence can unlock additional destinations.
      </div>

      <div style={{ height: 1, background: C.line, margin: '28px 0 20px' }} />

      <label style={labelStyle}>
        Existing visas or permits
        <span style={{ color: C.txt3, fontWeight: 400, marginLeft: 6, textTransform: 'none', letterSpacing: 0 }}>optional</span>
      </label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {VISAS.map(v => {
          const visa = visas.find(x => x.code === v.code);
          const sel = !!visa;
          const expired = isExpired(visa?.expiry);
          return (
            <div key={v.code} style={{
              borderRadius: 14,
              background: sel ? 'rgba(34,211,238,.08)' : C.bg3,
              border: `1px solid ${expired ? C.vr + '88' : sel ? C.accent : C.line}`,
              overflow: 'hidden',
            }}>
              <div onClick={() => toggleVisa(v.code)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer',
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                  background: sel ? C.accent : 'transparent',
                  border: `1.5px solid ${sel ? C.accent : C.line2}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {sel && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span style={{ flex: 1, fontSize: 14, color: C.txt, fontWeight: 500 }}>{v.name}</span>
                {expired && <span style={{ fontSize: 10, color: C.vr, fontWeight: 600, letterSpacing: .5, textTransform: 'uppercase' }}>Expired</span>}
              </div>
              {sel && (
                <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 11, color: C.txt3, letterSpacing: .3, textTransform: 'uppercase' }}>Expires</div>
                  <DateField value={visa.expiry} onChange={(e) => setVisaExpiry(v.code, e)} placeholder="Optional" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ height: 24 }} />
      <button
        disabled={!passports.length}
        onClick={() => onSubmit({ passports, residence, residenceExpiry, visas })}
        style={{
          height: 54, borderRadius: 27, background: C.accent, color: '#000',
          fontSize: 15, fontWeight: 600, border: 'none', fontFamily: 'inherit',
          opacity: passports.length ? 1 : .4,
          cursor: passports.length ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        Find My Destinations →
      </button>
    </div>
  );
}
