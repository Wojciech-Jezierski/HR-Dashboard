import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { GrLogout } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { string, InferType } from 'yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { useFetch } from '../../custom_hooks/useFetch';
import { routerPaths } from '../../config/router';

export const AddJob = () => {
  document.title = `HR Dashboard - Add Job`;

  const { profile, jobs } = routerPaths;
  const [data, setData] = useState<any[]>([]);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [message, setMessage] = useState('');
  const { firstName, lastName } = useFetch();

  const navigate = useNavigate();

  const onRedirect = () => {
    navigate(`${jobs.url}`);
  };

  const userSchema = Yup.object({
    companyName: Yup.string()
      .min(5, 'Company Name must have minimum 5 characters')
      .required('This field cannot be empty'),
    logo: Yup.string().min(5, 'Logo must have minimum 3 characters'),
    longDescription: Yup.string().min(
      5,
      'Long Description must have minimum 5 characters',
    ),
    shortDescription: Yup.string()
      .min(5, 'Short Description must have minimum 5 characters')
      .required('This field cannot be empty'),
    title: Yup.string()
      .min(3, 'Title must have minimum 3 characters')
      .required('This field cannot be empty'),
  });

  type User = InferType<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(userSchema),
  });

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

  function onSubmit(values: Object) {
    return axios
      .post('http://localhost:9595/jobs', values, {
        headers: { Authorization: auth },
      })
      .then((response) => {
        console.log(response);
        onRedirect();
      })
      .catch((error) => {
        console.log(error);
        setMessage('Something went wrong. Try again later.');
      });
  }

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
              <div className="content">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-content grid grid-cols-2 gap-4 mt-10">
                    <div className="col-span-1 w-36 md:w-64 h-20">
                      <label htmlFor="jobTitle">
                        <p>Job Title:</p>
                        <input
                          className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                          placeholder="Job Title"
                          {...register('title')}
                        />
                      </label>
                      <span className="text-md text-red-500">
                        {errors?.title?.message}
                      </span>
                    </div>
                    <div className="col-span-1 w-36 md:w-64 h-20">
                      <label htmlFor="shortDescription">
                        <p>Short Description:</p>
                        <input
                          className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                          placeholder="Short Description"
                          {...register('shortDescription')}
                        />
                      </label>
                      <span className="text-md text-red-500">
                        {errors?.shortDescription?.message}
                      </span>
                    </div>
                    <div className="col-span-1 w-36 md:w-64 h-20 mt-20 md:mt-10">
                      <label htmlFor="companyName">
                        <p>Company Name:</p>
                        <input
                          className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                          placeholder="Company Name"
                          {...register('companyName')}
                        />
                      </label>
                      <span className="text-md text-red-500">
                        {errors?.companyName?.message}
                      </span>
                    </div>
                    <div className="col-span-1 row-span-2  w-36 md:w-64 h-44 mt-20 md:mt-10">
                      <label htmlFor="longDescription">
                        <p>Long Description:</p>
                        <textarea
                          className="bg-slate-200 mt-1 w-36 md:w-64 h-36 max-h-36"
                          placeholder="Long Description"
                          {...register('longDescription')}
                        />
                      </label>
                      <span className="text-md text-red-500">
                        {errors?.longDescription?.message}
                      </span>
                    </div>
                    <div className="col-span-1  w-36 md:w-64 h-20 mt-20 md:mt-10">
                      <label htmlFor="logo">
                        <p>Logo:</p>
                        <input
                          className="bg-slate-200 mt-1 w-36 md:w-64 h-12"
                          placeholder="Logo"
                          {...register('logo')}
                        />
                      </label>
                      <span className="text-md text-red-500">
                        {errors?.logo?.message}
                      </span>
                    </div>
                    <div className="col-span-2 mt-14">
                      <button
                        type="submit"
                        className="bg-orange-500 w-80 md:w-full md:text-2xl h-10 rounded-xl text-white text-xl"
                      >
                        Submit
                      </button>
                      <span className="text-xl text-red-500">{message}</span>
                    </div>
                  </div>
                </form>
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
