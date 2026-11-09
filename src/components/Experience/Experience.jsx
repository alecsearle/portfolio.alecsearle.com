import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../../data.js";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

export default function Experience() {
  const listRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(progressRef.current, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 65%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray(".exp-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section">
      <h2 className="section-title">Experience</h2>
      <div className="section-line" />

      <div className="exp-timeline" ref={listRef}>
        <span className="exp-track" aria-hidden="true">
          <span className="exp-progress" ref={progressRef} />
        </span>

        <ol className="exp-list">
          {experience.map((job) => (
            <li key={job.company} className="exp-item">
              <span className="exp-dot" aria-hidden="true" />
              <article className="exp-card">
                <header className="exp-card__header">
                  <h3 className="exp-company">{job.company}</h3>
                  <span className="exp-location">
                    <PinIcon />
                    {job.location}
                  </span>
                </header>

                {job.roles.map((role) => (
                  <div key={role.title} className="exp-role">
                    <div className="exp-role__header">
                      <h4 className="exp-role__title">{role.title}</h4>
                      <span className="exp-period">{role.period}</span>
                    </div>
                    <ul className="exp-bullets">
                      {role.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
