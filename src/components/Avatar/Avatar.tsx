import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BiUser } from 'react-icons/bi';
import { GrLogout } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

import { routerPaths } from '../../config/router';
import type { AvatarProps } from '../../types/avatarProps';

export const Avatar = ({ isOpenAvatar, setIsOpenAvatar }: AvatarProps) => {
  const {
    dasboard,
    profile,
    jobs,
    jobsAdd,
    candidates,
    candidatesAdd,
    blacklist,
    meetings,
    offices,
  } = routerPaths;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const location = useLocation();
  const visiblePaths = [
    dasboard.url,
    profile.url,
    jobs.url,
    jobsAdd.url,
    candidates.url,
    candidatesAdd.url,
    blacklist.url,
    meetings.url,
    offices.url,
    '/',
  ];
  const isAvatarVisible = visiblePaths.includes(location.pathname);

  const { t } = useTranslation();

  const closeAvatarWindow = () => {
    setIsOpenAvatar(false);
  };

  const token =
    localStorage.getItem('USER_TOKEN') || sessionStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/me`,
        {
          headers: { Authorization: auth },
        },
      );
      setFirstName(result.data.firstName);
      setLastName(result.data.lastName);
    };
    if (!token) {
      return;
    }
    fetchData();
  }, [token, auth]);

  const logout = () => {
    localStorage.removeItem('USER_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');

    sessionStorage.removeItem('USER_TOKEN');
    sessionStorage.removeItem('REFRESH_TOKEN');

    window.location.reload();
  };

  if (!isAvatarVisible) {
    return null;
  }

  return (
    <>
      {isOpenAvatar ? (
        <div className="window-container">
          <div className="window relative">
            <button
              className="absolute right-[-12px] top-[-10px] text-2xl"
              onClick={closeAvatarWindow}
            >
              <AiFillCloseCircle />
            </button>
            <div className="flex p-5">
              <p className="mt-2 mr-4 text-2xl bg-gray-200 w-10 h-8 rounded-xl">
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </p>
              <p className="text-2xl mt-2">
                {firstName} {lastName}
              </p>
            </div>
            <NavLink
              to={profile.url}
              onClick={closeAvatarWindow}
              className="profile"
            >
              <div className="flex text-2xl mt-8 bg-slate-100 hover:bg-slate-200 rounded-lg p-5">
                <BiUser className="text-4xl mr-4" />
                {t('Avatar.Profile')}
              </div>
            </NavLink>
            <NavLink to="/" onClick={logout} className="logout">
              <div className="flex text-2xl mt-8 bg-slate-100 hover:bg-slate-200 rounded-lg p-5">
                <GrLogout className="text-4xl mr-4" />
                {t('Avatar.Logout')}
              </div>
            </NavLink>
          </div>
        </div>
      ) : (
        <div />
      )}
      <button
        onClick={() => {
          setIsOpenAvatar(!isOpenAvatar);
        }}
      >
        <div className="avatar w-[50px] h-[50px] fixed top-5 right-10 rounded-full bg-gray-300 text-white">
          <p className="text-center mt-2 text-2xl">
            {firstName[0]}
            {lastName[0]}
          </p>
        </div>
      </button>
    </>
  );
};
