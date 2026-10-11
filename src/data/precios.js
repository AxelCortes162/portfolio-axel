// Precios y textos del cotizador. Cambia aquí y se actualiza la página,
// el PDF y el mensaje de WhatsApp. Redactado para clientes sin conocimientos técnicos.
//
// Referencia de precios: ~$250/h, tarifa de desarrollador junior (sin título aún),
// por debajo del mercado freelance MX ($400-600/h). Juegos y VR como precio base
// (se confirman en una llamada).

export const HORA_EXTRA = 250; // MXN por hora de cambios fuera de plan

// ---------- Categorías (qué necesita el cliente) ----------
// incluye = aplica a todos los paquetes de la categoría (se muestra bajo las tarjetas y va al PDF).
// nota = aviso general de la categoría (precio base, etc.). Opcional.
export const categorias = [
  {
    id: "web",
    nombre: "Página web",
    icono: "bx bx-globe",
    descripcion: "Para que tu negocio aparezca en internet y te contacten.",
    incluye: [
      "Tú entregas logo, textos y fotos; si no tienes textos, te ayudo a redactarlos",
      "Hasta 2 rondas de cambios durante el diseño",
      `30 días de garantía después de la entrega: se corrigen errores sin costo. Los cambios nuevos se cobran a ${HORA_EXTRA} pesos la hora o con el plan de mantenimiento`,
    ],
  },
  {
    id: "juego",
    nombre: "Juego o app para celular",
    icono: "bx bx-mobile-alt",
    descripcion:
      "Hecho en Unity y publicado en Google Play (y App Store si lo necesitas).",
    incluye: [
      "Tú entregas la idea y referencias; el arte y los sonidos básicos van incluidos salvo que se indique lo contrario",
      "Hasta 2 rondas de cambios por etapa (diseño, prototipo y versión final)",
      "El proyecto de Unity y el código son tuyos al liquidar",
      `30 días de garantía después del lanzamiento: se corrigen errores sin costo. Cambios nuevos a ${HORA_EXTRA} pesos la hora`,
    ],
    nota: "Precio base. Lo confirmamos en una llamada de 20 minutos después de revisar tu idea; si el alcance es mayor, te lo digo antes de empezar.",
  },
  {
    id: "vr",
    nombre: "Experiencia de realidad virtual",
    icono: "bx bx-cube-alt",
    descripcion:
      "Para visores Meta Quest: recorridos, escape rooms y simuladores de capacitación.",
    incluye: [
      "Tú entregas planos, fotos, logos y un guion de lo que debe pasar; si no tienes guion, lo armamos juntos",
      "Hasta 2 rondas de cambios por etapa (diseño, prototipo y versión final)",
      "Funciona en Meta Quest 2 y 3 sin cables ni computadora; los visores no están incluidos",
      `30 días de garantía después de la entrega: se corrigen errores sin costo. Cambios nuevos a ${HORA_EXTRA} pesos la hora`,
    ],
    nota: "Precio base. Lo confirmamos en una llamada de 20 minutos después de revisar tu proyecto; si el alcance es mayor, te lo digo antes de empezar.",
  },
];

