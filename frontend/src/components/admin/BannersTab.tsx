import { useState, useEffect, useRef } from 'react';

export function BannersTab() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [form, setForm] = useState({
    page: 'disenador',
    bgImage: '',
    tag: '',
    title: '',
    desc: '',
    link: '',
    btnText: '',
    activo: true,
    orden: 0 as number | string,
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/banners?admin=true', { credentials: 'include' });
      const data = await res.json();
      setBanners(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file); // Use the correct field name for fastify-multipart. Wait, the controller uses `req.file()`, which gets the first file.

    setUploading(true);
    try {
      const res = await fetch('/api/uploads/image', {
        method: 'POST',
        body: fd,
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setForm({ ...form, bgImage: data.url });
      } else {
        alert('Error al subir la imagen');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.bgImage || !form.title) {
      alert('La imagen de fondo y el título son obligatorios');
      return;
    }

    try {
      const url = editingBanner ? `/api/banners/${editingBanner.id}` : '/api/banners';
      const method = editingBanner ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include',
      });

      if (res.ok) {
        alert(editingBanner ? 'Banner actualizado' : 'Banner creado');
        setEditingBanner(null);
        setForm({ page: 'disenador', bgImage: '', tag: '', title: '', desc: '', link: '', btnText: '', activo: true, orden: 0 });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        fetchBanners();
      } else {
        alert('Error al guardar el banner');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    }
  };

  const handleEdit = (b: any) => {
    setEditingBanner(b);
    setForm({
      page: b.page,
      bgImage: b.bgImage,
      tag: b.tag || '',
      title: b.title,
      desc: b.desc || '',
      link: b.link || '',
      btnText: b.btnText || '',
      activo: b.activo,
      orden: b.orden,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar banner?')) return;
    try {
      const res = await fetch(`/api/banners/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ marginBottom: '20px' }}>Gestión de Banners Principales (Carrusel)</h3>
      
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
        <h4>{editingBanner ? 'Editar Banner' : 'Añadir Nuevo Banner'}</h4>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 600 }}>Página / Colección</label>
            <select value={form.page} onChange={e => setForm({...form, page: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="disenador">Diseñador</option>
              <option value="arabe">Árabe</option>
              <option value="nicho">Nicho</option>
              <option value="decants">Decants</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 600 }}>Imagen de Fondo *</label>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ marginBottom: '10px', display: 'block' }} />
            {uploading && <span>Subiendo imagen...</span>}
            {form.bgImage && !uploading && (
              <img src={form.bgImage.startsWith('http') ? form.bgImage : `http://localhost:3000${form.bgImage}`} alt="Preview" style={{ height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 600 }}>Etiqueta Superior (ej. "NUEVO ELIXIR")</label>
              <input type="text" value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 600 }}>Título Principal * (ej. "DIOR SAUVAGE")</label>
              <input type="text" value={form.title} required onChange={e => setForm({...form, title: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 600 }}>Descripción Larga</label>
            <textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} rows={3} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 600 }}>Texto del Botón (ej. "VER MÁS")</label>
              <input type="text" value={form.btnText} onChange={e => setForm({...form, btnText: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 600 }}>Enlace del Botón</label>
              <input type="text" value={form.link} onChange={e => setForm({...form, link: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#666', lineHeight: '1.4', background: '#e5e7eb', padding: '8px', borderRadius: '4px' }}>
                <strong>Guía rápida de enlaces:</strong>
                <ul style={{ margin: '5px 0 0 20px', padding: 0 }}>
                  <li><code>#novedades-section</code> (Baja a la sección de Novedades en esa misma página)</li>
                  <li><code>#grid-section</code> (Baja a la cuadrícula de todos los productos)</li>
                  <li><code>/perfume/1</code> (Lleva a la página del producto con ID 1)</li>
                  <li><code>/arabe</code> (Lleva a la categoría Árabe, funciona con cualquier otra)</li>
                  <li>Si lo dejas en blanco (junto con el texto), el botón no se mostrará.</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 600 }}>Orden de aparición</label>
              <input type="number" min="0" value={form.orden} onChange={e => setForm({...form, orden: e.target.value === '' ? '' : Number(e.target.value)})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="activoBanner" checked={form.activo} onChange={e => setForm({...form, activo: e.target.checked})} style={{ width: '20px', height: '20px' }} />
              <label htmlFor="activoBanner" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mostrar en la tienda (Activo)</label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1c1a17', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
              {editingBanner ? 'Guardar Cambios' : 'Añadir Banner'}
            </button>
            {editingBanner && (
              <button type="button" onClick={() => { setEditingBanner(null); setForm({ page: 'disenador', bgImage: '', tag: '', title: '', desc: '', link: '', btnText: '', activo: true, orden: 0 }); }} style={{ padding: '10px 20px', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {loading ? <p>Cargando banners...</p> : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {banners.map(b => (
            <div key={b.id} style={{ display: 'flex', gap: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px', alignItems: 'center', background: b.activo ? '#fff' : '#f9f9f9', opacity: b.activo ? 1 : 0.6 }}>
              <img src={b.bgImage.startsWith('http') ? b.bgImage : `http://localhost:3000${b.bgImage}`} alt={b.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.7rem', background: '#eee', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>{b.page}</span>
                <h4 style={{ margin: '5px 0' }}>{b.title}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Orden: {b.orden}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleEdit(b)} style={{ padding: '8px 12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Editar</button>
                <button onClick={() => handleDelete(b.id)} style={{ padding: '8px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
              </div>
            </div>
          ))}
          {banners.length === 0 && <p>No hay banners creados.</p>}
        </div>
      )}
    </div>
  );
}
