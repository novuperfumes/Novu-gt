import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function CheckoutModal() {
  const { cart, isCheckoutOpen, closeCheckout, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.nombre || '',
    email: user?.correo || '',
    phone: '',
    nit: '',
    address: '',
    references: '',
    dept: '',
    city: '',
    gender: ''
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState('');
  const [earnedStamps, setEarnedStamps] = useState(0);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [finalTotal, setFinalTotal] = useState(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number; type: 'gift_card' | 'promo' } | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [validatingDiscount, setValidatingDiscount] = useState(false);

  const total = Math.max(0, cartTotal - (appliedDiscount?.amount || 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id.replace('co-', '')]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '').slice(0, 8);
    let formatted = rawDigits;
    if (rawDigits.length > 4) {
      formatted = `${rawDigits.slice(0, 4)}-${rawDigits.slice(4)}`;
    }
    setFormData({ ...formData, phone: formatted });
  };

  const handleNitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Restrict NIT to numbers, hyphens, and 'K'/'k'
    const val = e.target.value.replace(/[^0-9kK-]/g, '');
    setFormData({ ...formData, nit: val.toUpperCase() });
  };

  const handleValidateDiscount = async () => {
    setDiscountError('');
    setAppliedDiscount(null);
    if (!discountCode.trim()) return;
    
    setValidatingDiscount(true);
    try {
      // Try Gift Card first
      const resGC = await fetch(`http://localhost:3000/gift-cards/validate/${discountCode.trim()}`, { credentials: 'include' });
      if (resGC.ok) {
        const data = await resGC.json();
        setAppliedDiscount({ code: discountCode.trim(), amount: Number(data.monto), type: 'gift_card' });
      } else {
        // Try Promo Code
        const resPromo = await fetch(`http://localhost:3000/promo-codes/validate/${discountCode.trim()}`, { credentials: 'include' });
        if (resPromo.ok) {
           const data = await resPromo.json();
           let amount = 0;
           if (data.tipo_descuento === 'porcentaje') {
             amount = cartTotal * (Number(data.descuento) / 100);
           } else {
             amount = Number(data.descuento);
           }
           setAppliedDiscount({ code: discountCode.trim(), amount, type: 'promo' });
        } else {
           const errData = await resPromo.json().catch(() => ({}));
           // Prioritize showing promo error if it wasn't a GC either
           setDiscountError(errData.message || 'Código no válido o expirado');
        }
      }
    } catch (err) {
      console.error(err);
      setDiscountError('Error de red al validar código');
    }
    setValidatingDiscount(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // First, sync local cart to backend CarritoMaestro
    try {
      // Clear existing backend cart
      await fetch('http://localhost:3000/carts', { method: 'DELETE', credentials: 'include' });
      
      // Add all current items to backend cart concurrently
      await Promise.all(cart.map(item => 
        fetch('http://localhost:3000/carts/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            id_presentacion: item.isDecant ? undefined : item.presentacionId,
            id_decant: item.isDecant ? item.decantId : undefined,
            tipo_decant: item.isDecant ? item.size : undefined,
            cantidad: item.quantity
          })
        })
      ));

      // Save order to backend
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          tipo_entrega: 'domicilio',
          metodo_de_pago: 'efectivo',
          nombre_recibe: formData.name,
          telefono_contacto: formData.phone,
          direccion_entrega: formData.address + (formData.references ? ` (Ref: ${formData.references})` : ''),
          departamento_entrega: formData.dept,
          municipio_entrega: formData.city,
          codigo_descuento: appliedDiscount?.code
        })
      });

      if (response.ok) {
        const result = await response.json();
        setEarnedStamps(result.stampsSummary?.earned || 0);
      } else {
        const errData = await response.json();
        alert('Error al registrar pedido: ' + (errData.message || 'Intente nuevamente'));
        setIsSubmitting(false);
        return; // Abort WhatsApp and cart clearing if order fails
      }
    } catch (error) {
      console.error('Error creating order in DB:', error);
      alert('Error de conexión al procesar el pedido. Intente nuevamente.');
      setIsSubmitting(false);
      return; // Abort
    }
    
    // Process WhatsApp
    let orderDetailsText = '';
    cart.forEach((item, idx) => {
        orderDetailsText += `${idx + 1}. *${item.brand}* - ${item.name} x${item.quantity} - Q ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const whatsappMessage = `¡Hola NOVU! Me gustaría realizar el siguiente pedido:

*DATOS DE ENVÍO Y FACTURACIÓN:*
- *Nombre:* ${formData.name}
- *NIT:* ${formData.nit.trim() || 'CF'}
- *Teléfono:* +502 ${formData.phone}
- *Dirección:* ${formData.address}
${formData.references ? `- *Referencias:* ${formData.references}\n` : ''}- *Municipio/Ciudad:* ${formData.city}
- *Departamento:* ${formData.dept}
- *Correo:* ${formData.email}

*DETALLE DEL PEDIDO:*
${orderDetailsText}

${appliedDiscount ? `*Descuento Aplicado (${appliedDiscount.code}):* - Q ${appliedDiscount.amount.toFixed(2)}\n*TOTAL CON DESCUENTO:* Q ${total.toFixed(2)}\n` : ''}
_Espero la confirmación de la orden con el costo de envío._`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/50232316390?text=${encodedText}`;
    setWhatsappLink(whatsappUrl);
    window.open(whatsappUrl, '_blank');

    setFinalTotal(cartTotal);
    setCompletedOrderNumber('NV-' + Math.floor(100000 + Math.random() * 900000));
    setOrderComplete(true);
    setIsSubmitting(false);
    clearCart();
  };

  const handleClose = () => {
    closeCheckout();
    setOrderComplete(false);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className={`modal-overlay ${isCheckoutOpen ? 'active' : ''}`} onClick={handleClose}>
      <div className="checkout-modal" id="checkout-modal-el" onClick={e => e.stopPropagation()}>
        <button className="modal-close close-btn" onClick={handleClose} aria-label="Cerrar">×</button>
        <div className="checkout-modal-content" id="checkout-content-container">
          
          {!orderComplete ? (
            <>
              <h2 className="checkout-title">FINALIZAR COMPRA</h2>
              
              <div className="checkout-grid">
                  <form id="checkout-form-el" className="checkout-form-grid" onSubmit={handleSubmit}>
                      <div className="checkout-section-title">Información de Envío</div>
                      
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="co-name">Nombre Completo</label>
                              <input type="text" id="co-name" required placeholder="Juan Pérez" value={formData.name} onChange={handleChange} />
                          </div>
                      </div>
                      
                      <div className="form-row split">
                          <div className="form-group">
                              <label htmlFor="co-email">
                                  Correo Electrónico {user && <span style={{fontSize: '0.7rem', fontWeight: 400, color: '#888', marginLeft: '5px'}}>(Puedes modificarlo para este pedido)</span>}
                              </label>
                              <input type="email" id="co-email" required placeholder="tu@correo.com" value={formData.email} onChange={handleChange} />
                          </div>
                          <div className="form-group">
                              <label htmlFor="co-phone">Teléfono / WhatsApp (ej. 5555-4444)</label>
                              <input 
                                type="text" 
                                id="co-phone" 
                                required 
                                placeholder="5555-4444" 
                                pattern="[0-9]{4}-[0-9]{4}" 
                                maxLength={9}
                                title="Debe ingresar un número en formato 4444-5555" 
                                value={formData.phone} 
                                onChange={handlePhoneChange} 
                              />
                          </div>
                      </div>

                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="co-nit">NIT para Facturación (Opcional - dejar vacío para CF)</label>
                              <input type="text" id="co-nit" placeholder="Ej. 123456-K" value={formData.nit} onChange={handleNitChange} />
                          </div>
                      </div>
                      
                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="co-address">Dirección Completa (Calle, Avenida, Zona, Casa/Apto)</label>
                              <input type="text" id="co-address" required placeholder="Avenida Las Américas 15-20, Zona 13, Edificio Reforma" value={formData.address} onChange={handleChange} />
                          </div>
                      </div>

                      <div className="form-row">
                          <div className="form-group">
                              <label htmlFor="co-references">Referencias / Detalles Adicionales de Entrega (Opcional)</label>
                              <input 
                                type="text" 
                                id="co-references" 
                                placeholder="Ej. Hay un árbol grande enfrente, rótulo que dice 'Compra aquí', portón negro" 
                                value={formData.references} 
                                onChange={handleChange} 
                              />
                          </div>
                      </div>
                      
                      <div className="form-row split">
                          <div className="form-group">
                              <label htmlFor="co-dept">Departamento</label>
                              <select id="co-dept" required value={formData.dept} onChange={handleChange}>
                                  <option value="" disabled>Selecciona tu departamento</option>
                                  <option value="Alta Verapaz">Alta Verapaz</option>
                                  <option value="Baja Verapaz">Baja Verapaz</option>
                                  <option value="Chimaltenango">Chimaltenango</option>
                                  <option value="Chiquimula">Chiquimula</option>
                                  <option value="El Progreso">El Progreso</option>
                                  <option value="Escuintla">Escuintla</option>
                                  <option value="Guatemala">Guatemala</option>
                                  <option value="Huehuetenango">Huehuetenango</option>
                                  <option value="Izabal">Izabal</option>
                                  <option value="Jalapa">Jalapa</option>
                                  <option value="Jutiapa">Jutiapa</option>
                                  <option value="Petén">Petén</option>
                                  <option value="Quetzaltenango">Quetzaltenango</option>
                                  <option value="Quiché">Quiché</option>
                                  <option value="Retalhuleu">Retalhuleu</option>
                                  <option value="Sacatepéquez">Sacatepéquez</option>
                                  <option value="San Marcos">San Marcos</option>
                                  <option value="Santa Rosa">Santa Rosa</option>
                                  <option value="Sololá">Sololá</option>
                                  <option value="Suchitepéquez">Suchitepéquez</option>
                                  <option value="Totonicapán">Totonicapán</option>
                                  <option value="Zacapa">Zacapa</option>
                              </select>
                          </div>
                          <div className="form-group">
                              <label htmlFor="co-city">Ciudad / Municipio</label>
                              <input type="text" id="co-city" required placeholder="Guatemala" value={formData.city} onChange={handleChange} />
                          </div>
                      </div>
                      
                      <button type="submit" className="confirm-order-btn" style={{ marginTop: '30px', backgroundColor: '#25D366' }} disabled={isSubmitting}>
                          {isSubmitting ? 'PROCESANDO PEDIDO...' : `ENVIAR POR WHATSAPP (Q ${total.toFixed(2)} + Envío)`}
                      </button>
                  </form>
                  
                  <div className="checkout-summary-column">
                      <div className="checkout-section-title">Resumen del Pedido</div>
                      <div className="checkout-summary-items">
                          {cart.map((item, idx) => (
                              <div key={idx} className="co-item">
                                  <div className="co-item-img-wrapper">
                                      <img src={item.image} alt={item.name} />
                                  </div>
                                  <div className="co-item-details">
                                      <span className="co-item-name"><strong>{item.brand}</strong> - {item.name}</span>
                                      <span className="co-item-meta">{item.quantity} uds.</span>
                                  </div>
                                  <span className="co-item-price">Q {(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                          ))}
                      </div>
                      
                      <div className="co-summary-totals">
                          <div className="co-summary-row">
                              <span>Subtotal</span>
                              <span>Q {cartTotal.toFixed(2)}</span>
                          </div>
                          <div className="co-summary-row">
                              <span>Envío</span>
                              <span style={{ color: '#D97706', fontWeight: 600, fontSize: '0.85rem' }}>+ Envío (A cotizar según ubicación)</span>
                          </div>
                          
                          <div style={{ padding: '15px 0', borderTop: '1px solid #e5e5e5', marginTop: '10px' }}>
                              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Código Promocional / Gift Card</label>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                  <input 
                                    type="text" 
                                    value={discountCode}
                                    onChange={e => setDiscountCode(e.target.value)}
                                    placeholder="Ej. VERANO20" 
                                    style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    disabled={!!appliedDiscount || validatingDiscount}
                                  />
                                  {!appliedDiscount ? (
                                      <button type="button" onClick={handleValidateDiscount} disabled={validatingDiscount} style={{ padding: '8px 12px', backgroundColor: '#1c1a17', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                                          {validatingDiscount ? '...' : 'Aplicar'}
                                      </button>
                                  ) : (
                                      <button type="button" onClick={() => { setAppliedDiscount(null); setDiscountCode(''); }} style={{ padding: '8px 12px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                                          Quitar
                                      </button>
                                  )}
                              </div>
                              {discountError && <span style={{ color: '#f44336', fontSize: '0.75rem', marginTop: '5px', display: 'block' }}>{discountError}</span>}
                          </div>
                          
                          {appliedDiscount && (
                              <div className="co-summary-row" style={{ color: '#2e7d32', fontWeight: 600 }}>
                                  <span>Descuento ({appliedDiscount.code})</span>
                                  <span>- Q {appliedDiscount.amount.toFixed(2)}</span>
                              </div>
                          )}

                          <div className="co-summary-row total" style={{ borderTop: '1px solid #e5e5e5', paddingTop: '15px', marginTop: '15px', fontSize: '1.15rem', fontWeight: 700, color: '#121212' }}>
                              <span>Total Productos</span>
                              <span>Q {total.toFixed(2)}</span>
                          </div>
                      </div>
                  </div>
              </div>
            </>
          ) : (
            <div className="order-success-screen" style={{ textAlign: 'center', padding: '20px 0' }}>
                <div className="success-icon-wrapper" style={{ width: '80px', height: '80px', backgroundColor: '#e8f5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg className="success-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '45px', height: '45px' }}>
                        <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2" />
                        <path d="M8 12L11 15L16 9" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                
                <h2 className="success-title" style={{ fontFamily: 'var(--font-primary)', fontSize: '1.6rem', fontWeight: 700, color: '#2e7d32', marginBottom: '15px', letterSpacing: '0.05em' }}>¡PEDIDO REGISTRADO!</h2>
                
                <div style={{ margin: '20px auto 30px', padding: '20px', backgroundColor: '#FEF3C7', border: '2px solid #F59E0B', borderRadius: '10px', maxWidth: '520px', boxShadow: '0 4px 15px rgba(245,158,11,0.15)' }}>
                  <p style={{ fontSize: '0.95rem', color: '#92400E', fontWeight: 700, marginBottom: '14px' }}>
                    ¿Tu navegador no abrió WhatsApp automáticamente?
                  </p>
                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ 
                      display: 'inline-block',
                      backgroundColor: '#25D366', 
                      color: 'white', 
                      padding: '14px 28px', 
                      borderRadius: '8px', 
                      textDecoration: 'none',
                      fontWeight: 800,
                      fontSize: '1rem',
                      letterSpacing: '0.03em',
                      boxShadow: '0 4px 12px rgba(37,211,102,0.4)',
                      transition: 'transform 0.2s'
                    }}
                  >
                    ENVIAR ORDEN POR WHATSAPP AQUÍ
                  </a>
                </div>
                
                {/* Recibo Premium */}
                <div className="receipt-card" style={{ backgroundColor: '#f9f9f9', border: '1px solid #e5e5e5', borderRadius: '8px', maxWidth: '600px', margin: '0 auto 30px', textAlign: 'left', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                    <div className="receipt-header" style={{ backgroundColor: '#121212', color: '#ffffff', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="receipt-brand" style={{ fontFamily: 'var(--font-accent)', fontWeight: 800, letterSpacing: '0.15em', fontSize: '1.1rem' }}>NOVU</span>
                    </div>
                    
                    <div className="receipt-body" style={{ padding: '30px' }}>
                        <div className="receipt-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem' }}>
                            <span className="receipt-label" style={{ color: '#666666', fontWeight: 600 }}>Número de Pedido:</span>
                            <span className="receipt-value" style={{ color: '#121212', fontWeight: 700 }}>{completedOrderNumber}</span>
                        </div>
                        <div className="receipt-divider" style={{ borderTop: '1px dashed #cccccc', margin: '20px 0' }}></div>
                        
                        <div className="receipt-row total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, color: '#121212' }}>
                            <span className="receipt-label">Monto Total:</span>
                            <span className="receipt-value">Q {finalTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                
                {user && earnedStamps > 0 && (
                  <div className="loyalty-success-banner" style={{ background: 'linear-gradient(135deg, #141311 0%, #2b2721 100%)', border: '1.5px solid #C5A059', borderRadius: '8px', padding: '15px 20px', margin: '25px auto', maxWidth: '600px', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '15px', color: '#ffffff', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)' }}>
                      <div>
                          <h4 style={{ fontFamily: 'var(--font-primary)', fontSize: '0.8rem', fontWeight: 700, color: '#C5A059', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>TARJETA DE FIDELIDAD NOVU</h4>
                          <p style={{ fontSize: '0.75rem', color: '#dfd8cb', margin: '3px 0 0 0' }}>¡Sumaste <strong>{earnedStamps} sello(s)</strong>!</p>
                      </div>
                      <div style={{ background: 'radial-gradient(circle, #ffe1aa 0%, #C5A059 100%)', color: '#ffffff', fontFamily: 'var(--font-primary)', fontSize: '0.75rem', fontWeight: 800, width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(197, 160, 89, 0.4)', border: '1.5px solid #ffffff' }}>
                          ★ +{earnedStamps}
                      </div>
                  </div>
                )}
                
                <p className="success-delivery-note" style={{ fontSize: '0.8rem', color: '#2e7d32', fontWeight: 600, marginBottom: '30px' }}>La compra se procesará en cuanto envíes el detalle de WhatsApp.</p>
                
                <button className="finish-checkout-btn" onClick={handleClose} style={{ padding: '16px 45px', backgroundColor: '#121212', color: '#ffffff', border: 'none', fontFamily: 'var(--font-primary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', cursor: 'pointer', transition: 'background-color 0.2s' }}>VOLVER A LA TIENDA</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