// ---------- Paquetes (pago único) ----------
// Ordenados del más sencillo al más completo dentro de cada categoría (el primero sale seleccionado).
// resumen = una línea para que el cliente sepa si es para él.
// entrega = tiempo estimado a partir de recibir el material del cliente.
// nota = límite o aclaración del paquete. Opcional.
export const paquetes = [
  // ----- Página web -----
  {
    id: "tarjeta",
    categoria: "web",
    nombre: "Tarjeta digital",
    resumen:
      "Una sola pantalla con tus datos y botones de contacto. Para que te encuentren y te escriban.",
    precio: 1000,
    entrega: "3 días hábiles",
    incluye: [
      "Una sola pantalla, sin secciones",
      "Logo, foto y descripción corta",
      "Botones a WhatsApp, llamada y redes sociales",
      "Ubicación en Google Maps y horario",
      "Se ve bien en celular",
      "Sitio seguro con candado (SSL)",
    ],
  },
  {
    id: "esencial",
    categoria: "web",
    nombre: "Esencial",
    resumen: "Página completa para presentar tu negocio y que te contacten.",
    precio: 3000,
    entrega: "1 a 2 semanas",
    incluye: [
      "Hasta 4 secciones: inicio, servicios, nosotros y contacto",
      "Diseño a la medida de tu negocio",
      "Se ve bien en celular y computadora",
      "Botón de WhatsApp",
      "Formulario de contacto que llega a tu correo",
      "Sitio seguro con candado (SSL)",
      "Preparado para aparecer en Google (SEO básico)",
    ],
  },
  {
    id: "negocio",
    categoria: "web",
    nombre: "Negocio",
    resumen: "Para mostrar tu trabajo con fotos y recibir cotizaciones.",
    precio: 5000,
    entrega: "2 a 3 semanas",
    incluye: [
      "Todo lo del Esencial",
      "Hasta 6 secciones",
      "Galería de fotos",
      "Formulario de cotización",
      "Mapa de Google con tu ubicación",
      "Registro en Google para que te encuentren (Search Console)",
      "Estadísticas de visitas (Google Analytics)",
    ],
  },
  {
    id: "catalogo",
    categoria: "web",
    nombre: "Catálogo",
    resumen:
      "Para vender por WhatsApp: tus productos con foto, precio y botón de pedido.",
    precio: 7500,
    entrega: "3 a 4 semanas",
    incluye: [
      "Todo lo del Negocio",
      "Catálogo con hasta 30 productos (foto, descripción y precio)",
      "Una página por producto",
      "Botón “Pedir por WhatsApp” que ya lleva el nombre del producto",
      "Ficha PDF descargable por producto",
    ],
    nota: "Más de 30 productos se cotizan aparte. Agregar o cambiar productos después de la entrega: por hora o con el plan de mantenimiento.",
  },

  // ----- Juego o app para celular -----
  {
    id: "prototipo",
    categoria: "juego",
    nombre: "Prototipo jugable",
    resumen: "Para probar tu idea en un celular antes de invertir en el juego completo.",
    precio: 7500,
    entrega: "2 a 3 semanas",
    incluye: [
      "Una mecánica principal que ya se puede jugar",
      "Un nivel o escenario de prueba",
      "Arte provisional o el que tú entregues",
      "Instalable para Android (APK) para probarlo en tu celular",
      "Documento corto con el diseño del juego para seguir adelante",
    ],
    nota: "Si después haces el juego completo conmigo, el prototipo se descuenta del precio.",
  },
  {
    id: "casual",
    categoria: "juego",
    nombre: "Juego casual",
    resumen: "Juego completo y sencillo, publicado en Google Play.",
    precio: 20000,
    entrega: "6 a 8 semanas",
    incluye: [
      "Una mecánica principal pulida (tipo runner, puzzle o arcade)",
      "Niveles infinitos o hasta 10 niveles diseñados",
      "Menús, pausa, puntuación y récord",
      "Sonidos y música libres de derechos",
      "Arte 2D sencillo incluido, o integro el que tú entregues",
      "Optimizado para celulares de gama baja",
      "Publicación en Google Play",
    ],
    nota: "La cuenta de desarrollador de Google Play (25 USD, un solo pago) va a tu nombre y la pagas tú.",
  },
  {
    id: "completo",
    categoria: "juego",
    nombre: "Juego completo",
    resumen:
      "Varias mecánicas, progresión y monetización. Un producto listo para crecer.",
    precio: 45000,
    entrega: "3 a 4 meses",
    incluye: [
      "Todo lo del Juego casual",
      "Hasta 3 mecánicas y progresión (niveles, desbloqueos, mejoras)",
      "Guardado del progreso del jugador",
      "Anuncios y compras dentro del juego",
      "Tabla de puntuaciones en línea",
      "Publicación en Google Play y App Store",
      "1 mes de correcciones después del lanzamiento",
    ],
    nota: "Las cuentas de desarrollador (Google Play 25 USD una vez; App Store 99 USD al año) van a tu nombre y las pagas tú.",
  },

  // ----- Realidad virtual -----
  {
    id: "recorrido",
    categoria: "vr",
    nombre: "Recorrido virtual",
    resumen: "Un espacio en 3D para recorrer: local, showroom, museo o casa muestra.",
    precio: 12000,
    entrega: "4 a 6 semanas",
    incluye: [
      "Un espacio o escenario",
      "Caminar y teletransportarse de forma cómoda (sin mareo)",
      "Puntos de información con texto, imagen o audio",
      "Iluminación y ambiente cuidados",
      "Instalable directo en tus visores (archivo APK)",
    ],
    nota: "Necesito planos, fotos o modelos 3D del espacio. Si no los tienes, agrega el extra de modelado 3D.",
  },
  {
    id: "interactiva",
    categoria: "vr",
    nombre: "Experiencia interactiva",
    resumen:
      "Escape room, juego o experiencia de marca: el usuario toca, agarra y resuelve.",
    precio: 30000,
    entrega: "8 a 10 semanas",
    incluye: [
      "Todo lo del Recorrido virtual",
      "Hasta 3 escenarios",
      "Agarrar, soltar y usar objetos con las manos o los controles",
      "Retos o acertijos con inicio, desarrollo y final",
      "Narración con audio 3D (voz, efectos y música)",
      "Hasta 15 minutos de experiencia",
      "Pruebas con usuarios para evitar mareo",
    ],
  },
  {
    id: "simulador",
    categoria: "vr",
    nombre: "Simulador de capacitación",
    resumen:
      "Para entrenar a tu personal sin riesgos: un procedimiento paso a paso con evaluación.",
    precio: 60000,
    entrega: "3 a 4 meses",
    incluye: [
      "Todo lo de la Experiencia interactiva",
      "Un procedimiento o puesto de trabajo con pasos guiados",
      "Modo práctica y modo evaluación con calificación",
      "Reporte de resultados por usuario (exportable)",
      "Manual de uso y capacitación de 2 horas para tu equipo",
      "3 meses de ajustes después de la entrega",
    ],
    nota: "Precio base para un procedimiento. Cada procedimiento adicional se cotiza aparte.",
  },
];

