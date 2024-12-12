import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import DetailPage from './pages/DetailPage';
import ProtectedRoutes from './components/ProtectedRoutes';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes isLoginPage={true}><LandingPage /></ProtectedRoutes>} />
      <Route path="/login" element={<ProtectedRoutes isLoginPage={true}><Login /></ProtectedRoutes>} />
      <Route path="/register" element={<ProtectedRoutes isLoginPage={true}><Register /></ProtectedRoutes>} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
