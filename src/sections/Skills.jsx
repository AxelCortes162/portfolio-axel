import { motion as Motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import { trackPointer } from "@/lib/utils";

const tarjeta = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const chip = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 22 } },
};

const grupos = [
  {
    titulo: "Web Development",
    skills: [
      { name: "HTML5", icon: "bx bxl-html5" },
      { name: "CSS3", icon: "bx bxl-css3" },
      { name: "JavaScript", icon: "bx bxl-javascript" },
      { name: "React", icon: "bx bxl-react" },
      { name: "Vite", icon: "bx bxs-zap" },
      { name: "Supabase", icon: "bx bx-data" },
      { name: "Firebase", icon: "bx bxl-firebase" },
      { name: "APIs REST", icon: "bx bx-transfer-alt" },
    ],
  },
  {
    titulo: "Unity & Game Dev",
    skills: [
      { name: "C#", icon: "bx bx-code-alt" },
      { name: "Unity", icon: "bx bxl-unity" },
      { name: "VR Development", icon: "bx bx-joystick" },
      { name: "Meta XR SDK", icon: "bx bx-cube-alt" },
      { name: "Mobile Games", icon: "bx bx-mobile-alt" },
      { name: "Game Design", icon: "bx bx-game" },
    ],
  },
  {
    titulo: "Herramientas",
    skills: [
      { name: "Git", icon: "bx bxl-git" },
      { name: "GitHub", icon: "bx bxl-github" },
      { name: "Vercel", icon: "bx bx-cloud-upload" },
      { name: "Google Play Console", icon: "bx bxl-play-store" },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-16">
      <SectionTitle>
        Habilidades <span>Técnicas</span>
      </SectionTitle>

      {/* flex-wrap: si una tarjeta queda sola en su fila, ocupa todo el ancho */}
      <Motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        className="mx-auto flex max-w-6xl flex-wrap gap-6"
      >
        {grupos.map((grupo) => (
          <Motion.div
            key={grupo.titulo}
            variants={tarjeta}
            onMouseMove={trackPointer}
            className="spotlight relative flex-[1_1_300px] overflow-hidden rounded-3xl border border-primary/10 bg-card p-8 text-center backdrop-blur-md transition-[border-color,box-shadow] duration-300 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-linear-to-r before:from-transparent before:via-primary before:to-transparent before:opacity-50 hover:border-primary/40 hover:shadow-[0_0_40px_rgb(0_255_213/0.08)] max-sm:p-6"
          >
            <h3 className="mb-6 font-display text-xl font-semibold tracking-wide">
              {grupo.titulo}
            </h3>
            <Motion.ul
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
              className="flex flex-wrap justify-center gap-3"
            >
              {grupo.skills.map((skill) => (
                <Motion.li
                  key={skill.name}
                  variants={chip}
                  className="group flex items-center gap-2.5 rounded-xl border border-white/5 bg-primary/[0.03] px-4 py-2.5 text-sm font-medium text-slate-200 transition-[border-color,background-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_6px_20px_rgb(0_255_213/0.15)]"
                >
                  <i
                    className={`${skill.icon} text-xl text-primary transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12`}
                    aria-hidden="true"
                  ></i>
                  {skill.name}
                </Motion.li>
              ))}
            </Motion.ul>
          </Motion.div>
        ))}
      </Motion.div>
    </section>
  );
}

export default Skills;
