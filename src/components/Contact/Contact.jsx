import { contactLinks } from "../../data.js";
import Icon from "../Icon.jsx";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">Contact</h2>
      <div className="section-line" />

      <h3 className="contact__heading">Let's connect</h3>
      <p className="section-lead">
        I'm always happy to talk about new opportunities, web projects, or just technology in
        general. Email is the fastest way to reach me.
      </p>

      <div className="contact__links">
        {contactLinks.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <a
              key={item.label}
              href={item.href}
              className="contact__link"
              {...(external && { target: "_blank", rel: "noreferrer" })}
            >
              <span className="contact__icon">
                <Icon name={item.icon} />
              </span>
              <span className="contact__text">
                <span className="contact__label">{item.label}</span>
                <span className="contact__value">{item.value}</span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
