import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePerfumes } from '../hooks/usePerfumes';
import type { Perfume } from '../hooks/usePerfumes';
import { useCart } from '../context/CartContext';
import { useCampania } from '../hooks/useCampania';

interface SizeOption {
  id: string;
  label: string;
  price: number;
  stock: number;
  presentacionId?: number;
  decantId?: number;
  isDecant?: boolean;
}

export function PerfumeDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, perfumes } = usePerfumes();
  const { addToCart } = useCart();
  const { campania, calcularPrecio } = useCampania();
  
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!loading && id) {
      const found = perfumes.find(p => p.id === parseInt(id, 10));
      if (found) {
        // Only reset the selected option index if we are loading a different perfume
        if (!perfume || perfume.id !== found.id) {
          setPerfume(found);
          setSelectedOptionIndex(0);
        } else {
          setPerfume(found); // update perfume data in case it changed (e.g. from admin)
        }
      }
    }
  }, [loading, id, perfumes]);

  if (loading) {
    return (
      <main className="detail-main" style={{ padding: '120px 20px', textAlign: 'center', backgroundColor: '#121212', color: '#fff', minHeight: '80vh' }}>
        <h2 style={{ color: '#C5A059' }}>Cargando detalles...</h2>
      </main>
    );
  }

  if (!perfume) {
    return (
      <main className="detail-main" style={{ padding: '120px 20px', textAlign: 'center', backgroundColor: '#121212', color: '#fff', minHeight: '80vh' }}>
        <h2>Perfume no encontrado</h2>
        <Link to="/" style={{ color: '#C5A059', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
          Volver al inicio
        </Link>
      </main>
    );
  }

  // Extract all available presentation sizes & decants
  const options: SizeOption[] = [];

  if (perfume.presentaciones && perfume.presentaciones.length > 0) {
    perfume.presentaciones.forEach((pres) => {
      const sizeLabel = pres.tamanio.toLowerCase().includes('ml') ? pres.tamanio : `${pres.tamanio} ml`;
      options.push({
        id: `pres-${pres.id}`,
        label: sizeLabel,
        price: Number(pres.precio),
        stock: pres.stock,
        presentacionId: pres.id,
        isDecant: false,
      });
    });
  }

  if (perfume.decant) {
    if (perfume.decant.precio_5ml && Number(perfume.decant.precio_5ml) > 0) {
      options.push({
        id: `decant-5ml`,
        label: `Decant 5 ml`,
        price: Number(perfume.decant.precio_5ml),
        stock: perfume.decant.stock_5ml || 10,
        decantId: perfume.decant.id,
        isDecant: true,
      });
    }
    if (perfume.decant.precio_10ml && Number(perfume.decant.precio_10ml) > 0) {
      options.push({
        id: `decant-10ml`,
        label: `Decant 10 ml`,
        price: Number(perfume.decant.precio_10ml),
        stock: perfume.decant.stock_10ml || 10,
        decantId: perfume.decant.id,
        isDecant: true,
      });
    }
  }

  // Fallback if no sizes configured
  if (options.length === 0) {
    options.push({
      id: 'default-100ml',
      label: '100 ml',
      price: 0,
      stock: 1,
    });
  }

  const currentOption = options[selectedOptionIndex] || options[0];

  const handleAddToCart = () => {
    addToCart({
      id: `${perfume.id}-${currentOption.id}`,
      brand: perfume.marca,
      name: perfume.nombre,
      price: currentOption.price,
      quantity: quantity,
      size: currentOption.label,
      presentacionId: currentOption.presentacionId,
      decantId: currentOption.decantId,
      isDecant: currentOption.isDecant,
      image: perfume.imagen || '/imagenes/logonovu.jpeg'
    });
  };

  const isNicho = perfume.categoria?.toLowerCase().includes('nicho');
  const genderLabel = perfume.genero === 'el' ? 'Él' : perfume.genero === 'ella' ? 'Ella' : 'Unisex';
  
  // Calculate correct category path based on category string
  const catParam = perfume.categoria?.toLowerCase() || '';
  const catPath = catParam.includes('nicho') ? '/nicho' : catParam.includes('arabe') ? '/arabe' : '/disenador';

  // Theme colors based on category
  const theme = isNicho ? {
    bg: '#121212',
    text: '#ffffff',
    textMuted: '#aaaaaa',
    cardBg: '#1a1a1a',
    cardBorder: '1px solid #2a2a2a',
    btnUnselectedBg: '#1a1a1a',
    btnUnselectedText: '#ffffff',
    btnUnselectedBorder: '1px solid #333333',
    btnSelectedBg: '#C5A059',
    btnSelectedText: '#000000',
    btnSelectedBorder: '2px solid #C5A059',
    btnSelectedShadow: '0 0 15px rgba(197, 160, 89, 0.4)',
    boxBg: '#1a1a1a',
    boxBorder: '1px solid #2a2a2a',
    qtyBg: '#121212',
    qtyText: '#ffffff',
    addToCartBg: '#C5A059',
    addToCartText: '#000000',
    addToCartHoverBg: '#ffffff',
    addToCartHoverText: '#000000'
  } : {
    bg: '#ffffff',
    text: '#121212',
    textMuted: '#555555',
    cardBg: '#f9f9f9',
    cardBorder: '1px solid #e5e5e5',
    btnUnselectedBg: '#ffffff',
    btnUnselectedText: '#121212',
    btnUnselectedBorder: '1px solid #e5e5e5',
    btnSelectedBg: '#121212',
    btnSelectedText: '#C5A059',
    btnSelectedBorder: '2px solid #121212',
    btnSelectedShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    boxBg: '#f9f9f9',
    boxBorder: '1px solid #e5e5e5',
    qtyBg: '#ffffff',
    qtyText: '#121212',
    addToCartBg: '#121212',
    addToCartText: '#C5A059',
    addToCartHoverBg: '#C5A059',
    addToCartHoverText: '#000000'
  };

  return (
    <main style={{ backgroundColor: theme.bg, color: theme.text, paddingTop: '110px', paddingBottom: '80px', minHeight: '90vh', transition: 'background-color 0.3s' }}>
      <div className="section-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '30px', fontSize: '0.85rem', color: theme.textMuted }}>
          <Link to="/" style={{ color: theme.textMuted, textDecoration: 'none' }}>Inicio</Link> &nbsp;/&nbsp; 
          <Link to={catPath} style={{ color: '#C5A059', textDecoration: 'none' }}>{perfume.categoria.toUpperCase()}</Link> &nbsp;/&nbsp; 
          <span style={{ color: theme.text, fontWeight: 600 }}>{perfume.nombre}</span>
        </div>

        <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* Left Column: Image Card */}
          <div style={{ flex: '1 1 450px', maxWidth: '550px' }}>
            <div style={{
              backgroundColor: theme.cardBg,
              borderRadius: '16px',
              padding: '25px',
              border: theme.cardBorder,
              boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
              textAlign: 'center'
            }}>

              <img 
                src={perfume.imagen || '/imagenes/logonovu.jpeg'} 
                alt={perfume.nombre} 
                style={{ 
                  width: '100%', 
                  maxHeight: '460px', 
                  objectFit: 'contain',
                  filter: isNicho ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' : 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
                  transition: 'transform 0.3s'
                }} 
              />
            </div>
          </div>

          {/* Right Column: Product Info & Size Selection */}
          <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            <div style={{ color: '#C5A059', letterSpacing: '3px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase' }}>
              {perfume.marca}
            </div>

            <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: '2.4rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.2, color: theme.text }}>
              {perfume.nombre}
            </h1>

            <p style={{ fontSize: '0.9rem', color: theme.textMuted, marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Colección: <strong style={{ color: '#C5A059' }}>{perfume.categoria}</strong>
            </p>

            <p style={{ fontSize: '0.95rem', color: theme.textMuted, lineHeight: '1.7', marginBottom: '30px' }}>
              {perfume.descripcion || 'Una fragancia sofisticada y de alta fijación, ideal para destacar en cualquier ocasión.'}
            </p>

            <hr style={{ borderColor: isNicho ? '#2a2a2a' : '#e5e5e5', marginBottom: '30px' }} />

            {/* Sizes & Presentations Selector */}
            <div style={{ marginBottom: '35px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', color: theme.text, textTransform: 'uppercase' }}>
                  Selecciona Tamaño / Presentación:
                </span>
                <span style={{ fontSize: '0.8rem', color: '#C5A059', fontWeight: 600 }}>
                  {options.length} {options.length === 1 ? 'opción disponible' : 'opciones disponibles'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
                {options.map((opt, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOptionIndex(idx)}
                      style={{
                        padding: '12px 10px',
                        backgroundColor: isSelected ? theme.btnSelectedBg : theme.btnUnselectedBg,
                        color: isSelected ? theme.btnSelectedText : theme.btnUnselectedText,
                        border: isSelected ? theme.btnSelectedBorder : theme.btnUnselectedBorder,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? theme.btnSelectedShadow : 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '4px' }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: isSelected ? 0.95 : 0.7 }}>
                        Q {opt.price.toFixed(2)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price & Quantity & Add to Cart */}
            <div style={{ backgroundColor: theme.boxBg, padding: '25px', borderRadius: '12px', border: theme.boxBorder }}>
              <div style={{ marginBottom: '20px' }}>
                {perfume && (() => {
                  const pc = calcularPrecio(perfume, currentOption.price * quantity);
                  const unitPc = calcularPrecio(perfume, currentOption.price);
                  return pc.tieneDescuento ? (
                    <div>
                      <span className="discount-badge" style={{ marginBottom: '6px', display: 'inline-block' }}>{pc.porcentaje}% OFF</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '1.3rem', color: '#aaa', textDecoration: 'line-through', fontWeight: 600 }}>
                          Q {(currentOption.price * quantity).toFixed(2)}
                        </span>
                        <span style={{ fontSize: '2.1rem', fontWeight: 800, color: '#C5A059' }}>
                          Q {pc.precioFinal.toFixed(2)}
                        </span>
                      </div>
                      {quantity > 1 && (
                        <span style={{ fontSize: '0.85rem', color: theme.textMuted }}>
                          (Q {unitPc.precioFinal.toFixed(2)} c/u)
                        </span>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
                      <span style={{ fontSize: '2.1rem', fontWeight: 800, color: '#C5A059' }}>
                        Q {(currentOption.price * quantity).toFixed(2)}
                      </span>
                      {quantity > 1 && (
                        <span style={{ fontSize: '0.85rem', color: theme.textMuted }}>
                          (Q {currentOption.price.toFixed(2)} c/u)
                        </span>
                      )}
                    </div>
                  );
                })()}
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* Quantity Controls */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: theme.qtyBg,
                  border: isNicho ? '1px solid #333' : '1px solid #ddd',
                  borderRadius: '6px',
                  height: '50px'
                }}>
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    style={{ background: 'none', border: 'none', color: theme.qtyText, padding: '0 15px', fontSize: '1.2rem', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0 10px', fontSize: '1rem', fontWeight: 700, minWidth: '30px', textAlign: 'center', color: theme.qtyText }}>
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    style={{ background: 'none', border: 'none', color: theme.qtyText, padding: '0 15px', fontSize: '1.2rem', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    backgroundColor: theme.addToCartBg,
                    color: theme.addToCartText,
                    height: '50px',
                    border: 'none',
                    borderRadius: '6px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    letterSpacing: '1.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = theme.addToCartHoverBg;
                    e.currentTarget.style.color = theme.addToCartHoverText;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = theme.addToCartBg;
                    e.currentTarget.style.color = theme.addToCartText;
                  }}
                >
                  AGREGAR AL CARRITO ({currentOption.label})
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
