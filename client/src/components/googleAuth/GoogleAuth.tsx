import { FC, useEffect, useState, useContext, useCallback } from 'react';
import keys from '../../util/keys';
import classes from './GoogleAuth.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';

let auth: any;

const GoogleAuth: FC = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  const onAuthChange = useCallback(() => {
    // local state
    setIsSignedIn(auth.isSignedIn.get());

    // context state
    const isLoggedIn = auth.isSignedIn.get();
    if (isLoggedIn) {
      authCtx.login(auth.currentUser.get().getId());
      // FIXME: this code makes red warning in console
      history.push('/');
    } else {
      authCtx.logout();
    }
  }, [authCtx, history]);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: keys.GOOGLE_CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          // local state
          setIsSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, [setIsSignedIn, onAuthChange]);

  const signInClickHandler = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn();
  };

  const signOutClickHandler = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button
          className={`${classes['google-button']} ${classes['google-button--sign-out']}`}
          onClick={signOutClickHandler}
        >
          <i
            className={`fab fa-google ${classes['google-button__icon']} ${classes['google-button--sign-out__icon']}`}
          ></i>
          <p>Sign out</p>
        </button>
      );
    } else if (!isSignedIn) {
      return (
        <button
          className={`${classes['google-button']}`}
          onClick={signInClickHandler}
        >
          <i className={`fab fa-google ${classes['google-button__icon']}`}></i>
          <p>Sign in with Google</p>
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
