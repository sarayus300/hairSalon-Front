import { useState } from 'react';
import { Search, Scissors } from 'lucide-react';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'cortes', name: 'Cortes' },
    { id: 'barbas', name: 'Barbas' },
    { id: 'degradados', name: 'Degradados' },
    { id: 'afeitados', name: 'Afeitados' },
    { id: 'peinados', name: 'Peinados' }
  ];

  const gallery = [
    {
      id: 1,
      title: "Corte Clásico",
      category: "cortes",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Corte clásico con acabado moderno"
    },
    {
      id: 2,
      title: "Afeitado Tradicional",
      category: "afeitados",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Afeitado tradicional con navaja"
    },
    {
      id: 3,
      title: "Estilo Moderno",
      category: "cortes",
      image: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Corte moderno con textura"
    },
    {
      id: 4,
      title: "Barba Perfecta",
      category: "barbas",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Perfilado y arreglo de barba"
    },
    {
      id: 5,
      title: "Degradado Perfecto",
      category: "degradados",
      image: "https://cdn.pixabay.com/photo/2018/04/03/23/04/woman-3288365_1280.jpg",
      description: "Degradado con líneas definidas"
    },
    {
      id: 6,
      title: "Acabado Premium",
      category: "peinados",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Peinado con acabado profesional"
    },
    {
      id: 7,
      title: "Degradado Clásico",
      category: "degradados",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Degradado suave y elegante"
    },
    {
      id: 8,
      title: "Barba Estilizada",
      category: "barbas",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Diseño y estilizado de barba"
    },
    {
      id: 9,
      title: "Corte Texturizado",
      category: "cortes",
      image: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Corte con textura y movimiento"
    }
  ];

  const filteredGallery = gallery.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
            <Scissors className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Galería de Trabajos
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explora mi colección de trabajos y descubre diferentes estilos y técnicas
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
              placeholder="Buscar trabajos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-amber-600/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-amber-600 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category.id 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-white/5 text-white hover:bg-amber-600/20'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div 
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg bg-white/5 border border-amber-600/20 hover:border-amber-600 transition-all duration-300"
            >
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;