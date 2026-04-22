const PREFIX = 'wtnm_';

export const ls = (k, d) => {
  try { return JSON.parse(localStorage.getItem(PREFIX + k)) ?? d; }
  catch { return d; }
};

export const ss = (k, v) => {
  try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); }
  catch {}
};

export const fmtDate = (s) => {
  if (!s) return '';
  const d = new Date(s + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
