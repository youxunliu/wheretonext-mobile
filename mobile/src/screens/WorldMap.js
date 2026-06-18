import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, G } from 'react-native-svg';
import { C, BADGE } from '../colors';
import { F } from '../fonts';
import { computeAccess } from '../data';

const COL = { vf: C.vf, voa: C.voa, ev: C.ev, vr: C.vr, surprise: C.surprise };

function accessKey(d) {
  if (d.blocked) return 'vr';
  if (d.surprise) return 'surprise';
  return d.access.type;
}

// deterministic background continent dots
const BG_DOTS = (() => {
  const dots = [];
  const add = (x0, y0, x1, y1, n) => {
    for (let i = 0; i < n; i++) dots.push([x0 + ((i * 97 + i * 37) % (x1 - x0 + 1)), y0 + ((i * 53 + i * 71) % (y1 - y0 + 1))]);
  };
  add(40, 60, 110, 110, 60);
  add(70, 110, 100, 160, 40);
  add(150, 55, 185, 80, 30);
  add(160, 85, 200, 145, 60);
  add(190, 70, 210, 95, 25);
  add(210, 60, 280, 110, 70);
  add(235, 100, 260, 125, 30);
  add(250, 135, 280, 160, 25);
  return dots;
})();

function Legend({ c, l, ring }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {ring
        ? <View style={{ width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: c, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: c }} />
          </View>
        : <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c }} />}
      <Text style={{ color: C.txt2, fontSize: 10 }}>{l}</Text>
    </View>
  );
}

