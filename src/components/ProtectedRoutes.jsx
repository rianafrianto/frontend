import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const ProtectedRoutes = ({ isLoginPage, children }) => {
  const { token } = useContext(DataContext);
  const localToken = localStorage.getItem("token");
  const isLoggedIn = token || localToken;

  if (isLoggedIn && isLoginPage) {
    return <Navigate to="/homepage" />;
  }

  if (isLoggedIn) {
    return <Outlet />;
  }

  return isLoginPage ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
