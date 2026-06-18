import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { C } from '../colors';
import { F } from '../fonts';
import { PASSPORTS, VISAS, RESIDENCE, computeAccess } from '../data';
import { fmtDate } from '../storage';

function MiniStat({ n, l }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg2, borderWidth: 1, borderColor: C.line, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 10, alignItems: 'center' }}>
      <Text style={{ fontFamily: F.serifLight, fontSize: 26, color: C.txt }}>{n}</Text>
      <Text style={{ fontSize: 11, color: C.txt3, marginTop: 4, letterSpacing: 0.3 }}>{l}</Text>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
      <Text style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.txt3, fontFamily: F.semibold, paddingHorizontal: 4, paddingBottom: 8 }}>{title}</Text>
      <View style={{ backgroundColor: C.bg2, borderWidth: 1, borderColor: C.line, borderRadius: 16, overflow: 'hidden' }}>{children}</View>
    </View>
  );
}

function Row({ icon, label, value, arrow, onPress, last }) {
  return (
    <Pressable onPress={onPress} style={{
      flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14,
      borderBottomWidth: last ? 0 : 1, borderBottomColor: C.line,
    }}>
      <Text style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{icon}</Text>
      <Text style={{ flex: 1, fontSize: 14, color: C.txt }}>{label}</Text>
      {!!value && <Text numberOfLines={1} style={{ fontSize: 13, color: C.txt2, maxWidth: 180 }}>{value}</Text>}
      {arrow && <Svg width="8" height="14" viewBox="0 0 8 14"><Path d="M1 1l6 6-6 6" stroke={C.txt3} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></Svg>}
    </Pressable>
  );
}

export default function ProfileTab({ profile, user, onEdit, onLogout }) {
  const insets = useSafeAreaInsets();
  const passports = (profile.passports || []).map(c => PASSPORTS.find(p => p.code === c)).filter(Boolean);
  const residence = RESIDENCE.find(r => r.code === profile.residence);
  const results = computeAccess(profile.passports, profile.residence, profile.residenceExpiry, profile.visas);
  const accessible = results.filter(d => !d.blocked).length;

  const passportValue = passports.length ? passports.map(p => `${p.flag} ${p.name}`).join(' · ') : 'Not set';
  const residenceValue = residence ? `${residence.name}${profile.residenceExpiry ? ' · exp ' + fmtDate(profile.residenceExpiry) : ''}` : 'Not set';
  const visaValue = profile.visas.length
    ? profile.visas.map(v => { const info = VISAS.find(x => x.code === v.code); return info?.short + (v.expiry ? ` (${fmtDate(v.expiry)})` : ''); }).join(', ')
    : 'None added';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <Text style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: C.txt3, fontFamily: F.medium, marginBottom: 4 }}>Profile</Text>
        <Text style={{ fontFamily: F.serifLight, fontSize: 30, color: C.txt }}>Personal area</Text>
      </View>

      {/* Account card */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{ backgroundColor: C.bg2, borderWidth: 1, borderColor: C.line, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <LinearGradient colors={[C.accent, C.accent2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={{ width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 22, fontFamily: F.semibold, color: '#000' }}>{(user?.name?.[0] || 'A').toUpperCase()}</Text>
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontFamily: F.semibold, color: C.txt }}>{user?.name || 'Alex Morgan'}</Text>
            <Text style={{ fontSize: 13, color: C.txt3, marginTop: 2 }}>{user?.email || 'alex@whereto.next'}</Text>
          </View>
        </View>
      </View>

      {/* Stat ribbon */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 20, flexDirection: 'row', gap: 10 }}>
        <MiniStat n={accessible} l="Accessible" />
        <MiniStat n={results.filter(d => d.surprise).length} l="Surprises" />
        <MiniStat n={profile.visas.length + (profile.residence ? 1 : 0) + (profile.passports?.length || 0)} l="Documents" />
      </View>

      <Section title="My Documents">
        <Row icon="🛂" label={passports.length > 1 ? 'Passports' : 'Passport'} value={passportValue} />
        <Row icon="🏠" label="Residence" value={residenceValue} />
        <Row icon="📄" label="Visas" value={visaValue} />
        <Row icon="✎" label="Edit documents" onPress={onEdit} arrow last />
      </Section>

      <Section title="Preferences">
        <Row icon="🔔" label="Visa policy alerts" value="On" arrow />
        <Row icon="🌐" label="Language" value="English" arrow />
        <Row icon="💳" label="Flights provider" value="Google Flights" arrow last />
      </Section>

      <Section title="Support">
        <Row icon="❔" label="Help & FAQ" arrow />
        <Row icon="🔒" label="Privacy Policy" arrow />
        <Row icon="📜" label="Terms of Service" arrow last />
      </Section>

      <View style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        <Pressable onPress={onLogout} style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: C.line2, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: C.vr, fontSize: 15, fontFamily: F.medium }}>Sign out</Text>
        </Pressable>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 11, color: C.txt3, paddingHorizontal: 20, paddingBottom: 20 }}>
        WhereToNext v1.0.0 · Made with care
      </Text>
    </ScrollView>
  );
}
