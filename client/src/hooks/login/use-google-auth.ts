import { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../../store/auth-context';
import keys from '../../util/keys';

// to hold initialized google auth
let auth: any;

const useGoogleAuth = () => {
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

  return {
    signInClickHandler,
    signOutClickHandler,
  };
};

export default useGoogleAuth;
