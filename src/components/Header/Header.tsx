import React from 'react';
import './Header.css';

import { Sidebar } from '../Sidebar/Sidebar';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Avatar } from '../Avatar/Avatar';
import { AddButton } from '../AddButton/AddButton';
import { HeaderProps } from '../../types/headerProps';

export const Header: React.FC<HeaderProps> = ({
  isOpenAvatar,
  setIsOpenAvatar,
  isOpenBurger,
  setIsOpenBurger,
}) => {
  return (
    <div className="header">
      <Avatar isOpenAvatar={isOpenAvatar} setIsOpenAvatar={setIsOpenAvatar} />
      {isOpenAvatar ? null : (
        <>
          <AddButton />
          <Sidebar />
          <BurgerMenu
            isOpenBurger={isOpenBurger}
            setIsOpenBurger={setIsOpenBurger}
          />
        </>
      )}
    </div>
  );
};
