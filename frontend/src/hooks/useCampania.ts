import { useState, useEffect } from 'react';
import type { Perfume } from './usePerfumes';


export interface Campania {
  id: number;
  nombre: string;
  activa: boolean;
  tipo: 'GLOBAL' | 'CATEGORIA' | 'SELECCION';
  descuento: number | string;
  categorias?: string | null; // JSON array: '["arabe","nicho"]'
  perfume_ids?: string | null; // JSON array: '[1,2,3]'
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  creado_en: string;
}

export interface PrecioConDescuento {
  precioOriginal: number;
  precioFinal: number;
  tieneDescuento: boolean;
  porcentaje: number;
}

export function useCampania() {
  const [campania, setCampania] = useState<Campania | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/campanias/activa')
      .then(r => r.ok ? r.json() : null)
      .then(data => setCampania(data))
      .catch(() => setCampania(null))
      .finally(() => setLoading(false));
  }, []);

  /**
   * Calcula si un perfume tiene descuento activo y cuánto.
   */
  const aplicaDescuento = (perfume: Perfume): boolean => {
    if (!campania) return false;

    if (campania.tipo === 'GLOBAL') return true;

    if (campania.tipo === 'CATEGORIA' && campania.categorias) {
      try {
        const cats: string[] = JSON.parse(campania.categorias);
        return cats.some(c => c.toLowerCase() === (perfume.categoria || '').toLowerCase());
      } catch { return false; }
    }

    if (campania.tipo === 'SELECCION' && campania.perfume_ids) {
      try {
        const ids: number[] = JSON.parse(campania.perfume_ids);
        return ids.includes(perfume.id);
      } catch { return false; }
    }

    return false;
  };

  /**
   * Retorna precio original, precio final y si tiene descuento.
   */
  const calcularPrecio = (perfume: Perfume, precioBase: number): PrecioConDescuento => {
    if (!campania || !aplicaDescuento(perfume)) {
      return {
        precioOriginal: precioBase,
        precioFinal: precioBase,
        tieneDescuento: false,
        porcentaje: 0,
      };
    }

    const pct = Number(campania.descuento);
    const precioFinal = precioBase * (1 - pct / 100);

    return {
      precioOriginal: precioBase,
      precioFinal: Math.round(precioFinal * 100) / 100,
      tieneDescuento: true,
      porcentaje: pct,
    };
  };

  return { campania, loading, calcularPrecio, aplicaDescuento };
}
