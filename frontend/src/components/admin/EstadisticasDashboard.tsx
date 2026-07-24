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
      return; 
    }
    fetchStats();
  }, [startDate, endDate, gender]);

  const kpis = data?.kpis || { totalVendido: 0, totalIngresos: 0, totalGanancias: 0 };
  const monthlyData = data?.monthlyData || [];
  const summaryByCategory = data?.summaryByCategory || { Arabe: {}, Diseñador: {}, Nicho: {} };
  const summaryByGender = data?.summaryByGender || { Hombre: 0, Mujer: 0 };

  // Datos para gráficas (Global del periodo seleccionado)
  const chartCategoryData = [
    { name: 'A', cantidad: summaryByCategory.Arabe?.cantidad || 0, ventas: summaryByCategory.Arabe?.ingresos || 0, ganancias: summaryByCategory.Arabe?.ganancias || 0 },
    { name: 'D', cantidad: summaryByCategory.Diseñador?.cantidad || 0, ventas: summaryByCategory.Diseñador?.ingresos || 0, ganancias: summaryByCategory.Diseñador?.ganancias || 0 },
    { name: 'N', cantidad: summaryByCategory.Nicho?.cantidad || 0, ventas: summaryByCategory.Nicho?.ingresos || 0, ganancias: summaryByCategory.Nicho?.ganancias || 0 }
  ];

  const chartGenderData = [
    { name: 'M', value: summaryByGender.Mujer || 0 }, // Naranja en mock
    { name: 'H', value: summaryByGender.Hombre || 0 }  // Azul en mock
  ];

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
            Compras de Hombres vs Mujeres
          </th>
        </tr>
      </thead>
      <tbody>
        {monthlyData.map((m: any) => (
          <React.Fragment key={m.month}>
            <tr>
              <td rowSpan={2} style={{ border: '1px solid #ddd', padding: '8px', verticalAlign: 'middle', fontWeight: 'bold' }}>
                {getMonthName(m.month)}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>H</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{m.generos.Hombre}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>M</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{m.generos.Mujer}</td>
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
          <p style={{ margin: 0 }}>{`${label}: ${payload[0].value}`}</p>
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

          {/* Fila 2: Hombres vs Mujeres */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 350px' }}>{renderTableGenero()}</div>
            <div style={{ flex: 1, backgroundColor: '#000', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ color: '#fff', textAlign: 'center', marginTop: 0 }}>Compras de Hombres vs Mujeres</h3>
              <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartGenderData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label={({ value }) => value} labelLine={false}>
                      {chartGenderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: '#fff', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#3B82F6' }}></div> H</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F97316' }}></div> M</div>
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

        </div>
      )}
    </div>
  );
}
