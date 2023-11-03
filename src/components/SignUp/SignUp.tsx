import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import type { InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { routerPaths } from '../../config/router';
import { userSchema } from '../../config/schemas';

export const SignUp = () => {
  document.title = `HR Dashboard - Sign Up`;
  const { signIn } = routerPaths;

  const [message, setMessage] = useState('');

  const { t } = useTranslation();

  const navigate = useNavigate();
  const onRedirect = () => {
    navigate(`${signIn.url}`);
  };

  function onSubmit(values: Object) {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, values)
      .then(() => {
        setMessage('Confirm link was sent on your e-mail.');
        onRedirect();
      })
      .catch(() => {
        setMessage('Something went wrong. Try again later.');
      });
  }

  type User = InferType<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(userSchema),
  });

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center flex-col"
      >
        <h1 className="form-title">Sign Up</h1>
        <label htmlFor="signUpFirstName" className="form-labels">
          {t('Login.FirstName')}
          <input
            id="signUpFirstName"
            type="text"
            placeholder={t('Login.FirstNamePlaceholder')}
            className="inputs"
            {...register('firstName')}
          />
        </label>
        <span className="error-message">{errors?.firstName?.message}</span>
        <label htmlFor="signUpLastName" className="form-labels">
          {t('Login.LastName')}
          <input
            id="signUpLastName"
            type="text"
            placeholder={t('Login.LastNamePlaceholder')}
            className="inputs"
            {...register('lastName')}
          />
        </label>
        <span className="error-message">{errors?.lastName?.message}</span>
        <label htmlFor="signUpEmail" className="form-labels">
          E-mail:
          <input
            id="signUpEmail"
            type="email"
            placeholder="E-mail"
            className="inputs"
            autoComplete="e-mail"
            {...register('email')}
          />
        </label>
        <span className="error-message">{errors?.email?.message}</span>
        <label htmlFor="signUpPassword" className="form-labels">
          {t('Login.Password')}
          <input
            id="signUpPassword"
            type="password"
            placeholder={t('Login.PasswordPlaceholder')}
            className="inputs"
            autoComplete="password"
            {...register('password')}
          />
        </label>
        <span className="error-message">{errors?.password?.message}</span>
        <label htmlFor="signUpRepeatPassword" className="form-labels">
          {t('Login.RetypePassword')}
          <input
            id="signUpRepeatPassword"
            type="password"
            placeholder={t('Login.RetypePasswordPlaceholder')}
            className="inputs"
            autoComplete="new-password"
            {...register('repeatPassword')}
          />
        </label>
        <span className="error-message">{errors?.repeatPassword?.message}</span>
        <span className="message">{message}</span>
        <button className="sign-up-button" type="submit">
          {t('Login.SIGNUP')}
        </button>
      </form>
      <p className="text-center text-xl md:text-2xl">
        {t('Login.AlreadyHaveAccount')}
        <Link
          to={signIn.url}
          className="text-decoration-line: underline ml-1 text-blue-700"
        >
          {t('Login.SignIn')}
        </Link>
      </p>
    </div>
  );
};
