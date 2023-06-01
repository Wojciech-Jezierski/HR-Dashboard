import React from 'react';
import { BiUser } from 'react-icons/bi';
import { GrLogout } from 'react-icons/gr';
import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { string, InferType } from 'yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './Profile.css';
import { AiFillCloseCircle } from 'react-icons/ai';

import { routerPaths } from '../../config/router';

export const Profile = () => {
  document.title = `HR Dashboard - Profile`;

  const { profile, signIn } = routerPaths;

  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);

  const navigate = useNavigate();

  const onRedirect = () => {
    navigate(`${signIn.url}`);
  };

  const closeAvatarWindow = () => {
    setIsOpenAvatar(false);
  };

  const userSchemaPasswordsValidation = Yup.object({
    oldPassword: string()
      .min(5, 'Password must have minimum 5 characters')
      .max(15, 'Please use at most 15 characters')
      .required('This field cannot be empty'),
    password: string()
      .min(5, 'Password must have minimum 5 characters')
      .max(15, 'Please use at most 15 characters')
      .required('This field cannot be empty'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password must be the same')
      .required('This field cannot be empty'),
  });

  function onSubmitPasswords(values: Object) {
    return axios
      .put('http://localhost:9595/auth/change-password', values)
      .then(() => {
        window.localStorage.removeItem('USER_TOKEN');
        onRedirect();
      })
      .catch((error) => {
        console.log(error);
        setMessage('Something went wrong. Try again later.');
      });
  }

  type UserPasswords = InferType<typeof userSchemaPasswordsValidation>;

  const {
    register: registerPassword,
    handleSubmit: handlePasswordsSubmit,
    formState: { errors: errorsPasswords },
  } = useForm<UserPasswords>({
    resolver: yupResolver(userSchemaPasswordsValidation),
  });

  const userSchemaNamesValidation = Yup.object({
    firstName: Yup.string()
      .min(3, 'Please use at least 3 characters')
      .max(15, 'Please use at most 15 characters')
      .required('This field cannot be empty'),
    lastName: Yup.string()
      .min(3, 'Please use at least 3 characters')
      .max(15, 'Please use at most 15 characters')
      .required('This field cannot be empty'),
  });

  function onSubmitNames(values: Object) {
    const token = localStorage.getItem('USER_TOKEN');
    const auth = `Bearer ${token}`;
    return axios
      .put('http://localhost:9595/users/me', values, {
        headers: { Authorization: auth },
      })
      .then(() => {
        setMessage1('Name has been change successfully.');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setMessage1('Something went wrong. Try again later.');
      });
  }

  type UserNames = InferType<typeof userSchemaNamesValidation>;

  const {
    register: registerNames,
    handleSubmit: handleNamesSubmit,
    formState: { errors: errorsNames },
  } = useForm<UserNames>({
    resolver: yupResolver(userSchemaNamesValidation),
  });

  const token = localStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9595/users/me', {
          headers: { Authorization: auth },
        });
        setData(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
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
        <div className="profile-content">
          <p className="text-3xl mb-5 font-bold">Profile</p>
          <div className="content">
            <div className="text-xl flex">
              <p className="font-bold mr-3">Your name:</p>
              {firstName}
            </div>
            <div className="text-xl flex">
              <p className="font-bold mr-3">Your last name:</p>
              {lastName}
            </div>
            <div className="text-xl flex">
              <p className="font-bold mr-3">Your e-mail: </p>
              {email}
            </div>
            <div className="forms">
              <form
                className="mt-28"
                onSubmit={handlePasswordsSubmit(onSubmitPasswords)}
              >
                <h1 className="text-2xl mb-5">Change password</h1>
                <label htmlFor="oldPassword" className="mt-10">
                  Type old password:
                  <input
                    type="password"
                    id="oldPassword"
                    className="border-2 border-black ml-2 mt-3"
                    {...registerPassword('oldPassword')}
                  />
                </label>
                <br />
                <span className="error-message">
                  {errorsPasswords?.oldPassword?.message}
                </span>
                <br />
                <label htmlFor="password" className="mt-10">
                  Type new password:
                  <input
                    type="password"
                    id="password"
                    className="border-2 border-black ml-2 mt-3"
                    {...registerPassword('password')}
                  />
                </label>
                <br />
                <span className="error-message">
                  {errorsPasswords?.password?.message}
                </span>
                <br />
                <label htmlFor="repeatPassword">
                  Retype new password:
                  <input
                    type="password"
                    id="repeatPassword"
                    className="border-2 border-black ml-2 mt-3"
                    {...registerPassword('repeatPassword')}
                  />
                </label>
                <br />
                <span className="error-message">
                  {errorsPasswords?.repeatPassword?.message}
                </span>
                <br />
                <span className="message">{message}</span>
                <br />
                <div className="flex justify-center items-center">
                  <button
                    className="w-36 bg-slate-300 text-xl p-3 rounded-xl border-none text-black"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <form
                className="mt-20"
                onSubmit={handleNamesSubmit(onSubmitNames)}
              >
                <h1 className="text-2xl mb-5">Change name</h1>
                <label htmlFor="firstName" className="mt-10">
                  Type new first name:
                  <input
                    type="text"
                    id="firstName"
                    className="border-2 border-black ml-2 mt-3"
                    {...registerNames('firstName')}
                  />
                </label>
                <br />
                <span className="error-message">
                  {errorsNames?.firstName?.message}
                </span>
                <br />
                <label htmlFor="lastName">
                  Type last name:
                  <input
                    type="text"
                    id="lastName"
                    className="border-2 border-black ml-2 mt-3"
                    {...registerNames('lastName')}
                  />
                </label>
                <br />
                <span className="error-message">
                  {errorsNames?.lastName?.message}
                </span>
                <br />
                <span className="message">{message1}</span>
                <div className="flex justify-center items-center">
                  <button className="w-36 mt-5 bg-slate-300 text-xl p-3 rounded-xl border-none text-black">
                    Submit
                  </button>
                </div>
              </form>
            </div>
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
