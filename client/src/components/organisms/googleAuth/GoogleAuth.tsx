import { FC, Fragment } from 'react';
import classes from './GoogleAuth.module.css';
import DemoAuth from '../demoAuth/DemoAuth';
import useGoogleAuth from '../../../hooks/use-google-auth';
import { useHistory } from 'react-router-dom';

const GoogleAuth: FC = () => {
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

export default GoogleAuth;
