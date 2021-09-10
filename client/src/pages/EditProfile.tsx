import { FC, Fragment } from 'react';
import useUser from '../hooks/use-user';
import UserInfo from '../components/userInfo/UserInfo';
import UserEditForm from '../components/userEditForm/UserEditForm';

const EditProfile: FC = () => {
  const user = useUser();

  let userInfo;
  let userEditForm;
  if (user) {
    userInfo = <UserInfo user={user} />;
    userEditForm = <UserEditForm user={user} />;
  }

  return (
    <Fragment>
      {userInfo}
      {userEditForm}
    </Fragment>
  );
};

export default EditProfile;
