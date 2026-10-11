import { jsPDF } from "jspdf";

const MARGEN = 20; // mm

// Arma y descarga la cotización. Recibe los textos ya formateados:
// filas = [{ concepto, detalle?, monto }], pagos = [{ concepto, detalle?, monto }], notas = [texto]
// Ojo: las fuentes estándar de jsPDF no traen "−" (signo menos); usar "-".
export function descargarCotizacionPdf({
  emisor,
  fecha,
  cliente,
  filas,
  total,
  pagos,
  notas,
  vigencia,
  archivo,
}) {
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const derecha = doc.internal.pageSize.getWidth() - MARGEN;
  const alto = doc.internal.pageSize.getHeight();
  let y = MARGEN + 4;

  // Si lo que sigue no cabe, pasa a la siguiente hoja
  const salto = (necesario) => {
    if (y + necesario > alto - MARGEN) {
      doc.addPage();
      y = MARGEN;
    }
  };

  // Escribe en la línea actual y devuelve cuánto alto ocupó (mm)
  const texto = (contenido, opciones = {}) => {
    const { size = 11, bold = false, color = 0, x = MARGEN, align, ancho } =
      opciones;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(color);
    const lineas = ancho ? doc.splitTextToSize(contenido, ancho) : [contenido];
    doc.text(lineas, x, y, { align });
    return lineas.length * size * 0.42; // 1 pt ≈ 0.35 mm, con interlineado 1.2
  };

  const linea = (grosor, color) => {
    doc.setLineWidth(grosor);
    doc.setDrawColor(color);
    doc.line(MARGEN, y, derecha, y);
  };

  const fila = ({ concepto, detalle, monto }, estilo = {}) => {
    salto(detalle ? 30 : 16);
    linea(estilo.grosor ?? 0.2, estilo.grosor ? 0 : 200);
    y += 6;
    texto(monto, { ...estilo, x: derecha, align: "right" });
    y += texto(concepto, { ...estilo, ancho: 120 });
    if (detalle) y += texto(detalle, { size: 8.5, color: 100, ancho: 140 });
    y += 1;
  };

  // Encabezado
  texto("Cotización", { size: 22, bold: true });
  y += 9;
  texto(`${emisor.nombre} · ${emisor.correo}`);
  y += 5.5;
  texto(`Fecha: ${fecha}`);
  y += 5;
  linea(0.6, 0);
  y += 9;
  y += texto(`Cliente: ${cliente}`, { ancho: derecha - MARGEN });
  y += 3;

  // Desglose
  filas.forEach((f) => fila(f));
  fila({ concepto: "Total", monto: total }, { size: 14, bold: true, grosor: 0.6 });
  pagos.forEach((p) => fila(p));
  linea(0.2, 200);
  y += 9;

  // Notas y vigencia
  notas.forEach((nota) => {
    salto(14);
    y += texto(nota, { size: 10, ancho: derecha - MARGEN }) + 1.5;
  });
  y += 2;
  salto(8);
  texto(vigencia, { size: 9, color: 100 });

  doc.save(archivo);
}
