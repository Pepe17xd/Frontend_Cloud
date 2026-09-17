import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  requiredRole?: 'ADMIN' | 'USER' | string;
}

export function ProtectedRoute({ requiredRole }: ProtectedRouteProps = {}) {
  const { isAuthenticated, user } = useAuth(); 
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  if (requiredRole && user?.role?.toUpperCase() !== requiredRole.toUpperCase()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
