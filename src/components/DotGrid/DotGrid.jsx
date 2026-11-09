import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import "./DotGrid.css";

gsap.registerPlugin(InertiaPlugin);

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? [1, 2, 3].map((i) => parseInt(m[i], 16)) : [0, 0, 0];
}

/**
 * Interactive dot field behind the hero. Dots light up near the cursor, get flung when the
 * cursor moves fast, and shock outward on click. Static on touch devices and for reduced motion,
 * and stops drawing entirely when scrolled out of view.
 */
export default function DotGrid({
  dotSize = 2,
  gap = 25,
  baseColor = "#333333",
  activeColor = "#2a9d8f",
  proximity = 120,
  speedTrigger = 100,
  shockRadius = 150,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const interactive =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const base = hexToRgb(baseColor);
    const active = hexToRgb(activeColor);
    const proxSq = proximity * proximity;
    const pointer = { x: -9999, y: -9999, lastX: 0, lastY: 0, lastTime: 0 };
    let dots = [];
    let width = 0;
    let height = 0;
    let rafId = 0;
    let visible = true;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cell = dotSize + gap;
      const cols = Math.floor((width + gap) / cell);
      const rows = Math.floor((height + gap) / cell);
      const startX = (width - (cell * cols - gap)) / 2 + dotSize / 2;
      const startY = (height - (cell * rows - gap)) / 2 + dotSize / 2;

      dots = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          dots.push({
            cx: startX + x * cell,
            cy: startY + y * cell,
            xOffset: 0,
            yOffset: 0,
            busy: false,
          });
        }
      }
      if (!interactive) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const r = dotSize / 2;
      for (const dot of dots) {
        const dx = dot.cx - pointer.x;
        const dy = dot.cy - pointer.y;
        const dsq = dx * dx + dy * dy;
        if (dsq <= proxSq) {
          const t = 1 - Math.sqrt(dsq) / proximity;
          const c = base.map((b, i) => Math.round(b + (active[i] - b) * t));
          ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        } else {
          ctx.fillStyle = baseColor;
        }
        ctx.beginPath();
        ctx.arc(dot.cx + dot.xOffset, dot.cy + dot.yOffset, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      rafId = visible ? requestAnimationFrame(loop) : 0;
    };

    const push = (dot, x, y) => {
      dot.busy = true;
      gsap.killTweensOf(dot);
      gsap.to(dot, {
        inertia: { xOffset: x, yOffset: y, resistance },
        onComplete: () => {
          gsap.to(dot, {
            xOffset: 0,
            yOffset: 0,
            duration: returnDuration,
            ease: "elastic.out(1,0.75)",
          });
          dot.busy = false;
        },
      });
    };

    let lastMove = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (!visible || now - lastMove < 50) return;
      lastMove = now;

      const dt = pointer.lastTime ? now - pointer.lastTime : 16;
      let vx = ((e.clientX - pointer.lastX) / dt) * 1000;
      let vy = ((e.clientY - pointer.lastY) / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        vx *= maxSpeed / speed;
        vy *= maxSpeed / speed;
        speed = maxSpeed;
      }
      pointer.lastTime = now;
      pointer.lastX = e.clientX;
      pointer.lastY = e.clientY;

      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;

      if (speed <= speedTrigger) return;
      for (const dot of dots) {
        if (!dot.busy && Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y) < proximity) {
          push(dot, dot.cx - pointer.x + vx * 0.005, dot.cy - pointer.y + vy * 0.005);
        }
      }
    };

    const onClick = (e) => {
      if (!visible) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dots) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot.busy) {
          const falloff = 1 - dist / shockRadius;
          push(
            dot,
            (dot.cx - cx) * shockStrength * falloff,
            (dot.cy - cy) * shockStrength * falloff,
          );
        }
      }
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap);

    if (!interactive) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !rafId) loop();
    });
    io.observe(wrap);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      dots.forEach((dot) => gsap.killTweensOf(dot));
    };
  }, [
    dotSize,
    gap,
    baseColor,
    activeColor,
    proximity,
    speedTrigger,
    shockRadius,
    shockStrength,
    maxSpeed,
    resistance,
    returnDuration,
  ]);

  return (
    <div ref={wrapRef} className="dot-grid" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
