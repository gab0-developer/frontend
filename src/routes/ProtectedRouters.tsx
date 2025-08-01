import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRouters = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // Muestra un loader mientras verifica
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};