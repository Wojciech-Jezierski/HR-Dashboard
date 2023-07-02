import React from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';
import { LayoutProps } from '../../types/layoutProps';

export const Layout: React.FC<LayoutProps> = ({ isUserLogged }) => {
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  return (
    <div>
      <header>
        <nav>
          {isUserLogged ? (
            <Header
              isOpenAvatar={isOpenAvatar}
              setIsOpenAvatar={setIsOpenAvatar}
              isOpenBurger={isOpenBurger}
              setIsOpenBurger={setIsOpenBurger}
            />
          ) : null}
        </nav>
      </header>
      <main>{isOpenAvatar || isOpenBurger ? null : <Outlet />}</main>
    </div>
  );
};
