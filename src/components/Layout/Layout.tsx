import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GrLanguage } from 'react-icons/gr';

import { Header } from '../Header/Header';
import type { LayoutProps } from '../../types/layoutProps';
import type { DecodedToken } from '../../types/token';
import { useAuth } from '../../custom_hooks/useAuth';
import { useEmployeeOfMonth } from '../../custom_hooks/useEmployeeOfMonth';

export const Layout = ({ isUserLogged, setIsUserLogged }: LayoutProps) => {
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [errorAlert, setErrorAlert] = useState<string>('');

  const { token, refreshToken } = useAuth(seconds, setSeconds);

  const { t, i18n } = useTranslation();
  const { data, isLoading, isError } = useEmployeeOfMonth();

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
  }, [isUserLogged, token, initialToken]);

  useEffect(() => {
    if (seconds === 1) {
      setIsUserLogged(false);
      window.location.reload();
    }
  }, [seconds, setIsUserLogged]);

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <header>
        <nav>
          {errorAlert}
          {isUserLogged ? (
            <>
              <div className="absolute top-8 right-24 md:right-28 xl:right-36">
                <label htmlFor="language" className="flex">
                  <GrLanguage className="mt-1 mr-1" />
                  <select onChange={onClickLanguageChange} id="language">
                    <option value="en">English</option>
                    <option value="pl">Polish</option>
                  </select>
                </label>
              </div>
              {data ? (
                <p className="mr-14 md:mt-1 mt-64">
                  {t('Employee.EmployeeOfMonth')}{' '}
                  <span className="font-bold">
                    {data.firstName} {data.lastName}
                  </span>
                </p>
              ) : null}

              <div className="md:flex">
                <div className="mt-5 md:mt-16 flex text-md md:text-xl bg-orange-400 text-white w-40 h-10 md:w-52 md:h-12 justify-center items-center rounded-xl">
                  <p>{t('Layout.Expire')}</p>
                  <p className="ml-2">{seconds > 0 && seconds}</p>
                </div>
                <button
                  onClick={refreshToken}
                  className="bg-orange-400 text-white w-20 h-10 md:w-24 md:h-12 mt-5 md:mt-[65px] ml-7 rounded-xl md:text-xl text-md"
                >
                  {t('Layout.Refresh')}
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
