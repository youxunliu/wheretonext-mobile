export const PASSPORTS = [
  { code: 'DE', name: 'Germany',        flag: '🇩🇪', tier: 1 },
  { code: 'FR', name: 'France',         flag: '🇫🇷', tier: 1 },
  { code: 'IT', name: 'Italy',          flag: '🇮🇹', tier: 1 },
  { code: 'ES', name: 'Spain',          flag: '🇪🇸', tier: 1 },
  { code: 'JP', name: 'Japan',          flag: '🇯🇵', tier: 1 },
  { code: 'SG', name: 'Singapore',      flag: '🇸🇬', tier: 1 },
  { code: 'AU', name: 'Australia',      flag: '🇦🇺', tier: 1 },
  { code: 'CA', name: 'Canada',         flag: '🇨🇦', tier: 1 },
  { code: 'NL', name: 'Netherlands',    flag: '🇳🇱', tier: 1 },
  { code: 'KR', name: 'South Korea',    flag: '🇰🇷', tier: 1 },
  { code: 'NZ', name: 'New Zealand',    flag: '🇳🇿', tier: 1 },
  { code: 'CH', name: 'Switzerland',    flag: '🇨🇭', tier: 1 },
  { code: 'AT', name: 'Austria',        flag: '🇦🇹', tier: 1 },
  { code: 'PT', name: 'Portugal',       flag: '🇵🇹', tier: 1 },
  { code: 'SE', name: 'Sweden',         flag: '🇸🇪', tier: 1 },
  { code: 'FI', name: 'Finland',        flag: '🇫🇮', tier: 1 },
  { code: 'US', name: 'United States',  flag: '🇺🇸', tier: 2 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', tier: 2 },
  { code: 'BR', name: 'Brazil',         flag: '🇧🇷', tier: 2 },
  { code: 'AR', name: 'Argentina',      flag: '🇦🇷', tier: 2 },
  { code: 'MX', name: 'Mexico',         flag: '🇲🇽', tier: 3 },
  { code: 'TR', name: 'Turkey',         flag: '🇹🇷', tier: 3 },
  { code: 'ZA', name: 'South Africa',   flag: '🇿🇦', tier: 3 },
  { code: 'TH', name: 'Thailand',       flag: '🇹🇭', tier: 3 },
  { code: 'MY', name: 'Malaysia',       flag: '🇲🇾', tier: 3 },
  { code: 'IN', name: 'India',          flag: '🇮🇳', tier: 4 },
  { code: 'CN', name: 'China',          flag: '🇨🇳', tier: 4 },
  { code: 'PK', name: 'Pakistan',       flag: '🇵🇰', tier: 4 },
  { code: 'NG', name: 'Nigeria',        flag: '🇳🇬', tier: 4 },
  { code: 'PH', name: 'Philippines',    flag: '🇵🇭', tier: 4 },
  { code: 'BD', name: 'Bangladesh',     flag: '🇧🇩', tier: 4 },
];

export const VISAS = [
  { code: 'schengen', name: 'Schengen Visa / Residence',  short: 'Schengen' },
  { code: 'us',       name: 'US B1/B2 Visa',              short: 'US Visa' },
  { code: 'uk',       name: 'UK Visitor Visa',            short: 'UK Visa' },
  { code: 'ca',       name: 'Canadian Visa',              short: 'Canada Visa' },
  { code: 'ae',       name: 'UAE Residence',              short: 'UAE Residence' },
];

export const RESIDENCE = [
  { code: 'DE', name: 'Germany',     schengen: true  },
  { code: 'FR', name: 'France',      schengen: true  },
  { code: 'NL', name: 'Netherlands', schengen: true  },
  { code: 'ES', name: 'Spain',       schengen: true  },
  { code: 'IT', name: 'Italy',       schengen: true  },
  { code: 'PT', name: 'Portugal',    schengen: true  },
  { code: 'AT', name: 'Austria',     schengen: true  },
  { code: 'CH', name: 'Switzerland', schengen: true  },
  { code: 'SE', name: 'Sweden',      schengen: true  },
  { code: 'NO', name: 'Norway',      schengen: true  },
  { code: 'DK', name: 'Denmark',     schengen: true  },
  { code: 'FI', name: 'Finland',     schengen: true  },
  { code: 'BE', name: 'Belgium',     schengen: true  },
  { code: 'PL', name: 'Poland',      schengen: true  },
  { code: 'CZ', name: 'Czech Republic', schengen: true },
  { code: 'GR', name: 'Greece',      schengen: true  },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'AE', name: 'UAE' },
  { code: 'SG', name: 'Singapore' },
  { code: 'JP', name: 'Japan' },
  { code: 'IN', name: 'India' },
];

