import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ParticlesBackground from "./components/ParticlesBackground";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import { personalInfo } from "./data/info";

// Se cargan solo cuando se visitan: sacan SweetAlert2 del bundle inicial
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
import Footer from "./components/Footer";
import "boxicons/css/boxicons.min.css";
import "./styles/global.css";

function Home() {
  return (
    <>
      <a href="#projects" className="skip-link">
        Saltar a proyectos
      </a>
      <Navbar />
      <main>
        <Hero name={personalInfo.name} title={personalInfo.title} />
        <div className="container">
          <div className="secciones-container">
            <Skills />
            <Education />
            <Projects />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="fondo-particulas" aria-hidden="true">
        <ParticlesBackground />
      </div>

      <Suspense fallback={<div className="route-loading" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ContactPage ya renderiza su propio Navbar y Footer */}
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
