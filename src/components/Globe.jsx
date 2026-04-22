import { useState, useEffect, useRef } from 'react';
import { C } from '../colors';

function gridPts(lon0, lat0, lon1, lat1, density) {
  const out = [];
  const lonStep = (lon1 - lon0) / density;
  const latStep = (lat1 - lat0) / Math.max(1, Math.round(density * (lat1 - lat0) / (lon1 - lon0)));
  for (let lon = lon0; lon <= lon1; lon += lonStep) {
    for (let lat = lat0; lat <= lat1; lat += latStep) {
      if (((lon * 13 + lat * 7) | 0) % 5 !== 0) out.push([lon, lat]);
    }
  }
  return out;
}

const LAND = [
  ...gridPts(-10, 40, 40, 70, 6),
  ...gridPts(-15, -35, 50, 35, 7),
  ...gridPts(55, 10, 145, 70, 10),
  ...gridPts(95, -10, 140, 10, 5),
  ...gridPts(115, -38, 150, -12, 5),
  ...gridPts(-165, 25, -60, 70, 9),
  ...gridPts(-110, 10, -75, 30, 4),
  ...gridPts(-80, -55, -35, 12, 7),
  ...gridPts(-180, 70, 180, 80, 8),
];

export default function Globe({ size = 220, zoom = 1, rotateSpeed = 14, markers = [], activeMarkerIdx = null, showPlane = true, glow = true }) {
  const [angle, setAngle] = useState(0);
  const rafRef = useRef(0);
  const lastRef = useRef(performance.now());
  const [planeAngle, setPlaneAngle] = useState(0);

  useEffect(() => {
    const tick = (now) => {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setAngle(a => (a + rotateSpeed * dt) % 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rotateSpeed]);

  useEffect(() => {
    const id = setInterval(() => setPlaneAngle(a => (a + 2) % 360), 40);
    return () => clearInterval(id);
  }, []);

  const R = 100;
  const project = (lon, lat) => {
    const λ = ((lon + angle) * Math.PI) / 180;
    const φ = (lat * Math.PI) / 180;
    const x = R * Math.cos(φ) * Math.sin(λ);
    const y = -R * Math.sin(φ);
    const z = R * Math.cos(φ) * Math.cos(λ);
    return { x, y, visible: z > 0, z };
  };

  const meridians = [];
  for (let lon = -180; lon < 180; lon += 30) meridians.push(lon);
  const parallels = [-60, -30, 0, 30, 60];

  const planePath = () => {
    const r = R * 1.12;
    const tilt = 25 * Math.PI / 180;
    const a = (planeAngle * Math.PI) / 180;
    const x = r * Math.cos(a);
    const y = r * Math.sin(a) * Math.sin(tilt) - r * 0.15;
    const z = r * Math.sin(a) * Math.cos(tilt);
    const rot = -planeAngle + 90;
    return { x, y, visible: z > 0, rot };
  };
  const plane = planePath();

  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {glow && (
        <div style={{
          position: 'absolute', inset: -size * 0.2,
          background: `radial-gradient(circle, ${C.accent}22 0%, ${C.accent}08 40%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}
      <svg viewBox="-130 -130 260 260" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <radialGradient id="globeGrad" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#1e2a3f" />
            <stop offset="60%" stopColor="#0d1320" />
            <stop offset="100%" stopColor="#05080f" />
          </radialGradient>
          <radialGradient id="globeRim" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="transparent" />
            <stop offset="100%" stopColor={C.accent} stopOpacity=".5" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r={R * zoom} fill="url(#globeGrad)" />
        {parallels.map(lat => {
          const ry = R * Math.cos(lat * Math.PI / 180) * zoom;
          const cy = -R * Math.sin(lat * Math.PI / 180) * zoom;
          return <ellipse key={'p' + lat} cx="0" cy={cy} rx={ry} ry={ry * 0.18} fill="none" stroke={C.line2} strokeWidth=".4" opacity=".5" />;
        })}
        {meridians.map(lon => {
          const pts = [];
          for (let lat = -90; lat <= 90; lat += 6) {
            const p = project(lon, lat);
            if (p.visible) pts.push(`${p.x * zoom},${p.y * zoom}`);
          }
          return pts.length > 1 ? <polyline key={'m' + lon} points={pts.join(' ')} fill="none" stroke={C.line2} strokeWidth=".4" opacity=".4" /> : null;
        })}
        {LAND.map((pt, i) => {
          const p = project(pt[0], pt[1]);
          if (!p.visible) return null;
          return <circle key={i} cx={p.x * zoom} cy={p.y * zoom} r={1.2 * zoom} fill={C.txt2} opacity={0.55 * (0.3 + 0.7 * (p.z / R))} />;
        })}
        {markers.map((m, i) => {
          const p = project(m.lon, m.lat);
          if (!p.visible) return null;
          const active = i === activeMarkerIdx;
          return (
            <g key={i}>
              {active && (
                <circle cx={p.x * zoom} cy={p.y * zoom} r="8" fill={C.accent} opacity=".18">
                  <animate attributeName="r" values="5;14;5" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values=".35;0;.35" dur="1.6s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={p.x * zoom} cy={p.y * zoom} r={active ? 3 : 2} fill={active ? C.accent : C.accent2} />
              {active && <circle cx={p.x * zoom} cy={p.y * zoom} r="1.2" fill="#fff" />}
            </g>
          );
        })}
        <circle cx="0" cy="0" r={R * zoom} fill="url(#globeRim)" />
        {showPlane && plane.visible && (
          <g transform={`translate(${plane.x} ${plane.y}) rotate(${plane.rot})`}>
            <path d="M -18 0 L -4 0" stroke={C.accent} strokeWidth="1" strokeLinecap="round" opacity=".5" />
            <path d="M -12 0 L -4 0" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 6 0 L -4 2.5 L -2 0 L -4 -2.5 Z" fill="#fff" />
            <path d="M -2 -3 L 0 -1 L 1 -1 L -1 -3 Z" fill="#fff" />
            <path d="M -2 3 L 0 1 L 1 1 L -1 3 Z" fill="#fff" />
          </g>
        )}
      </svg>
    </div>
  );
}
