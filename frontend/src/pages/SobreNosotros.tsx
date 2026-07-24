export function SobreNosotros() {
  return (
    <>
      <main className="info-main">
        <div className="info-container">
          <h1 className="info-title">Sobre Nosotros</h1>
          <p className="info-subtitle">Nuestra Filosofía y Pasión por el Aroma</p>

          <div className="about-section">
            {/* Bloque 1: Historia */}
            <div className="about-block">
              <img src="/imagenes/disenador.jpg" alt="Boutique NOVU" className="about-image" />
              <div className="about-text">
                <h3>Nuestra Historia</h3>
                <p>NOVU nació del deseo de conectar a las personas con el fascinante mundo de la perfumería fina y de autor. Creemos que un perfume no es simplemente una fragancia, sino una declaración silenciosa de identidad, un recuerdo líquido y una obra de arte invisible.</p>
                <p>Desde nuestros inicios, nos hemos dedicado a buscar y seleccionar las creaciones olfativas más exclusivas y sofisticadas del mundo, importando fragancias genuinas que desafían lo convencional.</p>
              </div>
            </div>

            {/* Bloque 2: Filosofía */}
            <div className="about-block reverse">
              <img src="/imagenes/arabe.jpg" alt="Perfumes Árabes y de Autor" className="about-image" />
              <div className="about-text">
                <h3>La Filosofía Novu</h3>
                <div className="about-highlight">
                  "Un perfume tiene el poder de evocar momentos, transformar el estado de ánimo y definir el carácter."
                </div>
                <p>Nos especializamos en tres pilares fundamentales que representan el espectro completo de la alta perfumería: la opulenta tradición de la perfumería <strong>Árabe</strong>, la sofisticación atemporal de las casas de <strong>Diseñador</strong>, y la creatividad e innovación sin límites de la perfumería de <strong>Nicho</strong>.</p>
                <p>Nuestra misión es guiarte en una experiencia de descubrimiento olfativo personalizada, ayudándote a encontrar esa fragancia que resuena con tu alma.</p>
              </div>
            </div>

            {/* Bloque 3: Promesa */}
            <div className="about-block">
              <img src="/imagenes/nicho.jpg" alt="Fragancias Exclusivas" className="about-image" />
              <div className="about-text">
                <h3>Nuestra Promesa</h3>
                <p>En NOVU, la autenticidad y el servicio al cliente son innegociables. Nos comprometemos a entregar únicamente productos originales con envases sellados e importación directa.</p>
                <p>Queremos que cada compra sea una experiencia sensorial inigualable, cuidando cada detalle desde la asesoría inicial hasta el empaque y la entrega segura en la puerta de tu hogar.</p>
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
