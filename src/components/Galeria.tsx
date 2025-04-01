import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gallery.css';

const Galeria = () => {
  const navigate = useNavigate();
  const bgRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const section = bgRef.current.closest('.galeria-section');
        if (section) {
          const rect = section.getBoundingClientRect();
          const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          const moveX = Math.max(0, Math.min(20, scrollPercentage * 20));
          bgRef.current.style.transform = `translateX(-${moveX}%)`;
        }
      }

      // Animación de cortina para cada imagen
      imagesRef.current.forEach((item) => {
        if (item) {
          const rect = item.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          
          // Añadir o remover la clase según la visibilidad
          if (isInView) {
            item.classList.add('in-view');
          } else {
            item.classList.remove('in-view');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar elementos visibles inicialmente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galeria = [
    {
      titulo: "Corte Clásico",
      imagen: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      titulo: "Afeitado Tradicional",
      imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      titulo: "Estilo Moderno",
      imagen: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      titulo: "Barba Perfecta",
      imagen: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      titulo: "Diseño Personalizado",
      imagen: "https://cdn.pixabay.com/photo/2018/04/03/23/04/woman-3288365_1280.jpg",
    },
    {
      titulo: "Acabado Premium",
      imagen: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden galeria-section">
      {/* Fondo con efecto parallax */}
      <div 
        ref={bgRef}
        className="gallery-bg"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 min-h-screen py-20">
        <div className="text-center mb-16">
          <h2 className="text-amber-600 text-lg md:text-xl font-medium mb-4">
            NUESTRO TRABAJO
          </h2>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-8">
            GALERÍA
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galeria.map((item, index) => (
              <div 
                key={index}
                ref={el => imagesRef.current[index] = el}
                onClick={() => navigate('/galeria')}
                className="gallery-item border border-amber-600/30 bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer"
              >
                <img 
                  src={item.imagen}
                  alt={item.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="gallery-overlay flex items-end p-4">
                  <h3 className="text-white text-lg font-medium">
                    {item.titulo}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/galeria')}
              className="px-8 py-3 bg-amber-600 text-white rounded-md 
                hover:bg-amber-700 transition-colors text-lg font-medium"
            >
              Ver Más Trabajos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Galeria;