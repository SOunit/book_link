import { FC, useContext, useEffect } from 'react';
import AuthContext from '../store/auth-context';

const EditProfile: FC = () => {
  const authCtx = useContext(AuthContext);

  const fetchUser = async (id: string) => {};

  useEffect(() => {}, []);

  return <div>Edit Profile</div>;
};

export default EditProfile;
