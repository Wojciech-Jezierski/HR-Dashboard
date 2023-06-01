import React, { MouseEventHandler } from 'react';
import './Dashboard.css';
import { AiOutlineHome } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { GrLogout } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { Home } from '../Home/Home';
import { routerPaths } from '../../config/router';

export const Dashboard = () => {
  document.title = `HR Dashboard - Dashboard`;

  const { profile } = routerPaths;

  const [data, setData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  const toggleMenu = () => {
    setIsOpenBurger(!isOpenBurger);
  };

  const closeAvatarWindow = () => {
    setIsOpenAvatar(false);
  };

  const closeBurgerMenu = () => {
    setIsOpenBurger(false);
  };

  const token = localStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:9595/users/me', {
        headers: { Authorization: auth },
      });
      setData(result.data);
      setFirstName(result.data.firstName);
      setLastName(result.data.lastName);
      console.log(result.data);
    };
    fetchData();
  }, [token]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="dashboard">
      {isOpenAvatar ? (
        <div className="window-container">
          <div className="window relative">
            <button
              className="absolute right-[-12px] top-[-10px] text-2xl"
              onClick={closeAvatarWindow}
            >
              <AiFillCloseCircle />
            </button>
            <NavLink to="">
              <div className="flex hover:bg-slate-200 rounded-lg p-5">
                <p className="mt-2 mr-4 text-2xl bg-gray-200 w-10 h-8 rounded-xl">
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </p>
                <p className="text-2xl mt-2">
                  {firstName} {lastName}
                </p>
              </div>
            </NavLink>
            <NavLink to={profile.url}>
              <div className="flex text-2xl mt-8 hover:bg-slate-200 rounded-lg p-5">
                <BiUser className="text-4xl mr-4" />
                Profile
              </div>
            </NavLink>
            <NavLink to="">
              <div className="flex text-2xl mt-8 hover:bg-slate-200 rounded-lg p-5">
                <GrLogout className="text-4xl mr-4" />
                Logout
              </div>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="dashboard-content">
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
              <div className="text-4xl relative">
                <button
                  className="absolute right-[-50px] top-[-70px]"
                  onClick={closeBurgerMenu}
                >
                  <AiOutlineClose />
                </button>
                <NavLink to="">
                  <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
                    <AiOutlineHome className="icon" />
                    Home
                  </div>
                </NavLink>
                <NavLink to="">
                  <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
                    <BsChatLeft className="icon" />
                    Jobs
                  </div>
                </NavLink>
                <NavLink to="">
                  <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
                    <BiUser className="icon" />
                    Candidates
                  </div>
                </NavLink>
                <NavLink to="">
                  <div className="flex mt-4 hover:bg-slate-200 rounded-lg p-5">
                    <FaRegCalendarAlt className="icon" />
                    Calendar
                  </div>
                </NavLink>
              </div>
            ) : (
              <div className="content flex justify-center items-center">
                <Home />
              </div>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => {
          setIsOpenAvatar(!isOpenAvatar);
        }}
      >
        <div className="avatar w-[50px] h-[50px] fixed top-5 right-10 rounded-full bg-gray-300 text-white">
          <p className="text-center mt-2 text-2xl">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </p>
        </div>
      </button>
    </div>
  );
};
