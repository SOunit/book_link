import { keys } from './util';

// to hold initialized google auth
let auth: any;

export const useAuth = () => {
  const authenticate = (): any => {
    if (!window.gapi) {
      return;
    }

    return new Promise((res) => {
      window.gapi.load('client:auth2', () => {
        return window.gapi.client
          .init({
            clientId: keys.GOOGLE_CLIENT_ID,
            scope: 'email',
          })
          .then(() => {
            auth = window.gapi.auth2.getAuthInstance();
            auth.signIn();

            const loginId = auth.currentUser.get().getId();
            return res(loginId);
          });
      });
    });
  };

  const logout = () => {
    if (!window.gapi) {
      return;
    }

    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: keys.GOOGLE_CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          window.gapi.auth2.getAuthInstance().signOut();
        })
        .catch((err) => {
          console.log('use-google-auth', err);
        });
    });
  };

  return {
    auth: authenticate,
    logout,
  };
};
