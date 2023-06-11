import React from 'react';
import { BiUser } from 'react-icons/bi';
import { GrLogout } from 'react-icons/gr';
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';

import { useFetch } from 'custom_hooks/useFetch';

import { routerPaths } from '../../config/router';

export const SingleJob = () => {
  const { profile } = routerPaths;

  const [data, setData] = useState(null);
  const [title, setTitle] = useState(null);
  const [company, setCompany] = useState(null);
  const [createdAt, setCreatedAt] = useState('');
  const [longDescription, setLongDescription] = useState(null);
  const [status, setStatus] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const { firstName, lastName } = useFetch();

  document.title = `HR Dashboard - ${title}`;

  const closeAvatarWindow = () => {
    setIsOpenAvatar(false);
  };

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf('/') + 2);
  const token = localStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9595/jobs/${id} `, {
          headers: { Authorization: auth },
        });
        console.log(response.data);
        setData(response.data);
        setTitle(response.data.title);
        setCompany(response.data.companyName);
        setCreatedAt(response.data.createdAt);
        setStatus(response.data.status);
        setLongDescription(response.data.longDescription);
      } catch (error: any) {
        setFetchError(error.message);
      }
    };

    fetchData();
  }, []);

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
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
        <div className="single-job-content">
          <h1 className="text-4xl">Job: {title}</h1>
          <p className="text-xl mt-10">Company: {company}</p>
          <p className="text-xl mt-2">
            Created at: {createdAt.substring(0, 10)}{' '}
            {createdAt.substring(11, 16)}
          </p>
          <p className="text-xl mt-2">Status: {status}</p>
          <p className="text-xl mt-2">Description: {longDescription}</p>
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