// ---------- Extras (pago único, opcionales; juego y VR) ----------
// incluidoEn = paquetes que ya lo traen (se muestra como "incluido" y no se cobra).
export const extras = [
  // Juego
  {
    id: "appstore",
    categoria: "juego",
    nombre: "Publicación en App Store (iPhone)",
    descripcion: "Versión para iPhone y publicación. La cuenta de Apple (99 USD al año) va a tu nombre.",
    precio: 3500,
    incluidoEn: ["completo"],
  },
  {
    id: "anuncios",
    categoria: "juego",
    nombre: "Anuncios para ganar dinero con el juego",
    descripcion: "Anuncios de video y banners (Google AdMob) con la cuenta a tu nombre.",
    precio: 2500,
    incluidoEn: ["completo"],
  },
  {
    id: "compras",
    categoria: "juego",
    nombre: "Compras dentro del juego",
    descripcion: "Quitar anuncios, monedas o niveles de pago en Google Play.",
    precio: 3500,
    incluidoEn: ["completo"],
  },
  {
    id: "ranking",
    categoria: "juego",
    nombre: "Tabla de puntuaciones en línea",
    descripcion: "Los jugadores compiten por el récord con otros jugadores.",
    precio: 3000,
    incluidoEn: ["completo"],
  },
  {
    id: "soporte-juego",
    categoria: "juego",
    nombre: "3 meses de actualizaciones después del lanzamiento",
    descripcion: "Corrección de errores, ajustes de dificultad y compatibilidad con celulares nuevos.",
    precio: 5000,
    incluidoEn: [],
  },
  // VR
  {
    id: "modelado",
    categoria: "vr",
    nombre: "Modelado 3D de tu espacio o producto",
    descripcion: "A partir de planos, fotos y medidas. Hasta un espacio o producto; más se cotizan aparte.",
    precio: 8000,
    incluidoEn: [],
  },
  {
    id: "audio",
    categoria: "vr",
    nombre: "Narración con voz profesional",
    descripcion: "Locución grabada en estudio, hasta 10 minutos de guion.",
    precio: 4000,
    incluidoEn: [],
  },
  {
    id: "pcvr",
    categoria: "vr",
    nombre: "Versión para computadora (PC VR)",
    descripcion: "Para visores conectados a PC (SteamVR), con mejores gráficos.",
    precio: 5000,
    incluidoEn: [],
  },
  {
    id: "evento",
    categoria: "vr",
    nombre: "Acompañamiento en tu evento (1 día)",
    descripcion: "Instalo, atiendo a los asistentes y resuelvo problemas en sitio, en CDMX y área metropolitana. No incluye renta de visores.",
    precio: 2500,
    incluidoEn: [],
  },
  {
    id: "capacitacion",
    categoria: "vr",
    nombre: "Capacitación para tu equipo (2 horas)",
    descripcion: "Cómo instalar, iniciar y limpiar los visores, y resolver lo más común.",
    precio: 1500,
    incluidoEn: ["simulador"],
  },
];

