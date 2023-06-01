import React from 'react';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { string, InferType } from 'yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from 'react';

import { routerPaths } from '../../config/router';

export const SignIn = ({ onSuccessfull }: { onSuccessfull: () => void }) => {
  document.title = `HR Dashboard - Sign In`;
  const { signUp, dasboard } = routerPaths;
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const userSchema = Yup.object({
    email: Yup.string().email().required('This field cannot be empty'),
    password: string()
      .min(5, 'Password must have minimum 5 characters')
      .max(15, 'Please use at most 15 characters')
      .required('This field cannot be empty'),
  });

  const onRedirect = () => {
    navigate(`${dasboard.url}`);
  };

  function onSubmit(values: Object) {
    return axios
      .post('http://localhost:9595/auth/login', values)
      .then((response) => {
        console.log(response);
        setMessage('');
        if (isChecked) {
          localStorage.setItem('USER_TOKEN', response.data.accessToken);
        }
        onSuccessfull();
        onRedirect();
      })
      .catch((error) => {
        console.log(error);
        setMessage('Something went wrong. Try again later.');
      });
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  type User = InferType<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(userSchema),
  });

  return (
    <div className="sign-in-container">
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
            className="mt-2 ml-3 border-b-2 border-black focus:outline-none sign-in-inputs"
            {...register('email')}
          />
        </label>
        <span className="sign-in-error-message">{errors?.email?.message}</span>
        <label htmlFor="password" className="sign-in-labels">
          Password:
          <input
            id="password"
            type="password"
            placeholder="Password *"
            className="mt-2 ml-3 border-b-2 border-black focus:outline-none sign-in-inputs"
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
          Remember me
        </label>
        <span className="sign-in-message">{message}</span>
        <button className="sign-in-button" type="submit">
          SIGN IN
        </button>
      </form>
      <p className="text-center sm:text-lg md:text-xl lg:text-2xl">
        Don`t have account ?
        <Link
          to={signUp.url}
          className="text-decoration-line: underline ml-1 text-blue-700"
        >
          Click here to create one
        </Link>
      </p>
    </div>
  );
};
