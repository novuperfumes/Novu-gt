import { useCart } from '../../context/CartContext';

export function CartModal() {
  const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart, cartTotal, openCheckout } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    openCheckout();
  };

  return (
    <>
      {/* Overlay del carrito (comparte backdrop) */}
      <div className={`backdrop-overlay ${isCartOpen ? 'active' : ''}`} onClick={closeCart}></div>

      {/* Menú lateral del carrito */}
      <div className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-sidebar-header">
          <h2>TU CARRITO</h2>
          <button className="modal-close close-btn" aria-label="Cerrar carrito" onClick={closeCart}>
            ×
          </button>
        </div>

        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="cart-empty" style={{ textAlign: 'center', padding: '40px 0' }}>
              <svg className="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '48px', height: '48px', margin: '0 auto 15px', color: '#999' }}>
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="cart-empty-text">Tu carrito de compras está vacío.</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={`${item.id}-${index}`}>
                <div className="cart-item-image-wrapper">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </div>
                <div className="cart-item-details">
                  <span className="cart-item-brand">{item.brand || 'NOVU'}</span>
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-size">{item.size || '100 ml'}</span>
                  <span className="cart-item-price">Q {item.price.toFixed(2)}</span>
                </div>
                <div className="cart-item-controls">
                  <div className="cart-item-qty">
                    <button className="cart-qty-btn minus" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span className="cart-qty-val">{item.quantity}</span>
                    <button className="cart-qty-btn plus" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>Q {cartTotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              FINALIZAR COMPRA
            </button>
          </div>
        )}
      </div>
    </>
  );
}
