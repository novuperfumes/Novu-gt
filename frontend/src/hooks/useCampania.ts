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
  const [campaniasActivas, setCampaniasActivas] = useState<Campania[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/campanias/activa')
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        if (Array.isArray(data)) setCampaniasActivas(data);
        else if (data) setCampaniasActivas([data]);
        else setCampaniasActivas([]);
      })
      .catch(() => setCampaniasActivas([]))
      .finally(() => setLoading(false));
  }, []);

  const aplicaDescuento = (perfume: Perfume, campania?: Campania): boolean => {
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
    if (!campaniasActivas.length) {
      return {
        precioOriginal: precioBase,
        precioFinal: precioBase,
        tieneDescuento: false,
        porcentaje: 0,
      };
    }

    let maxDescuento = 0;
    for (const c of campaniasActivas) {
      if (aplicaDescuento(perfume, c)) {
        const d = Number(c.descuento);
        if (d > maxDescuento) maxDescuento = d;
      }
    }

    if (maxDescuento === 0) {
      return {
        precioOriginal: precioBase,
        precioFinal: precioBase,
        tieneDescuento: false,
        porcentaje: 0,
      };
    }

    const precioFinal = precioBase * (1 - maxDescuento / 100);

    return {
      precioOriginal: precioBase,
      precioFinal: Math.round(precioFinal * 100) / 100,
      tieneDescuento: true,
      porcentaje: maxDescuento,
    };
  };

  // 'campania' es la primera para compatibilidad con CampaniaBanner.tsx
  return { campania: campaniasActivas.length > 0 ? campaniasActivas[0] : null, campaniasActivas, loading, calcularPrecio, aplicaDescuento };
}
