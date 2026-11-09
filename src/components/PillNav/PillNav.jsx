import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./PillNav.css";

const navItems = [
  { label: "Home", target: "hero", className: "pill-nav__item--home" },
  { label: "About", target: "about" },
  { label: "Experience", target: "experience" },
  { label: "Projects", target: "projects" },
  { label: "Contact", target: "contact" },
];

export default function PillNav() {
  const itemRefs = useRef([]);
  const [active, setActive] = useState("hero");
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  const [ready, setReady] = useState(false); // skip the slide-in animation on first paint

  // Highlight whichever section crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    navItems.forEach(({ target }) => {
      const el = document.getElementById(target);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Move the pill under the active link (measured, so it works at any padding/font size).
  useLayoutEffect(() => {
    const update = () => {
      const index = navItems.findIndex((item) => item.target === active);
      const el = itemRefs.current[index];
      setIndicator(el ? { x: el.offsetLeft, width: el.offsetWidth } : { x: 0, width: 0 });
    };
    update();
    const raf = requestAnimationFrame(() => setReady(true));
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, [active]);

  return (
    <nav className="pill-nav" aria-label="Main">
      <div className="pill-nav__container">
        <span
          className={`pill-nav__indicator ${ready ? "is-ready" : ""}`}
          aria-hidden="true"
          style={{
            transform: `translateX(${indicator.x}px)`,
            width: indicator.width,
            opacity: indicator.width ? 1 : 0,
          }}
        />
        {navItems.map((item, i) => (
          <a
            key={item.target}
            ref={(el) => (itemRefs.current[i] = el)}
            href={`#${item.target}`}
            className={`pill-nav__item ${item.className ?? ""} ${active === item.target ? "is-active" : ""}`}
            aria-current={active === item.target ? "true" : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
