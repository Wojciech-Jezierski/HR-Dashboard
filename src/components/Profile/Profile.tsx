import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './Profile.css';

import { routerPaths } from '../../config/router';
import {
  userSchemaPasswordsValidation,
  userSchemaNamesValidation,
} from '../../config/schemas';

export const Profile = () => {
  document.title = `HR Dashboard - Profile`;

  const { signIn } = routerPaths;

  const [nameMessage, setNameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const onRedirect = () => {
    navigate(`${signIn.url}`);
  };

  function onSubmitPasswords(values: Object) {
    return axios
      .put(`${process.env.REACT_APP_API_URL}/auth/change-password`, values)
      .then(() => {
        window.localStorage.removeItem('USER_TOKEN');
        onRedirect();
      })
      .catch(() => {
        setNameMessage('Something went wrong. Try again later.');
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

  function onSubmitNames(values: Object) {
    const token =
      localStorage.getItem('USER_TOKEN') ||
      sessionStorage.getItem('USER_TOKEN');
    const auth = `Bearer ${token}`;
    return axios
      .put(`${process.env.REACT_APP_API_URL}/users/me`, values, {
        headers: { Authorization: auth },
      })
      .then(() => {
        setPasswordMessage('Name has been change successfully.');
        window.location.reload();
      })
      .catch(() => {
        setPasswordMessage('Something went wrong. Try again later.');
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

  const token =
    localStorage.getItem('USER_TOKEN') || sessionStorage.getItem('USER_TOKEN');
  const auth = `Bearer ${token}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/me`,
          {
            headers: { Authorization: auth },
          },
        );
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
      <div className="profile-content mt-20">
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
              <span className="message">{nameMessage}</span>
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
            <form className="mt-20" onSubmit={handleNamesSubmit(onSubmitNames)}>
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
              <span className="message">{passwordMessage}</span>
              <div className="flex justify-center items-center">
                <button className="w-36 mt-5 bg-slate-300 text-xl p-3 rounded-xl border-none text-black">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
