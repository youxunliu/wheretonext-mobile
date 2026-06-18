import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  CormorantGaramond_300Light,
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
} from '@expo-google-fonts/cormorant-garamond';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';

import { C } from './src/colors';
import { load, save } from './src/storage';
import TabBar from './src/components/TabBar';
import Splash from './src/screens/Splash';
import Onboarding from './src/screens/Onboarding';
import Auth from './src/screens/Auth';
import DataEntry from './src/screens/DataEntry';
import HomeTab from './src/screens/HomeTab';
import WorldMap from './src/screens/WorldMap';
import ProfileTab from './src/screens/ProfileTab';
import DetailPage from './src/screens/DetailPage';

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
  const [fontsLoaded] = useFonts({
    CormorantGaramond_300Light,
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
  });

  const [hydrated, setHydrated] = useState(false);
  const [screen, setScreen] = useState('splash');
  const [tab, setTab] = useState('home');
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [detail, setDetail] = useState(null);

  // hydrate persisted state once
  useEffect(() => {
    (async () => {
      const [s, t, p, u] = await Promise.all([
        load('screen', 'splash'),
        load('tab', 'home'),
        load('profile', null),
        load('user', null),
      ]);
      setScreen(s);
      setTab(t);
      setProfile(migrateProfile(p));
      setUser(u);
      setHydrated(true);
    })();
  }, []);

  useEffect(() => { if (hydrated) save('screen', screen); }, [screen, hydrated]);
  useEffect(() => { if (hydrated) save('tab', tab); }, [tab, hydrated]);

  function handleAuth(provider) {
    const fake = {
      apple:  { name: 'Alex Morgan', email: 'alex@privaterelay.apple', provider: 'apple' },
      google: { name: 'Alex Morgan', email: 'alex.morgan@gmail.com',   provider: 'google' },
      email:  { name: 'Alex Morgan', email: 'alex@whereto.next',       provider: 'email' },
      guest:  { name: 'Guest',       email: 'guest@whereto.next',      provider: 'guest' },
    };
    const u = fake[provider];
    setUser(u);
    save('user', u);
    setScreen(profile ? 'main' : 'entry');
  }

  function handleSubmit(data) {
    setProfile(data);
    save('profile', data);
    setScreen('main');
  }

  function logout() {
    setUser(null); setProfile(null);
    save('user', null); save('profile', null);
    setScreen('auth');
  }

  if (!fontsLoaded || !hydrated) {
    return <View style={{ flex: 1, backgroundColor: C.bg }} />;
  }

  let content = null;
  if (screen === 'splash') {
    content = <Splash onNext={() => setScreen('onboard')} />;
  } else if (screen === 'onboard') {
    content = <Onboarding onNext={() => setScreen('auth')} />;
  } else if (screen === 'auth') {
    content = <Auth onNext={handleAuth} />;
  } else if (screen === 'entry') {
    content = <DataEntry initial={profile} onSubmit={handleSubmit} />;
  } else if (screen === 'main' && profile) {
    content = detail ? (
      <DetailPage d={detail} profile={profile} onBack={() => setDetail(null)} />
    ) : (
      <View style={{ flex: 1 }}>
        {tab === 'home' && <HomeTab profile={profile} onDetail={setDetail} />}
        {tab === 'map' && <WorldMap profile={profile} onDetail={setDetail} />}
        {tab === 'profile' && <ProfileTab profile={profile} user={user} onEdit={() => setScreen('entry')} onLogout={logout} />}
        <TabBar tab={tab} setTab={setTab} />
      </View>
    );
  } else {
    content = <Auth onNext={handleAuth} />;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: C.bg }}>
        <StatusBar style="light" />
        {content}
      </View>
    </SafeAreaProvider>
  );
}
