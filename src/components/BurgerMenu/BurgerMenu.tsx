import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineClose } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { GiBlackFlag } from 'react-icons/gi';
import { HiBuildingOffice2 } from 'react-icons/hi2';

import { routerPaths } from '../../config/router';

interface ChildProps {
  isOpenBurger: boolean;
  setIsOpenBurger: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BurgerMenu: React.FC<ChildProps> = ({
  isOpenBurger,
  setIsOpenBurger,
}) => {
  const { dasboard, jobs, candidates, blacklist, meetings, offices } =
    routerPaths;

  const closeBurgerMenu = () => {
    setIsOpenBurger(false);
  };

  const toggleMenu = () => {
    setIsOpenBurger(!isOpenBurger);
  };
  return (
    <div className="burger-menu">
      <button
        className={`burger ${isOpenBurger ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </button>
      {isOpenBurger ? (
        <div className="text-2xl relative">
          <button
            className="absolute right-[-50px] top-[-70px]"
            onClick={closeBurgerMenu}
          >
            <AiOutlineClose />
          </button>
          <NavLink to={dasboard.url}>
            <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
              <AiOutlineHome className="icon" />
              Home
            </div>
          </NavLink>
          <NavLink to={jobs.url}>
            <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
              <BsChatLeft className="icon" />
              Jobs
            </div>
          </NavLink>
          <NavLink to={candidates.url}>
            <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
              <BiUser className="icon" />
              Candidates
            </div>
          </NavLink>
          <NavLink to={blacklist.url}>
            <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
              <GiBlackFlag className="icon" />
              Blacklist
            </div>
          </NavLink>
          <NavLink to={meetings.url}>
            <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
              <FaRegCalendarAlt className="icon" />
              Calendar
            </div>
          </NavLink>
          <NavLink to={offices.url}>
            <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
              <HiBuildingOffice2 className="icon" />
              Offices
            </div>
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};
