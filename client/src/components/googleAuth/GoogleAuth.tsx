import { FC, useEffect, useState } from 'react';
import keys from '../../util/keys';
import classes from './GoogleAuth.module.css';

const GoogleAuth: FC = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  let auth: any;

  const onAuthChange = () => {
    setIsSignedIn(auth.isSignedIn.get());
  };

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: keys.GOOGLE_CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button
          className={`${classes['google-button']} ${classes['google-button--sign-out']}`}
        >
          <i
            className={`fab fa-google ${classes['google-button__icon']} ${classes['google-button--sign-out__icon']}`}
          ></i>
          <p>Sign out</p>
        </button>
      );
    } else if (!isSignedIn) {
      return (
        <button className={`${classes['google-button']}`}>
          <i className={`fab fa-google ${classes['google-button__icon']}`}></i>
          <p>Sign in with Google</p>
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
