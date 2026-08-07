import { useState, useEffect } from 'react';

export function useBanners(page: string = '') {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const url = page ? `/api/banners?page=${page}` : `/api/banners`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setBanners(data);
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [page]);

  return { banners, loading };
}
