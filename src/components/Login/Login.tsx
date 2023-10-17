import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
      <div className="absolute top-8 right-36">
        <select onChange={onClickLanguageChange}>
          <option value="en">English</option>
          <option value="pl">Polish</option>
        </select>
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
