import { FC, Fragment } from 'react';
import useUser from '../hooks/use-user';
import UserInfo from '../components/userInfo/UserInfo';
import UserEditForm from '../components/userEditForm/UserEditForm';

const EditProfile: FC = () => {
  const user = useUser();

  let userInfo;
  let userEditForm;
  if (user.data) {
    userInfo = <UserInfo user={user.data} />;
    userEditForm = <UserEditForm user={user.data} />;
  }

  return (
    <Fragment>
      {userInfo}
      {userEditForm}
    </Fragment>
  );
};

export default EditProfile;
