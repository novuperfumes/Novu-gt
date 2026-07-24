import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

export function EstadisticasDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [dateRange, setDateRange] = useState('mes_actual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [gender, setGender] = useState('todos');

  // Tipo de gráfico
  const [chartType, setChartType] = useState('line');

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

      const res = await fetch(`http://localhost:3000/sales-reports/dashboard-stats?${params.toString()}`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dateRange === 'personalizado' && (!startDate || !endDate)) {
      return; // Esperar a que seleccione ambas fechas
    }
    fetchStats();
  }, [startDate, endDate, gender]);

  const kpis = data?.kpis || { totalVendido: 0, totalIngresos: 0, totalGanancias: 0 };
  const chartData = data?.chartData || [];

  return (
    <div className="estadisticas-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: '#1c1a17' }}>
      
      {/* Controles de Filtros */}
      <div className="filtros-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Rango de Tiempo</label>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}
          >
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
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Fecha Fin</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}
              />
            </div>
          </>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Género</label>
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)}
            style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}
          >
            <option value="todos">Todos</option>
            <option value="el">Hombre (Él)</option>
            <option value="ella">Mujer (Ella)</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

      </div>

      {/* KPIs */}
      {loading ? (
        <p>Cargando estadísticas...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#1c1a17', color: '#fff', padding: '25px', borderRadius: '12px', borderBottom: '4px solid #C5A059' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#a8a297', textTransform: 'uppercase' }}>Perfumes Vendidos</h3>
              <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>{kpis.totalVendido}</p>
            </div>
            <div style={{ backgroundColor: '#1c1a17', color: '#fff', padding: '25px', borderRadius: '12px', borderBottom: '4px solid #4CAF50' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#a8a297', textTransform: 'uppercase' }}>Ingresos Totales (Ventas)</h3>
              <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>Q {kpis.totalIngresos.toFixed(2)}</p>
            </div>
            <div style={{ backgroundColor: '#1c1a17', color: '#fff', padding: '25px', borderRadius: '12px', borderBottom: '4px solid #2196F3' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#a8a297', textTransform: 'uppercase' }}>Ganancia Neta</h3>
              <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>Q {kpis.totalGanancias.toFixed(2)}</p>
            </div>
          </div>

          {/* Gráfico Principal */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontFamily: '"Cinzel", serif', fontWeight: 700 }}>Ventas en el tiempo (Ingresos Q)</h3>
              <select 
                value={chartType} 
                onChange={(e) => setChartType(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
              >
                <option value="line">Líneas</option>
                <option value="bar">Barras</option>
              </select>
            </div>

            {chartData.length === 0 ? (
              <div style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                No hay ventas registradas en este período.
              </div>
            ) : (
              <div style={{ width: '100%', height: '400px' }}>
                <ResponsiveContainer>
                  {chartType === 'line' ? (
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Arabe" stroke="#C5A059" strokeWidth={3} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Nicho" stroke="#2196F3" strokeWidth={3} />
                      <Line type="monotone" dataKey="Diseñador" stroke="#4CAF50" strokeWidth={3} />
                    </LineChart>
                  ) : (
                    <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="Arabe" fill="#C5A059" />
                      <Bar dataKey="Nicho" fill="#2196F3" />
                      <Bar dataKey="Diseñador" fill="#4CAF50" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
