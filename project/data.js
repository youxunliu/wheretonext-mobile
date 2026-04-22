// WhereToNext — passport, visa, and destination data
window.WTN = (() => {

  const PASSPORTS = [
    { code: 'JP', name: 'Japan',           flag: '🇯🇵', tier: 1 },
    { code: 'DE', name: 'Germany',         flag: '🇩🇪', tier: 1 },
    { code: 'SG', name: 'Singapore',       flag: '🇸🇬', tier: 1 },
    { code: 'FR', name: 'France',          flag: '🇫🇷', tier: 1 },
    { code: 'IT', name: 'Italy',           flag: '🇮🇹', tier: 1 },
    { code: 'ES', name: 'Spain',           flag: '🇪🇸', tier: 1 },
    { code: 'FI', name: 'Finland',         flag: '🇫🇮', tier: 1 },
    { code: 'SE', name: 'Sweden',          flag: '🇸🇪', tier: 1 },
    { code: 'NL', name: 'Netherlands',     flag: '🇳🇱', tier: 1 },
    { code: 'AU', name: 'Australia',       flag: '🇦🇺', tier: 1 },
    { code: 'NZ', name: 'New Zealand',     flag: '🇳🇿', tier: 1 },
    { code: 'CA', name: 'Canada',          flag: '🇨🇦', tier: 1 },
    { code: 'KR', name: 'South Korea',     flag: '🇰🇷', tier: 1 },
    { code: 'CH', name: 'Switzerland',     flag: '🇨🇭', tier: 1 },
    { code: 'AT', name: 'Austria',         flag: '🇦🇹', tier: 1 },
    { code: 'PT', name: 'Portugal',        flag: '🇵🇹', tier: 1 },
    { code: 'US', name: 'United States',   flag: '🇺🇸', tier: 2 },
    { code: 'GB', name: 'United Kingdom',  flag: '🇬🇧', tier: 2 },
    { code: 'BR', name: 'Brazil',          flag: '🇧🇷', tier: 2 },
    { code: 'AR', name: 'Argentina',       flag: '🇦🇷', tier: 2 },
    { code: 'CL', name: 'Chile',           flag: '🇨🇱', tier: 2 },
    { code: 'MX', name: 'Mexico',          flag: '🇲🇽', tier: 3 },
    { code: 'TR', name: 'Turkey',          flag: '🇹🇷', tier: 3 },
    { code: 'ZA', name: 'South Africa',    flag: '🇿🇦', tier: 3 },
    { code: 'TH', name: 'Thailand',        flag: '🇹🇭', tier: 3 },
    { code: 'MY', name: 'Malaysia',        flag: '🇲🇾', tier: 3 },
    { code: 'UA', name: 'Ukraine',         flag: '🇺🇦', tier: 3 },
    { code: 'IN', name: 'India',           flag: '🇮🇳', tier: 4 },
    { code: 'CN', name: 'China',           flag: '🇨🇳', tier: 4 },
    { code: 'PK', name: 'Pakistan',        flag: '🇵🇰', tier: 4 },
    { code: 'NG', name: 'Nigeria',         flag: '🇳🇬', tier: 4 },
    { code: 'PH', name: 'Philippines',     flag: '🇵🇭', tier: 4 },
    { code: 'BD', name: 'Bangladesh',      flag: '🇧🇩', tier: 4 },
    { code: 'ET', name: 'Ethiopia',        flag: '🇪🇹', tier: 4 },
    { code: 'GH', name: 'Ghana',           flag: '🇬🇭', tier: 4 },
  ];

  const VISAS = [
    { code: 'schengen',  name: 'Schengen Visa or Residence Permit',  short: 'Schengen' },
    { code: 'us-b1b2',   name: 'US B1/B2 Visitor Visa',              short: 'US Visa' },
    { code: 'uk-visitor',name: 'UK Standard Visitor Visa',            short: 'UK Visa' },
    { code: 'canada-trv',name: 'Canadian Visitor Visa (TRV)',          short: 'Canada Visa' },
    { code: 'japan-visa',name: 'Japan Single/Multiple Entry Visa',    short: 'Japan Visa' },
    { code: 'uae-res',   name: 'UAE Residence Permit',                short: 'UAE Residence' },
  ];

  const RESIDENCE_COUNTRIES = [
    { code: 'DE', name: 'Germany',         schengen: true  },
    { code: 'FR', name: 'France',          schengen: true  },
    { code: 'IT', name: 'Italy',           schengen: true  },
    { code: 'ES', name: 'Spain',           schengen: true  },
    { code: 'NL', name: 'Netherlands',     schengen: true  },
    { code: 'PT', name: 'Portugal',        schengen: true  },
    { code: 'AT', name: 'Austria',         schengen: true  },
    { code: 'CH', name: 'Switzerland',     schengen: true  },
    { code: 'SE', name: 'Sweden',          schengen: true  },
    { code: 'NO', name: 'Norway',          schengen: true  },
    { code: 'DK', name: 'Denmark',         schengen: true  },
    { code: 'FI', name: 'Finland',         schengen: true  },
    { code: 'BE', name: 'Belgium',         schengen: true  },
    { code: 'PL', name: 'Poland',          schengen: true  },
    { code: 'CZ', name: 'Czech Republic',  schengen: true  },
    { code: 'GR', name: 'Greece',          schengen: true  },
    { code: 'US', name: 'United States',   schengen: false },
    { code: 'GB', name: 'United Kingdom',  schengen: false },
    { code: 'CA', name: 'Canada',          schengen: false },
    { code: 'AU', name: 'Australia',       schengen: false },
    { code: 'AE', name: 'UAE',             schengen: false },
    { code: 'JP', name: 'Japan',           schengen: false },
    { code: 'SG', name: 'Singapore',       schengen: false },
    { code: 'BR', name: 'Brazil',          schengen: false },
    { code: 'IN', name: 'India',           schengen: false },
    { code: 'TH', name: 'Thailand',        schengen: false },
    { code: 'ZA', name: 'South Africa',    schengen: false },
    { code: 'TR', name: 'Turkey',          schengen: false },
  ];

  // Access helpers
  const VF    = (days, note='') => ({ type: 'visa-free',       days, note });
  const VOA   = (days, note='') => ({ type: 'visa-on-arrival', days, note });
  const EV    = (days, note='') => ({ type: 'e-visa',          days, note });
  const VR    = ()               => ({ type: 'visa-required',  days: null, note: '' });

  // tiers[0]=tier1, tiers[1]=tier2, tiers[2]=tier3, tiers[3]=tier4
  const DESTINATIONS = [
    {
      code:'MV', name:'Maldives',         flag:'🇲🇻', region:'Indian Ocean',
      tagline:'Overwater paradise — open to everyone',
      gradient:['#042a4a','#061525'], accent:'#22d3ee',
      highlights:['North Malé Atoll','Baa Atoll UNESCO Biosphere','Addu Atoll','Huvadhoo Atoll'],
      currency:'Maldivian Rufiyaa (MVR)', language:'Dhivehi',
      tiers:[VOA(30),VOA(30),VOA(30),VOA(30)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'All nationalities receive a 30-day stamp on arrival. No advance visa required.',
    },
    {
      code:'GE', name:'Georgia',          flag:'🇬🇪', region:'Caucasus',
      tagline:'365-day stays with zero paperwork',
      gradient:['#2e1212','#180808'], accent:'#f87171',
      highlights:['Tbilisi Old Town','Kazbegi','Georgian Wine Regions','Black Sea Coast'],
      currency:'Georgian Lari (GEL)', language:'Georgian',
      tiers:[VF(365),VF(365),VF(365),VF(365)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Georgia offers one of the world\'s most generous visa policies: 365 days, visa-free, for almost all nationalities.',
    },
    {
      code:'NP', name:'Nepal',            flag:'🇳🇵', region:'South Asia',
      tagline:'Rooftop of the world',
      gradient:['#1a2e18','#0d1a0c'], accent:'#4ade80',
      highlights:['Kathmandu Valley','Annapurna Circuit','Everest Base Camp','Pokhara'],
      currency:'Nepalese Rupee (NPR)', language:'Nepali',
      tiers:[VOA(90),VOA(90),VOA(90),VOA(90)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Visa on arrival available for most nationalities at Tribhuvan International Airport. 15-day, 30-day, and 90-day options.',
    },
    {
      code:'KH', name:'Cambodia',         flag:'🇰🇭', region:'Southeast Asia',
      tagline:'Ancient temples, open borders',
      gradient:['#2e1e08','#180f04'], accent:'#fbbf24',
      highlights:['Angkor Wat','Phnom Penh','Siem Reap','Koh Rong'],
      currency:'Cambodian Riel (KHR)', language:'Khmer',
      tiers:[EV(30),EV(30),EV(30),EV(30)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'e-Visa available for USD 36 at evisa.gov.kh. Visa on arrival also available at major entry points.',
    },
    {
      code:'RW', name:'Rwanda',           flag:'🇷🇼', region:'Africa',
      tagline:'Africa\'s cleanest, fastest-rising capital',
      gradient:['#122e12','#081808'], accent:'#86efac',
      highlights:['Volcanoes National Park','Kigali','Lake Kivu','Nyungwe Forest'],
      currency:'Rwandan Franc (RWF)', language:'Kinyarwanda / English / French',
      tiers:[EV(30),EV(30),EV(30),EV(30)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'e-Visa required for most nationalities. Apply in advance at irembo.gov.rw for USD 50.',
    },
    {
      code:'AM', name:'Armenia',          flag:'🇦🇲', region:'Caucasus',
      tagline:'Ancient churches and warm hospitality',
      gradient:['#2a1228','#180a16'], accent:'#e879f9',
      highlights:['Yerevan','Garni Temple','Lake Sevan','Tatev Monastery','Dilijan Forest'],
      currency:'Armenian Dram (AMD)', language:'Armenian',
      tiers:[VF(180),VF(180),VF(180),VF(180)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Armenia welcomes visitors from almost all countries with visa-free access for up to 180 days.',
    },
    {
      code:'CO', name:'Colombia',         flag:'🇨🇴', region:'South America',
      tagline:'Magic realism made real',
      gradient:['#2a2208','#160e02'], accent:'#fde047',
      highlights:['Cartagena Old Town','Medellín','Bogotá','Coffee Region','Tayrona Park'],
      currency:'Colombian Peso (COP)', language:'Spanish',
      tiers:[VF(90),VF(90),VF(90),VF(90)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Colombia is remarkably open — most nationalities enter visa-free for 90 days, with possible extension.',
    },
    {
      code:'KG', name:'Kyrgyzstan',       flag:'🇰🇬', region:'Central Asia',
      tagline:'Nomadic skies and glacier lakes',
      gradient:['#12122e','#080818'], accent:'#818cf8',
      highlights:['Bishkek','Issyk-Kul Lake','Tian Shan Mountains','Song-Kol Lake'],
      currency:'Kyrgyzstani Som (KGS)', language:'Kyrgyz / Russian',
      tiers:[VF(60),VF(60),VF(30),VOA(30)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Many nationalities enter visa-free. e-Visa available at evisa.e-gov.kg. Visa on arrival at Manas Airport.',
    },
    {
      code:'JO', name:'Jordan',           flag:'🇯🇴', region:'Middle East',
      tagline:'Petra, Wadi Rum, and the Dead Sea',
      gradient:['#2a1a08','#160d04'], accent:'#fb923c',
      highlights:['Petra','Wadi Rum','Dead Sea','Aqaba','Jerash'],
      currency:'Jordanian Dinar (JOD)', language:'Arabic',
      tiers:[VOA(30),VOA(30),VOA(30),VOA(30)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Jordan Visa on Arrival available at all major ports of entry. Jordan Pass strongly recommended for tourists.',
    },
    {
      code:'TZ', name:'Tanzania',         flag:'🇹🇿', region:'Africa',
      tagline:'Serengeti, Kilimanjaro, Zanzibar',
      gradient:['#122a12','#081608'], accent:'#4ade80',
      highlights:['Serengeti','Kilimanjaro','Zanzibar','Ngorongoro','Selous'],
      currency:'Tanzanian Shilling (TZS)', language:'Swahili / English',
      tiers:[EV(90),EV(90),EV(90),EV(90)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'e-Visa required for most nationalities. Apply at immigration.go.tz. Single-entry USD 50.',
    },
    // ---- VISA-UNLOCK DESTINATIONS (the "surprise" section) ----
    {
      code:'AL', name:'Albania',          flag:'🇦🇱', region:'Europe',
      tagline:'The Riviera\'s best-kept secret',
      gradient:['#2e1010','#1a0808'], accent:'#f87171',
      highlights:['Albanian Riviera','Berat','Gjirokastër','Tirana','Valbona Valley'],
      currency:'Albanian Lek (ALL)', language:'Albanian',
      tiers:[VF(90),VF(90),VF(90),VR()],
      visaUnlocks:['schengen','us-b1b2','uk-visitor'],
      visaUnlockAccess:VF(90),
      entryNote:'Holders of a valid Schengen, US B1/B2, or UK visitor visa may enter Albania visa-free for up to 90 days.',
    },
    {
      code:'XK', name:'Kosovo',           flag:'🇽🇰', region:'Europe',
      tagline:'Europe\'s youngest, most welcoming nation',
      gradient:['#10162e','#080d1a'], accent:'#60a5fa',
      highlights:['Pristina','Prizren Old Bazaar','Rugova Canyon','Mirusha Waterfalls'],
      currency:'Euro (EUR)', language:'Albanian / Serbian',
      tiers:[VF(90),VF(90),VR(),VR()],
      visaUnlocks:['schengen','us-b1b2'],
      visaUnlockAccess:VF(90),
      entryNote:'Holders of a valid Schengen or US visa/residence permit may enter Kosovo visa-free for up to 90 days.',
    },
    {
      code:'MK', name:'North Macedonia',  flag:'🇲🇰', region:'Europe',
      tagline:'Balkans without the tourist crowds',
      gradient:['#2a2210','#161208'], accent:'#fcd34d',
      highlights:['Ohrid Lake UNESCO Site','Skopje','Mavrovo National Park','Bitola'],
      currency:'Macedonian Denar (MKD)', language:'Macedonian / Albanian',
      tiers:[VF(90),VF(90),VR(),VR()],
      visaUnlocks:['schengen','us-b1b2'],
      visaUnlockAccess:VF(90),
      entryNote:'Valid Schengen or US visa holders may enter North Macedonia for up to 90 days without an additional visa.',
    },
    {
      code:'MD', name:'Moldova',          flag:'🇲🇩', region:'Europe',
      tagline:'Wine country entirely off the map',
      gradient:['#12221a','#081610'], accent:'#34d399',
      highlights:['Chișinău','Orheiul Vechi','Cricova Wine Cellars','Transnistria','Saharna Monastery'],
      currency:'Moldovan Leu (MDL)', language:'Romanian / Russian',
      tiers:[VF(90),VF(90),VR(),VR()],
      visaUnlocks:['schengen'],
      visaUnlockAccess:VF(90),
      entryNote:'Schengen visa or residence permit holders can enter Moldova visa-free for 90 days.',
    },
    {
      code:'BA', name:'Bosnia & Herz.',   flag:'🇧🇦', region:'Europe',
      tagline:'Ottoman soul, Adriatic spirit',
      gradient:['#12181e','#080d14'], accent:'#38bdf8',
      highlights:['Sarajevo','Mostar Old Bridge','Blagaj','Kravice Waterfalls','Trebinje'],
      currency:'Bosnian Mark (BAM)', language:'Bosnian / Serbian / Croatian',
      tiers:[VF(90),VF(90),VR(),VR()],
      visaUnlocks:['schengen','us-b1b2','uk-visitor'],
      visaUnlockAccess:VF(90),
      entryNote:'Holders of valid Schengen, US, or UK visas may enter Bosnia & Herzegovina visa-free for up to 90 days.',
    },
    {
      code:'MX', name:'Mexico',           flag:'🇲🇽', region:'Americas',
      tagline:'Pyramids, beaches, and living color',
      gradient:['#1a2a10','#0e1a08'], accent:'#a3e635',
      highlights:['Mexico City','Cancún','Oaxaca','Chichén Itzá','Tulum','Copper Canyon'],
      currency:'Mexican Peso (MXN)', language:'Spanish',
      tiers:[VF(180),VF(180),VF(90),VR()],
      visaUnlocks:['us-b1b2','canada-trv'],
      visaUnlockAccess:VF(180),
      entryNote:'Holders of a valid US or Canadian visa are exempt from obtaining a Mexican tourist visa.',
    },
    // ---- MAINSTREAM DESTINATIONS ----
    {
      code:'TH', name:'Thailand',         flag:'🇹🇭', region:'Southeast Asia',
      tagline:'The original Land of Smiles',
      gradient:['#102228','#081418'], accent:'#22d3ee',
      highlights:['Bangkok','Chiang Mai','Koh Samui','Ayutthaya','Pai'],
      currency:'Thai Baht (THB)', language:'Thai',
      tiers:[VF(60),VF(60),VF(30),VOA(15)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Thailand offers generous visa-free entry. Duration varies by passport. 60-day e-Visa available for longer stays.',
    },
    {
      code:'ID', name:'Indonesia',        flag:'🇮🇩', region:'Southeast Asia',
      tagline:'17,000 islands of wonder',
      gradient:['#2e1010','#1a0808'], accent:'#fca5a5',
      highlights:['Bali','Komodo Island','Raja Ampat','Borobudur','Lombok'],
      currency:'Indonesian Rupiah (IDR)', language:'Indonesian / Javanese',
      tiers:[VF(30),VF(30),VOA(30),VOA(30)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Many nationalities enter visa-free for 30 days at Bali and Jakarta. Visa on Arrival also available.',
    },
    {
      code:'MA', name:'Morocco',          flag:'🇲🇦', region:'Africa',
      tagline:'Colors of the medina',
      gradient:['#2a1010','#1a0808'], accent:'#fb923c',
      highlights:['Marrakech','Fes Medina','Sahara Desert','Chefchaouen','Essaouira'],
      currency:'Moroccan Dirham (MAD)', language:'Arabic / Tamazight / French',
      tiers:[VF(90),VF(90),VF(90),VR()],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Many nationalities enter visa-free. Certain passport holders require advance visa from Moroccan embassy.',
    },
    {
      code:'ZA', name:'South Africa',     flag:'🇿🇦', region:'Africa',
      tagline:'The Rainbow Nation',
      gradient:['#12221a','#081610'], accent:'#4ade80',
      highlights:['Cape Town','Kruger National Park','Johannesburg','Garden Route','Drakensberg'],
      currency:'South African Rand (ZAR)', language:'Zulu / Xhosa / Afrikaans / English',
      tiers:[VF(30),VF(30),VF(30),VR()],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Many nationalities enter visa-free for 30 days. Some nationalities require advance visa.',
    },
    {
      code:'JP', name:'Japan',            flag:'🇯🇵', region:'Asia',
      tagline:'Tradition at the speed of light',
      gradient:['#2a1022','#180814'], accent:'#f9a8d4',
      highlights:['Tokyo','Kyoto','Osaka','Hiroshima','Hakone','Nara'],
      currency:'Japanese Yen (JPY)', language:'Japanese',
      tiers:[VF(90),VF(90),VR(),VR()],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Japan\'s visa exemption program covers 70+ countries. Non-exempt nationalities must apply via Japanese embassies.',
    },
    {
      code:'FR', name:'France',           flag:'🇫🇷', region:'Europe',
      tagline:'The Schengen gateway',
      gradient:['#101628','#080d18'], accent:'#93c5fd',
      highlights:['Paris','French Riviera','Lyon','Mont-Saint-Michel','Alsace'],
      currency:'Euro (EUR)', language:'French',
      tiers:[VF(90),VF(90),VR(),VR()],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Part of the Schengen Area. Non-exempt countries require a Schengen C-Visa from French consulates.',
    },
    {
      code:'IT', name:'Italy',            flag:'🇮🇹', region:'Europe',
      tagline:'La dolce vita',
      gradient:['#122210','#0a1808'], accent:'#86efac',
      highlights:['Rome','Venice','Florence','Amalfi Coast','Sicily','Cinque Terre'],
      currency:'Euro (EUR)', language:'Italian',
      tiers:[VF(90),VF(90),VR(),VR()],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Part of the Schengen Area. Non-exempt nationalities require a Schengen visa.',
    },
    {
      code:'PT', name:'Portugal',         flag:'🇵🇹', region:'Europe',
      tagline:'Europe\'s westernmost frontier',
      gradient:['#101628','#060c18'], accent:'#a78bfa',
      highlights:['Lisbon','Porto','Algarve','Sintra','Azores','Madeira'],
      currency:'Euro (EUR)', language:'Portuguese',
      tiers:[VF(90),VF(90),VR(),VR()],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Part of the Schengen Area. Non-exempt nationalities require a Schengen visa.',
    },
    {
      code:'KE', name:'Kenya',            flag:'🇰🇪', region:'Africa',
      tagline:'The Great Migration awaits',
      gradient:['#102210','#081608'], accent:'#4ade80',
      highlights:['Masai Mara','Nairobi','Mount Kenya','Diani Beach','Amboseli'],
      currency:'Kenyan Shilling (KES)', language:'Swahili / English',
      tiers:[EV(90),EV(90),EV(90),EV(90)],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Kenya requires an Electronic Travel Authorization (eTA) for all visitors. Apply at etakenya.go.ke before travel.',
    },
    {
      code:'AU', name:'Australia',        flag:'🇦🇺', region:'Oceania',
      tagline:'The world\'s largest island-continent',
      gradient:['#12221a','#081610'], accent:'#34d399',
      highlights:['Sydney','Great Barrier Reef','Melbourne','Uluru','Whitsundays'],
      currency:'Australian Dollar (AUD)', language:'English',
      tiers:[EV(90),EV(90),VR(),VR()],
      visaUnlocks:[], visaUnlockAccess:null,
      entryNote:'Most Tier 1 nationalities obtain an ETA or eVisitor online. Others must apply for a standard visitor visa.',
    },
  ];

  const SCHENGEN_CODES = new Set([
    'AT','BE','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IT','LV',
    'LI','LT','LU','MT','NL','NO','PL','PT','SK','SI','ES','SE','CH',
  ]);

  function computeDestinations(passportCode, residenceCode, selectedVisas) {
    const passport = PASSPORTS.find(p => p.code === passportCode);
    if (!passport) return { accessible: [], surprising: [] };
    const tier = passport.tier;

    // Build effective visa set
    const effectiveVisas = new Set(selectedVisas || []);
    if (residenceCode) {
      const res = RESIDENCE_COUNTRIES.find(r => r.code === residenceCode);
      if (res?.schengen || SCHENGEN_CODES.has(residenceCode)) effectiveVisas.add('schengen');
      if (residenceCode === 'US') effectiveVisas.add('us-b1b2');
      if (residenceCode === 'GB') effectiveVisas.add('uk-visitor');
      if (residenceCode === 'CA') effectiveVisas.add('canada-trv');
      if (residenceCode === 'AE') effectiveVisas.add('uae-res');
      if (residenceCode === 'JP') effectiveVisas.add('japan-visa');
    }

    const accessible = [];
    const surprising = [];

    for (const dest of DESTINATIONS) {
      if (dest.code === passportCode) continue; // skip own country

      const tierAccess = dest.tiers[tier - 1];
      const unlockVia = dest.visaUnlocks.find(v => effectiveVisas.has(v));

      let access = null;
      let isSurprising = false;
      let unlockViaCode = null;

      if (tierAccess && tierAccess.type !== 'visa-required') {
        access = { ...tierAccess };
      } else if (unlockVia && dest.visaUnlockAccess) {
        access = { ...dest.visaUnlockAccess };
        isSurprising = true;
        unlockViaCode = unlockVia;
      }

      if (access) {
        const result = { ...dest, access, isSurprising, unlockViaCode };
        accessible.push(result);
        if (isSurprising) surprising.push(result);
      }
    }

    // Sort: surprising first by name, then rest by region
    accessible.sort((a, b) => {
      if (a.isSurprising && !b.isSurprising) return -1;
      if (!a.isSurprising && b.isSurprising) return 1;
      return a.name.localeCompare(b.name);
    });

    return { accessible, surprising };
  }

  function getVisaLabel(visa) {
    return VISAS.find(v => v.code === visa)?.short || visa;
  }

  return { PASSPORTS, VISAS, RESIDENCE_COUNTRIES, DESTINATIONS, computeDestinations, getVisaLabel };
})();
