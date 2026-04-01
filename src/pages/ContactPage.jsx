import { useState } from "react";
import Swal from "sweetalert2";
import { FaWhatsapp, FaPaperPlane, FaPhoneAlt, FaEnvelope, FaUser } from "react-icons/fa"; // Importamos iconos
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // No olvides el footer
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

    // 1. Validaciones
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
        color: "#fff",
        confirmButtonColor: "#00ffd5"
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
        color: "#fff",
        confirmButtonColor: "#00ffd5"
      });
      return;
    }

    // 2. Envío
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
        color: "#fff",
        confirmButtonColor: "#00ffd5"
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-center">
        <div className="contacto-full">
          <Card title="¡Hablemos de tu próximo proyecto!">
            <form className="formulario" onSubmit={handleSubmit}>
              
              <div className="campo">
                <label>
                  <i className='bx bx-user'></i> Nombre Completo
                </label>
                <input type="text" name="name" placeholder="Ej. Axel Cortes" required />
              </div>
              
              <div className="campo">
                <label>
                  <i className='bx bx-envelope'></i> Email
                </label>
                <input type="email" name="email" placeholder="correo@ejemplo.com" required />
              </div>

              <div className="campo">
                <label>
                  <i className='bx bx-phone'></i> Celular (10 dígitos)
                </label>
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="5512345678" 
                  maxLength="10"
                  required
                  onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                />
              </div>
              
              <div className="campo">
                <label>
                  <i className='bx bx-message-detail'></i> Mensaje
                </label>
                <textarea name="message" rows="4" placeholder="¿En qué puedo ayudarte?" required></textarea>
              </div>
              
              <button type="submit" className="btn-enviar" disabled={enviando}>
                {enviando ? (
                  <span className="spinner-loader"></span>
                ) : (
                  <>ENVIAR MENSAJE <i className='bx bx-send'></i></>
                )}
              </button>
            </form>

            <div className="whatsapp-divider"><span>O TAMBIÉN</span></div>

            <div className="whatsapp-section">
              <a 
                href="https://wa.me/525586694753?text=¡Hola!%20Estoy%20interesado%20en%20tu%20trabajo." 
                target="_blank" 
                rel="noreferrer"
                className="btn-whatsapp"
              >
                <i className='bx bxl-whatsapp'></i> CONTACTO POR WHATSAPP
              </a>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}

export default ContactPage;