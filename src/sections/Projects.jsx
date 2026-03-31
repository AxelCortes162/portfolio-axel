import Card from "../components/Card"
import { projects } from "../data/info"

function Projects(){

  return(

    <Card title="Proyectos">

      <div className="projects">

        {projects.map(project => (

          <div className="project" key={project.name}>

            <h4>{project.name}</h4>

            <p>{project.desc}</p>

          </div>

        ))}

      </div>

    </Card>

  )

}

export default Projects