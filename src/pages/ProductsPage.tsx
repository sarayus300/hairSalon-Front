import { useState } from 'react';
import { ShoppingCart, Star, Search } from 'lucide-react';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      category: "Cuidado del Cabello",
      items: [
        {
          name: "Champú Premium",
          description: "Champú fortalecedor con keratina y aceites naturales",
          price: 25,
          points: 250,
          rating: 4.8,
          reviews: 128,
          stock: true,
          image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Acondicionador Profesional",
          description: "Acondicionador reparador intensivo con proteínas",
          price: 28,
          points: 280,
          rating: 4.7,
          reviews: 95,
          stock: true,
          image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Pomada Modeladora",
          description: "Fijación fuerte y acabado natural mate",
          price: 20,
          points: 200,
          rating: 4.9,
          reviews: 156,
          stock: true,
          image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      category: "Cuidado de la Barba",
      items: [
        {
          name: "Aceite para Barba",
          description: "Aceite nutritivo con argán y jojoba",
          price: 22,
          points: 220,
          rating: 4.8,
          reviews: 112,
          stock: true,
          image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Bálsamo para Barba",
          description: "Hidratación profunda y control del frizz",
          price: 24,
          points: 240,
          rating: 4.6,
          reviews: 89,
          stock: false,
          image: "https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      category: "Afeitado",
      items: [
        {
          name: "Kit de Afeitado Premium",
          description: "Set completo con navaja, brocha y jabón",
          price: 75,
          points: 750,
          rating: 5.0,
          reviews: 64,
          stock: true,
          image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "Crema de Afeitar",
          description: "Crema premium con aloe vera y mentol",
          price: 18,
          points: 180,
          rating: 4.7,
          reviews: 143,
          stock: true,
          image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ];

  const allProducts = products.reduce((acc, category) => {
    return [...acc, ...category.items.map(item => ({ ...item, category: category.category }))];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, [] as any[]);

  const filteredProducts = allProducts
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512690459411-b9245aed614b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Productos Premium
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubre nuestra selección de productos profesionales para el cuidado del cabello y la barba
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
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-amber-600/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-amber-600 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === 'all' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-white/5 text-white hover:bg-amber-600/20'}`}
            >
              Todos
            </button>
            {products.map((category) => (
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
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-amber-600/20 group hover:border-amber-600 transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-amber-600/90 text-white text-xs rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Stock Badge */}
                {!product.stock && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-600/90 text-white text-xs rounded-full">
                      Agotado
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-600 fill-amber-600" />
                    <span className="text-white font-medium">{product.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({product.reviews} reseñas)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-amber-600">
                      ${product.price}
                    </div>
                    <div className="text-sm text-amber-600/80">
                      o {product.points} puntos
                    </div>
                  </div>
                  {/* Botón del carrito que redirige al login en una nueva pestaña */}
                  <a
                    href={import.meta.env.VITE_LOGIN_URL || "/login"}
                    target="_blank" // Abre en una nueva pestaña
                    rel="noopener noreferrer" // Mejora la seguridad y rendimiento
                    className={`p-3 rounded-full transition-colors ${
                      product.stock
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-gray-600 cursor-not-allowed text-gray-400'
                    }`}
                    onClick={(e) => {
                      if (!product.stock) {
                        e.preventDefault(); // Evita que el enlace se abra si el producto está agotado
                      }
                    }}
                  >
                    <ShoppingCart className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-amber-600/20">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Sistema de Puntos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">10 pts</div>
              <p className="text-gray-400">Por cada $1 en compras</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">2x pts</div>
              <p className="text-gray-400">En tu primera compra</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">500 pts</div>
              <p className="text-gray-400">Bono de bienvenida</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;