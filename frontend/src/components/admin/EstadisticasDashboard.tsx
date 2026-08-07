import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#F97316', '#3B82F6']; // Naranja para H/M y Azul
const CAT_COLORS = { Arabe: '#3B82F6', Diseñador: '#3B82F6', Nicho: '#3B82F6' }; // In screenshot they are all blue

const MESES = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

function getMonthName(monthStr: string) {
  // monthStr is "YYYY-MM"
  const parts = monthStr.split('-');
  const m = parseInt(parts[1], 10);
  return MESES[m - 1];
}

export function EstadisticasDashboard() {
  const [data, setData] = useState<any>(null);
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [dateRange, setDateRange] = useState('mes_actual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [gender, setGender] = useState('todos');

  // Efecto para calcular fechas predefinidas
  useEffect(() => {
    const today = new Date();
    let start = '';
    let end = today.toISOString().split('T')[0];

    if (dateRange === 'semana_pasada') {
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      start = lastWeek.toISOString().split('T')[0];
    } else if (dateRange === 'mes_actual') {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      start = firstDay.toISOString().split('T')[0];
    } else if (dateRange === 'año_actual') {
      const firstDay = new Date(today.getFullYear(), 0, 1);
      start = firstDay.toISOString().split('T')[0];
    }

    if (dateRange !== 'personalizado') {
      setStartDate(start);
      setEndDate(end);
    }
  }, [dateRange]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (gender !== 'todos') params.append('gender', gender);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/sales-reports/dashboard-stats?${params.toString()}`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();
      setData(json);

      // Fetch best sellers
      const resBest = await fetch(import.meta.env.VITE_API_URL + '/perfumes/best-sellers');
      if (resBest.ok) {
        const bestData = await resBest.json();
        setBestSellers(bestData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dateRange === 'personalizado' && (!startDate || !endDate)) {
      return; 
    }
    fetchStats();
  }, [startDate, endDate, gender]);

  const kpis = data?.kpis || { totalVendido: 0, totalIngresos: 0, totalGanancias: 0 };
  const monthlyData = data?.monthlyData || [];
  const summaryByCategory = data?.summaryByCategory || { Arabe: {}, Diseñador: {}, Nicho: {} };
  const summaryByGender = data?.summaryByGender || { Hombre: 0, Mujer: 0 };
  const orderStatusCounts = data?.orderStatusCounts || { pendientes: 0, procesadas: 0, entregadas: 0, canceladas: 0 };
  const topVendidos: any[] = data?.topVendidos || [];

  // Datos para gráficas (Global del periodo seleccionado)
  const chartCategoryData = [
    { name: 'A', cantidad: summaryByCategory.Arabe?.cantidad || 0, ventas: summaryByCategory.Arabe?.ingresos || 0, ganancias: summaryByCategory.Arabe?.ganancias || 0 },
    { name: 'D', cantidad: summaryByCategory.Diseñador?.cantidad || 0, ventas: summaryByCategory.Diseñador?.ingresos || 0, ganancias: summaryByCategory.Diseñador?.ganancias || 0 },
    { name: 'N', cantidad: summaryByCategory.Nicho?.cantidad || 0, ventas: summaryByCategory.Nicho?.ingresos || 0, ganancias: summaryByCategory.Nicho?.ganancias || 0 }
  ];

  const chartGenderData = [
    { name: 'M', value: summaryByGender.Mujer || 0 },
    { name: 'H', value: summaryByGender.Hombre || 0 },
    { name: 'U', value: summaryByGender.Unisex || 0 }
  ];

  const GENDER_COLORS = ['#F97316', '#3B82F6', '#10B981']; // Naranja (M), Azul (H), Verde (U)

  // Helper para generar las tablas
  const renderTableCategorias = (dataKey: 'cantidad' | 'ingresos' | 'ganancias', isMoneda = false) => (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', backgroundColor: '#fff', fontSize: '0.9rem' }}>
      <thead>
        <tr>
          <th colSpan={3} style={{ backgroundColor: '#A9C4EB', padding: '10px', border: '1px solid #ddd' }}>
            {dataKey === 'cantidad' ? 'Total de Perfumes Vendidos por Tipo de Perfumes' : 
             dataKey === 'ingresos' ? 'Total Ventas por Tipo de Perfume' : 'Total Ganancias por Tipo de Perfume'}
          </th>
        </tr>
      </thead>
      <tbody>
        {monthlyData.map((m: any) => (
          <React.Fragment key={m.month}>
            <tr>
              <td rowSpan={3} style={{ border: '1px solid #ddd', padding: '8px', verticalAlign: 'middle', fontWeight: 'bold' }}>
                {getMonthName(m.month)}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>A</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {isMoneda ? `GTQ ${m.categorias.Arabe[dataKey].toFixed(2)}` : m.categorias.Arabe[dataKey]}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>D</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {isMoneda ? `GTQ ${m.categorias.Diseñador[dataKey].toFixed(2)}` : m.categorias.Diseñador[dataKey]}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>N</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {isMoneda ? `GTQ ${m.categorias.Nicho[dataKey].toFixed(2)}` : m.categorias.Nicho[dataKey]}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );

  const renderTableGenero = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', backgroundColor: '#fff', fontSize: '0.9rem' }}>
      <thead>
        <tr>
          <th colSpan={3} style={{ backgroundColor: '#A9C4EB', padding: '10px', border: '1px solid #ddd' }}>
            Compras por Género del Perfume
          </th>
        </tr>
      </thead>
      <tbody>
        {monthlyData.map((m: any) => (
          <React.Fragment key={m.month}>
            <tr>
              <td rowSpan={3} style={{ border: '1px solid #ddd', padding: '8px', verticalAlign: 'middle', fontWeight: 'bold' }}>
                {getMonthName(m.month)}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>H</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{m.generos.Hombre}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>M</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{m.generos.Mujer}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>U</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{m.generos.Unisex}</td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#222', padding: '10px', color: '#fff', border: '1px solid #444' }}>
          <p style={{ margin: 0 }}>{`${label || payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="estadisticas-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: '#1c1a17' }}>
      
      {/* Controles de Filtros */}
      <div className="filtros-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Rango de Tiempo</label>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
            <option value="semana_pasada">Última semana</option>
            <option value="mes_actual">Este Mes</option>
            <option value="año_actual">Este Año</option>
            <option value="personalizado">Personalizado...</option>
          </select>
        </div>
        {dateRange === 'personalizado' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Fecha Inicio</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Fecha Fin</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }} />
            </div>
          </>
        )}
      </div>

      {loading ? (
        <p>Cargando estadísticas...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* Panel de Estado de Órdenes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { label: 'Pendientes', count: orderStatusCounts.pendientes, color: '#F59E0B', bg: '#FFFBEB' },
              { label: 'Procesadas', count: orderStatusCounts.procesadas, color: '#3B82F6', bg: '#EFF6FF' },
              { label: 'Entregadas', count: orderStatusCounts.entregadas, color: '#10B981', bg: '#F0FDF4' },
              { label: 'Canceladas', count: orderStatusCounts.canceladas, color: '#EF4444', bg: '#FEF2F2' },
            ].map(({ label, count, color, bg }) => (
              <div key={label} style={{ backgroundColor: bg, borderRadius: '12px', padding: '20px', border: `1px solid ${color}30`, textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color }}>{count}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Fila 1: Cantidad de Perfumes Vendidos */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 350px' }}>{renderTableCategorias('cantidad')}</div>
            <div style={{ flex: 1, backgroundColor: '#000', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ color: '#fff', textAlign: 'center', marginTop: 0 }}>Numero de Perfumes Vendidos</h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer>
                  <BarChart data={chartCategoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="name" stroke="#fff" tick={{ fill: '#fff' }} />
                    <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar dataKey="cantidad" fill="#4B88E5" barSize={60} label={{ position: 'top', fill: '#fff' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Fila 2: Hombres vs Mujeres vs Unisex */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 350px' }}>{renderTableGenero()}</div>
            <div style={{ flex: 1, backgroundColor: '#000', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ color: '#fff', textAlign: 'center', marginTop: 0 }}>Ventas por Género del Perfume</h3>
              <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartGenderData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label={({ value }) => value} labelLine={false}>
                      {chartGenderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: '#fff', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F97316' }}></div> M</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#3B82F6' }}></div> H</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981' }}></div> U</div>
              </div>
            </div>
          </div>

          {/* Fila 3: Total Ganancias */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 350px' }}>{renderTableCategorias('ganancias', true)}</div>
            <div style={{ flex: 1, backgroundColor: '#000', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ color: '#fff', textAlign: 'center', marginTop: 0 }}>Total Ganancias por Tipo de Perfume</h3>
              <div style={{ textAlign: 'center', color: '#fff', marginBottom: '10px', fontSize: '1.1rem' }}>
                GTQ {kpis.totalGanancias.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
              </div>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer>
                  <BarChart data={chartCategoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="name" stroke="#fff" tick={{ fill: '#fff' }} />
                    <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar dataKey="ganancias" fill="#4B88E5" barSize={60} label={{ position: 'top', fill: '#fff', formatter: (val: number) => `GTQ ${val.toLocaleString('es-GT', {minimumFractionDigits: 2})}` }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Fila 4: Total Ventas (Ingresos) */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 350px' }}>{renderTableCategorias('ingresos', true)}</div>
            <div style={{ flex: 1, backgroundColor: '#000', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ color: '#fff', textAlign: 'center', marginTop: 0 }}>Total Ventas por Tipo de Perfume</h3>
              <div style={{ textAlign: 'center', color: '#fff', marginBottom: '10px', fontSize: '1.1rem' }}>
                GTQ {kpis.totalIngresos.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
              </div>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer>
                  <BarChart data={chartCategoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="name" stroke="#fff" tick={{ fill: '#fff' }} />
                    <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Bar dataKey="ventas" fill="#4B88E5" barSize={60} label={{ position: 'top', fill: '#fff', formatter: (val: number) => `GTQ ${val.toLocaleString('es-GT', {minimumFractionDigits: 2})}` }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Fila 5: Top Perfumes Más Vendidos */}
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ textAlign: 'center', marginTop: 0, color: '#1c1a17', marginBottom: '20px' }}>Top Perfumes Más Vendidos</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px' }}>#</th>
                  <th style={{ padding: '12px' }}>Perfume</th>
                  <th style={{ padding: '12px' }}>Marca</th>
                  <th style={{ padding: '12px' }}>Categoría</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Unidades Vendidas</th>
                </tr>
              </thead>
              <tbody>
                {topVendidos.length > 0 ? topVendidos.map((perfume: any, index: number) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#666' }}>{index + 1}</td>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={perfume.imagen} alt={perfume.nombre} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{perfume.nombre}</div>
                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{perfume.tamanio}</div>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>{perfume.marca}</td>
                    <td style={{ padding: '12px' }}>—</td>
                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#C5A059', fontSize: '1.1rem' }}>
                      {perfume.totalVendido}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No hay órdenes confirmadas aún.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
