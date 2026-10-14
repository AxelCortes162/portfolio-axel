import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  MotionConfig,
  motion as Motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ReactLenis } from "lenis/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ParticlesBackground from "./components/ParticlesBackground";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import { personalInfo } from "./data/info";

// Se cargan solo cuando se visitan: sacan SweetAlert2 del bundle inicial
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CotizadorPage = lazy(() => import("./pages/CotizadorPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
import Footer from "./components/Footer";
import "boxicons/css/boxicons.min.css";
import "@fontsource-variable/space-grotesk";
import "./styles/index.css";

// Barra neón arriba que se llena conforme bajas
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <Motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[200] h-[3px] origin-left bg-linear-to-r from-primary via-[#7c9cff] to-[#c084fc] shadow-[0_0_12px_var(--primary)]"
    />
  );
}

function Home() {
  return (
    <>
      <a href="#projects" className="skip-link">
        Saltar a proyectos
      </a>
      <ScrollProgress />
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

// Fundido al cambiar de ruta. Solo opacidad: un transform o filter aquí
// rompería el position: fixed del navbar durante la animación
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Suspense fallback={<div className="route-loading" />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          {/* ContactPage y CotizadorPage ya renderizan su propio Navbar y Footer */}
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/cotizador" element={<CotizadorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Motion.div>
  );
}

function App() {
  const reduceMotion = useReducedMotion();

  return (
    // reducedMotion="user": si el sistema pide menos movimiento, framer
    // quita los desplazamientos y deja solo los fundidos
    <MotionConfig reducedMotion="user">
      {!reduceMotion && (
        <ReactLenis
          root
          options={{ lerp: 0.1, anchors: { offset: -110 }, allowNestedScroll: true }}
        />
      )}
      <Router>
        <div className="fondo-particulas" aria-hidden="true">
          <ParticlesBackground />
        </div>
        <AnimatedRoutes />
      </Router>
    </MotionConfig>
  );
}

export default App;
