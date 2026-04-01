import { Link } from "react-router-dom";
import logoCompleto from '../assets/logo.png';
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logoCompleto} className="logo-img" alt="Logo" />
      </Link>
      <ul className="menu">
        <li><Link to="/">Inicio</Link></li>
        <li><a href="/#about">Sobre mí</a></li>
        <li><a href="/#skills">Skills</a></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
}
export default Navbar;