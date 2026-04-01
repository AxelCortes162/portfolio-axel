import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ParticlesBackground from "./components/ParticlesBackground";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import ContactPage from "./pages/ContactPage";
import { personalInfo } from "./data/info";
import "./index.css";
import "../src/styles/global.css";

function App() {
  return (
    <Router>
      <div className="fondo-particulas">
        <ParticlesBackground />
      </div>

      <Routes>
        {/* RUTA PRINCIPAL (PORTAFOLIO) */}
        <Route path="/" element={
          <>
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
            
          </>
        } />

        {/* RUTA DE CONTACTO */}
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;