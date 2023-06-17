import { useEffect, useState } from 'react';

export const useAuthToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const localStorageToken = localStorage.getItem('USER_TOKEN');
    const sessionStorageToken = sessionStorage.getItem('USER_TOKEN');

    if (localStorageToken) {
      setToken(localStorageToken);
    } else if (sessionStorageToken) {
      setToken(sessionStorageToken);
    }
  }, []);

  return token;
};
