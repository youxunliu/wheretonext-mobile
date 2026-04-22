import { C } from '../colors';
import { PASSPORTS, VISAS, RESIDENCE, computeAccess } from '../data';
import { fmtDate } from '../storage';

function MiniStat({ n, l }) {
  return (
    <div style={{ flex: 1, background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 14, padding: '14px 10px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 300, color: C.txt, lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 11, color: C.txt3, marginTop: 4, letterSpacing: .3 }}>{l}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ padding: '0 20px 20px' }}>
      <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.txt3, fontWeight: 600, padding: '0 4px 8px' }}>
        {title}
      </div>
      <div style={{ background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 16, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function Row({ icon, label, value, arrow, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
      borderBottom: `1px solid ${C.line}`, cursor: onClick ? 'pointer' : 'default',
    }}>
      <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 14, color: C.txt }}>{label}</span>
      {value && <span style={{ fontSize: 13, color: C.txt2, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>}
      {arrow && (
        <svg width="8" height="14" viewBox="0 0 8 14">
          <path d="M1 1l6 6-6 6" stroke={C.txt3} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export default function ProfileTab({ profile, user, onEdit, onLogout }) {
  const passports = (profile.passports || []).map(c => PASSPORTS.find(p => p.code === c)).filter(Boolean);
  const residence = RESIDENCE.find(r => r.code === profile.residence);
  const results = computeAccess(profile.passports, profile.residence, profile.residenceExpiry, profile.visas);
  const accessible = results.filter(d => !d.blocked).length;

  const passportValue = passports.length ? passports.map(p => `${p.flag} ${p.name}`).join(' · ') : 'Not set';
  const residenceValue = residence
    ? `${residence.name}${profile.residenceExpiry ? ' · exp ' + fmtDate(profile.residenceExpiry) : ''}`
    : 'Not set';
  const visaValue = profile.visas.length
    ? profile.visas.map(v => {
        const info = VISAS.find(x => x.code === v.code);
        return info?.short + (v.expiry ? ` (${fmtDate(v.expiry)})` : '');
      }).join(', ')
    : 'None added';

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: C.bg, color: C.txt, paddingBottom: 80 }}>
      <div style={{ padding: '68px 20px 20px' }}>
        <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: C.txt3, fontWeight: 500, marginBottom: 4 }}>Profile</div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 300 }}>Personal area</div>
      </div>

      {/* Account card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          background: C.bg2, border: `1px solid ${C.line}`, borderRadius: 20,
          padding: 20, display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 600, color: '#000',
          }}>{(user?.name?.[0] || 'A').toUpperCase()}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: C.txt }}>{user?.name || 'Alex Morgan'}</div>
            <div style={{ fontSize: 13, color: C.txt3, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              {user?.provider === 'apple' && <span></span>}
              {user?.provider === 'google' && <span style={{ color: '#ea4335' }}>G</span>}
              {user?.email || 'alex@whereto.next'}
            </div>
          </div>
        </div>
      </div>

      {/* Stat ribbon */}
      <div style={{ padding: '0 20px 20px', display: 'flex', gap: 10 }}>
        <MiniStat n={accessible} l="Accessible" />
        <MiniStat n={results.filter(d => d.surprise).length} l="Surprises" />
        <MiniStat n={profile.visas.length + (profile.residence ? 1 : 0) + (profile.passports?.length || 0)} l="Documents" />
      </div>

      <Section title="My Documents">
        <Row icon="🛂" label={passports.length > 1 ? 'Passports' : 'Passport'} value={passportValue} />
        <Row icon="🏠" label="Residence" value={residenceValue} />
        <Row icon="📄" label="Visas" value={visaValue} />
        <Row icon="✎" label="Edit documents" onClick={onEdit} arrow />
      </Section>

      <Section title="Preferences">
        <Row icon="🔔" label="Visa policy alerts" value="On" arrow />
        <Row icon="🌐" label="Language" value="English" arrow />
        <Row icon="💳" label="Flights provider" value="Google Flights" arrow />
      </Section>

      <Section title="Support">
        <Row icon="❔" label="Help & FAQ" arrow />
        <Row icon="🔒" label="Privacy Policy" arrow />
        <Row icon="📜" label="Terms of Service" arrow />
      </Section>

      <div style={{ padding: '8px 20px 24px' }}>
        <button onClick={onLogout} style={{
          width: '100%', height: 52, borderRadius: 14, background: 'transparent',
          border: `1px solid ${C.line2}`, color: C.vr, fontSize: 15, fontWeight: 500,
          fontFamily: 'inherit', cursor: 'pointer',
        }}>Sign out</button>
      </div>
      <div style={{ textAlign: 'center', fontSize: 11, color: C.txt3, padding: '0 20px 20px' }}>
        WhereToNext v1.0.0 · Made with care
      </div>
    </div>
  );
}
