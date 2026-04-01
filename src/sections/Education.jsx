import React from 'react';
import "../styles/Education.css";

function Education() {
  const estudios = [
    {
      escuela: "UVEG",
      titulo: "Ingeniería en Sistemas Computacionales",
      periodo: "2023 - Presente",
      lado: "left"
    },
    {
      escuela: "AluraLatam",
      titulo: "FrontEnd Development Program",
      periodo: "2023 - 2024",
      lado: "right"
    },
    {
      escuela: "UNAM",
      titulo: "Licenciatura en Enfermería (Incompleta)",
      periodo: "2019 - 2022",
      lado: "left"
    }
  ];

  return (
    <section id="education" className="education-section">
      <h2>Formación Académica</h2>
      <div className="timeline">
        {estudios.map((item, index) => (
          <div key={index} className={`timeline-item ${item.lado}`}>
            <div className="timeline-content">
              <span className="fecha">{item.periodo}</span>
              <h3>{item.escuela}</h3>
              <h4>{item.titulo}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;