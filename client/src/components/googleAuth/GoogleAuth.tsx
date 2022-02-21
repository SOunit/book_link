import { FC, useEffect, useContext, useCallback, Fragment } from 'react';
import keys from '../../util/keys';
import classes from './GoogleAuth.module.css';
import AuthContext from '../../store/auth-context';
import DemoAuth from '../demoAuth/DemoAuth';

// to hold initialized google auth
let auth: any;

const GoogleAuth: FC = () => {
  const authCtx = useContext(AuthContext);

  const onAuthChange = useCallback(() => {
    // context state
    const isLoggedIn = auth.isSignedIn.get();
    if (isLoggedIn) {
      authCtx.login(auth.currentUser.get().getId());
    } else {
      authCtx.logout();
    }
  }, [authCtx]);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: keys.GOOGLE_CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, [onAuthChange]);

  const signInClickHandler = () => {
    window.gapi.auth2.getAuthInstance().signIn();
    authCtx.login(auth.currentUser.get().getId());
  };

  const signOutClickHandler = () => {
    window.gapi.auth2.getAuthInstance().signOut();
    authCtx.logout();
  };

  const renderAuthButton = () => {
    if (authCtx.isLoggedIn === null) {
      return null;
    } else if (authCtx.isLoggedIn) {
      return (
        <button
          className={`${classes['google-button']} ${classes['google-button--sign-out']}`}
          onClick={signOutClickHandler}>
          <i
            className={`fab fa-google ${classes['google-button__icon']} ${classes['google-button--sign-out__icon']}`}></i>
          <p>Sign out</p>
        </button>
      );
    } else if (!authCtx.isLoggedIn) {
      return (
        <button
          className={`${classes['google-button']}`}
          onClick={signInClickHandler}>
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
