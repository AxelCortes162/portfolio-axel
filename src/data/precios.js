// Precios y textos del cotizador. Cambia aquí y se actualiza toda la página.

export const paquetes = [
  {
    id: "basico",
    nombre: "Básico",
    precio: 3500,
    incluye: [
      "Sitio de una página",
      "Diseño nuevo",
      "Adaptado a celular",
      "Botón de WhatsApp",
      "Formulario de contacto",
      "Certificado SSL",
      "SEO básico",
    ],
  },
  {
    id: "profesional",
    nombre: "Profesional",
    precio: 7500,
    incluye: [
      "Todo lo del Básico",
      "Hasta 6 secciones",
      "Fichas de productos",
      "Galería",
      "Formulario de cotización",
      "Google Search Console y Maps",
    ],
  },
  {
    id: "completo",
    nombre: "Completo",
    precio: 12000,
    incluye: [
      "Todo lo del Profesional",
      "Página por producto",
      "Fichas PDF",
      "Versión en inglés",
      "Google Analytics",
      "3 meses de cambios menores",
    ],
  },
];

// precio = pago anual; mensual = si el cliente lo paga mes a mes.
// mensual lleva ~12% de recargo sobre precio / 12 (cobrar 12 veces cuesta más).
// Mantenimiento: 12 h al año a ~$400/h + los $1,500 del hosting.
export const planesAnuales = [
  {
    id: "hosting",
    nombre: "Hosting + dominio + hasta 3 cuentas de correo",
    precio: 1500,
    mensual: 140,
  },
  {
    id: "mantenimiento",
    nombre:
      "Hosting, dominio y correo + 1 hora de cambios al mes (no acumulable)",
    precio: 6000,
    mensual: 560,
  },
];

// Se muestra al elegir "Sin plan anual" (en el cotizador y en el PDF)
export const NOTA_SIN_PLAN =
  "Tú contratas tu dominio y hosting a tu nombre (te ayudo a configurarlos). Incluye 30 días de garantía; los cambios posteriores se cobran por hora.";

// anticipo = parte del total que se paga al iniciar (el resto, a la entrega).
// descuento = se aplica solo al paquete (pago único), no al plan anual.
export const formasDePago = [
  {
    id: "anticipo",
    nombre: "50% al iniciar y 50% a la entrega",
    anticipo: 0.5,
    descuento: 0,
  },
  {
    id: "contado",
    nombre: "De contado: 100% al iniciar",
    anticipo: 1,
    descuento: 0.05,
  },
];

export const METODOS_DE_PAGO =
  "Transferencia SPEI, depósito en OXXO o tarjeta con link de pago.";

export const IVA = 0.16;
export const VIGENCIA_DIAS = 30;
