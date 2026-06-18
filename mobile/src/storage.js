import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'wtnm_';

// Async storage helpers. Unlike web localStorage these return promises.
export const load = async (k, d) => {
  try {
    const v = await AsyncStorage.getItem(PREFIX + k);
    return v != null ? JSON.parse(v) : d;
  } catch {
    return d;
  }
};

export const save = async (k, v) => {
  try {
    await AsyncStorage.setItem(PREFIX + k, JSON.stringify(v));
  } catch {}
};

export const fmtDate = (s) => {
  if (!s) return '';
  const d = new Date(s + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
