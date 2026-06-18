import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C } from '../colors';
import { F } from '../fonts';
import Globe from '../components/Globe';

const TOUR_MARKERS = [
  { lon: 73.5,   lat: 4,    label: 'Maldives',  emoji: '🇲🇻', blurb: 'Overwater paradise — open to all passports.' },
  { lon: 44.8,   lat: 41.7, label: 'Georgia',   emoji: '🇬🇪', blurb: '365-day stay for almost everyone.' },
  { lon: 19.8,   lat: 41.3, label: 'Albania',   emoji: '🇦🇱', blurb: 'Unlocked by a Schengen visa — a surprise find.' },
  { lon: 103.85, lat: 1.35, label: 'Singapore', emoji: '🇸🇬', blurb: 'Gateway to Southeast Asia.' },
  { lon: 37.9,   lat: -1.3, label: 'Kenya',     emoji: '🇰🇪', blurb: 'Great Migration, simple eTA.' },
  { lon: -99.1,  lat: 19.4, label: 'Mexico',    emoji: '🇲🇽', blurb: 'Open with a US or Canadian visa.' },
];

const STARS = Array.from({ length: 30 }).map((_, k) => ({
  x: (k * 101) % 100, y: (k * 47) % 100, sz: (k % 3) + 1, o: 0.3 + (k % 5) * 0.1,
}));

const slides = [
  { title: 'Unlock your\nfull itinerary', sub: 'See every country your passport, residence and visas make accessible — not just the obvious ones.' },
  { title: 'Find surprising\ndestinations', sub: "A Schengen residence permit can open a dozen countries you didn't know you could visit visa-free." },
  { title: 'One tap,\nall borders', sub: 'An interactive world map, colour-coded by access type, with current entry requirements.' },
];

export default function Onboarding({ onNext }) {
  const insets = useSafeAreaInsets();
  const [i, setI] = useState(0);
  const [tourIdx, setTourIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTourIdx(x => (x + 1) % TOUR_MARKERS.length), 1800);
    return () => clearInterval(id);
  }, []);

  const s = slides[i];
  const zoom = [1, 1.18, 1.4][i];
  const rot = [18, 10, 5][i];
  const m = TOUR_MARKERS[tourIdx];

  return (
    <View style={{ flex: 1, backgroundColor: C.bg, paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24, paddingHorizontal: 24 }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 }} pointerEvents="none">
        {STARS.map((st, k) => (
          <View key={k} style={{
            position: 'absolute', left: `${st.x}%`, top: `${st.y}%`,
            width: st.sz, height: st.sz, backgroundColor: '#fff', borderRadius: st.sz, opacity: st.o,
          }} />
        ))}
      </View>

      <View style={{ height: 230, alignItems: 'center', justifyContent: 'center' }}>
        <Globe size={210} zoom={zoom} rotateSpeed={rot} markers={TOUR_MARKERS} activeMarkerIdx={tourIdx} showPlane />
      </View>

      <View style={{ alignItems: 'center', minHeight: 30, marginTop: 2 }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: 'rgba(34,211,238,.08)', borderWidth: 1, borderColor: C.accent + '44',
          borderRadius: 100, paddingVertical: 5, paddingHorizontal: 14,
        }}>
          <Text style={{ fontSize: 14 }}>{m.emoji}</Text>
          <Text style={{ color: C.txt, fontFamily: F.medium, fontSize: 12, marginLeft: 8 }}>{m.label}</Text>
          <Text style={{ color: C.txt3, fontSize: 12, marginLeft: 6 }}>· {m.blurb}</Text>
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 12 }}>
        <Text style={{ fontFamily: F.serifLight, fontSize: 28, lineHeight: 32, color: C.txt, textAlign: 'center', marginBottom: 10 }}>
          {s.title}
        </Text>
        <Text style={{ fontSize: 13, color: C.txt2, lineHeight: 20, textAlign: 'center', maxWidth: 300 }}>
          {s.sub}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: 18, marginBottom: 12 }}>
        {slides.map((_, idx) => (
          <View key={idx} style={{
            width: idx === i ? 20 : 6, height: 6, borderRadius: 3,
            backgroundColor: idx === i ? C.accent : C.line2,
          }} />
        ))}
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Pressable
          onPress={() => (i < slides.length - 1 ? setI(i + 1) : onNext())}
          style={{ height: 54, borderRadius: 27, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#000', fontSize: 15, fontFamily: F.semibold }}>
            {i < slides.length - 1 ? 'Continue' : 'Get Started'}
          </Text>
        </Pressable>
        {i < slides.length - 1 && (
          <Pressable onPress={onNext} style={{ marginTop: 12 }}>
            <Text style={{ textAlign: 'center', color: C.txt3, fontSize: 14 }}>Skip</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
