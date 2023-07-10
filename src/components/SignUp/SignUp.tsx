import React from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from 'react';

import { routerPaths } from '../../config/router';
import { userSchema } from '../../config/schemas';

export const SignUp = () => {
  document.title = `HR Dashboard - Sign Up`;
  const { signIn } = routerPaths;

  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const onRedirect = () => {
    navigate(`${signIn.url}`);
  };

  function onSubmit(values: Object) {
    return axios
      .post('http://localhost:9595/auth/register', values)
      .then(() => {
        setMessage('Confirm link was sent on your e-mail.');
        onRedirect();
      })
      .catch((error) => {
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
        <label htmlFor="firstName" className="form-labels">
          First Name:
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            className="inputs"
            {...register('firstName')}
          />
        </label>
        <span className="error-message">{errors?.firstName?.message}</span>
        <label htmlFor="lastName" className="form-labels">
          Last Name:
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            className="inputs"
            {...register('lastName')}
          />
        </label>
        <span className="error-message">{errors?.lastName?.message}</span>
        <label htmlFor="email" className="form-labels">
          E-mail:
          <input
            id="email"
            type="email"
            placeholder="E-mail"
            className="inputs"
            {...register('email')}
          />
        </label>
        <span className="error-message">{errors?.email?.message}</span>
        <label htmlFor="password" className="form-labels">
          Password:
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="inputs"
            {...register('password')}
          />
        </label>
        <span className="error-message">{errors?.password?.message}</span>
        <label htmlFor="repeatPassword" className="form-labels">
          Retype password:
          <input
            id="repeatPassword"
            type="password"
            placeholder="Retype Password"
            className="inputs"
            {...register('repeatPassword')}
          />
        </label>
        <span className="error-message">{errors?.repeatPassword?.message}</span>
        <span className="message">{message}</span>
        <button className="sign-up-button" type="submit">
          SIGN UP
        </button>
      </form>
      <p className="text-center text-xl md:text-2xl">
        Already have an account? Then
        <Link
          to={signIn.url}
          className="text-decoration-line: underline ml-1 text-blue-700"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};
