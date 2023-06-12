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
import { Profile } from './components/Profile/Profile';
import { routerPaths } from './config/router';

interface DecodedToken {
  sub: string;
  exp: number;
}

export const App = () => {
  document.title = `HR Dashboard`;
  const { signIn, signUp, dasboard, jobs, jobsId, jobsAdd, jobsEdit, profile } =
    routerPaths;

  const [isUserLogged, setIsUserLogged] = useState(false);

  const onSuccessfull = () => {
    setIsUserLogged(true);
  };

  useEffect(() => {
    const token = window.localStorage.getItem('USER_TOKEN');

    if (token) {
      const decodedToken = jwt_decode(token) as DecodedToken;

      const isTokenValid = decodedToken.exp > Date.now();

      if (!isTokenValid) {
        window.localStorage.removeItem('USER_TOKEN');
      }

      setIsUserLogged(isTokenValid);
    }
    <Route index element={isUserLogged ? <Dashboard /> : <Login />} />;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route
            path={signIn.url}
            element={<SignIn onSuccessfull={onSuccessfull} />}
          />
          <Route path={signUp.url} element={<SignUp />} />
          <Route path={dasboard.url} element={<Dashboard />} />
          <Route path={jobs.url} element={<Jobs />} />
          <Route path={jobsId.url} element={<SingleJob />} />
          <Route path={jobsAdd.url} element={<AddJob />} />
          <Route path={profile.url} element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};
