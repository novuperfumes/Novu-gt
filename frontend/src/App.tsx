import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { CartModal } from './components/layout/CartModal';
import { ProfileModal } from './components/layout/ProfileModal';
import { CheckoutModal } from './components/layout/CheckoutModal';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { CampaniaBanner } from './components/layout/CampaniaBanner';
import { Home } from './pages/Home';
import { Arabe } from './pages/Arabe';
import { Decants } from './pages/Decants';
import { Disenador } from './pages/Disenador';
import { Nicho } from './pages/Nicho';
import { VerTodas } from './pages/VerTodas';
import { Faq } from './pages/Faq';
import { SobreNosotros } from './pages/SobreNosotros';
import { Contacto } from './pages/Contacto';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { PerfumeDetail } from './pages/PerfumeDetail';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {!isHome && <Header />}
      {!isHome && <CampaniaBanner />}
      <CartModal />
      <ProfileModal />
      <CheckoutModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arabe" element={<Arabe />} />
        <Route path="/disenador" element={<Disenador />} />
        <Route path="/nicho" element={<Nicho />} />
        <Route path="/decants" element={<Decants />} />
        <Route path="/todas" element={<VerTodas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/perfume/:id" element={<PerfumeDetail />} />
      </Routes>
    </>
  );
}

export default App;
