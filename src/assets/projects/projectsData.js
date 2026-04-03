import video100Pies from "../videos/100pies-preview.mp4";
import imagen100Pies from "../100pies-preview.webp"; 
import videoGoldStar from "../videos/goldstar-preview.mp4";
import imagenGoldStar from "../goldstar-preview.webp";
// Importa tus nuevos videos de VR aquí:
// import videoCorazon from "../videos/corazon-delator.mp4";
// import videoLeyendas from "../videos/leyendas-vr.mp4";

import imagenCorazonVR from "../corazon-delator.webp";
import imagenLeyendasVR from "../casa-lagrimas.jpg";
import lorelyfotos from "../loryfotos.png";
import aluraFlix from "../aluraflix.png";

export const projectsData = [
  {
    id: 1,
    title: "100 Pies",
    category: "games",
    description: "Infinite runner para móvil. Un personaje sin una pierna corre por la ciudad esquivando obstáculos y usando power-ups creativos.",
    tags: ["Unity", "C#", "Mobile", "Play Store"],
    format: "vertical", 
    videoPreview: video100Pies, 
    image: imagen100Pies,
    type: "link",
    link: "https://play.google.com/store/apps/details?id=com.myrockstartwin.cienpies100&hl=es_MX"
  },
  {
    id: 2,
    title: "Gold Start 100",
    category: "games",
    description: "Juego tipo 'Suika Game' con temática futbolera. Gestión de físicas, colisiones y evolución de objetos por tamaño.",
    tags: ["Unity", "C#", "Físicas", "Mobile"],
    format: "vertical",
    videoPreview: videoGoldStar,
    image: imagenGoldStar,
    type: "link",
    link: "https://play.google.com/store/apps/details?id=com.myrockstartwin.GoldStart100&hl=es_MX"
  },
  {
    id: 3,
    title: "Corazón Delator VR",
    category: "games",
    description: "Escape room basado en el cuento de Edgar Allan Poe. Interacción avanzada con objetos y atmósfera de suspenso inmersiva.",
    tags: ["VR", "Oculus Quest", "Unity", "Interactividad"],
    format: "horizontal",
    videoPreview: null, // Asigna videoCorazon cuando lo tengas
    image: imagenCorazonVR,
    type: "vr",
    details: {
      mechanics: "Sistema de agarre de objetos (Grab & Throw), puzzles basados en audio 3D y narrativa emergente.",
      devLog: "Optimización de polígonos para VR móvil y horneado de luces para mantener 72 FPS estables.",
      extraImages: []
    }
  },
  {
    id: 4,
    title: "Leyendas Mexicanas VR",
    category: "games",
    description: "Recorrido narrativo inmersivo ('El Vampiro de Guadalajara' y 'La Casa de las Lágrimas') con locomoción física.",
    tags: ["VR", "Unity", "Meta SDK", "Locomotion"],
    format: "horizontal",
    videoPreview: null, // Asigna videoLeyendas cuando lo tengas
    image: imagenLeyendasVR,
    type: "vr",
    details: {
      mechanics: "Caminata física real para avanzar en el entorno virtual. Uso de audio 3D.",
      devLog: "Enfoque en la atmósfera e iluminación. Pruebas para evitar motion sickness.",
      extraImages: []
    }
  },
  {
    id: 5,
    title: "Lorely Fotos",
    category: "web",
    description: "Portafolio para fotógrafa deportiva con panel de administración para gestión de contenido.",
    tags: ["React", "Firebase", "CRUD", "Autenticación", "Vercel"],
    format: "horizontal",
    image: lorelyfotos,
    type: "link",
    link: "https://lorelyfotos.vercel.app/"
  },
  {
    id: 6,
    title: "Alura Flix",
    category: "web",
    description: "Plataforma estilo Netflix para organizar videos por categorías, con modales y trailers dinámicos.",
    tags: ["React", "CSS Modules", "API Rest", "Frontend"],
    format: "horizontal",
    image: aluraFlix,
    type: "link",
    link: "https://alura-flix-sepia.vercel.app/"
  }
];