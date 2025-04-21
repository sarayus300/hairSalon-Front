import React, { useState, useEffect } from 'react';
import { Scissors, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState('forward');

  // Definición de las diapositivas (slides) con sus respectivas imágenes, títulos, subtítulos y acciones.
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "BARBER SHOP",
      subtitle: "Experiencia y estilo en cada corte",
      buttonText: "Reservar Cita",
      // Acción del botón: abre la URL de inicio de sesión en una nueva pestaña.
      buttonAction: () => {
        const loginUrl = import.meta.env.VITE_LOGIN_URL; // Obtiene la URL de inicio de sesión desde las variables de entorno.
        if (loginUrl) {
          window.open(loginUrl, '_blank'); // Abre la URL en una nueva pestaña.
        } else {
          console.error('La URL de inicio de sesión no está definida en el archivo .env');
        }
      }
    },
    {
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "ESTILO ÚNICO",
      subtitle: "Descubre tu mejor versión",
      buttonText: "Ver Servicios",
      buttonAction: () => navigate('/servicios') // Navega a la página de servicios.
    },
    {
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "PROFESIONAL",
      subtitle: "Maestro en el arte del corte",
      buttonText: "Conóceme",
      buttonAction: () => {
        const element = document.getElementById('sobre-mi');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente a la sección "Sobre mí".
        }
      }
    }
  ];

  // Efecto para manejar el cambio automático de diapositivas cada 12 segundos.
  useEffect(() => {
    const interval = setInterval(() => {
      handleAutoSlide();
    }, 12000);

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta.
  }, [currentImageIndex]);

  // Función para manejar el cambio automático de diapositivas.
  const handleAutoSlide = () => {
    if (direction === 'forward') {
      if (currentImageIndex === slides.length - 1) {
        setDirection('backward');
        setCurrentImageIndex(prev => prev - 1);
      } else {
        setCurrentImageIndex(prev => prev + 1);
      }
    } else {
      if (currentImageIndex === 0) {
        setDirection('forward');
        setCurrentImageIndex(prev => prev + 1);
      } else {
        setCurrentImageIndex(prev => prev - 1);
      }
    }
  };

  // Función para avanzar a la siguiente diapositiva.
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentImageIndex < slides.length - 1) {
      setDirection('forward');
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Función para retroceder a la diapositiva anterior.
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentImageIndex > 0) {
      setDirection('backward');
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div 
      id="inicio"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Renderiza las imágenes de fondo para cada diapositiva */}
      {slides.map((slide, index) => (
        <div 
          key={slide.image}
          className={`absolute inset-0 z-0 transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform
            ${index === currentImageIndex ? 'translate-x-0' : 
              (direction === 'forward' ? 
                (index < currentImageIndex ? '-translate-x-full' : 'translate-x-full') :
                (index < currentImageIndex ? '-translate-x-full' : 'translate-x-full')
              )}`}
          style={{
            backgroundImage: `url("${slide.image}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
      ))}

      {/* Overlay para oscurecer ligeramente las imágenes de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />

      {/* Botón para retroceder a la diapositiva anterior */}
      <button 
        className={`absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-20
          md:${isHovered ? 'opacity-100' : 'opacity-0'}
          ${currentImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
        onClick={prevImage}
        disabled={currentImageIndex === 0}
      >
        <ChevronLeft className="h-8 w-8 md:h-12 md:w-12 stroke-2" />
      </button>

      {/* Botón para avanzar a la siguiente diapositiva */}
      <button 
        className={`absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-20
          md:${isHovered ? 'opacity-100' : 'opacity-0'}
          ${currentImageIndex === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
        onClick={nextImage}
        disabled={currentImageIndex === slides.length - 1}
      >
        <ChevronRight className="h-8 w-8 md:h-12 md:w-12 stroke-2" />
      </button>

      {/* Contenedor del contenido de las diapositivas */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full px-4 md:px-0">
          {/* Renderiza el contenido de cada diapositiva */}
          <div className="relative flex items-center justify-center">
            {slides.map((slide, index) => (
              <div 
                key={slide.title}
                className={`flex flex-col items-center w-full absolute transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${index === currentImageIndex ? 'translate-x-0 opacity-100' : 
                    (direction === 'forward' ? 
                      (index < currentImageIndex ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0') :
                      (index < currentImageIndex ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0')
                    )}`}
              >
                {/* Icono de la diapositiva */}
                <div className="mb-4 md:mb-6 bg-amber-600/90 p-4 md:p-6 rounded-full">
                  <Scissors className="h-10 w-10 md:h-16 md:w-16 text-white" />
                </div>
                
                {/* Título y subtítulo de la diapositiva */}
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-2 md:mb-4 tracking-wider text-center">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-4 text-center px-4">
                  {slide.subtitle}
                </p>
                
                {/* Botón de acción de la diapositiva */}
                <button 
                  onClick={slide.buttonAction}
                  className="mt-6 md:mt-8 px-6 md:px-8 py-2 md:py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-base md:text-lg font-medium"
                >
                  {slide.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;  