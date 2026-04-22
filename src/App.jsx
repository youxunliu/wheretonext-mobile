import { useState, useEffect } from 'react';
import { C } from './colors';
import { ls, ss } from './storage';
import IOSDevice from './components/IOSDevice';
import TabBar from './components/TabBar';
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Auth from './screens/Auth';
import DataEntry from './screens/DataEntry';
import HomeTab from './screens/HomeTab';
import WorldMap from './screens/WorldMap';
import ProfileTab from './screens/ProfileTab';
import DetailPage from './screens/DetailPage';

function migrateProfile(p) {
  if (!p) return null;
  return {
    passports: p.passports ?? (p.passport ? [p.passport] : []),
    residence: p.residence || '',
    residenceExpiry: p.residenceExpiry || '',
    visas: Array.isArray(p.visas) && p.visas.length && typeof p.visas[0] === 'string'
      ? p.visas.map(c => ({ code: c, expiry: '' }))
      : (p.visas || []),
  };
}

export default function App() {
  const [screen, setScreen] = useState(ls('screen', 'splash'));
  const [tab, setTab] = useState(ls('tab', 'home'));
  const [profile, setProfile] = useState(() => migrateProfile(ls('profile', null)));
  const [user, setUser] = useState(ls('user', null));
  const [detail, setDetail] = useState(null);

  useEffect(() => ss('screen', screen), [screen]);
  useEffect(() => ss('tab', tab), [tab]);

  function handleAuth(provider) {
    const fake = {
      apple:  { name: 'Alex Morgan', email: 'alex@privaterelay.apple', provider: 'apple' },
      google: { name: 'Alex Morgan', email: 'alex.morgan@gmail.com',   provider: 'google' },
      email:  { name: 'Alex Morgan', email: 'alex@whereto.next',       provider: 'email' },
      guest:  { name: 'Guest',       email: 'guest@whereto.next',      provider: 'guest' },
    };
    const u = fake[provider];
    setUser(u);
    ss('user', u);
    setScreen(profile ? 'main' : 'entry');
  }

  function handleSubmit(data) {
    setProfile(data);
    ss('profile', data);
    setScreen('main');
  }

  function logout() {
    setUser(null); setProfile(null);
    ss('user', null); ss('profile', null);
    setScreen('auth');
  }

  let content;
  if (screen === 'splash') {
    content = <Splash onNext={() => setScreen('onboard')} />;
  } else if (screen === 'onboard') {
    content = <Onboarding onNext={() => setScreen('auth')} />;
  } else if (screen === 'auth') {
    content = <Auth onNext={handleAuth} />;
  } else if (screen === 'entry') {
    content = <DataEntry initial={profile} onSubmit={handleSubmit} />;
  } else if (screen === 'main' && profile) {
    content = (
      <div style={{ height: '100%', position: 'relative' }}>
        {detail ? (
          <DetailPage d={detail} profile={profile} onBack={() => setDetail(null)} />
        ) : (
          <>
            {tab === 'home'    && <HomeTab    profile={profile} onDetail={setDetail} />}
            {tab === 'map'     && <WorldMap   profile={profile} onDetail={setDetail} />}
            {tab === 'profile' && <ProfileTab profile={profile} user={user} onEdit={() => setScreen('entry')} onLogout={logout} />}
            <TabBar tab={tab} setTab={setTab} />
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'oklch(0.14 0.008 245)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: 24, fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{ position: 'relative' }}>
        <IOSDevice dark>
          {content}
        </IOSDevice>
        {/* Dev controls */}
        <div style={{
          position: 'absolute', bottom: -48, left: 0, right: 0,
          display: 'flex', gap: 6, justifyContent: 'center',
        }}>
          {['splash', 'onboard', 'auth', 'entry', 'main'].map(s => (
            <button key={s} onClick={() => setScreen(s)} style={{
              padding: '4px 10px', fontSize: 11, borderRadius: 100,
              background: screen === s ? C.accent : 'transparent',
              color: screen === s ? '#000' : C.txt3,
              border: `1px solid ${screen === s ? C.accent : C.line2}`,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
