import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePerfumes } from '../hooks/usePerfumes';
import type { Perfume } from '../hooks/usePerfumes';
import { useCart } from '../context/CartContext';
import { useCampania } from '../hooks/useCampania';
import { useAuth } from '../context/AuthContext';

interface SizeOption {
  id: string;
  label: string;
  price: number;
  stock: number;
  presentacionId?: number;
  decantId?: number;
  isDecant?: boolean;
}

interface Resenia {
  id: number;
  id_usuario: number;
  calificacion: number;
  comentario: string;
  compra_label?: string;
  fecha: string;
  usuario: { nombre: string; apellido: string };
}

interface ReviewsData {
  resenias: Resenia[];
  promedio: number;
  total: number;
}

interface CanReviewData {
  canReview: boolean;
  existing: Resenia | null;
  compra_label: string | null;
}

function StarSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '6px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontSize: '2rem', color: (hovered || value) >= star ? '#C5A059' : '#555',
            transition: 'transform 0.1s, color 0.15s',
            transform: (hovered || value) >= star ? 'scale(1.15)' : 'scale(1)',
          }}
          aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ value, size = '1.1rem' }: { value: number; size?: string }) {
  return (
    <span style={{ letterSpacing: '2px', fontSize: size }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: value >= s ? '#C5A059' : '#444' }}>★</span>
      ))}
    </span>
  );
}

