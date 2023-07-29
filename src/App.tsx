import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

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
import { ProtectedRoute } from './utils/ProtectedRoute';
import { routerPaths } from './config/router';
import { DecodedToken } from './types/token';

export const App = () => {
  document.title = `HR Dashboard`;
  const { signIn, signUp, dasboard, jobs, jobsId, jobsAdd, jobsEdit, profile } =
    routerPaths;

  const [isUserLogged, setIsUserLogged] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string>('');

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
          <Route index element={isUserLogged ? <Dashboard /> : <Login />} />;
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
        </Route>
      </Routes>
    </Router>
  );
};
