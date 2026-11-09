import { socials } from "../../data.js";
import Icon from "../Icon.jsx";
import "./SocialLinks.css";

// variant="rail": fixed vertical bar on wide screens. variant="inline": row inside the hero on smaller screens.
export default function SocialLinks({ variant = "inline" }) {
  return (
    <div className={`socials socials--${variant}`}>
      {variant === "rail" && <span className="socials__line" aria-hidden="true" />}
      {socials.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
          <Icon name={s.icon} />
        </a>
      ))}
    </div>
  );
}
