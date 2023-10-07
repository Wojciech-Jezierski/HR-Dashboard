import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';
import { LayoutProps } from '../../types/layoutProps';
import { DecodedToken } from '../../types/token';
import { useAuth } from '../../custom_hooks/useAuth';

export const Layout: React.FC<LayoutProps> = ({
  isUserLogged,
  setIsUserLogged,
}) => {
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [errorAlert, setErrorAlert] = useState<string>('');

  const { token, refreshToken } = useAuth(seconds, setSeconds);

  const initialToken =
    window.localStorage.getItem('USER_TOKEN') ||
    window.sessionStorage.getItem('USER_TOKEN');
  useEffect(() => {
    if (isUserLogged) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
        if (initialToken) {
          try {
            const decodedToken = jwt_decode(initialToken) as DecodedToken;

            const currentTimestamp = Math.floor(Date.now() / 1000);
            const remainingSeconds = decodedToken.exp - currentTimestamp;
            setSeconds(remainingSeconds);
          } catch (error) {
            setErrorAlert(error as string);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isUserLogged, token]);

  useEffect(() => {
    if (seconds === 1) {
      setIsUserLogged(false);
      window.location.reload();
    }
  }, [seconds]);

  return (
    <div>
      <header>
        <nav>
          {errorAlert}
          {isUserLogged ? (
            <>
              <div className="md:flex">
                <div className="mt-48 md:mt-16 flex text-md md:text-xl bg-orange-400 text-white w-40 h-10 md:w-52 md:h-12 justify-center items-center rounded-xl">
                  <p>Session expire:</p>
                  <p className="ml-2">{seconds > 0 && seconds}</p>
                </div>
                <button
                  onClick={refreshToken}
                  className="bg-orange-400 text-white w-20 h-10 md:w-24 md:h-12 mt-5 md:mt-[65px] ml-7 rounded-xl md:text-xl text-md"
                >
                  Refresh
                </button>
              </div>
              <Header
                isOpenAvatar={isOpenAvatar}
                setIsOpenAvatar={setIsOpenAvatar}
                isOpenBurger={isOpenBurger}
                setIsOpenBurger={setIsOpenBurger}
              />
            </>
          ) : null}
        </nav>
      </header>
      <main>{isOpenAvatar || isOpenBurger ? null : <Outlet />}</main>
    </div>
  );
};
