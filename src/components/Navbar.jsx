import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToTop = () => {
    setIsOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };

  return (
    <nav className="navbar">
      <Link to="/" onClick={scrollToTop}>
        <img src={logo} alt="Logo Axel" className="logo-img" />
      </Link>

      <button 
        className={`nav-toggle ${isOpen ? "open" : ""}`} 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`menu ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={handleHomeClick}>Inicio</Link>
        </li>
        <li>
          <a href="#skills" onClick={toggleMenu}>Habilidades</a>
        </li>
        <li>
          <a href="#education" onClick={toggleMenu}>Formación</a>
        </li>
        <li>
          <a href="#projects" onClick={toggleMenu}>Proyectos</a>
        </li>
        <li>
          <Link to="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;