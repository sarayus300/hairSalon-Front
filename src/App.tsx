
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import GalleryPage from './pages/GalleryPage';
import TestimonialsPage from './pages/TestimonialsPage';



function AppContent() {
  const location = useLocation();
  const hideHeaderAndFooter = location.pathname === '/profile' || location.pathname === '/auth';

  return (
    <div className="min-h-screen">
      {!hideHeaderAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/testimonios" element={<TestimonialsPage />} />
      </Routes>
      {!hideHeaderAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;