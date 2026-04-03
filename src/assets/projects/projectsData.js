import video100Pies from "../videos/100pies-preview.mp4";
import imagen100Pies from "../100pies-preview.webp"; 
import videoGoldStar from "../videos/goldstar-preview.mp4";
import imagenGoldStar from "../goldstar-preview.webp";
import imagenCorazonVR from "../corazon-delator.webp";
import imagenLeyendasVR from "../casa-lagrimas.jpg";
import lorelyfotos from "../loryfotos.png";
import aluraFlix from "../aluraflix.png";

// src/assets/projects/projectsData.js
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
    description: "Juego tipo 'Suika Game' con temática futbolera donde los balones evolucionan al chocar entre sí.",
    tags: ["Unity", "C#", "Mobile", "Físicas"],
    format: "vertical", // <--- Ahora también es vertical
    videoPreview: videoGoldStar, 
    image: imagenGoldStar,
    type: "link",
    link: "https://play.google.com/store/apps/details?id=com.MRTSTUDIO.Balls&hl=es_MX"
  },
  {
    id: 3,
    title: "Corazón Delator VR",
    category: "games",
    description: "Escape room inmersivo basado en el cuento de Edgar Allan Poe.",
    tags: ["VR", "Unity", "Meta SDK", "C#", "Oculus Quest"],
    format: "horizontal",
    image: imagenCorazonVR,
    type: "vr",
    details: {
      mechanics: "Mecánica de 'Grab & Interact' con físicas de objetos y puzzles.",
      devLog: "Optimización de assets y renderizado para mantener 72 FPS estables.",
      extraImages: ["Escena+1", "Escena+2"]
    }
  },
  {
    id: 4,
    title: "Leyendas Mexicanas VR",
    category: "games",
    description: "Recorrido narrativo inmersivo ('El Vampiro de Guadalajara' y 'La Casa de las Lágrimas') con locomoción física.",
    tags: ["VR", "Unity", "Meta SDK", "Locomotion"],
    format: "horizontal",
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
  description: "Plataforma estilo Netflix para organizar videos por categorías. Permite agregar, editar y eliminar contenido mediante un formulario interactivo.",
  tags: ["React", "Styled Components", "API Rest", "JavaScript"],
  format: "horizontal", 
  image: aluraFlix, // Aquí va tu captura de pantalla
  type: "link",
  link: "https://alura-flix-self.vercel.app/" // Tu enlace de Vercel
},
];