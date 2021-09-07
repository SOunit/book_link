import { FC, useEffect, useState } from 'react';
import keys from '../../util/keys';

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
      return <div>Loading...</div>;
    } else if (isSignedIn) {
      return <div>Signed in</div>;
    } else if (!isSignedIn) {
      return <div>Not signed in</div>;
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
