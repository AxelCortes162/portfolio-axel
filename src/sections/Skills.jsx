import "../styles/Skills.css";

const webSkills = [
  { name: "HTML5", icon: "bx bxl-html5" },
  { name: "CSS3", icon: "bx bxl-css3" },
  { name: "JavaScript", icon: "bx bxl-javascript" },
  { name: "React", icon: "bx bxl-react" },
  { name: "Vite", icon: "bx bxs-zap" },
  { name: "Supabase", icon: "bx bx-data" },
  { name: "Firebase", icon: "bx bxl-firebase" },
  { name: "APIs REST", icon: "bx bx-transfer-alt" },
];

const gameSkills = [
  { name: "C#", icon: "bx bx-code-alt" },
  { name: "Unity", icon: "bx bxl-unity" },
  { name: "VR Development", icon: "bx bx-joystick" },
  { name: "Meta XR SDK", icon: "bx bx-cube-alt" },
  { name: "Mobile Games", icon: "bx bx-mobile-alt" },
  { name: "Game Design", icon: "bx bx-game" },
];

const toolSkills = [
  { name: "Git", icon: "bx bxl-git" },
  { name: "GitHub", icon: "bx bxl-github" },
  { name: "Vercel", icon: "bx bx-cloud-upload" },
  { name: "Google Play Console", icon: "bx bxl-play-store" },
];

function SkillGroup({ title, skills }) {
  return (
    <div className="skills-category">
      <h3>{title}</h3>
      <div className="skills-list">
        {skills.map((skill) => (
          <span key={skill.name} className="skill-tag">
            <i className={`${skill.icon} skill-icon`} aria-hidden="true"></i>
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <h2>Habilidades Técnicas</h2>

      <div className="skills-container">
        <SkillGroup title="Web Development" skills={webSkills} />
        <SkillGroup title="Unity &amp; Game Dev" skills={gameSkills} />
        <SkillGroup title="Herramientas" skills={toolSkills} />
      </div>
    </section>
  );
}

export default Skills;
