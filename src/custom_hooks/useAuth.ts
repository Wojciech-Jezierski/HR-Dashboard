import { useState, useEffect } from 'react';

import { refreshAuthToken } from '../services/AuthService';

type SetSecondsFunction = (seconds: number) => void;

export function useAuth(
  remainingSeconds: number,
  setSeconds: SetSecondsFunction,
) {
  const [isUserLoggedd, setIsUserLogged] = useState(false);
  const [token, setToken] = useState('');
  const [isChecked, setIsChecked] = useState(false); // Chodzi o to czy był zaznaczony check box przy logowaniu, jeśli był to token będzie aktualizowany w local storage, a jeśli nie to w session storage

  useEffect(() => {
    const localToken = localStorage.getItem('USER_TOKEN');
    const sessionToken = sessionStorage.getItem('USER_TOKEN');
    if (localToken) {
      setToken(localToken);
      setIsUserLogged(true);
      setIsChecked(true);
    }
    if (sessionToken) {
      setToken(sessionToken);
      setIsUserLogged(true);
    }
  }, []);

  const refreshToken = async () => {
    const refToken =
      localStorage.getItem('REFRESH_TOKEN') ||
      sessionStorage.getItem('REFRESH_TOKEN');

    try {
      const accessToken = await refreshAuthToken(refToken, isChecked);
      setToken(accessToken);
      setSeconds(remainingSeconds);
    } catch (error) {
      console.log(error);
      setIsUserLogged(false);
    }
  };

  return {
    isUserLoggedd,
    token,
    refreshToken,
  };
}
