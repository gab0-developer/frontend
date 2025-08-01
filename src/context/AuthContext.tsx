// authContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { decodeToken, isTokenExpired } from "../utils/auth/jwt";

interface AuthContextType {
    user: any;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Estado de carga inicial

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          const userData = decodeToken(token);
          
          // Verifica si el token es válido y no ha expirado
          if (userData && !isTokenExpired(token)) {
            setUser(userData);
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    const userData = decodeToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  if (loading) {
    return <div>Cargando...</div>; // O tu componente de carga
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
    return useContext(AuthContext) as AuthContextType;
};