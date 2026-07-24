import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Home() {
  const { user } = useAuth();

  return (
    <main className="collections-container" style={{ backgroundColor: '#121212', position: 'relative' }}>
      {/* Botón de Inicio de Sesión flotante */}
      {!user && (
        <div style={{ position: 'absolute', top: '30px', right: '40px', zIndex: 10 }}>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            Iniciar Sesión
          </Link>
        </div>
      )}

      {/* Sección 1: Árabe */}
      <section className="collection-column" id="col-arabe"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.75)), url('/imagenes/arabe.jpg'), linear-gradient(135deg, #1f1c18 0%, #3a3025 100%)" }}>
        <div className="column-overlay"></div>
        <div className="column-content">
          <h2 className="collection-title">ÁRABE</h2>
          <Link to="/arabe" className="cta-button" id="btn-arabe">
            <span className="cta-text">CONOCE MÁS</span>
            <span className="cta-hover-bg"></span>
          </Link>
        </div>
      </section>

      {/* Sección 2: Diseñador */}
      <section className="collection-column" id="col-disenador"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.75)), url('/imagenes/disenador.jpg'), linear-gradient(135deg, #141b29 0%, #0c101b 100%)" }}>
        <div className="column-overlay"></div>
        <div className="column-content">
          <h2 className="collection-title">DISEÑADOR</h2>
          <Link to="/disenador" className="cta-button" id="btn-disenador">
            <span className="cta-text">CONOCE MÁS</span>
            <span className="cta-hover-bg"></span>
          </Link>
        </div>
      </section>

      {/* Sección 3: Nicho */}
      <section className="collection-column" id="col-nicho"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.75)), url('/imagenes/nicho.jpg'), linear-gradient(135deg, #1e2522 0%, #0f1412 100%)" }}>
        <div className="column-overlay"></div>
        <div className="column-content">
          <h2 className="collection-title">NICHO</h2>
          <Link to="/nicho" className="cta-button" id="btn-nicho">
            <span className="cta-text">CONOCE MÁS</span>
            <span className="cta-hover-bg"></span>
          </Link>
        </div>
      </section>
    </main>
  );
}
