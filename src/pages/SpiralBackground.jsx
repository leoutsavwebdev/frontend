import { useEffect, useRef } from 'react';

const PI2 = Math.PI * 2;

function getParticleCount() {
  if (typeof window === 'undefined') return 1200;
  const isMobile =
    window.innerWidth < 768 ||
    window.matchMedia('(max-width: 768px)').matches;
  return isMobile ? 750 : 1650;
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getCanvasSize(canvas) {
  const parent = canvas.parentElement;
  const w =
    canvas.offsetWidth ||
    (parent && parent.clientWidth) ||
    window.innerWidth ||
    800;
  const h =
    canvas.offsetHeight ||
    (parent && parent.clientHeight) ||
    window.innerHeight ||
    600;

  return { w: Math.max(1, w), h: Math.max(1, h) };
}

export default function SpiralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let particles = [];

    const numArms = 4;
    const baseRadius = 0;
    const radiusRange = 420;
    const spiralWind = 0.14;

    let lastW = 0;
    let lastH = 0;
    let globalAngle = 0;

    function initParticles() {
      const count = getParticleCount();
      particles = [];

      for (let i = 0; i < count; i++) {
        const armIndex = i % numArms;
        const t = i / count;

        particles.push({
          radius: t * radiusRange,
          radiusSpeed: 0.038 + (i % 5) * 0.004,
          size: 2.4 + (i % 4) * 0.5,
          opacity: 0.72 + (i % 8) * 0.03,
          hue: 182 + (i % 28),
          armIndex,
        });
      }
    }

    function resize() {
      const { w, h } = getCanvasSize(canvas);
      if (w === lastW && h === lastH) return;

      lastW = w;
      lastH = h;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const reducedMotion = prefersReducedMotion();
    const speedMult = reducedMotion ? 0.25 : 1;

    function draw() {
      const { w, h } = getCanvasSize(canvas);
      const cx = w / 2;
      const cy = h / 2;

      const maxDimension = Math.max(w, h);
      const radiusScale = (maxDimension * 0.72) / radiusRange;

      const time = Date.now() * 0.001;

      globalAngle += 0.0018 * speedMult;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const angle =
          globalAngle +
          (p.armIndex / numArms) * PI2 +
          p.radius * spiralWind;

        const screenR = p.radius * radiusScale;

        const x = cx + Math.cos(angle) * screenR;
        const y = cy + Math.sin(angle) * screenR;

        const normR = p.radius / radiusRange;
        const depth = 1 - normR;

        const size = p.size * (0.3 + 0.7 * depth);
        const pulse = 0.92 + 0.08 * Math.sin(angle * 2 + time * 0.4);
        const alpha =
          p.opacity * pulse * (0.35 + 0.65 * depth);

        ctx.beginPath();
        ctx.arc(x, y, size * 1.5, 0, PI2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 82%, ${alpha * 0.35})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, size, 0, PI2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 82%, ${alpha})`;
        ctx.fill();

        p.radius += p.radiusSpeed * 0.01 * speedMult;

        if (p.radius > radiusRange) {
          p.radius = 0;
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    function startAnimation() {
      resize();
      initParticles();
      draw();
    }

    const startId = requestAnimationFrame(() => {
      startAnimation();
    });

    const ro = new ResizeObserver(() => {
      resize();
      initParticles();
    });

    ro.observe(canvas.parentElement || document.body);

    const onResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(startId);
      cancelAnimationFrame(animationId);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full min-h-screen pointer-events-none"
      style={{
        zIndex: 0,
        background: 'transparent',
        width: '100%',
        height: '100%',
      }}
      aria-hidden
    />
  );
}
