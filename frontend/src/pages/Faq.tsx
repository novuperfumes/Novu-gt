import { useState } from 'react';

export function Faq() {
  const faqs = [
    {
      question: '¿Los perfumes son 100% originales?',
      answer: 'Sí, garantizamos al 100% la autenticidad de cada una de nuestras fragancias. Trabajamos directamente con distribuidores autorizados y marcas de renombre internacional. No vendemos copias, réplicas ni tester modificados.'
    },
    {
      question: '¿Cuáles son las zonas de cobertura y los tiempos de envío?',
      answer: 'Realizamos envíos a toda la República de Guatemala. En la Ciudad de Guatemala el tiempo de entrega es de 24 a 48 horas hábiles. Para departamentos y el interior de la república, el tiempo de entrega estimado es de 3 a 5 días hábiles a través de Cargo Expreso o Guatex.'
    },
    {
      question: '¿Cuáles son los métodos de pago aceptados?',
      answer: 'Aceptamos pagos con tarjetas de crédito y débito Visa y Mastercard, transferencias bancarias directas (Banco Industrial, Banrural y G&T Continental) y pago contra entrega en Ciudad de Guatemala y cabeceras departamentales seleccionadas.'
    },
    {
      question: '¿Puedo realizar cambios o devoluciones de mi producto?',
      answer: 'Debido a la naturaleza higiénica y de cuidado personal de los perfumes, solo se aceptan cambios o devoluciones por desperfectos de fábrica (como atomizadores dañados o roturas durante el envío) dentro de las primeras 48 horas tras haber recibido el producto. El perfume debe estar en su caja y celofán original sin abrir.'
    },
    {
      question: '¿Cómo puedo rastrear mi pedido?',
      answer: 'Una vez que tu pedido sea despachado, recibirás un correo electrónico y un mensaje de WhatsApp con el número de guía de mensajería (Guatex o Cargo Expreso). Podrás hacer el seguimiento en línea a través de sus plataformas oficiales de rastreo.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <main className="info-main">
        <div className="info-container">
          <h1 className="info-title">Preguntas Frecuentes</h1>
          <p className="info-subtitle">Todo lo que necesitas saber sobre NOVU</p>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${openIndex === index ? 'active' : ''}`} key={index}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <svg className="faq-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="faq-answer-wrapper" style={{ maxHeight: openIndex === index ? '500px' : '0' }}>
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
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
