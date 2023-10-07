import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  Component: React.ComponentType; // The type of the component to render
}

export const ProtectedRoute = ({ Component }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    const login =
      localStorage.getItem('USER_TOKEN') ||
      sessionStorage.getItem('USER_TOKEN');
    if (!login) {
      navigate('/');
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
};