function Stat({ n, l, c }) {
  return (
    <View style={{ flex: 1, backgroundColor: C.bg2, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center', borderWidth: 1, borderColor: C.line }}>
      <Text style={{ fontFamily: F.serif, fontSize: 24, color: c }}>{n}</Text>
      <Text style={{ fontSize: 10, color: C.txt3, marginTop: 3, letterSpacing: 0.3 }}>{l}</Text>
    </View>
  );
}

function SelectedSheet({ d, onClose, onDetail }) {
  const k = d.blocked ? 'vr' : d.surprise ? null : d.access.type;
  const badge = d.surprise ? { bg: 'rgba(34,211,238,.18)', fg: C.surprise, l: '✦ Surprise Unlock' } : BADGE[k];
  return (
    <View style={{ backgroundColor: C.bg2, borderRadius: 16, borderWidth: 1, borderColor: C.line, padding: 16, marginTop: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 36 }}>{d.f}</Text>
          <View>
            <Text style={{ fontFamily: F.serif, fontSize: 22, color: C.txt }}>{d.n}</Text>
            <Text style={{ fontSize: 11, color: C.txt3, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>{d.r}</Text>
          </View>
        </View>
        <Pressable onPress={onClose} hitSlop={8}><Text style={{ color: C.txt3, fontSize: 20 }}>×</Text></Pressable>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <View style={{ backgroundColor: badge.bg, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 10 }}>
          <Text style={{ color: badge.fg, fontSize: 11, fontFamily: F.semibold, letterSpacing: 0.5 }}>{badge.l}</Text>
        </View>
        {!d.blocked && d.access.days && <Text style={{ fontSize: 12, color: C.txt2 }}>up to {d.access.days} days</Text>}
      </View>
      <Text style={{ fontSize: 13, color: C.txt2, lineHeight: 21 }}>
        {d.blocked ? "Your current documents don't grant access. You'll need to apply for a visa at a consulate." : d.nt}
      </Text>
      {!d.blocked && (
        <Pressable onPress={onDetail} style={{ marginTop: 14, height: 44, borderRadius: 22, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#000', fontSize: 14, fontFamily: F.semibold }}>View Details →</Text>
        </Pressable>
      )}
    </View>
  );
}

function MiniRow({ d, onPress }) {
  const k = d.blocked ? 'vr' : d.surprise ? null : d.access.type;
  const badge = d.surprise ? { bg: 'rgba(34,211,238,.18)', fg: C.surprise, l: '✦' } : BADGE[k];
  return (
    <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, backgroundColor: C.bg2, borderRadius: 12, borderWidth: 1, borderColor: C.line }}>
      <Text style={{ fontSize: 22 }}>{d.f}</Text>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontFamily: F.medium, color: C.txt }}>{d.n}</Text>
        <Text style={{ fontSize: 11, color: C.txt3 }}>{d.r}</Text>
      </View>
      <View style={{ backgroundColor: badge.bg, borderRadius: 100, paddingVertical: 3, paddingHorizontal: 8 }}>
        <Text style={{ color: badge.fg, fontSize: 10, fontFamily: F.semibold }}>{badge.l}</Text>
      </View>
    </Pressable>
  );
}

const FILTERS = [['all', 'All'], ['vf', 'Visa-Free'], ['voa', 'VOA'], ['ev', 'e-Visa'], ['surprise', '✦ Surprise'], ['vr', 'Required']];

export default function WorldMap({ profile, onDetail }) {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const results = computeAccess(profile.passports, profile.residence, profile.residenceExpiry, profile.visas);

  const filtered = filter === 'all' ? results
    : filter === 'surprise' ? results.filter(d => d.surprise)
    : results.filter(d => accessKey(d) === filter);

  const stats = {
    vf: results.filter(d => !d.surprise && !d.blocked && d.access.type === 'vf').length,
    voa: results.filter(d => !d.surprise && !d.blocked && (d.access.type === 'voa' || d.access.type === 'ev')).length,
    surprise: results.filter(d => d.surprise).length,
    vr: results.filter(d => d.blocked).length,
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 20, paddingBottom: 14 }}>
        <Text style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: C.txt3, fontFamily: F.medium, marginBottom: 4 }}>World map</Text>
        <Text style={{ fontFamily: F.serifLight, fontSize: 28, color: C.txt }}>
          Your <Text style={{ fontFamily: F.serifItalic, color: C.accent }}>accessible</Text> world
        </Text>
      </View>

      {/* Map */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ backgroundColor: C.bg2, borderRadius: 20, borderWidth: 1, borderColor: C.line, padding: 8, overflow: 'hidden' }}>
          <View style={{ width: '100%', aspectRatio: 320 / 180 }}>
            <Svg width="100%" height="100%" viewBox="0 0 320 180">
              {BG_DOTS.map((p, i) => <Circle key={i} cx={p[0]} cy={p[1]} r="0.8" fill={C.line2} opacity="0.8" />)}
              {filtered.map(d => {
                const col = COL[accessKey(d)];
                const isSel = selected?.c === d.c;
                return (
                  <G key={d.c} onPress={() => setSelected(d)}>
                    {isSel && <Circle cx={d.x} cy={d.y} r="8" fill={col} opacity="0.25" />}
                    {d.surprise && <Circle cx={d.x} cy={d.y} r="6" fill="none" stroke={col} strokeWidth="0.7" opacity="0.6" />}
                    <Circle cx={d.x} cy={d.y} r={isSel ? 3.5 : 2.7} fill={col} stroke={d.surprise ? C.bg2 : 'none'} strokeWidth={d.surprise ? 0.5 : 0} />
                  </G>
                );
              })}
            </Svg>
          </View>
          <View style={{ position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(10,12,16,.7)', borderRadius: 10, padding: 10, gap: 5 }}>
            <Legend c={C.vf} l="Visa-Free" />
            <Legend c={C.voa} l="VOA / e-Visa" />
            <Legend c={C.surprise} l="Surprise ✦" ring />
            <Legend c={C.vr} l="Visa Required" />
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', gap: 8 }}>
        <Stat n={stats.vf} l="Visa-free" c={C.vf} />
        <Stat n={stats.voa} l="VOA/eVisa" c={C.voa} />
        <Stat n={stats.surprise} l="Surprise" c={C.surprise} />
        <Stat n={stats.vr} l="Required" c={C.vr} />
      </View>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={{ gap: 6, paddingHorizontal: 16, paddingBottom: 8 }}>
        {FILTERS.map(([k, l]) => {
          const on = filter === k;
          return (
            <Pressable key={k} onPress={() => setFilter(k)} style={{
              paddingVertical: 6, paddingHorizontal: 14, borderRadius: 100,
              backgroundColor: on ? 'rgba(34,211,238,.12)' : C.bg3,
              borderWidth: 1, borderColor: on ? C.accent : C.line,
            }}>
              <Text style={{ fontSize: 12, fontFamily: F.medium, color: on ? C.accent : C.txt2 }}>{l}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* List / selected */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100, gap: 8 }}>
        {selected ? (
          <SelectedSheet d={selected} onClose={() => setSelected(null)} onDetail={() => onDetail(selected)} />
        ) : (
          <>
            <Text style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: C.txt3, fontFamily: F.semibold, paddingVertical: 6 }}>
              Tap a dot, or browse below
            </Text>
            {filtered.slice(0, 20).map(d => <MiniRow key={d.c} d={d} onPress={() => onDetail(d)} />)}
          </>
        )}
      </ScrollView>
    </View>
  );
}
