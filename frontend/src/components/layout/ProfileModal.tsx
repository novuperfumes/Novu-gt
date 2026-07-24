import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export function ProfileModal() {
  const { user, isProfileOpen, closeProfile, logout } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  useEffect(() => {
    if (isProfileOpen && user) {
      // Fetch user profile with stamps and gift cards
      fetch('http://localhost:3000/users/me', {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => setProfileData(data))
      .catch(err => console.error(err));
    }
  }, [isProfileOpen, user]);

  if (!isProfileOpen || !user) return null;

  const totalStamps = 8;
  const stamps = profileData?.sellos || 0;
  const giftCards = profileData?.giftCards || [];

  return (
    <div className={`modal-overlay ${isProfileOpen ? 'active' : ''}`} onClick={closeProfile}>
      <div className="profile-modal" id="profile-modal-el" onClick={e => e.stopPropagation()}>
        <button className="modal-close close-btn" onClick={closeProfile} aria-label="Cerrar">×</button>
        <div className="profile-modal-content" id="profile-content-container">
          
          <h2 className="profile-title">Mi Perfil Novu</h2>
          
          <div className="profile-user-info">
              <div className="profile-user-name">{user.nombre} {user.apellido}</div>
              <div className="profile-user-email">{user.correo}</div>
          </div>
          
          {/* Tarjeta de Fidelidad */}
          <div className="loyalty-card-wrapper">
              <div className="loyalty-card-section-title">Tarjeta de Fidelidad</div>
              <div className="loyalty-card">
                  <div className="loyalty-card-header">
                      <span className="loyalty-card-brand">NOVU</span>
                      <span className="loyalty-card-label">Loyalty Club</span>
                  </div>
                  
                  <div className="loyalty-stamps-grid">
                      {Array.from({ length: totalStamps }).map((_, i) => (
                        i < stamps ? (
                          <div key={i} className="stamp-slot active" title={`Sello ${i + 1} obtenido`}>
                              <span className="stamp-icon">★</span>
                          </div>
                        ) : (
                          <div key={i} className="stamp-slot" title={`Sello ${i + 1} vacío`}>
                              <span className="stamp-number">{i + 1}</span>
                          </div>
                        )
                      ))}
                  </div>
                  
                  <div className="loyalty-card-footer">
                      <div className="loyalty-cardholder">
                          <span className="loyalty-cardholder-label">Titular</span>
                          <span className="loyalty-cardholder-name">{user.nombre.toUpperCase()}</span>
                      </div>
                      <div className="loyalty-progress-summary">
                          {stamps} / {totalStamps} SELLOS
                      </div>
                  </div>
              </div>
              <div className="loyalty-info-text">
                  {stamps < totalStamps 
                    ? <>Te faltan <strong>{totalStamps - stamps} compra{totalStamps - stamps > 1 ? 's' : ''}</strong> para recibir una Gift Card de Q 150.</>
                    : <>¡Felicidades! Has completado tu tarjeta de fidelidad y tu Gift Card ha sido generada.</>
                  }
                  <br />
                  <span style={{ fontSize: '0.65rem', color: '#888888' }}>*Obtén 1 sello por cada compra realizada.</span>
              </div>
          </div>
          
          {/* Mis Gift Cards */}
          <div className="gift-cards-section">
              <div className="loyalty-card-section-title">Mis Tarjetas de Regalo (Gift Cards)</div>
              {giftCards.length === 0 ? (
                <div className="gift-card-empty">
                    No tienes tarjetas de regalo disponibles actualmente.
                </div>
              ) : (
                <div className="gift-cards-list">
                    {giftCards.map((g: any, index: number) => (
                        <div key={index} className="gift-card-item">
                            <div className="gift-card-info">
                                <span className="gift-card-title">{g.es_bienvenida ? 'Gift Card de Bienvenida' : 'Premio de Fidelidad'}</span>
                                <div className="gift-card-code-wrapper">
                                    <span className="gift-card-code">{g.codigo}</span>
                                    <button className="copy-btn" onClick={() => {
                                        navigator.clipboard.writeText(g.codigo);
                                        setCopiedId(g.codigo);
                                        setTimeout(() => setCopiedId(null), 2000);
                                    }}>{copiedId === g.codigo ? 'Copiado!' : 'Copiar'}</button>
                                </div>
                            </div>
                            <div className="gift-card-value">
                                <span>Q {Number(g.monto).toFixed(2)}</span>
                                <div className="gift-card-tag">ACTIVO</div>
                            </div>
                        </div>
                    ))}
                </div>
              )}
              <div className="loyalty-info-text" style={{ fontSize: '0.7rem', color: '#888888', textAlign: 'left', marginTop: '15px' }}>
                  Copia el código de tu Gift Card y envíalo junto a tu pedido por WhatsApp para aplicar tu descuento.
              </div>
          </div>
          
          <div className="profile-actions" style={{ display: 'flex', gap: '15px' }}>
              <button 
                className="profile-close-btn" 
                onClick={closeProfile}
                style={{ flex: 1 }}
              >
                CERRAR
              </button>
              <button 
                className="profile-logout-btn" 
                onClick={async () => {
                  try {
                    await fetch('http://localhost:3000/auth/logout', { method: 'POST', credentials: 'include' });
                    logout();
                    closeProfile();
                    window.location.href = '/';
                  } catch (e) {
                    console.error(e);
                  }
                }}
                style={{ flex: 1, padding: '16px', backgroundColor: '#8b0000', color: 'white', border: 'none', fontFamily: 'var(--font-accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', cursor: 'pointer', transition: 'background-color 0.2s' }}
              >
                CERRAR SESIÓN
              </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
