import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <>
      <Navbar />
      <main className="notfound">
        <p className="notfound-code">404</p>
        <h1>Esta página no existe</h1>
        <p className="notfound-text">
          El enlace que seguiste no lleva a ningún lado. Volvamos al inicio.
        </p>
        <Link to="/" className="btn btn-primary">
          <i className="bx bx-home-alt"></i> Ir al inicio
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;
