import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = (props: any) => {
  const { Component } = props;
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
