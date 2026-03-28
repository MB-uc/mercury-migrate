import { useEffect, useRef } from 'react';

const SITE_COLORS = ['#3b6fe8','#e05a2b','#2d9e60','#7c52cc','#c47a10','#1a9e8c'];

const CLUSTERS = [
  { cx: 0.15, cy: 0.30, r: 0.09, label: 'Sustainability' },
  { cx: 0.45, cy: 0.20, r: 0.07, label: 'Investor relations' },
  { cx: 0.70, cy: 0.35, r: 0.10, label: 'Operations' },
  { cx: 0.55, cy: 0.65, r: 0.08, label: 'Community' },
  { cx: 0.25, cy: 0.70, r: 0.06, label: 'Careers' },
  { cx: 0.82, cy: 0.70, r: 0.05, label: 'Products' },
  { cx: 0.35, cy: 0.45, r: 0.04, label: 'Legal' },
];

function rng(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function ScatterPlot() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth;
    const H = 240;
    canvas.width = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);

    CLUSTERS.forEach((cl, ci) => {
      for (let i = 0; i < 32; i++) {
        const si = Math.floor(rng(ci * 100 + i) * 6);
        const angle = rng(ci * 50 + i + 7) * Math.PI * 2;
        const rad = rng(ci * 30 + i + 13) * cl.r;
        const x = (cl.cx + Math.cos(angle) * rad) * W;
        const y = (cl.cy + Math.sin(angle) * rad) * H;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = SITE_COLORS[si] + 'bb';
        ctx.fill();
      }
      ctx.fillStyle = 'rgba(120,120,130,0.7)';
      ctx.font = '10px "DM Sans", sans-serif';
      ctx.fillText(cl.label, cl.cx * W - 20, cl.cy * H - cl.r * H - 6);
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: 240, display: 'block', borderRadius: 6, background: 'var(--surface-2)' }}
    />
  );
}
