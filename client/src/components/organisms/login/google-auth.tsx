import { FC, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useGoogleAuth } from '../../../hooks/';
import classes from './google-auth.module.css';

type Props = {
  className?: string;
};

export const GoogleAuth: FC<Props> = ({ className }) => {
  const { signInClickHandler } = useGoogleAuth();
  const history = useHistory();

  const clickHandler = () => {
    signInClickHandler();
    history.push('/');
  };

  return (
    <Fragment>
      <button
        className={`${classes['google-button']} ${className}`}
        onClick={clickHandler}>
        <i className={`fab fa-google ${classes['google-button__icon']}`}></i>
        <p>Sign in with Google</p>
      </button>
    </Fragment>
  );
};
