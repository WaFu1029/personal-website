"use client";

import { useEffect, useRef, useState } from "react";

// Smooth-shaded ASCII Möbius strip — parametric surface, sampled on a (u,v)
// grid, lit per-point by its surface normal (z-buffered like cube.c / donut.c).
const WIDTH = 124;
const HEIGHT = 82;
const SIZE = 8; // world scale
const R = 2.1; // major radius (in SIZE units)
const HW = 1.15; // half strip width
const DISTANCE = 60;
const K1 = 50;
const NU = 320; // samples around the loop
const NV = 50; // samples across the strip
// horizontal stretch to correct monospace cell aspect (cell ~0.6 w:h in browser)
const ASPECT = 1.6;
const BG = " ";
const RAMP = ".,-~:;=!*#$@";
// light direction (view space), normalized
const LX = 0, LY = 0.55, LZ = -0.84;

// Möbius point in object space: u around loop, v across width.
function mobius(u: number, v: number): [number, number, number] {
  const cu = Math.cos(u), su = Math.sin(u);
  const ch = Math.cos(u / 2), sh = Math.sin(u / 2);
  const rad = R + v * ch;
  return [rad * cu * SIZE, rad * su * SIZE, v * sh * SIZE];
}

function render(t: number): string {
  const A = t * 0.6;
  const B = t * 0.45;
  const C = t * 0.2;
  const sA = Math.sin(A), cA = Math.cos(A);
  const sB = Math.sin(B), cB = Math.cos(B);
  const sC = Math.sin(C), cC = Math.cos(C);

  // rotate an object-space vector by the A/B/C euler rotation
  const rot = (i: number, j: number, k: number): [number, number, number] => [
    j * sA * sB * cC - k * cA * sB * cC + j * cA * sC + k * sA * sC + i * cB * cC,
    j * cA * cC + k * sA * cC - j * sA * sB * sC + k * cA * sB * sC - i * cB * sC,
    k * cA * cB - j * sA * cB + i * sB,
  ];

  const buffer = new Array(WIDTH * HEIGHT).fill(BG);
  const zbuf = new Array(WIDTH * HEIGHT).fill(0);

  const du = (2 * Math.PI) / NU;
  const dv = (2 * HW) / NV;

  for (let iu = 0; iu < NU; iu++) {
    const u = iu * du;
    for (let iv = 0; iv <= NV; iv++) {
      const v = -HW + iv * dv;

      const P = rot(...mobius(u, v));
      const z = P[2] + DISTANCE;
      const ooz = 1 / z;
      const xp = Math.floor(WIDTH / 2 + K1 * ooz * P[0] * ASPECT);
      const yp = Math.floor(HEIGHT / 2 + K1 * ooz * P[1]);
      if (xp < 0 || xp >= WIDTH || yp < 0 || yp >= HEIGHT) continue;
      const idx = xp + yp * WIDTH;
      if (ooz <= zbuf[idx]) continue;

      // surface normal via two tangents (finite diff), rotated, then lit
      const Pu = rot(...mobius(u + 0.01, v));
      const Pv = rot(...mobius(u, v + 0.01));
      const tu = [Pu[0] - P[0], Pu[1] - P[1], Pu[2] - P[2]];
      const tv = [Pv[0] - P[0], Pv[1] - P[1], Pv[2] - P[2]];
      let nx = tu[1] * tv[2] - tu[2] * tv[1];
      let ny = tu[2] * tv[0] - tu[0] * tv[2];
      let nz = tu[0] * tv[1] - tu[1] * tv[0];
      const nl = Math.hypot(nx, ny, nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      // strip is two-sided: use |dot| so whichever face we see is lit
      const lum = Math.abs(nx * LX + ny * LY + nz * LZ);
      const s = Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length));

      zbuf[idx] = ooz;
      buffer[idx] = RAMP[s];
    }
  }

  let out = "";
  for (let r = 0; r < HEIGHT; r++) {
    out += buffer.slice(r * WIDTH, r * WIDTH + WIDTH).join("") + "\n";
  }
  return out;
}

export default function AsciiCube() {
  const [frame, setFrame] = useState("");
  const raf = useRef(0);
  const start = useRef(0);

  useEffect(() => {
    const loop = (now: number) => {
      if (!start.current) start.current = now;
      setFrame(render((now - start.current) / 1000));
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div className="flex h-full items-center" style={{ marginTop: "-60px" }}>
      <pre
        aria-hidden
        className="select-none font-mono text-white"
        style={{ fontSize: "10px", lineHeight: "10px", letterSpacing: "0" }}
      >
        {frame}
      </pre>
    </div>
  );
}
