import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/products.css';

const Productos = () => {
  const navigate = useNavigate();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const section = bgRef.current.closest('.productos-section');
        if (section) {
          const rect = section.getBoundingClientRect();
          const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          const moveX = Math.max(0, Math.min(20, scrollPercentage * 20));
          bgRef.current.style.transform = `translateX(${moveX}%)`; // Dirección invertida
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para manejar la redirección al login
  const handleProductClick = () => {
    const loginUrl = import.meta.env.VITE_LOGIN_URL; // Obtiene la URL de inicio de sesión desde las variables de entorno.
    if (loginUrl) {
      window.open(loginUrl, '_blank'); // Abre la URL en una nueva pestaña.
    } else {
      console.error('La URL de inicio de sesión no está definida en el archivo .env');
    }
  };

  const productos = [
    {
      nombre: "Kit Premium de Afeitado",
      imagen: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: "Afeitado"
    },
    {
      nombre: "Máquina de Corte Profesional",
      imagen: "https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: "Equipamiento"
    },
    {
      nombre: "Champú Fortalecedor",
      imagen: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: "Cuidado del Cabello"
    },
    {
      nombre: "Aceite para Barba",
      imagen: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: "Barba"
    },
    {
      nombre: "Crema de Afeitar Premium",
      imagen: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: "Afeitado"
    },
    {
      nombre: "Peine de Madera Premium",
      imagen: "https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: "Accesorios"
    },
    {
      nombre: "Peine de Madera",
      imagen: "https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: "Accesorios"
    },
    {
      nombre: "Peine",
      imagen: "https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: "Accesorios"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden productos-section">
      {/* Fondo con efecto parallax */}
      <div 
        ref={bgRef}
        className="product-bg"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 min-h-screen py-20">
        <div className="text-center mb-16">
          <h2 className="text-amber-600 text-lg md:text-xl font-medium mb-4">
            NUESTRA TIENDA
          </h2>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider mb-8">
            PRODUCTOS
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {productos.map((producto, index) => (
              <div 
                key={index}
                onClick={handleProductClick} // Usa la función handleProductClick para abrir la URL de inicio de sesión
                className="product-card border border-amber-600/30 bg-black/50 backdrop-blur-sm rounded-lg group cursor-pointer"
              >
                <img 
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
                <div className="product-overlay">
                  <span className="text-amber-600 text-xs mb-2">{producto.categoria}</span>
                  <h3 className="text-white text-center text-sm md:text-base font-medium px-2 mb-4">
                    {producto.nombre}
                  </h3>
                  <ArrowRight className="text-amber-600 h-6 w-6" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/productos')} // Este botón no se modifica
              className="px-8 py-3 bg-amber-600 text-white rounded-md 
                hover:bg-amber-700 transition-colors text-lg font-medium"
            >
              Ver Catálogo Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;