const SCHENGEN = new Set([
  'AT','BE','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IT','LV',
  'LT','LU','MT','NL','NO','PL','PT','SK','SI','ES','SE','CH',
]);

const VF  = (d) => ({ type: 'vf',  days: d });
const VOA = (d) => ({ type: 'voa', days: d });
const EV  = (d) => ({ type: 'ev',  days: d });
const VR  = ()  => ({ type: 'vr',  days: null });

export const DEST = [
  { c:'MV', n:'Maldives',     f:'🇲🇻', r:'Indian Ocean',  x:212, y:104, g:['#042a4a','#061525'], a:'#22d3ee',
    tl:'Overwater paradise — open to everyone',
    ti:[VOA(30),VOA(30),VOA(30),VOA(30)], u:[], ua:null,
    nt:'All nationalities receive 30 days on arrival.',
    hl:['Malé Atoll','Baa Atoll','Addu'], cu:'MVR', la:'Dhivehi' },
  { c:'GE', n:'Georgia',      f:'🇬🇪', r:'Caucasus',       x:189, y:70,  g:['#2e1212','#180808'], a:'#f87171',
    tl:'365-day stays, zero paperwork',
    ti:[VF(365),VF(365),VF(365),VF(365)], u:[], ua:null,
    nt:'Georgia offers a remarkable 365-day visa-free stay for almost all nationalities.',
    hl:['Tbilisi','Kazbegi','Wine Country'], cu:'GEL', la:'Georgian' },
  { c:'NP', n:'Nepal',        f:'🇳🇵', r:'South Asia',     x:216, y:88,  g:['#1a2e18','#0d1a0c'], a:'#4ade80',
    tl:'Rooftop of the world',
    ti:[VOA(90),VOA(90),VOA(90),VOA(90)], u:[], ua:null,
    nt:'Visa on arrival at Tribhuvan International Airport.',
    hl:['Kathmandu','Annapurna','Everest BC'], cu:'NPR', la:'Nepali' },
  { c:'KH', n:'Cambodia',     f:'🇰🇭', r:'SE Asia',        x:238, y:99,  g:['#2e1e08','#180f04'], a:'#fbbf24',
    tl:'Ancient temples, open borders',
    ti:[EV(30),EV(30),EV(30),EV(30)], u:[], ua:null,
    nt:'e-Visa available for USD 36 at evisa.gov.kh.',
    hl:['Angkor Wat','Phnom Penh','Koh Rong'], cu:'KHR', la:'Khmer' },
  { c:'RW', n:'Rwanda',       f:'🇷🇼', r:'Africa',         x:178, y:113, g:['#122e12','#081808'], a:'#86efac',
    tl:"Africa's rising star",
    ti:[EV(30),EV(30),EV(30),EV(30)], u:[], ua:null,
    nt:'e-Visa required for most. Apply at irembo.gov.rw.',
    hl:['Kigali','Volcanoes NP','Lake Kivu'], cu:'RWF', la:'Kinyarwanda' },
  { c:'AM', n:'Armenia',      f:'🇦🇲', r:'Caucasus',       x:191, y:72,  g:['#2a1228','#180a16'], a:'#e879f9',
    tl:'Ancient churches, warm welcome',
    ti:[VF(180),VF(180),VF(180),VF(180)], u:[], ua:null,
    nt:'Armenia offers 180-day visa-free stays for almost all nationalities.',
    hl:['Yerevan','Lake Sevan','Tatev'], cu:'AMD', la:'Armenian' },
  { c:'CO', n:'Colombia',     f:'🇨🇴', r:'S America',      x:72,  y:108, g:['#2a2208','#160e02'], a:'#fde047',
    tl:'Magic realism made real',
    ti:[VF(90),VF(90),VF(90),VF(90)], u:[], ua:null,
    nt:'Most nationalities enter visa-free for 90 days.',
    hl:['Cartagena','Medellín','Bogotá'], cu:'COP', la:'Spanish' },
  { c:'JO', n:'Jordan',       f:'🇯🇴', r:'Middle East',    x:183, y:80,  g:['#2a1a08','#160d04'], a:'#fb923c',
    tl:'Petra, Wadi Rum, Dead Sea',
    ti:[VOA(30),VOA(30),VOA(30),VOA(30)], u:[], ua:null,
    nt:'Visa on Arrival at all major entry points.',
    hl:['Petra','Wadi Rum','Aqaba'], cu:'JOD', la:'Arabic' },
  { c:'TZ', n:'Tanzania',     f:'🇹🇿', r:'Africa',         x:181, y:116, g:['#122a12','#081608'], a:'#4ade80',
    tl:'Serengeti, Kilimanjaro, Zanzibar',
    ti:[EV(90),EV(90),EV(90),EV(90)], u:[], ua:null,
    nt:'e-Visa at immigration.go.tz.',
    hl:['Serengeti','Kilimanjaro','Zanzibar'], cu:'TZS', la:'Swahili' },
  // Visa-unlock destinations (the "surprise" section)
  { c:'AL', n:'Albania',      f:'🇦🇱', r:'Europe',         x:169, y:68,  g:['#2e1010','#1a0808'], a:'#f87171',
    tl:"The Riviera's best-kept secret",
    ti:[VF(90),VF(90),VF(90),VR()], u:['schengen','us','uk'], ua:VF(90),
    nt:'Schengen, US, or UK visa holders may enter visa-free for 90 days.',
    hl:['Albanian Riviera','Berat','Tirana'], cu:'ALL', la:'Albanian' },
  { c:'XK', n:'Kosovo',       f:'🇽🇰', r:'Europe',         x:170, y:68,  g:['#10162e','#080d1a'], a:'#60a5fa',
    tl:"Europe's youngest nation",
    ti:[VF(90),VF(90),VR(),VR()], u:['schengen','us'], ua:VF(90),
    nt:'Schengen or US visa holders may enter visa-free for 90 days.',
    hl:['Pristina','Prizren','Rugova'], cu:'EUR', la:'Albanian' },
  { c:'MK', n:'N. Macedonia',  f:'🇲🇰', r:'Europe',        x:171, y:69,  g:['#2a2210','#161208'], a:'#fcd34d',
    tl:'Balkans without the crowds',
    ti:[VF(90),VF(90),VR(),VR()], u:['schengen','us'], ua:VF(90),
    nt:'Schengen or US visa holders enter visa-free for 90 days.',
    hl:['Ohrid','Skopje','Mavrovo'], cu:'MKD', la:'Macedonian' },
  { c:'MD', n:'Moldova',       f:'🇲🇩', r:'Europe',        x:173, y:65,  g:['#12221a','#081610'], a:'#34d399',
    tl:'Wine country off the map',
    ti:[VF(90),VF(90),VR(),VR()], u:['schengen'], ua:VF(90),
    nt:'Schengen visa/residence holders enter visa-free for 90 days.',
    hl:['Chișinău','Cricova','Transnistria'], cu:'MDL', la:'Romanian' },
  { c:'BA', n:'Bosnia',        f:'🇧🇦', r:'Europe',        x:167, y:67,  g:['#12181e','#080d14'], a:'#38bdf8',
    tl:'Ottoman soul, Adriatic spirit',
    ti:[VF(90),VF(90),VR(),VR()], u:['schengen','us','uk'], ua:VF(90),
    nt:'Schengen, US, or UK visa holders may enter visa-free.',
    hl:['Sarajevo','Mostar','Blagaj'], cu:'BAM', la:'Bosnian' },
  { c:'MX', n:'Mexico',        f:'🇲🇽', r:'Americas',      x:50,  y:85,  g:['#1a2a10','#0e1a08'], a:'#a3e635',
    tl:'Pyramids, beaches, color',
    ti:[VF(180),VF(180),VF(90),VR()], u:['us','ca'], ua:VF(180),
    nt:'US or Canadian visa holders are exempt from Mexican visa.',
    hl:['Mexico City','Cancún','Oaxaca'], cu:'MXN', la:'Spanish' },
  // Mainstream destinations
  { c:'TH', n:'Thailand',     f:'🇹🇭', r:'SE Asia',        x:236, y:97,  g:['#102228','#081418'], a:'#22d3ee',
    tl:'The Land of Smiles',
    ti:[VF(60),VF(60),VF(30),VOA(15)], u:[], ua:null,
    nt:'Generous visa-free stays; duration varies by passport.',
    hl:['Bangkok','Chiang Mai','Koh Samui'], cu:'THB', la:'Thai' },
  { c:'ID', n:'Indonesia',    f:'🇮🇩', r:'SE Asia',        x:245, y:118, g:['#2e1010','#1a0808'], a:'#fca5a5',
    tl:'17,000 islands of wonder',
    ti:[VF(30),VF(30),VOA(30),VOA(30)], u:[], ua:null,
    nt:'Many enter visa-free. VOA also at major airports.',
    hl:['Bali','Komodo','Raja Ampat'], cu:'IDR', la:'Indonesian' },
  { c:'MA', n:'Morocco',      f:'🇲🇦', r:'Africa',         x:155, y:82,  g:['#2a1010','#1a0808'], a:'#fb923c',
    tl:'Colors of the medina',
    ti:[VF(90),VF(90),VF(90),VR()], u:[], ua:null,
    nt:'Many nationalities enter visa-free.',
    hl:['Marrakech','Fes','Sahara'], cu:'MAD', la:'Arabic' },
  { c:'ZA', n:'South Africa', f:'🇿🇦', r:'Africa',         x:175, y:140, g:['#12221a','#081610'], a:'#4ade80',
    tl:'The Rainbow Nation',
    ti:[VF(30),VF(30),VF(30),VR()], u:[], ua:null,
    nt:'Many nationalities enter visa-free for 30 days.',
    hl:['Cape Town','Kruger','Garden Route'], cu:'ZAR', la:'English' },
  { c:'JP', n:'Japan',        f:'🇯🇵', r:'Asia',           x:272, y:76,  g:['#2a1022','#180814'], a:'#f9a8d4',
    tl:'Tradition meets future',
    ti:[VF(90),VF(90),VR(),VR()], u:[], ua:null,
    nt:"Japan's visa exemption covers 70+ countries.",
    hl:['Tokyo','Kyoto','Osaka'], cu:'JPY', la:'Japanese' },
  { c:'FR', n:'France',       f:'🇫🇷', r:'Europe',         x:162, y:68,  g:['#101628','#080d18'], a:'#93c5fd',
    tl:'The Schengen gateway',
    ti:[VF(90),VF(90),VR(),VR()], u:[], ua:null,
    nt:'Part of the Schengen Area.',
    hl:['Paris','Riviera','Lyon'], cu:'EUR', la:'French' },
  { c:'IT', n:'Italy',        f:'🇮🇹', r:'Europe',         x:166, y:70,  g:['#122210','#0a1808'], a:'#86efac',
    tl:'La dolce vita',
    ti:[VF(90),VF(90),VR(),VR()], u:[], ua:null,
    nt:'Part of the Schengen Area.',
    hl:['Rome','Venice','Amalfi'], cu:'EUR', la:'Italian' },
  { c:'PT', n:'Portugal',     f:'🇵🇹', r:'Europe',         x:155, y:72,  g:['#101628','#060c18'], a:'#a78bfa',
    tl:"Europe's western frontier",
    ti:[VF(90),VF(90),VR(),VR()], u:[], ua:null,
    nt:'Part of the Schengen Area.',
    hl:['Lisbon','Porto','Azores'], cu:'EUR', la:'Portuguese' },
  { c:'KE', n:'Kenya',        f:'🇰🇪', r:'Africa',         x:184, y:112, g:['#102210','#081608'], a:'#4ade80',
    tl:'The Great Migration',
    ti:[EV(90),EV(90),EV(90),EV(90)], u:[], ua:null,
    nt:'eTA required. Apply at etakenya.go.ke.',
    hl:['Masai Mara','Nairobi','Diani'], cu:'KES', la:'Swahili' },
  { c:'AU', n:'Australia',    f:'🇦🇺', r:'Oceania',        x:265, y:148, g:['#12221a','#081610'], a:'#34d399',
    tl:"World's largest island",
    ti:[EV(90),EV(90),VR(),VR()], u:[], ua:null,
    nt:"Most Tier 1 use ETA. Others need a visa.",
    hl:['Sydney','Reef','Melbourne'], cu:'AUD', la:'English' },
  { c:'BR', n:'Brazil',       f:'🇧🇷', r:'S America',      x:82,  y:125, g:['#122210','#0a1808'], a:'#4ade80',
    tl:'Carnival, Amazon, Copacabana',
    ti:[VF(90),VF(90),VF(90),VR()], u:[], ua:null,
    nt:'Visa-free for many nationalities up to 90 days.',
    hl:['Rio','São Paulo','Salvador'], cu:'BRL', la:'Portuguese' },
];

