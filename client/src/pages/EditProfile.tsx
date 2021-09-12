import { FC, Fragment } from 'react';
import useLoginUser from '../hooks/use-login-user';
import UserInfo from '../components/userInfo/UserInfo';
import UserEditForm from '../components/userEditForm/UserEditForm';

const EditProfile: FC = () => {
  const { loginUser } = useLoginUser();

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
