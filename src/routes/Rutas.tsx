// Rutas.tsx
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRouters } from './ProtectedRouters';
import Dashboard from '../pages/Dashboard';
// import Dashboard from './../templates/dashboard/Dashboard';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Layout from '../templates/layout/Layout';
import IndexJob from './../pages/job/IndexJob';
import RequestReset from '../pages/auth/RequestReset';
import VerifyCode from '../pages/auth/VerifyCode';
import ResetPassword from '../pages/auth/ResetPassword';

const Rutas = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sendemail" element={<RequestReset />} />
        <Route path="/verifycode" element={<VerifyCode />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* <Route path="/dash" element={<Dashboard />} /> */}
        <Route element={<Layout />}>
          <Route element={<ProtectedRouters />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/job" element={<IndexJob />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};


export default Rutas