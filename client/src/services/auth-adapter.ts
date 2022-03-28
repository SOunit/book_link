import { keys } from '../presentation/util';

export const useAuth = () => {
  const authenticate = (): Promise<string | null> => {
    if (!window.gapi) {
      return new Promise(() => {});
    }

    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', () => {
        window.gapi.client
          .init({
            clientId: keys.GOOGLE_CLIENT_ID,
            scope: 'email',
          })
          .then(() => {
            const googleAuth = window.gapi.auth2.getAuthInstance();

            googleAuth.signIn().then(() => {
              const loginId = googleAuth.currentUser.get().getId();
              resolve(loginId);
            });
          })
          .catch((err) => {
            reject(err);
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
