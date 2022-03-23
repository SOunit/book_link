import { keys } from '../util';

// to hold initialized google auth
let auth: any;

export const useGoogleAuth = () => {
  const authenticate = (): string => {
    if (!window.gapi) {
      return '';
    }

    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: keys.GOOGLE_CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          auth = window.gapi.auth2.getAuthInstance();
          window.gapi.auth2.getAuthInstance().signIn();
          return auth.currentUser.get().getId();
        })
        .catch((err) => {
          console.log('use-google-auth', err);
        });
    });

    return '';
  };

  const logout = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const getIsLoggedIn = () => {
    return auth.isSignedIn.get();
  };

  return {
    auth: authenticate,
    logout,
    getIsLoggedIn,
  };
};
