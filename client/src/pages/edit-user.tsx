import { FC, Fragment, useContext } from 'react';
import UserInfo from '../components/organisms/userInfo/UserInfo';
import EditUserForm from '../components/organisms/edit-user/edit-user-form';
import AuthContext from '../store/auth-context';

const EditUser: FC = () => {
  const { loginUser } = useContext(AuthContext);

  let userInfo;
  let editUserForm;
  if (loginUser) {
    userInfo = <UserInfo user={loginUser} />;
    editUserForm = <EditUserForm user={loginUser} />;
  }

  return (
    <Fragment>
      {userInfo}
      {editUserForm}
    </Fragment>
  );
};

export default EditUser;
