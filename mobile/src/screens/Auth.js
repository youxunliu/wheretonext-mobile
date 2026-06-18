import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';
import { C } from '../colors';
import { F } from '../fonts';

function AuthButton({ bg, fg, border, onPress, icon, children }) {
  return (
    <Pressable onPress={onPress} style={{
      height: 52, borderRadius: 26, backgroundColor: bg,
      borderWidth: border ? 1 : 0, borderColor: border || 'transparent',
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    }}>
      {icon}
      <Text style={{ color: fg, fontSize: 15, fontFamily: F.semibold }}>{children}</Text>
    </Pressable>
  );
}

export default function Auth({ onNext }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: C.bg, paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24, paddingHorizontal: 28 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: C.accent, fontFamily: F.medium, marginBottom: 8 }}>
          Welcome
        </Text>
        <Text style={{ fontFamily: F.serifLight, fontSize: 38, lineHeight: 42, color: C.txt }}>
          Sign in to{'\n'}<Text style={{ fontFamily: F.serifItalic, color: C.accent }}>WhereToNext</Text>
        </Text>
        <Text style={{ fontSize: 14, color: C.txt2, lineHeight: 22, marginTop: 12 }}>
          Save your travel profile, sync across devices, and get notified when visa policies change.
        </Text>
      </View>

      <View style={{ gap: 10, marginBottom: 24 }}>
        <AuthButton bg="#fff" fg="#000" onPress={() => onNext('apple')}
          icon={<Svg width="16" height="19" viewBox="0 0 16 19"><Path fill="#000" d="M12.5 10.3c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2-.1 1.7-.8 3.2-.8s1.9.8 3.2.8 2.1-1.2 2.9-2.4c.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.7zM10 3c.7-.8 1.1-1.9 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3C8.1 4.5 9.3 3.8 10 3z" /></Svg>}>
          Continue with Apple
        </AuthButton>

        <AuthButton bg="#fff" fg="#1f2937" onPress={() => onNext('google')}
          icon={<Svg width="18" height="18" viewBox="0 0 18 18"><Path fill="#4285F4" d="M17.6 9.2c0-.6-.1-1.2-.2-1.8H9v3.4h4.8c-.2 1.1-.8 2-1.8 2.6v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.4z" /><Path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3C2.4 15.9 5.5 18 9 18z" /><Path fill="#FBBC05" d="M3.9 10.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V5H.9C.3 6.2 0 7.6 0 9s.3 2.8.9 4l3-2.3z" /><Path fill="#EA4335" d="M9 3.6c1.3 0 2.6.5 3.5 1.4l2.6-2.6C13.5.9 11.4 0 9 0 5.5 0 2.4 2.1.9 5l3 2.3C4.6 5.2 6.6 3.6 9 3.6z" /></Svg>}>
          Continue with Google
        </AuthButton>

        <AuthButton bg="transparent" fg={C.txt} border={C.line2} onPress={() => onNext('email')}
          icon={<Svg width="18" height="14" viewBox="0 0 18 14"><Rect x="1" y="1" width="16" height="12" rx="2" stroke={C.txt} strokeWidth="1.5" fill="none" /><Path d="M1 3l8 5 8-5" stroke={C.txt} strokeWidth="1.5" strokeLinecap="round" fill="none" /></Svg>}>
          Sign in with Email
        </AuthButton>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 4 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: C.line }} />
          <Text style={{ fontSize: 12, color: C.txt3 }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: C.line }} />
        </View>

        <Pressable onPress={() => onNext('guest')} style={{ height: 48, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: C.txt2, fontSize: 14 }}>Continue as guest</Text>
        </Pressable>
      </View>

      <Text style={{ fontSize: 11, color: C.txt3, textAlign: 'center', lineHeight: 18 }}>
        By continuing, you agree to our <Text style={{ color: C.txt2 }}>Terms of Service</Text> and <Text style={{ color: C.txt2 }}>Privacy Policy</Text>.
      </Text>
    </View>
  );
}
