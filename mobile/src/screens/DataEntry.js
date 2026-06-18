import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { C } from '../colors';
import { F } from '../fonts';
import { PASSPORTS, VISAS, RESIDENCE, isExpired } from '../data';
import { MSelect, MSelectMulti } from '../components/Select';
import DateField from '../components/DateField';

function Label({ children, optional }) {
  return (
    <Text style={{ fontSize: 12, fontFamily: F.semibold, letterSpacing: 0.3, color: C.txt2, marginBottom: 8, textTransform: 'uppercase' }}>
      {children}
      {optional && <Text style={{ color: C.txt3, fontFamily: F.body, textTransform: 'none', letterSpacing: 0 }}>  optional</Text>}
    </Text>
  );
}

export default function DataEntry({ onSubmit, initial }) {
  const insets = useSafeAreaInsets();
  const initPassports = initial?.passports ?? (initial?.passport ? [initial.passport] : []);
  const initVisas = initial?.visas ?? [];
  const normalizedVisas = Array.isArray(initVisas) && initVisas.length && typeof initVisas[0] === 'string'
    ? initVisas.map(c => ({ code: c, expiry: '' }))
    : initVisas;

  const [passports, setPassports] = useState(initPassports);
  const [residence, setResidence] = useState(initial?.residence || '');
  const [residenceExpiry, setResidenceExpiry] = useState(initial?.residenceExpiry || '');
  const [visas, setVisas] = useState(normalizedVisas);
  const [pickerOpen, setPickerOpen] = useState(false);

  const toggleVisa = c => setVisas(v => {
    const exists = v.find(x => x.code === c);
    return exists ? v.filter(x => x.code !== c) : [...v, { code: c, expiry: '' }];
  });
  const setVisaExpiry = (c, e) => setVisas(v => v.map(x => x.code === c ? { ...x, expiry: e } : x));
  const removePassport = c => setPassports(p => p.filter(x => x !== c));
  const addPassport = c => setPassports(p => (p.includes(c) ? p : [...p, c]));

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 40, paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: C.accent, fontFamily: F.medium, marginBottom: 6 }}>
          Your profile
        </Text>
        <Text style={{ fontFamily: F.serifLight, fontSize: 30, lineHeight: 34, color: C.txt, marginBottom: 28 }}>
          Your travel{'\n'}<Text style={{ fontFamily: F.serifItalic, color: C.txt2 }}>documents</Text>
        </Text>

        {/* Passports */}
        <Text style={{ fontSize: 12, fontFamily: F.semibold, letterSpacing: 0.3, color: C.txt2, textTransform: 'uppercase' }}>
          Passport nationalities
        </Text>
        <Text style={{ fontSize: 11, color: C.txt3, marginTop: 3, lineHeight: 15 }}>
          Required. Add multiple if you're a dual citizen.
        </Text>

        {passports.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {passports.map(code => {
              const p = PASSPORTS.find(x => x.code === code);
              if (!p) return null;
              return (
                <View key={code} style={{
                  flexDirection: 'row', alignItems: 'center', gap: 6,
                  backgroundColor: 'rgba(34,211,238,.1)', borderWidth: 1, borderColor: C.accent + '55',
                  borderRadius: 100, paddingVertical: 6, paddingLeft: 10, paddingRight: 8,
                }}>
                  <Text style={{ fontSize: 16 }}>{p.flag}</Text>
                  <Text style={{ fontSize: 13, color: C.txt, fontFamily: F.medium }}>{p.name}</Text>
                  <Pressable onPress={() => removePassport(code)} hitSlop={6} style={{
                    width: 18, height: 18, borderRadius: 9, backgroundColor: 'rgba(0,0,0,.3)',
                    alignItems: 'center', justifyContent: 'center', marginLeft: 2,
                  }}>
                    <Svg width="8" height="8" viewBox="0 0 8 8"><Path d="M1 1l6 6M7 1L1 7" stroke={C.txt2} strokeWidth="1.5" strokeLinecap="round" /></Svg>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}

        <Pressable onPress={() => setPickerOpen(true)} style={{
          height: 52, borderRadius: 14, backgroundColor: C.bg3, borderWidth: 1, borderColor: C.line2,
          borderStyle: 'dashed', paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10,
        }}>
          <Text style={{ fontSize: 18, color: C.txt2 }}>＋</Text>
          <Text style={{ color: C.txt2, fontSize: 14 }}>{passports.length === 0 ? 'Add passport' : 'Add another passport'}</Text>
        </Pressable>

        <MSelectMulti
          visible={pickerOpen}
          options={PASSPORTS.filter(p => !passports.includes(p.code))}
          onPick={(code) => { addPassport(code); setPickerOpen(false); }}
          onClose={() => setPickerOpen(false)}
          placeholder="Search countries…"
        />

        {/* Residence */}
        <View style={{ marginTop: 24 }}>
          <Label optional>Country of residence</Label>
        </View>
        <MSelect options={RESIDENCE} value={residence} onChange={setResidence} placeholder="Where do you live?" />
        {!!residence && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 11, color: C.txt3, marginBottom: 6, letterSpacing: 0.3, textTransform: 'uppercase' }}>
              Residence permit expires
            </Text>
            <DateField value={residenceExpiry} onChange={setResidenceExpiry} placeholder="Optional · leave blank if permanent" />
          </View>
        )}
        <Text style={{ fontSize: 12, color: C.txt3, marginTop: 8, lineHeight: 18 }}>
          Schengen, US or UK residence can unlock additional destinations.
        </Text>

        <View style={{ height: 1, backgroundColor: C.line, marginVertical: 24 }} />

        {/* Visas */}
        <Label optional>Existing visas or permits</Label>
        <View style={{ gap: 8 }}>
          {VISAS.map(v => {
            const visa = visas.find(x => x.code === v.code);
            const sel = !!visa;
            const expired = isExpired(visa?.expiry);
            return (
              <View key={v.code} style={{
                borderRadius: 14, overflow: 'hidden',
                backgroundColor: sel ? 'rgba(34,211,238,.08)' : C.bg3,
                borderWidth: 1, borderColor: expired ? C.vr + '88' : sel ? C.accent : C.line,
              }}>
                <Pressable onPress={() => toggleVisa(v.code)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
                  <View style={{
                    width: 20, height: 20, borderRadius: 6,
                    backgroundColor: sel ? C.accent : 'transparent',
                    borderWidth: 1.5, borderColor: sel ? C.accent : C.line2,
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    {sel && <Svg width="12" height="12" viewBox="0 0 12 12"><Path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" /></Svg>}
                  </View>
                  <Text style={{ flex: 1, fontSize: 14, color: C.txt, fontFamily: F.medium }}>{v.name}</Text>
                  {expired && <Text style={{ fontSize: 10, color: C.vr, fontFamily: F.semibold, letterSpacing: 0.5, textTransform: 'uppercase' }}>Expired</Text>}
                </Pressable>
                {sel && (
                  <View style={{ paddingHorizontal: 14, paddingBottom: 14, gap: 6 }}>
                    <Text style={{ fontSize: 11, color: C.txt3, letterSpacing: 0.3, textTransform: 'uppercase' }}>Expires</Text>
                    <DateField value={visa.expiry} onChange={(e) => setVisaExpiry(v.code, e)} placeholder="Optional" />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <View style={{ height: 24 }} />
        <Pressable
          disabled={!passports.length}
          onPress={() => onSubmit({ passports, residence, residenceExpiry, visas })}
          style={{
            height: 54, borderRadius: 27, backgroundColor: C.accent,
            alignItems: 'center', justifyContent: 'center', opacity: passports.length ? 1 : 0.4,
          }}>
          <Text style={{ color: '#000', fontSize: 15, fontFamily: F.semibold }}>Find My Destinations →</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
