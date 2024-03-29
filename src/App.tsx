import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { QueryClient, QueryClientProvider } from 'react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

import EnglishTranslation from '../Translation/English/translationSecond.json';
import PolishTranslation from '../Translation/Polish/translation.json';

import { Login } from './components/Login/Login';
import { SignUp } from './components/SignUp/SignUp';
import { Layout } from './components/Layout/Layout';
import { SignIn } from './components/SignIn/SignIn';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Jobs } from './components/Jobs/Jobs';
import { SingleJob } from './components/SingleJob/SingleJob';
import { AddJob } from './components/AddJob/AddJob';
import { EditJob } from './components/EditJob/EditJob';
import { Profile } from './components/Profile/Profile';
import { Candidates } from './components/Candidates/Candidates';
import { SingleCandidate } from './components/SingleCandidate/SingleCandidate';
import { EditCandidate } from './components/EditCandidate/EditCandidate';
import { AddCandidate } from './components/AddCandidate/AddCandidate';
import { BlackList } from './components/BlackList/BlackList';
import { Meetings } from './components/Meetings/Meetings';
import { Offices } from './components/Offices/Offices';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { routerPaths } from './config/router';
import type { DecodedToken } from './types/token';

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  resources: {
    en: {
      translation: {
        EnglishTranslation,
      },
    },
    pl: {
      translation: {
        PolishTranslation,
      },
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
});

export const App = () => {
  document.title = `HR Dashboard`;
  const {
    signIn,
    signUp,
    dasboard,
    jobs,
    jobsId,
    jobsAdd,
    jobsEdit,
    profile,
    candidates,
    candidatesId,
    candidatesEdit,
    candidatesAdd,
    blacklist,
    meetings,
    offices,
  } = routerPaths;

  const [isUserLogged, setIsUserLogged] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string>('');

  const queryClient = new QueryClient();

  const onSuccessfull = () => {
    setIsUserLogged(true);
  };

  useEffect(() => {
    const token =
      window.localStorage.getItem('USER_TOKEN') ||
      window.sessionStorage.getItem('USER_TOKEN');

    if (token) {
      try {
        const decodedToken = jwt_decode(token) as DecodedToken;

        const isTokenValid = decodedToken.exp * 1000 > Date.now();

        if (!isTokenValid) {
          window.localStorage.removeItem('USER_TOKEN');
          window.sessionStorage.removeItem('USER_TOKEN');
          window.localStorage.removeItem('REFRESH_TOKEN');
          window.sessionStorage.removeItem('REFRESH_TOKEN');
        }
        setIsUserLogged(isTokenValid);
      } catch (error) {
        setErrorAlert(error as string);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <div className="mb-10">{errorAlert}</div>
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  isUserLogged={isUserLogged}
                  setIsUserLogged={setIsUserLogged}
                />
              }
            >
              <Route index element={isUserLogged ? <Dashboard /> : <Login />} />
              ;
              <Route index element={<Login />} />
              <Route
                path={signIn.url}
                element={<SignIn onSuccessfull={onSuccessfull} />}
              />
              <Route path={signUp.url} element={<SignUp />} />
              <Route
                path={dasboard.url}
                element={<ProtectedRoute Component={Dashboard} />}
              />
              <Route
                path={jobs.url}
                element={<ProtectedRoute Component={Jobs} />}
              />
              <Route
                path={jobsId.url}
                element={<ProtectedRoute Component={SingleJob} />}
              />
              <Route
                path={jobsEdit.url}
                element={<ProtectedRoute Component={EditJob} />}
              />
              <Route
                path={jobsAdd.url}
                element={<ProtectedRoute Component={AddJob} />}
              />
              <Route
                path={profile.url}
                element={<ProtectedRoute Component={Profile} />}
              />
              <Route
                path={candidates.url}
                element={<ProtectedRoute Component={Candidates} />}
              />
              <Route
                path={candidatesId.url}
                element={<ProtectedRoute Component={SingleCandidate} />}
              />
              <Route
                path={candidatesEdit.url}
                element={<ProtectedRoute Component={EditCandidate} />}
              />
              <Route
                path={candidatesAdd.url}
                element={<ProtectedRoute Component={AddCandidate} />}
              />
              <Route
                path={blacklist.url}
                element={<ProtectedRoute Component={BlackList} />}
              />
              <Route
                path={meetings.url}
                element={<ProtectedRoute Component={Meetings} />}
              />
              <Route
                path={offices.url}
                element={<ProtectedRoute Component={Offices} />}
              />
            </Route>
          </Routes>
        </Router>
      </I18nextProvider>
    </QueryClientProvider>
  );
};
