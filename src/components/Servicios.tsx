import { useEffect, useRef } from 'react';
import { Scissors, Rat as Razor, Bean as Beard, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/animations.css';

const Servicios = () => {
  const navigate = useNavigate();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const section = bgRef.current.closest('.servicios-section');
        if (section) {
          const rect = section.getBoundingClientRect();
          const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          const moveX = Math.max(0, Math.min(20, scrollPercentage * 20));
          bgRef.current.style.transform = `translateX(-${moveX}%)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicios = [
    {
      icon: Scissors,
      title: "CORTE & ARREGLO DE BARBA",
      description: "Corte de cabello personalizado y perfilado de barba con las últimas técnicas y tendencias.",
      precio: 25,
      puntos: 10,
      duracion: "45 min"
    },
    {
      icon: Razor,
      title: "AFEITADO & CORTE",
      description: "Afeitado tradicional con navaja y toalla caliente, incluye corte de cabello profesional.",
      precio: 35,
      puntos: 15,
      duracion: "1h 15min"
    },
    {
      icon: Beard,
      title: "FACIAL & AFEITADO",
      description: "Tratamiento facial completo con limpieza profunda y afeitado tradicional.",
      precio: 40,
      puntos: 15,
      duracion: "1h"
    },
    {
      icon: Crown,
      title: "SERVICIO PREMIUM",
      description: "Experiencia completa que incluye corte, afeitado, facial y masaje capilar.",
      precio: 60,
      puntos: 25,
      duracion: "2h"
    }
  ];

  // Función para manejar la reserva de servicios
  const handleReservar = () => {
    const loginUrl = import.meta.env.VITE_LOGIN_URL; // Obtiene la URL de inicio de sesión desde las variables de entorno.
    if (loginUrl) {
      window.open(loginUrl, '_blank'); // Abre la URL en una nueva pestaña.
    } else {
      console.error('La URL de inicio de sesión no está definida en el archivo .env');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden servicios-section">
      {/* Imagen de fondo con efecto parallax */}
      <div 
        ref={bgRef}
        className="parallax-bg"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80")',
        }}
      >
        {/* Overlay para mejorar la legibilidad */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="text-center pt-20 mb-16">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-8 animate-fadeIn-delay-1">
            SERVICIOS
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {servicios.map((servicio, index) => (
              <div 
                key={index}
                className={`border border-amber-600/30 bg-black/50 backdrop-blur-sm p-6 rounded-lg
                  hover:border-amber-600 transition-all duration-300 group cursor-pointer
                  animate-fadeIn-delay-${index}`}
              >
                <div className="mb-4">
                  <servicio.icon className="h-10 w-10 text-amber-600 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-white text-lg md:text-xl font-bold mb-2">
                  {servicio.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {servicio.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Duración:</span>
                    <span className="text-white">{servicio.duracion}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Puntos:</span>
                    <span className="text-amber-600">{servicio.puntos} pts</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-amber-600/20">
                    <span className="text-amber-600 font-bold text-lg">
                      ${servicio.precio}
                    </span>
                    <button 
                      onClick={handleReservar} // Usa la función handleReservar para abrir la URL de inicio de sesión
                      className="px-3 py-1.5 border border-amber-600 text-amber-600 rounded
                        hover:bg-amber-600 hover:text-white transition-colors text-sm"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 mb-12 text-center">
            <button 
              onClick={() => navigate('/servicios')}
              className="inline-block px-8 py-3 bg-amber-600 text-white rounded-md 
                hover:bg-amber-700 transition-colors text-lg font-medium"
            >
              Ver Todos los Servicios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;