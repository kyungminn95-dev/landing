"use client";

import { useEffect, useRef } from "react";

const STRINGS = [
  { y: 0.10, speed: 0.7,  phase: 0.0,  amp: 10 },
  { y: 0.25, speed: 1.1,  phase: 1.3,  amp: 8  },
  { y: 0.42, speed: 0.85, phase: 2.7,  amp: 12 },
  { y: 0.58, speed: 1.3,  phase: 0.9,  amp: 9  },
  { y: 0.74, speed: 0.95, phase: 2.1,  amp: 11 },
  { y: 0.90, speed: 1.15, phase: 1.6,  amp: 7  },
];

function buildPath(width: number, height: number, s: typeof STRINGS[0], t: number) {
  const baseY = s.y * height;
  const amplitude = s.amp * Math.sin(t * s.speed + s.phase);
  const segments = 120;
  let d = `M 0 ${baseY}`;
  for (let i = 1; i <= segments; i++) {
    const x = (i / segments) * width;
    const wave = amplitude * Math.sin((i / segments) * Math.PI);
    d += ` L ${x} ${baseY + wave}`;
  }
  return d;
}

export default function HeroStrings() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>("path");
    let raf: number;
    let t = 0;

    function animate() {
      t += 0.018;
      const { width, height } = svg.getBoundingClientRect();
      paths.forEach((path, i) => {
        path.setAttribute("d", buildPath(width, height, STRINGS[i], t));
      });
      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {STRINGS.map((_, i) => (
        <path
          key={i}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.1"
        />
      ))}
    </svg>
  );
}
