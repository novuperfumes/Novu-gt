export function Contacto() {
  return (
    <>
      <main className="info-main">
        <div className="info-container">
          <h1 className="info-title">Contacto</h1>
          <p className="info-subtitle">Escríbenos o Visita Nuestra Boutique</p>

          <div className="contact-layout">
            {/* Columna Izquierda: Formulario */}
            <div className="contact-card">
              <h3>Envíanos un Mensaje</h3>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="contact-name">Nombre Completo</label>
                  <input type="text" id="contact-name" className="form-control" placeholder="Escribe tu nombre..." required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Correo Electrónico</label>
                  <input type="email" id="contact-email" className="form-control" placeholder="Escribe tu correo..." required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject">Asunto</label>
                  <input type="text" id="contact-subject" className="form-control" placeholder="Motivo de tu mensaje..." required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Mensaje</label>
                  <textarea id="contact-message" className="form-control" placeholder="Escribe tu consulta detalladamente..." required></textarea>
                </div>
                <button type="submit" className="contact-submit-btn">Enviar Mensaje</button>
              </form>
            </div>

            {/* Columna Derecha: Información */}
            <div className="contact-card">
              <h3>Información de Boutique</h3>

              <div className="info-list">
                {/* Ubicación */}
                <div className="info-item">
                  <svg className="info-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="info-item-content">
                    <h4>Dirección</h4>
                    <p>Avenida Las Américas 15-00, Zona 13<br />Centro Comercial Las Américas, Local 42<br />Ciudad de Guatemala, Guatemala</p>
                  </div>
                </div>

                {/* Teléfono / WhatsApp */}
                <div className="info-item">
                  <svg className="info-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="info-item-content">
                    <h4>Llámanos o Escríbenos</h4>
                    <p>Teléfono: +502 5205-0020<br />WhatsApp: +502 5205-0020</p>
                  </div>
                </div>

                {/* Correo Electrónico */}
                <div className="info-item">
                  <svg className="info-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="info-item-content">
                    <h4>Correo de Soporte</h4>
                    <p>info@novuguatemala.com<br />ventas@novuguatemala.com</p>
                  </div>
                </div>

                {/* Horarios */}
                <div className="info-item">
                  <svg className="info-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="info-item-content">
                    <h4>Horario de Atención</h4>
                    <p>Lunes a Sábado: 10:00 AM - 8:00 PM<br />Domingo: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
