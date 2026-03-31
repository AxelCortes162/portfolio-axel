import perfilImagen from '../assets/Perfil.jpg';

function Hero({name,title}){

  return(

    <section className="hero">

      <div className="hero-img">

        <img src={perfilImagen} alt="Perfil"/>

      </div>

      <div>

        <h3>Hola, soy</h3>

        <h1>{name}</h1>

        <p>{title}</p>

      </div>

    </section>

  )

}

export default Hero