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
  const url = typeof input === 'string' ? input : (input instanceof Request ? input.url : input.toString());
  let rewrittenUrl = url;
  
  // Rewrite localhost:3000 (and configured API URL) to the local Vite proxy
  if (url.startsWith(import.meta.env.VITE_API_URL + '')) {
    rewrittenUrl = url.replace(import.meta.env.VITE_API_URL + '', '/api');
  } else if (import.meta.env.VITE_API_URL && url.startsWith(import.meta.env.VITE_API_URL)) {
    rewrittenUrl = url.replace(import.meta.env.VITE_API_URL, '/api');
  }
  
  // Intercept requests to backend (now via proxy)
  if (rewrittenUrl.startsWith('/api')) {
    init = init || {};
    init.credentials = 'same-origin'; // Use same-origin since it's proxied
    
    const method = init.method?.toUpperCase() || 'GET';
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      if (!csrfToken) {
        try {
          const res = await originalFetch('/api/auth/csrf', { credentials: 'same-origin' });
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
  
  // If the input was a Request object, we must create a new one with the rewritten URL
  if (input instanceof Request) {
    return originalFetch(new Request(rewrittenUrl, { ...input, ...init }));
  }
  
  return originalFetch(rewrittenUrl, init);
};

// Prefetch token on app start
originalFetch('/api/auth/csrf', { credentials: 'same-origin' })
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
