import { useEffect, useRef } from 'react';
import { Scissors, Star, Users, Clock } from 'lucide-react';
import '../styles/about.css';

const SobreMi = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const borderRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animatedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Parallax effect
      if (bgRef.current) {
        const section = bgRef.current.closest('.sobre-mi-section');
        if (section) {
          const rect = section.getBoundingClientRect();
          const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          const moveX = Math.max(0, Math.min(20, scrollPercentage * 20));
          bgRef.current.style.transform = `translateX(-${moveX}%)`;
        }
      }

      // Animate elements when they come into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            // Animate stats cards
            statsRef.current.forEach((card) => {
              card?.classList.add('animate');
            });

            // Animate reserve button
            buttonRef.current?.classList.add('animate');

            // Animate border
            if (svgRef.current && borderRef.current) {
              svgRef.current.classList.add('animate');
              borderRef.current.classList.add('animate');
            }

            animatedRef.current = true;
          } else if (!entry.isIntersecting) {
            // Reset animations when section is out of view
            statsRef.current.forEach((card) => {
              card?.classList.remove('animate');
            });
            buttonRef.current?.classList.remove('animate');
            if (svgRef.current && borderRef.current) {
              svgRef.current.classList.remove('animate');
              borderRef.current.classList.remove('animate');
            }
            animatedRef.current = false;
          }
        });
      }, {
        threshold: 0.2
      });

      const section = document.querySelector('.sobre-mi-section');
      if (section) {
        observer.observe(section);
      }

      return () => observer.disconnect();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para manejar la reserva de citas
  const handleReservarCita = () => {
    const loginUrl = import.meta.env.VITE_LOGIN_URL; // Obtiene la URL de inicio de sesión desde las variables de entorno.
    if (loginUrl) {
      window.open(loginUrl, '_blank'); // Abre la URL en una nueva pestaña.
    } else {
      console.error('La URL de inicio de sesión no está definida en el archivo .env');
    }
  };

  const stats = [
    {
      icon: Star,
      value: "15+",
      label: "Años de Experiencia"
    },
    {
      icon: Users,
      value: "10k+",
      label: "Clientes Satisfechos"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Atención Personalizada"
    }
  ];

  return (
    <div id="sobre-mi" className="relative min-h-screen overflow-hidden sobre-mi-section">
      {/* Fondo con efecto parallax */}
      <div 
        ref={bgRef}
        className="absolute w-[120%] h-full right-[-20%] bg-no-repeat bg-cover bg-center transition-transform duration-100 will-change-transform"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1512690459411-b9245aed614b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 min-h-screen py-20">
        <div className="text-center mb-8 md:mb-16 px-4">
          <h2 className="text-amber-600 text-lg md:text-xl font-medium mb-2 md:mb-4">
            CONÓCEME
          </h2>
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-wider">
            SOBRE MÍ
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Imagen y decoración */}
            <div className="relative mx-auto md:mx-0 w-full max-w-md">
              <div className="aspect-[3/4] rounded-lg overflow-hidden image-container">
                <img 
                  src="https://cdn.pixabay.com/photo/2022/01/24/20/03/salon-6964546_1280.jpg"
                  alt="Maestro Barbero"
                  className="w-full h-full object-cover"
                />
                <svg ref={svgRef} className="border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path 
                    ref={borderRef}
                    className="border-path"
                    d="M 0,0 L 100,0 L 100,100 L 0,100 L 0,0"
                    style={{ strokeWidth: '2' }} // Reducido de 4 a 2
                  />
                </svg>
              </div>
              {/* Logo decorativo */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black p-4 rounded-full border-4 border-amber-600">
                <Scissors className="h-6 w-6 md:h-8 md:w-8 text-amber-600" />
              </div>
            </div>

            {/* Contenido */}
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Carlos Rodríguez
              </h3>
              <p className="text-amber-600 font-medium">
                Maestro Barbero & Estilista Profesional
              </p>
              <div className="space-y-3 md:space-y-4 text-gray-300 text-sm md:text-base">
                <p>
                  Con más de 15 años de experiencia en el arte del corte y estilo, he dedicado mi vida a perfeccionar el oficio de la barbería tradicional mientras me mantengo al día con las últimas tendencias.
                </p>
                <p>
                  Mi pasión por este arte comenzó desde muy joven, y desde entonces he tenido el privilegio de trabajar con miles de clientes, ayudándoles a encontrar su estilo único y potenciar su imagen personal.
                </p>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 md:mt-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    ref={el => statsRef.current[index] = el}
                    className="stat-card text-center p-3 md:p-4 border border-amber-600/30 rounded-lg bg-black/30 backdrop-blur-sm"
                  >
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button 
                ref={buttonRef}
                onClick={handleReservarCita} // Usa la función handleReservarCita para abrir la URL de inicio de sesión
                className="reserve-button mt-6 md:mt-8 px-6 md:px-8 py-2.5 md:py-3 bg-amber-600 text-white rounded-md 
                  hover:bg-amber-700 transition-colors text-base md:text-lg font-medium w-full md:w-auto"
              >
                Reserva tu Cita
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreMi;