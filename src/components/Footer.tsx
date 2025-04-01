import React, { useState } from 'react';
import { 
  Scissors, 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setEmail('');
  };

  const quickLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Productos', path: '/productos' },
    { name: 'Galería', path: '/galeria' },
    { name: 'Blog', path: '/blog' },
    { name: 'Testimonios', path: '/testimonios' },
    { name: 'Sobre Mí', path: '/#sobre-mi' },
    { name: 'Iniciar Sesión', path: import.meta.env.VITE_LOGIN_URL || '/login' },
  ];

  return (
    <footer className="relative bg-black/95 text-white overflow-hidden">
      {/* Decorative scissors pattern */}
      <div className="absolute inset-0 opacity-5 pattern-grid">
        {[...Array(20)].map((_, i) => (
          <Scissors key={i} className="h-8 w-8 text-amber-600 transform rotate-45" />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="footer-column">
            <div className="flex items-center mb-6">
              <Scissors className="h-8 w-8 text-amber-600" />
              <span className="ml-2 text-2xl font-bold">BARBER</span>
            </div>
            <p className="text-gray-400 mb-6">
              Expertos en el arte del corte y estilo desde 2010. Ofreciendo servicios premium y una experiencia única.
            </p>
            <div className="flex space-x-4">
              <a href={import.meta.env.VITE_FACEBOOK_URL || "#"} className="social-icon" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={import.meta.env.VITE_INSTAGRAM_URL || "#"} className="social-icon" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={import.meta.env.VITE_TWITTER_URL || "#"} className="social-icon" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.name === 'Iniciar Sesión' ? (
                    <a 
                      href={link.path} 
                      className="footer-link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.path}
                      className="footer-link"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h3 className="footer-title">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-600 mt-1 mr-3" />
                <span className="text-gray-400">
                  123 Calle Principal<br />
                  Ciudad, CP 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-amber-600 mr-3" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-amber-600 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-amber-600 mr-3" />
                <a href="mailto:info@barber.com" className="text-gray-400 hover:text-amber-600 transition-colors">
                  info@barber.com
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-amber-600 mr-3" />
                <span className="text-gray-400">
                  Lun - Sab: 9:00 - 20:00
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column">
            <h3 className="footer-title">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Suscríbete para recibir ofertas exclusivas y las últimas novedades.
            </p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  className="w-full bg-white/10 border border-amber-600/30 rounded-md py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-600 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-500 transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} BARBER. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-amber-600 transition-colors">Términos y Condiciones</a>
              <span className="hidden md:inline text-gray-600">|</span>
              <a href="#" className="hover:text-amber-600 transition-colors">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;