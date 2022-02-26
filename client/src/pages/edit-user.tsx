import { FC, Fragment, useContext } from 'react';
import { UserInfo } from '../components/molecules';
import { EditUserForm } from '../components/organisms';
import AuthContext from '../store/auth-context';

const EditUser: FC = () => {
  const { loginUser } = useContext(AuthContext);

  return (
    <Fragment>
      {loginUser && <UserInfo user={loginUser} />}
      {loginUser && <EditUserForm />}
    </Fragment>
  );
};

export default EditUser;
