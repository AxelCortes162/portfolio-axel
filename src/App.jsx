import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ParticlesBackground from "./components/ParticlesBackground"

import About from "./sections/About"
import Skills from "./sections/Skills"
import Education from "./sections/Education"
import Projects from "./sections/Projects"

import { personalInfo } from "./data/info"

import "./styles/main.css"

function App(){

  return(

    <div className="container">

      <ParticlesBackground />

      <Navbar/>

      <Hero
        name={personalInfo.name}
        title={personalInfo.title}
      />

      <div className="grid">

        <About/>
        <Skills/>
        <Education/>
        <Projects/>

      </div>

    </div>

  )

}

export default App