import Card from "../components/Card"
import { personalInfo } from "../data/info"

function About(){

  return(

    <Card title="Sobre mí">

      <p>{personalInfo.description}</p>

    </Card>

  )

}

export default About