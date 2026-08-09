import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePerfumes } from '../hooks/usePerfumes';
import { useCampania } from '../hooks/useCampania';
import { GuestBanner } from '../components/layout/GuestBanner';
import { useBanners } from '../hooks/useBanners';


export function Decants() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { perfumes, bestSellers, loading } = usePerfumes();
  const { calcularPrecio } = useCampania();
  const { banners: dynamicBanners } = useBanners('decants');
  
  // --- Lógica del Carrusel Hero ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const defaultSlides = [
    {
      bgImage: "/imagenes/banner1.png",
      tag: "DECANTS ORIGINALES",
      title: "PRUEBA ANTES DE COMPRAR",
      desc: "Descubre nuevas fragancias con nuestros decants 100% originales.",
      link: "#novedades-section",
      btnText: "EXPLORAR DECANTS"
    }
  ];

  const slides = dynamicBanners.length > 0 ? dynamicBanners : defaultSlides;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto-play del carrusel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // --- Lógica de Pestañas de Productos ---
  const [activeTab, setActiveTab] = useState('novedades');
  const [activeGender, setActiveGender] = useState('todos');

  // Filtrado de productos que tienen decant
  const categoryPerfumes = perfumes.filter(p => p.decant !== undefined && p.decant !== null);
  const categoryBestSellers = bestSellers.filter(p => p.decant !== undefined && p.decant !== null);

  const filteredSliderProducts = activeTab === 'mas-vendidos'
    ? categoryBestSellers.filter(p => activeGender === 'todos' || p.genero === activeGender || p.genero === 'unisex')
    : categoryPerfumes.filter(p => 
      (activeGender === 'todos' || p.genero === activeGender || p.genero === 'unisex')
    );

  const filteredGridProducts = categoryPerfumes.filter(p => 
    activeGender === 'todos' || p.genero === activeGender || p.genero === 'unisex'
  );

  const handleVerMas = (id: number) => {
    navigate(`/perfume/${id}`);
  };

  return (
    <>
      <GuestBanner />
      <main className="arabe-main">
        {/* 1. Carrusel de Banners Hero */}
        <section className="hero-carousel-section" id="hero-carousel">
          <div className="carousel-track-container">
            <div className="carousel-track">
              {slides.map((slide, index) => {
                const imgUrl = slide.bgImage.startsWith('http') || slide.bgImage.startsWith('/imagenes') 
                  ? slide.bgImage 
                  : `${import.meta.env.VITE_API_URL}${slide.bgImage}`;
                
                return (
                <div 
                  key={index} 
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`} 
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('${imgUrl}')` }}>
                  <div className="slide-content">
                    {slide.tag && <span className="slide-tag">{slide.tag}</span>}
                    <h1 className="slide-title">{slide.title}</h1>
                    {slide.desc && <p className="slide-description">{slide.desc}</p>}
                    {slide.btnText && slide.link && <a href={slide.link} className="slide-btn">{slide.btnText}</a>}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
          
          <button className="carousel-arrow prev" aria-label="Slide anterior" onClick={prevSlide}>
            <svg className="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="carousel-arrow next" aria-label="Siguiente slide" onClick={nextSlide}>
            <svg className="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="carousel-nav">
            {slides.map((_, index) => (
              <button 
                key={index}
                className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`} 
                aria-label={`Slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>

        {/* 2. Sección de Destacados con Pestañas */}
        <section className="featured-tabs-section" id="novedades-section">
          <div className="section-container">
            <div className="gender-filter-container">
              {['todos', 'el', 'ella'].map(g => (
                <button 
                  key={g}
                  className={`gender-btn ${activeGender === g ? 'active' : ''}`} 
                  onClick={() => setActiveGender(g)}>
                  {g === 'todos' ? 'TODOS' : `PARA ${g.toUpperCase()}`}
                </button>
              ))}
            </div>
            
            <div className="tabs-container">
              {[
                { id: 'novedades', label: 'NOVEDADES' },
                { id: 'mas-vendidos', label: 'MÁS VENDIDOS' },
                { id: 'indispensables', label: 'INDISPENSABLES' },
                { id: 'esenciales', label: 'ESENCIALES' },
                { id: 'favoritas', label: 'FAVORITAS' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} 
                  onClick={() => setActiveTab(tab.id)}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="products-slider-wrapper">
              <div className="products-slider-container">
                <div className="products-slider" id="featured-products-container">
                  {loading && <p style={{ color: '#C5A059', textAlign: 'center', width: '100%', padding: '20px' }}>Cargando productos...</p>}
                  {!loading && filteredSliderProducts.map(product => (
                    <div className="product-card-slide" key={product.id} onClick={() => handleVerMas(product.id)} style={{ cursor: 'pointer' }}>
                      <div className="card-image-wrapper">
                        <img src={product.imagen || '/imagenes/logonovu.jpeg'} alt={product.nombre} className="product-card-image" />
                      </div>
                      <div className="card-details">
                        <h3 className="product-brand">{product.marca}</h3>
                        <p className="product-name">{product.nombre.split(' (')[0]}</p>
                        <p className="product-type">{product.categoria}</p>
                      </div>
                    </div>
                  ))}
                  {filteredSliderProducts.length === 0 && (
                    <p style={{ color: '#C5A059', textAlign: 'center', width: '100%', padding: '20px' }}>
                      No hay productos en esta categoría.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Sección de Cuadrícula de Productos */}
        <section className="products-grid-section" id="grid-section">
          <div className="section-container">
            <h2 className="grid-section-title">COLECCIÓN DE DECANTS</h2>
            
            <div className="products-grid">
              {loading && <p style={{ color: '#C5A059', textAlign: 'center', width: '100%', padding: '20px' }}>Cargando productos...</p>}
              {!loading && filteredGridProducts.map(product => {
                const price = product.presentaciones?.length ? Number(product.presentaciones[0].precio) : 0;
                const { precioFinal, tieneDescuento, porcentaje } = calcularPrecio(product, price);
                return (
                <div className="grid-product-card" key={product.id} onClick={() => handleVerMas(product.id)} style={{ cursor: 'pointer' }}>
                  <div className="grid-card-image-wrapper">
                    <img src={product.imagen || '/imagenes/logonovu.jpeg'} alt={product.nombre} className="grid-product-image" />
                  </div>
                  <div className="grid-card-details">
                    <h3 
                      className="grid-product-brand"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/todas?q=${encodeURIComponent(product.marca)}`);
                      }}
                      style={{ cursor: 'pointer' }}
                      title={`Ver todos los perfumes de ${product.marca}`}
                    >
                      {product.marca}
                    </h3>
                    <p className="grid-product-name">{product.nombre}</p>
                    <p 
                      className="grid-product-type"
                      onClick={(e) => {
                        e.stopPropagation();
                        const cat = (product.categoria || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                        const path = cat.includes('nicho') ? '/nicho' : cat.includes('arabe') ? '/arabe' : '/disenador';
                        navigate(path);
                      }}
                      style={{ cursor: 'pointer' }}
                      title={`Ir a la colección ${product.categoria}`}
                    >
                      {product.categoria}
                    </p>
                    {tieneDescuento ? (
                      <div style={{ marginBottom: '12px' }}>
                        <span className="discount-badge">{porcentaje}% OFF</span>
                        <span className="price-original">Q {price.toFixed(2)}</span>
                        <span className="price-discount">Q {precioFinal.toFixed(2)}</span>
                      </div>
                    ) : (
                      <p className="grid-product-price">Q {price.toFixed(2)}</p>
                    )}
                    <button className="ver-mas-btn" onClick={(e) => { e.stopPropagation(); handleVerMas(product.id); }}>VER MÁS</button>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </section>
      </main>

      <footer className="arabe-footer">
        <div className="footer-socials">
            <a href="https://www.instagram.com/novu_perfumes_gt/" target="_blank" className="social-link" aria-label="Instagram">
                <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
            </a>
        </div>
        <p>&copy; 2026 Colecciones Exclusivas. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
