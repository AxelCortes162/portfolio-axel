import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { motion as Motion } from "framer-motion";
import Card from "../components/Card";
import Aurora from "../components/Aurora";
import { fadeUp, stagger } from "@/lib/motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { personalInfo } from "../data/info";
import "../styles/ContactPage.css";

const titulo = "¡Hablemos de tu próximo proyecto!";

const alertaBase = {
  background: "#0f172a",
  color: "#fff",
  confirmButtonColor: "#00ffd5",
};

function ContactPage() {
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contacto — Axel Cortes";
    return () => {
      document.title = "Axel Cortes — VR & Game Developer";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const nombre = data.get("name").trim();
    const email = data.get("email").trim();
    const mensaje = data.get("message").trim();

    // El teléfono es opcional: no todo el mundo quiere dejarlo
    if (!nombre || !email || !mensaje) {
      Swal.fire({
        title: "Faltan datos",
        text: "Completa tu nombre, correo y mensaje.",
        icon: "warning",
        ...alertaBase,
      });
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch("https://formspree.io/f/xbdpkdzq", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Respuesta no OK");

      Swal.fire({
        title: "¡Enviado!",
        text: "Gracias por contactarme, te responderé pronto.",
        icon: "success",
        ...alertaBase,
      });
      form.reset();
    } catch {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al enviar el mensaje. Inténtalo de nuevo o escríbeme por WhatsApp.",
        icon: "error",
        ...alertaBase,
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-center relative overflow-hidden">
        <Aurora />
        <div className="contacto-full">
          <Card>
            {/* Palabras separadas solo para la vista; se lee el aria-label */}
            <Motion.h1
              aria-label={titulo}
              variants={stagger(0.06)}
              className="titulo-contacto"
            >
              {titulo.split(" ").map((palabra, i) => (
                <Motion.span key={i} aria-hidden="true" variants={fadeUp} className="inline-block">
                  {palabra}&nbsp;
                </Motion.span>
              ))}
            </Motion.h1>

            <form className="formulario" onSubmit={handleSubmit} noValidate>
              <Motion.div variants={fadeUp} className="campo">
                <label htmlFor="name">
                  <i className="bx bx-user" aria-hidden="true"></i> Nombre
                  completo
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Ej. Axel Cortes"
                  autoComplete="name"
                  required
                />
              </Motion.div>

              <Motion.div variants={fadeUp} className="campo">
                <label htmlFor="email">
                  <i className="bx bx-envelope" aria-hidden="true"></i> Correo
                  electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                />
              </Motion.div>

              <Motion.div variants={fadeUp} className="campo">
                <label htmlFor="phone">
                  <i className="bx bx-phone" aria-hidden="true"></i> Teléfono{" "}
                  <span className="campo-opcional">(opcional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="55 1234 5678"
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9\s()+-]{7,20}"
                  maxLength="20"
                />
              </Motion.div>

              <Motion.div variants={fadeUp} className="campo">
                <label htmlFor="message">
                  <i className="bx bx-message-detail" aria-hidden="true"></i>{" "}
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="¿En qué puedo ayudarte?"
                  required
                ></textarea>
              </Motion.div>

              <Motion.button
                variants={fadeUp}
                whileTap={enviando ? undefined : { scale: 0.97 }}
                type="submit"
                className="btn-enviar"
                disabled={enviando}
                aria-busy={enviando}
              >
                {enviando ? (
                  <span className="spinner-loader" aria-label="Enviando"></span>
                ) : (
                  <>
                    ENVIAR MENSAJE{" "}
                    <i className="bx bx-send" aria-hidden="true"></i>
                  </>
                )}
              </Motion.button>
            </form>

            <Motion.div variants={fadeUp} className="whatsapp-divider">
              <span>O TAMBIÉN</span>
            </Motion.div>

            <Motion.div variants={fadeUp} className="whatsapp-section">
              <a
                href={`${personalInfo.whatsapp}?text=${encodeURIComponent(
                  "¡Hola! Estoy interesado en tu trabajo."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <i className="bx bxl-whatsapp" aria-hidden="true"></i> WHATSAPP
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-whatsapp btn-email"
              >
                <i className="bx bx-envelope" aria-hidden="true"></i> CORREO
              </a>
            </Motion.div>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;
