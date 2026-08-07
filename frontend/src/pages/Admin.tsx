import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EstadisticasDashboard } from '../components/admin/EstadisticasDashboard';
import { BannersTab } from '../components/admin/BannersTab';

export function Admin() {
  const [activeTab, setActiveTab] = useState('metrics');

  return (
    <div className="admin-page-container" style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ height: '100%', display: 'flex', flexDirection: 'column', width: '260px', backgroundColor: '#1c1a17', color: '#ffffff', borderRight: '1.5px solid #C5A059', flexShrink: 0, boxSizing: 'border-box' }}>
        <div className="admin-sidebar-header" style={{ padding: '30px 25px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <span className="admin-logo" style={{ display: 'block', fontFamily: '"Montserrat", sans-serif', fontSize: '1.15rem', fontWeight: 800, color: '#C5A059', letterSpacing: '0.15em', marginBottom: '5px' }}>NOVU ADMIN</span>
          <span className="admin-role" style={{ display: 'block', fontFamily: '"Montserrat", sans-serif', fontSize: '0.6rem', fontWeight: 600, color: '#a8a297', letterSpacing: '0.1em', textTransform: 'uppercase' }}>BUSINESS INTELLIGENCE</span>
        </div>
        <nav className="admin-nav" style={{ flex: 1, padding: '20px 15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button className={`admin-nav-item ${activeTab === 'metrics' ? 'active' : ''}`} onClick={() => setActiveTab('metrics')}>
            <svg className="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
            </svg>
            Métricas de BI
          </button>
          <button className={`admin-nav-item ${activeTab === 'loyalty' ? 'active' : ''}`} onClick={() => setActiveTab('loyalty')}>
            <svg className="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Gestión Fidelidad
          </button>
          <button className={`admin-nav-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            <svg className="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Historial de Pedidos
          </button>
          <button className={`admin-nav-item ${activeTab === 'catalog' ? 'active' : ''}`} onClick={() => setActiveTab('catalog')}>
            <svg className="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Administrar Catálogo
          </button>
          <button className={`admin-nav-item ${activeTab === 'promotions' ? 'active' : ''}`} onClick={() => setActiveTab('promotions')}>
            <svg className="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Promociones
          </button>
          <button className={`admin-nav-item ${activeTab === 'campanias' ? 'active' : ''}`} onClick={() => setActiveTab('campanias')}>
            <svg className="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Campañas / Bazar
          </button>
          <button className={`admin-nav-item ${activeTab === 'estadisticas' ? 'active' : ''}`} onClick={() => setActiveTab('estadisticas')}>
            <svg className="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            Estadísticas
          </button>
          <button className={`admin-nav-item ${activeTab === 'banners' ? 'active' : ''}`} onClick={() => setActiveTab('banners')}>
            <svg className="admin-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Banners Carrusel
          </button>
        </nav>
        <div className="admin-sidebar-footer" style={{ padding: '25px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
          <Link to="/" className="admin-logout-btn" style={{ textAlign: 'center', textDecoration: 'none', display: 'block', boxSizing: 'border-box' }}>VOLVER A LA TIENDA</Link>
        </div>
      </aside>

      {/* Content Area */}
      <main className="admin-content-area" id="admin-tab-content-container" style={{ flex: 1, padding: '35px 40px', overflowY: 'auto', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
        <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '1.8rem', fontWeight: 700, color: '#1c1a17', marginBottom: '20px' }}>
          {activeTab === 'metrics' && 'Métricas de Business Intelligence'}
          {activeTab === 'loyalty' && 'Gestión de Fidelidad de Clientes'}
          {activeTab === 'history' && 'Historial de Pedidos'}
          {activeTab === 'catalog' && 'Administración de Catálogo'}
          {activeTab === 'promotions' && 'Promociones y Gift Cards'}
          {activeTab === 'campanias' && 'Campañas de Descuento'}
          {activeTab === 'estadisticas' && 'Estadísticas Avanzadas'}
          {activeTab === 'banners' && 'Banners Principales'}
        </h2>
        {activeTab === 'metrics' && <MetricsTab />}
        {activeTab === 'loyalty' && <LoyaltyTab />}
        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'catalog' && <CatalogTab />}
        {activeTab === 'promotions' && <PromotionsTab />}
        {activeTab === 'campanias' && <CampaniasTab />}
        {activeTab === 'estadisticas' && <EstadisticasDashboard />}
        {activeTab === 'banners' && <BannersTab />}
      </main>
    </div>
  );
}

function MetricsTab() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/users/admin/metrics', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando métricas...</p>;
  if (!metrics) return <p>Error al cargar métricas.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      <div style={{ padding: '25px', backgroundColor: '#fdfbf7', border: '1px solid #e5e5e5', borderRadius: '8px', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Ventas Totales</h4>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#C5A059' }}>Q{Number(metrics.totalSales).toFixed(2)}</div>
      </div>
      <div style={{ padding: '25px', backgroundColor: '#fdfbf7', border: '1px solid #e5e5e5', borderRadius: '8px', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Pedidos</h4>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1c1a17' }}>{metrics.totalOrders}</div>
      </div>
      <div style={{ padding: '25px', backgroundColor: '#fdfbf7', border: '1px solid #e5e5e5', borderRadius: '8px', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Clientes</h4>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1c1a17' }}>{metrics.totalUsers}</div>
      </div>
      <div style={{ padding: '25px', backgroundColor: '#fdfbf7', border: '1px solid #e5e5e5', borderRadius: '8px', textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Catálogo</h4>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1c1a17' }}>{metrics.totalPerfumes}</div>
      </div>
    </div>
  );
}

function LoyaltyTab() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [pendingSellos, setPendingSellos] = useState<number>(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    try {
      const res = await fetch(`http://localhost:3000/users/search?q=${encodeURIComponent(query)}`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
        console.error('API Error:', data);
      }
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      setHasSearched(true);
    }
  };

  const handleUpdateSellos = async (userId: number, sellos: number) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}/sellos`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ sellos })
      });
      if (res.ok) {
        const data = await res.json();
        const updatedUser = data.user;
        const gcCreated = data.giftCardCreated;
        
        setResults(results.map(r => {
          if (r.id === userId) {
            return {
              ...r,
              sellos: updatedUser.sellos,
              giftCards: gcCreated ? [gcCreated, ...(r.giftCards || [])] : r.giftCards
            };
          }
          return r;
        }));
        
        if (gcCreated) {
           alert(`¡Tarjeta llena! Se ha reiniciado y se generó la Gift Card: ${gcCreated.codigo}`);
        } else {
           alert('Sellos guardados correctamente');
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Error al actualizar sellos: ${errData.message || 'Error desconocido'}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Error de conexión al actualizar sellos: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar por correo, ID o código de Gift Card..."
          style={{ flex: 1, padding: '12px 15px', border: '1px solid #e5e5e5', borderRadius: '4px', fontSize: '0.9rem' }}
        />
        <button type="submit" style={{ padding: '12px 25px', backgroundColor: '#1c1a17', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>Buscar</button>
      </form>

      {results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {results.map(user => {
            const isEditing = editingUserId === user.id;
            const currentSellos = isEditing ? pendingSellos : (user.sellos || 0);

            return (
            <div key={user.id} style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '25px' }}>
              {/* Header del usuario */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{user.nombre} {user.apellido}</h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>ID: {user.id} | {user.correo}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Sellos</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#C5A059' }}>{user.sellos || 0} / 6</div>
                </div>
              </div>

              {/* Tarjeta Visual */}
              <div style={{ 
                background: 'linear-gradient(135deg, #1c1a17 0%, #2a2520 100%)', 
                padding: '24px', 
                borderRadius: '14px', 
                border: '1px solid #C5A059', 
                marginBottom: '20px',
                maxWidth: '420px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ color: '#C5A059', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: '"Montserrat", sans-serif' }}>NOVU VIP LOYALTY</span>
                  {!isEditing ? (
                    <button
                      onClick={() => { setEditingUserId(user.id); setPendingSellos(user.sellos || 0); }}
                      style={{ padding: '5px 14px', backgroundColor: 'transparent', color: '#C5A059', border: '1px solid #C5A059', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                    >Editar Sellos</button>
                  ) : (
                    <span style={{ color: '#C5A059', fontSize: '0.75rem', fontStyle: 'italic' }}>Haz clic para seleccionar</span>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', justifyItems: 'center' }}>
                  {[1, 2, 3, 4, 5, 6].map(num => {
                    const isStamped = currentSellos >= num;
                    return (
                      <div 
                        key={num}
                        onClick={() => {
                          if (!isEditing) return;
                          const newSellos = isStamped ? num - 1 : num;
                          setPendingSellos(newSellos);
                        }}
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          border: isStamped ? '2px solid #C5A059' : '2px dashed #555',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: isEditing ? 'pointer' : 'default',
                          backgroundColor: isStamped ? '#C5A059' : 'rgba(255,255,255,0.03)',
                          color: isStamped ? '#1c1a17' : '#777',
                          transition: 'all 0.2s ease',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          opacity: !isEditing ? 0.9 : 1,
                          boxShadow: isStamped ? '0 0 10px rgba(197, 160, 89, 0.4)' : 'none'
                        }}
                      >
                        {isStamped ? '\u2605' : num}
                      </div>
                    )
                  })}
                </div>
                {isEditing && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button
                      onClick={() => { handleUpdateSellos(user.id, pendingSellos); setEditingUserId(null); }}
                      style={{ flex: 1, padding: '10px', backgroundColor: '#C5A059', color: '#1c1a17', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}
                    >Guardar ({pendingSellos} sellos)</button>
                    <button
                      onClick={() => setEditingUserId(null)}
                      style={{ padding: '10px 16px', backgroundColor: 'transparent', color: '#aaa', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                    >Cancelar</button>
                  </div>
                )}
                {!isEditing && (
                  <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.75rem', color: '#999' }}>
                    {(user.sellos || 0) === 0 && 'Sin sellos acumulados'}
                    {(user.sellos || 0) > 0 && (user.sellos || 0) < 5 && `Faltan ${6 - (user.sellos || 0)} sellos para completar la tarjeta`}
                    {(user.sellos || 0) === 5 && '¡Falta solo 1 sello para completar la tarjeta!'}
                  </div>
                )}
              </div>

              {/* Gift Cards del usuario */}
              <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px' }}>
                <h5 style={{ margin: '0 0 10px 0', fontSize: '0.85rem', color: '#333' }}>Gift Cards ({user.giftCards?.length || 0})</h5>
                {(!user.giftCards || user.giftCards.length === 0) && (
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#999' }}>Sin gift cards generadas</p>
                )}
                {user.giftCards?.map((gc: any) => (
                  <div key={gc.id} style={{ fontSize: '0.8rem', marginBottom: '5px', display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontFamily: 'monospace' }}>{gc.codigo}</span>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: gc.activa ? '#2e7d32' : '#999' }}>Q{Number(gc.monto).toFixed(2)}</span>
                      <span style={{ fontSize: '0.7rem', color: gc.activa ? '#2e7d32' : '#f44336' }}>{gc.activa ? 'ACTIVA' : 'USADA'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  );
}

function HistoryTab() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [shippingCosts, setShippingCosts] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = () => {
    fetch('http://localhost:3000/orders/admin/all', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
          // Pre-fill shipping costs from saved order data
          const costs: Record<number, string> = {};
          data.forEach((o: any) => {
            if (o.costo_envio !== undefined && o.costo_envio !== null) {
              costs[o.id] = String(Number(o.costo_envio));
            }
          });
          setShippingCosts(prev => ({ ...costs, ...prev }));
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setOrders([]);
        setLoading(false);
      });
  };

  const handleUpdateStatus = async (orderId: number, newStatus: string, costoEnvio?: number) => {
    try {
      const body: any = { estado: newStatus };
      if (costoEnvio !== undefined) {
        body.costo_envio = costoEnvio;
      }
      const res = await fetch(`http://localhost:3000/orders/admin/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      });
      if (res.ok) {
        alert('Orden actualizada correctamente');
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {orders.map(order => (
          <div key={order.id} style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>Pedido #{order.id}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Fecha: {new Date(order.fecha).toLocaleString()}</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem' }}>
                  Cliente: <strong>{order.usuario?.nombre} {order.usuario?.apellido}</strong> ({order.usuario?.correo})
                </p>
                <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem' }}>
                  Entrega: {order.tipo_entrega} - {order.tipo_entrega === 'domicilio' ? order.direccion_entrega : 'Sucursal ID: ' + order.id_sucursal}
                </p>
                {order.codigoPromocion && (
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#2e7d32', fontWeight: 600 }}>
                    Descuento Promocional: {order.codigoPromocion.codigo}
                  </p>
                )}
                {order.giftCard && (
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#1976d2', fontWeight: 600 }}>
                    Gift Card Aplicada: {order.giftCard.codigo} (-Q{Number(order.giftCard.monto).toFixed(2)})
                  </p>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1c1a17', marginBottom: '10px' }}>
                  Total: Q{Number(order.total).toFixed(2)}
                </div>
                {order.estado === 'PENDIENTE' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.85rem' }}>Costo de Envío (Q):</span>
                      <input 
                        type="number" 
                        value={shippingCosts[order.id] || ''} 
                        onChange={e => setShippingCosts({...shippingCosts, [order.id]: e.target.value})}
                        style={{ padding: '5px', width: '80px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Ej. 35"
                      />
                    </div>
                    <button 
                      onClick={() => handleUpdateStatus(order.id, 'PROCESADO', Number(shippingCosts[order.id] || 0))}
                      style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Confirmar Orden
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(order.id, 'CANCELADO')}
                      style={{ padding: '5px 10px', backgroundColor: 'transparent', color: '#f44336', border: '1px solid #f44336', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Cancelar Orden
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Estado:</span>
                    <select
                      value={order.estado}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.85rem' }}
                    >
                      <option value="PROCESADO">PROCESADO</option>
                      <option value="ENTREGADO">ENTREGADO</option>
                      <option value="CANCELADO">CANCELADO</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h5 style={{ margin: '0 0 10px 0', fontSize: '0.9rem' }}>Artículos:</h5>
              {order.detalles?.map((det: any, idx: number) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '5px 0' }}>
                  <span>{det.cantidad}x {det.presentacion?.perfume?.nombre} ({det.presentacion?.tamanio})</span>
                  <span>Q{(det.cantidad * Number(det.precio_unitario)).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {orders.length === 0 && <p>No hay pedidos registrados.</p>}
      </div>
    </div>
  );
}

function CatalogTab() {
  const [perfumes, setPerfumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('arabe');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [galeria, setGaleria] = useState<string[]>([]);
  const [tipoPresentacion, setTipoPresentacion] = useState('perfume');
  const [costo, setCosto] = useState('');
  const [precio, setPrecio] = useState('');
  const [tamanio, setTamanio] = useState('');
  const [stock, setStock] = useState('10');
  const [genero, setGenero] = useState('unisex');

  // Presentation addition state
  const [addingPresForId, setAddingPresForId] = useState<number | null>(null);
  const [newPresTipo, setNewPresTipo] = useState('perfume');
  const [newPresTamanio, setNewPresTamanio] = useState('');
  const [newPresCosto, setNewPresCosto] = useState('');
  const [newPresPrecio, setNewPresPrecio] = useState('');
  const [newPresStock, setNewPresStock] = useState('10');

  // Edit Size State
  const [editingSizeId, setEditingSizeId] = useState<string | null>(null);
  const [editSizeTamanio, setEditSizeTamanio] = useState('');
  const [editSizeCosto, setEditSizeCosto] = useState('');
  const [editSizePrecio, setEditSizePrecio] = useState('');
  const [editSizeStock, setEditSizeStock] = useState('');
  
  // Helpers for size actions
  const handleEditSizeClick = (type: string, id: number, tamanio: string, precio: any, stock: any, costo?: any) => {
    setEditingSizeId(type + '_' + id);
    const numSize = tamanio ? tamanio.replace(/[^0-9]/g, '') : '';
    setEditSizeTamanio(numSize);
    setEditSizePrecio(precio?.toString() || '');
    setEditSizeStock(stock?.toString() || '');
    setEditSizeCosto(costo?.toString() || '');
  };

  const handleUpdateSize = async (perfumeId: number, type: string, originalId: number) => {
    try {
      if (type === 'pres') {
        const res = await fetch(`http://localhost:3000/perfumes/presentaciones/${originalId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            tamanio: editSizeTamanio ? `${editSizeTamanio} ml` : '100 ml',
            costo: parseFloat(editSizeCosto || '0'),
            precio: parseFloat(editSizePrecio),
            stock: parseInt(editSizeStock, 10)
          })
        });
        if (res.ok) {
          setEditingSizeId(null);
          fetchPerfumes();
        }
      } else if (type === 'decant5' || type === 'decant10') {
        const perfume = perfumes.find(p => p.id === perfumeId);
        const currentDecant = perfume.decant || { precio_5ml: 0, costo_5ml: 0, stock_5ml: 0, precio_10ml: 0, costo_10ml: 0, stock_10ml: 0 };
        
        const payload = {
          decant: {
            precio_5ml: type === 'decant5' ? parseFloat(editSizePrecio) : currentDecant.precio_5ml,
            costo_5ml: type === 'decant5' ? parseFloat(editSizeCosto || '0') : currentDecant.costo_5ml,
            stock_5ml: type === 'decant5' ? parseInt(editSizeStock, 10) : currentDecant.stock_5ml,
            precio_10ml: type === 'decant10' ? parseFloat(editSizePrecio) : currentDecant.precio_10ml,
            costo_10ml: type === 'decant10' ? parseFloat(editSizeCosto || '0') : currentDecant.costo_10ml,
            stock_10ml: type === 'decant10' ? parseInt(editSizeStock, 10) : currentDecant.stock_10ml,
          }
        };

        const res = await fetch(`http://localhost:3000/perfumes/${perfumeId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          setEditingSizeId(null);
          fetchPerfumes();
        }
      }
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteDecant = async (perfumeId, type) => {
    if (!window.confirm('¿Ocultar este decant?')) return;
    try {
        const perfume = perfumes.find(p => p.id === perfumeId);
        const currentDecant = perfume.decant || { precio_5ml: 0, stock_5ml: 0, precio_10ml: 0, stock_10ml: 0 };
        const payload = {
          decant: {
            precio_5ml: type === 'decant5' ? 0 : currentDecant.precio_5ml,
            stock_5ml: type === 'decant5' ? 0 : currentDecant.stock_5ml,
            precio_10ml: type === 'decant10' ? 0 : currentDecant.precio_10ml,
            stock_10ml: type === 'decant10' ? 0 : currentDecant.stock_10ml,
          }
        };
        const res = await fetch(`http://localhost:3000/perfumes/${perfumeId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          fetchPerfumes();
        }
    } catch(err) {
      console.error(err);
    }
  };


  // Edit Perfume State
  const [editingPerfumeId, setEditingPerfumeId] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editMarca, setEditMarca] = useState('');
  const [editCategoria, setEditCategoria] = useState('');
  const [editDescripcion, setEditDescripcion] = useState('');
  const [editImagen, setEditImagen] = useState('');
  const [editGaleria, setEditGaleria] = useState<string[]>([]);
  const [editGenero, setEditGenero] = useState('');

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditForm: boolean) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingImage(true);
    const newUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);
      try {
        const res = await fetch('http://localhost:3000/uploads/image', {
          method: 'POST', credentials: 'include', body: formData
        });
        if (res.ok) {
          const data = await res.json();
          newUrls.push("http://localhost:3000" + data.url);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (isEditForm) {
      setEditGaleria(prev => [...prev, ...newUrls]);
    } else {
      setGaleria(prev => [...prev, ...newUrls]);
    }
    setUploadingImage(false);
  };


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditForm: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:3000/uploads/image', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        // data.url contains the path (e.g., /uploads/abcd.jpg)
        const imageUrl = "http://localhost:3000" + data.url; // We should use absolute URL for development or relative if it's served on same host. Let's use absolute for now. Actually, let's keep it relative to the API host if needed, or absolute.
        const finalUrl = "http://localhost:3000" + data.url;
        if (isEditForm) {
          setEditImagen(finalUrl);
        } else {
          setImagen(finalUrl);
        }
      } else {
        alert('Error al subir imagen');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error al subir imagen');
    } finally {
      setUploadingImage(false);
    }
  };

  

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const fetchPerfumes = () => {
    fetch('http://localhost:3000/perfumes/admin/all', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setPerfumes(data);
        } else {
          setPerfumes([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPerfumes([]);
        setLoading(false);
      });
  };

  const handleAddPerfume = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/perfumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nombre, marca, categoria, descripcion, imagen, genero, galeria
        })
      });
      if (res.ok) {
        const newPerfume = await res.json();
        if (tipoPresentacion === 'decant') {
          const sizeNum = parseInt(tamanio, 10);
          const is5 = sizeNum <= 5;
          await fetch(`http://localhost:3000/perfumes/${newPerfume.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              decant: {
                precio_5ml: is5 ? parseFloat(precio) : undefined,
                costo_5ml: is5 ? parseFloat(costo || '0') : undefined,
                stock_5ml: is5 ? parseInt(stock, 10) : undefined,
                precio_10ml: !is5 ? parseFloat(precio) : undefined,
                costo_10ml: !is5 ? parseFloat(costo || '0') : undefined,
                stock_10ml: !is5 ? parseInt(stock, 10) : undefined,
              }
            })
          });
        } else {
          // Add presentation
          await fetch(`http://localhost:3000/perfumes/${newPerfume.id}/presentaciones`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              tamanio: `${tamanio} ml`,
              costo: parseFloat(costo || '0'),
              precio: Number(precio),
              stock: Number(stock)
            })
          });
        }

        alert('Perfume agregado correctamente');
        setShowAddForm(false);
        fetchPerfumes(); // Refresh

        // Reset form
        setNombre(''); setMarca(''); setCategoria('arabe'); setDescripcion(''); setImagen(''); setGaleria([]); setPrecio(''); setCosto(''); setTamanio(''); setStock('10'); setGenero('unisex'); setTipoPresentacion('perfume');
      } else {
        const text = await res.text();
        alert('Error al agregar: ' + text);
        console.error('Error del servidor:', text);
      }
    } catch (err: any) {
      console.error(err);
      alert('Error de red al agregar el perfume: ' + err.message);
    }
  };

  const handleAddPresentation = async (perfumeId: number) => {
    if (!newPresTamanio || !newPresPrecio) {
      alert('Ingresa tamaño y precio');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/perfumes/${perfumeId}/presentaciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          tamanio: newPresTamanio,
          precio: parseFloat(newPresPrecio),
          stock: parseInt(newPresStock || '10', 10)
        })
      });
      if (res.ok) {
        setAddingPresForId(null);
        setNewPresTamanio('');
        setNewPresPrecio('');
        setNewPresStock('10');
        fetchPerfumes();
      }
    } catch (err) {
      console.error(err);
      alert('Error al agregar la presentación');
    }
  };

  const handleDeletePresentation = async (presId: number) => {
    if (!window.confirm('¿Deseas eliminar esta presentación de tamaño?')) return;
    try {
      const res = await fetch(`http://localhost:3000/perfumes/presentaciones/${presId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        fetchPerfumes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        // Soft delete (desactivar)
        await fetch(`http://localhost:3000/perfumes/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
      } else {
        // Reactivar (Patch)
        await fetch(`http://localhost:3000/perfumes/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ activo: true })
        });
      }
      fetchPerfumes();
    } catch (err) {
      console.error(err);
    }
  };

  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'single'>('grid');
  const [singleViewIndex, setSingleViewIndex] = useState(0);
  const [editingPerfumeModal, setEditingPerfumeModal] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (editingPerfumeModal && perfumes.length > 0) {
      const updated = perfumes.find(p => p.id === editingPerfumeModal.id);
      if (updated) {
        setEditingPerfumeModal(updated);
      }
    }
  }, [perfumes]);

  const handleEditClick = (p: any) => {
    setEditingPerfumeId(p.id);
    setEditingPerfumeModal(p);
    setEditNombre(p.nombre || '');
    setEditMarca(p.marca || '');
    setEditCategoria(p.categoria || '');
    setEditDescripcion(p.descripcion || '');
    setEditImagen(p.imagen || '');
    setEditGaleria(p.galeria || []);
    setEditGenero(p.genero || 'unisex');
  };

  const handleUpdatePerfume = async (e: React.FormEvent) => {
    e.preventDefault();
    const idToUpdate = editingPerfumeModal?.id || editingPerfumeId;
    if (!idToUpdate) return;

    const payload = {
      nombre: editNombre,
      marca: editMarca,
      categoria: editCategoria,
      descripcion: editDescripcion,
      imagen: editImagen,
      galeria: editGaleria,
      genero: editGenero
    };

    try {
      const res = await fetch(`http://localhost:3000/perfumes/${idToUpdate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      if (res.ok) {
        setEditingPerfumeId(null);
        setEditingPerfumeModal(null);
        fetchPerfumes();
      } else {
        const text = await res.text();
        alert('Error al guardar: ' + text);
        console.error('Error del servidor:', text);
      }
    } catch (err: any) {
      alert('Error de red: ' + err.message);
      console.error('Error al actualizar perfume:', err);
    }
  };

  if (loading) return <p style={{ padding: '20px', color: '#666' }}>Cargando catálogo...</p>;

  const filteredPerfumes = perfumes.filter(p =>
    p.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.marca?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.categoria?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* Top Header & Navigation Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', backgroundColor: '#fff', padding: '16px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #eaeaea' }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', color: '#1c1a17' }}>Catálogo de Perfumes ({filteredPerfumes.length})</h3>
          <span style={{ fontSize: '0.8rem', color: '#777' }}>Gestiona productos, presentaciones, decants e inventario</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search bar */}
          <input
            type="text"
            placeholder="Buscar perfume..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.85rem', width: '180px' }}
          />

          {/* View mode toggle */}
          <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{ padding: '7px 12px', border: 'none', backgroundColor: viewMode === 'grid' ? '#1c1a17' : 'transparent', color: viewMode === 'grid' ? '#C5A059' : '#555', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
              title="Vista Cuadrícula"
            >
              Cuadrícula
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{ padding: '7px 12px', border: 'none', backgroundColor: viewMode === 'list' ? '#1c1a17' : 'transparent', color: viewMode === 'list' ? '#C5A059' : '#555', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
              title="Vista Lista"
            >
              Lista
            </button>
            <button
              onClick={() => { setViewMode('single'); setSingleViewIndex(0); }}
              style={{ padding: '7px 12px', border: 'none', backgroundColor: viewMode === 'single' ? '#1c1a17' : 'transparent', color: viewMode === 'single' ? '#C5A059' : '#555', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
              title="Vista 1 por 1"
            >
              1 por 1
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{ padding: '9px 18px', backgroundColor: '#C5A059', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', boxShadow: '0 2px 6px rgba(197,160,89,0.3)' }}
          >
            {showAddForm ? '✕ Cancelar' : '+ Nuevo Perfume'}
          </button>
        </div>
      </div>

      {/* Add Perfume Form */}
      {showAddForm && (
        <form onSubmit={handleAddPerfume} style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #C5A059', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
          <h4 style={{ margin: '0 0 20px 0', color: '#1c1a17', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Agregar Nuevo Perfume al Catálogo</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Nombre del Perfume</label>
              <input type="text" placeholder="Ej: Sauvage Elixir" value={nombre} onChange={e => setNombre(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Marca</label>
              <input type="text" placeholder="Ej: Dior" value={marca} onChange={e => setMarca(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Categoría</label>
              <select value={categoria} onChange={e => setCategoria(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
                <option value="arabe">Árabe</option>
                <option value="disenador">Diseñador</option>
                <option value="nicho">Nicho</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Género</label>
              <select value={genero} onChange={e => setGenero(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
                <option value="unisex">Unisex</option>
                <option value="el">Él</option>
                <option value="ella">Ella</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Imagen del Producto</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
                {uploadingImage && <span style={{ fontSize: '0.8rem', color: '#C5A059' }}>Subiendo...</span>}
                {imagen && <img src={imagen} alt="preview" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ddd' }} />}
              </div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Galería de Imágenes (Opcional)</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input type="file" accept="image/*" multiple onChange={(e) => handleGalleryUpload(e, false)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
                {uploadingImage && <span style={{ fontSize: '0.8rem', color: '#C5A059' }}>Subiendo...</span>}
                {galeria.map((url, idx) => (
                  <img key={idx} src={url} alt="preview" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ddd' }} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Descripción</label>
            <textarea placeholder="Descripción del perfume, notas aromáticas, etc." value={descripcion} onChange={e => setDescripcion(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '70px', boxSizing: 'border-box' }} />
          </div>

          <h5 style={{ margin: '15px 0 10px 0', fontSize: '0.9rem', color: '#C5A059', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Presentación Inicial</h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '20px', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Tipo</label>
              <select value={tipoPresentacion} onChange={e => setTipoPresentacion(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
                <option value="perfume">Perfume (Frasco)</option>
                <option value="decant">Decant</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>En ml</label>
              <input type="number" min="1" placeholder="Ej: 100" value={tamanio} onChange={e => setTamanio(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Costo (Q)</label>
              <input type="number" step="0.01" min="0" placeholder="Costo Q" value={costo} onChange={e => setCosto(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Precio (Q)</label>
              <input type="number" step="0.01" min="0" placeholder="Precio Q" value={precio} onChange={e => setPrecio(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Stock</label>
              <input type="number" min="0" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
          </div>

          <button type="submit" style={{ padding: '10px 25px', backgroundColor: '#1c1a17', color: '#C5A059', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>Guardar Perfume</button>
        </form>
      )}

      {/* ANIMATED EDIT MODAL OVERLAY */}
      {editingPerfumeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', width: '100%', maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '1px solid #e0e0e0', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={editingPerfumeModal.imagen} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#121212' }}>Editar: {editingPerfumeModal.nombre}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>{editingPerfumeModal.marca} | {editingPerfumeModal.categoria}</span>
                </div>
              </div>
              <button onClick={() => setEditingPerfumeModal(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888' }}>✕</button>
            </div>

            <form onSubmit={handleUpdatePerfume} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <h5 style={{ margin: '0 0 10px 0', color: '#C5A059' }}>Información Principal</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666' }}>Nombre</label>
                    <input type="text" value={editNombre} onChange={e => setEditNombre(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666' }}>Marca</label>
                    <input type="text" value={editMarca} onChange={e => setEditMarca(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666' }}>Categoría</label>
                      <select value={editCategoria} onChange={e => setEditCategoria(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
                        <option value="arabe">Árabe</option>
                        <option value="nicho">Nicho</option>
                        <option value="disenador">Diseñador</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666' }}>Género</label>
                      <select value={editGenero} onChange={e => setEditGenero(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
                        <option value="unisex">Unisex</option>
                        <option value="el">Él</option>
                        <option value="ella">Ella</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Imagen del Producto</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.8rem' }} />
                      {uploadingImage && <span style={{ fontSize: '0.8rem', color: '#C5A059' }}>Subiendo...</span>}
                      {editImagen && <img src={editImagen} alt="preview" style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />}
                    </div>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>Galería de Imágenes</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input type="file" accept="image/*" multiple onChange={(e) => handleGalleryUpload(e, true)} style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.8rem' }} />
                      {uploadingImage && <span style={{ fontSize: '0.8rem', color: '#C5A059' }}>Subiendo...</span>}
                      {editGaleria.map((url, idx) => (
                        <div key={idx} style={{ position: 'relative' }}>
                          <img src={url} alt="preview" style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                          <button onClick={() => setEditGaleria(prev => prev.filter((_, i) => i !== idx))} type="button" style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', borderRadius: '50%', border: 'none', width: '16px', height: '16px', fontSize: '10px', cursor: 'pointer' }}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666' }}>Descripción</label>
                    <textarea value={editDescripcion} onChange={e => setEditDescripcion(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '70px', boxSizing: 'border-box' }} required />
                  </div>
                  <button type="submit" style={{ padding: '10px', backgroundColor: '#C5A059', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, marginTop: '10px' }}>
                    Guardar Datos Principales
                  </button>
                </div>
              </div>

              <div>
                <h5 style={{ margin: '0 0 10px 0', color: '#C5A059' }}>Presentaciones y Decants</h5>
                <div style={{ backgroundColor: '#fbfbfb', padding: '12px', borderRadius: '8px', border: '1px solid #eee', maxHeight: '420px', overflowY: 'auto' }}>
                  {editingPerfumeModal.presentaciones?.map((pres: any) => (
                    <div key={pres.id} style={{ padding: '8px 0', borderBottom: '1px solid #eaeaea' }}>
                      {editingSizeId === 'pres_' + pres.id ? (
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <input type="number" min="1" value={editSizeTamanio} onChange={e => setEditSizeTamanio(e.target.value)} style={{ width: '55px', padding: '4px' }} placeholder="ml" />
                          <span style={{ fontSize: '0.7rem' }}>ml</span>
                          <input type="number" step="0.01" value={editSizeCosto} onChange={e => setEditSizeCosto(e.target.value)} style={{ width: '60px', padding: '4px' }} placeholder="Costo" />
                          <input type="number" step="0.01" value={editSizePrecio} onChange={e => setEditSizePrecio(e.target.value)} style={{ width: '60px', padding: '4px' }} placeholder="Precio" />
                          <input type="number" value={editSizeStock} onChange={e => setEditSizeStock(e.target.value)} style={{ width: '45px', padding: '4px' }} placeholder="Stock" />
                          <button onClick={() => handleUpdateSize(editingPerfumeModal.id, 'pres', pres.id)} style={{ padding: '4px 6px', backgroundColor: '#C5A059', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✓</button>
                          <button onClick={() => setEditingSizeId(null)} style={{ padding: '4px 6px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{pres.tamanio}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                            <span style={{ color: '#2e7d32', fontWeight: 700 }}>Q{Number(pres.precio).toFixed(2)}</span>
                            {pres.costo > 0 && <span style={{ color: '#777', fontSize: '0.75rem' }}>(Costo: Q{Number(pres.costo).toFixed(2)})</span>}
                            <span style={{ color: '#555', fontSize: '0.75rem' }}>[Stock: {pres.stock}]</span>
                            <button onClick={() => handleEditSizeClick('pres', pres.id, pres.tamanio, pres.precio, pres.stock, pres.costo)} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: '#121212', fontSize: '0.75rem' }}>Editar</button>
                            <button onClick={() => handleDeletePresentation(pres.id)} style={{ background: 'none', border: 'none', color: '#f44336', cursor: 'pointer', fontWeight: 700 }} title="Eliminar">✕</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Decant 5ml */}
                  {editingPerfumeModal.decant && Number(editingPerfumeModal.decant.precio_5ml) > 0 && (
                    <div style={{ padding: '8px 0', borderBottom: '1px solid #eaeaea', backgroundColor: '#fffdf9' }}>
                      {editingSizeId === 'decant5_' + editingPerfumeModal.id ? (
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.75rem' }}>Decant 5ml</span>
                          <input type="number" step="0.01" value={editSizeCosto} onChange={e => setEditSizeCosto(e.target.value)} style={{ width: '60px', padding: '4px' }} placeholder="Costo" />
                          <input type="number" step="0.01" value={editSizePrecio} onChange={e => setEditSizePrecio(e.target.value)} style={{ width: '60px', padding: '4px' }} placeholder="Precio" />
                          <input type="number" value={editSizeStock} onChange={e => setEditSizeStock(e.target.value)} style={{ width: '45px', padding: '4px' }} placeholder="Stock" />
                          <button onClick={() => handleUpdateSize(editingPerfumeModal.id, 'decant5', editingPerfumeModal.id)} style={{ padding: '4px 6px', backgroundColor: '#C5A059', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✓</button>
                          <button onClick={() => setEditingSizeId(null)} style={{ padding: '4px 6px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Decant 5 ml</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                            <span style={{ color: '#2e7d32', fontWeight: 700 }}>Q{Number(editingPerfumeModal.decant.precio_5ml).toFixed(2)}</span>
                            {editingPerfumeModal.decant.costo_5ml > 0 && <span style={{ color: '#777', fontSize: '0.75rem' }}>(Costo: Q{Number(editingPerfumeModal.decant.costo_5ml).toFixed(2)})</span>}
                            <span style={{ color: '#555', fontSize: '0.75rem' }}>[Stock: {editingPerfumeModal.decant.stock_5ml}]</span>
                            <button onClick={() => handleEditSizeClick('decant5', editingPerfumeModal.id, 'Decant 5 ml', editingPerfumeModal.decant.precio_5ml, editingPerfumeModal.decant.stock_5ml, editingPerfumeModal.decant.costo_5ml)} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: '#121212', fontSize: '0.75rem' }}>Editar</button>
                            <button onClick={() => handleDeleteDecant(editingPerfumeModal.id, 'decant5')} style={{ background: 'none', border: 'none', color: '#f44336', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Decant 10ml */}
                  {editingPerfumeModal.decant && Number(editingPerfumeModal.decant.precio_10ml) > 0 && (
                    <div style={{ padding: '8px 0', borderBottom: '1px solid #eaeaea', backgroundColor: '#fffdf9' }}>
                      {editingSizeId === 'decant10_' + editingPerfumeModal.id ? (
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.75rem' }}>Decant 10ml</span>
                          <input type="number" step="0.01" value={editSizeCosto} onChange={e => setEditSizeCosto(e.target.value)} style={{ width: '60px', padding: '4px' }} placeholder="Costo" />
                          <input type="number" step="0.01" value={editSizePrecio} onChange={e => setEditSizePrecio(e.target.value)} style={{ width: '60px', padding: '4px' }} placeholder="Precio" />
                          <input type="number" value={editSizeStock} onChange={e => setEditSizeStock(e.target.value)} style={{ width: '45px', padding: '4px' }} placeholder="Stock" />
                          <button onClick={() => handleUpdateSize(editingPerfumeModal.id, 'decant10', editingPerfumeModal.id)} style={{ padding: '4px 6px', backgroundColor: '#C5A059', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✓</button>
                          <button onClick={() => setEditingSizeId(null)} style={{ padding: '4px 6px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Decant 10 ml</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                            <span style={{ color: '#2e7d32', fontWeight: 700 }}>Q{Number(editingPerfumeModal.decant.precio_10ml).toFixed(2)}</span>
                            {editingPerfumeModal.decant.costo_10ml > 0 && <span style={{ color: '#777', fontSize: '0.75rem' }}>(Costo: Q{Number(editingPerfumeModal.decant.costo_10ml).toFixed(2)})</span>}
                            <span style={{ color: '#555', fontSize: '0.75rem' }}>[Stock: {editingPerfumeModal.decant.stock_10ml}]</span>
                            <button onClick={() => handleEditSizeClick('decant10', editingPerfumeModal.id, 'Decant 10 ml', editingPerfumeModal.decant.precio_10ml, editingPerfumeModal.decant.stock_10ml, editingPerfumeModal.decant.costo_10ml)} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', color: '#121212', fontSize: '0.75rem' }}>Editar</button>
                            <button onClick={() => handleDeleteDecant(editingPerfumeModal.id, 'decant10')} style={{ background: 'none', border: 'none', color: '#f44336', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ADD NEW PRESENTATION / DECANT IN MODAL */}
                  <div style={{ marginTop: '15px', borderTop: '1px solid #ddd', paddingTop: '15px' }}>
                    <h6 style={{ margin: '0 0 10px 0', color: '#1c1a17', fontSize: '0.85rem' }}>Agregar Nuevo Tamaño / Decant</h6>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#666' }}>Tipo</label>
                        <select value={newPresTipo} onChange={e => setNewPresTipo(e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                          <option value="perfume">Perfume</option>
                          <option value="decant">Decant</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#666' }}>En ml</label>
                        <input type="number" min="1" placeholder="Ej: 50" value={newPresTamanio} onChange={e => setNewPresTamanio(e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#666' }}>Stock</label>
                        <input type="number" min="0" placeholder="Stock" value={newPresStock} onChange={e => setNewPresStock(e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#666' }}>Costo Q</label>
                        <input type="number" step="0.01" min="0" placeholder="Costo" value={newPresCosto} onChange={e => setNewPresCosto(e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#666' }}>Precio Q</label>
                        <input type="number" step="0.01" min="0" placeholder="Precio" value={newPresPrecio} onChange={e => setNewPresPrecio(e.target.value)} style={{ width: '100%', padding: '6px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.preventDefault();
                            if (!newPresTamanio || !newPresPrecio) {
                              alert('Ingresa el tamaño en ml y el precio');
                              return;
                            }
                            const sizeNum = parseInt(newPresTamanio, 10);
                            if (newPresTipo === 'decant') {
                              const perfume = perfumes.find(pf => pf.id === editingPerfumeModal.id);
                              const dec = perfume.decant || {};
                              const is5 = sizeNum <= 5;
                              const payloadDec = is5 ?
                                { precio_5ml: parseFloat(newPresPrecio), costo_5ml: parseFloat(newPresCosto || '0'), stock_5ml: parseInt(newPresStock, 10) } :
                                { precio_10ml: parseFloat(newPresPrecio), costo_10ml: parseFloat(newPresCosto || '0'), stock_10ml: parseInt(newPresStock, 10) };
                              await fetch(`http://localhost:3000/perfumes/${editingPerfumeModal.id}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                credentials: 'include',
                                body: JSON.stringify({ decant: { ...dec, ...payloadDec } })
                              });
                            } else {
                              await fetch(`http://localhost:3000/perfumes/${editingPerfumeModal.id}/presentaciones`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                credentials: 'include',
                                body: JSON.stringify({
                                  tamanio: `${newPresTamanio} ml`,
                                  costo: parseFloat(newPresCosto || '0'),
                                  precio: parseFloat(newPresPrecio),
                                  stock: parseInt(newPresStock, 10)
                                })
                              });
                            }
                            setNewPresTamanio(''); setNewPresCosto(''); setNewPresPrecio(''); setNewPresStock('10'); setNewPresTipo('perfume');
                            fetchPerfumes();
                          }}
                          style={{ width: '100%', padding: '7px', backgroundColor: '#C5A059', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}
                        >
                          + Agregar
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODE 1: GRID VIEW (Cuadrícula Estilizada) */}
      {viewMode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filteredPerfumes.map(p => (
            <div key={p.id} style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '18px', opacity: p.activo ? 1 : 0.65, backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Header info */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                  <img src={p.imagen} alt={p.nombre} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/70'; }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', color: '#121212', fontWeight: 700 }}>
                      {p.nombre} <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 'normal' }}>(ID: {p.id})</span>
                    </h4>
                    <p style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: '#666' }}>{p.marca} | <span style={{ textTransform: 'capitalize', fontWeight: 600, color: '#C5A059' }}>{p.categoria}</span></p>
                    <button
                      onClick={() => handleToggleStatus(p.id, p.activo)}
                      style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700, border: 'none', cursor: 'pointer', backgroundColor: p.activo ? '#e8f5e9' : '#ffebee', color: p.activo ? '#2e7d32' : '#c62828' }}
                    >
                      {p.activo ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                  </div>
                  <button onClick={() => handleEditClick(p)} style={{ padding: '7px 12px', fontSize: '0.8rem', backgroundColor: '#1c1a17', color: '#C5A059', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                    Editar
                  </button>
                </div>

                {/* Presentaciones Table */}
                <div style={{ fontSize: '0.82rem', backgroundColor: '#faf9f6', padding: '12px', borderRadius: '8px', border: '1px solid #efe8d8', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ color: '#1c1a17', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Presentaciones:</strong>
                    <button
                      onClick={() => setAddingPresForId(addingPresForId === p.id ? null : p.id)}
                      style={{ background: 'none', border: 'none', color: '#C5A059', fontWeight: 700, cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      {addingPresForId === p.id ? '✕ Cancelar' : '+ Agregar Tamaño'}
                    </button>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #eee', color: '#888', textAlign: 'left', fontSize: '0.7rem' }}>
                        <th style={{ padding: '4px 0' }}>Tamaño</th>
                        <th style={{ padding: '4px 0' }}>Precio</th>
                        <th style={{ padding: '4px 0' }}>Costo</th>
                        <th style={{ padding: '4px 0', textAlign: 'right' }}>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.presentaciones?.map((pres: any) => (
                        <tr key={pres.id} style={{ borderBottom: '1px dashed #eee' }}>
                          <td style={{ padding: '5px 0', fontWeight: 600 }}>{pres.tamanio}</td>
                          <td style={{ padding: '5px 0', color: '#2e7d32', fontWeight: 700 }}>Q{Number(pres.precio).toFixed(2)}</td>
                          <td style={{ padding: '5px 0', color: '#777' }}>{pres.costo > 0 ? `Q${Number(pres.costo).toFixed(2)}` : '-'}</td>
                          <td style={{ padding: '5px 0', textAlign: 'right' }}>
                            <span style={{ backgroundColor: pres.stock > 0 ? '#f0f0f0' : '#ffebee', color: pres.stock > 0 ? '#333' : '#d32f2f', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                              {pres.stock}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {p.decant && Number(p.decant.precio_5ml) > 0 && (
                        <tr style={{ borderBottom: '1px dashed #eee' }}>
                          <td style={{ padding: '5px 0', fontWeight: 600 }}>Decant 5 ml</td>
                          <td style={{ padding: '5px 0', color: '#2e7d32', fontWeight: 700 }}>Q{Number(p.decant.precio_5ml).toFixed(2)}</td>
                          <td style={{ padding: '5px 0', color: '#777' }}>{p.decant.costo_5ml > 0 ? `Q${Number(p.decant.costo_5ml).toFixed(2)}` : '-'}</td>
                          <td style={{ padding: '5px 0', textAlign: 'right' }}>
                            <span style={{ backgroundColor: p.decant.stock_5ml > 0 ? '#f0f0f0' : '#ffebee', color: p.decant.stock_5ml > 0 ? '#333' : '#d32f2f', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                              {p.decant.stock_5ml}
                            </span>
                          </td>
                        </tr>
                      )}
                      {p.decant && Number(p.decant.precio_10ml) > 0 && (
                        <tr style={{ borderBottom: '1px dashed #eee' }}>
                          <td style={{ padding: '5px 0', fontWeight: 600 }}>Decant 10 ml</td>
                          <td style={{ padding: '5px 0', color: '#2e7d32', fontWeight: 700 }}>Q{Number(p.decant.precio_10ml).toFixed(2)}</td>
                          <td style={{ padding: '5px 0', color: '#777' }}>{p.decant.costo_10ml > 0 ? `Q${Number(p.decant.costo_10ml).toFixed(2)}` : '-'}</td>
                          <td style={{ padding: '5px 0', textAlign: 'right' }}>
                            <span style={{ backgroundColor: p.decant.stock_10ml > 0 ? '#f0f0f0' : '#ffebee', color: p.decant.stock_10ml > 0 ? '#333' : '#d32f2f', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                              {p.decant.stock_10ml}
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {addingPresForId === p.id && (
                    <div style={{ marginTop: '12px', padding: '10px', backgroundColor: '#fff', border: '1px solid #C5A059', borderRadius: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C5A059', display: 'block', marginBottom: '8px' }}>NUEVO TAMAÑO O DECANT:</span>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '6px', marginBottom: '8px', alignItems: 'end' }}>
                        <div>
                          <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#666' }}>Tipo</label>
                          <select value={newPresTipo} onChange={e => setNewPresTipo(e.target.value)} style={{ width: '100%', padding: '4px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                            <option value="perfume">Perfume</option>
                            <option value="decant">Decant</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#666' }}>En ml</label>
                          <input type="number" min="1" placeholder="Ej: 50" value={newPresTamanio} onChange={e => setNewPresTamanio(e.target.value)} style={{ width: '100%', padding: '4px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#666' }}>Costo Q</label>
                          <input type="number" step="0.01" min="0" placeholder="Costo" value={newPresCosto} onChange={e => setNewPresCosto(e.target.value)} style={{ width: '100%', padding: '4px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#666' }}>Precio Q</label>
                          <input type="number" step="0.01" min="0" placeholder="Precio" value={newPresPrecio} onChange={e => setNewPresPrecio(e.target.value)} style={{ width: '100%', padding: '4px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.65rem', fontWeight: 600, color: '#666' }}>Stock</label>
                          <input type="number" min="0" placeholder="Stock" value={newPresStock} onChange={e => setNewPresStock(e.target.value)} style={{ width: '100%', padding: '4px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          if (!newPresTamanio || !newPresPrecio) {
                            alert('Ingresa el tamaño en ml y el precio');
                            return;
                          }
                          const sizeNum = parseInt(newPresTamanio, 10);
                          if (newPresTipo === 'decant') {
                            const perfume = perfumes.find(pf => pf.id === p.id);
                            const dec = perfume.decant || {};
                            const is5 = sizeNum <= 5;
                            const payloadDec = is5 ?
                              { precio_5ml: parseFloat(newPresPrecio), costo_5ml: parseFloat(newPresCosto || '0'), stock_5ml: parseInt(newPresStock, 10) } :
                              { precio_10ml: parseFloat(newPresPrecio), costo_10ml: parseFloat(newPresCosto || '0'), stock_10ml: parseInt(newPresStock, 10) };
                            await fetch(`http://localhost:3000/perfumes/${p.id}`, {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              credentials: 'include',
                              body: JSON.stringify({ decant: { ...dec, ...payloadDec } })
                            });
                          } else {
                            await fetch(`http://localhost:3000/perfumes/${p.id}/presentaciones`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              credentials: 'include',
                              body: JSON.stringify({
                                tamanio: `${newPresTamanio} ml`,
                                costo: parseFloat(newPresCosto || '0'),
                                precio: parseFloat(newPresPrecio),
                                stock: parseInt(newPresStock, 10)
                              })
                            });
                          }
                          setAddingPresForId(null);
                          setNewPresTamanio(''); setNewPresCosto(''); setNewPresPrecio(''); setNewPresStock('10'); setNewPresTipo('perfume');
                          fetchPerfumes();
                        }}
                        style={{ width: '100%', padding: '6px', backgroundColor: '#C5A059', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}
                      >
                        Guardar Tamaño
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleEditClick(p)}
                style={{ width: '100%', padding: '9px', backgroundColor: '#fafafa', color: '#1c1a17', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}
              >
                Editar Perfume Completo
              </button>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 2: LIST VIEW (Tabla Compacta) */}
      {viewMode === 'list' && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textTransform: 'none' }}>
            <thead>
              <tr style={{ backgroundColor: '#1c1a17', color: '#C5A059', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Producto</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Categoría / Género</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Presentaciones</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Estado</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPerfumes.map((p, idx) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={p.imagen} alt="" style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }} />
                      <div>
                        <strong style={{ display: 'block', color: '#121212', fontSize: '0.9rem' }}>
                          {p.nombre} <span style={{ color: '#888', fontWeight: 'normal', fontSize: '0.75rem' }}>(ID: {p.id})</span>
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: '#666' }}>{p.marca}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: '#444' }}>
                    <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{p.categoria}</span> ({p.genero || 'Unisex'})
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {p.presentaciones?.map((pres: any) => (
                        <span key={pres.id} style={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd', padding: '3px 8px', borderRadius: '4px', color: '#333' }}>
                          <strong>{pres.tamanio}</strong>: Q{Number(pres.precio).toFixed(0)} <small style={{ color: '#777' }}>({pres.stock})</small>
                        </span>
                      ))}
                      {p.decant && Number(p.decant.precio_5ml) > 0 && (
                        <span style={{ backgroundColor: '#fff9c4', border: '1px solid #fff59d', padding: '3px 8px', borderRadius: '4px', color: '#574200' }}>
                          <strong>5ml</strong>: Q{Number(p.decant.precio_5ml).toFixed(0)}
                        </span>
                      )}
                      {p.decant && Number(p.decant.precio_10ml) > 0 && (
                        <span style={{ backgroundColor: '#fff9c4', border: '1px solid #fff59d', padding: '3px 8px', borderRadius: '4px', color: '#574200' }}>
                          <strong>10ml</strong>: Q{Number(p.decant.precio_10ml).toFixed(0)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleToggleStatus(p.id, p.activo)}
                      style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer', backgroundColor: p.activo ? '#e8f5e9' : '#ffebee', color: p.activo ? '#2e7d32' : '#c62828' }}
                    >
                      {p.activo ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button onClick={() => handleEditClick(p)} style={{ padding: '6px 12px', fontSize: '0.8rem', backgroundColor: '#1c1a17', color: '#C5A059', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW MODE 3: SINGLE CARD (1 por 1) */}
      {viewMode === 'single' && filteredPerfumes.length > 0 && (
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          {/* Carousel Navigation bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', backgroundColor: '#1c1a17', padding: '12px 20px', borderRadius: '8px', color: '#fff' }}>
            <button
              onClick={() => setSingleViewIndex((prev) => (prev > 0 ? prev - 1 : filteredPerfumes.length - 1))}
              style={{ backgroundColor: '#C5A059', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}
            >
              Anterior
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#C5A059' }}>
              {singleViewIndex + 1} de {filteredPerfumes.length}
            </span>
            <button
              onClick={() => setSingleViewIndex((prev) => (prev < filteredPerfumes.length - 1 ? prev + 1 : 0))}
              style={{ backgroundColor: '#C5A059', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}
            >
              Siguiente
            </button>
          </div>

          {/* Current Perfume Card */}
          {(() => {
            const p = filteredPerfumes[singleViewIndex] || filteredPerfumes[0];
            if (!p) return null;
            return (
              <div style={{ border: '1px solid #ddd', borderRadius: '14px', padding: '24px', backgroundColor: '#ffffff', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
                  <img src={p.imagen} alt={p.nombre} style={{ width: '110px', height: '110px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #eee' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h2 style={{ margin: '0 0 6px 0', fontSize: '1.4rem', color: '#121212' }}>{p.nombre}</h2>
                        <h4 style={{ margin: 0, color: '#C5A059', fontWeight: 600 }}>{p.marca}</h4>
                      </div>
                      <button
                        onClick={() => handleToggleStatus(p.id, p.activo)}
                        style={{ padding: '5px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer', backgroundColor: p.activo ? '#e8f5e9' : '#ffebee', color: p.activo ? '#2e7d32' : '#c62828' }}
                      >
                        {p.activo ? '● ACTIVO' : '○ INACTIVO'}
                      </button>
                    </div>
                    <p style={{ margin: '10px 0 0 0', fontSize: '0.85rem', color: '#555', lineHeight: '1.4' }}>{p.descripcion}</p>
                  </div>
                </div>

                <h4 style={{ margin: '0 0 12px 0', color: '#1c1a17' }}>Presentaciones Disponibles</h4>
                <div style={{ backgroundColor: '#faf9f6', padding: '16px', borderRadius: '8px', border: '1px solid #efe8d8', marginBottom: '20px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #ddd', color: '#777', textAlign: 'left', fontSize: '0.75rem' }}>
                        <th style={{ padding: '6px 0' }}>Tamaño</th>
                        <th style={{ padding: '6px 0' }}>Precio Venta</th>
                        <th style={{ padding: '6px 0' }}>Costo Compra</th>
                        <th style={{ padding: '6px 0', textAlign: 'right' }}>Stock Disponible</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.presentaciones?.map((pres: any) => (
                        <tr key={pres.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '8px 0', fontWeight: 700 }}>{pres.tamanio}</td>
                          <td style={{ padding: '8px 0', color: '#2e7d32', fontWeight: 700 }}>Q{Number(pres.precio).toFixed(2)}</td>
                          <td style={{ padding: '8px 0', color: '#777' }}>{pres.costo > 0 ? `Q${Number(pres.costo).toFixed(2)}` : '-'}</td>
                          <td style={{ padding: '8px 0', textAlign: 'right' }}>{pres.stock} uds</td>
                        </tr>
                      ))}
                      {p.decant && Number(p.decant.precio_5ml) > 0 && (
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '8px 0', fontWeight: 700 }}>Decant 5 ml</td>
                          <td style={{ padding: '8px 0', color: '#2e7d32', fontWeight: 700 }}>Q{Number(p.decant.precio_5ml).toFixed(2)}</td>
                          <td style={{ padding: '8px 0', color: '#777' }}>{p.decant.costo_5ml > 0 ? `Q${Number(p.decant.costo_5ml).toFixed(2)}` : '-'}</td>
                          <td style={{ padding: '8px 0', textAlign: 'right' }}>{p.decant.stock_5ml} uds</td>
                        </tr>
                      )}
                      {p.decant && Number(p.decant.precio_10ml) > 0 && (
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '8px 0', fontWeight: 700 }}>Decant 10 ml</td>
                          <td style={{ padding: '8px 0', color: '#2e7d32', fontWeight: 700 }}>Q{Number(p.decant.precio_10ml).toFixed(2)}</td>
                          <td style={{ padding: '8px 0', color: '#777' }}>{p.decant.costo_10ml > 0 ? `Q${Number(p.decant.costo_10ml).toFixed(2)}` : '-'}</td>
                          <td style={{ padding: '8px 0', textAlign: 'right' }}>{p.decant.stock_10ml} uds</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={() => handleEditClick(p)}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#C5A059', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}
                >
                  Editar Este Perfume
                </button>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function PromotionsTab() {
  const [promos, setPromos] = useState<any[]>([]);
  const [giftCards, setGiftCards] = useState<any[]>([]);
  
  // Nuevo Codigo Promocional
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDesc, setNewPromoDesc] = useState('porcentaje');
  const [newPromoMonto, setNewPromoMonto] = useState('');
  const [newPromoInicio, setNewPromoInicio] = useState('');
  const [newPromoFin, setNewPromoFin] = useState('');

  // Nueva Gift Card
  const [newGcUserId, setNewGcUserId] = useState('');
  const [newGcMonto, setNewGcMonto] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pRes = await fetch('http://localhost:3000/promo-codes', { credentials: 'include' });
      if (pRes.ok) setPromos(await pRes.json());
      
      const gRes = await fetch('http://localhost:3000/gift-cards', { credentials: 'include' });
      if (gRes.ok) setGiftCards(await gRes.json());
    } catch(err) {
      console.error(err);
    }
  };

  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = {
        codigo: newPromoCode,
        tipo_descuento: newPromoDesc,
        descuento: Number(newPromoMonto),
        fecha_inicio: newPromoInicio ? new Date(newPromoInicio + 'T00:00:00').toISOString() : new Date().toISOString(),
        fecha_fin: newPromoFin ? new Date(newPromoFin + 'T23:59:59').toISOString() : undefined,
      };
      const res = await fetch('http://localhost:3000/promo-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      });
      if (res.ok) {
        alert('Código promocional creado');
        setNewPromoCode('');
        setNewPromoMonto('');
        setNewPromoInicio('');
        setNewPromoFin('');
        fetchData();
      } else {
        const err = await res.json().catch(() => ({}));
        alert('Error: ' + (err.message || 'No se pudo crear el código'));
      }
    } catch(err) {
      console.error(err);
    }
  };

  const handleCreateGiftCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/gift-cards/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          id_usuario: Number(newGcUserId),
          monto: Number(newGcMonto)
        })
      });
      if (res.ok) {
        alert('Gift Card creada correctamente');
        setNewGcUserId('');
        setNewGcMonto('');
        fetchData();
      } else {
        const err = await res.json().catch(()=>({}));
        alert('Error: ' + err.message);
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
      
      {/* Promociones */}
      <div>
        <h3 style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '10px' }}>Códigos Promocionales</h3>
        <form onSubmit={handleCreatePromo} style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4>Nuevo Código</h4>
          <input type="text" placeholder="CÓDIGO (ej. VERANO20)" value={newPromoCode} onChange={e => setNewPromoCode(e.target.value.toUpperCase())} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select value={newPromoDesc} onChange={e => setNewPromoDesc(e.target.value)} style={{ padding: '8px' }}>
              <option value="porcentaje">Porcentaje (%)</option>
              <option value="monto_fijo">Monto Fijo (Q)</option>
            </select>
            <input type="number" placeholder="Valor" value={newPromoMonto} onChange={e => setNewPromoMonto(e.target.value)} required style={{ flex: 1, padding: '8px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: '#555' }}>Válido desde</label>
              <input type="date" value={newPromoInicio} onChange={e => setNewPromoInicio(e.target.value)} required style={{ display: 'block', width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px', color: '#555' }}>Válido hasta</label>
              <input type="date" value={newPromoFin} onChange={e => setNewPromoFin(e.target.value)} required style={{ display: 'block', width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1c1a17', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Crear Código</button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {promos.map(p => (
            <div key={p.id} style={{ border: '1px solid #e5e5e5', padding: '10px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: p.estado === 'ACTIVO' ? 1 : 0.6 }}>
              <div>
                <strong>{p.codigo}</strong> - {p.tipo_descuento === 'porcentaje' ? `${p.descuento}%` : `Q${p.descuento}`}
                <div style={{ fontSize: '0.8rem', color: '#666' }}>
                  {new Date(p.fecha_inicio).toLocaleDateString()} → {new Date(p.fecha_fin).toLocaleDateString()} | Estado: <strong>{p.estado}</strong>
                </div>
              </div>
              <button 
                onClick={async () => {
                  if (confirm(`¿Seguro que deseas cambiar el estado de ${p.codigo}?`)) {
                    const res = await fetch(`http://localhost:3000/promo-codes/${p.id}/toggle`, { method: 'POST', credentials: 'include' });
                    if (res.ok) fetchData();
                  }
                }}
                style={{ padding: '6px 12px', backgroundColor: p.estado === 'ACTIVO' ? '#f44336' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                {p.estado === 'ACTIVO' ? 'Desactivar' : 'Activar'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Gift Cards */}
      <div>
        <h3 style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '10px' }}>Gift Cards Manuales</h3>
        <form onSubmit={handleCreateGiftCard} style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4>Asignar Gift Card a Usuario</h4>
          <input type="number" placeholder="ID del Usuario" value={newGcUserId} onChange={e => setNewGcUserId(e.target.value)} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }} />
          <input type="number" placeholder="Monto (Q)" value={newGcMonto} onChange={e => setNewGcMonto(e.target.value)} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }} />
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#C5A059', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Generar Gift Card</button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {giftCards.map(gc => (
            <div key={gc.id} style={{ border: '1px solid #e5e5e5', padding: '10px', borderRadius: '4px', opacity: gc.activa ? 1 : 0.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontFamily: 'monospace' }}>{gc.codigo}</strong>
                <strong style={{ color: '#2e7d32' }}>Q{gc.monto}</strong>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                Usuario ID: {gc.id_usuario} {gc.usuario && `(${gc.usuario.correo})`} | {gc.activa ? 'ACTIVA' : 'USADA'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CAMPAÑAS / BAZAR TAB
// ─────────────────────────────────────────────────────────────
function CampaniasTab() {
  const [campanias, setCampanias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [perfumes, setPerfumes] = useState<any[]>([]);

  // Form state
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState<'GLOBAL' | 'CATEGORIA' | 'SELECCION'>('GLOBAL');
  const [descuento, setDescuento] = useState<number>(10);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);
  const [perfumesSeleccionados, setPerfumesSeleccionados] = useState<number[]>([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [imagen, setImagen] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:3000/uploads/image', {
        method: 'POST', credentials: 'include', body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setImagen("http://localhost:3000" + data.url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  const CATEGORIAS_DISPONIBLES = ['árabe', 'diseñador', 'nicho'];

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/campanias', { credentials: 'include' }).then(r => r.json()),
      fetch('http://localhost:3000/perfumes/admin/all', { credentials: 'include' }).then(r => r.json()),
    ])
      .then(([c, p]) => {
        setCampanias(Array.isArray(c) ? c : []);
        setPerfumes(Array.isArray(p) ? p : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const refresh = () => {
    fetch('http://localhost:3000/campanias', { credentials: 'include' })
      .then(r => r.json())
      .then(c => setCampanias(Array.isArray(c) ? c : []))
      .catch(() => {});
  };

  const handleCreate = async () => {
    if (!nombre.trim()) return alert('Ponle un nombre a la campaña');
    if (descuento <= 0 || descuento > 100) return alert('El descuento debe estar entre 1 y 100%');
    setSaving(true);
    try {
      const body: any = { nombre: nombre.trim(), tipo, descuento };
      if (tipo === 'CATEGORIA') body.categorias = JSON.stringify(categoriasSeleccionadas);
      if (tipo === 'SELECCION') body.perfume_ids = JSON.stringify(perfumesSeleccionados);
      if (fechaInicio) body.fecha_inicio = fechaInicio;
      if (fechaFin) body.fecha_fin = fechaFin;
      if (imagen) body.imagen = imagen;

      await fetch('http://localhost:3000/campanias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      setNombre(''); setTipo('GLOBAL'); setDescuento(10);
      setCategoriasSeleccionadas([]); setPerfumesSeleccionados([]);
      setFechaInicio(''); setFechaFin(''); setImagen('');
      refresh();
    } catch (e) { alert('Error al crear campaña'); }
    finally { setSaving(false); }
  };

  const handleToggle = async (id: number) => {
    await fetch(`http://localhost:3000/campanias/${id}/toggle`, {
      method: 'PATCH', credentials: 'include',
    });
    refresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta campaña?')) return;
    await fetch(`http://localhost:3000/campanias/${id}`, {
      method: 'DELETE', credentials: 'include',
    });
    refresh();
  };

  const toggleCategoria = (cat: string) => {
    setCategoriasSeleccionadas(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const togglePerfume = (id: number) => {
    setPerfumesSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (loading) return <p style={{ color: '#666' }}>Cargando campañas...</p>;

  const campaniasActivas = campanias.filter(c => c.activa);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

        {/* Formulario de creación */}
        <div style={{ border: '1px solid #eae5dc', borderRadius: '8px', padding: '25px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1c1a17', borderBottom: '2px solid #C5A059', paddingBottom: '10px' }}>
            Nueva Campaña
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#5e5a54', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Nombre del evento</label>
              <input
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder='ej. "Bazar Julio" o "Navidad 2026"'
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #eae5dc', borderRadius: '4px', fontSize: '0.85rem', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#5e5a54', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>% de Descuento</label>
              <input
                type="number" min={1} max={99}
                value={descuento}
                onChange={e => setDescuento(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #eae5dc', borderRadius: '4px', fontSize: '0.85rem', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#5e5a54', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Aplica a</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['GLOBAL', 'CATEGORIA', 'SELECCION'] as const).map(t => (
                  <button key={t} onClick={() => setTipo(t)} style={{
                    flex: 1, padding: '9px 5px', border: `1.5px solid ${tipo === t ? '#C5A059' : '#eae5dc'}`,
                    background: tipo === t ? '#C5A059' : 'transparent', color: tipo === t ? '#fff' : '#1c1a17',
                    borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.06em',
                  }}>
                    {t === 'GLOBAL' ? 'Todo' : t === 'CATEGORIA' ? 'Categoría' : 'Selección'}
                  </button>
                ))}
              </div>
            </div>

            {tipo === 'CATEGORIA' && (
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#5e5a54', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Categorías</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {CATEGORIAS_DISPONIBLES.map(cat => (
                    <button key={cat} onClick={() => toggleCategoria(cat)} style={{
                      padding: '7px 14px', border: `1.5px solid ${categoriasSeleccionadas.includes(cat) ? '#C5A059' : '#eae5dc'}`,
                      background: categoriasSeleccionadas.includes(cat) ? '#C5A059' : 'transparent',
                      color: categoriasSeleccionadas.includes(cat) ? '#fff' : '#1c1a17',
                      borderRadius: '20px', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem', textTransform: 'capitalize',
                    }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tipo === 'SELECCION' && (
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#5e5a54', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Perfumes ({perfumesSeleccionados.length} seleccionados)
                </label>
                <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid #eae5dc', borderRadius: '4px', padding: '8px' }}>
                  {perfumes.map(p => (
                    <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', cursor: 'pointer', borderRadius: '3px', background: perfumesSeleccionados.includes(p.id) ? '#fdf8f0' : 'transparent' }}>
                      <input
                        type="checkbox"
                        checked={perfumesSeleccionados.includes(p.id)}
                        onChange={() => togglePerfume(p.id)}
                        style={{ accentColor: '#C5A059' }}
                      />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{p.marca}</span>
                      <span style={{ fontSize: '0.75rem', color: '#5e5a54' }}>{p.nombre}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#5e5a54', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Inicio (opc.)</label>
                <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #eae5dc', borderRadius: '4px', fontSize: '0.8rem', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#5e5a54', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Fin (opc.)</label>
                <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #eae5dc', borderRadius: '4px', fontSize: '0.8rem', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 700, color: '#5e5a54', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Imagen del Banner (opcional)</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ flex: 1, padding: '8px', border: '1px solid #eae5dc', borderRadius: '4px', fontSize: '0.8rem' }} />
                {uploadingImage && <span style={{ fontSize: '0.75rem', color: '#C5A059' }}>Subiendo...</span>}
                {imagen && <img src={imagen} alt="preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
              </div>
            </div>

            <button
              onClick={handleCreate}
              disabled={saving}
              style={{ padding: '13px', background: saving ? '#ccc' : '#1c1a17', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', cursor: saving ? 'default' : 'pointer', textTransform: 'uppercase' }}
            >
              {saving ? 'Guardando...' : 'Crear Campaña'}
            </button>
          </div>
        </div>

        {/* Lista de campañas */}
        <div>
          <h3 style={{ margin: '0 0 20px', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1c1a17', borderBottom: '2px solid #C5A059', paddingBottom: '10px' }}>
            Campañas Guardadas
          </h3>
          {campanias.length === 0 ? (
            <p style={{ color: '#a8a297', fontSize: '0.85rem', textAlign: 'center', padding: '30px 0' }}>No hay campañas creadas aún</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {campanias.map(c => (
                <div key={c.id} style={{
                  border: `1.5px solid ${c.activa ? '#C5A059' : '#eae5dc'}`,
                  borderRadius: '8px',
                  padding: '16px 20px',
                  background: c.activa ? 'linear-gradient(135deg, #fdf8f0, #fff)' : '#ffffff',
                  boxShadow: c.activa ? '0 4px 15px rgba(197,160,89,0.15)' : 'none',
                  transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        {c.activa && <span style={{ fontSize: '0.6rem', fontWeight: 700, background: '#C5A059', color: '#fff', padding: '2px 8px', borderRadius: '20px', letterSpacing: '0.08em' }}>ACTIVA</span>}
                        <strong style={{ fontSize: '0.95rem', color: '#1c1a17' }}>{c.nombre}</strong>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#5e5a54' }}>
                        <span style={{ fontWeight: 700, color: '#C5A059' }}>{Number(c.descuento)}% OFF</span>
                        {' · '}{c.tipo === 'GLOBAL' ? 'Todo el catálogo' : c.tipo === 'CATEGORIA' ? `Categorías: ${c.categorias}` : `${JSON.parse(c.perfume_ids || '[]').length} perfumes`}
                      </p>
                      {(c.fecha_inicio || c.fecha_fin) && (
                        <p style={{ margin: '4px 0 0', fontSize: '0.72rem', color: '#a8a297' }}>
                          {c.fecha_inicio ? new Date(c.fecha_inicio).toLocaleDateString() : '—'} → {c.fecha_fin ? new Date(c.fecha_fin).toLocaleDateString() : '—'}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                      <button onClick={() => handleToggle(c.id)} style={{
                        padding: '7px 14px', border: `1.5px solid ${c.activa ? '#C5A059' : '#1c1a17'}`,
                        background: c.activa ? '#C5A059' : 'transparent',
                        color: c.activa ? '#fff' : '#1c1a17',
                        borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.06em', whiteSpace: 'nowrap',
                      }}>
                        {c.activa ? 'Desactivar' : 'Activar'}
                      </button>
                      <button onClick={() => handleDelete(c.id)} style={{
                        padding: '5px 10px', border: '1px solid #fca5a5', background: 'transparent',
                        color: '#dc2626', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.65rem',
                      }}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

