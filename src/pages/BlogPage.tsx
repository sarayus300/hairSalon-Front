import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

const BlogPage = () => {
  const articles = [
    {
      title: "La Técnica del Fade Perfecto",
      excerpt: "Descubre los secretos para lograr un degradado impecable, desde la preparación hasta el acabado final.",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      date: "15 Marzo 2024",
      readTime: "8 min",
      content: `El fade o degradado es una de las técnicas más solicitadas en la barbería moderna. Para lograr un fade perfecto, es esencial seguir estos pasos clave:

1. Preparación del cabello
- Lavar y secar completamente
- Peinar en su dirección natural
- Identificar las líneas naturales

2. Técnica de corte
- Comenzar con la línea guía
- Trabajar en secciones
- Usar las guardas correctas

3. Consejos avanzados
- Mantener el ángulo correcto de la máquina
- Realizar movimientos suaves y controlados
- Verificar la simetría constantemente`
    },
    {
      title: "Cuidado y Mantenimiento de la Barba",
      excerpt: "Guía completa para el cuidado diario de la barba, incluyendo productos esenciales y técnicas de mantenimiento.",
      image: "https://images.unsplash.com/photo-1621605512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      date: "10 Marzo 2024",
      readTime: "6 min",
      content: `El cuidado adecuado de la barba es fundamental para mantenerla saludable y con buen aspecto:

1. Rutina diaria
- Limpieza con champú específico
- Acondicionamiento con aceites naturales
- Peinado y modelado

2. Productos esenciales
- Aceite de barba
- Bálsamo modelador
- Peine de madera

3. Técnicas de mantenimiento
- Recorte regular
- Definición de líneas
- Hidratación profunda`
    },
    {
      title: "Tendencias en Cortes Masculinos 2024",
      excerpt: "Análisis de las últimas tendencias en cortes de cabello masculinos y cómo adaptarlas a diferentes tipos de cliente.",
      image: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      date: "5 Marzo 2024",
      readTime: "7 min",
      content: `Las tendencias en cortes masculinos para 2024 combinan lo clásico con lo moderno:

1. Estilos destacados
- Crop textirizado
- Fade medio con volumen
- Pompadour moderno

2. Adaptaciones según tipo de cabello
- Cabello fino
- Cabello grueso
- Cabello rizado

3. Técnicas de estilizado
- Productos recomendados
- Métodos de secado
- Mantenimiento en casa`
    },
    {
      title: "El Arte del Afeitado Tradicional",
      excerpt: "Redescubre el ritual del afeitado clásico con navaja y sus beneficios para la piel y la experiencia del cliente.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      date: "1 Marzo 2024",
      readTime: "9 min",
      content: `El afeitado tradicional con navaja es un arte que requiere precisión y conocimiento:

1. Preparación
- Toalla caliente
- Exfoliación suave
- Aplicación de pre-afeitado

2. Técnica de afeitado
- Dirección del crecimiento
- Ángulo de la navaja
- Tensión de la piel

3. Cuidado posterior
- Aplicación de after shave
- Hidratación
- Recomendaciones para el cliente`
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog de Barbería
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubre las últimas tendencias, técnicas y consejos del mundo de la barbería
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <article 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-amber-600/20 hover:border-amber-600/40 transition-colors group cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime} lectura
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-amber-600 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-gray-400 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex items-center text-amber-600 group-hover:text-amber-500 transition-colors">
                  Leer más
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;