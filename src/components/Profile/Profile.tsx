import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './Profile.css';
import { useTranslation } from 'react-i18next';

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
  const [fetchError, setFetchError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const { t } = useTranslation();

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
      } catch {
        setFetchError('Something went wrong.');
      }
    };

    fetchData();
  }, [auth]);

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (!data) {
    return <div>{t('Actions.Loading')}</div>;
  }

  return (
    <div className="profile">
      <div className="profile-content mt-20">
        <p className="text-3xl mb-5 font-bold">{t('Profile.Profile')}</p>
        <div className="content">
          <div className="text-xl flex">
            <p className="font-bold mr-3">{t('Profile.Name')}</p>
            {firstName}
          </div>
          <div className="text-xl flex">
            <p className="font-bold mr-3">{t('Profile.LastName')}</p>
            {lastName}
          </div>
          <div className="text-xl flex">
            <p className="font-bold mr-3">{t('Profile.Email')} </p>
            {email}
          </div>
          <div className="forms">
            <form
              className="mt-28"
              onSubmit={handlePasswordsSubmit(onSubmitPasswords)}
            >
              <h1 className="text-2xl mb-5">{t('Profile.ChangePassword')}</h1>
              <label htmlFor="oldPassword" className="mt-10">
                {t('Profile.OldPassword')}
                <input
                  type="password"
                  id="oldPassword"
                  autoComplete="oldPassword"
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
                {t('Profile.NewPassword')}
                <input
                  type="password"
                  id="password newPassword"
                  autoComplete="password"
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
                {t('Profile.RetypeNewPassword')}
                <input
                  type="password"
                  id="repeatPassword"
                  autoComplete="repeatPassword"
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
                  className="submitNewPassword w-36 bg-slate-300 text-xl p-3 rounded-xl border-none text-black"
                  type="submit"
                >
                  {t('Profile.Submit')}
                </button>
              </div>
            </form>
            <form className="mt-20" onSubmit={handleNamesSubmit(onSubmitNames)}>
              <h1 className="text-2xl mb-5">{t('Profile.ChangeName')}</h1>
              <label htmlFor="firstName" className="mt-10">
                {t('Profile.NewFirstName')}
                <input
                  type="text"
                  id="firstName newFirstName"
                  autoComplete="firstName"
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
                {t('Profile.NewLastName')}
                <input
                  type="text"
                  id="lastName newLastName"
                  autoComplete="lastName"
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
                <button className="submitNewName w-36 mt-5 bg-slate-300 text-xl p-3 rounded-xl border-none text-black">
                  {t('Profile.Submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
