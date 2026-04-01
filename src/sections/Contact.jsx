import Card from "../components/Card";

function Contact() {
  return (
    <div id="contact" className="contacto-container">
      <Card title="Contacto">
        <p>¿Tienes un proyecto en mente? ¡Hablemos!</p>
        <div className="contacto-links">
          <a href="mailto:tuemail@gmail.com">tuemail@gmail.com</a>
          <a href="https://linkedin.com/in/tuperfil" target="_blank">LinkedIn</a>
        </div>
      </Card>
    </div>
  );
}
export default Contact;