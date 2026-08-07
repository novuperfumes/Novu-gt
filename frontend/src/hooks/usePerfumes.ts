import { useState, useEffect } from 'react';

export interface Presentacion {
  id: number;
  id_perfume: number;
  tamanio: string;
  precio: number | string;
  stock: number;
}

export interface Decant {
  id: number;
  id_perfume: number;
  ml_origen: number;
  precio_5ml: number | string;
  stock_5ml: number;
  precio_10ml: number | string;
  stock_10ml: number;
}

export interface Perfume {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string;
  marca: string;
  activo: boolean;
  presentaciones: Presentacion[];
  decant?: Decant;
  genero?: 'el' | 'ella' | 'unisex';
  subcategorias?: string[];
  galeria?: string[];
}

const formatGender = (g?: string): 'el' | 'ella' | 'unisex' => {
  if (!g) return 'unisex';
  const val = g.toLowerCase().trim();
  if (val === 'masculino' || val === 'el' || val === 'hombre' || val === 'él') return 'el';
  if (val === 'femenino' || val === 'ella' || val === 'mujer') return 'ella';
  return 'unisex';
};

export function usePerfumes() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [bestSellers, setBestSellers] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPerfumes();
    fetchBestSellers();
  }, []);

  const fetchPerfumes = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/perfumes');
      if (!response.ok) throw new Error('Error al obtener perfumes');
      const data = await response.json();
      
      const enrichedData = data.map((p: any) => ({
        ...p,
        genero: formatGender(p.genero), 
        subcategorias: p.subcategorias || ['novedades', 'indispensables', 'esenciales', 'favoritas']
      }));
      
      setPerfumes(enrichedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBestSellers = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/perfumes/best-sellers');
      if (response.ok) {
        const data = await response.json();
        const enrichedData = data.map((p: any) => ({
          ...p,
          genero: formatGender(p.genero), 
          subcategorias: p.subcategorias || ['novedades', 'indispensables', 'esenciales', 'favoritas']
        }));
        setBestSellers(enrichedData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getPerfumeById = (id: number) => {
    return perfumes.find(p => p.id === id);
  };

  const filterByCategory = (category: string) => {
    return perfumes.filter(p => p.categoria.toLowerCase() === category.toLowerCase());
  };

  return { perfumes, bestSellers, loading, error, getPerfumeById, filterByCategory };
}
