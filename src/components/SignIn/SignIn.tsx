import React, { useState } from 'react';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import type { InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { routerPaths } from '../../config/router';
import { userSignInSchema } from '../../config/schemas';

export const SignIn = ({ onSuccessfull }: { onSuccessfull: () => void }) => {
  document.title = `HR Dashboard - Sign In`;
  const { signUp, dasboard } = routerPaths;
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const onRedirect = () => {
    navigate(`${dasboard.url}`);
  };

  function onSubmit(values: Object) {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, values)
      .then((response) => {
        setMessage('');
        if (isChecked) {
          localStorage.setItem('USER_TOKEN', response.data.accessToken);
          localStorage.setItem('REFRESH_TOKEN', response.data.refreshToken);
        }
        if (!isChecked) {
          sessionStorage.setItem('USER_TOKEN', response.data.accessToken);
          sessionStorage.setItem('REFRESH_TOKEN', response.data.refreshToken);
        }
        onSuccessfull();
        onRedirect();
      })
      .catch(() => {
        setMessage('Something went wrong. Try again later.');
      });
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  type User = InferType<typeof userSignInSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(userSignInSchema),
  });

  return (
    <div className="sign-in-container relative">
      <div className="absolute top-0">
        <p className="text-sm md:text-xl">
          {t('Login.GuestEmail')}{' '}
          <span className="font-bold">guest@gmail.com</span>
        </p>
        <p className="text-sm md:text-xl">
          {t('Login.GuestPassword')} <span className="font-bold">guest123</span>
        </p>
      </div>
      <form
        className="flex justify-center items-center flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl mb-5 lg:text-5xl">Sign In</h1>
        <label htmlFor="email" className="sign-in-labels">
          E-mail:
          <input
            id="email"
            type="email"
            placeholder="E-mail *"
            autoComplete="e-mail"
            className="mt-2 ml-3 border-b-2 border-black focus:outline-none sign-in-inputs"
            defaultValue="guest@gmail.com"
            {...register('email')}
          />
        </label>
        <span className="sign-in-error-message">{errors?.email?.message}</span>
        <label htmlFor="password" className="sign-in-labels">
          {t('Login.Password')}
          <input
            id="password"
            type="password"
            placeholder={t('Login.PasswordPlaceholderSignIn')}
            autoComplete="current-password"
            className="mt-2 ml-3 border-b-2 border-black focus:outline-none sign-in-inputs"
            defaultValue="guest123"
            {...register('password')}
          />
        </label>
        <span className="sign-in-error-message">
          {errors?.password?.message}
        </span>
        <label htmlFor="remember-me" className="mt-5 sign-in-labels">
          <input
            id="remember-me"
            type="checkbox"
            className="mr-2 checkbox"
            onChange={handleCheckboxChange}
          />
          {t('Login.RememberMe')}
        </label>
        <span className="sign-in-message">{message}</span>
        <button className="sign-in-button" type="submit">
          {t('Login.SIGNIN')}
        </button>
      </form>
      <p className="text-center sm:text-lg md:text-xl lg:text-2xl">
        {t('Login.DoNotHaveAccount')}
        <Link
          to={signUp.url}
          className="text-decoration-line: underline ml-1 text-blue-700"
        >
          {t('Login.CreateAccount')}
        </Link>
      </p>
    </div>
  );
};
