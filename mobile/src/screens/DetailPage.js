import { View, Text, Pressable, ScrollView, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { C, BADGE } from '../colors';
import { F } from '../fonts';
import { PASSPORTS } from '../data';

function MetaItem({ k, v }) {
  return (
    <View style={{ width: '50%', marginBottom: 4 }}>
      <Text style={{ fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: C.txt3, fontFamily: F.semibold, marginBottom: 2 }}>{k}</Text>
      <Text style={{ fontSize: 13, fontFamily: F.medium, color: C.txt }}>{v}</Text>
    </View>
  );
}

function viaLabel(via) {
  if (!via) return null;
  if (via === 'schengen') return 'Schengen Visa/Residence';
  if (via === 'us') return 'US B1/B2 Visa';
  if (via === 'uk') return 'UK Visa';
  if (via === 'ca') return 'Canada Visa';
  return via.toUpperCase();
}

export default function DetailPage({ d, profile, onBack }) {
  const insets = useSafeAreaInsets();
  const passport = PASSPORTS.find(p => p.code === (d.viaPassport || profile.passports?.[0]));
  const badge = d.surprise ? { bg: 'rgba(34,211,238,.18)', fg: C.surprise, l: '✦ Surprise Unlock' } : BADGE[d.access.type];
  const via = viaLabel(d.via);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>
      {/* Hero */}
      <LinearGradient colors={[d.g[0], d.g[1]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ height: 240, paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 20, justifyContent: 'flex-end' }}>
        <Pressable onPress={onBack} style={{
          position: 'absolute', top: insets.top + 8, left: 16,
          width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,.35)', alignItems: 'center', justifyContent: 'center',
        }}>
          <Svg width="14" height="14" viewBox="0 0 14 14"><Path d="M9 3L5 7l4 4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></Svg>
        </Pressable>
        <Text style={{ position: 'absolute', top: insets.top + 4, right: 22, fontSize: 68 }}>{d.f}</Text>
        <Text style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 6, fontFamily: F.medium }}>{d.r}</Text>
        <Text style={{ fontFamily: F.serifLight, fontSize: 38, color: '#fff' }}>{d.n}</Text>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', marginTop: 6 }}>{d.tl}</Text>
      </LinearGradient>

      {/* Entry summary card */}
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <View style={{ backgroundColor: C.bg2, borderWidth: 1, borderColor: C.line, borderRadius: 20, padding: 18 }}>
          <Text style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.txt3, fontFamily: F.semibold, marginBottom: 14 }}>
            Entry for {passport?.flag} {passport?.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <View style={{ backgroundColor: badge.bg, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 12, alignSelf: 'flex-start' }}>
                <Text style={{ color: badge.fg, fontSize: 11, fontFamily: F.semibold }}>{badge.l}</Text>
              </View>
              <Text style={{ fontSize: 13, color: C.txt2, marginTop: 10, lineHeight: 21 }}>
                {d.surprise ? `Accessible via your ${via} — not your passport alone.` : 'Your passport grants you entry to this destination.'}
              </Text>
            </View>
            {d.access.days && (
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontFamily: F.serifLight, fontSize: 40, color: C.accent }}>{d.access.days}</Text>
                <Text style={{ fontSize: 10, color: C.txt3, letterSpacing: 1, textTransform: 'uppercase' }}>days max</Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: C.line, rowGap: 12 }}>
            <MetaItem k="Currency" v={d.cu} />
            <MetaItem k="Language" v={d.la} />
            <MetaItem k="Method" v={d.surprise ? `Via ${via?.split(' ')[0]}` : 'Passport'} />
            <MetaItem k="Type" v={badge.l} />
          </View>
        </View>
      </View>

      {/* Entry note */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <Text style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.txt3, fontFamily: F.semibold, marginBottom: 10 }}>Entry requirements</Text>
        <View style={{ backgroundColor: 'rgba(34,211,238,.06)', borderWidth: 1, borderColor: 'rgba(34,211,238,.2)', borderRadius: 14, padding: 14 }}>
          <Text style={{ fontSize: 13, color: C.txt2, lineHeight: 21 }}>{d.nt}</Text>
        </View>
      </View>

      {/* Highlights */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <Text style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.txt3, fontFamily: F.semibold, marginBottom: 10 }}>Not to be missed</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {d.hl.map(h => (
            <View key={h} style={{ paddingVertical: 6, paddingHorizontal: 12, backgroundColor: C.bg3, borderWidth: 1, borderColor: C.line, borderRadius: 100 }}>
              <Text style={{ fontSize: 12, color: C.txt2 }}>{h}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Disclaimer */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16 }}>
        <View style={{ backgroundColor: 'rgba(250,204,21,.05)', borderWidth: 1, borderColor: 'rgba(250,204,21,.2)', borderRadius: 14, padding: 14 }}>
          <Text style={{ fontSize: 12, color: C.txt3, lineHeight: 18 }}>
            <Text style={{ color: C.accent2, fontFamily: F.semibold }}>Disclaimer: </Text>
            Visa policies change frequently. Always verify entry requirements with the official embassy of your destination before travelling. WhereToNext is not liable for travel disruptions.
          </Text>
        </View>
      </View>

      {/* CTA */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, gap: 10 }}>
        <Pressable onPress={() => Linking.openURL('https://www.google.com/flights')}
          style={{ height: 54, borderRadius: 27, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#000', fontSize: 15, fontFamily: F.semibold }}>✈ See Flights</Text>
        </Pressable>
        <Pressable style={{ height: 48, borderRadius: 24, borderWidth: 1, borderColor: C.line2, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: C.txt2, fontSize: 14, fontFamily: F.medium }}>♥ Save to trips</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
