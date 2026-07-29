import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate(user.rol === 'ADMIN' ? '/admin' : '/');
      } else {
        setAuthChecked(true);
      }
    }
  }, [user, loading, navigate]);

  if (!authChecked) {
    return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const body = isLogin 
        ? { correo: email, contrasenia: password }
        : { correo: email, contrasenia: password, nombre, apellido };

      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = Array.isArray(errorData.message) 
          ? errorData.message.join('. ') 
          : errorData.message || 'Error en la solicitud';
        throw new Error(errorMessage);
      }

      const data = await res.json();
      
      if (isLogin) {
        login({
          id: data.user.id,
          correo: data.user.correo,
          rol: data.user.rol,
          nombre: data.user.nombre,
          apellido: data.user.apellido
        });
        
        if (data.user.rol === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        // If registered successfully, switch to login
        setIsLogin(true);
        setError('Registro exitoso. Ahora puedes iniciar sesión.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="arabe-main" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px' }}>
      <div style={{ maxWidth: '400px', width: '100%', backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'center', marginBottom: '20px', color: '#1c1a17' }}>
          {isLogin ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}
        </h2>
        
        {error && <p style={{ color: error.includes('exitoso') ? 'green' : 'red', textAlign: 'center', marginBottom: '15px', fontSize: '14px', lineHeight: '1.5' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!isLogin && (
            <>
              <input 
                type="text" 
                placeholder="Nombre" 
                value={nombre} 
                onChange={e => setNombre(e.target.value)}
                required
                style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Montserrat, sans-serif' }}
              />
              <input 
                type="text" 
                placeholder="Apellido" 
                value={apellido} 
                onChange={e => setApellido(e.target.value)}
                required
                style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Montserrat, sans-serif' }}
              />
            </>
          )}
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Montserrat, sans-serif' }}
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'Montserrat, sans-serif' }}
          />
          
          <button 
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#333' : '#000',
              color: isLoading ? '#888' : '#C5A059',
              padding: '12px',
              border: 'none',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              letterSpacing: '1px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginTop: '10px',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => { if (!isLoading) { e.currentTarget.style.backgroundColor = '#C5A059'; e.currentTarget.style.color = '#000'; } }}
            onMouseOut={(e) => { if (!isLoading) { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.color = '#C5A059'; } }}
          >
            {isLoading ? 'VERIFICANDO...' : (isLogin ? 'ENTRAR' : 'REGISTRARSE')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#555' }}>
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ background: 'none', border: 'none', color: '#C5A059', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}
          >
            {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
        </p>
      </div>
    </main>
  );
}
