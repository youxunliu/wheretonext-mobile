import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { C } from '../colors';

const tabs = [
  {
    k: 'home', l: 'Discover',
    icon: (c) => (
      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <Path d="M3 10L11 3l8 7v9a1 1 0 01-1 1h-4v-6H8v6H4a1 1 0 01-1-1v-9z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" />
      </Svg>
    ),
  },
  {
    k: 'map', l: 'Map',
    icon: (c) => (
      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <Circle cx="11" cy="11" r="8" stroke={c} strokeWidth="1.6" />
        <Path d="M3 11h16M11 3c2.5 2.5 2.5 13.5 0 16M11 3c-2.5 2.5-2.5 13.5 0 16" stroke={c} strokeWidth="1.6" />
      </Svg>
    ),
  },
  {
    k: 'profile', l: 'Profile',
    icon: (c) => (
      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <Circle cx="11" cy="8" r="3.5" stroke={c} strokeWidth="1.6" />
        <Path d="M4 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
      </Svg>
    ),
  },
];

export default function TabBar({ tab, setTab }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingTop: 8, paddingBottom: Math.max(insets.bottom, 12), paddingHorizontal: 20,
      backgroundColor: 'rgba(10,12,16,0.98)', borderTopWidth: 1, borderTopColor: C.line,
      flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    }}>
      {tabs.map(t => {
        const active = tab === t.k;
        const col = active ? C.accent : C.txt3;
        return (
          <Pressable key={t.k} onPress={() => setTab(t.k)} style={{ alignItems: 'center', gap: 3, paddingVertical: 6, paddingHorizontal: 20 }}>
            {t.icon(col)}
            <Text style={{ fontSize: 10, fontWeight: '600', letterSpacing: 0.3, color: col }}>{t.l}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
