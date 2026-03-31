import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0f1a]/50 border-t border-white/10 mt-24">
      <div className="w-full px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-xl">
                AC
              </div>
              <span className="text-white font-bold text-2xl">Axel Cortes</span>
            </div>
            <p className="text-gray-500">
              Desarrollador Full Stack & Game Developer
            </p>
          </div>

          {/* Enlaces */}
          <div className="text-center">
            <h4 className="text-white font-bold text-lg mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-gray-500 hover:text-cyan-400">Inicio</a></li>
              <li><a href="#skills" className="text-gray-500 hover:text-cyan-400">Habilidades</a></li>
              <li><a href="#projects" className="text-gray-500 hover:text-cyan-400">Proyectos</a></li>
              <li><a href="#about" className="text-gray-500 hover:text-cyan-400">Sobre mí</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-right">
            <h4 className="text-white font-bold text-lg mb-4">Redes</h4>
            <div className="flex justify-end gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500/20">
                <FaGithub size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500/20">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-500/20">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 flex items-center justify-center gap-1">
            © 2026 Axel Cortes - Hecho con <FaHeart className="text-red-500" /> usando React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;