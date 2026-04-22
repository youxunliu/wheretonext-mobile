import { C } from '../colors';
import { isExpired } from '../data';

export default function DateField({ value, onChange, placeholder }) {
  const expired = isExpired(value);
  return (
    <div style={{ position: 'relative' }}>
      <input type="date" value={value || ''} onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', height: 44, borderRadius: 10, background: C.bg3,
          border: `1px solid ${expired ? C.vr + '88' : C.line}`,
          padding: '0 12px', fontSize: 14, color: value ? C.txt : C.txt3,
          outline: 'none', fontFamily: 'inherit', colorScheme: 'dark',
          WebkitAppearance: 'none', appearance: 'none', boxSizing: 'border-box',
        }}
      />
      {!value && (
        <div style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          fontSize: 13, color: C.txt3, pointerEvents: 'none',
        }}>{placeholder || 'Select a date'}</div>
      )}
    </div>
  );
}