// ---------- Plan anual (solo página web) ----------
// precio = pago anual; mensual = si el cliente lo paga mes a mes (12 pagos).
// mensual lleva ~12% de recargo sobre precio / 12 (cobrar 12 veces cuesta más).
// Mantenimiento: 12 h al año a ~$250/h + los $1,500 del plan básico.
// Costo real aprox.: dominio .com $300-400 + hosting con correo $700-1,100.
export const planesAnuales = [
  {
    id: "hosting",
    nombre: "Tu página en internet",
    descripcion:
      "Dominio .com, hospedaje y hasta 3 cuentas de correo con tu nombre (hola@tunegocio.com). Dominio .mx o .com.mx se cotiza aparte.",
    precio: 1500,
    mensual: 140,
  },
  {
    id: "mantenimiento",
    nombre: "Tu página en internet + 1 hora de cambios al mes",
    descripcion: `Dominio .com, hospedaje y hasta 3 cuentas de correo, más una hora al mes para cambiar textos, fotos o productos (no acumulable). Horas extra: ${HORA_EXTRA} pesos.`,
    precio: 4500,
    mensual: 420,
  },
];

// Se muestra al elegir "Sin plan anual" (cotizador, PDF y WhatsApp).
export const NOTA_SIN_PLAN = `El dominio (tu dirección .com) y el hospedaje (donde vive la página) se contratan a nombre del cliente; incluye ayuda para configurarlos. Después de la garantía, los cambios se cobran a ${HORA_EXTRA} pesos la hora.`;

// ---------- Formas de pago ----------
// partes = en cuántos pagos se divide el total (los porcentajes suman 1).
// descuento = se aplica solo al pago único (paquete + extras), no al plan anual.
// minimo = solo se ofrece si el pago único llega a esa cantidad (proyectos largos).
export const formasDePago = [
  {
    id: "mitad",
    nombre: "50% al iniciar y 50% a la entrega",
    partes: [
      { nombre: "Al iniciar", pct: 0.5 },
      { nombre: "A la entrega", pct: 0.5 },
    ],
    descuento: 0,
  },
  {
    id: "tres",
    nombre: "En 3 pagos: 40% al iniciar, 30% a mitad del proyecto y 30% a la entrega",
    partes: [
      { nombre: "Al iniciar", pct: 0.4 },
      { nombre: "A mitad del proyecto", pct: 0.3 },
      { nombre: "A la entrega", pct: 0.3 },
    ],
    descuento: 0,
    minimo: 15000,
  },
  {
    id: "contado",
    nombre: "De contado: 100% al iniciar",
    partes: [{ nombre: "Al iniciar", pct: 1 }],
    descuento: 0.05,
  },
];

export const METODOS_DE_PAGO =
  "Transferencia SPEI, depósito en OXXO o tarjeta con link de pago.";

export const IVA = 0.16;
export const VIGENCIA_DIAS = 30;
