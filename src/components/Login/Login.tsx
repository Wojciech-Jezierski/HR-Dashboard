import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GrLanguage } from 'react-icons/gr';

import { routerPaths } from '../../config/router';

export const Login = () => {
  const { signIn, signUp } = routerPaths;

  const { t, i18n } = useTranslation();

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <div className="container">
      <div className="absolute top-8 right-24 md:right-10 xl:right-20">
        <label htmlFor="language" className="flex">
          <GrLanguage className="mt-1 mr-1" />
          <select onChange={onClickLanguageChange} id="language">
            <option value="en">English</option>
            <option value="pl">Polish</option>
          </select>
        </label>
      </div>
      <h1 className="mb-10 text-center text-4xl font-medium md:text-6xl">
        HR Analitycs
      </h1>
      <Link to={signIn.url}>
        <button className="sign">{t('Login.SignIn')}</button>
      </Link>
      <Link to={signUp.url}>
        <button className="sign">{t('Login.SignUp')}</button>
      </Link>
    </div>
  );
};
