import { FC, Fragment, useContext } from 'react';
import UserInfo from '../components/organisms/userInfo/UserInfo';
import UserEditForm from '../components/organisms/userEditForm/UserEditForm';
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
