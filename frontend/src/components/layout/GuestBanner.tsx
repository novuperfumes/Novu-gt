import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export function GuestBanner() {
  const { user, loading } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (user) return; // Logged in, no banner

    // Check if user already dismissed this session
    const dismissed = sessionStorage.getItem('guest_banner_dismissed');
    if (dismissed) return;

    // Show after a short delay for better UX
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [user, loading]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('guest_banner_dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1c1a17 0%, #2a2520 100%)',
        border: '1px solid #C5A059',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '420px',
        width: '90%',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Close X */}
        <button
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#888',
            fontSize: '1.5rem',
            cursor: 'pointer',
            lineHeight: 1,
          }}
          aria-label="Cerrar"
        >&times;</button>

        {/* Icon */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#C5A059',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '1.8rem',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1c1a17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>

        <h3 style={{
          color: '#fff',
          fontFamily: '"Montserrat", sans-serif',
          fontSize: '1.3rem',
          margin: '0 0 12px',
          fontWeight: 700,
        }}>Crea una cuenta</h3>

        <p style={{
          color: '#bbb',
          fontSize: '0.9rem',
          lineHeight: 1.5,
          margin: '0 0 25px',
        }}>
          Disfruta de beneficios exclusivos: tarjeta de fidelidad, gift cards, codigos promocionales y mas.
        </p>

        <Link
          to="/login"
          onClick={handleDismiss}
          style={{
            display: 'block',
            padding: '12px 30px',
            backgroundColor: '#C5A059',
            color: '#1c1a17',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.9rem',
            marginBottom: '12px',
            letterSpacing: '0.5px',
          }}
        >CREAR CUENTA / INICIAR SESION</Link>

        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            fontSize: '0.8rem',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >No, gracias</button>
      </div>
    </div>
  );
}
