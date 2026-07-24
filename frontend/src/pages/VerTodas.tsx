import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePerfumes } from '../hooks/usePerfumes';

export function VerTodas() {
  const navigate = useNavigate();
  const { perfumes, loading } = usePerfumes();
  
  const [activeGender, setActiveGender] = useState('todos');

  const filteredGridProducts = perfumes.filter(p => 
    activeGender === 'todos' || p.genero === activeGender || p.genero === 'unisex'
  );

  const handleVerMas = (id: number) => {
    navigate(`/perfume/${id}`);
  };

  return (
    <>
      <main className="arabe-main">
        {/* Banner estático para Todas */}
        <section className="hero-carousel-section" id="hero-carousel" style={{ height: '400px' }}>
          <div className="carousel-track-container">
            <div className="carousel-track">
              <div 
                className="carousel-slide active" 
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('/imagenes/banner1.png')`, height: '400px' }}>
                <div className="slide-content">
                  <span className="slide-tag">COLECCIÓN COMPLETA</span>
                  <h1 className="slide-title">TODOS LOS PERFUMES</h1>
                  <p className="slide-description">Explora nuestra colección completa de fragancias de diseñador, árabes y nicho.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Sección de Cuadrícula de Productos */}
        <section className="products-grid-section" id="grid-section" style={{ paddingTop: '60px' }}>
          <div className="section-container">
            
            <div className="gender-filter-container" style={{ marginBottom: '40px' }}>
              {['todos', 'el', 'ella'].map(g => (
                <button 
                  key={g}
                  className={`gender-btn ${activeGender === g ? 'active' : ''}`} 
                  onClick={() => setActiveGender(g)}>
                  {g === 'todos' ? 'TODOS' : `PARA ${g.toUpperCase()}`}
                </button>
              ))}
            </div>

            <h2 className="grid-section-title">NUESTRO CATÁLOGO</h2>
            
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

      <footer className="arabe-footer">
        <div className="footer-socials">
            <a href="https://www.instagram.com/novu_perfumes_gt/" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
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
