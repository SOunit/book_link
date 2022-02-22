import { FC, Fragment, useContext } from 'react';
import UserInfo from '../components/userInfo/UserInfo';
import UserEditForm from '../components/userEditForm/UserEditForm';
import AuthContext from '../store/auth-context';

const EditProfile: FC = () => {
  const { loginUser } = useContext(AuthContext);

  let userInfo;
  let userEditForm;
  if (loginUser) {
    userInfo = <UserInfo user={loginUser} />;
    userEditForm = <UserEditForm user={loginUser} />;
  }

  return (
    <Fragment>
      {userInfo}
      {userEditForm}
    </Fragment>
  );
};

export default EditProfile;
