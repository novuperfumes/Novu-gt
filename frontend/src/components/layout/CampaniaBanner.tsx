import { useCampania } from '../../hooks/useCampania';

export function CampaniaBanner() {
  const { campania } = useCampania();

  if (!campania) return null;

  return (
    <div className="campania-container" style={{ width: '100%', backgroundColor: '#000', display: 'flex', flexDirection: 'column' }}>
      {campania.imagen && (
        <img 
          src={campania.imagen} 
          alt={campania.nombre} 
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', display: 'block' }} 
        />
      )}
      <div className="campania-banner">
        <span>✦</span> {campania.nombre} — {Number(campania.descuento)}% de descuento en perfumes seleccionados <span>✦</span>
      </div>
    </div>
  );
}
