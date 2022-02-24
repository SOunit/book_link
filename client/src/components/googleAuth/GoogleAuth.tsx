import { FC, useContext, Fragment } from 'react';
import classes from './GoogleAuth.module.css';
import AuthContext from '../../store/auth-context';
import DemoAuth from '../demoAuth/DemoAuth';
import useGoogleAuth from '../../hooks/use-google-auth';

const GoogleAuth: FC = () => {
  const authCtx = useContext(AuthContext);
  const googleAuth = useGoogleAuth();

  const renderAuthButton = () => {
    if (authCtx.isLoggedIn === null) {
      return null;
    } else if (authCtx.isLoggedIn) {
      return (
        <button
          className={`${classes['google-button']} ${classes['google-button--sign-out']}`}
          onClick={googleAuth.signOutClickHandler}>
          <i
            className={`fab fa-google ${classes['google-button__icon']} ${classes['google-button--sign-out__icon']}`}></i>
          <p>Sign out</p>
        </button>
      );
    } else if (!authCtx.isLoggedIn) {
      return (
        <button
          className={`${classes['google-button']}`}
          onClick={googleAuth.signInClickHandler}>
          <i className={`fab fa-google ${classes['google-button__icon']}`}></i>
          <p>Sign in with Google</p>
        </button>
      );
    }
  };

  return (
    <Fragment>
      {renderAuthButton()}
      <DemoAuth />
    </Fragment>
  );
};

export default GoogleAuth;
