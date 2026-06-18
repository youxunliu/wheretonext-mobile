import { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { C } from '../colors';

function Sheet({ visible, options, value, onPick, onClose, placeholder }) {
  const [q, setQ] = useState('');
  const filt = options.filter(o => o.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.6)', justifyContent: 'flex-end' }}>
        <Pressable onPress={() => {}} style={{
          backgroundColor: C.bg2, borderTopLeftRadius: 24, borderTopRightRadius: 24,
          paddingTop: 20, paddingBottom: 32, maxHeight: '72%',
        }}>
          <View style={{ width: 38, height: 4, backgroundColor: C.line2, borderRadius: 2, alignSelf: 'center', marginBottom: 16 }} />
          <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
            <TextInput
              autoFocus value={q} onChangeText={setQ} placeholder="Search…" placeholderTextColor={C.txt3}
              style={{
                height: 44, borderRadius: 12, backgroundColor: C.bg3,
                borderWidth: 1, borderColor: C.line, paddingHorizontal: 14, fontSize: 15, color: C.txt,
              }}
            />
          </View>
          <ScrollView keyboardShouldPersistTaps="handled">
            {filt.map(o => (
              <Pressable key={o.code} onPress={() => { onPick(o.code); setQ(''); }}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 14,
                  backgroundColor: o.code === value ? C.bg3 : 'transparent',
                }}>
                <Text style={{ fontSize: 22 }}>{o.flag || '🌐'}</Text>
                <Text style={{ fontSize: 16, color: C.txt }}>{o.name}</Text>
              </Pressable>
            ))}
            {filt.length === 0 && <Text style={{ padding: 20, color: C.txt3, textAlign: 'center' }}>No results</Text>}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function MSelect({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const sel = options.find(o => o.code === value);
  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={{
        height: 52, borderRadius: 14, backgroundColor: C.bg3, borderWidth: 1, borderColor: C.line,
        paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10,
      }}>
        <Text style={{ fontSize: 22 }}>{sel?.flag || '🌐'}</Text>
        <Text style={{ fontSize: 15, color: sel ? C.txt : C.txt3, flex: 1 }}>{sel?.name || placeholder}</Text>
        <Svg width="14" height="14" viewBox="0 0 14 14">
          <Path d="M3 5l4 4 4-4" stroke={C.txt2} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </Pressable>
      <Sheet
        visible={open} options={options} value={value}
        onPick={(code) => { onChange(code); setOpen(false); }}
        onClose={() => setOpen(false)} placeholder={placeholder}
      />
    </>
  );
}

export function MSelectMulti({ visible, options, onPick, onClose, placeholder }) {
  return (
    <Sheet
      visible={visible} options={options}
      onPick={(code) => onPick(code)} onClose={onClose} placeholder={placeholder}
    />
  );
}
