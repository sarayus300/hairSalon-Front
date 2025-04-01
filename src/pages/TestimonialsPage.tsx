import React, { useState } from 'react';
import { Search, Star, Quote, Filter } from 'lucide-react';

const TestimonialsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { id: 'all', name: 'Todos' },
    { id: 'cortes', name: 'Cortes' },
    { id: 'barbas', name: 'Barbas' },
    { id: 'afeitados', name: 'Afeitados' },
    { id: 'experiencia', name: 'Experiencia' }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Juan Pérez",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      category: "cortes",
      date: "15 Marzo 2024",
      text: "El mejor servicio de barbería que he experimentado. El ambiente es increíble y el resultado siempre supera mis expectativas. La atención al detalle y el profesionalismo son excepcionales.",
      service: "Corte Clásico + Barba"
    },
    {
      id: 2,
      name: "Miguel Ángel",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      category: "experiencia",
      date: "12 Marzo 2024",
      text: "Profesionalismo y atención al detalle en cada visita. El sistema de puntos es genial, ya he canjeado varios servicios. La experiencia desde que entras hasta que sales es inmejorable.",
      service: "Servicio Premium"
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      category: "barbas",
      date: "10 Marzo 2024",
      text: "La calidad del servicio es excepcional. El personal es muy profesional y siempre están al día con las últimas tendencias. Mi barba nunca había lucido mejor.",
      service: "Arreglo de Barba Premium"
    },
    {
      id: 4,
      name: "Roberto García",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      category: "afeitados",
      date: "8 Marzo 2024",
      text: "El afeitado tradicional con navaja fue una experiencia única. La preparación de la piel, la técnica y el resultado final fueron perfectos. Totalmente recomendado.",
      service: "Afeitado Tradicional"
    },
    {
      id: 5,
      name: "David Martínez",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      category: "cortes",
      date: "5 Marzo 2024",
      text: "El degradado que me hicieron fue exactamente lo que buscaba. La atención a los detalles y la precisión en el corte son impresionantes. Volveré sin duda.",
      service: "Degradado + Diseño"
    },
    {
      id: 6,
      name: "Fernando López",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      category: "experiencia",
      date: "3 Marzo 2024",
      text: "Desde el momento que entras, la experiencia es de primera clase. El ambiente, la música, las bebidas ofrecidas y por supuesto el servicio, todo es excelente.",
      service: "Experiencia VIP"
    }
  ];

  const filteredTestimonials = testimonials.filter(item => 
    (selectedFilter === 'all' || item.category === selectedFilter) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-600 mb-6">
            <Quote className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Testimonios
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubre lo que nuestros clientes dicen sobre su experiencia
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar testimonios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-amber-600/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-amber-600 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedFilter === filter.id 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-white/5 text-white hover:bg-amber-600/20'}`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-sm rounded-lg border border-amber-600/20 p-6 hover:border-amber-600 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-white font-bold">{testimonial.name}</h3>
                  <p className="text-amber-600 text-sm">{testimonial.service}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-600 fill-amber-600" />
                ))}
              </div>

              {/* Content */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-amber-600/20" />
                <p className="text-gray-300 mb-4 relative z-10 pl-4">
                  {testimonial.text}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-600/20">
                <span className="text-gray-400 text-sm">{testimonial.date}</span>
                <span className="px-3 py-1 bg-amber-600/10 text-amber-600 text-xs rounded-full">
                  {filters.find(f => f.id === testimonial.category)?.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-amber-600/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">4.9</div>
              <p className="text-gray-400">Calificación promedio</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">1,000+</div>
              <p className="text-gray-400">Reseñas verificadas</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">98%</div>
              <p className="text-gray-400">Clientes satisfechos</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">5 años</div>
              <p className="text-gray-400">De experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;