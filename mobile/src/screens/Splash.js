import { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { C } from '../colors';
import { F } from '../fonts';
import Globe from '../components/Globe';

const STARS = Array.from({ length: 40 }).map((_, i) => ({
  x: (i * 97) % 100, y: (i * 53) % 100, s: (i % 3) + 1, o: 0.3 + (i % 5) * 0.12,
}));

function Dot({ delay }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.delay(delay),
      Animated.timing(v, { toValue: 1, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(v, { toValue: 0, duration: 600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [v, delay]);
  return (
    <Animated.View style={{
      width: 6, height: 6, borderRadius: 3, backgroundColor: C.accent,
      opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }),
      transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.2] }) }],
    }} />
  );
}

export default function Splash({ onNext }) {
  useEffect(() => {
    const t = setTimeout(onNext, 2400);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <View style={{ flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ ...StyleAbsFill, opacity: 0.6 }} pointerEvents="none">
        {STARS.map((s, i) => (
          <View key={i} style={{
            position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
            width: s.s, height: s.s, backgroundColor: '#fff', borderRadius: s.s, opacity: s.o,
          }} />
        ))}
      </View>

      <Globe size={260} zoom={1} rotateSpeed={20} showPlane />

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={{ fontFamily: F.serifLight, fontSize: 36, color: C.txt }}>
          WhereTo<Text style={{ fontFamily: F.serifItalic, color: C.accent }}>Next</Text>
        </Text>
        <Text style={{ fontSize: 12, color: C.txt3, letterSpacing: 3, marginTop: 8, textTransform: 'uppercase' }}>
          Passport intelligence
        </Text>
        <View style={{ flexDirection: 'row', gap: 6, marginTop: 20 }}>
          <Dot delay={0} /><Dot delay={200} /><Dot delay={400} />
        </View>
      </View>
    </View>
  );
}

const StyleAbsFill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 };
