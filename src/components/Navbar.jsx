import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Detecta la ruta actual

  // Verificamos si el usuario está en la página de contacto
  const isContactPage = location.pathname === "/contacto";

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
    setIsOpen(false);
    // Si ya estamos en el home, solo sube. Si no, navega al home.
    if (location.pathname === "/") {
      scrollToTop();
    } else {
      navigate("/");
      // Pequeño delay para asegurar que la navegación ocurra antes del scroll
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo: Siempre a la izquierda */}
      <Link to="/" onClick={handleHomeClick}>
        <img src={logo} alt="Logo Axel" className="logo-img" />
      </Link>

      {/* --- RENDERIZADO CONDICIONAL --- */}
      {isContactPage ? (
        /* 1. MODO CONTACTO: Solo botón de regresar, sin hamburguesa */
        <Link to="/" onClick={handleHomeClick} className="nav-back-only">
          <i className='bx bx-left-arrow-alt'></i>
          <span>INICIO</span>
        </Link>
      ) : (
        /* 2. MODO HOME: Navbar completo con menú hamburguesa */
        <>
          <button 
            className={`nav-toggle ${isOpen ? "open" : ""}`} 
            onClick={toggleMenu}
            aria-label="Abrir menú"
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
              <a href="#skills" onClick={() => setIsOpen(false)}>Habilidades</a>
            </li>
            <li>
              <a href="#education" onClick={() => setIsOpen(false)}>Formación</a>
            </li>
            <li>
              <a href="#projects" onClick={() => setIsOpen(false)}>Proyectos</a>
            </li>
            <li>
              <Link to="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}

export default Navbar;