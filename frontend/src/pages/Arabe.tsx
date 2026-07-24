import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { usePerfumes } from '../hooks/usePerfumes';
import { GuestBanner } from '../components/layout/GuestBanner';

export function Arabe() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { perfumes, filterByCategory, loading } = usePerfumes();
  
  // --- Lógica del Carrusel Hero ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      bgImage: "url('/imagenes/banner1.png')",
      tag: "NUEVA EXCLUSIVIDAD",
      title: "EL ARTE DEL OUD",
      desc: "Fragancias místicas y opulentas diseñadas para perdurar en el tiempo.",
      link: "#novedades-section",
      btnText: "DESCUBRE LA COLECCIÓN"
    },
    {
      bgImage: "url('/imagenes/banner2.png')",
      tag: "BEST SELLER",
      title: "NOUR AL SAHRA",
      desc: "El equilibrio perfecto entre notas especiadas orientales y maderas preciosas.",
      link: "#grid-section",
      btnText: "COMPRA AHORA"
    }
  ];

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

  // Filtrado de productos utilizando los datos del backend (ignorando mayúsculas/minúsculas)
  const categoryPerfumes = perfumes.filter(p => p.categoria.toLowerCase() === 'árabe' || p.categoria.toLowerCase() === 'arabe');

  const filteredSliderProducts = categoryPerfumes.filter(p => 
    (p.subcategorias?.includes(activeTab)) && 
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
              {slides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`} 
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), ${slide.bgImage}` }}>
                  <div className="slide-content">
                    <span className="slide-tag">{slide.tag}</span>
                    <h1 className="slide-title">{slide.title}</h1>
                    <p className="slide-description">{slide.desc}</p>
                    <a href={slide.link} className="slide-btn">{slide.btnText}</a>
                  </div>
                </div>
              ))}
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
            <h2 className="grid-section-title">COLECCIÓN DE PERFUMES ÁRABES</h2>
            
            <div className="products-grid">
              {loading && <p style={{ color: '#C5A059', textAlign: 'center', width: '100%', padding: '20px' }}>Cargando productos...</p>}
              {!loading && filteredGridProducts.map(product => {
                const price = product.presentaciones?.length ? Number(product.presentaciones[0].precio) : 0;
                return (
                <div className="grid-product-card" key={product.id} onClick={() => handleVerMas(product.id)} style={{ cursor: 'pointer' }}>
                  <div className="grid-card-image-wrapper">
                    <img src={product.imagen || '/imagenes/logonovu.jpeg'} alt={product.nombre} className="grid-product-image" />
                  </div>
                  <div className="grid-card-details">
                    <h3 className="grid-product-brand">{product.marca}</h3>
                    <p className="grid-product-name">{product.nombre}</p>
                    <p className="grid-product-type">{product.categoria}</p>
                    <p className="grid-product-price">Q {price.toFixed(2)}</p>
                    <button className="ver-mas-btn" onClick={(e) => { e.stopPropagation(); handleVerMas(product.id); }}>VER MÁS</button>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
