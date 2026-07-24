import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { openCart, cartCount } = useCart();
  const { user, logout, openProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/auth/logout', { method: 'POST', credentials: 'include' });
      logout();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header className="arabe-header">
        <div className="header-container">
            <div className="logo-menu-container">
                <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} aria-label="Abrir menú" id="menu-btn" onClick={toggleMenu}>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                </button>
                <Link to="/" className="brand-logo-img-wrapper" id="logo-link">
                    <img src="/imagenes/logonovu.jpeg" alt="Logo Perfumes" className="brand-logo-img" />
                </Link>
            </div>
            
            <div className="search-bar-container">
                <form action="#" className="search-form" id="search-form-el">
                    <input type="text" placeholder="BUSCAR PERFUME..." aria-label="Buscar perfumes" className="search-input" id="search-input-el" />
                    <button type="submit" className="search-submit-btn" aria-label="Buscar">
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>
            
            <div className="header-actions">
                {user ? (
                    <>
                        {user.rol === 'ADMIN' && (
                            <Link to="/admin" className="action-icon-link" aria-label="Panel Admin" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '15px' }}>
                                <svg className="header-svg-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="action-label">Panel Admin</span>
                            </Link>
                        )}
                        <button onClick={openProfile} className="action-icon-link" aria-label="Mi Perfil" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <svg className="header-svg-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="action-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2' }}>
                                <span>Perfil</span>
                                <span style={{ fontSize: '0.75rem', opacity: 0.85, textTransform: 'capitalize' }}>{user.nombre}</span>
                            </div>
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="action-icon-link" aria-label="Iniciar Sesión">
                        <svg className="header-svg-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="action-label">Iniciar Sesión</span>
                    </Link>
                )}
                <button className="action-icon-link cart-link" aria-label="Carrito de compras" onClick={openCart} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="cart-icon-wrapper">
                        <svg className="header-svg-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </div>
                    <span className="action-label">Carrito</span>
                </button>
            </div>
        </div>
        
        <div className="category-nav-bar">
            <Link to="/todas" className="category-nav-link" onClick={closeMenu}>Ver todas</Link>
            <Link to="/arabe" className="category-nav-link" onClick={closeMenu}>Árabe</Link>
            <Link to="/disenador" className="category-nav-link" onClick={closeMenu}>Diseñador</Link>
            <Link to="/nicho" className="category-nav-link" onClick={closeMenu}>Nicho</Link>
        </div>
      </header>

      {/* Menú de Navegación Overlay */}
      <div className={`navigation-overlay ${isMenuOpen ? 'active' : ''}`} id="nav-overlay">
        <nav className="overlay-nav">
          <ul className="nav-links">
            <li><Link to="/" className="nav-link" onClick={closeMenu}>Inicio</Link></li>
            <li><Link to="/arabe" className="nav-link" onClick={closeMenu}>Árabe</Link></li>
            <li><Link to="/disenador" className="nav-link" onClick={closeMenu}>Diseñador</Link></li>
            <li><Link to="/nicho" className="nav-link" onClick={closeMenu}>Nicho</Link></li>
            <li><Link to="/faq" className="nav-link" onClick={closeMenu}>Preguntas Frecuentes</Link></li>
            <li><Link to="/sobre-nosotros" className="nav-link" onClick={closeMenu}>Sobre Nosotros</Link></li>
            <li><Link to="/contacto" className="nav-link" onClick={closeMenu}>Contacto</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
}
