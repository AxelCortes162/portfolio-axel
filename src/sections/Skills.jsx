import Card from "../components/Card"
import { skills } from "../data/info"

function Skills(){

  return(

    <Card title="Skills">

      <div className="skills">

        {skills.map(skill => (

          <span className="skill" key={skill}>

            {skill}

          </span>

        ))}

      </div>

    </Card>

  )

}

export default Skills