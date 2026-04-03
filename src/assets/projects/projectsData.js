// src/data/projectsData.js

// Importa las imágenes aquí cuando las tengas
// import img100Pies from '../assets/projects/100pies.jpg';
// import imgGoldStart from '../assets/projects/goldstart.jpg';
// import imgLorely from '../assets/projects/lorely.jpg';
// import imgCorazonVR from '../assets/projects/corazon_vr.jpg';

export const projectsData = [
  // --- VIDEOJUEGOS ---
  {
    id: 1,
    title: "100 Pies",
    category: "games",
    description: "Infinite runner para móvil. Un personaje sin una pierna corre por la ciudad esquivando obstáculos y usando power-ups creativos.",
    tags: ["Unity", "C#", "Mobile", "Play Store"],
    image: "https://via.placeholder.com/400x250?text=100+Pies", // img100Pies
    type: "link", // Abre enlace directo
    link: "https://play.google.com/store/apps/details?id=com.tuempresa.cienpies" // Reemplaza con el link real
  },
  {
    id: 2,
    title: "Gold Start 100",
    category: "games",
    description: "Juego tipo 'Suika Game' con mecánica de progresión histórica de balones mundiales. Manejo de colisiones y evolución de objetos.",
    tags: ["Unity", "C#", "Móvil", "Físicas"],
    image: "https://via.placeholder.com/400x250?text=Gold+Start", // imgGoldStart
    type: "link",
    link: "https://play.google.com/store/apps/details?id=com.tuempresa.goldstart" // Reemplaza con el link real
  },
  {
    id: 3,
    title: "Corazón Delator VR",
    category: "games",
    description: "Escape room inmersivo basado en el cuento de Edgar Allan Poe. Alta interactividad con objetos del entorno para resolver acertijos.",
    tags: ["VR", "Unity", "Oculus", "Interactividad", "Narrativa"],
    image: "https://via.placeholder.com/400x250?text=Corazon+VR", // imgCorazonVR
    type: "vr", // Abre la ventana emergente (Modal)
    // Detalles extra para el Modal:
    details: {
      mechanics: "Mecánica de 'Grab & Interact' con físicas. El usuario debe encontrar pistas visuales y auditivas para escapar.",
      devLog: "Desarrollado para eventos locales tematizados. Optimización de assets para mantener 72 FPS en Oculus Quest.",
      extraImages: [
        "https://via.placeholder.com/300x200?text=Escena+1", 
        "https://via.placeholder.com/300x200?text=Escena+2"
      ]
    }
  },
  {
    id: 4,
    title: "Leyendas Mexicanas VR",
    category: "games",
    description: "Recorrido narrativo inmersivo ('El Vampiro de Guadalajara' y 'La Casa de las Lágrimas') con locomoción física.",
    tags: ["VR", "Unity", "Locomotion", "Narrativa Visual", "Cultura"],
    image: "https://via.placeholder.com/400x250?text=Leyendas+VR",
    type: "vr",
    details: {
      mechanics: "Caminata física real para avanzar en el entorno virtual. Uso de audio 3D para la inmersión.",
      devLog: "Enfoque en la atmósfera y la iluminación para generar tensión. Pruebas de usuario para evitar *motion sickness*.",
      extraImages: []
    }
  },

  // --- WEB DEVELOPMENT ---
  {
    id: 5,
    title: "Lorely Fotos",
    category: "web",
    description: "Portafolio para fotógrafa deportiva con panel de administración para gestión de contenido.",
    tags: ["React", "Firebase", "CRUD", "Autenticación", "Vercel"],
    image: "https://via.placeholder.com/400x250?text=Lorely+Fotos", // imgLorely
    type: "link",
    link: "https://lorelyfotos.vercel.app/"
  },
  {
    id: 6,
    title: "Alura Flix",
    category: "web",
    description: "Plataforma tipo Netflix para organizar videos por categorías. Resúmenes y trailers.",
    tags: ["React", "HTML/CSS", "Consumo API", "Alura"],
    image: "https://via.placeholder.com/400x250?text=Alura+Flix",
    type: "link",
    link: "https://alura-flix-sepia.vercel.app/"
  }
];