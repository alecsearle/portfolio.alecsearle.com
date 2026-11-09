import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebookSquare, FaEnvelope } from "react-icons/fa";

const icons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookSquare,
  email: FaEnvelope,
};

export default function Icon({ name, ...props }) {
  const Component = icons[name];
  return Component ? <Component aria-hidden="true" {...props} /> : null;
}
