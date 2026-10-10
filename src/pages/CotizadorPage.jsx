import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { personalInfo } from "../data/info";
import {
  paquetes,
  planesAnuales,
  formasDePago,
  METODOS_DE_PAGO,
  NOTA_SIN_PLAN,
  IVA,
  VIGENCIA_DIAS,
} from "../data/precios";
import "../styles/CotizadorPage.css";

const dinero = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const formatoFecha = { day: "numeric", month: "long", year: "numeric" };

// Devuelve el mensaje de error del campo, o "" si está bien
const validar = {
  nombre: (valor) => (valor.trim() ? "" : "Escribe tu nombre."),
  correo: (valor) =>
    /^\S+@\S+\.\S+$/.test(valor.trim())
      ? ""
      : "Escribe un correo válido, por ejemplo tu@email.com.",
};

function CotizadorPage() {
  const [paqueteId, setPaqueteId] = useState(paquetes[0].id);
  const [planId, setPlanId] = useState(""); // "" = sin plan anual
  const [planMensual, setPlanMensual] = useState(false);
  const [formaId, setFormaId] = useState(formasDePago[0].id);
  const [factura, setFactura] = useState(false);
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [correo, setCorreo] = useState("");
  const [errores, setErrores] = useState({ nombre: "", correo: "" });
  const nombreRef = useRef(null);
  const correoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cotizador — Axel Cortes";
    return () => {
      document.title = "Axel Cortes — VR & Game Developer";
    };
  }, []);

  // Cálculo de la cotización (se recalcula en cada render)
  const paquete = paquetes.find((p) => p.id === paqueteId);
  const plan = planesAnuales.find((p) => p.id === planId);
  const forma = formasDePago.find((f) => f.id === formaId);
  const mensual = Boolean(plan) && planMensual; // el plan se paga mes a mes

  const pagoUnico = paquete.precio;
  const descuento = pagoUnico * forma.descuento; // solo sobre el paquete
  const pagoAnual = plan && !mensual ? plan.precio : 0;
  const subtotal = pagoUnico - descuento + pagoAnual;
  const iva = factura ? subtotal * IVA : 0;
  const total = subtotal + iva;
  const alIniciar = total * forma.anticipo;
  const alEntregar = total - alIniciar;
  // La mensualidad va aparte del total: se cobra cada mes
  const mensualidad = mensual ? plan.mensual * (factura ? 1 + IVA : 1) : 0;

  const pct = (valor) => `${Math.round(valor * 100)}%`;

  const hoy = new Date();
  const vence = new Date();
  vence.setDate(hoy.getDate() + VIGENCIA_DIAS);

  // Si el campo ya tenía error, lo revalida mientras escribe
  const cambiarCampo = (campo, valor, setValor) => {
    setValor(valor);
    if (errores[campo]) {
      setErrores({ ...errores, [campo]: validar[campo](valor) });
    }
  };

  // Valida al salir del campo (los vacíos se avisan hasta enviar)
  const salirDeCampo = (campo, valor) => {
    if (valor.trim()) {
      setErrores({ ...errores, [campo]: validar[campo](valor) });
    }
  };

  const enviarWhatsApp = () => {
    const nuevosErrores = {
      nombre: validar.nombre(nombre),
      correo: validar.correo(correo),
    };
    setErrores(nuevosErrores);

    // Lleva el foco al primer campo con error
    if (nuevosErrores.nombre) {
      nombreRef.current.focus();
      return;
    }
    if (nuevosErrores.correo) {
      correoRef.current.focus();
      return;
    }

    const lineas = [
      "¡Hola! Quiero esta cotización:",
      "",
      `Cliente: ${nombre.trim()}`,
      empresa.trim() ? `Empresa: ${empresa.trim()}` : null,
      `Correo: ${correo.trim()}`,
      "",
      `Paquete ${paquete.nombre}: ${dinero.format(pagoUnico)} (pago único)`,
      descuento
        ? `Descuento de contado (${pct(forma.descuento)}): −${dinero.format(descuento)}`
        : null,
      !plan
        ? `Plan anual: sin plan. ${NOTA_SIN_PLAN}`
        : mensual
          ? `Plan: ${plan.nombre} (pago mensual)`
          : `Plan anual: ${plan.nombre}: ${dinero.format(pagoAnual)}/año`,
      factura ? `IVA (${pct(IVA)}): ${dinero.format(iva)}` : null,
      `Total: ${dinero.format(total)}`,
      "",
      `Forma de pago: ${forma.nombre}`,
      `Al iniciar (${pct(forma.anticipo)}): ${dinero.format(alIniciar)}`,
      alEntregar
        ? `A la entrega (${pct(1 - forma.anticipo)}): ${dinero.format(alEntregar)}`
        : null,
      mensual
        ? `Mensualidad del plan${factura ? " (con IVA)" : ""}: ${dinero.format(mensualidad)}/mes`
        : null,
    ];
    // Quita las líneas opcionales que no aplican
    const mensaje = lineas.filter((l) => l !== null).join("\n");

    window.open(
      `${personalInfo.whatsapp}?text=${encodeURIComponent(mensaje)}`,
      "_blank",
      "noopener"
    );
  };

  return (
    <>
      <Navbar />
      <main className="cotizador-page">
        {/* ---------- Vista en pantalla ---------- */}
        <div className="cotizador-pantalla">
          <h1 className="cotizador-titulo">Arma tu cotización</h1>
          <p className="cotizador-intro">
            Elige un paquete y, si lo necesitas, un plan anual. El total se
            actualiza al momento.
          </p>

          <div className="cotizador-grid">
            <div className="cotizador-opciones">
              <fieldset className="cotizador-grupo">
                <legend>1. Paquete de sitio web (pago único)</legend>
                <div className="paquetes">
                  {paquetes.map((p) => (
                    <label
                      key={p.id}
                      className={`opcion paquete ${p.id === paqueteId ? "activa" : ""}`}
                    >
                      <input
                        type="radio"
                        name="paquete"
                        value={p.id}
                        checked={p.id === paqueteId}
                        onChange={() => setPaqueteId(p.id)}
                      />
                      <span className="opcion-nombre">{p.nombre}</span>
                      <span className="opcion-precio">
                        {dinero.format(p.precio)}
                      </span>
                      <ul>
                        {p.incluye.map((item) => (
                          <li key={item}>
                            <i className="bx bx-check" aria-hidden="true"></i>{" "}
                            {item}
                          </li>
                        ))}
                      </ul>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="cotizador-grupo">
                <legend>2. Plan anual (opcional)</legend>
                <label className={`opcion fila ${planId === "" ? "activa" : ""}`}>
                  <input
                    type="radio"
                    name="plan"
                    value=""
                    checked={planId === ""}
                    onChange={() => setPlanId("")}
                    aria-describedby={planId === "" ? "nota-sin-plan" : undefined}
                  />
                  <span className="opcion-nombre">Sin plan anual</span>
                </label>
                {planId === "" && (
                  <p id="nota-sin-plan" className="opcion-nota">
                    <i className="bx bx-info-circle" aria-hidden="true"></i>{" "}
                    {NOTA_SIN_PLAN}
                  </p>
                )}
                {planesAnuales.map((p) => (
                  <label
                    key={p.id}
                    className={`opcion fila ${p.id === planId ? "activa" : ""}`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={p.id}
                      checked={p.id === planId}
                      onChange={() => setPlanId(p.id)}
                    />
                    <span className="opcion-nombre">{p.nombre}</span>
                    <span className="opcion-precio">
                      {dinero.format(p.precio)}/año
                    </span>
                  </label>
                ))}
                {plan && (
                  <label className={`opcion fila opcion-sub ${planMensual ? "activa" : ""}`}>
                    <input
                      type="checkbox"
                      checked={planMensual}
                      onChange={(e) => setPlanMensual(e.target.checked)}
                    />
                    <span className="opcion-nombre">Pagar el plan mes a mes</span>
                    <span className="opcion-precio">
                      {dinero.format(plan.mensual)}/mes
                    </span>
                  </label>
                )}
              </fieldset>

              <fieldset className="cotizador-grupo">
                <legend>3. Forma de pago</legend>
                {formasDePago.map((f) => (
                  <label
                    key={f.id}
                    className={`opcion fila ${f.id === formaId ? "activa" : ""}`}
                  >
                    <input
                      type="radio"
                      name="forma"
                      value={f.id}
                      checked={f.id === formaId}
                      onChange={() => setFormaId(f.id)}
                    />
                    <span className="opcion-nombre">{f.nombre}</span>
                    {f.descuento > 0 && (
                      <span className="opcion-precio">
                        −{pct(f.descuento)} en el paquete
                      </span>
                    )}
                  </label>
                ))}
              </fieldset>

              <fieldset className="cotizador-grupo">
                <legend>4. Facturación</legend>
                <label className={`opcion fila ${factura ? "activa" : ""}`}>
                  <input
                    type="checkbox"
                    checked={factura}
                    onChange={(e) => setFactura(e.target.checked)}
                  />
                  <span className="opcion-nombre">
                    Requiero factura (+{pct(IVA)} IVA)
                  </span>
                </label>
              </fieldset>

              <fieldset className="cotizador-grupo">
                <legend>5. Tus datos</legend>
                <p className="campos-nota">
                  Los campos con <span aria-hidden="true">*</span> son
                  obligatorios.
                </p>
                <div className="cotizador-campos">
                  <div className="campo-cot">
                    <label htmlFor="cot-nombre">
                      Nombre <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="cot-nombre"
                      ref={nombreRef}
                      type="text"
                      value={nombre}
                      onChange={(e) =>
                        cambiarCampo("nombre", e.target.value, setNombre)
                      }
                      onBlur={(e) => salirDeCampo("nombre", e.target.value)}
                      placeholder="Tu nombre"
                      autoComplete="name"
                      required
                      aria-invalid={errores.nombre ? true : undefined}
                      aria-describedby={
                        errores.nombre ? "error-nombre" : undefined
                      }
                    />
                    {errores.nombre && (
                      <p id="error-nombre" className="campo-error" role="alert">
                        <i className="bx bx-error-circle" aria-hidden="true"></i>{" "}
                        {errores.nombre}
                      </p>
                    )}
                  </div>
                  <div className="campo-cot">
                    <label htmlFor="cot-empresa">
                      Empresa{" "}
                      <span className="campo-opcional">(opcional)</span>
                    </label>
                    <input
                      id="cot-empresa"
                      type="text"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      placeholder="Nombre de tu negocio"
                      autoComplete="organization"
                    />
                  </div>
                  <div className="campo-cot">
                    <label htmlFor="cot-correo">
                      Correo <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="cot-correo"
                      ref={correoRef}
                      type="email"
                      value={correo}
                      onChange={(e) =>
                        cambiarCampo("correo", e.target.value, setCorreo)
                      }
                      onBlur={(e) => salirDeCampo("correo", e.target.value)}
                      placeholder="tu@email.com"
                      autoComplete="email"
                      required
                      aria-invalid={errores.correo ? true : undefined}
                      aria-describedby={
                        errores.correo ? "error-correo" : undefined
                      }
                    />
                    {errores.correo && (
                      <p id="error-correo" className="campo-error" role="alert">
                        <i className="bx bx-error-circle" aria-hidden="true"></i>{" "}
                        {errores.correo}
                      </p>
                    )}
                  </div>
                </div>
              </fieldset>
            </div>

            {/* ---------- Resumen en vivo ---------- */}
            <aside id="resumen" className="cotizador-resumen">
              <h2>Resumen</h2>
              {/* Solo para lectores de pantalla: anuncia el total cuando cambia */}
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                Total {dinero.format(total)}, al iniciar{" "}
                {dinero.format(alIniciar)}
                {mensual && `, más ${dinero.format(mensualidad)} al mes`}
              </p>
              <dl>
                <dt>Pago único ({paquete.nombre})</dt>
                <dd>{dinero.format(pagoUnico)}</dd>
                {descuento > 0 && (
                  <>
                    <dt>Descuento de contado ({pct(forma.descuento)})</dt>
                    <dd className="descuento">−{dinero.format(descuento)}</dd>
                  </>
                )}
                {!mensual && (
                  <>
                    <dt>Pago anual</dt>
                    <dd>{plan ? dinero.format(pagoAnual) : "—"}</dd>
                  </>
                )}
                {factura && (
                  <>
                    <dt>IVA ({pct(IVA)})</dt>
                    <dd>{dinero.format(iva)}</dd>
                  </>
                )}
                <dt className="total">Total</dt>
                <dd className="total">{dinero.format(total)}</dd>
                <dt>Al iniciar ({pct(forma.anticipo)})</dt>
                <dd>{dinero.format(alIniciar)}</dd>
                {alEntregar > 0 && (
                  <>
                    <dt>A la entrega ({pct(1 - forma.anticipo)})</dt>
                    <dd>{dinero.format(alEntregar)}</dd>
                  </>
                )}
                {mensual && (
                  <>
                    <dt className="mensualidad">
                      Plan mes a mes{factura && " (con IVA)"}
                    </dt>
                    <dd className="mensualidad">
                      {dinero.format(mensualidad)}/mes
                    </dd>
                  </>
                )}
              </dl>
              <p className="metodos-pago">
                <i className="bx bx-credit-card" aria-hidden="true"></i>{" "}
                {METODOS_DE_PAGO}
              </p>

              <div className="cotizador-botones">
                <Button type="button" size="lg" onClick={enviarWhatsApp}>
                  <i className="bx bxl-whatsapp" aria-hidden="true"></i> Enviar
                  por WhatsApp
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="neon"
                  onClick={() => window.print()}
                >
                  <i className="bx bx-download" aria-hidden="true"></i>{" "}
                  Descargar PDF
                </Button>
              </div>
            </aside>
          </div>

          {/* Barra fija en celular para ver el total mientras se elige */}
          <div className="barra-total-movil">
            <span>
              Total <strong>{dinero.format(total)}</strong>
            </span>
            <a href="#resumen">Ver resumen</a>
          </div>
        </div>

        {/* ---------- Hoja que solo aparece al imprimir / PDF ---------- */}
        <section className="hoja-impresion">
          <header>
            <h1>Cotización</h1>
            <p>
              <strong>{personalInfo.name}</strong> · {personalInfo.email}
            </p>
            <p>Fecha: {hoy.toLocaleDateString("es-MX", formatoFecha)}</p>
          </header>

          <p>
            <strong>Cliente:</strong> {nombre || "—"}
            {empresa && ` · ${empresa}`}
            {correo && ` · ${correo}`}
          </p>

          <table>
            <tbody>
              <tr>
                <td>
                  Paquete {paquete.nombre} (pago único)
                  <small>{paquete.incluye.join(", ")}</small>
                </td>
                <td>{dinero.format(pagoUnico)}</td>
              </tr>
              {descuento > 0 && (
                <tr>
                  <td>Descuento de contado ({pct(forma.descuento)})</td>
                  <td>−{dinero.format(descuento)}</td>
                </tr>
              )}
              {plan && !mensual && (
                <tr>
                  <td>Plan anual: {plan.nombre}</td>
                  <td>{dinero.format(pagoAnual)}</td>
                </tr>
              )}
              {factura && (
                <tr>
                  <td>IVA ({pct(IVA)})</td>
                  <td>{dinero.format(iva)}</td>
                </tr>
              )}
              <tr className="total">
                <td>Total</td>
                <td>{dinero.format(total)}</td>
              </tr>
              <tr>
                <td>Al iniciar ({pct(forma.anticipo)})</td>
                <td>{dinero.format(alIniciar)}</td>
              </tr>
              {alEntregar > 0 && (
                <tr>
                  <td>A la entrega ({pct(1 - forma.anticipo)})</td>
                  <td>{dinero.format(alEntregar)}</td>
                </tr>
              )}
              {mensual && (
                <tr>
                  <td>
                    Plan mes a mes: {plan.nombre}
                    {factura && " (con IVA)"}
                  </td>
                  <td>{dinero.format(mensualidad)}/mes</td>
                </tr>
              )}
            </tbody>
          </table>

          {!plan && (
            <p>
              <strong>Sin plan anual:</strong> {NOTA_SIN_PLAN}
            </p>
          )}
          <p>
            <strong>Forma de pago:</strong> {forma.nombre}.
            <br />
            <strong>Métodos de pago:</strong> {METODOS_DE_PAGO}
          </p>

          <p className="vigencia">
            Cotización válida por {VIGENCIA_DIAS} días, hasta el{" "}
            {vence.toLocaleDateString("es-MX", formatoFecha)}.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default CotizadorPage;
