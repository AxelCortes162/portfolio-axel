import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Función para subir al inicio suavemente
  const scrollToTop = () => {
    setIsOpen(false); // Cerramos el menú móvil si está abierto
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Efecto de deslizamiento suave
    });
  };

  // Función especial para el inicio si estás en otra página (como contacto)
  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/"); // Nos movemos a la home
    setTimeout(() => {
      scrollToTop(); // Una vez ahí, subimos
    }, 100);
  };

  return (
    <nav className="navbar">
      {/* Al hacer clic en el Logo, sube al inicio */}
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
          {/* Usamos handleHomeClick para asegurar que funcione desde cualquier ruta */}
          <Link to="/" onClick={handleHomeClick}>Inicio</Link>
        </li>
        <li>
          <a href="#skills" onClick={toggleMenu}>Habilidades</a>
        </li>
        <li>
          <a href="#education" onClick={toggleMenu}>Formación</a>
        </li>
        <li>
          <Link to="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;