import PillNav from "./components/PillNav/PillNav.jsx";
import SocialLinks from "./components/SocialLinks/SocialLinks.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Experience from "./components/Experience/Experience.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Contact from "./components/Contact/Contact.jsx";

export default function App() {
  return (
    <>
      <PillNav />
      <SocialLinks variant="rail" />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} Alec Searle ·{" "}
        <a href="https://alecsearle.com">alecsearle.com</a>
      </footer>
    </>
  );
}
