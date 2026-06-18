import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { C, BADGE } from '../colors';
import { F } from '../fonts';
import { PASSPORTS, computeAccess } from '../data';

function Badge({ b, small }) {
  return (
    <View style={{ backgroundColor: b.bg, borderRadius: 100, paddingVertical: small ? 3 : 4, paddingHorizontal: small ? 8 : 10, alignSelf: 'flex-start' }}>
      <Text style={{ color: b.fg, fontSize: small ? 10 : 11, fontFamily: F.semibold }}>{b.l}</Text>
    </View>
  );
}

function DestCardH({ d, onPress }) {
  const viaLabel = d.via === 'schengen' ? 'Schengen' : d.via === 'us' ? 'US Visa' : d.via?.toUpperCase() || '';
  return (
    <Pressable onPress={onPress} style={{ width: 220, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: C.accent + '33' }}>
      <LinearGradient colors={[d.g[0], d.g[1]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 110, padding: 12, justifyContent: 'flex-end' }}>
        <View style={{ position: 'absolute', top: 8, left: 8, backgroundColor: C.accent, borderRadius: 100, paddingVertical: 3, paddingHorizontal: 7 }}>
          <Text style={{ color: '#000', fontSize: 9, fontFamily: F.bold, letterSpacing: 0.8 }}>SURPRISE</Text>
        </View>
        <Text style={{ position: 'absolute', top: 10, right: 12, fontSize: 34 }}>{d.f}</Text>
        <Text style={{ fontSize: 9, color: 'rgba(255,255,255,.55)', letterSpacing: 1, textTransform: 'uppercase' }}>{d.r}</Text>
      </LinearGradient>
      <View style={{ padding: 14, backgroundColor: C.bg2 }}>
        <Text style={{ fontFamily: F.serif, fontSize: 18, color: C.txt }}>{d.n}</Text>
        <Text style={{ fontSize: 11, color: C.txt3, marginTop: 2 }}>Via {viaLabel}</Text>
      </View>
    </Pressable>
  );
}

function DestRow({ d, onPress }) {
  const badge = BADGE[d.access.type];
  return (
    <Pressable onPress={onPress} style={{
      flexDirection: 'row', alignItems: 'center', gap: 14,
      backgroundColor: C.bg2, borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 12,
    }}>
      <LinearGradient colors={[d.g[0], d.g[1]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 26 }}>{d.f}</Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontFamily: F.medium, color: C.txt }}>{d.n}</Text>
        <Text style={{ fontSize: 11, color: C.txt3, marginTop: 2 }}>{d.r}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Badge b={badge} small />
        {d.access.days && <Text style={{ fontSize: 10, color: C.txt3, marginTop: 3 }}>{d.access.days}d</Text>}
      </View>
    </Pressable>
  );
}

export default function HomeTab({ profile, onDetail }) {
  const insets = useSafeAreaInsets();
  const results = computeAccess(profile.passports, profile.residence, profile.residenceExpiry, profile.visas);
  const surprising = results.filter(d => d.surprise);
  const passports = (profile.passports || []).map(c => PASSPORTS.find(p => p.code === c)).filter(Boolean);
  const accessible = results.filter(d => !d.blocked);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <Text style={{ fontSize: 13, color: C.txt3, marginBottom: 4 }}>Good morning,</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 26 }}>{passports.map(p => p.flag).join('')} </Text>
          <Text style={{ fontFamily: F.serifLight, fontSize: 30, color: C.txt }}>
            where to <Text style={{ fontFamily: F.serifItalic, color: C.accent }}>next?</Text>
          </Text>
        </View>
      </View>

      {/* Hero stat card */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <LinearGradient colors={[C.accent + '18', C.bg3]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={{ borderWidth: 1, borderColor: C.accent + '33', borderRadius: 20, padding: 20 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.accent, fontFamily: F.semibold, marginBottom: 8 }}>
            Your access score
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
            <Text style={{ fontFamily: F.serifLight, fontSize: 56, color: C.txt }}>{accessible.length}</Text>
            <Text style={{ fontSize: 14, color: C.txt2 }}>of {results.length} destinations</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4, marginTop: 14 }}>
            {results.map((d, i) => (
              <View key={i} style={{
                flex: 1, height: 6, borderRadius: 3,
                opacity: d.blocked ? 0.3 : 1,
                backgroundColor: d.blocked ? C.line2 : d.surprise ? C.surprise : d.access.type === 'vf' ? C.vf : d.access.type === 'voa' ? C.voa : C.ev,
              }} />
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Surprising finds */}
      {surprising.length > 0 && (
        <>
          <View style={{ paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: F.serif, fontSize: 22, color: C.txt }}>
              <Text style={{ color: C.accent }}>✦ </Text>Surprising finds
            </Text>
            <Text style={{ fontSize: 12, color: C.txt3 }}>{surprising.length} places</Text>
          </View>
          <Text style={{ paddingHorizontal: 20, paddingBottom: 8, fontSize: 12, color: C.txt3, lineHeight: 18 }}>
            Places accessible because of your visas and residence — not your passport alone.
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 20, paddingVertical: 8 }}>
            {surprising.map(d => <DestCardH key={d.c} d={d} onPress={() => onDetail(d)} />)}
          </ScrollView>
        </>
      )}

      {/* All accessible */}
      <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 }}>
        <Text style={{ fontFamily: F.serif, fontSize: 22, color: C.txt }}>All accessible</Text>
      </View>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        {accessible.filter(d => !d.surprise).slice(0, 12).map(d => <DestRow key={d.c} d={d} onPress={() => onDetail(d)} />)}
      </View>
    </ScrollView>
  );
}
