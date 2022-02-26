import { FC, Fragment } from 'react';
import classes from './google-auth.module.css';
import { DemoAuth } from './demo-auth';
import useGoogleAuth from '../../../hooks/login/use-google-auth';
import { useHistory } from 'react-router-dom';

export const GoogleAuth: FC = () => {
  const { signInClickHandler } = useGoogleAuth();
  const history = useHistory();

  const clickHandler = () => {
    signInClickHandler();
    history.push('/');
  };

  return (
    <Fragment>
      <button className={`${classes['google-button']}`} onClick={clickHandler}>
        <i className={`fab fa-google ${classes['google-button__icon']}`}></i>
        <p>Sign in with Google</p>
      </button>
      <DemoAuth />
    </Fragment>
  );
};
