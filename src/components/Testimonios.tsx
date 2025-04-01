import React, { useEffect, useRef } from 'react';
import { Quote, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/testimonios.css';

const Testimonios = () => {
  const navigate = useNavigate();
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animatedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Parallax effect
      if (bgRef.current) {
        const section = bgRef.current.closest('.testimonios-section');
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
            // Animate testimonial cards
            cardsRef.current.forEach((card) => {
              card?.classList.add('animate');
            });

            // Animate stars
            starsRef.current.forEach((star) => {
              star?.classList.add('animate');
            });

            animatedRef.current = true;
          } else if (!entry.isIntersecting) {
            // Reset animations when section is out of view
            cardsRef.current.forEach((card) => {
              card?.classList.remove('animate');
            });
            starsRef.current.forEach((star) => {
              star?.classList.remove('animate');
            });
            animatedRef.current = false;
          }
        });
      }, {
        threshold: 0.2
      });

      const section = document.querySelector('.testimonios-section');
      if (section) {
        observer.observe(section);
      }

      return () => observer.disconnect();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonios = [
    {
      nombre: "Juan Pérez",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      texto: "El mejor servicio de barbería que he experimentado. El ambiente es increíble y el resultado siempre supera mis expectativas.",
      rating: 5,
      cargo: "Cliente desde 2020"
    },
    {
      nombre: "Miguel Ángel",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      texto: "Profesionalismo y atención al detalle en cada visita. El sistema de puntos es genial, ya he canjeado varios servicios.",
      rating: 5,
      cargo: "Cliente desde 2021"
    },
    {
      nombre: "Carlos Ruiz",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      texto: "La calidad del servicio es excepcional. El personal es muy profesional y siempre están al día con las últimas tendencias.",
      rating: 5,
      cargo: "Cliente desde 2019"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden testimonios-section">
      {/* Fondo con efecto parallax */}
      <div 
        ref={bgRef}
        className="testimonios-bg"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 min-h-screen py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <Quote className="h-12 w-12 md:h-16 md:w-16 text-amber-600 quote-icon" />
          </div>
          <h2 className="text-amber-600 text-lg md:text-xl font-medium mb-4">
            TESTIMONIOS
          </h2>
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-8">
            QUÉ DICEN NUESTROS CLIENTES
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonios.map((testimonio, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="testimonial-card bg-black/50 backdrop-blur-sm border border-amber-600/30 rounded-lg p-6 md:p-8"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonio.foto}
                    alt={testimonio.nombre}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-white font-bold text-lg">{testimonio.nombre}</h3>
                    <p className="text-amber-600 text-sm">{testimonio.cargo}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonio.rating)].map((_, i) => (
                    <div
                      key={i}
                      ref={el => starsRef.current[i + index * 5] = el}
                      className="rating-star"
                    >
                      <Star className="h-5 w-5 text-amber-600 fill-amber-600" />
                    </div>
                  ))}
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {testimonio.texto}
                </p>

                <Quote className="h-8 w-8 text-amber-600/20 mt-4 quote-icon" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/testimonios')}
              className="px-8 py-3 bg-amber-600 text-white rounded-md 
                hover:bg-amber-700 transition-colors text-lg font-medium"
            >
              Ver Más Testimonios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonios;