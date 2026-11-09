import { useEffect, useRef } from "react";
import { projects } from "../../data.js";
import "./Projects.css";

/**
 * Bento grid of project cards. On mouse devices each card gets a teal border glow that follows
 * the cursor and a slight magnetic pull; touch devices just get plain, tappable links.
 */
export default function Projects() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    const fancy =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!grid || !fancy) return;

    const onMove = (e) => {
      const card = e.target.closest(".project-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--glow-x", `${x}px`);
      card.style.setProperty("--glow-y", `${y}px`);
      card.style.setProperty("--pull-x", `${(x - rect.width / 2) * 0.03}px`);
      card.style.setProperty("--pull-y", `${(y - rect.height / 2) * 0.03}px`);
    };

    const onLeave = (e) => {
      const card = e.target.closest?.(".project-card");
      if (!card || card.contains(e.relatedTarget)) return;
      card.style.setProperty("--pull-x", "0px");
      card.style.setProperty("--pull-y", "0px");
    };

    grid.addEventListener("pointermove", onMove);
    grid.addEventListener("pointerout", onLeave);
    return () => {
      grid.removeEventListener("pointermove", onMove);
      grid.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>
      <div className="section-line" />

      <div className="project-grid" ref={gridRef}>
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className={`project-card ${p.image ? "" : "project-card--plain"}`}
          >
            {p.image && <img className="project-card__image" src={p.image} alt="" loading="lazy" />}
            <span className="project-card__label">{p.label}</span>
            <div className="project-card__body">
              <h3 className="project-card__title">
                {p.title}
                <span className="project-card__arrow" aria-hidden="true">
                  ↗
                </span>
              </h3>
              <p className="project-card__description">{p.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