export function PerfumeDetail() {
  const { id } = useParams<{ id: string }>();
  const { loading, perfumes } = usePerfumes();
  const { addToCart } = useCart();
  const { campania, calcularPrecio } = useCampania();
  const { user } = useAuth();
  
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<string>('');

  // Reviews state
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [canReviewData, setCanReviewData] = useState<CanReviewData | null>(null);
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    if (!loading && id) {
      const found = perfumes.find(p => p.id === parseInt(id, 10));
      if (found) {
        setPerfume(found);
        if (!perfume || perfume.id !== found.id) {
          let firstId = '';
          if (found.presentaciones && found.presentaciones.length > 0) {
            firstId = `pres-${found.presentaciones[0].id}`;
          } else if (found.decant && Number(found.decant.precio_5ml) > 0) {
            firstId = 'decant-5ml';
          } else if (found.decant && Number(found.decant.precio_10ml) > 0) {
            firstId = 'decant-10ml';
            firstId = 'default-100ml';
          }
          setSelectedOptionId(firstId);
          setCurrentImage(found.imagen || '/imagenes/logonovu.jpeg');
        }
      }
    }
  }, [loading, id, perfumes]);

  const fetchReviews = useCallback(async () => {
    if (!id) return;
    try {
      const res = await fetch(`http://localhost:3000/reviews/perfume/${id}`);
      if (res.ok) setReviewsData(await res.json());
    } catch { /* ignore */ }
  }, [id]);

  const fetchCanReview = useCallback(async () => {
    if (!id || !user) return;
    try {
      const res = await fetch(`http://localhost:3000/reviews/can-review/${id}`, { credentials: 'include' });
      if (res.ok) {
        const data: CanReviewData = await res.json();
        setCanReviewData(data);
        if (data.existing) {
          setReviewStars(data.existing.calificacion);
          setReviewComment(data.existing.comentario);
        }
      }
    } catch { /* ignore */ }
  }, [id, user]);

  useEffect(() => {
    fetchReviews();
    fetchCanReview();
  }, [fetchReviews, fetchCanReview]);

  const handleSubmitReview = async () => {
    if (!reviewComment.trim()) return;
    if (reviewComment.length > 400) return;
    setSubmittingReview(true);
    try {
      const res = await fetch(`http://localhost:3000/reviews/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          calificacion: reviewStars,
          comentario: reviewComment.trim(),
          compra_label: canReviewData?.compra_label,
        }),
      });
      if (res.ok) {
        setReviewSuccess(true);
        await fetchReviews();
        await fetchCanReview();
        setTimeout(() => setReviewSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(err.message || 'Error al enviar reseña');
      }
    } catch {
      alert('Error de red al enviar reseña');
    } finally {
      setSubmittingReview(false);
    }
  };

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

  // Extract presentation sizes (bottles) & decants into separate lists
  const bottleOptions: SizeOption[] = [];
  const decantOptions: SizeOption[] = [];

  if (perfume.presentaciones && perfume.presentaciones.length > 0) {
    perfume.presentaciones.forEach((pres) => {
      const sizeLabel = pres.tamanio.toLowerCase().includes('ml') ? pres.tamanio : `${pres.tamanio} ml`;
      bottleOptions.push({
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
      decantOptions.push({
        id: `decant-5ml`,
        label: `Decant 5 ml`,
        price: Number(perfume.decant.precio_5ml),
        stock: perfume.decant.stock_5ml || 10,
        decantId: perfume.decant.id,
        isDecant: true,
      });
    }
    if (perfume.decant.precio_10ml && Number(perfume.decant.precio_10ml) > 0) {
      decantOptions.push({
        id: `decant-10ml`,
        label: `Decant 10 ml`,
        price: Number(perfume.decant.precio_10ml),
        stock: perfume.decant.stock_10ml || 10,
        decantId: perfume.decant.id,
        isDecant: true,
      });
    }
  }

  if (bottleOptions.length === 0 && decantOptions.length === 0) {
    bottleOptions.push({
      id: 'default-100ml',
      label: '100 ml',
      price: 0,
      stock: 1,
    });
  }

  const allOptions = [...bottleOptions, ...decantOptions];
  const currentOption = allOptions.find(opt => opt.id === selectedOptionId) || allOptions[0];

  const handleAddToCart = () => {
    if (!perfume) return;
    const { precioFinal } = calcularPrecio(perfume, currentOption.price);
    
    addToCart({
      id: `${perfume.id}-${currentOption.id}`,
      brand: perfume.marca,
      name: perfume.nombre,
      price: precioFinal,
      quantity: quantity,
      size: currentOption.label,
      presentacionId: currentOption.presentacionId,
      decantId: currentOption.decantId,
      isDecant: currentOption.isDecant,
      image: perfume.imagen || '/imagenes/logonovu.jpeg'
    });
  };

  const normCat = (perfume.categoria || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const isNicho = normCat.includes('nicho');
  const catPath = normCat.includes('nicho') ? '/nicho' : normCat.includes('arabe') ? '/arabe' : '/disenador';

  const theme = isNicho ? {
    bg: '#121212', text: '#ffffff', textMuted: '#aaaaaa',
    cardBg: '#1a1a1a', cardBorder: '1px solid #2a2a2a',
    btnUnselectedBg: '#1a1a1a', btnUnselectedText: '#ffffff', btnUnselectedBorder: '1px solid #333333',
    btnSelectedBg: '#C5A059', btnSelectedText: '#000000', btnSelectedBorder: '2px solid #C5A059',
    btnSelectedShadow: '0 0 15px rgba(197, 160, 89, 0.4)',
    boxBg: '#1a1a1a', boxBorder: '1px solid #2a2a2a',
    qtyBg: '#121212', qtyText: '#ffffff',
    addToCartBg: '#C5A059', addToCartText: '#000000',
    addToCartHoverBg: '#ffffff', addToCartHoverText: '#000000',
    reviewBg: '#1a1a1a', reviewBorder: '1px solid #2a2a2a', reviewMuted: '#888',
  } : {
    bg: '#ffffff', text: '#121212', textMuted: '#555555',
    cardBg: '#f9f9f9', cardBorder: '1px solid #e5e5e5',
    btnUnselectedBg: '#ffffff', btnUnselectedText: '#121212', btnUnselectedBorder: '1px solid #e5e5e5',
    btnSelectedBg: '#121212', btnSelectedText: '#C5A059', btnSelectedBorder: '2px solid #121212',
    btnSelectedShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    boxBg: '#f9f9f9', boxBorder: '1px solid #e5e5e5',
    qtyBg: '#ffffff', qtyText: '#121212',
    addToCartBg: '#121212', addToCartText: '#C5A059',
    addToCartHoverBg: '#C5A059', addToCartHoverText: '#000000',
    reviewBg: '#f9f9f9', reviewBorder: '1px solid #e8e2d9', reviewMuted: '#888',
  };

  const isEditing = !!canReviewData?.existing;

  const allImages = [perfume.imagen || '/imagenes/logonovu.jpeg', ...(perfume.galeria || [])].filter((img, i, arr) => img && arr.indexOf(img) === i);
  const currentIndex = allImages.indexOf(currentImage) !== -1 ? allImages.indexOf(currentImage) : 0;

  const handlePrevImage = () => {
    const prevIdx = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentImage(allImages[prevIdx]);
  };

  const handleNextImage = () => {
    const nextIdx = (currentIndex + 1) % allImages.length;
    setCurrentImage(allImages[nextIdx]);
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
              position: 'relative',
              backgroundColor: theme.cardBg,
              borderRadius: '16px',
              padding: '25px',
              border: theme.cardBorder,
              boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
              textAlign: 'center',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {allImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Imagen anterior"
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: isNicho ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)',
                    color: isNicho ? '#ffffff' : '#121212',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#C5A059';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = isNicho ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)';
                    e.currentTarget.style.color = isNicho ? '#ffffff' : '#121212';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              )}

              <img 
                src={currentImage} 
                alt={perfume.nombre} 
                style={{ 
                  width: '100%', 
                  maxHeight: '460px', 
                  objectFit: 'contain',
                  filter: isNicho ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' : 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
                  transition: 'transform 0.3s'
                }} 
              />

              {allImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Imagen siguiente"
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: isNicho ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)',
                    color: isNicho ? '#ffffff' : '#121212',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#C5A059';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = isNicho ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)';
                    e.currentTarget.style.color = isNicho ? '#ffffff' : '#121212';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              )}
            </div>
            
            {/* Image Gallery Thumbnails */}
            {perfume.galeria && perfume.galeria.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div 
                  onClick={() => setCurrentImage(perfume.imagen || '/imagenes/logonovu.jpeg')}
                  style={{
                    width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                    border: currentImage === (perfume.imagen || '/imagenes/logonovu.jpeg') ? '2px solid #C5A059' : theme.cardBorder,
                    opacity: currentImage === (perfume.imagen || '/imagenes/logonovu.jpeg') ? 1 : 0.6,
                    transition: 'all 0.2s'
                  }}
                >
                  <img src={perfume.imagen || '/imagenes/logonovu.jpeg'} alt="Principal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {perfume.galeria.map((img: string, idx: number) => (
                  <div 
                    key={idx}
                    onClick={() => setCurrentImage(img)}
                    style={{
                      width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                      border: currentImage === img ? '2px solid #C5A059' : theme.cardBorder,
                      opacity: currentImage === img ? 1 : 0.6,
                      transition: 'all 0.2s'
                    }}
                  >
                    <img src={img} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Size Selection */}
          <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            <div>
              <Link 
                to={`/todas?q=${encodeURIComponent(perfume.marca)}`}
                style={{ 
                  color: '#C5A059', 
                  letterSpacing: '3px', 
                  fontSize: '0.85rem', 
                  fontWeight: 700, 
                  marginBottom: '10px', 
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-block',
                  cursor: 'pointer'
                }}
                title={`Ver perfumes de ${perfume.marca}`}
              >
                {perfume.marca}
              </Link>
            </div>

            <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '2.4rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.2, color: theme.text }}>
              {perfume.nombre}
            </h1>

            {/* Rating summary inline */}
            {reviewsData && reviewsData.total > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <StarDisplay value={Math.round(reviewsData.promedio)} />
                <span style={{ fontSize: '0.88rem', color: theme.textMuted }}>
                  {reviewsData.promedio.toFixed(1)} ({reviewsData.total} {reviewsData.total === 1 ? 'reseña' : 'reseñas'})
                </span>
              </div>
            )}

            <p style={{ fontSize: '0.9rem', color: theme.textMuted, marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Colección: <Link to={catPath} style={{ color: '#C5A059', fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }} title={`Ir a la colección ${perfume.categoria}`}>{perfume.categoria}</Link>
            </p>

            <p style={{ fontSize: '0.95rem', color: theme.textMuted, lineHeight: '1.7', marginBottom: '30px' }}>
              {perfume.descripcion || 'Una fragancia sofisticada y de alta fijación, ideal para destacar en cualquier ocasión.'}
            </p>

            <hr style={{ borderColor: isNicho ? '#2a2a2a' : '#e5e5e5', marginBottom: '30px' }} />

            {/* Divided Sizes & Presentations Selector */}
            <div style={{ marginBottom: '35px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* SECTION 1: BOTTLES / FULL PRESENTATIONS */}
              {bottleOptions.length > 0 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.2px', color: theme.text, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Presentaciones (Botella Completa):
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#C5A059', fontWeight: 600 }}>
                      {bottleOptions.length} {bottleOptions.length === 1 ? 'opción' : 'opciones'}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
                    {bottleOptions.map((opt) => {
                      const isSelected = currentOption?.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedOptionId(opt.id)}
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
              )}

              {/* SECTION 2: DECANTS / SAMPLES */}
              {decantOptions.length > 0 && (
                <div style={{
                  padding: '16px 18px',
                  borderRadius: '12px',
                  backgroundColor: isNicho ? 'rgba(197, 160, 89, 0.06)' : '#f3f4f6',
                  border: isNicho ? '1px dashed rgba(197, 160, 89, 0.35)' : '1px dashed #d1d5db'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.2px', color: theme.text, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Decants y Muestras de Selección:
                    </span>
                    <span style={{ fontSize: '0.72rem', backgroundColor: '#C5A059', color: '#000', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                      Formato Fraccionado
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
                    {decantOptions.map((opt) => {
                      const isSelected = currentOption?.id === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedOptionId(opt.id)}
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
              )}

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

        {/* ========== REVIEWS SECTION ========== */}
        <div style={{ marginTop: '60px', borderTop: isNicho ? '1px solid #2a2a2a' : '1px solid #e5e5e5', paddingTop: '40px' }}>
          
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: '1.5rem', fontWeight: 700,
            color: theme.text, marginBottom: '30px', letterSpacing: '1px'
          }}>
            Reseñas y Opiniones
            {reviewsData && reviewsData.total > 0 && (
              <span style={{
                marginLeft: '14px', fontSize: '1rem', fontWeight: 400,
                color: '#C5A059', verticalAlign: 'middle'
              }}>
                ★ {reviewsData.promedio.toFixed(1)} · {reviewsData.total} {reviewsData.total === 1 ? 'reseña' : 'reseñas'}
              </span>
            )}
          </h2>

          {/* === REVIEW FORM (only if user logged in and has confirmed purchase) === */}
          {user && canReviewData?.canReview && (
            <div style={{
              background: theme.reviewBg,
              border: isNicho ? '1px solid #2a2a2a' : '1px solid #e8e2d9',
              borderRadius: '14px',
              padding: '28px',
              marginBottom: '36px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C5A059, #8a6e30)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: '1rem'
                }}>
                  {user.nombre.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: theme.text, fontSize: '0.95rem' }}>
                    {isEditing ? 'Edita tu reseña' : 'Deja tu reseña'}
                  </p>
                  {canReviewData.compra_label && (
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#C5A059' }}>
                      Compraste: {canReviewData.compra_label}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <p style={{ margin: '0 0 8px', fontSize: '0.8rem', fontWeight: 700, color: theme.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Tu calificación *
                </p>
                <StarSelector value={reviewStars} onChange={setReviewStars} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: theme.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Tu comentario *
                  </p>
                  <span style={{ fontSize: '0.72rem', color: reviewComment.length > 380 ? '#f97316' : theme.reviewMuted }}>
                    {reviewComment.length}/400
                  </span>
                </div>
                <textarea
                  value={reviewComment}
                  onChange={(e) => {
                    if (e.target.value.length <= 400) setReviewComment(e.target.value);
                  }}
                  placeholder="Cuéntanos tu experiencia con este perfume..."
                  maxLength={400}
                  rows={4}
                  style={{
                    width: '100%', padding: '12px 14px', boxSizing: 'border-box',
                    background: isNicho ? '#121212' : '#fff',
                    border: isNicho ? '1px solid #333' : '1px solid #ddd',
                    borderRadius: '8px', color: theme.text, fontSize: '0.9rem',
                    resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6, outline: 'none',
                  }}
                />
              </div>

              {reviewSuccess && (
                <div style={{
                  padding: '10px 14px', borderRadius: '8px', marginBottom: '12px',
                  background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                  color: '#22c55e', fontSize: '0.85rem', fontWeight: 600
                }}>
                  ✓ {isEditing ? 'Reseña actualizada' : 'Reseña publicada'} con éxito
                </div>
              )}

              <button
                onClick={handleSubmitReview}
                disabled={submittingReview || !reviewComment.trim()}
                style={{
                  padding: '12px 28px',
                  background: (!reviewComment.trim() || submittingReview) ? '#555' : '#C5A059',
                  color: '#000', border: 'none', borderRadius: '8px',
                  fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.08em',
                  cursor: (!reviewComment.trim() || submittingReview) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s', textTransform: 'uppercase'
                }}
              >
                {submittingReview ? 'Enviando...' : isEditing ? 'Actualizar reseña' : 'Publicar reseña'}
              </button>
            </div>
          )}

          {/* Mensaje para usuarios sin compra confirmada */}
          {user && canReviewData && !canReviewData.canReview && (
            <div style={{
              padding: '16px 20px', borderRadius: '10px', marginBottom: '28px',
              background: isNicho ? '#1a1a1a' : '#f9f5ee',
              border: isNicho ? '1px solid #333' : '1px solid #e8d9b5',
              color: theme.textMuted, fontSize: '0.85rem'
            }}>
              Solo los clientes que hayan comprado este perfume y tengan la orden confirmada pueden dejar una reseña.
            </div>
          )}

          {/* Invitacion a loguearse */}
          {!user && (
            <div style={{
              padding: '16px 20px', borderRadius: '10px', marginBottom: '28px',
              background: isNicho ? '#1a1a1a' : '#f9f5ee',
              border: isNicho ? '1px solid #333' : '1px solid #e8d9b5',
              color: theme.textMuted, fontSize: '0.85rem'
            }}>
              <Link to="/login" style={{ color: '#C5A059', fontWeight: 700, textDecoration: 'none' }}>Inicia sesión</Link> para poder dejar una reseña si compraste este perfume.
            </div>
          )}

          {/* === REVIEWS LIST === */}
          {reviewsData && reviewsData.resenias.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reviewsData.resenias.map((r) => (
                <div key={r.id} style={{
                  background: theme.reviewBg,
                  border: theme.reviewBorder,
                  borderRadius: '12px',
                  padding: '20px 24px',
                  position: 'relative',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #C5A059, #8a6e30)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0
                      }}>
                        {r.usuario.nombre.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span style={{ fontWeight: 700, color: theme.text, fontSize: '0.9rem' }}>
                          {r.usuario.nombre} {r.usuario.apellido}
                        </span>
                        {r.compra_label && (
                          <span style={{
                            display: 'inline-block', marginLeft: '8px',
                            fontSize: '0.7rem', background: isNicho ? '#2a2a2a' : '#f0ebe2',
                            color: '#C5A059', padding: '2px 8px', borderRadius: '10px', fontWeight: 600
                          }}>
                            {r.compra_label}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <StarDisplay value={r.calificacion} size="1rem" />
                      <span style={{ fontSize: '0.75rem', color: theme.reviewMuted }}>
                        {new Date(r.fecha).toLocaleDateString('es-GT', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <p style={{ margin: 0, color: theme.textMuted, fontSize: '0.9rem', lineHeight: 1.65 }}>
                    {r.comentario}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: theme.textMuted, fontSize: '0.9rem', textAlign: 'center', padding: '30px 0' }}>
              Este perfume aún no tiene reseñas. ¡Sé el primero en compartir tu experiencia!
            </p>
          )}

        </div>
        {/* ========== END REVIEWS SECTION ========== */}

      </div>
    </main>
  );
}