export const isExpired = (expiry) => {
  if (!expiry) return false;
  return new Date(expiry + 'T00:00:00').getTime() < Date.now();
};

export function computeAccess(passports, residence, residenceExpiry, visas) {
  const tiers = (passports || []).map(p => PASSPORTS.find(x => x.code === p)?.tier || 4);
  const bestTier = tiers.length ? Math.min(...tiers) : 4;

  const eff = new Set();
  (visas || []).forEach(v => { if (!isExpired(v.expiry)) eff.add(v.code); });
  if (residence && !isExpired(residenceExpiry)) {
    const r = RESIDENCE.find(x => x.code === residence);
    if (r?.schengen || SCHENGEN.has(residence)) eff.add('schengen');
    if (residence === 'US') eff.add('us');
    if (residence === 'GB') eff.add('uk');
    if (residence === 'CA') eff.add('ca');
    if (residence === 'AE') eff.add('ae');
  }

  const rank = (a) => {
    if (!a || a.type === 'vr') return -1;
    const base = a.type === 'vf' ? 3000 : a.type === 'voa' ? 2000 : a.type === 'ev' ? 1000 : 0;
    return base + (a.days || 0);
  };

  return DEST.map(d => {
    if (passports && passports.includes(d.c)) return null;
    let bestAccess = null;
    let bestPassport = null;
    (passports && passports.length ? passports : [null]).forEach(pc => {
      const t = PASSPORTS.find(x => x.code === pc)?.tier || 4;
      const ta = d.ti[t - 1];
      if (rank(ta) > rank(bestAccess)) { bestAccess = ta; bestPassport = pc; }
    });
    const via = d.u.find(v => eff.has(v));
    if (bestAccess && bestAccess.type !== 'vr') {
      return { ...d, access: bestAccess, surprise: false, viaPassport: bestPassport };
    }
    if (via && d.ua) return { ...d, access: d.ua, surprise: true, via };
    return { ...d, access: { type: 'vr', days: null }, surprise: false, blocked: true };
  }).filter(Boolean);
}
