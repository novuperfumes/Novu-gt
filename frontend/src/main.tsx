import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
import './index.css'
import './assets/css/styles.css'
import './assets/css/cart-modal.css'
import './assets/css/arabe.css'
import './assets/css/disenador.css'
import './assets/css/nicho.css'
import App from './App.tsx'

// Global fetch interceptor for CSRF
let csrfToken = '';
const originalFetch = window.fetch;

window.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
  
  // Intercept requests to backend
  if (url.startsWith('http://localhost:3000') || url.startsWith(import.meta.env.VITE_API_URL || '')) {
    init = init || {};
    init.credentials = 'include';
    
    const method = init.method?.toUpperCase() || 'GET';
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      if (!csrfToken) {
        try {
          const res = await originalFetch('http://localhost:3000/auth/csrf', { credentials: 'include' });
          if (res.ok) {
            const data = await res.json();
            csrfToken = data.csrfToken;
          }
        } catch (e) {
          console.error('Failed to fetch CSRF token', e);
        }
      }
      
      init.headers = {
        ...init.headers,
        'x-csrf-token': csrfToken,
      };
    }
  }
  
  return originalFetch(input, init);
};

// Prefetch token on app start
originalFetch('http://localhost:3000/auth/csrf', { credentials: 'include' })
  .then(res => res.ok ? res.json() : null)
  .then(data => {
    if (data?.csrfToken) csrfToken = data.csrfToken;
  })
  .catch(() => {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
