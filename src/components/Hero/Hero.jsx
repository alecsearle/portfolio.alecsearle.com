import portrait from "../../assets/portrait.png";
import SocialLinks from "../SocialLinks/SocialLinks.jsx";
import DotGrid from "../DotGrid/DotGrid.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <DotGrid
        dotSize={2}
        gap={25}
        baseColor="#333333"
        activeColor="#2a9d8f"
        proximity={120}
        shockRadius={150}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />

      <div className="hero__inner">
        <div className="hero__text">
          <h1 className="hero__title">
            I'm <span className="hero__name">Alec Searle</span>
          </h1>
          <p className="hero__subtitle">Software Engineer &amp; Web Developer</p>
          <div className="hero__actions">
            <a className="btn" href="#contact">
              Contact Me
            </a>
            <SocialLinks variant="inline" />
          </div>
        </div>

        <div className="hero__portrait">
          <img
            src={portrait}
            alt="Portrait of Alec Searle"
            width="900"
            height="907"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
