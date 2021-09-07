import { FC, useEffect } from 'react';
import keys from '../../util/keys';

const GoogleAuth: FC = () => {
  console.log(keys);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: keys.GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    });
  }, []);

  return <div>Google Auth</div>;
};

export default GoogleAuth;
