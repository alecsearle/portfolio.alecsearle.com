import { quickFacts } from "../../data.js";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section">
      <h2 className="section-title">About</h2>
      <div className="section-line" />

      <div className="about__grid">
        <div className="about__body">
          <p className="section-lead">
            I'm a software engineer at Zonos and a 2026 Software Engineering graduate of Utah Tech
            University. Before Zonos I shipped updates across a 1,400-site WordPress portfolio and
            led a team of ISV support specialists, which taught me as much about people and
            communication as it did about code.
          </p>
          <p className="section-lead">
            I still take on freelance web projects to help small businesses build a solid online
            presence, and I'm increasingly drawn to mobile and cross-platform development. Outside
            of work I fly and film FPV drones. You can find that side of me at{" "}
            <a href="https://alecsearle.com">alecsearle.com</a>.
          </p>
        </div>

        <dl className="about__facts">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="about__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
