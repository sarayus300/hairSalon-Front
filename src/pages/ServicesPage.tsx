import { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const services = [
    {
      category: "Cortes Clásicos",
      items: [
        {
          name: "Corte Clásico",
          description: "Corte tradicional con tijera y máquina",
          price: 25,
          duration: "45 min",
          points: 10,
        },
        {
          name: "Corte + Barba",
          description: "Corte de cabello y arreglo completo de barba",
          price: 35,
          duration: "1h 15min",
          points: 15,
        },
        {
          name: "Degradado",
          description: "Corte con degradado personalizado",
          price: 30,
          duration: "45 min",
          points: 12,
        }
      ]
    },
    {
      category: "Servicios Premium",
      items: [
        {
          name: "Experiencia VIP",
          description: "Servicio completo de corte, barba y tratamientos",
          price: 60,
          duration: "2h",
          points: 25,
        },
        {
          name: "Ritual de Barbería",
          description: "La experiencia definitiva de barbería tradicional",
          price: 75,
          duration: "2h 30min",
          points: 30,
        }
      ]
    },
    {
      category: "Tratamientos Especiales",
      items: [
        {
          name: "Tratamiento Capilar",
          description: "Tratamiento personalizado para el cuidado del cabello",
          price: 40,
          duration: "1h",
          points: 15,
        },
        {
          name: "Ritual de Afeitado",
          description: "Afeitado tradicional con navaja y productos premium",
          price: 45,
          duration: "1h",
          points: 15,
        }
      ]
    }
  ];

  const allServices = services.reduce((acc, category) => {
    return [...acc, ...category.items.map(item => ({ ...item, category: category.category }))];
  }, [] as { name: string; description: string; price: number; duration: string; points: number; category: string }[]);

  const filteredServices = selectedCategory === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === selectedCategory);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section - Shorter height */}
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Nuestros Servicios
          </h1>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === 'all' 
                ? 'bg-amber-600 text-white' 
                : 'bg-white/5 text-white hover:bg-amber-600/20'}`}
          >
            Todos
          </button>
          {services.map((category) => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category.category 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-white/5 text-white hover:bg-amber-600/20'}`}
            >
              {category.category}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredServices.map((service, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-amber-600/20 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{service.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{service.description}</p>
                <div className="text-amber-600 font-bold mb-1">${service.price}</div>
                <div className="text-sm text-gray-400 mb-2">{service.duration}</div>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="text-xs text-amber-600">
                    <span className="font-bold">{service.points}</span> puntos
                  </div>
                  {/* Botón de Reservar que redirige al login */}
                  <Link 
                    to={import.meta.env.VITE_LOGIN_URL || "/login"}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-3 py-1 bg-amber-600 text-white text-sm rounded hover:bg-amber-700 transition-colors"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-amber-600/20">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sistema de Puntos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">1 Punto = $1</div>
              <p className="text-gray-400">En tu próximo servicio</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">2x Puntos</div>
              <p className="text-gray-400">Los martes y miércoles</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">+50 Puntos</div>
              <p className="text-gray-400">En tu cumpleaños</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;