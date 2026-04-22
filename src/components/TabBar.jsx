import { C } from '../colors';

const tabs = [
  {
    k: 'home', l: 'Discover',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 10L11 3l8 7v9a1 1 0 01-1 1h-4v-6H8v6H4a1 1 0 01-1-1v-9z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    k: 'map', l: 'Map',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke={c} strokeWidth="1.6" />
        <path d="M3 11h16M11 3c2.5 2.5 2.5 13.5 0 16M11 3c-2.5 2.5-2.5 13.5 0 16" stroke={c} strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    k: 'profile', l: 'Profile',
    icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="3.5" stroke={c} strokeWidth="1.6" />
        <path d="M4 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function TabBar({ tab, setTab }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
      padding: '8px 20px 28px',
      background: 'linear-gradient(to top, rgba(10,12,16,.98) 60%, rgba(10,12,16,.8))',
      backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${C.line}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    }}>
      {tabs.map(t => (
        <div key={t.k} onClick={() => setTab(t.k)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          padding: '6px 20px', cursor: 'pointer',
          color: tab === t.k ? C.accent : C.txt3,
        }}>
          {t.icon(tab === t.k ? C.accent : C.txt3)}
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: .3 }}>{t.l}</span>
        </div>
      ))}
    </div>
  );
}
