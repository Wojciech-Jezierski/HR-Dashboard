import './Login.css';
import { Link } from 'react-router-dom';

import { routerPaths } from '../../config/router';

export const Login = () => {
  const { signIn, signUp } = routerPaths;

  return (
    <div className="container">
      <h1 className="mb-10 text-center text-4xl font-medium md:text-6xl">
        HR Analitycs
      </h1>
      <Link to={signIn.url}>
        <button className="sign">Sign In</button>
      </Link>
      <Link to={signUp.url}>
        <button className="sign">Sign Up</button>
      </Link>
    </div>
  );
};
