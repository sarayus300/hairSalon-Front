import React, { useState, useEffect } from 'react';
import { Menu, X, Scissors } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar la apertura del menú móvil
  const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad del header al hacer scroll
  const [hasScrolled, setHasScrolled] = useState(false); // Estado para cambiar el estilo del header cuando se hace scroll
  const [lastScrollY, setLastScrollY] = useState(0); // Estado para rastrear la última posición del scroll
  const navigate = useNavigate();
  const location = useLocation();

  // Efecto para manejar el comportamiento del header al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Actualizar la visibilidad del header según la dirección del scroll
      if (currentScrollY < lastScrollY) {
        setIsVisible(true); // Mostrar el header si el scroll es hacia arriba
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Ocultar el header si el scroll es hacia abajo
      }

      // Cambiar el estilo del header si se ha hecho scroll más de 50px
      if (currentScrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }

      setLastScrollY(currentScrollY); // Actualizar la última posición del scroll
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Función para manejar el clic en los enlaces de navegación
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Cerrar el menú móvil al hacer clic en un enlace

    if (path === 'inicio') {
      navigate('/'); // Navegar a la página de inicio
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave al inicio de la página
      }, 100);
    } else if (path === 'servicios') {
      navigate('/servicios'); // Navegar a la página de servicios
    } else if (path === 'productos') {
      navigate('/productos'); // Navegar a la página de productos
    } else if (path === 'blog') {
      navigate('/blog'); // Navegar a la página del blog
    } else if (path === 'sobre-mi') {
      // Si estamos en la página de inicio, hacer scroll suave a la sección "Sobre Mi"
      if (location.pathname === '/') {
        const element = document.getElementById('sobre-mi');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Si no estamos en la página de inicio, navegar a la página de inicio y luego hacer scroll
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById('sobre-mi');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    const loginUrl = import.meta.env.VITE_LOGIN_URL; // Obtiene la URL de inicio de sesión desde las variables de entorno.
    if (loginUrl) {
      window.open(loginUrl, '_blank'); // Abre la URL en una nueva pestaña.
    } else {
      console.error('La URL de inicio de sesión no está definida en el archivo .env');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        ${hasScrolled ? 'bg-black/85 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Scissors className="h-8 w-8 text-amber-600" />
            <span className="ml-2 text-xl font-bold text-white">BARBER</span>
          </Link>

          {/* Navegación para escritorio */}
          <nav className="hidden md:flex space-x-8">
            {[
              { name: 'Inicio', path: 'inicio' },
              { name: 'Servicios', path: 'servicios' },
              { name: 'Productos', path: 'productos' },
              { name: 'Sobre Mi', path: 'sobre-mi' },
              { name: 'Blog', path: 'blog' },
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.path}`}
                onClick={(e) => handleNavClick(e, item.path)}
                className="text-white hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Botón de Iniciar Sesión */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogin} // Usa la función handleLogin para abrir la URL de inicio de sesión
              className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-amber-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navegación móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div
            className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
              hasScrolled ? 'bg-black/90' : 'bg-black/80'
            } backdrop-blur-sm`}
          >
            {[
              { name: 'Inicio', path: 'inicio' },
              { name: 'Servicios', path: 'servicios' },
              { name: 'Productos', path: 'productos' },
              { name: 'Sobre Mi', path: 'sobre-mi' },
              { name: 'Blog', path: 'blog' },
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.path}`}
                onClick={(e) => handleNavClick(e, item.path)}
                className="text-white hover:text-amber-600 block px-3 py-2 text-base font-medium cursor-pointer"
              >
                {item.name}
              </a>
            ))}
            {/* Botón de Iniciar Sesión en el menú móvil */}
            <button
              onClick={handleLogin} // Usa la función handleLogin para abrir la URL de inicio de sesión
              className="w-full bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors mt-4"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;