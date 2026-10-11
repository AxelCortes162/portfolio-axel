import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { personalInfo } from "../data/info";
import {
  categorias,
  paquetes,
  extras,
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

const primerPaquete = (categoriaId) =>
  paquetes.find((p) => p.categoria === categoriaId).id;

function CotizadorPage() {
  const [categoriaId, setCategoriaId] = useState(categorias[0].id);
  const [paqueteId, setPaqueteId] = useState(primerPaquete(categorias[0].id));
  const [extrasIds, setExtrasIds] = useState([]);
  const [planId, setPlanId] = useState(""); // "" = sin plan anual
  const [planMensual, setPlanMensual] = useState(false);
  const [formaId, setFormaId] = useState(formasDePago[0].id);
  const [factura, setFactura] = useState(false);
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [correo, setCorreo] = useState("");
  const [errores, setErrores] = useState({ nombre: "", correo: "" });
  const [generandoPdf, setGenerandoPdf] = useState(false);
  const [errorPdf, setErrorPdf] = useState(false);
  const nombreRef = useRef(null);
  const correoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cotizador — Axel Cortes";
    return () => {
      document.title = "Axel Cortes — VR & Game Developer";
    };
  }, []);

  // Al cambiar de categoría se reinicia lo que depende de ella
  const cambiarCategoria = (id) => {
    setCategoriaId(id);
    setPaqueteId(primerPaquete(id));
    setExtrasIds([]);
    setPlanId("");
    setPlanMensual(false);
  };

  const alternarExtra = (id) =>
    setExtrasIds((lista) =>
      lista.includes(id) ? lista.filter((e) => e !== id) : [...lista, id]
    );

  // ---------- Cálculo de la cotización (se recalcula en cada render) ----------
  const categoria = categorias.find((c) => c.id === categoriaId);
  const paquete = paquetes.find((p) => p.id === paqueteId);
  const paquetesCategoria = paquetes.filter((p) => p.categoria === categoriaId);
  const extrasCategoria = extras.filter((e) => e.categoria === categoriaId);
  const esWeb = categoriaId === "web";

  // Un extra que ya viene en el paquete no se cobra
  const extraIncluido = (e) => e.incluidoEn.includes(paqueteId);
  const extrasElegidos = extrasCategoria.filter(
    (e) => extrasIds.includes(e.id) && !extraIncluido(e)
  );
  const totalExtras = extrasElegidos.reduce((s, e) => s + e.precio, 0);

  const plan = esWeb ? planesAnuales.find((p) => p.id === planId) : undefined;
  const mensual = Boolean(plan) && planMensual; // el plan se paga mes a mes

  const pagoUnico = paquete.precio + totalExtras;
  // El plan en 3 pagos solo se ofrece en proyectos grandes
  const formasDisponibles = formasDePago.filter(
    (f) => !f.minimo || pagoUnico >= f.minimo
  );
  const forma =
    formasDisponibles.find((f) => f.id === formaId) ?? formasDisponibles[0];

  const descuento = pagoUnico * forma.descuento; // solo sobre el pago único
  const pagoAnual = plan && !mensual ? plan.precio : 0;
  const subtotal = pagoUnico - descuento + pagoAnual;
  const iva = factura ? subtotal * IVA : 0;
  const total = subtotal + iva;
  const pagos = forma.partes.map((parte) => ({
    nombre: parte.nombre,
    pct: parte.pct,
    monto: total * parte.pct,
  }));
  // La mensualidad va aparte del total: se cobra cada mes
  const mensualidad = mensual ? plan.mensual * (factura ? 1 + IVA : 1) : 0;

  const pct = (valor) => `${Math.round(valor * 100)}%`;
  const entrega = `${paquete.entrega} a partir de recibir tu material`;

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

  const descargarPdf = async () => {
    setGenerandoPdf(true);
    setErrorPdf(false);
    try {
      // jsPDF (~300 KB) se descarga solo cuando alguien pide el PDF
      const { descargarCotizacionPdf } = await import("../lib/cotizacionPdf");
      // En el PDF va "-" y no "−": las fuentes de jsPDF no traen el signo menos
      descargarCotizacionPdf({
        emisor: { nombre: personalInfo.name, correo: personalInfo.email },
        fecha: hoy.toLocaleDateString("es-MX", formatoFecha),
        cliente: [nombre.trim() || "Por definir", empresa.trim(), correo.trim()]
          .filter(Boolean)
          .join(" · "),
        filas: [
          {
            concepto: `${categoria.nombre}: paquete ${paquete.nombre} (pago único)`,
            detalle: `${paquete.incluye.join(", ")}. Entrega: ${entrega}.`,
            monto: dinero.format(paquete.precio),
          },
          ...extrasElegidos.map((e) => ({
            concepto: `Extra: ${e.nombre}`,
            detalle: e.descripcion,
            monto: dinero.format(e.precio),
          })),
          descuento > 0 && {
            concepto: `Descuento de contado (${pct(forma.descuento)})`,
            monto: `-${dinero.format(descuento)}`,
          },
          plan && !mensual && {
            concepto: `Plan anual: ${plan.nombre}`,
            detalle: plan.descripcion,
            monto: dinero.format(pagoAnual),
          },
          factura && {
            concepto: `IVA (${pct(IVA)})`,
            monto: dinero.format(iva),
          },
        ].filter(Boolean),
        total: dinero.format(total),
        pagos: [
          ...pagos.map((p) => ({
            concepto: `${p.nombre} (${pct(p.pct)})`,
            monto: dinero.format(p.monto),
          })),
          mensual && {
            concepto: `Plan mes a mes (12 pagos): ${plan.nombre}${factura ? " (con IVA)" : ""}`,
            detalle: plan.descripcion,
            monto: `${dinero.format(mensualidad)}/mes`,
          },
        ].filter(Boolean),
        notas: [
          ...categoria.incluye.map((t) => `${t}.`),
          paquete.nota,
          categoria.nota,
          esWeb && !plan && `Sin plan anual: ${NOTA_SIN_PLAN}`,
          `Forma de pago: ${forma.nombre}.`,
          `Métodos de pago: ${METODOS_DE_PAGO}`,
        ].filter(Boolean),
        vigencia: `Cotización válida por ${VIGENCIA_DIAS} días, hasta el ${vence.toLocaleDateString("es-MX", formatoFecha)}.`,
        archivo: "cotizacion-axel-cortes.pdf",
      });
    } catch {
      setErrorPdf(true);
    } finally {
      setGenerandoPdf(false);
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
      `${categoria.nombre}: paquete ${paquete.nombre}: ${dinero.format(paquete.precio)} (pago único)`,
      ...extrasElegidos.map((e) => `Extra: ${e.nombre}: ${dinero.format(e.precio)}`),
      `Entrega: ${entrega}`,
      descuento
        ? `Descuento de contado (${pct(forma.descuento)}): −${dinero.format(descuento)}`
        : null,
      !esWeb
        ? null
        : !plan
          ? `Plan anual: sin plan. ${NOTA_SIN_PLAN}`
          : mensual
            ? `Plan: ${plan.nombre} (12 pagos mensuales)`
            : `Plan anual: ${plan.nombre}: ${dinero.format(pagoAnual)}/año`,
      factura ? `IVA (${pct(IVA)}): ${dinero.format(iva)}` : null,
      `Total: ${dinero.format(total)}`,
      "",
      `Forma de pago: ${forma.nombre}`,
      ...pagos.map((p) => `${p.nombre} (${pct(p.pct)}): ${dinero.format(p.monto)}`),
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
        <div className="cotizador-pantalla">
          <h1 className="cotizador-titulo">Arma tu cotización</h1>
          <p className="cotizador-intro">
            Páginas web, juegos para celular y experiencias de realidad virtual.
            Elige lo que necesitas, el total se actualiza al momento y puedes
            descargarlo en PDF o enviármelo por WhatsApp.
          </p>

          <div className="cotizador-grid">
            <div className="cotizador-opciones">
              <fieldset className="cotizador-grupo">
                <legend>1. ¿Qué necesitas?</legend>
                <div className="categorias">
                  {categorias.map((c) => (
                    <label
                      key={c.id}
                      className={`opcion categoria ${c.id === categoriaId ? "activa" : ""}`}
                    >
                      <input
                        type="radio"
                        name="categoria"
                        value={c.id}
                        checked={c.id === categoriaId}
                        onChange={() => cambiarCategoria(c.id)}
                      />
                      <i className={c.icono} aria-hidden="true"></i>
                      <span className="opcion-nombre">{c.nombre}</span>
                      <span className="opcion-detalle">{c.descripcion}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="cotizador-grupo">
                <legend>2. Paquete (pago único)</legend>
                <div className="paquetes">
                  {paquetesCategoria.map((p) => (
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
                      <span className="paquete-resumen">{p.resumen}</span>
                      <ul>
                        {p.incluye.map((item) => (
                          <li key={item}>
                            <i className="bx bx-check" aria-hidden="true"></i>{" "}
                            {item}
                          </li>
                        ))}
                      </ul>
                      <span className="paquete-entrega">
                        <i className="bx bx-time-five" aria-hidden="true"></i>{" "}
                        Entrega: {p.entrega}
                      </span>
                      {p.nota && <span className="paquete-nota">{p.nota}</span>}
                    </label>
                  ))}
                </div>
                <div className="incluye-todos">
                  <p>En todos los paquetes de {categoria.nombre.toLowerCase()}:</p>
                  <ul>
                    {categoria.incluye.map((item) => (
                      <li key={item}>
                        <i className="bx bx-check-shield" aria-hidden="true"></i>{" "}
                        {item}.
                      </li>
                    ))}
                  </ul>
                  {categoria.nota && (
                    <p className="incluye-nota">
                      <i className="bx bx-info-circle" aria-hidden="true"></i>{" "}
                      {categoria.nota}
                    </p>
                  )}
                </div>
              </fieldset>

              {esWeb ? (
                <fieldset className="cotizador-grupo">
                  <legend>3. Plan anual (opcional)</legend>
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
                      <span className="fila-texto">
                        <span className="opcion-nombre">{p.nombre}</span>
                        <span className="opcion-detalle">{p.descripcion}</span>
                      </span>
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
                      <span className="fila-texto">
                        <span className="opcion-nombre">Pagar el plan mes a mes</span>
                        <span className="opcion-detalle">
                          12 pagos de {dinero.format(plan.mensual)} (
                          {dinero.format(plan.mensual * 12)} al año en lugar de{" "}
                          {dinero.format(plan.precio)})
                        </span>
                      </span>
                      <span className="opcion-precio">
                        {dinero.format(plan.mensual)}/mes
                      </span>
                    </label>
                  )}
                </fieldset>
              ) : (
                <fieldset className="cotizador-grupo">
                  <legend>3. Extras (opcional)</legend>
                  {extrasCategoria.map((e) => {
                    const incluido = extraIncluido(e);
                    const marcado = incluido || extrasIds.includes(e.id);
                    return (
                      <label
                        key={e.id}
                        className={`opcion fila ${marcado ? "activa" : ""} ${incluido ? "incluido" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={marcado}
                          disabled={incluido}
                          onChange={() => alternarExtra(e.id)}
                        />
                        <span className="fila-texto">
                          <span className="opcion-nombre">{e.nombre}</span>
                          <span className="opcion-detalle">{e.descripcion}</span>
                        </span>
                        <span className="opcion-precio">
                          {incluido ? "Incluido" : `+${dinero.format(e.precio)}`}
                        </span>
                      </label>
                    );
                  })}
                </fieldset>
              )}

              <fieldset className="cotizador-grupo">
                <legend>4. Forma de pago</legend>
                {formasDisponibles.map((f) => (
                  <label
                    key={f.id}
                    className={`opcion fila ${f.id === forma.id ? "activa" : ""}`}
                  >
                    <input
                      type="radio"
                      name="forma"
                      value={f.id}
                      checked={f.id === forma.id}
                      onChange={() => setFormaId(f.id)}
                    />
                    <span className="opcion-nombre">{f.nombre}</span>
                    {f.descuento > 0 && (
                      <span className="opcion-precio">
                        −{pct(f.descuento)} en el pago único
                      </span>
                    )}
                  </label>
                ))}
              </fieldset>

              <fieldset className="cotizador-grupo">
                <legend>5. Facturación</legend>
                <label className={`opcion fila ${factura ? "activa" : ""}`}>
                  <input
                    type="checkbox"
                    checked={factura}
                    onChange={(e) => setFactura(e.target.checked)}
                  />
                  <span className="opcion-nombre">
                    Necesito factura (se agrega {pct(IVA)} de IVA)
                  </span>
                </label>
              </fieldset>

              <fieldset className="cotizador-grupo">
                <legend>6. Tus datos</legend>
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
                {dinero.format(pagos[0].monto)}
                {mensual && `, más ${dinero.format(mensualidad)} al mes`}
              </p>
              <p className="resumen-categoria">{categoria.nombre}</p>
              <dl>
                <dt>Paquete {paquete.nombre}</dt>
                <dd>{dinero.format(paquete.precio)}</dd>
                {extrasElegidos.map((e) => (
                  <div key={e.id} className="resumen-extra">
                    <dt>{e.nombre}</dt>
                    <dd>{dinero.format(e.precio)}</dd>
                  </div>
                ))}
                {descuento > 0 && (
                  <>
                    <dt>Descuento de contado ({pct(forma.descuento)})</dt>
                    <dd className="descuento">−{dinero.format(descuento)}</dd>
                  </>
                )}
                {esWeb && !mensual && (
                  <>
                    <dt>Plan anual</dt>
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
                {pagos.map((p) => (
                  <div key={p.nombre} className="resumen-extra">
                    <dt>
                      {p.nombre} ({pct(p.pct)})
                    </dt>
                    <dd>{dinero.format(p.monto)}</dd>
                  </div>
                ))}
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
              <p className="resumen-entrega">
                <i className="bx bx-time-five" aria-hidden="true"></i> Entrega
                estimada: {paquete.entrega}
              </p>
              {categoria.nota && (
                <p className="metodos-pago">
                  <i className="bx bx-info-circle" aria-hidden="true"></i>{" "}
                  {categoria.nota}
                </p>
              )}
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
                  onClick={descargarPdf}
                  disabled={generandoPdf}
                  aria-busy={generandoPdf}
                >
                  <i className="bx bx-download" aria-hidden="true"></i>{" "}
                  {generandoPdf ? "Generando PDF…" : "Descargar PDF"}
                </Button>
              </div>
              {errorPdf && (
                <p className="campo-error" role="alert">
                  <i className="bx bx-error-circle" aria-hidden="true"></i> No se
                  pudo generar el PDF. Revisa tu conexión e inténtalo de nuevo.
                </p>
              )}
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
      </main>
      <Footer />
    </>
  );
}

export default CotizadorPage;
