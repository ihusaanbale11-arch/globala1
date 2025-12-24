import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'client' | 'candidate' | 'admin' | 'agent';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { currentUser, currentCandidate, currentAgent, isAdminLoggedIn } = useData();
  const location = useLocation();

  if (role === 'client' && !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === 'candidate' && !currentCandidate) {
    return <Navigate to="/candidate/login" state={{ from: location }} replace />;
  }
  
  if (role === 'admin' && !isAdminLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (role === 'agent' && !currentAgent) {
    return <Navigate to="/agent/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;