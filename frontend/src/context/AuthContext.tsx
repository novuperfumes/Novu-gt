import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: number;
  correo: string;
  rol: string;
  nombre: string;
  apellido: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  isProfileOpen: boolean;
  openProfile: () => void;
  closeProfile: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isProfileOpen: false,
  openProfile: () => {},
  closeProfile: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  useEffect(() => {
    // Check if user is logged in via HttpOnly cookie by hitting /auth/me
    const fetchSession = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + '/auth/me', {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          // The backend returns the JWT payload { sub, email, role } from the guard.
          // In /auth/me we get request.user.
          setUser({
            id: data.sub,
            correo: data.email,
            rol: data.role,
            nombre: data.nombre || '',
            apellido: data.apellido || '',
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch(import.meta.env.VITE_API_URL + '/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error('Error logging out:', err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isProfileOpen, openProfile, closeProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
