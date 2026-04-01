import { useState } from "react";
import Swal from "sweetalert2";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import "../styles/ContactPage.css";

function ContactPage() {
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const nombre = data.get("name").trim();
    const email = data.get("email").trim();
    const telefono = data.get("phone").trim();
    const mensaje = data.get("message").trim();

    // 1. Validaciones de Coherencia
    if (!nombre || !email || !telefono || !mensaje) {
      Swal.fire({
        title: "Faltan datos",
        text: "Por favor, completa todos los campos.",
        icon: "warning",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#00ffd5"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Email inválido",
        text: "La estructura del correo no es correcta.",
        icon: "error",
        background: "#0f172a",
        color: "#fff"
      });
      return;
    }

    const telRegex = /^\d{10}$/;
    if (!telRegex.test(telefono)) {
      Swal.fire({
        title: "Teléfono inválido",
        text: "Deben ser exactamente 10 números.",
        icon: "error",
        background: "#0f172a",
        color: "#fff"
      });
      return;
    }

    // 2. Proceso de Envío con Spinner
    setEnviando(true);
    
    try {
      const response = await fetch("https://formspree.io/f/xbdpkdzq", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        Swal.fire({
          title: "¡Mensaje Enviado!",
          text: "Me pondré en contacto contigo muy pronto.",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#00ffd5"
        });
        form.reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire({
        title: "Error de servidor",
        text: "No se pudo enviar. Intenta por WhatsApp.",
        icon: "error",
        background: "#0f172a",
        color: "#fff"
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container page-center">
        <div className="contacto-full">
          <Card title="Contacto Directo">
            <form className="formulario" onSubmit={handleSubmit}>
              <div className="campo">
                <label>Nombre Completo</label>
                <input type="text" name="name" placeholder="Tu nombre" />
              </div>
              
              <div className="campo">
                <label>Email</label>
                <input type="email" name="email" placeholder="correo@ejemplo.com" />
              </div>

              <div className="campo">
                <label>Número de Celular (10 dígitos)</label>
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="5512345678" 
                  maxLength="10"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </div>
              
              <div className="campo">
                <label>Mensaje</label>
                <textarea name="message" placeholder="¿Cómo puedo ayudarte?"></textarea>
              </div>
              
              <button type="submit" className="btn-enviar" disabled={enviando}>
                {enviando ? (
                  <span className="spinner-loader"></span>
                ) : (
                  "Enviar Mensaje"
                )}
              </button>
            </form>

            <div className="whatsapp-section">
              <p>O si prefieres algo instantáneo:</p>
              <a 
                href="https://wa.me/525586694753?text=¡Hola!%20Estoy%20interesado%20en%20un%20proyecto." 
                target="_blank" 
                className="btn-whatsapp"
              >
                WhatsApp Directo
              </a>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ContactPage;