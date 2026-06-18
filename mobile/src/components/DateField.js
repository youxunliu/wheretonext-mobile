import { useState } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { C } from '../colors';
import { isExpired } from '../data';

// value is a 'YYYY-MM-DD' string ('' = no expiry)
const toDate = (s) => (s ? new Date(s + 'T00:00:00') : new Date());
const toStr = (d) => {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};
const pretty = (s) => {
  if (!s) return '';
  return toDate(s).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function DateField({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  const expired = isExpired(value);

  const onPick = (event, selected) => {
    // Android fires with type 'dismissed' on cancel
    if (Platform.OS === 'android') setShow(false);
    if (event?.type === 'dismissed') return;
    if (selected) onChange(toStr(selected));
  };

  return (
    <View>
      <Pressable
        onPress={() => setShow(s => !s)}
        style={{
          height: 44, borderRadius: 10, backgroundColor: C.bg3,
          borderWidth: 1, borderColor: expired ? C.vr + '88' : C.line,
          paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        }}>
        <Text style={{ fontSize: 13, color: value ? C.txt : C.txt3 }}>
          {value ? pretty(value) : (placeholder || 'Select a date')}
        </Text>
        {value ? (
          <Pressable onPress={() => onChange('')} hitSlop={8}>
            <Text style={{ fontSize: 16, color: C.txt3 }}>×</Text>
          </Pressable>
        ) : null}
      </Pressable>

      {show && (
        <DateTimePicker
          value={toDate(value)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          themeVariant="dark"
          onChange={onPick}
        />
      )}
    </View>
  );
}
