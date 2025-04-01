import { useEffect, useRef } from 'react';
import { Calendar, Gift, Trophy, Scissors } from 'lucide-react';
import '../styles/registro.css';

const Registro = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const section = bgRef.current.closest('.registro-section');
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

  // Función para manejar el registro
  const handleRegistro = () => {
    const registerUrl = import.meta.env.VITE_REGISTER_URL; // Obtiene la URL de registro desde las variables de entorno.
    if (registerUrl) {
      window.open(registerUrl, '_blank'); // Abre la URL en una nueva pestaña.
    } else {
      console.error('La URL de registro no está definida en el archivo .env');
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

  const benefits = [
    {
      icon: Calendar,
      title: "Reservas en Tiempo Real",
      description: "Agenda tus citas cuando quieras y recibe confirmación instantánea"
    },
    {
      icon: Gift,
      title: "Programa de Puntos",
      description: "Gana puntos en cada visita y canjéalos por servicios y productos gratis"
    },
    {
      icon: Trophy,
      title: "Beneficios Exclusivos",
      description: "Accede a promociones especiales y precios preferenciales"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden registro-section">
      {/* Fondo con efecto parallax */}
      <div 
        ref={bgRef}
        className="registro-bg"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative z-10 min-h-screen py-20">
        <div className="text-center mb-12">
          <div className="inline-block bg-black/50 backdrop-blur-sm p-4 rounded-full border-2 border-amber-600 mb-6">
            <Scissors className="h-8 w-8 md:h-10 md:w-10 text-amber-600" />
          </div>
          <h2 className="text-amber-600 text-lg md:text-xl font-medium mb-4">
            ÚNETE A NOSOTROS
          </h2>
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-6">
            EXPERIENCIA PREMIUM
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto px-4 text-sm md:text-base">
            Regístrate ahora y forma parte de nuestra comunidad exclusiva. Disfruta de beneficios únicos y una experiencia personalizada.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="benefit-card border border-amber-600/30 bg-black/50 backdrop-blur-sm p-6 rounded-lg
                  hover:border-amber-600 transition-all duration-300"
              >
                <div className="mb-4">
                  <benefit.icon className="h-8 w-8 md:h-10 md:w-10 text-amber-600" />
                </div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Puntos y Niveles */}
          <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-sm border border-amber-600/30 rounded-lg p-6 md:p-8 mb-12">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-6 text-center">
              Sistema de Puntos y Recompensas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">10</div>
                <div className="text-white font-medium mb-1">Puntos</div>
                <div className="text-sm text-gray-400">Por cada servicio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">50</div>
                <div className="text-white font-medium mb-1">Puntos</div>
                <div className="text-sm text-gray-400">Bono de bienvenida</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">100</div>
                <div className="text-white font-medium mb-1">Puntos</div>
                <div className="text-sm text-gray-400">= 1 servicio gratis</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={handleRegistro} // Usa la función handleRegistro para abrir la URL de registro
              className="shine-button px-8 py-4 bg-amber-600 text-white rounded-md 
                hover:bg-amber-700 transition-colors text-lg md:text-xl font-medium
                shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
            >
              Crear Cuenta Gratis
            </button>

            <p className="mt-4 text-gray-400 text-sm">
              ¿Ya tienes cuenta? {''}
              <button
                onClick={handleLogin} // Usa la función handleLogin para abrir la URL de inicio de sesión
                className="text-amber-600 hover:text-amber-500"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;