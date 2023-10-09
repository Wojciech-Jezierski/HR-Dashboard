import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BiUser } from 'react-icons/bi';
import { GrLogout } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';

import { routerPaths } from '../../config/router';
import type { AvatarProps } from '../../types/avatarProps';

export const Avatar = ({ isOpenAvatar, setIsOpenAvatar }: AvatarProps) => {
  const { dasboard, profile, jobs, jobsAdd, candidates, candidatesAdd } =
    routerPaths;

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
    '/',
  ];
  const isAvatarVisible = visiblePaths.includes(location.pathname);

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
            <NavLink to={profile.url} onClick={closeAvatarWindow}>
              <div className="flex text-2xl mt-8 hover:bg-slate-200 rounded-lg p-5">
                <BiUser className="text-4xl mr-4" />
                Profile
              </div>
            </NavLink>
            <NavLink to="/" onClick={logout}>
              <div className="flex text-2xl mt-8 hover:bg-slate-200 rounded-lg p-5">
                <GrLogout className="text-4xl mr-4" />
                Logout
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
